from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os
import logging
from transcribe import transcribe_audio
from summarize import summarize_text
from database import store_transcript, get_transcript, search_transcripts
from pdf_generator import generate_pdf

# Configure logging to output to terminal
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process-audio")
async def process_audio(file: UploadFile = File(...)):
    print("Endpoint /process-audio called")  # Debug print
    logger.info(f"Received file: {file.filename}")
    file_location = f"temp_{file.filename}"
    try:
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
        print(f"File saved to {file_location}")  # Debug print
        logger.info(f"File saved to {file_location}")
    except Exception as e:
        print(f"Error saving file: {e}")  # Debug print
        logger.error(f"Error saving file: {e}")
        raise HTTPException(status_code=500, detail=f"Error saving file: {e}")

    # Transcribe the audio
    print("Starting transcription")  # Debug print
    transcript, error = transcribe_audio(file_location)
    if error:
        os.remove(file_location)
        print(f"Transcription error: {error}")  # Debug print
        logger.error(f"Transcription error: {error}")
        raise HTTPException(status_code=500, detail=f"Transcription error: {error}")

    # Summarize the transcription
    print("Starting summarization")  # Debug print
    summary, error = summarize_text(transcript)
    if error:
        os.remove(file_location)
        print(f"Summarization error: {error}")  # Debug print
        logger.error(f"Summarization error: {error}")
        raise HTTPException(status_code=500, detail=f"Summarization error: {error}")

    # Store in database
    print("Storing in database")  # Debug print
    transcript_id = store_transcript(transcript, summary)
    print(f"Stored transcript with ID: {transcript_id}")  # Debug print
    logger.info(f"Stored transcript with ID: {transcript_id}")

    # Remove temporary file
    os.remove(file_location)
    print(f"Removed temporary file: {file_location}")  # Debug print
    logger.info(f"Removed temporary file: {file_location}")

    return {
        "transcript_id": transcript_id,
        "transcript": transcript,
        "summary": summary
    }

@app.get("/search")
def search(query: str):
    print(f"Endpoint /search called with query: {query}")  # Debug print
    logger.info(f"Search query: {query}")
    results = search_transcripts(query)
    return results

@app.get("/export-pdf/{transcript_id}")
def export_pdf(transcript_id: int):
    print(f"Endpoint /export-pdf/{transcript_id} called")  # Debug print
    logger.info(f"Exporting PDF for transcript ID: {transcript_id}")
    transcript, summary = get_transcript(transcript_id)
    if not transcript or not summary:
        print("Transcript not found")  # Debug print
        logger.error("Transcript not found")
        raise HTTPException(status_code=404, detail="Transcript not found")

    pdf_path = generate_pdf(transcript_id, transcript, summary)
    print(f"PDF generated at: {pdf_path}")  # Debug print
    logger.info(f"PDF generated at: {pdf_path}")
    return FileResponse(pdf_path, media_type="application/pdf", filename=f"summary_{transcript_id}.pdf")