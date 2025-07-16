#!/bin/bash

# Navigate to backend and install dependencies
cd backend
npm install

# Start backend in background
npm start &

# Go to frontend and install dependencies
cd ../frontend
npm install

# Start frontend
npm start
