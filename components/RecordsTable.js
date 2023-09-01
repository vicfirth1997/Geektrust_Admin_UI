import Table from 'react-bootstrap/Table';
import ReadOnlyRows from './ReadOnlyRows';
import React, {useState} from 'react';
import EditableRows from './EditableRows';

function RecordsTable({records,setFilteredRecords,setRecords,selectedRows,handleRowSelection,handleDelete,handleSelectAllRows,setCurrentPage,fullRecords}) {
  
    
    const [editRecordId,setEditRecordId] =useState(null) 
    const [ editFormData,setEditFormData] = useState({
        name:'',
        email:'',
        role:''
    })
    const currentRecords = records.slice(1,10)

    function handleEdit(e,record,id) {
        if(!selectedRows.includes(id)) {
            alert('Please select a Row to Edit!')
            return
        }
        e.preventDefault()
        setEditRecordId(id)
        const valueToBeEdited={
            name:record.name,
            email:record.email,
            role:record.role
        }
        setEditFormData(valueToBeEdited)
    }
    function handleEditFormChange(e) {
        e.preventDefault()
        const editedRowField = e.target.getAttribute('name')
        const editedValue = e.target.value
        setEditFormData({
            ...editFormData,
            [editedRowField]:editedValue
        })
    }
    function handleEditFormSubmit(e) {
        e.preventDefault()
        const editedRowId = selectedRows.find((id)=>id===editRecordId)
        const editedRecord= {
            name:editFormData.name,
            email:editFormData.email,
            role:editFormData.role
        }
        const newRecords = [...fullRecords]
        let indexOfEditedRecord=-1
        for(let i=0;i<fullRecords.length;++i) {
            if(fullRecords[i].id===editedRowId) {
                indexOfEditedRecord = i
                break
            }
        }
        newRecords[indexOfEditedRecord]=editedRecord
        setRecords(newRecords)
        setFilteredRecords(newRecords)
        // setCurrentPage(1)
        setEditRecordId(null)
    }
    function handleCancelClick() {
        setEditRecordId(null)
    }
    return(
        <>
        <form onSubmit={(e)=>handleEditFormSubmit(e)}>
        <Table bordered>
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
                         handleRowSelection={handleRowSelection}
                         editFormData={editFormData}
                         handleCancelClick={handleCancelClick}
                         handleEditFormChange={handleEditFormChange}
                         />)
                        :
                        (<ReadOnlyRows
                        record={record}
                        selected={selectedRows.includes(record.id)}
                        handleRowSelection={handleRowSelection}
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