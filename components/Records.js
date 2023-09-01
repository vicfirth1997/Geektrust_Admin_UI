import {useEffect,useState} from 'react'
import axios from 'axios'
import DeleteSelectedRows from './DeleteSelectedRows';
import RecordsTable from './RecordsTable';
import Pagination from './Pagination';
import SearchBar from './SearchBar';


const API_URL=
    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    
function Records() {
console.log('in Records...')

const [records,setRecords] = useState([])
const [filteredRecords,setFilteredRecords] = useState([])
const [currentPage,setCurrentPage] = useState(1)
const [searchText,setSearchText] = useState('')
const [selectedRows,setSelectedRows] =useState([])

console.log(records,filteredRecords)
const recordsPerPage=10


useEffect(()=>{
    async function fetchRecords() {
            try{
                console.log('in use Effect')
                const records = await axios.get(API_URL)
                if(records!==null || records.length>0) {
                setRecords(records.data)
                setFilteredRecords(records.data)
            }
            } 
            catch(error) {
                console.log(error)
            }
            
    }
    fetchRecords()
},[])

function handleSearch(e) {
   
    const query = e.target.value
    setSearchText(query)
    const filtered=records.filter((record)=>{
    return(
        record.name.toLowerCase().includes(query.toLowerCase()) ||
        record.email.toLowerCase().includes(query.toLowerCase()) ||
        record.role.toLowerCase().includes(query.toLowerCase())
    )
      
    })
    filtered.length===0?setFilteredRecords(records):setFilteredRecords(filtered)
    setCurrentPage(1)
   
}

function handleRowSelection(e,id) {

    if(e.target.checked) {
        setSelectedRows((prevSelectedRows)=>[...prevSelectedRows,id])
    }
    else {
        setSelectedRows((prevSelectedRows)=>
            prevSelectedRows.filter((recordId)=>recordId!==id)
        )
    }
}

function handleDelete(id) {
    if(!selectedRows.includes(id)) {
        alert('Please select a Row to delete!')
        return
    }
    
    const afterDeletionRecords = records.filter(
        (record)=>!selectedRows.includes(record.id)
    )
    console.log(afterDeletionRecords)
    setRecords(afterDeletionRecords)
    setFilteredRecords(afterDeletionRecords)
    setCurrentPage(1)
    setSelectedRows([])
    

}

function handleSelectAllRows(e) {
    const allRecordsIdsForThePage=currentRecords.map((record)=>record.id)
    if(e.target.checked===true && selectedRows.length!==allRecordsIdsForThePage.length) {
        setSelectedRows(allRecordsIdsForThePage)
    }
    else {
        setSelectedRows([])
    }
}

function handleDeleteSelected() {
    console.log('in here')
    const afterDeletionRecords = records.filter(
        (record)=>!selectedRows.includes(record.id)
    )
    console.log(afterDeletionRecords)
    setRecords(afterDeletionRecords)
    setFilteredRecords(afterDeletionRecords)
    setCurrentPage(1)
    setSelectedRows([])
}

const totalPages = Math.ceil(filteredRecords.length/recordsPerPage)
const indexOfLastRecord = currentPage*recordsPerPage
const indexOfirstRecord = indexOfLastRecord-recordsPerPage
const currentRecords = filteredRecords.slice(indexOfirstRecord,indexOfLastRecord)


    return(        
        <>
        {

        currentRecords.length>0?(
                    <>
                    <SearchBar 
                    searchText={searchText} 
                    handleSearch={handleSearch}
                    />
                    <RecordsTable
                    records={currentRecords}
                    setFilteredRecords={setFilteredRecords}
                    setRecords={setRecords}
                    selectedRows={selectedRows}
                    handleRowSelection={handleRowSelection}
                    handleDelete={handleDelete}
                    handleSelectAllRows={handleSelectAllRows}
                    setCurrentPage={setCurrentPage}
                    fullRecords={records}
                    /> 
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        />
                        <DeleteSelectedRows
                        handleDeleteSelected={handleDeleteSelected}
                        selectedRows={selectedRows}
                        />
                        </>
                   
                        )
                        :''
        }     
       </>
              
    )
}
export default Records