import Table from 'react-bootstrap/Table';
import ReadOnlyRows from './ReadOnlyRows';
import React, {useState} from 'react';
import EditableRows from './EditableRows';
import { useSnackbar } from 'notistack';
import './styles/RecordsTable.css'

function RecordsTable({
    records,
    setFilteredRecords,
    setRecords,
    selectedRows,
    handleDelete,
    setCurrentPage,
    fullRecords,
    setSelectedRows
}) {
  
    const [editRecordId,setEditRecordId] =useState(null) 
    const [ editFormData,setEditFormData] = useState({
        name:'',
        email:'',
        role:''
    })
    const currentRecords = records.slice(1,10)
    const {enqueueSnackbar} = useSnackbar()

    function isRowSelected(id) {
        const result=selectedRows.includes(id)?true:false
        return result
     }
    function getValuesToBeEdited(record) {
        const valueToBeEdited={
            name:record.name,
            email:record.email,
            role:record.role
        }
        return valueToBeEdited
    }

    function handleEdit(e,record,id) {
        e.preventDefault()
        if(!isRowSelected(id)) {
            enqueueSnackbar('Please select a Row to Edit!',{variant:'warning',autoHideDuration:2000,preventDuplicate:true})
            return
        }
        setEditRecordId(id)
        const valueToBeEdited=getValuesToBeEdited(record)
        setEditFormData(valueToBeEdited)
    }

    function getEditedRowId() {
        const editedRowId = selectedRows.find((id)=>id===editRecordId)
        return editedRowId
    }
    function getEditedRowData() {
        const editedRecord= {
            name:editFormData.name,
            email:editFormData.email,
            role:editFormData.role
        }
        return editedRecord
    }
    function getEditedRowIndex(editedRowId) {
        let indexOfEditedRecord=-1
        for(let i=0;i<fullRecords.length;++i) {
            if(fullRecords[i].id===editedRowId) {
                indexOfEditedRecord = i
                break
            }
        }
        return indexOfEditedRecord
    }
    
    function handleEditFormSubmit(e) {
        e.preventDefault()
        const editedRowId = getEditedRowId()
        const editedRecord=getEditedRowData()
        const indexOfEditedRecord=getEditedRowIndex(editedRowId)
        const newRecords = [...fullRecords]
        newRecords[indexOfEditedRecord]=editedRecord
        setRecords(newRecords)
        setFilteredRecords(newRecords)
        setEditRecordId(null)
        enqueueSnackbar('Selected row Edited',{variant:'success',autoHideDuration:2000})
    }

    function handleCancelClick() {
        setEditRecordId(null)
    }

    function handleSelectAllRows(e) {
        const allRecordsIdsForThePage=records.map((record)=>record.id)
        if(e.target.checked===true && selectedRows.length!==allRecordsIdsForThePage.length) {
            setSelectedRows(allRecordsIdsForThePage)
        }
        else {
            setSelectedRows([])
        }  
    }

    return(
        <>
        <form onSubmit={(e)=>handleEditFormSubmit(e)}>
        <Table bordered responsive className='no-wrap'>
        <thead>
            <tr>
                <th>
                    <input type='checkbox'
                    checked={selectedRows.length===currentRecords}
                    onChange={handleSelectAllRows}
                    />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {records.map((record)=>{
                return(
                    <React.Fragment key={record.id}>
                        {editRecordId===record.id?
                         (<EditableRows
                         record={record}
                         selected={selectedRows.includes(record.id)}
                         editFormData={editFormData}
                         handleCancelClick={handleCancelClick}
                         setEditFormData={setEditFormData}
                         />)
                        :
                        (<ReadOnlyRows
                        record={record}
                        records={records}
                        setRecords={setRecords}
                        setFilteredRecords={setFilteredRecords}
                        setCurrentPage={setCurrentPage}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        selected={selectedRows.includes(record.id)}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />)
                        }
                    </React.Fragment>
                )
            })}
        </tbody>
        </Table>
        </form>
        </>
    )
}
export default RecordsTable