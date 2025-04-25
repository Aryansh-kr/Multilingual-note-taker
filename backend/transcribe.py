import whisper
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def transcribe_audio(file_path):
    try:
        # Convert to absolute path
        absolute_path = os.path.abspath(file_path)
        logger.info(f"Loading audio file: {absolute_path}")
        # Verify file exists
        if not os.path.exists(absolute_path):
            logger.error(f"File does not exist at {absolute_path}")
            return None, f"File does not exist at {absolute_path}"
        model = whisper.load_model("small")
        logger.info("Whisper model loaded")
        result = model.transcribe(absolute_path, language=None)
        logger.info("Transcription completed")
        transcript = result["text"]
        logger.info(f"Transcript: {transcript[:100]}...")
        return transcript, None
    except Exception as e:
        logger.error(f"Transcription failed: {e}")
        return None, str(e)