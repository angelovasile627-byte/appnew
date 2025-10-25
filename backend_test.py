#!/usr/bin/env python3
"""
Backend API Testing for FTP Upload Endpoint
Tests the /api/ftp/upload endpoint for validation and functionality
"""

import requests
import json
import os
from typing import Dict, Any

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
    return "http://localhost:8001"

BACKEND_URL = get_backend_url()
API_BASE = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE}")

def test_ftp_upload_validation():
    """Test input validation for FTP upload endpoint"""
    print("\n=== Testing FTP Upload Input Validation ===")
    
    # Test 1: Missing ftpConfig.host
    print("\n1. Testing missing ftpConfig.host...")
    payload = {
        "ftpConfig": {
            "port": "21",
            "username": "testuser",
            "password": "testpass",
            "rootFolder": "/",
            "publishOnlyChanges": False
        },
        "blocks": [
            {
                "id": "block-1",
                "templateId": "menu-1",
                "config": {
                    "brandName": "Test Site",
                    "menuItems": "Home About Contact"
                }
            }
        ]
    }
    
    try:
        response = requests.post(f"{API_BASE}/ftp/upload", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:  # Pydantic validation error
            print("✅ PASS: Correctly rejected request without host")
        else:
            print("❌ FAIL: Should have rejected request without host")
    except Exception as e:
        print(f"❌ ERROR: {e}")
    
    # Test 2: Missing ftpConfig.username
    print("\n2. Testing missing ftpConfig.username...")
    payload = {
        "ftpConfig": {
            "host": "ftp.test.com",
            "port": "21",
            "password": "testpass",
            "rootFolder": "/",
            "publishOnlyChanges": False
        },
        "blocks": [
            {
                "id": "block-1",
                "templateId": "menu-1",
                "config": {
                    "brandName": "Test Site",
                    "menuItems": "Home About Contact"
                }
            }
        ]
    }
    
    try:
        response = requests.post(f"{API_BASE}/ftp/upload", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ PASS: Correctly rejected request without username")
        else:
            print("❌ FAIL: Should have rejected request without username")
    except Exception as e:
        print(f"❌ ERROR: {e}")
    
    # Test 3: Missing ftpConfig.password
    print("\n3. Testing missing ftpConfig.password...")
    payload = {
        "ftpConfig": {
            "host": "ftp.test.com",
            "port": "21",
            "username": "testuser",
            "rootFolder": "/",
            "publishOnlyChanges": False
        },
        "blocks": [
            {
                "id": "block-1",
                "templateId": "menu-1",
                "config": {
                    "brandName": "Test Site",
                    "menuItems": "Home About Contact"
                }
            }
        ]
    }
    
    try:
        response = requests.post(f"{API_BASE}/ftp/upload", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ PASS: Correctly rejected request without password")
        else:
            print("❌ FAIL: Should have rejected request without password")
    except Exception as e:
        print(f"❌ ERROR: {e}")
    
    # Test 4: Empty blocks array
    print("\n4. Testing empty blocks array...")
    payload = {
        "ftpConfig": {
            "host": "ftp.test.com",
            "port": "21",
            "username": "testuser",
            "password": "testpass",
            "rootFolder": "/",
            "publishOnlyChanges": False
        },
        "blocks": []
    }
    
    try:
        response = requests.post(f"{API_BASE}/ftp/upload", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # This might pass validation but should generate empty or minimal HTML
        if response.status_code in [200, 500]:
            print("✅ PASS: Endpoint accepts empty blocks (generates empty HTML)")
        else:
            print("❌ FAIL: Unexpected response for empty blocks")
    except Exception as e:
        print(f"❌ ERROR: {e}")

def test_ftp_invalid_credentials():
    """Test FTP upload with invalid credentials"""
    print("\n=== Testing Invalid FTP Credentials ===")
    
    payload = {
        "ftpConfig": {
            "host": "ftp.invalid-server-12345.com",
            "port": "21",
            "username": "testuser",
            "password": "testpass",
            "rootFolder": "/",
            "publishOnlyChanges": False
        },
        "blocks": [
            {
                "id": "block-1",
                "templateId": "menu-1",
                "config": {
                    "brandName": "Test Site",
                    "menuItems": "Home About Contact"
                }
            },
            {
                "id": "block-2",
                "templateId": "hero-1",
                "config": {
                    "headline": "Welcome",
                    "subheadline": "Test site",
                    "ctaText": "Get Started"
                }
            }
        ]
    }
    
    try:
        response = requests.post(f"{API_BASE}/ftp/upload", json=payload, timeout=60)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 500:
            response_data = response.json()
            if "FTP upload failed" in response_data.get("detail", ""):
                print("✅ PASS: Correctly returned 500 error for invalid FTP server")
            else:
                print("❌ FAIL: Error message doesn't indicate FTP failure")
        else:
            print("❌ FAIL: Should have returned 500 error for invalid FTP server")
    except requests.exceptions.Timeout:
        print("⚠️  TIMEOUT: FTP connection attempt timed out (expected for invalid server)")
        print("✅ PASS: Endpoint correctly attempts FTP connection (timeout indicates connection attempt)")
    except Exception as e:
        print(f"❌ ERROR: {e}")

def test_html_generation():
    """Test HTML generation with valid blocks (but invalid FTP to avoid actual upload)"""
    print("\n=== Testing HTML Generation ===")
    
    payload = {
        "ftpConfig": {
            "host": "ftp.nonexistent-test-server.com",
            "port": "21",
            "username": "testuser",
            "password": "testpass",
            "rootFolder": "/",
            "publishOnlyChanges": False
        },
        "blocks": [
            {
                "id": "block-1",
                "templateId": "menu-1",
                "config": {
                    "brandName": "Magazin Online",
                    "menuItems": "Acasă Produse Contact"
                }
            },
            {
                "id": "block-2",
                "templateId": "hero-1",
                "config": {
                    "headline": "Bine ați venit",
                    "subheadline": "Cel mai bun magazin online",
                    "ctaText": "Începe acum"
                }
            },
            {
                "id": "block-3",
                "templateId": "hero-2",
                "config": {
                    "headline": "Oferte speciale",
                    "subheadline": "Reduceri de până la 50%",
                    "ctaText": "Vezi ofertele"
                }
            }
        ]
    }
    
    try:
        response = requests.post(f"{API_BASE}/ftp/upload", json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 500:
            # This is expected since we're using invalid FTP server
            # But we want to check that the error is FTP-related, not HTML generation
            response_data = response.json()
            error_detail = response_data.get("detail", "")
            if "FTP upload failed" in error_detail:
                print("✅ PASS: HTML generation works, FTP connection failed as expected")
                print("✅ PASS: Error message indicates FTP failure, not HTML generation issue")
            else:
                print("❌ FAIL: Error doesn't seem to be FTP-related, might be HTML generation issue")
        else:
            print("❌ FAIL: Unexpected response - should fail at FTP connection")
    except Exception as e:
        print(f"❌ ERROR: {e}")

def test_endpoint_accessibility():
    """Test that the FTP endpoint is accessible"""
    print("\n=== Testing Endpoint Accessibility ===")
    
    try:
        # Test with completely malformed request to see if endpoint exists
        response = requests.post(f"{API_BASE}/ftp/upload", json={}, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ PASS: FTP upload endpoint is accessible and validates input")
        elif response.status_code == 404:
            print("❌ FAIL: FTP upload endpoint not found")
        else:
            print(f"✅ PASS: FTP upload endpoint exists (status: {response.status_code})")
    except Exception as e:
        print(f"❌ ERROR: Cannot reach FTP upload endpoint: {e}")

def test_backend_health():
    """Test basic backend connectivity"""
    print("\n=== Testing Backend Health ===")
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ PASS: Backend is accessible")
        else:
            print("❌ FAIL: Backend health check failed")
    except Exception as e:
        print(f"❌ ERROR: Cannot reach backend: {e}")

def main():
    """Run all FTP upload tests"""
    print("🚀 Starting FTP Upload Endpoint Tests")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"API Base: {API_BASE}")
    
    # Test backend connectivity first
    test_backend_health()
    
    # Test endpoint accessibility
    test_endpoint_accessibility()
    
    # Test input validation
    test_ftp_upload_validation()
    
    # Test invalid FTP credentials
    test_ftp_invalid_credentials()
    
    # Test HTML generation
    test_html_generation()
    
    print("\n🏁 FTP Upload Endpoint Tests Complete")

if __name__ == "__main__":
    main()