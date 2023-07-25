import React, { useEffect, useState } from 'react';
import { BindRoleForRolePageLInkage, GetPagesForRolePageLinkageByRoleId, RolePageLinkagePost } from './RolePageLinkegService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, useLocation, Link } from "react-router-dom";
import CircularProgress from '@mui/joy/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';
import Modal from 'react-modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchBar from "material-ui-search-bar";
import FormGroup from '@mui/material/FormGroup';
import { CButton, CSpinner } from '@coreui/react';
function AddRolePageLinkegAddRolePageLinkeg() {
    const navigate = useNavigate();

    const [RoleMasterData, setRoleMasterData] = React.useState([]);
    const [RoleMasterData2, setRoleMasterData2] = React.useState([]);
    const [RoleMasterTableData, setRoleMasterTableData] = React.useState([]);
    const [roleSelectedData, setRoleSelectedData] = React.useState([]);
    const [roleName, setnRoleName] = React.useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [loader, setLoader] = React.useState(false);
    const [nRoleId, setnRoleId] = React.useState('');
    const [btActive, setBtActive] = React.useState(false);
    const [saveRight, setSaveRights] = React.useState([]);
    const [editRight, setEditRights] = React.useState([]);
    const [modalIsOpen3, setIsOpen3] = React.useState(false);
    const [searched, setSearched] = React.useState("");
    const [errorText, setErrorText] = React.useState({
        roleName: ''
    });
    const [responseData, setResponseData] = useState([])
    useEffect(() => {
        bindRoleForRolePageLInkage()
    }, [])
    const bindRoleForRolePageLInkage = () => {
        BindRoleForRolePageLInkage().then(res => {
            console.log('res', res)
            setRoleMasterData(res)
        })
    }
    const handleChangeRoleMaster = (event) => {
        const selectedId = event.target.value;
        console.log('event.target.value', event.target.value)
        setnRoleName(selectedId)
        const selectedValue = RoleMasterData.find((item) => item.vRoleName === selectedId);
        console.log("selectedValue", selectedValue)
    };
    const handleBlurRoleMaster = (item) => {
        console.log("itemitemitem", item)
        setnRoleName(item.vRoleName)
        setnRoleId(item.nRoleId)
        getPagesForRolePageLinkageByRoleId(item.nRoleId)
    };
    const createaccessData = (data)=>{
        const filterdata = data.map(item=>{
            return {
                nPageId: item.nPageId,
                btSaveRights: false,
                btEditRights: false,
                btActive: false
            }
        })
        setResponseData(filterdata)
    }
    const getPagesForRolePageLinkageByRoleId = (nRoleId) => {
        GetPagesForRolePageLinkageByRoleId(nRoleId).then(res => {
            createaccessData(res)
            setRoleMasterTableData(res)
            setRoleMasterData2(res)
        })
    }
    const requestSearch = (searchedVal) => {
        console.log("searchedVal.length", searchedVal.length)
        if (searchedVal.length > 0) {
            const filteredRows = RoleMasterTableData.filter((row) => {
                return row.vPageCaption.toLowerCase().includes(searchedVal.toLowerCase()) || row.vModuleName.toLowerCase().includes(searchedVal.toLowerCase() || row.DependentOnPage.toLowerCase().includes(searchedVal.toLowerCase()));
            });
            setRoleMasterTableData(filteredRows);

        }else{
            setRoleMasterTableData(RoleMasterData2)
        }
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        // getVendorMaster_SelectAll()
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
   
    
 
    const validateform = () => {
        if (roleName == '' || roleName == undefined || roleName == null) {
            setErrorText({
                roleName: 'Select Role Name *'
            })
            return false
        } else {
            setErrorText('')
            return true
        }
    }
    const submit = () => {
        if (validateform() == true) {
            setLoader(true)

            let RolePageData = {}
            RolePageData.RolePageLinkage = createAccessPayload(responseData),
                console.log('RolePageData', RolePageData)
            RolePageLinkagePost(RolePageData).then(res => {
                setLoader(false)
                toast.success("Record Added Successfully !!")
                navigate('/RolePageLinkage');

            })

        }
    }
    const openSubmitmodale = () => {
        setIsOpen3(true)

    }
    const createAccessPayload = (data) =>{
        const payloaditems = data.filter(item=> item.btActive || item.btEditRights || item.btSaveRights)
        return payloaditems.map(item=>{
            let copyitem = {...item};
            copyitem['nRoleId'] = nRoleId;
            return copyitem;
            
        });
    }
    
    const handleChecked = (event, id, accessType)=>{
        const copyResponseData = [...responseData];
        setLoader(true)
        const updateRes = copyResponseData.map(item=>{
            let copyitem = {...item}
            // console.log('copyitem', copyitem)
            if(item.nPageId == id){
                if(accessType=='MAIN'){
                     copyitem['btActive'] = event.target.checked;
                     copyitem['btSaveRights'] = event.target.checked;
                     copyitem['btEditRights'] = event.target.checked;
                }else if(accessType=='SAVE_RIGHT'){
                     copyitem['btSaveRights'] = event.target.checked;

                }else{
                     copyitem['btEditRights'] = event.target.checked;
                }
            }
            
            return copyitem;
        })
         return setResponseData(updateRes), setLoader(false)

    }
    
    return (
        <div className='citymasterContainer'>
            {loader == true ?
                <div className='progressBox'>
                    <div className='progressInner'>
                        <CircularProgress />
                    </div>
                </div>
                :
                null

            }
            <div className='rolePageLinkeg_box'>
                <Box className='inputBox-47 mt-4'>
                    <FormControl fullWidth className='input'>
                        <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Select Role</InputLabel>
                        <Select
                            sx={muiStyles.select}
                            style={{ width: '100%', }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roleName}
                            label="Role Name"
                            onChange={handleChangeRoleMaster}

                            name='roleName' >
                            {RoleMasterData.map((item, index) => {
                                return (
                                    <MenuItem key={index} onBlur={() => handleBlurRoleMaster(item)} value={item.vRoleName} id={item.nRoleId}>{item.vRoleName}</MenuItem>
                                )
                            })
                            }
                        </Select>
                        {errorText.roleName != '' ? <p className='error'>{errorText.roleName}</p> : null}
                    </FormControl>
                </Box>
                {RoleMasterTableData?.length > 0 ?
                    <div className='tablecenter mt-3'>

                        <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>
                            {/* <div className='exportandfilter'>
                                <div className='filterbox'>
                                    <Box className='searchbox'>
                                        <SearchBar
                                            value={searched}
                                            onChange={(searchVal) => requestSearch(searchVal)}
                                            onCancelSearch={() => cancelSearch()}
                                        />
                                    </Box>
                                    <FormGroup className='activeonly'>
                                        <FormControlLabel style={{ marginRight: 0, fontSize: 10 }} control={<Checkbox checked={onlyActive} value={onlyActive} onChange={checkedonlyActive} />} label={'Active Data'} />
                                    </FormGroup>
                                </div>
                            </div> */}
                            <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {/* <TableCell scope="row" style={{width:'2%'}}>SN.</TableCell> */}

                                            <TableCell align="left" sx={muiStyles.tableHead}></TableCell>
                                            <TableCell align="left" sx={muiStyles.tableHead}>Page Id</TableCell>
                                            <TableCell align="left" sx={muiStyles.tableHead}>Page Caption</TableCell>
                                            <TableCell align="left" sx={muiStyles.tableHead}>Module Name</TableCell>
                                            <TableCell align="left" sx={muiStyles.tableHead}>Dependent On Page</TableCell>

                                            <TableCell align="left" sx={muiStyles.tableHead}>Save Rights</TableCell>
                                            <TableCell align="left" sx={muiStyles.tableHead}>Edit Rights</TableCell>


                                        </TableRow>
                                    </TableHead>
                                    {RoleMasterTableData?.length > 0 ?
                                        <TableBody>
                                            {/* {RoleMasterTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => { */}
                                            {RoleMasterTableData.map((item, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                      {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}
                          
                                                      <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={true} value={pushbtActive} disabled={true} onChange={e => pushCheckedValues(e, item)} /></TableCell>
                                                      {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.nPageId}</TableCell> */}
                                                      <TableCell align="left" sx={muiStyles.tableBody}>{item.vPageName}</TableCell>
                                                      {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.vModuleName}</TableCell> */}
                                                      <TableCell align="left" sx={muiStyles.tableBody}>{item.DependentOn}</TableCell>
                                                      <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={item.btSaveRights} value={saveRight} onChange={e => changeRights(e,item,'save') } /></TableCell>
                                                      <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={item.btEditRights} value={editRight} onChange={e => changeRights(e,item,'edit') } /></TableCell>
                                                      <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={item.btActive} value={btActive} onChange={e => changeRights(e,item,'btActive') } /></TableCell>
                                                      <TableCell align="left" sx={muiStyles.tableBody}><button className='deletbtn' title='Edit' onClick={() => openmodale(item)}><TbEdit size={20} color='#000' /></button></TableCell>
                                                    </TableRow>
                                                  )
                                            })
                                            }
                                        </TableBody>
                                        :
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" colSpan={7}>No Record</TableCell>
                                            </TableRow>
                                        </TableBody>

                                    }
                                </Table>
                            </TableContainer>
                            {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={RoleMasterTableData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
                        </Paper>
                    </div>
                    : null
                }
            </div>


            <div className='mt-3' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <button type="submit" className='submitbtn-2' style={{ marginRight: 10 }} onClick={() => navigate('/RolePageLinkage')}><HomeIcon size={18} /> Home</button>
                {loader == true ?
                    <CButton disabled className='submitbtn'>
                        <CSpinner component="span" size="sm" aria-hidden="true" />
                        Loading...
                    </CButton>
                    :
                    <button type="submit" className='submitbtn' onClick={openSubmitmodale}>Submit</button>
                }

            </div>
            <Modal
                isOpen={modalIsOpen3}
                style={customStyles1}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Alert !!</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen3(false)} />
                </div>
                <div className='alertmsg'><p>Do you want to Add?</p></div>
                <div className='alertButton' >
                    <button type="submit" className='alertYes' onClick={submit}>Yes</button>
                    <button type="submit" className='alertno' onClick={() => setIsOpen2(false)}>No</button>
                </div>
            </Modal >
        </div>
    )
}
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
                fontSize: '12px',
                position: 'relative'
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
            padding: '3px 8px',
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
const customStyles1 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
    },
};
export default AddRolePageLinkegAddRolePageLinkeg