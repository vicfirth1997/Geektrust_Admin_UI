import {useEffect,useState} from 'react'
import axios from 'axios'
import DeleteSelectedRows from './DeleteSelectedRows';
import RecordsTable from './RecordsTable';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import {useSnackbar } from "notistack";

const API_URL=
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    
function Records() {

const [records,setRecords] = useState([])
const [filteredRecords,setFilteredRecords] = useState([])
const [currentPage,setCurrentPage] = useState(1)
const [selectedRows,setSelectedRows] =useState([])

const {enqueueSnackbar} = useSnackbar()
const recordsPerPage=10


useEffect(()=>{
    async function fetchRecords() {
            try{
                const records = await axios.get(API_URL)
                if(records!==null || records.length>0) {
                setRecords(records.data)
                setFilteredRecords(records.data)
            }
            } 
            catch(error) {
              enqueueSnackbar('Problem in serving data from the server!!!',{variant:'error',autoHideDuration:2000,preventDuplicate:true})
            }
            
    }
    fetchRecords()
},[])

const totalPages = Math.ceil(filteredRecords.length/recordsPerPage)
const indexOfLastRecord = currentPage*recordsPerPage
const indexOfirstRecord = indexOfLastRecord-recordsPerPage
const currentRecords = filteredRecords.slice(indexOfirstRecord,indexOfLastRecord)

if(currentRecords.length===0 && records.length===0) return ('')

    return(        
        
                    <>
                    <SearchBar 
                    setCurrentPage={setCurrentPage}
                    setFilteredRecords={setFilteredRecords}
                    records={records}
                    />
                    <RecordsTable
                    records={currentRecords}
                    setFilteredRecords={setFilteredRecords}
                    setRecords={setRecords}
                    selectedRows={selectedRows}
                    setCurrentPage={setCurrentPage}
                    fullRecords={records}
                    setSelectedRows={setSelectedRows}
                    /> 
                    <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    />
                    <DeleteSelectedRows
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    records={records}
                    setRecords={setRecords}
                    setFilteredRecords={setFilteredRecords}
                    setCurrentPage={setCurrentPage}
                    />
                    </>
       
              
    )
}
export default Records