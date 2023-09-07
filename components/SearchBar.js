import TextField from '@mui/material/TextField';
import './styles/SearchBar.css'
import { useState } from 'react';
import { closeSnackbar, useSnackbar } from "notistack";

function SearchBar({
    setCurrentPage,
    setFilteredRecords,
    records
}) {

    const [searchText,setSearchText] = useState('')
    const {enqueueSnackbar} = useSnackbar()
   

    function getSearchFilteredData(e,records) {
        const query = e.target.value
        const filtered=records.filter((record)=>{
            return(
                record.name.toLowerCase().includes(query.toLowerCase()) ||
                record.email.toLowerCase().includes(query.toLowerCase()) ||
                record.role.toLowerCase().includes(query.toLowerCase())
            )
            })
            return filtered
    }

    function handleSearch(e) {
        const searchBoxValue = e.target.value
        setSearchText(searchBoxValue)
        const filtered=getSearchFilteredData(e,records)
        if(filtered.length===0) {
         var snackBarIdNotFound= enqueueSnackbar('Not Found!',{variant:'warning',autoHideDuration:4000,preventDuplicate:true})
            setFilteredRecords(records)
        }
        else {
          closeSnackbar(snackBarIdNotFound)
            setFilteredRecords(filtered)
        }
        setCurrentPage(1)
       
    }
    
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