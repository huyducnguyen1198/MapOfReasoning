import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  // Added state for managing the result limit
  const [resultLimit, setResultLimit] = useState(10);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass both query and resultLimit to the onSearch callback
    onSearch(query, resultLimit);
  };

    // Inline styles for layout
	const searchBarStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '10px', // Adds some space between the input fields
	  };
	
  return (
    <form onSubmit={handleSubmit} className="search-bar" style={searchBarStyle}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for sentences..."
      />
      {/* Input for setting the result limit */}
      <input
        type="number"
        value={resultLimit}
        onChange={(e) => setResultLimit(Number(e.target.value))}
        min="10"
        max="200"
        placeholder="Result Limit"
		style={{ width: '80px' }}

      />
      <button type="submit" style={{ width: '80px' }}>Search</button>
    </form>
  );
}

export default SearchBar;
