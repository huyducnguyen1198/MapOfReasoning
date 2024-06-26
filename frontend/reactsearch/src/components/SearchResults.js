import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './SearchResults.css';

function highlightMatchingSentence(paragraph, sentence) {
	// Split the paragraph into individual sentences
	const sentences = paragraph.split(/[.!?]/);
  
	// Find the closest matching sentence using Levenshtein distance
	let closestMatch = '';
	let minDistance = Number.MAX_SAFE_INTEGER;
	sentences.forEach(sent => {
	  const distance = levenshteinDistance(sentence, sent);
	  if (distance < minDistance) {
		minDistance = distance;
		closestMatch = sent;
	  }
	});
  
	// If a matching sentence is found, replace it with the same sentence wrapped in <strong> tag
	if (closestMatch) {
	  const regex = new RegExp(`(${escapeRegExp(closestMatch)})`, 'gi');
	  const parts = paragraph.split(regex);
	  return parts.map((part, index) => {
		if (index % 2 === 0) {
		  return part;
		} else {
		  return <strong key={index}>{part}</strong>;
		}
	  });
	}
  
	// If no matching sentence is found, return the original paragraph
	return paragraph;
  }
  
  
  
  // Function to calculate Levenshtein distance between two strings
  function levenshteinDistance(a, b) {
	const dp = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
  
	for (let i = 0; i <= a.length; i++) {
	  dp[i][0] = i;
	}
  
	for (let j = 0; j <= b.length; j++) {
	  dp[0][j] = j;
	}
  
	for (let i = 1; i <= a.length; i++) {
	  for (let j = 1; j <= b.length; j++) {
		const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
		dp[i][j] = Math.min(
		  dp[i - 1][j] + 1, // deletion
		  dp[i][j - 1] + 1, // insertion
		  dp[i - 1][j - 1] + indicator // substitution
		);
	  }
	}
  
	return dp[a.length][b.length];
  }
  
  // Function to escape special characters in a string for use in regular expression
  function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  


  function SearchResults({ results, isLoading }) {
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 10; // Set the desired number of results per page

	// Calculate the indexes for the current slice of results
	const indexOfLastResult = currentPage * resultsPerPage;
	const indexOfFirstResult = indexOfLastResult - resultsPerPage;
	const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Calculate total pages
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(results.length / resultsPerPage); i++) {
		pageNumbers.push(i);
	}

	if (isLoading) {
		return <div className="search-results">Loading results...</div>;
	}

	return (
		
		<div className="search-results">
			<nav>
				<ul className='pagination'>
					{pageNumbers.map(number => (
					<li key={number} className='page-item'>
						{/* Prevent default action and page refresh on click */}
						<a onClick={(e) => { e.preventDefault(); paginate(number); }} href='!#' className='page-link'>
						{number}
						</a>
					</li>
					))}
				</ul>
			</nav>
			{currentResults.map((result, index) => (
			<div key={index} className='tooltip'>
				<div>
					<h3>{result.title}</h3> 
					<p>{result.section}</p>
				</div>
				<>
					{console.log(result)}
					{
					result.sentence !== '' ? (
						<>
						<p>
							{result.sentence}
							<a href={result.url} target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={faBars} />
							</a>
						</p>
						<span className='tooltiptext'>
							{highlightMatchingSentence(result.paragraph, result.sentence)}
						</span>
						</>
					) : (
						<p>
							<a href={result.url} target="_blank" rel="noopener noreferrer">
								<FontAwesomeIcon icon={faBars} />
							</a>
						</p>
					)}
				</>
			</div>
			))}
		<nav>
			<ul className='pagination'>
				{pageNumbers.map(number => (
				<li key={number} className='page-item'>
					{/* Prevent default action and page refresh on click */}
					<a onClick={(e) => { e.preventDefault(); paginate(number); }} href='!#' className='page-link'>
					{number}
					</a>
				</li>
				))}
			</ul>
		</nav>
	</div>
	  );
	}

export default SearchResults;
