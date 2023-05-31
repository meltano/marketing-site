import React from 'react'

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <input
    value={searchQuery}
    onInput={e => setSearchQuery(e.target.value)}
    type="text"
    id="blog-searchbar"
    placeholder="Search the blog"
    name="s"
  />
)

export default SearchBar
