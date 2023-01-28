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
import { BrandMaster_SelectAll, BrandMasterPost, BrandMasterPut } from './MaterialMasterService'
import { UnitMaster_SelectAll } from '../PackMaster/PackMasterService'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
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
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { parseDateToString } from '../../coreservices/Date';
function MaterialMaster() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [brandData, setBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [nBid, setnBid] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [brandCode, setBrandCode] = React.useState("");
    const [brandName, setBrandName] = React.useState("");
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
        setFromdate(formatedDate);
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
        getBrandMaster_SelectAll()
    }, [])
    const getBrandMaster_SelectAll = () => {
        BrandMaster_SelectAll().then(response => {
            console.log(response)
            setBrandData(response)
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

    const openmodale = (item, type) => {
        if (type == 'Submit') {
            setIsOpen(true)
            setbuttonName(type)
            setBrandCode('')
            setBrandName('')
            setBtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnBid(item.nBId)
            setBrandCode(item.vBrandCode)
            setBrandName(item.vBrandName)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
        }
    }


    const submit = () => {
        setLoader(true)
        let brand = {
            nBId: nBid == null ? 0 : nBid,
            vBrandCode: brandCode,
            vBrandName: brandName,
            btActive: btActive,
        }
        if (buttonName == 'Submit') {
            console.log('brand', brand)
            BrandMasterPost(brand).then(res => {
                if (res) {
                    console.log('res', res)
                    toast.success("Record Added Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    getBrandMaster_SelectAll()
                }
            })

        } else {
            console.log('brand', brand)
            BrandMasterPut(brand).then(res => {
                if (res) {
                    console.log('res', res)
                    toast.success("Record Updated Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    getBrandMaster_SelectAll()
                }
            })
        }
    }


    useEffect(() => {
        getUnitMaster_SelectAll()
    }, [])

    const getUnitMaster_SelectAll = () => {
        UnitMaster_SelectAll().then(response => {
            setUnitData(response)
        })
    }


    const handleChange = (event) => {
        setWeekNumberId(event.target.value);
    };
    const addKoMonthDate = () => {
        if (validateform() == true) {
            let koMonth = [...koMonthData]
            koMonth.push({
                id: new Date().getUTCMilliseconds(),
                brandName: brandName,
                fromDate: parseDateToString(new Date(fromDate)),
                toDate: parseDateToString(new Date(toDate)),
                weekNumber: weekNumberId,


            })
            console.log('koMonth', koMonth)
            setkoMonthData(koMonth)
        }
    }
    const validateform = () => {
        if (weekNumberId == '') {
            console.log('Select Week Number')
            setError('Select Week Number' + '' + '*')
            return false
        } else {
            setError('')
            return true
        }
    }

    return (
        <div className='citymasterContainer'>
            <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='large' /></button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Material Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '22%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={brandCode}
                                onChange={e => setBrandCode(e.target.value)}
                                required id="outlined-basic"
                                label="Material Code"
                                variant="outlined"
                                name='brandCode'
                                inputRef={register({ required: "Material Code is required.*", })}
                                error={Boolean(errors.brandCode)}
                                helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '45%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={brandName}
                                onChange={e => setBrandName(e.target.value)}
                                required id="outlined-basic"
                                label="Material Name"
                                variant="outlined"
                                name='brandName'
                                inputRef={register({ required: "Material Name is required.*", })}
                                error={Boolean(errors.brandName)}
                                helperText={errors.brandName?.message}
                            />
                        </FormControl>
                    </Box>


                    <Box sx={{ width: '30%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={unitid}
                                label="Select Category"
                                onChange={handleChangePackUnit}
                                name='unitid'
                                inputRef={register({ required: "Category is required.*", })}
                                error={Boolean(errors.unitid)}
                                helperText={errors.unitid?.message}
                            >
                                {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: '22%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label">Material Type</InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={unitid}
                                label="Select Material Type"
                                onChange={handleChangePackUnit}
                                name='unitid'
                                inputRef={register({ required: "Material Type is required.*", })}
                                error={Boolean(errors.unitid)}
                                helperText={errors.unitid?.message}
                            >
                                {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: '22%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label">UOM</InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={unitid}
                                label="Select UOM"
                                onChange={handleChangePackUnit}
                                name='unitid'
                                inputRef={register({ required: "UOM is required.*", })}
                                error={Boolean(errors.unitid)}
                                helperText={errors.unitid?.message}
                            >
                                {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box>




                    <Box sx={{ width: '22%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={brandCode}
                                onChange={e => setBrandCode(e.target.value)}
                                required id="outlined-basic"
                                label="HSN Code"
                                variant="outlined"
                                name='brandCode'
                                inputRef={register({ required: "HSN Code is required.*", })}
                                error={Boolean(errors.brandCode)}
                                helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '22%', marginTop: 2 }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={brandName}
                                onChange={e => setBrandName(e.target.value)}
                                required id="outlined-basic"
                                label="Plant"
                                variant="outlined"
                                name='brandName'
                                inputRef={register({ required: "Plant is required.*", })}
                                error={Boolean(errors.brandName)}
                                helperText={errors.brandName?.message}
                            />
                        </FormControl>
                    </Box>
                    <FormGroup >
                        <FormControlLabel control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                    </FormGroup>
                </div>



                <div className='databox'>
                    <div className='data-form-box'>
                        <Box sx={{ width: '20%' }} >
                            <FormControl fullWidth className='input' >
                                <TextField
                                    value={brandName}
                                    onChange={e => setBrandName(e.target.value)}
                                    required id="outlined-basic"
                                    label="Opening Stock"
                                    variant="outlined"
                                    name='brandName'
                                    inputRef={register({ required: "Opening Stock is required.*", })}
                                    error={Boolean(errors.brandName)}
                                    helperText={errors.brandName?.message}
                                />
                            </FormControl>
                        </Box>

                        <div className='date'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Start Date"
                                        inputFormat="DD-MM-YYYY"
                                        value={startDate}
                                        onChange={handleChangeStartdate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>

                        </div>
                        <div className='date'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="End Date"
                                        inputFormat="DD-MM-YYYY"
                                        value={endDate}
                                        onChange={handleChangeEnddate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>

                        </div>
                        <Box sx={{ width: '20%' }}>
                            <FormControl fullWidth className='input'>
                                <InputLabel id="demo-simple-select-label">Location <span style={{ color: "red" }}>*</span></InputLabel>
                                <Select
                                    style={{ width: '100%', }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={weekNumberId}
                                    label="Location"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'1'}>1</MenuItem>
                                    <MenuItem value={'2'}>2</MenuItem>
                                    <MenuItem value={'3'}>3</MenuItem>
                                    <MenuItem value={'4'}>4</MenuItem>
                                    <MenuItem value={'5'}>5</MenuItem>
                                    <MenuItem value={'6'}>6</MenuItem>
                                    <MenuItem value={'7'}>7</MenuItem>
                                </Select>
                            </FormControl>
                            <div className='error'>{error} </div>
                        </Box>
                        <div>
                            <button title='Add' className='addbtn' onClick={addKoMonthDate}><AddIcon fontSize='large' /></button>
                        </div>
                    </div>
                    <div className='tablecenter'>
                        {koMonthData.length > 0 ?
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell scope="row">SN.</TableCell>
                                                <TableCell align="left">Opening Stock</TableCell>
                                                <TableCell align="left">Manufacturing Date</TableCell>
                                                <TableCell align="left">Expiry Date</TableCell>
                                                <TableCell align="left">Location</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {koMonthData.map((item, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                        <TableCell align="left">{item.brandName}</TableCell>
                                                        <TableCell align="left">{item.fromDate}</TableCell>
                                                        <TableCell align="left">{item.toDate}</TableCell>
                                                        <TableCell align="left">{item.weekNumber}</TableCell>


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
                                    count={koMonthData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />

                            </Paper>
                            :
                            null

                        }

                    </div>
                </div>

                <div className='displayflexendmodal'>


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

                    <Box sx={{ width: '65%' }} >
                        <SearchBar
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        />

                    </Box>

                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="row">SN.</TableCell>
                                    <TableCell align="left">Brand Code</TableCell>
                                    <TableCell align="left">Brand Name</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {brandData.map((item, index) => {
                                    return (
                                        <TableRow >
                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                            <TableCell align="left">{item.vBrandCode}</TableCell>
                                            <TableCell align="left">{item.vBrandName}</TableCell>
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
        left: '58%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
    },
};
export default MaterialMaster