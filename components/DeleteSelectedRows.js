import Button from 'react-bootstrap/Button';
import './styles/DeleteSelectedRows.css'
function DeleteSelectedRows({handleDeleteSelected,selectedRows}) {
    return(
        <Button variant='danger'
        className='delete-selected-button p-3'
        size='mb-2'
        onClick={handleDeleteSelected}
        disabled={selectedRows.length===0}
        >Delete Selected</Button>
    )
}
export default DeleteSelectedRows