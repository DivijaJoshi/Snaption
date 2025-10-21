# Snaption - AI Photo Caption Generator

An AI-powered application that generates social media captions for uploaded photos using Google's Gemini AI.

## Features

- **Image Upload**: Drag & drop or click to upload images
- **AI Analysis**: Uses Gemini 2.5 Flash to analyze photos
- **Smart Captions**: Generates optimized captions for Instagram and LinkedIn
- **Keywords & Mood**: Extracts relevant keywords and describes the image vibe
- **Modern UI**: Built with React, Tailwind CSS, and Shadcn UI components

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   cd client && npm install
   ```

2. **Start the application**:
   ```bash
   npm run dev
   ```

This will start both the Express server (port 4000) and React client (port 3002).

## Usage

1. Upload an image by dragging & dropping or clicking the upload area
2. Wait for AI analysis (powered by Gemini 2.5 Flash)
3. View generated captions, keywords, and mood analysis
4. Copy captions for Instagram or LinkedIn with one click

## Tech Stack

- **Backend**: Node.js, Express.js, Multer, Google Generative AI
- **Frontend**: React, Tailwind CSS, Shadcn UI, Lucide React
- **AI**: Google Gemini 2.5 Flash API