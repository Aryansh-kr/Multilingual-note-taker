import React from 'react';

function TranscriptView({ transcript, searchResults }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Transcript</h2>
      {transcript ? (
        <p className="text-gray-700">{transcript}</p>
      ) : (
        <p className="text-gray-500">No transcript available</p>
      )}
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          <ul className="list-disc pl-5">
            {searchResults.map((result) => (
              <li key={result.id} className="text-gray-700">
                {result.transcript.slice(0, 100)}...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TranscriptView;