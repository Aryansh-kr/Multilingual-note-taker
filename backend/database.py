from sqlalchemy import create_engine, Column, Integer, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

Base = declarative_base()

class Transcript(Base):
    __tablename__ = 'transcripts'
    id = Column(Integer, primary_key=True)
    transcript = Column(Text)
    summary = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

engine = create_engine('sqlite:///transcripts.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

def init_db():
    Base.metadata.create_all(engine)

def store_transcript(transcript, summary):
    session = Session()
    new_transcript = Transcript(transcript=transcript, summary=summary)
    session.add(new_transcript)
    session.commit()
    transcript_id = new_transcript.id
    session.close()
    return transcript_id

def search_transcripts(query):
    session = Session()
    results = session.query(Transcript).filter(
        (Transcript.transcript.like(f'%{query}%')) | (Transcript.summary.like(f'%{query}%'))
    ).all()
    session.close()
    return [{"id": r.id, "transcript": r.transcript, "summary": r.summary} for r in results]

def get_transcript(transcript_id):
    session = Session()
    transcript = session.query(Transcript).filter(Transcript.id == transcript_id).first()
    session.close()
    if transcript:
        return transcript.transcript, transcript.summary
    else:
        return None, None