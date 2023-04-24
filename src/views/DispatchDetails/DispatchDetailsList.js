import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { BrandMaster_SelectAll, BrandMasterPost, BrandMasterPut } from '../BrandMaster/BrandMasterService'
import { UnitMaster_SelectAll } from '../PackMaster/PackMasterService'
import { GetDispatchDetails, GetAdditionalInDetails } from './DispatchDetailsService'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react';

import SearchBar from "material-ui-search-bar";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { parseDateToString, parseDateToStringSubmit } from '../../coreservices/Date';
import { useNavigate, Link } from "react-router-dom";
import * as environment from '../../coreservices/environment'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CircularProgress from '@mui/joy/CircularProgress';
import { TbEdit } from "react-icons/tb";
function DispatchDetailsList() {
    let imageUrl = environment.imageUrl
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [brandData, setBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [nBid, setnBid] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [vGenric, setvGenric] = React.useState('');

    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);

    const [uniteData, setUnitData] = React.useState([]);

    const { register, handleSubmit, control, errors } = useForm();

    // const [rows, setRows] = useState(brandData);
    const [searched, setSearched] = React.useState("");

    let fromDates = new Date(Date.now())
    fromDates.setDate(fromDates.getDate() - 7)
    let toDates = new Date(Date.now())
    const [fromDate, setFromdate] = React.useState(dayjs(fromDates));
    const [toDate, setTodate] = React.useState(dayjs(toDates));
    let startDates = new Date(Date.now())
    let endDates = new Date(Date.now())
    const [startDate, setStartDate] = React.useState(dayjs(startDates));
    const [endDate, setEndDate] = React.useState(dayjs(endDates));
    const [koMonthData, setkoMonthData] = React.useState([]);
    const [weekNumberId, setWeekNumberId] = React.useState('');
    const [error, setError] = React.useState('');
    const [unitid, setUnitid] = React.useState('');
    const handleChangePackUnit = (event) => {
        setUnitid(event.target.value);
    };
    const handleChangeFromedate = (newValue) => {
        setFromdate(newValue);
    };
    const handleChangeTodate = (newValue) => {
        setTodate(newValue);
    };
    const handleChangeStartdate = (newValue) => {
        setStartDate(newValue);
    };
    const handleChangeEnddate = (newValue) => {
        setEndDate(newValue);
    };

    useEffect(() => {
        getPODetails()
    }, [])
    const getPODetails = () => {
        setLoader(true)
        let vGenrics
        if (vGenric == '' || vGenric == undefined) {
            vGenrics = null
        } else {
            vGenrics = vGenric
        }
        GetDispatchDetails(parseDateToStringSubmit(new Date(fromDate)), parseDateToStringSubmit(new Date(toDate)), vGenrics).then(response => {
            console.log(response)
            setBrandData(response)
            setLoader(false)
        })
    }

    const requestSearch = (searchedVal) => {
        console.log("searchedVal.length", searchedVal.length)
        const filteredRows = brandData.filter((row) => {
            return row.vBrandCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vBrandName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setBrandData(filteredRows);
        console.log("filteredRows", filteredRows)
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getBrandMaster_SelectAll()
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        getUnitMaster_SelectAll()
    }, [])

    const getUnitMaster_SelectAll = () => {
        UnitMaster_SelectAll().then(response => {
            setUnitData(response)
        })
    }

    const handleDetail = (nDSId) => {
        navigate('/EditDispatchDetails', { state: { nDSId } });
    }

    return (
        <div className='citymasterContainer'>
            {/* <button  title='Add' onClick={routeChange}><AddIcon fontSize='large' /></button> */}
            {loader == true ?
                <div className='progressBox'>
                    <div className='progressInner'>
                        <CircularProgress />
                    </div>
                </div>
                :
                null

            }
            <div className='exportandfilter_end'>
                <Link to="/AddDispatchDetails" className='submitbtn_exp'><AddIcon fontSize='large' /><span className='addFont'>Add</span></Link>
            </div>

            <div className='tablecenter'>

                <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>
                    <div className='displayflexend-2'>
                        <Box className='inputBox-24' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label={'Start Date *'}
                                        inputFormat="DD-MM-YYYY"
                                        value={fromDate}
                                        onChange={handleChangeFromedate}
                                        maxDate={new Date(Date.now())}
                                        renderInput={(params) => <TextField sx={muiStyles.date}{...params} />}

                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Box>
                        <Box className='inputBox-24' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="End Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={toDate}
                                        onChange={handleChangeTodate}
                                        maxDate={new Date(Date.now())}
                                        renderInput={(params) => <TextField sx={muiStyles.date}{...params} />}

                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Box>

                        <Box className='inputBox-24' >
                            <FormControl fullWidth className='input' >
                                <TextField
                                    sx={muiStyles.input}
                                    value={vGenric}
                                    onChange={e => setvGenric(e.target.value)}
                                    id="outlined-basic"
                                    label="Search.."
                                    variant="outlined"
                                    name='vPODesc'
                                />
                            </FormControl>

                        </Box>

                        <Box className='inputBox-25'>
                            <button className='applybtn' onClick={getPODetails}>Apply</button>

                        </Box>

                    </div>

                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell scope="row" style={{width:'2%'}}>SN.</TableCell> */}

                                    <TableCell align="left" sx={muiStyles.tableHead} >Reference No</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Dated</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Plant Detail</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Invoice No</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >EWay Bill No</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Ship To Location</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Transporter Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Vehicle Capacity</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Vehicle No</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Remarks</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >MATCOA Copy</TableCell>

                                    <TableCell align="left" sx={muiStyles.tableHead} >Status</TableCell>
                                    <TableCell align="center" sx={muiStyles.tableHead} >Edit</TableCell>

                                </TableRow>
                            </TableHead>
                            {brandData?.length > 0 ?
                                <TableBody>
                                    {brandData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}

                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.vDSId}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.Dated}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.PlantDetail}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.vInvoiceNo}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.vEWayBillNo}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.vShipToLocation}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.vTransporterName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.vVehicleCapacity}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.vVehicleNo}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.vRemarks}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody} > <a href={imageUrl + '/' + item.vPOFilePath} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>{item.vMATCOAFilePath != null && item.vMATCOAFilePath != '' ? 'MATCOA Copy' : null}</a> </TableCell>

                                                <TableCell align="left" sx={muiStyles.tableBody} >{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                                <TableCell align="center" sx={muiStyles.tableBody} ><button className='deletbtn' title='Edit' onClick={() => handleDetail(item.nDSId)}><TbEdit size={20} color='#000' /></button></TableCell>

                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                                :
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={13}>No Record</TableCell>
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

export default DispatchDetailsList