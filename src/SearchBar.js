import React from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder }) => {
    return (
        <div className="search-bar-container">
            <input type="text" className="search-input" placeholder={placeholder} />
        </div>
    );
};

export default SearchBar;

