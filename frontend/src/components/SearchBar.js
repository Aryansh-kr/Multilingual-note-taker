import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setSearchResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(`http://localhost:8000/search?query=${query}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search transcripts..."
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;