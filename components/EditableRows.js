import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function EditableRows({
    record
    ,selected
    ,editFormData
    ,handleCancelClick
    ,setEditFormData
}) 
    {

        function handleRowSelection(e,id) {
            e.target.checked?
            setSelectedRows((prevSelectedRows)=>[...prevSelectedRows,id]):
            prevSelectedRows.filter((recordId)=>recordId!==id)
        }

        function getEditedFieldAndValue(e) {
            const editedRowField = e.target.getAttribute('name')
            const editedValue = e.target.value
            return[editedRowField,editedValue]
        }

        function handleEditFormChange(e) {
            e.preventDefault()
          const  [editedRowField,editedValue] = getEditedFieldAndValue(e)
            setEditFormData({
                ...editFormData,
                [editedRowField]:editedValue
            })
        }

    return(
        <tr>
             <td className={selected===true?'selected':''}>
                <input type="checkbox"
                checked={selected}
                onChange={(e)=>handleRowSelection(e,record.id)}
                />
            </td>
            <td>
                <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={(e)=>handleEditFormChange(e)}
                />
            </td>
            <td>
                 <input
                type="text"
                name="email"
                value={editFormData.email}
                onChange={(e)=>handleEditFormChange(e)}
                />
            </td>
            <td>
                 <input
                type="text"
                name="role"
                value={editFormData.role}
                onChange={(e)=>handleEditFormChange(e)}
                />
            </td>
            <td>
                <div className='action-buttons'>
                    <button type='submit'><SaveIcon/></button>
                    <span><CancelIcon onClick={()=>handleCancelClick()}/></span>
                </div>
            </td>
        </tr>
    )
    }
export default EditableRows