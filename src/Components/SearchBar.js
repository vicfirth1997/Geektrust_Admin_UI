import './SearchBar.css'
import { Box } from '@mui/material'

function SearchBar({
    searchValue,
    setSearchValue
}) {

    function handleSearch(e) {
        setSearchValue(e.target.value)
    }

    return(
        <Box className='search-container'>
        <Box className='search-bar'>
            <input
                type='search'
                placeholder='Search by name,email or role'
                value={searchValue}
                onChange={handleSearch}
            />
        </Box>
    </Box>
    )
}

export default SearchBar