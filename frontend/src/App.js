import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [transcriptId, setTranscriptId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an audio file.');
      return;
    }
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      console.log('Sending request to backend...'); // Debug log
      const response = await axios.post('http://localhost:8000/process-audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response received:', response.data); // Debug log
      setTranscript(response.data.transcript || 'No transcript available');
      setSummary(response.data.summary || 'No summary available');
      setTranscriptId(response.data.transcript_id);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.detail || error.message || 'Error processing audio. Check console for details.');
      setLoading(false);
      setTranscript('');
      setSummary('');
    }
  };


  const handleSearch = async () => {
    if (!searchQuery) {
      setError('Please enter a search query.');
      return;
    }
    try {
      console.log('Sending search request:', searchQuery); // Debug log
      const response = await axios.get('http://localhost:8000/search', {
        params: { query: searchQuery },
      });
      console.log('Search response:', response.data); // Debug log
      setSearchResults(response.data);
      setError('');
    } catch (error) {
      console.error('Error searching:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.detail || error.message || 'Error searching transcripts.');
      setSearchResults([]);
    }
  };

  const handleExportPdf = async () => {
    if (!transcriptId) {
      setError('No transcript available to export.');
      return;
    }
    try {
      console.log('Sending PDF export request for ID:', transcriptId); // Debug log
      const response = await axios.get(`http://localhost:8000/export-pdf/${transcriptId}`, {
        responseType: 'blob',
      });
      console.log('PDF export response received'); // Debug log
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `summary_${transcriptId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setError('');
    } catch (error) {
      console.error('Error exporting PDF:', error.response ? error.response.data : error.message);
      setError(error.response?.data?.detail || error.message || 'Error exporting PDF.');
    }
  };

  return (
    <div className="App">
      <h1>Multilingual Note-Taker</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Upload Audio</h2>
        <input type="file" accept="audio/wav" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Processing...' : 'Process Audio'}
        </button>
      </div>
      <div>
        <h2>Transcript</h2>
        <p>{transcript || 'No transcript available'}</p>
        <h2>Summary</h2>
        <p>{summary || 'No summary available'}</p>
        {transcriptId && <button onClick={handleExportPdf}>Export PDF</button>}
      </div>
      <div>
        <h2>Search Transcripts</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <strong>ID:</strong> {result.id}<br />
                <strong>Transcript:</strong> {result.transcript.substring(0, 100)}...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;