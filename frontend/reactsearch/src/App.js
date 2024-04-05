import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import './App.css'; // Make sure you have this line to import styles
function getLengthJson(obj) {
	return Object.keys(obj).length;
}

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
	//http://localhost:5000/searchByParagraph?sentence=%22God%20is%20love%22&num_results=10
	const url = 'http://localhost:5000/searchBySentence?sentence="' + query + '"&num_results=10';
	let response = await fetch(url);
	let data = await response.json();
	console.log(data);
	let resultsList = []
	for (let i = 0; i < getLengthJson(data['paragraph']); i++) {
		resultsList.push({title: data['title'][i], paragraph: data['paragraph'][i], sentence: data['sentence'][i] , section: data['section'][i]});
	}

    // Implementation of your search logic
    console.log('Searching for:', query);
    // Example result set
    setResults(resultsList);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
}

export default App;
