import React, { useEffect } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { VendorMaster_SelectAll, VendorMasterPost, VendorMasterPut } from './VenderFormService'
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
import { CSpinner } from '@coreui/react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CForm,
    CFormInput,
    CImage,
    CNavbar,
    CNavbarNav,
    CNavbarBrand,
    CNavbarText,
    CNavbarToggler,
    CNavLink,
    CDropdown,
    CButton,
  } from '@coreui/react'
import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import { Tooltip } from 'react-tooltip'
import { TbEdit } from "react-icons/tb";
function VenderForm() {
    let Heading = [['SN.', 'Vendor Code', 'Vendor Name', 'Vendor Address', 'Contact Person', 'Mobile No', 'Email Id', 'GST No', 'Remarks', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [vendorData, setVendorData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [nVId, setnVId] = React.useState(0);
    const [vVendorCode, setvVendorCode] = React.useState("");
    const [vVendorName, setvVendorName] = React.useState("");
    const [vVendorAddress, setvVendorAddress] = React.useState("");
    const [vContactPerson, setvContactPerson] = React.useState(0);
    const [vMobileNo, setvMobileNo] = React.useState(false);
    const [vEmailId, setvEmailId] = React.useState("");
    const [vGSTNo, setvGSTNo] = React.useState("");
    const [vRemarks, setvRemarks] = React.useState("");
    const [btActive, setbtActive] = React.useState(false);
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const { register, handleSubmit, control, errors } = useForm();
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
            setvVendorCode('')
            setvVendorName('')
            setvVendorAddress('')
            setvContactPerson('')
            setvMobileNo('')
            setvEmailId('')
            setvGSTNo('')
            setvRemarks('')
            setbtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnVId(item.nVId)
            setvVendorCode(item.vVendorCode)
            setvVendorName(item.vVendorName)
            setvVendorAddress(item.vVendorAddress)
            setvContactPerson(item.vContactPerson)
            setvMobileNo(item.vMobileNo)
            setvEmailId(item.vEmailId)
            setvGSTNo(item.vGSTNo)
            setvRemarks(item.vRemarks)
            setbtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
        }
    }
    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getVendorMaster_SelectAll()
    }
    useEffect(() => {
        getVendorMaster_SelectAll()
    }, [])
    const getVendorMaster_SelectAll = () => {
        setLoader2(true)
        VendorMaster_SelectAll().then(response => {

            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setVendorData(activeData)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                let inactiveData = response.filter(e => e.btActive == false)
                setVendorData(inactiveData)
                setMasterBrandData(inactiveData)
                setLoader2(false)

            }
        })
    }
    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = vendorData.filter((row) => {
                return row.vVendorCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vVendorName.toLowerCase().includes(searchedVal.toLowerCase()) || row.vVendorAddress.toLowerCase().includes(searchedVal.toLowerCase()) || row.vContactPerson.toLowerCase().includes(searchedVal.toLowerCase()) || row.vMobileNo.toLowerCase().includes(searchedVal.toLowerCase()) || row.vEmailId.toLowerCase().includes(searchedVal.toLowerCase()) || row.vGSTNo.toLowerCase().includes(searchedVal.toLowerCase()) || row.vRemarks.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setVendorData(filteredRows);
        } else {
            setVendorData(masterbrandData);
        }
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getVendorMaster_SelectAll()
    };
    const submit = () => {
        setLoader(true)
        let vendor = {
            nVId: nVId == null ? 0 : nVId,
            vVendorCode: vVendorCode,
            vVendorName: vVendorName,
            vVendorAddress: vVendorAddress,
            vContactPerson: vContactPerson,
            vMobileNo: vMobileNo,
            vEmailId: vEmailId,
            vGSTNo: vGSTNo,
            vRemarks: vRemarks,
            btActive: btActive,
        }
        if (buttonName == 'Submit') {
            VendorMasterPost(vendor).then(res => {
                if (res) {

                    toast.success("Record Added Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    getVendorMaster_SelectAll()
                }
            })
        } else {
            VendorMasterPut(vendor).then(res => {
                if (res) {
                    toast.success("Record Updated Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    getVendorMaster_SelectAll()
                }
            })
        }
    }
    return (
        <div className='citymasterContainer'>
             <div className='add_export'>
                <button className='submitbtn_exp' onClick={() => openmodale(null, 'Submit')} title='Add'><AddIcon fontSize='small' /><span className='addFont'>Add</span></button>
                <ExportExcel excelData={vendorData} Heading={Heading} fileName={'Vendor_Master'} />
            </div>
            {loader2 == true ?
                <div className='progressBox'>
                    <div className='progressInner'>
                        <CircularProgress />
                    </div>
                </div>
                :
                null
            }
           
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <div className='displayright mb-4'>
                    <div><span className='title'>Vendor Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box className='inputBox-1'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vVendorCode}
                                onChange={e => setvVendorCode(e.target.value)}
                                id="outlined-basic"
                                label="Vendor Code"
                                required
                                variant="outlined"
                                name='vVendorCode'
                                inputRef={register({ required: "Vendor Code is required.*", })}
                                error={Boolean(errors.vVendorCode)}
                                helperText={errors.vVendorCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-1' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vVendorName}
                                onChange={e => setvVendorName(e.target.value)}
                                id="outlined-basic"
                                required
                                label="Vendor Name"
                                variant="outlined"
                                name='vVendorName'
                                inputRef={register({ required: "Vendor Name is required.*", })}
                                error={Boolean(errors.vVendorName)}
                                helperText={errors.vVendorName?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-2' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vContactPerson}
                                onChange={e => setvContactPerson(e.target.value)}
                                id="outlined-basic"
                                label="Contact Person"
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-1'  >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vMobileNo}
                                onChange={e => setvMobileNo(e.target.value)}
                                id="outlined-basic"
                                label="Mobile No"
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-3'  >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vEmailId}
                                onChange={e => setvEmailId(e.target.value)}
                                id="outlined-basic"
                                label="Email Id"
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-4' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vVendorAddress}
                                onChange={e => setvVendorAddress(e.target.value)}
                                id="outlined-basic"
                                label="Vendor Address"
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-3'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vGSTNo}
                                onChange={e => setvGSTNo(e.target.value)}
                                id="outlined-basic"
                                label="GST No"
                                variant="outlined"
                                name='vGSTNo'
                            />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-5'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vRemarks}
                                onChange={e => setvRemarks(e.target.value)}
                                id="outlined-basic"
                                label="Remarks"
                                variant="outlined"
                                name='vRemarks'
                            />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend-2'>
                    <FormGroup >
                        <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setbtActive(e.target.checked)} />} label="Active" disabled={disabled} />
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
                    </div>
                    <TableContainer sx={muiStyles.tableBox} className='tableBox' >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Vendor Code</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Address</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Contact Person</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Mobile No</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Email Id</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>GST No</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Remarks</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Status</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            {vendorData?.length > 0 ?
                                <TableBody>
                                    {vendorData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vVendorCode}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vVendorName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}><a data-tooltip-id="my-tooltip" data-tooltip-content={item.vVendorAddress}>{(item.vVendorAddress.length > 10) ? (item.vVendorAddress.slice(0, 10)) + '...' : (item.vVendorAddress)}</a><Tooltip id="my-tooltip" place="bottom" /></TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vContactPerson}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vMobileNo}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vEmailId}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vGSTNo}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}><a data-tooltip-id="my-tooltip" data-tooltip-content={item.vRemarks}>{(item.vRemarks.length > 10) ? (item.vRemarks.slice(0, 10)) + '...' : (item.vRemarks)}</a><Tooltip id="my-tooltip" place="bottom" /></TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}><div onClick={() => openmodale(item, 'Update')} className='editbtn'><TbEdit size={20} color='#000' /></div></TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                                :
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={11}>No Record</TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={vendorData.length}
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
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
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
        },
    },
    input: {
        "& .MuiOutlinedInput-root": {
            "& input": {
                padding: '6px',
                paddingLeft: '20px',
                fontSize: '12px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            paddingLeft: '8px',
            top: '-13px',
            left: '-10px',
            backgroundColor: 'transparent',
        },
        "& label.Mui-focused": {
            zIndex: '1'
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
export default VenderForm