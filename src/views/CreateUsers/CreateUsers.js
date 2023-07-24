import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { GetAllUserDetails, UserMasterPost, UpdateUserStatus } from './CreateUsersApi'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react';
import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import { TbEdit } from "react-icons/tb";
import { RoleMaster_SelectAll } from '../RoleMaster/RoleMasterApi';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { confirmAlert } from 'react-confirm-alert';

function CreateUsers() {
    let Heading = [['SN.', 'Storage Condition', 'Storage Condition Prefix', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpen1, setIsOpen1] = React.useState(false);
    const [modalIsOpen2, setIsOpen2] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [brandData, setBrandData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader2, setLoader2] = React.useState(false);
    const [nBid, setnBid] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [brandCode, setBrandCode] = React.useState("");
    const [brandName, setBrandName] = React.useState("");
    const [vPrefix, setvPrefix] = React.useState("");
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const tableRef = useRef(null);
    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);
    const [matchResult, setMatchResult] = useState(null);
    const [matchResult2, setMatchResult2] = useState(null);

    const [nUserId, setnUserId] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [vFullName, setvFullName] = React.useState('');
    const [vUserName, setvUserName] = React.useState('');

    const [vPassword, setvPassword] = React.useState('');
    const [vMobileNo, setvMobileNo] = React.useState('');

    const [vEmailId, setvEmailId] = React.useState('');
    const [nRoleId, setnRoleId] = React.useState('');

    const [RoleMasterData, setRoleMasterData] = React.useState([]);
    const [roleName, setnRoleName] = React.useState("");

    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);

    const [loader, setLoader] = React.useState(false);

    const { register, handleSubmit, control, errors } = useForm();

    const [errorText, setErrorText] = React.useState({
        roleName: ''
    });

    const [showPassword, setShowPassword] = React.useState(false);

    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getStorageConditionMaster_SelectAll()
    }

    useEffect(() => {
        getStorageConditionMaster_SelectAll()

        let storedArray = localStorage.getItem('linkAccess');
        const parsedArray = JSON.parse(storedArray);
        let currentURL = window.location.href;
        let splitcurrentURL = currentURL.split('/')[4]
        // let splitcurrentURLLive = currentURL.split('/')[2]
        console.log('current URL:', currentURL.split('/'));
        console.log('splitcurrent URL:', splitcurrentURL);
        let filterLinks = parsedArray.filter(e => e.vPageName == splitcurrentURL)
        console.log('filterLinks[0].btSaveRights:', filterLinks[0].btSaveRights);
        console.log('filterLinks[0].btEditRights:', filterLinks[0].btEditRights);
        // setEnableActions(filterLinks)
        setbtSaveRights(filterLinks[0].btSaveRights)
        setbtEditRights(filterLinks[0].btEditRights)

    }, [])

    const getStorageConditionMaster_SelectAll = () => {
        setLoader2(true)
        GetAllUserDetails().then(response => {
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setBrandData(activeData)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                let inactiveData = response.filter(e => e.btActive == false)
                setBrandData(inactiveData)
                setMasterBrandData(inactiveData)
                setLoader2(false)
            }
        })
    }

    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = brandData.filter((row) => {
                return row.vFullName.toLowerCase().includes(searchedVal.toLowerCase())
                // || row.vSCPrefix.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setBrandData(filteredRows);
        } else {
            setBrandData(masterbrandData);
        }
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getStorageConditionMaster_SelectAll()
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openmodale = (item, type) => {
        if (type == 'Submit') {
            setIsOpen(true)
            setbuttonName(type)
            setvFullName('')
            setvUserName('')
            setvPassword('')
            setvMobileNo('')
            setvEmailId('')
            setnRoleId('')
            setBtActive(true)
            setdisabled(true)
            setLoader(false)
        } else {
            setIsOpen(true)
            setnBid(item.nUserId)
            setvFullName(item.vFullName)
            setvUserName(item.vUserName)
            setvPassword(item.vPassword)
            setvMobileNo(item.vMobileNo)
            setvEmailId(item.vEmailId)
            setnRoleId(item.nRoleId)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
            setLoader(false)
        }
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleMobileNumberChange = (event) => {
        const { value } = event.target;
        // Basic validation to allow only numeric characters and limit the input to 10 digits
        if (/^\d*$/.test(value) && value.length <= 10) {
            setvMobileNo(value);
        }
    };

    const handleEmailChange = (event) => {
        setvEmailId(event.target.value);
    };

    const isValidEmail = (email) => {
        // Basic email validation using a regular expression
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    useEffect(() => {
        const userId = localStorage.getItem("nUserId")
        setnUserId(userId)
    }, [])

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

    useEffect(() => {
        getRoleMaster_SelectAll()
    }, [])

    const getRoleMaster_SelectAll = () => {
        RoleMaster_SelectAll().then(response => {
            setRoleMasterData(response)
        })
    }

    const handleChangeRoleMaster = (event) => {
        const selectedId = event.target.value;
        setnRoleName(selectedId)
        const selectedValue = RoleMasterData.find((item) => item.vRoleName === selectedId);
        console.log("selectedValue", selectedValue)
    };

    const handleBlurRoleMaster = (item) => {
        console.log("itemitemitem", item)
        setnRoleName(item.vRoleName)
        setnRoleId(item.nRoleId)
    };

    const submit = () => {
        if (validateform() == true) {
            setLoader(true)
            setErrorText('')
            let data = {
                vFullName: vFullName,
                vUserName: vUserName,
                vPassword: vPassword,
                vMobileNo: vMobileNo,
                vEmailId: vEmailId,
                nRoleId: parseInt(nRoleId),
            }
            UserMasterPost(data).then(res => {
                if (res) {
                    toast.success(res)
                    setLoader(false)
                    setnRoleName('')
                    setvFullName('')
                    setvUserName('')
                    setvMobileNo('')
                    setvEmailId('')
                    setvPassword('')
                    setError('')
                }
            })
        }
    }

    const updateStatusModal = (item, type) => {
        console.log("item", item)
        console.log("type", type)
        setUserId(item.nUserId)
        if (type == 'revoke') {
            console.log('item', item)
            setIsOpen1(true)
        } else {
            console.log('item', item)
            setIsOpen2(true)
        }
    };

    const updateStatus = () => {
              setLoader(true)
        let data = {
            nUserId: userId
        }
        UpdateUserStatus(data).then(res => {
            if (res) {
                toast.success(res)
                setLoader(false)
                setIsOpen1(false)
                setIsOpen2(false)
                getStorageConditionMaster_SelectAll()
            }
        })
    }

    return (
        <div className='citymasterContainer'>
            {loader2 == true ?
                <div className='progressBox'>
                    <div className='progressInner'>
                        <CircularProgress />
                    </div>
                </div>
                :
                null
            }
            <div className='add_export'>
                {/* <button className='submitbtn_exp' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
                <button className={btSaveRights == false ? 'submitbtn_exp notAllow' : 'submitbtn_exp'} onClick={() => openmodale(null, 'Submit')} title='Add' disabled={btSaveRights == false} ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button>

                <ExportExcel excelData={brandData} Heading={Heading} fileName={'CreateUsers_Master'} />
            </div>

            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Create Users</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend mt-4'>
                    <Box className='inputBox-48 mt-4' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                onChange={e => setvFullName(e.target.value)}
                                required id="outlined-basic"
                                label="Full Name"
                                variant="outlined"
                                value={vFullName}
                                name='vFullName'
                                inputRef={register({ required: "Full Name is required.*", })}
                                error={Boolean(errors.vFullName)}
                                helperText={errors.vFullName?.message} />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-48 mt-4' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                onChange={e => setvUserName(e.target.value)}
                                required id="outlined-basic"
                                label="User Name"
                                variant="outlined"
                                value={vUserName}
                                name='vUserName'
                                inputRef={register({ required: "User Name is required.*", })}
                                error={Boolean(errors.vUserName)}
                                helperText={errors.vUserName?.message} />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-48 mt-4' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                onChange={handleMobileNumberChange}
                                required id="outlined-basic"
                                label="Mobile No."
                                variant="outlined"
                                type="tel"
                                value={vMobileNo}
                                name='vMobileNo'
                                inputRef={register({ required: "Mobile No. is required.*", })}
                                error={Boolean(errors.vMobileNo)}
                                helperText={errors.vMobileNo?.message} />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-47 mt-4' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                // onChange={e => setvEmailId(e.target.value)} handleEmailChange
                                onChange={handleEmailChange}
                                required id="outlined-basic"
                                label="Email Id"
                                variant="outlined"
                                type="email"
                                value={vEmailId}
                                name='vEmailId'
                                inputRef={register({ required: "Email Id is required.*", })}
                                // error={Boolean(errors.vEmailId)}
                                // helperText={errors.vEmailId?.message} 
                                error={vEmailId && !isValidEmail(vEmailId)}
                                helperText={vEmailId && !isValidEmail(vEmailId) ? 'Invalid email format' : ''}
                            />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-47 mt-4' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                onChange={e => setvPassword(e.target.value)}
                                required id="outlined-basic"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                value={vPassword}
                                name='vPassword'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePasswordVisibility}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                inputRef={register({ required: "Password is required.*", })}
                                error={Boolean(errors.vPassword)}
                                helperText={errors.vPassword?.message} />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-47 mt-4'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Role Id</InputLabel>
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
                </div>
                <div className='displayflexend-2'>
                    <FormGroup >
                        <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox defaultChecked={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                    </FormGroup>
                    {loader == true ?
                        <CButton disabled className='submitbtn'>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Loading...
                        </CButton>
                        :
                        <button type="submit" className='submitbtn' onClick={handleSubmit(submit)}>{buttonName}</button>
                    }
                </div>
            </Modal >
            <div className='tablecenter'>
                <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>
                    <div className='exportandfilter'>
                        <div className='filterbox'>
                            <Box className='searchbox' >
                                <SearchBar
                                    value={searched}
                                    onChange={(searchVal) => requestSearch(searchVal)}
                                    onCancelSearch={() => cancelSearch()}
                                />
                            </Box>
                            <FormGroup className='activeonly'>
                                <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox checked={onlyActive} value={onlyActive} onChange={checkedonlyActive} />} label="Active Data" />
                            </FormGroup>
                        </div>
                    </div>

                    <TableContainer sx={muiStyles.tableBox} className='tableBox' style={{ width: '100%', overflowX: 'auto' }}>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell scope="row">SN.</TableCell> */}
                                    <TableCell align="left" sx={muiStyles.tableHead} >Full Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >User Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Mobile No</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Email Id</TableCell>
                                    {/* <TableCell align="left" sx={muiStyles.tableHead} >Role Id</TableCell> */}
                                    <TableCell align="left" sx={muiStyles.tableHead} >Password</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Role Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Alias</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Status</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Active / Inactive</TableCell>
                                </TableRow>
                            </TableHead>
                            {brandData?.length > 0 ?
                                <TableBody>
                                    {brandData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vFullName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vUserName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vMobileNo}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vEmailId}</TableCell>
                                                {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.nRoleId}</TableCell> */}
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vPassword}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vRoleName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vAlias}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.btActive === true ? <div onClick={() => updateStatusModal(item, 'revoke')} className='revokebtn'>Revoke</div> : <div onClick={() => updateStatusModal(item, 'active')} className='activebtn'>Active</div>}</TableCell>
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
                        rowsPerPageOptions={[10, 25, 100]}
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

            <Modal
                isOpen={modalIsOpen1}
                style={customStyles1}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Alert !!</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen1(false)} />
                </div>
                <div className='alertmsg'><p>Do you want to Revoke?</p></div>
                <div className='alertButton' >
                    <button type="submit" className='alertYes' onClick={updateStatus}>Yes</button>
                    <button type="submit" className='alertno' onClick={() => setIsOpen1(false)}>No</button>
                </div>
            </Modal >

            <Modal
                isOpen={modalIsOpen2}
                style={customStyles1}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Alert !!</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen2(false)} />
                </div>
                <div className='alertmsg'><p>Do you want to Active?</p></div>
                <div className='alertButton' >
                    <button type="submit" className='alertYes' onClick={updateStatus}>Yes</button>
                    <button type="submit" className='alertno' onClick={() => setIsOpen2(false)}>No</button>
                </div>
            </Modal >
        </div >
    )
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
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
            lineHeight: '22px'
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
export default CreateUsers