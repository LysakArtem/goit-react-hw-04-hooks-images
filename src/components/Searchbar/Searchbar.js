import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handlerInputChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={s.searchbar}>
      <form onSubmit={handlerSubmit} className={s.searchForm}>
        <button type="submit" className={s.searchFormButton}>
          <span className={s.searchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handlerInputChange}
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={search}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default Searchbar;

Searchbar.propTypes = {
  Searchbar: PropTypes.func,
};
