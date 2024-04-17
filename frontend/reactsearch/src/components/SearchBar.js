import React, { useState } from 'react';

function SearchBar({ onSearch }) {
	const [query, setQuery] = useState('');
	const [resultLimit, setResultLimit] = useState(10);
	const [searchType, setSearchType] = useState('sentence'); // Default to 'sentence'
  
	const handleSubmit = (event) => {
	  event.preventDefault();
	  console.log("tyep", searchType	)
	  // You might adjust how onSearch is called based on searchType
	  onSearch(query, resultLimit, searchType);
	};
  
	const searchBarStyle = {
	  display: 'flex',
	  alignItems: 'center',
	  gap: '10px',
	};

    const selectStyle = {
		padding: '8px', // Ensures the inside of the dropdown is comfortably clickable
		margin: '0 5px', // Adds space around the dropdown for visual separation
		border: '1px solid #ccc', // Defines a subtle border for the dropdown
		background: 'white', // Ensures the dropdown's background matches other elements
		display: 'flex',
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
		{/* Dropdown for selecting search type */}
		<select value={searchType} onChange={(e) => setSearchType(e.target.value) } style={selectStyle}>
		  <option value="sentence">Search by Sentence</option>
		  <option value="section">Search by Title</option>
		</select>
		<button type="submit" style={{ width: '80px' }}>Search</button>
	  </form>
	);
  }
  

export default SearchBar;
