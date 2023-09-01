import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles/ReadOnlyRows.css'
function ReadOnlyRows({record,selected,handleRowSelection,handleEdit,handleDelete}) {
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