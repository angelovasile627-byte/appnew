#!/usr/bin/env python3
"""
Simple static file server for serving the React build
Used by Electron to serve the frontend
"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 3000
DIRECTORY = Path(__file__).parent.parent / "frontend" / "build"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add headers for CORS and caching
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        # Serve index.html for all routes (SPA routing)
        if not Path(str(DIRECTORY) + self.path).exists() and not self.path.startswith('/static'):
            self.path = '/index.html'
        return super().do_GET()
    
    def log_message(self, format, *args):
        # Suppress logging for cleaner output
        pass

if __name__ == '__main__':
    # Check if build directory exists
    if not DIRECTORY.exists():
        print(f"Error: Build directory not found at {DIRECTORY}")
        print("Please run 'yarn build' in the frontend directory first")
        exit(1)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Serving frontend on http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server")
            httpd.shutdown()
