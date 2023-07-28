import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useNavigate, Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
import { GetRolePageLinkageDetails } from './RolePageLinkegService'
import Checkbox from '@mui/material/Checkbox';
import { TbEdit } from "react-icons/tb";
import CircularProgress from '@mui/joy/CircularProgress';
import {apiUrlAddEdit} from '../../coreservices/environment'
function RolePageLinkegList() {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [brandData, setBrandData] = React.useState([]);
    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const handleDetail = (nRoleId, vRoleName) => {
        navigate('/EditRolePageLinkeg', { state: { nRoleId: nRoleId, vRoleName: vRoleName } });
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        getRolePageLinkageDetails()

        let storedArray = localStorage.getItem('linkAccess');
        const parsedArray = JSON.parse(storedArray);
        let currentURL = window.location.href;
       // let splitcurrentURL = currentURL.split('/')[4]
       let splitcurrentURL
       if(apiUrlAddEdit=='http://localhost:3000'){
           splitcurrentURL = currentURL.split('/')[4] 
       }else{
           splitcurrentURL = currentURL.split('/')[2]
       }
       let filterLinks = parsedArray.filter(e => e.vPageName == splitcurrentURL)
       console.log('filterLinks:', filterLinks[0].btEditRights);
       // setEnableActions(filterLinks)
      if(filterLinks){ setbtSaveRights(filterLinks[0].btSaveRights)
       setbtEditRights(filterLinks[0].btEditRights) }

    }, [])
    const getRolePageLinkageDetails = () => {
        GetRolePageLinkageDetails().then(res => {
            setBrandData(res)
            setLoader(false)

        })
    }

    const handleAdd = () => {
        navigate('/AddRolePageLinkeg');
    }

    return (
        <div className='citymasterContainer'>
            {/* <button  title='Add' onClick={routeChange}><AddIcon fontSize='small' /></button> */}
            {loader == true ?
                <div className='progressBox'>
                    <div className='progressInner'>
                        <CircularProgress />
                    </div>
                </div>
                :
                null

            }
            {/* <div className='exportandfilter_end'>
                <Link to="/AddRolePageLinkeg" className='submitbtn_exp'><AddIcon fontSize='small' /> <span className='addFont'>Add</span></Link>
            </div> */}
            <div className='exportandfilter_end'>
                <button className={btSaveRights == false ? 'submitbtn_exp notAllow' : 'submitbtn_exp'} onClick={handleAdd} title='Add' disabled={btSaveRights == false} ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button>
            </div>

            <div className='tablecenter'>

                <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>
                    <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell scope="row" style={{width:'2%'}}>SN.</TableCell> */}

                                    {/* <TableCell align="left" sx={muiStyles.tableHead}></TableCell> */}
                                    <TableCell align="left" sx={muiStyles.tableHead}>Role Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Alias</TableCell>
                                    {/* <TableCell align="left" sx={muiStyles.tableHead}>Module Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Dependent On Page</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Save Rights</TableCell>
                                    <TableCell align="center" sx={muiStyles.tableHead}>Edit Rights</TableCell>
                                    <TableCell align="center" sx={muiStyles.tableHead}>Status</TableCell> */}
                                    <TableCell align="center" sx={muiStyles.tableHead}>Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            {brandData?.length > 0 ?
                                <TableBody>
                                    {brandData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}

                                                {/* <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={pushbtActive} value={pushbtActive} onChange={e => pushCheckedValues(e, item)} /></TableCell> */}
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vRoleName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vAlias}</TableCell>
                                                {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.vModuleName}</TableCell>
                                            <TableCell align="left" sx={muiStyles.tableBody}>{item.DependentOnPage}</TableCell> */}
                                                {/* <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={saveRight} value={saveRight} onChange={e => setSaveRights(e.target.checked)} /></TableCell>
                                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={editRight} value={editRight} onChange={e => setEditRights(e.target.checked)} /></TableCell>
                                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} /></TableCell> */}
                                                {/* <TableCell align="center" sx={muiStyles.tableBody}><button className='deletbtn' title='Edit' onClick={() => handleDetail(item.nRoleId, item.vRoleName)}><TbEdit size={20} color='#000' /></button></TableCell> */}
                                                <TableCell align="center" sx={muiStyles.tableBody}><button onClick={() => handleDetail(item.nRoleId, item.vRoleName)} disabled={btEditRights == false} className={btEditRights == false ? 'editbtn notAllow' : 'editbtn'} title='Edit'><TbEdit size={20} color='#000' /></button></TableCell>

                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                                :
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={9}>No Record</TableCell>
                                    </TableRow>
                                </TableBody>

                            }
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={brandData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

            <ToastContainer />
        </div >
    )
}
const customStyles = {
    content: {
        top: '50%',
        left: '58%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
    },
};
const muiStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
    },
    date: {
        "& .MuiInputBase-root": {
            "& input": {
                padding: '6px 6px',
                fontSize: '13px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            top: '-13px',
            left: '-10px',
            backgroundColor: 'transparent',
            zIndex: '1'
        },
        "& label.Mui-focused": {
            zIndex: '1'

        },
        '& .MuiInputAdornment-root': {
            position: 'absolute',
            right: '10px'
        }
    },
    autoCompleate: {
        "& .MuiOutlinedInput-root": {
            padding: '0px',
            "& .MuiAutocomplete-input": {
                padding: '6px 6px',
                fontSize: '13px'
            }

        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            backgroundColor: 'transparent',
            top: '-13px',
            left: '-10px',

        },
        "& label.Mui-focused": {
            zIndex: '1'
        }, '& .MuiFormHelperText-root': {
            position: 'absolute',
            fontSize: 10,
            bottom: -18
        },

    },
    input: {
        "& .MuiOutlinedInput-root": {
            "& input": {
                padding: '6px',
                fontSize: '12px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            top: '-13px',
            left: '-10px',
            backgroundColor: 'transparent',
        },
        "& label.Mui-focused": {
            zIndex: '1'
        }, '& .MuiFormHelperText-root': {
            position: 'absolute',
            fontSize: 10,
            bottom: -18
        },

    },
    select: {

        "& .MuiSelect-select": {
            padding: '3px',
            fontSize: '12px'
        },


    },
    InputLabels: {
        fontSize: '13px',
        top: '-13px',
        left: '-10px',
        backgroundColor: 'transparent',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
    tableBox: {
        "&.MuiTableContainer-root": {
            width: '100%',
            maxHeight: '440px',
            padding: '0px 16px',
        },
    },
    tableHead: {
        "&.MuiTableCell-root": {
            padding: '8px',
            fontWeight: 'bold'
        }
    },
    tableBody: {
        "&.MuiTableCell-root": {
            padding: '8px',
            fontSize: '14px',
            lineHeight: '39px'
        }
    },
    checkboxLabel: {
        "&.MuiFormControlLabel-root": {
            "&.MuiTypography-root": {
                fontSize: '14px'
            }
        }
    },


};
export default RolePageLinkegList