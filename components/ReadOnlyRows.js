import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles/ReadOnlyRows.css'
import { useSnackbar } from 'notistack';
import { useState } from 'react';

function ReadOnlyRows({
    record,
    records,
    setRecords,
    setFilteredRecords,
    setCurrentPage,
    selectedRows,
    setSelectedRows,
    selected,
    handleRowSelection,
    handleEdit,
    handleDelete
}) {

   const {enqueueSnackbar} = useSnackbar()


function getAfterDeletionRecords(records) {
    const afterDeletionRecords = records.filter(
        (record)=>!selectedRows.includes(record.id)
    )
    return afterDeletionRecords
}

function isRowSelected(id) {
   const result=selectedRows.includes(id)?true:false
   return result
}

 function handleDelete(id) {
   
    if(!isRowSelected(id)) {
        enqueueSnackbar('Please select a Row to delete!',{variant:'warning',autoHideDuration:2000,preventDuplicate:true})
        return
    }
    const afterDeletionRecords=getAfterDeletionRecords(records)
    enqueueSnackbar('Selected row Deleted!',{variant:'success',autoHideDuration:2000})
    setRecords(afterDeletionRecords)
    setFilteredRecords(afterDeletionRecords)
    setCurrentPage(1)
    setSelectedRows([])
    

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

    return(
        <tr>
            <td className={selected===true?'selected':''}>
                <input type="checkbox"
                checked={selected}
                onChange={(e)=>handleRowSelection(e,record.id)}
                />
            </td>
            <td className={selected===true?'selected':''}>{record.name}</td>
            <td className={selected===true?'selected':''}>{record.email}</td>
            <td className={selected===true?'selected':''}>{record.role}</td>
            <td className={selected===true?'selected':''}>
                <div className='action-buttons'>
                    <span><EditIcon className='edit-btn' onClick={(e)=>handleEdit(e,record,record.id)}/></span>
                    <span><DeleteIcon className='delete-btn' onClick={()=>handleDelete(record.id)}/></span>
                    </div>
                    </td>
        </tr>
    ) 
}
export default ReadOnlyRows