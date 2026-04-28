import React from 'react'

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  id = 'blog-searchbar',
  placeholder = 'Search the blog',
}) => (
  <input
    value={searchQuery}
    onInput={e => setSearchQuery(e.target.value)}
    type="text"
    id={id}
    placeholder={placeholder}
    name="s"
  />
)

export default SearchBar
