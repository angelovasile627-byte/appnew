#!/bin/bash

# AXXO Builder - Startup Script for Linux/Mac
# This script starts the AXXO Builder desktop application

echo "=========================================="
echo "  Starting AXXO Builder..."
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python 3 is not installed${NC}"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js 16 or higher"
    exit 1
fi

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo -e "${YELLOW}Installing yarn...${NC}"
    npm install -g yarn
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"

# Install backend dependencies if needed
if [ ! -d "backend/__pycache__" ] || [ ! -f "backend/axxo_builder.db" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    cd backend
    pip3 install -r requirements.txt --quiet
    cd ..
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    cd frontend
    yarn install --silent
    cd ..
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
fi

# Build frontend if build folder doesn't exist
if [ ! -d "frontend/build" ]; then
    echo -e "${YELLOW}Building frontend (first time only, may take a minute)...${NC}"
    cd frontend
    GENERATE_SOURCEMAP=false yarn build
    cd ..
    echo -e "${GREEN}✓ Frontend built successfully${NC}"
fi

# Install electron dependencies if needed
if [ ! -d "electron/node_modules" ]; then
    echo -e "${YELLOW}Installing Electron...${NC}"
    cd electron
    yarn install --silent
    cd ..
    echo -e "${GREEN}✓ Electron installed${NC}"
fi

# Start the application
echo ""
echo -e "${GREEN}=========================================="
echo -e "  Launching AXXO Builder..."
echo -e "==========================================${NC}"
echo ""

cd electron
yarn start

echo ""
echo -e "${GREEN}AXXO Builder closed. Thank you!${NC}"
