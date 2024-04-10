import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import './App.css'; // Make sure you have this line to import styles
function getLengthJson(obj) {
	return Object.keys(obj).length;
}

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  const handleSearch = async (query, num_results=10) => {
	setIsLoading(true); // Set loading state to true
	// Fetch data from the server
	// Example URL: http:
	//http://localhost:5000/searchByParagraph?sentence=%22God%20is%20love%22&num_results=10
	const url = 'http://localhost:5000/searchBySentence?sentence="' + query + '"&num_results=' + num_results.toString() ;
	let response = await fetch(url);
	let data = await response.json();
	console.log(data);
	let resultsList = []
	for (let i = 0; i < getLengthJson(data['paragraph']); i++) {
		resultsList.push({title: data['title'][i],
				 paragraph: data['paragraph'][i],
				 sentence: data['sentence'][i],
				 section: data['section'][i],
				 url: data['url'][i]});
	}
    // Implementation of your search logic
    console.log('Searching for:', query);
    // Example result set
	setIsLoading(false); // Set loading state to false
    setResults(resultsList);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch}  />
      <SearchResults results={results} isLoading={isLoading} />
    </div>
  );
}

export default App;
