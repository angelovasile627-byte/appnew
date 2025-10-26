from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict, Any
import uuid
from datetime import datetime, timezone
from ftplib import FTP
import io
from database import db


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# FTP Models
class FTPConfig(BaseModel):
    host: str
    port: str = "21"
    username: str
    password: str
    rootFolder: str = "/"
    publishOnlyChanges: bool = False

class BlockConfig(BaseModel):
    model_config = ConfigDict(extra="allow")

class Block(BaseModel):
    id: str
    templateId: str
    config: Dict[str, Any]

class FTPUploadRequest(BaseModel):
    ftpConfig: FTPConfig
    blocks: List[Block]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# FTP Upload endpoint
@api_router.post("/ftp/upload")
async def upload_to_ftp(request: FTPUploadRequest):
    try:
        # Generate HTML from blocks
        html_content = generate_html_from_blocks(request.blocks)
        
        # Connect to FTP
        ftp = FTP()
        ftp.connect(request.ftpConfig.host, int(request.ftpConfig.port))
        ftp.login(request.ftpConfig.username, request.ftpConfig.password)
        
        # Change to root folder if specified
        if request.ftpConfig.rootFolder and request.ftpConfig.rootFolder != '/':
            try:
                ftp.cwd(request.ftpConfig.rootFolder)
            except Exception as e:
                logger.warning(f"Could not change to root folder {request.ftpConfig.rootFolder}: {e}")
        
        # Upload index.html
        html_bytes = html_content.encode('utf-8')
        html_file = io.BytesIO(html_bytes)
        ftp.storbinary('STOR index.html', html_file)
        
        # Close FTP connection
        ftp.quit()
        
        logger.info(f"Successfully uploaded site to FTP server: {request.ftpConfig.host}")
        
        return {
            "success": True,
            "message": "Site uploaded successfully",
            "files_uploaded": ["index.html"]
        }
        
    except Exception as e:
        logger.error(f"FTP upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"FTP upload failed: {str(e)}")

def generate_html_from_blocks(blocks: List[Block]) -> str:
    """Generate complete HTML from blocks"""
    
    # Template mapping (simplified - in production would load from templates)
    block_html_map = {
        "menu-1": '<nav class="bg-white shadow-md p-4"><div class="container mx-auto flex justify-between items-center"><div class="text-2xl font-bold">{{brandName}}</div><div class="space-x-4">{{menuItems}}</div></div></nav>',
        "menu-2": '<nav class="bg-gray-900 text-white p-4"><div class="container mx-auto flex justify-center items-center gap-8"><div class="text-xl font-bold">{{brandName}}</div><div class="space-x-6">{{menuItems}}</div></div></nav>',
        "menu-3": '<nav class="bg-transparent absolute w-full p-4 z-10"><div class="container mx-auto flex justify-between items-center"><div class="text-2xl font-bold text-white">{{brandName}}</div><div class="space-x-4 text-white">{{menuItems}}</div></div></nav>',
        "menu-4": '<nav class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4"><div class="container mx-auto"><div class="text-2xl font-bold mb-4">{{brandName}}</div><div class="space-y-2">{{menuItems}}</div></div></nav>',
        "menu-5": '<nav class="bg-white border-b p-4"><div class="container mx-auto grid grid-cols-2 gap-8"><div><div class="font-bold mb-2">{{brandName}}</div></div><div class="text-right">{{menuItems}}</div></div></nav>',
        "menu-6": '<nav class="bg-gray-900 text-white p-6"><div class="container mx-auto flex justify-between items-center"><div class="text-xl tracking-wider">{{brandName}}</div><div class="space-x-8 text-sm uppercase">{{menuItems}}</div></div></nav>',
        
        "hero-1": '<section class="py-20 px-4" style="background-color: {{backgroundColor}}"><div class="container mx-auto" style="max-width: 1000px;"><div class="mb-12 rounded-xl overflow-hidden shadow-2xl"><img src="{{heroImage}}" alt="Hero image" style="width: 100%; height: 600px; object-fit: cover; display: block;"></div><div class="text-center"><h1 class="text-6xl font-bold mb-6" style="color: {{titleColor}}">{{title}}</h1><p class="text-xl mb-8" style="color: {{descriptionColor}}">{{description}}</p><button class="px-10 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg" style="background-color: {{buttonBg}}; color: {{buttonColor}}">{{buttonText}}</button></div></div></section>',
        "hero-2": '<section class="relative h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500 text-white"><div class="text-center z-10 px-4"><h1 class="text-7xl font-extrabold mb-6">{{headline}}</h1><p class="text-3xl mb-8">{{subheadline}}</p><button class="bg-white text-pink-600 px-10 py-5 rounded-lg text-xl font-bold hover:scale-105 transition">{{ctaText}}</button></div></section>',
        "hero-3": '<section class="relative h-screen flex items-center justify-center bg-black text-white"><video autoplay muted loop class="absolute inset-0 w-full h-full object-cover opacity-50"><source src="video.mp4" type="video/mp4"></video><div class="text-center z-10 px-4"><h1 class="text-6xl font-bold mb-6">{{headline}}</h1><p class="text-2xl mb-8">{{subheadline}}</p><button class="border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition">{{ctaText}}</button></div></section>',
        "hero-4": '<section class="relative h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url({{backgroundImage}});"><div class="absolute inset-0 bg-black opacity-40"></div><div class="text-center z-10 px-4 text-white"><h1 class="text-6xl font-bold mb-6">{{headline}}</h1><p class="text-2xl mb-8">{{subheadline}}</p><button class="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition">{{ctaText}}</button></div></section>',
        "hero-5": '<section class="relative h-screen flex items-center justify-center overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient"></div><div class="text-center z-10 px-4 text-white"><h1 class="text-7xl font-extrabold mb-6">{{headline}}</h1><p class="text-3xl mb-8">{{subheadline}}</p><button class="bg-white text-purple-600 px-10 py-5 rounded-full text-xl font-bold hover:scale-110 transition">{{ctaText}}</button></div></section>',
        "hero-6": '<section class="h-screen grid grid-cols-2"><div class="flex items-center justify-center bg-indigo-600 text-white p-12"><div><h1 class="text-5xl font-bold mb-6">{{headline}}</h1><p class="text-xl mb-8">{{subheadline}}</p><button class="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">{{ctaText}}</button></div></div><div class="bg-cover bg-center" style="background-image: url({{backgroundImage}});"></div></section>',
        "hero-7": '<section class="h-screen flex items-center justify-center bg-white"><div class="text-center px-4"><h1 class="text-6xl font-light text-gray-900 mb-6">{{headline}}</h1><p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{{subheadline}}</p><button class="bg-black text-white px-8 py-4 rounded text-lg hover:bg-gray-800 transition">{{ctaText}}</button></div></section>',
        "hero-8": '<section class="h-screen flex items-center justify-center bg-gray-900 text-white"><div class="text-center px-4"><h1 class="text-8xl font-black mb-6 uppercase">{{headline}}</h1><p class="text-2xl mb-8">{{subheadline}}</p><button class="bg-red-600 text-white px-12 py-5 rounded text-xl font-bold hover:bg-red-700 transition">{{ctaText}}</button></div></section>',
        "hero-9": '<section class="relative h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url({{backgroundImage}});"><div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div><div class="text-center z-10 px-4 text-white"><h1 class="text-6xl font-bold mb-6">{{headline}}</h1><p class="text-2xl mb-8">{{subheadline}}</p><button class="bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition">{{ctaText}}</button></div></section>',
        "hero-10": '<section class="h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600 text-white"><div class="text-center px-4"><h1 class="text-6xl font-bold mb-6">{{headline}}</h1><p class="text-2xl mb-8">{{subheadline}}</p><div class="flex gap-4 justify-center"><button class="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">{{ctaText}}</button><button class="border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-teal-600 transition">Learn More</button></div></div></section>',
        
        # Generic fallback for other block types
        "default": '<section class="py-20 px-4"><div class="container mx-auto"><div class="text-center">{{content}}</div></div></section>'
    }
    
    html_blocks = []
    for block in blocks:
        template_html = block_html_map.get(block.templateId, block_html_map["default"])
        
        # Special handling for hero-1 (image-above-text layout)
        if block.templateId == "hero-1":
            template_html = template_html.replace('{{heroImage}}', block.config.get('heroImage', {}).get('src', ''))
            template_html = template_html.replace('{{backgroundColor}}', block.config.get('background', {}).get('value', '#F5F5F0'))
            template_html = template_html.replace('{{title}}', block.config.get('title', {}).get('text', ''))
            template_html = template_html.replace('{{titleColor}}', block.config.get('title', {}).get('color', '#2B2B2B'))
            template_html = template_html.replace('{{description}}', block.config.get('description', {}).get('text', ''))
            template_html = template_html.replace('{{descriptionColor}}', block.config.get('description', {}).get('color', '#6B6B6B'))
            template_html = template_html.replace('{{buttonText}}', block.config.get('button', {}).get('text', ''))
            template_html = template_html.replace('{{buttonBg}}', block.config.get('button', {}).get('color', '#A8F5B8'))
            template_html = template_html.replace('{{buttonColor}}', block.config.get('button', {}).get('textColor', '#2B2B2B'))
        else:
            # Replace placeholders with actual config values for other blocks
            for key, value in block.config.items():
                placeholder = f"{{{{{key}}}}}"
                template_html = template_html.replace(placeholder, str(value))
        
        html_blocks.append(template_html)
    
    # Combine all blocks into full HTML document
    full_html = f"""<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site creat cu Mobirise Builder</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }}
        @keyframes gradient {{
            0% {{ background-position: 0% 50%; }}
            50% {{ background-position: 100% 50%; }}
            100% {{ background-position: 0% 50%; }}
        }}
        .animate-gradient {{
            background-size: 200% 200%;
            animation: gradient 15s ease infinite;
        }}
    </style>
</head>
<body>
    {"".join(html_blocks)}
</body>
</html>"""
    
    return full_html

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()