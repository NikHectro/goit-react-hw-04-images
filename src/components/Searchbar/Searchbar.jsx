import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      // alert('Please, enter category');
      toast.warn('Please, enter category');
      return;
    }

    onSubmit(query);
    setQuery('');
    event.target.reset();
  };

  const handleChanges = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <FaSearch />
          {/* <span className="button-label">Search</span> */}
        </button>

        <input
          className="SearchForm-input"
          value={query}
          onChange={handleChanges}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
