import './TableAndpaginationContainer.css'
import React, {useState, useEffect} from "react"
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { Box, CircularProgress, Typography } from "@mui/material";
import Pagination from './Pagination'
import Table from './Table'
import SearchBar from './SearchBar';
import URL from '../utils/utils';


function TableAndPaginationContainer() {

    const [records,setRecords] = useState([])
    const [searchValue,setSearchValue] = useState('')
    const [selectedRows,setSelectedRows] = useState(false)
    const [loadingSpinner,setLoadingSpinner] = useState(false)
    const [editRow,setEditRow] = useState({
        editStatus:false,
        recordId:null
    })
    const { enqueueSnackbar } = useSnackbar();
    const [isDataFetched,setIsDataFetched]=useState(false)
    const [filteredRecords,setFilteredRecords] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const recordsPerPage =10

    let totalPages = Math.ceil(records.length/10)
 
    const fetchRecords = async()=>{
        setLoadingSpinner(true)
        let res;
        try{
            res=await axios.get(URL)
            setLoadingSpinner(false)
            return res.data
        } catch(error) {
            setLoadingSpinner(true)
            enqueueSnackbar(error.response.res.message,{variant:'error'})
        }
    }
    useEffect(()=>{
        fetchRecords()
        .then((response)=>{
            setRecords(response)
            setIsDataFetched(true)
        })
        .catch((error)=>{
            setIsDataFetched(false)
            enqueueSnackbar("Cannot fetch data from the server!",{variant:'error'})
        })
    },[])

    useEffect(()=>{
        setFilteredRecords([])
        setSelectedRows(false)
    },[currentPage])

    /**
     * 
     * @param {The value typed in the search bar} searchValue 
     * @returns {The employee records which matches with the typed value}
     */
  function getRecordsByNameEmailRole(searchValue) {
    let filteredRecords = []
    filteredRecords = records.filter((record)=>{
        return (
            record.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            record.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            record.role.toLowerCase().includes(searchValue.toLowerCase())
        )
    })
    totalPages=Math.ceil(filteredRecords.length/10)
    return filteredRecords
  }

  /**
   * @param {The record Id of the employee record which is checked on the check-box} recordId 
   */
  function handleRowSelection(recordId) {
    let filteredRecordsCopy = [...filteredRecords]
    if(filteredRecords.includes(recordId)) {
        filteredRecordsCopy = filteredRecordsCopy.filter((id)=>id!==recordId)
    } else {
        filteredRecordsCopy.push(recordId)
    }
    setFilteredRecords(filteredRecordsCopy)
  }

  /**
   * Select Multiple Rows.
   */
  function handleSelectAllRows() {
    let records=[]
    if(!selectedRows) {
        currentPageRecords.forEach((record)=>{
            records.push(record.id)
        })
        setFilteredRecords(records)
        setSelectedRows(true)
    } else {
        setFilteredRecords(records)
        setSelectedRows(false)
    }
  }

  /**
   * 
   * @param {Event Object} e 
   * @param {The record Id of the row which is being edited} recordId 
   */
  function updateRecordsData(e,recordId) {
    let recordsCopy = JSON.parse(JSON.stringify(records))
    for(let i=0;i<recordsCopy.length;++i) {
        if(recordsCopy[i].id=== recordId) {
            recordsCopy[i][e.target.name] = e.target.value
        }
    }
    setRecords(recordsCopy)
  }

  /**
   * Delete multiple Rows which are selected
   */
  function deleteSelectedRows() {
    let selectedRecordsAfterDeletion = [...records]
    selectedRecordsAfterDeletion = selectedRecordsAfterDeletion.filter((record)=>!filteredRecords.includes(record.id))
    setRecords(selectedRecordsAfterDeletion)
    setFilteredRecords([])
    setSelectedRows(false)
    enqueueSnackbar('Selected Rows are deleted successfully',{variant:'success'})

  }

  /**
   * @param {Record Id of the row which is to be deleted} recordId 
   */
  function deleteARow(recordId) {
    let recordsAfterDeletion=[]
    recordsAfterDeletion=records.filter((record)=> record.id!==recordId)
    setRecords(recordsAfterDeletion)
    enqueueSnackbar('Row deleted successfully',{variant:'success'})
  }

/**
 * 
 * @param {email entered by the user when editing} email 
 * @returns {Whether a valid email or not}
 */
  function emailValidation(email) {
    const correctFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if(!email.match(correctFormat)) {
        alert('Enter a vaild email id')
        return false
    }
    return true
  }

  /**
   * @param {Record Id of the row which is to be edited} recordId 
   * @returns {Whether the enitre Row Data is valid or not}
   */
  function rowDataValidation(recordId) {
    for(let i=0;i<records.length;++i) {
        if(records[i].id===recordId) {
            if(records[i].name==='' || records[i].email==='' || !emailValidation(records[i].email)) {
                if(records[i].name==='') alert('Name cannot be empty')
                if(records[i].email==='') alert('Email cannot be empty')
                return false
            } 
        }
    }
    return true
  }

  function handlePrevPageClick() {
    if(currentPage>1) {
        setCurrentPage((prevPage)=>prevPage-1)
    }
}

  function handleNextPageClick() {
    if(currentPage<totalPages) {
        setCurrentPage((prevPage)=> prevPage+1)
    }
}
    /**
     * @param {records according to the search bar value} recordsList 
     * @returns {Current Page records according to the Pagination}
     */
    function getCurrentPageRecords(recordsList) {
        let currentPageRecords=[]
        const indexOfLastRecord = currentPage*recordsPerPage
        const indexOfFirstRecord = indexOfLastRecord-recordsPerPage
        currentPageRecords = recordsList.slice(indexOfFirstRecord,indexOfLastRecord)

        if(currentPageRecords.length===0 && currentPage!==1) {
            handlePrevPageClick()
        }
        return currentPageRecords
    }


   const currentPageRecords=searchValue==='' ? getCurrentPageRecords(records)
                     : getCurrentPageRecords(getRecordsByNameEmailRole(searchValue))

 // If there is some problem in fetching the data then handle it here itself.
   if(isDataFetched===false) {
    return(
        <>
        <h5>
            Cannot Fetch Data at the moment!. Try after sometime.
        </h5>
        </>
    )
}

    return (
        <React.Fragment>
            
            <SearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            {
                loadingSpinner ? (
                    <Box className='loading'>
                    <CircularProgress />
                    <Typography variant="h5">Loading Records</Typography>
                  </Box>
                ) 
                : records.length!==0?(
                  <Table
                    records={currentPageRecords}
                    recordsSelected = {filteredRecords}
                    selectedRows={selectedRows}
                    handleSelectAllRows={handleSelectAllRows}
                    handleEditRecords={(recordId)=>{
                        setEditRow({editStatus:true,recordId:recordId})
                    }}
                    handleSaveRecordsAfterEdit={(recordId)=>{
                        let isDataEnteredValid=rowDataValidation(recordId)
                        if(isDataEnteredValid) {
                            setEditRow({
                                editStatus:false,
                                recordId:null
                            })
                            
                        }
                        enqueueSnackbar('Data Edited successfully',{variant:'success'})
                    }}
                    editRow={editRow}
                    handleDeleteRow={(recordId)=>deleteARow(recordId)}
                    handleRowSelection={(recordId)=>handleRowSelection(recordId)}
                    handleUpdateRecordsData={(e,recordId)=>updateRecordsData(e,recordId)}
                  />
                ):(
                    <h1 className='empty-records'>All Records Deleted!, no more records to display</h1>
                )
            }
                
                <div className='pagination-deleteselected-container'>
                        <button className='deleteselected-btn' onClick={deleteSelectedRows}>
                            Delete Selected
                        </button>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePagesClick={(pageNum)=>setCurrentPage(Number(pageNum))}
                        handleToFirstPageClick={()=>setCurrentPage(1)}
                        handleToLastPageClick={()=>setCurrentPage(totalPages)}
                        handlePrevPageClick={handlePrevPageClick}
                        handleNextPageClick={handleNextPageClick}
                    />
                </div>

        </React.Fragment>
    )
}
export default TableAndPaginationContainer