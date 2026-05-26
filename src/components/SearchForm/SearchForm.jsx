import { useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Enter topic"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  )
}

export default SearchForm