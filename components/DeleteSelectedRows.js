import Button from 'react-bootstrap/Button';
import './styles/DeleteSelectedRows.css'
import { useSnackbar } from "notistack";

function DeleteSelectedRows({
    selectedRows,
    setSelectedRows,
    records,
    setRecords,
    setFilteredRecords,
    setCurrentPage
}) {
    const {enqueueSnackbar} = useSnackbar()

    function getAfterDeletionRecords() {
        const afterDeletionRecords = records.filter(
            (record)=>!selectedRows.includes(record.id)
        )
        return afterDeletionRecords
    }

    function handleDeleteSelected() {
        const afterDeletionRecords = getAfterDeletionRecords()
        enqueueSnackbar('Selected rows are Deleted!',{variant:'success',autoHideDuration:2000})
        setRecords(afterDeletionRecords)
        setFilteredRecords(afterDeletionRecords)
        setCurrentPage(1)
        setSelectedRows([])
    }
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