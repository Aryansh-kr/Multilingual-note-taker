import React, { useState } from 'react';
import axios from 'axios';

function UploadAudio({ setTranscript, setSummary, setTranscriptId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/process-audio', formData);
      setTranscript(response.data.transcript);
      setSummary(response.data.summary);
      setTranscriptId(response.data.transcript_id);
    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Upload & Process'}
      </button>
    </div>
  );
}

export default UploadAudio;