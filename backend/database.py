import sqlite3
import json
from pathlib import Path
from typing import List, Dict, Any, Optional
from datetime import datetime
import uuid
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Database path
DB_PATH = Path(__file__).parent / "axxo_builder.db"

# Thread pool for async operations
executor = ThreadPoolExecutor(max_workers=3)

class Database:
    def __init__(self):
        self.db_path = DB_PATH
        self._init_db()
    
    def _init_db(self):
        """Initialize database with required tables"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create status_checks table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS status_checks (
                id TEXT PRIMARY KEY,
                client_name TEXT NOT NULL,
                timestamp TEXT NOT NULL
            )
        ''')
        
        # Create projects table for saving user projects
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                blocks TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def _get_connection(self):
        """Get database connection"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn
    
    async def insert_status_check(self, client_name: str) -> Dict[str, Any]:
        """Insert a new status check"""
        def _insert():
            conn = self._get_connection()
            cursor = conn.cursor()
            
            status_id = str(uuid.uuid4())
            timestamp = datetime.utcnow().isoformat()
            
            cursor.execute(
                'INSERT INTO status_checks (id, client_name, timestamp) VALUES (?, ?, ?)',
                (status_id, client_name, timestamp)
            )
            conn.commit()
            conn.close()
            
            return {
                'id': status_id,
                'client_name': client_name,
                'timestamp': timestamp
            }
        
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(executor, _insert)
    
    async def get_status_checks(self, limit: int = 1000) -> List[Dict[str, Any]]:
        """Get all status checks"""
        def _get():
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute('SELECT * FROM status_checks ORDER BY timestamp DESC LIMIT ?', (limit,))
            rows = cursor.fetchall()
            conn.close()
            
            return [dict(row) for row in rows]
        
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(executor, _get)
    
    async def save_project(self, project_id: str, name: str, blocks: List[Dict]) -> Dict[str, Any]:
        """Save a project"""
        def _save():
            conn = self._get_connection()
            cursor = conn.cursor()
            
            now = datetime.utcnow().isoformat()
            blocks_json = json.dumps(blocks)
            
            # Check if project exists
            cursor.execute('SELECT id FROM projects WHERE id = ?', (project_id,))
            existing = cursor.fetchone()
            
            if existing:
                cursor.execute(
                    'UPDATE projects SET name = ?, blocks = ?, updated_at = ? WHERE id = ?',
                    (name, blocks_json, now, project_id)
                )
            else:
                cursor.execute(
                    'INSERT INTO projects (id, name, blocks, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
                    (project_id, name, blocks_json, now, now)
                )
            
            conn.commit()
            conn.close()
            
            return {
                'id': project_id,
                'name': name,
                'blocks': blocks,
                'updated_at': now
            }
        
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(executor, _save)
    
    async def get_projects(self) -> List[Dict[str, Any]]:
        """Get all projects"""
        def _get():
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute('SELECT * FROM projects ORDER BY updated_at DESC')
            rows = cursor.fetchall()
            conn.close()
            
            projects = []
            for row in rows:
                project = dict(row)
                project['blocks'] = json.loads(project['blocks'])
                projects.append(project)
            
            return projects
        
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(executor, _get)
    
    async def get_project(self, project_id: str) -> Optional[Dict[str, Any]]:
        """Get a specific project"""
        def _get():
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute('SELECT * FROM projects WHERE id = ?', (project_id,))
            row = cursor.fetchone()
            conn.close()
            
            if row:
                project = dict(row)
                project['blocks'] = json.loads(project['blocks'])
                return project
            return None
        
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(executor, _get)
    
    async def delete_project(self, project_id: str) -> bool:
        """Delete a project"""
        def _delete():
            conn = self._get_connection()
            cursor = conn.cursor()
            
            cursor.execute('DELETE FROM projects WHERE id = ?', (project_id,))
            deleted = cursor.rowcount > 0
            conn.commit()
            conn.close()
            
            return deleted
        
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(executor, _delete)

# Global database instance
db = Database()
