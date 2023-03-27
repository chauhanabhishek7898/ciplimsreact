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
import { CButton, CSpinner } from '@coreui/react'

import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
function VenderForm() {
    // <TableCell scope="row">SN.</TableCell>
    // <TableCell align="left">Vendor Code</TableCell>
    // <TableCell align="left">Vendor Name</TableCell>
    // <TableCell align="left">Vendor Address</TableCell>
    // <TableCell align="left">Contact Person</TableCell>
    // <TableCell align="left">Mobile No</TableCell>
    // <TableCell align="left">Email Id</TableCell>
    // <TableCell align="left">GST No</TableCell>
    // <TableCell align="left">Remarks</TableCell>
    // <TableCell align="left">Status</TableCell>

    let Heading = [['SN.', 'Vendor Code', 'Vendor Name', 'Vendor Address', 'Contact Person', 'Mobile No', 'Email Id', 'GST No', 'Remarks', 'Status']];

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
                setVendorData(response)
                setMasterBrandData(response)
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

    // useEffect(() => {
    //     getVendorMaster_SelectAll()
    // }, [])
    // const getVendorMaster_SelectAll = () => {
    //     VendorMaster_SelectAll().then(response => {
    //         console.log(response)
    //         setVendorData(response)
    //     })
    // }
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
              {loader2==true?
            <div className='progressBox'>
                <div className='progressInner'>
                    <CircularProgress />
                </div>
            </div>
            :
            null

            }
            <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'><AddIcon fontSize='large' /></button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
                
            >
                <div className='displayright'>
                    <div><span className='title'>Vendor Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
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
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
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
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={vVendorAddress}
                                onChange={e => setvVendorAddress(e.target.value)}
                                id="outlined-basic"
                                label="Vendor Address"
                                variant="outlined"
                            // name='vVendorAddress'
                            // inputRef={register({ required: "Vendor Address is required.*", })}
                            // error={Boolean(errors.vVendorAddress)}
                            // helperText={errors.vVendorAddress?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={vContactPerson}
                                onChange={e => setvContactPerson(e.target.value)}
                                id="outlined-basic"
                                label="Contact Person"
                                variant="outlined"
                            // name='vContactPerson'
                            // inputRef={register({ required: "Contact Person is required.*", })}
                            // error={Boolean(errors.vContactPerson)}
                            // helperText={errors.vContactPerson?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={vMobileNo}
                                onChange={e => setvMobileNo(e.target.value)}
                                id="outlined-basic"
                                label="Mobile No"
                                variant="outlined"
                            // name='vMobileNo'
                            // inputRef={register({ required: "Mobile No is required.*", })}
                            // error={Boolean(errors.vMobileNo)}
                            // helperText={errors.vMobileNo?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={vEmailId}
                                onChange={e => setvEmailId(e.target.value)}
                                id="outlined-basic"
                                label="Email Id"
                                variant="outlined"
                            // name='vEmailId'
                            // inputRef={register({ required: "Email Id is required.*", })}
                            // error={Boolean(errors.vEmailId)}
                            // helperText={errors.vEmailId?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={vGSTNo}
                                onChange={e => setvGSTNo(e.target.value)}
                                id="outlined-basic"
                                label="GST No"
                                variant="outlined"
                                name='vGSTNo'
                                // inputRef={register({ required: "GST No is required.*", })}
                                // error={Boolean(errors.vGSTNo)}
                                // helperText={errors.vGSTNo?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '65%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={vRemarks}
                                onChange={e => setvRemarks(e.target.value)}
                                id="outlined-basic"
                                label="Remarks"
                                variant="outlined"
                                name='vRemarks'
                            // inputRef={register({ required: "Remarks is required.*", })}
                            // error={Boolean(errors.vRemarks)}
                            // helperText={errors.vRemarks?.message}
                            />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend-2'>
                    <FormGroup >
                        <FormControlLabel control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setbtActive(e.target.checked)} />} label="Active" disabled={disabled} />
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
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                    <div className='exportandfilter'>
                        <ExportExcel excelData={vendorData} Heading={Heading} fileName={'Vendor_Master'} />
                        <Box sx={{ width: '65%' }} >
                            <SearchBar
                                value={searched}
                                onChange={(searchVal) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                            />

                        </Box>
                        <FormGroup >
                            <FormControlLabel control={<Checkbox checked={onlyActive} value={onlyActive} onChange={checkedonlyActive} />} label="Only Active Data" />
                        </FormGroup>
                    </div>

                    <TableContainer sx={{ maxHeight: 440 }} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell scope="row">SN.</TableCell> */}
                                    <TableCell align="left">Vendor Code</TableCell>
                                    <TableCell align="left">Vendor Name</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">Contact Person</TableCell>
                                    <TableCell align="left">Mobile No</TableCell>
                                    <TableCell align="left">Email Id</TableCell>
                                    <TableCell align="left">GST No</TableCell>
                                    <TableCell align="left">Remarks</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            {vendorData?.length>0?
                            <TableBody>
                                {vendorData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index) => {
                                    return (
                                        <TableRow key={index}>
                                            {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}
                                            <TableCell align="left"><div onClick={() => openmodale(item, 'Update')}><BorderColorIcon size={20} color='#000' /></div></TableCell>
                                            <TableCell align="left">{item.vVendorCode}</TableCell>
                                            <TableCell align="left">{item.vVendorName}</TableCell>
                                            <TableCell align="left">{item.vVendorAddress}</TableCell>
                                            <TableCell align="left">{item.vContactPerson}</TableCell>
                                            <TableCell align="left">{item.vMobileNo}</TableCell>
                                            <TableCell align="left">{item.vEmailId}</TableCell>
                                            <TableCell align="left">{item.vGSTNo}</TableCell>
                                            <TableCell align="left">{item.vRemarks}</TableCell>
                                            <TableCell align="left">{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
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
export default VenderForm