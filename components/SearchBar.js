import TextField from '@mui/material/TextField';
import './styles/SearchBar.css'
function SearchBar({searchText,handleSearch}) {
    
    return(
        <div className='search'>
        <TextField 
        id="outlined-basic" 
        label="Search by name, email or role"
            value={searchText}
            onChange={handleSearch}
        variant="outlined" />
        </div>
    )
}
export default SearchBar