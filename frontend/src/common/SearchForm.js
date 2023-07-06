import React, {useState} from 'react';
import Header from '../common/Header';

const SearchForm = ({searchTerm}) => {
    const initialState = "";
    const [query, setQuery] = useState(initialState);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        searchTerm(query);
        setQuery(query);
    }

    const handleChange = (evt) => {
        setQuery(evt.target.value);
    }

    return (
        <div className='SearchForm'>
            <br></br>
            <div className='SearchForm-container'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="SearchInput"
                        id="SearchInput"
                        placeholder="Enter a search term"
                        value={query}
                        onChange={handleChange}>
                    </input>
                    <button type='submit'>Search!</button>
                </form>
            </div>
        </div>
    );
}

export default SearchForm;