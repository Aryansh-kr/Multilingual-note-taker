# Multilingual Note-Taking Agent

Welcome to the **Multilingual Note-Taking Agent**, a web-based application designed to transcribe audio files, generate summaries, and allow searching through transcripts. Built using **FastAPI** (backend) and **React** (frontend), this project utilizes the **Whisper model** for multilingual transcription and supports exporting summaries as **PDFs**.

## Features
- **Audio Transcription:** Transcribes audio files (WAV format) into text using the Whisper model.
- **Text Summarization:** Generates concise summaries from transcribed text.
- **Search Functionality:** Allows searching through stored transcripts by keywords.
- **PDF Export:** Export transcript summaries as downloadable PDFs.
- **Multilingual Support:** Automatically detects and transcribes audio in multiple languages.

## Prerequisites
- **Python 3.12+**
- **Node.js and npm**
- **FFmpeg** (required for audio processing with Whisper)
- **Windows, macOS, or Linux**

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/multilingual-note-taker.git
   cd multilingual-note-taker/backend
Create a virtual environment:

python -m venv venv
.\venv\Scripts\activate  # On Windows
Install dependencies:


pip install -r requirements.txt
Install FFmpeg:

Download FFmpeg from gyan.dev (e.g., ffmpeg-release-essentials.7z).

Extract to C:\ffmpeg (Windows) and add C:\ffmpeg\bin to your system PATH.

Verify installation by running:
ffmpeg -version
Frontend Setup
Navigate to the frontend directory:
cd ../frontend
Install dependencies:
npm install
Start the frontend:
npm start
Running the Application
Start the backend server:
cd ../backend
uvicorn main:app --reload
The backend will be accessible at http://localhost:8000.
Start the frontend:
Access the frontend at http://localhost:3000.

Upload an audio file (e.g., demo/sample_audio.wav) and use the UI to process, search, or export.

Usage
Upload Audio: Select a WAV file and click "Process Audio" to generate a transcript and summary.

Search: Enter a keyword to find matching transcripts.

Export PDF: After processing a transcript, you can click "Export PDF" to download a summary PDF.

Project Structure
php
Copy
Edit
multilingual-note-taker/
```
├── backend/              # FastAPI backend code
│   ├── main.py          # API endpoints
│   ├── transcribe.py    # Transcription logic
│   ├── summarize.py     # Summarization logic
│   ├── database.py      # In-memory database
│   ├── pdf_generator.py # PDF generation
│   ├── venv/            # Virtual environment
│   ├── demo/            # Sample audio files
│   └── requirements.txt # Python dependencies
├── frontend/             # React frontend code
│   ├── src/             # React components
│   ├── package.json     # Node dependencies
│   └── public/          # Static files
├── demo/                 # Sample audio and output files
└── README.md            # This file
Dependencies
Backend: fastapi, uvicorn, openai-whisper, reportlab
```
Frontend: react, axios

Troubleshooting
FFmpeg Issues: Ensure FFmpeg is installed and added to your system PATH.

Frontend 404 Errors: Verify that the backend is running at http://localhost:8000.

No Transcript: Ensure the audio file is in valid WAV format and can be processed by Whisper (you can check using ffprobe).

Contributing
Feel free to fork this repository, submit issues, or send pull requests. Contributions are welcome to improve transcription accuracy, add UI features, or support additional file formats.

Owners- Aryansh Kumar and Ashutosh Singh
