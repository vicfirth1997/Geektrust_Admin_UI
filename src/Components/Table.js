import './Table.css'
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import React from 'react';

function Table({
    records,
    recordsSelected,
    selectedRows,
    handleSelectAllRows,
    handleEditRecords,
    handleSaveRecordsAfterEdit,
    editRow,
    handleDeleteRow,
    handleRowSelection,
    handleUpdateRecordsData
}) {
    return(
        <Box className='container'>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type='checkbox'
                                className='check-box'
                                style={{ width: "16px", height: "16px" }}
                                checked={selectedRows}
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
                    {
                        records.map((record)=>{
                            return(
                                <tr
                                style={{
                                    height: "44px"
                                  }}
                                  key={record.id}
                                  className={
                                    recordsSelected.includes(record.id) ? 'select-row':null
                                  }
                                >
                                <td>
                                    <input
                                        type='checkbox'
                                        className='check-box'
                                        style={{ width: "16px", height: "16px" }}
                                        checked={recordsSelected.includes(record.id)}
                                        onChange={()=>handleRowSelection(record.id)}
                                    />
                                </td>
                                  {editRow.editStatus && editRow.recordId === record.id ? (
                                    <React.Fragment>
                                        <td>
                                            <input
                                                name='name'
                                                value={record.name}
                                                onChange={(e)=>handleUpdateRecordsData(e,record.id)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name='email'
                                                value={record.email}
                                                onChange={(e)=>handleUpdateRecordsData(e,record.id)}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name='role'
                                                value={record.role}
                                                onChange={(e)=>handleUpdateRecordsData(e,record.id)}
                                            >
                                                <option value="member">
                                                    member
                                                </option>
                                                <option value="admin">
                                                    admin
                                                </option>
                                            </select>
                                        </td>
                                    </React.Fragment>
                                  ) : (

                                    <React.Fragment>
                                        <td>{record.name}</td>
                                        <td>{record.email}</td>
                                        <td>{record.role}</td>
                                    </React.Fragment>
                                  )}
                                    <td>
                                        {editRow.editStatus && editRow.recordId === record.id ? (
                                            <button
                                                className='save-button'
                                                onClick={()=>handleSaveRecordsAfterEdit(record.id)}
                                            >
                                               <DoneIcon />
                                            </button>
                                        ):(
                                            <button
                                                className='edit-button'
                                                onClick={()=>handleEditRecords(record.id)}
                                            >
                                                <EditOutlinedIcon />
                                            </button>
                                        )}
                                        <button 
                                                className='delete-button'
                                                onClick={()=>handleDeleteRow(record.id)}>
                                                <DeleteOutlineIcon sx={{ color: "red" }} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Box>
    )
}
export default Table