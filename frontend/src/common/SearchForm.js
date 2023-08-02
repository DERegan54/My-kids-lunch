import React, {useState} from 'react';

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
            <div className='SearchForm-container'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='SearchInput'>Search Lunches: </label>
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