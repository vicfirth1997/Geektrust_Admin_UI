import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function EditableRows({record
    ,selected
    ,handleRowSelection
    ,editFormData
    ,handleCancelClick
    ,handleEditFormChange}) 
    {
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