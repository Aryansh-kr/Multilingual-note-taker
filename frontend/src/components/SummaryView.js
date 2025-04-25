import React from 'react';
import axios from 'axios';

function SummaryView({ summary, transcriptId }) {
  const handleDownload = async () => {
    if (!transcriptId) return;
    try {
      const response = await axios.get(`http://localhost:8000/export-pdf?transcript_id=${transcriptId}`);
      const pdfPath = response.data.pdf_path;
      window.open(`http://localhost:8000/${pdfPath}`, '_blank');
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      {summary ? (
        <pre className="text-gray-700 whitespace-pre-wrap">{summary}</pre>
      ) : (
        <p className="text-gray-500">No summary available</p>
      )}
      {transcriptId && (
        <button
          onClick={handleDownload}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      )}
    </div>
  );
}

export default SummaryView;