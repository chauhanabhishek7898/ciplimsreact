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
import {GodownMasterPost,GodownMasterPut,GodownMaster_SelectAll } from './GodownMasterService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RiEditBoxLine } from "react-icons/ri"
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react';
import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
function GodownMaster() {
    let Heading = [['SN.','Godown Code','Godown Name','Godown Address','Godown Contact Person','Godown Contact No','Remarks','Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [brandData, setBrandData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [nGId, setnGId] = React.useState(0);
    const [btActive, setBtActive] = React.useState(true);
    const [vGCode, setvGCode] = React.useState("");
    const [vGName, setvGName] = React.useState("");
    const [vGAddress, setvGAddress] = React.useState("");
    const [vContactPerson, setvContactPerson] = React.useState("");
    const [vContactNo, setvContactNo] = React.useState("");
    const [vRemarks, setvRemarks] = React.useState("");
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const { register, handleSubmit, control, errors } = useForm();
    const tableRef = useRef(null);
    // const [rows, setRows] = useState(brandData);
    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        GodownMaster_SelectAllGet()
    }
    useEffect(() => {
        GodownMaster_SelectAllGet()
    }, [])
    const GodownMaster_SelectAllGet = () => {
        GodownMaster_SelectAll().then(response => {
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setBrandData(activeData)
                setMasterBrandData(activeData)
            } else {
                setBrandData(response)
                setMasterBrandData(response)

            }
        })
    }

    const requestSearch = (searchedVal) => {

        if (searchedVal.length > 0) {
            const filteredRows = brandData.filter((row) => {
                return row.vGCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vGName.toLowerCase().includes(searchedVal.toLowerCase())|| row.vGAddress.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setBrandData(filteredRows);
        } else {
            setBrandData(masterbrandData);
        }

    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        GodownMaster_SelectAll()
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
            setvGCode('')
            setvGName('')
            setvGAddress('')
            setvContactPerson('')
            setvContactNo('')
            setvRemarks('')
            setBtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnGId(item.nGId)
            setvGCode(item.vGCode)
            setvGName(item.vGName)
            setvGAddress(item.vGAddress)
            setvContactPerson(item.vContactPerson)
            setvContactNo(item.vContactNo)
            setvRemarks(item.vRemarks)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
        }
    }


    const submit = () => {
        setLoader(true)
        let brand = {
            nGId: nGId == null ? 0 : nGId,
            vGCode: vGCode,
            vGName: vGName,
            vGAddress: vGAddress,
            vContactPerson: vContactPerson,
            vContactNo: vContactNo,
            vRemarks: vRemarks,
            btActive: btActive,
        }
        if (buttonName == 'Submit') {
            console.log('brand', brand)
            GodownMasterPost(brand).then(res => {
                if (res) {
                    console.log('res', res)
                    toast.success("Record Added Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    GodownMaster_SelectAllGet()
                }
            })

        } else {
            console.log('brand', brand)
            GodownMasterPut(brand).then(res => {
                if (res) {
                    console.log('res', res)
                    toast.success("Record Updated Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    GodownMaster_SelectAllGet()
                }
            })
        }
    }



    return (
        <div className='citymasterContainer'>
            <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='large' /></button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
                
            >
                <div className='displayright'>
                    <div><span className='title'>Godown Code</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '33%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={vGCode}
                                onChange={e => setvGCode(e.target.value)}
                                required id="outlined-basic"
                                label="Godown Code"
                                variant="outlined"
                                name='GodownCode'
                                inputRef={register({ required: "Godown Code is required.*", })}
                                error={Boolean(errors.GodownCode)}
                                helperText={errors.GodownCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '33%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={vGName}
                                onChange={e => setvGName(e.target.value)}
                                required id="outlined-basic"
                                label="Godown Name"
                                variant="outlined"
                                name='GodownName'
                                inputRef={register({ required: "Godown Name is required.*", })}
                                error={Boolean(errors.GodownName)}
                                helperText={errors.GodownName?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '33%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={vGAddress}
                                onChange={e => setvGAddress(e.target.value)}
                                required id="outlined-basic"
                                label="Godown Address"
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '33%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={vContactPerson}
                                onChange={e => setvContactPerson(e.target.value)}
                                required id="outlined-basic"
                                label="Godown Contact Person"
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '33%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={vContactNo}
                                onChange={e => setvContactNo(e.target.value)}
                                required id="outlined-basic"
                                label="Godown Contact No"
                                variant="outlined"
                                
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '33%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <TextField
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
                <div className='displayflexend'>
                    <FormGroup >
                        <FormControlLabel control={<Checkbox defaultChecked={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
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
                    <ExportExcel excelData={brandData} Heading={Heading} fileName={'Godown_Master'}/>
                    <Box sx={{ width: '68%' }} >
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

                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="row">SN.</TableCell>
                                    <TableCell align="left">Godown Code</TableCell>
                                    <TableCell align="left">Godown Name</TableCell>
                                    <TableCell align="left">Godown Address</TableCell>
                                    <TableCell align="left">Godown Contact Person</TableCell>
                                    <TableCell align="left">Godown Contact No</TableCell>
                                    <TableCell align="left">Remarks</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {brandData.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                            <TableCell align="left">{item.vGCode}</TableCell>
                                            <TableCell align="left">{item.vGName}</TableCell>
                                            <TableCell align="left">{item.vGAddress}</TableCell>
                                            <TableCell align="left">{item.vContactPerson}</TableCell>
                                            <TableCell align="left">{item.vContactNo}</TableCell>
                                            <TableCell align="left">{item.vRemarks}</TableCell>
                                            <TableCell align="left">{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                            <TableCell align="left"><div onClick={() => openmodale(item, 'Update')}><RiEditBoxLine fontSize="1.5em" /></div></TableCell>
                                        </TableRow>
                                    )
                                })
                                }
                            </TableBody>
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
        width: '70%',
    },
};

export default GodownMaster