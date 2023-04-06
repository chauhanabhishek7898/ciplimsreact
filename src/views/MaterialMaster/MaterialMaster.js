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
import { MaterialMasterPost, MaterialMasterPut, MaterialMaster_SelectAll } from './MaterialMasterService'
import { UnitMaster_SelectAll_Active } from '../UnitMaster/UnitMasterApi'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
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
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { parseDateToString } from '../../coreservices/Date';
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
function MaterialMaster() {
    let Heading = [['SN.', 'Material Code', 'Material Name', 'Category', 'Material Type', 'UOM', 'HSN Code', 'Remarks', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [brandData, setBrandData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [nMId, setnMId] = React.useState(0);
    const [btActive, setBtActive] = React.useState(true);
    const [brandName, setbrandName] = React.useState("");
    const [vMCode, setvMCode] = React.useState("");
    const [vMName, setvMName] = React.useState("");
    const [vCategory, setvCategory] = React.useState("");
    const [vMaterialType, setvMaterialType] = React.useState("");
    const [vUOM, setvUOM] = React.useState("");
    const [vHSNCode, setvHSNCode] = React.useState("");
    const [vRemarks, setvRemarks] = React.useState("");
    const [nLoggedInUserId, setnLoggedInUserId] = React.useState("");
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const [noRecord, setnoRecord] = React.useState(false);
    const [uniteData, setUnitData] = React.useState([]);
    const { register, handleSubmit, control, errors } = useForm();
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
    const [onlyActive, setonlyActive] = React.useState(true);
    const [errorText, setErrorText] = React.useState({
        vCategory: '',
        vMaterialType: '',
        vUOM: '',
    });
    let checkedData = true
    const handleChangePackUnit = (event) => {
        setvUOM(event.target.value);
    };
    const handleChangePackCategory = (event) => {
        setvCategory(event.target.value);
    };
    const handleChangePackMaterialType = (event) => {
        setvMaterialType(event.target.value);
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
        const userId = localStorage.getItem("nUserId")
        setnLoggedInUserId(userId)
    }, [])
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getMaterialMaster_SelectAll()
    }
    useEffect(() => {
        getMaterialMaster_SelectAll()
    }, [])
    const getMaterialMaster_SelectAll = () => {
        setLoader2(true)
        MaterialMaster_SelectAll().then(response => {
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setBrandData(activeData)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                setBrandData(response)
                setMasterBrandData(response)
                setLoader2(false)

            }
        })
    }




    const requestSearch = (searchedVal) => {

        if (searchedVal.length > 0) {
            const filteredRows = brandData.filter((row) => {
                return row.vMCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vMName.toLowerCase().includes(searchedVal.toLowerCase()) || row.vCategory.toLowerCase().includes(searchedVal.toLowerCase()) || row.vMaterialType.toLowerCase().includes(searchedVal.toLowerCase());
            });
            if (filteredRows?.length > 0) {
                setnoRecord(false)
                setBrandData(filteredRows);
            } else {
                setnoRecord(true)
            }
        } else {
            setnoRecord(false)
            setBrandData(masterbrandData);
        }

    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getMaterialMaster_SelectAll()
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
            setvMCode('')
            setvMName('')
            setvCategory('')
            setvMaterialType('')
            setvUOM('')
            setvHSNCode('')
            setvRemarks('')
            setBtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnMId(item.nMId)
            setvMCode(item.vMCode)
            setvMName(item.vMName)
            setvCategory(item.vCategory)
            setvMaterialType(item.vMaterialType)
            setvUOM(item.vUOM)
            setvHSNCode(item.vHSNCode)
            setvRemarks(item.vRemarks)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
        }
    }
    const validateform = () => {
        if (vCategory == '' || vCategory == undefined) {
            setErrorText({
                vCategory: 'Select Category *'
            })
            return false
        } else if (vMaterialType == '' || vMaterialType == undefined) {
            setErrorText({
                vMaterialType: 'Select Material Type *'
            })
            return false
        } else if (vUOM == '' || vUOM == undefined) {
            setErrorText({
                vUOM: 'Select UOM *'
            })
            return false
        }
        else {
            setError({
                MaterialDetail: ''
            })
            return true
        }

    }
    const submit = () => {
        if (validateform() == true) {
            let brand = {
                nMId: nMId == null ? 0 : nMId,
                vMCode: vMCode,
                vMName: vMName,
                vCategory: vCategory,
                vMaterialType: vMaterialType,
                vUOM: vUOM,
                vHSNCode: vHSNCode,
                vRemarks: vRemarks,
                nLoggedInUserId: parseInt(nLoggedInUserId),
                btActive: btActive,
            }
            console.log(brand)
            if (buttonName == 'Submit') {
                setLoader(true)

                MaterialMasterPost(brand).then(res => {
                    if (res) {
                        console.log('res', res)
                        toast.success("Record Added Successfully !!")
                        setvMCode('')
                        setvMName('')
                        setvCategory('')
                        setvMaterialType('')
                        setvUOM('')
                        setvHSNCode('')
                        setvRemarks('')
                        setLoader(false)
                        setIsOpen(false)
                        getMaterialMaster_SelectAll()
                    }
                })

            } else {
                setLoader(true)
                MaterialMasterPut(brand).then(res => {

                    if (res) {
                        console.log('res', res)
                        toast.success("Record Updated Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getMaterialMaster_SelectAll()
                    }
                })
            }
        }


    }


    useEffect(() => {
        getUnitMaster_SelectAll()
    }, [])

    const getUnitMaster_SelectAll = () => {
        UnitMaster_SelectAll_Active().then(response => {
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
            <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='large' /></button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Material Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>

                <div className='displayflexend mt-4'>
                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <TextField
                            sx={muiStyles.input}
                                value={vMCode}
                                onChange={e => setvMCode(e.target.value)}
                                required id="outlined-basic"
                                label="Material Code"
                                variant="outlined"
                                name='MaterialCode'
                                inputRef={register({ required: "Material Code is required.*", })}
                                error={Boolean(errors.MaterialCode)}
                                helperText={errors.MaterialCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-6' >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={vMName}
                                onChange={e => setvMName(e.target.value)}
                                required id="outlined-basic"
                                label="Material Name"
                                variant="outlined"
                                name='MaterialName'
                                inputRef={register({ required: "Material Name is required.*", })}
                                error={Boolean(errors.MaterialName)}
                                helperText={errors.MaterialName?.message}
                            />
                        </FormControl>
                    </Box>


                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Category</InputLabel>
                            <Select
                            sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vCategory}
                                label="Select Category"
                                onChange={handleChangePackCategory}
                                name='unitid'
                            // inputRef={register({ required: "Category is required.*", })}
                            // error={Boolean(errors.unitid)}
                            // helperText={errors.unitid?.message}
                            >
                                <MenuItem value='C1'>C1</MenuItem>
                                <MenuItem value='C2'>C2</MenuItem>
                                <MenuItem value='C3'>C3</MenuItem>
                                {/* {uniteData.map((item, index) => {
            return (
                <MenuItem value='C1'>C1</MenuItem>
            )
        })
        } */}
                            </Select>
                            {errorText.vCategory != '' ? <p className='error'>{errorText.vCategory}</p> : null}
                        </FormControl>
                    </Box>

                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Material Type</InputLabel>
                            <Select
                            sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vMaterialType}
                                label="Select Material Type"
                                onChange={handleChangePackMaterialType}
                                name='unitid'
                            // inputRef={register({ required: "Material Type is required.*", })}
                            // error={Boolean(errors.unitid)}
                            // helperText={errors.unitid?.message}
                            >
                                <MenuItem value='M1'>M1</MenuItem>
                                <MenuItem value='M2'>M2</MenuItem>
                                <MenuItem value='M3'>M3</MenuItem>
                                {/* {uniteData.map((item, index) => {
            return (
                <MenuItem value={item.vUnitName}>{item.vUnitName}</MenuItem>
            )
        })
        } */}
                            </Select>
                            {errorText.vMaterialType != '' ? <p className='error'>{errorText.vMaterialType}</p> : null}
                        </FormControl>
                    </Box>

                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>UOM</InputLabel>
                            <Select
                            sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vUOM}
                                label="Select UOM"
                                onChange={handleChangePackUnit}
                                name='unitid'
                            // inputRef={register({ required: "UOM is required.*", })}
                            // error={Boolean(errors.unitid)}
                            // helperText={errors.unitid?.message}
                            >
                                {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.vUOM != '' ? <p className='error'>{errorText.vUOM}</p> : null}
                        </FormControl>
                    </Box>




                    <Box className='inputBox-6' >
                        <FormControl fullWidth className='input'>
                            <TextField
                            sx={muiStyles.input}
                                value={vHSNCode}
                                onChange={e => setvHSNCode(e.target.value)}
                                id="outlined-basic"
                                label="HSN Code"
                                variant="outlined"
                                name='HSNCode'
                            // inputRef={register({ required: "HSN Code is required.*", })}
                            // error={Boolean(errors.HSNCode)}
                            // helperText={errors.HSNCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-18'>
                        <FormControl fullWidth className='input' >
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
                    <FormGroup >
                        <FormControlLabel control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                    </FormGroup>
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
            <div className='databox'>
                {/* <div className='data-form-box'>
                    <Box sx={{ width: '20%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={brandName}
                                onChange={e => setBrandName(e.target.value)}
                                required id="outlined-basic"
                                label="Opening Stock"
                                variant="outlined"
                                name='brandName'
                                // inputRef={register({ required: "Opening Stock is required.*", })}
                                // error={Boolean(errors.brandName)}
                                // helperText={errors.brandName?.message}
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
                    {loader == true ?
                        <CButton disabled className='addbtn'>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Loading...
                        </CButton>
                        :
                        <button title='Add' className='addbtn' type="submit" onClick={handleSubmit(submit)}><AddIcon fontSize='large' /></button>
                    }
                    <div>
                        
                    </div>
                </div> */}
                <div className='tablecenter'>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <div className='exportandfilter'>
                            <ExportExcel excelData={brandData} Heading={Heading} fileName={'Material_Master'} />
                            <Box className='searchbox'>
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
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {/* <TableCell scope="row">SN.</TableCell> */}
                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>Edit</TableCell>
                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>Status</TableCell>
                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>Material Code</TableCell>
                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>Material Name</TableCell>
                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>Category</TableCell>
                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>Material Type</TableCell>
                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>UOM</TableCell>
                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>HSN Code</TableCell>
                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>Remarks</TableCell>
                                    </TableRow>
                                </TableHead>
                               
                                {brandData?.length > 0 ?
                                    <TableBody>
                                    {brandData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                      {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}><div onClick={() => openmodale(item, 'Update')} className='editbtn'><BorderColorIcon size={20} color='#000' /></div></TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vMCode}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vMName}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vCategory}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vMaterialType}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vUOM}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vHSNCode}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vRemarks}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>

                                    :
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={10}>No Record</TableCell>
                                        </TableRow>
                                    </TableBody>
                                }


                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5,10, 25, 100]}
                            component="div"
                            count={brandData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
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
        width: '70%',
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
                padding: '5px 14px',
                fontSize: '13px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            top: '-13px',
            backgroundColor: 'transparent',
            zIndex: '1'
        },
        "& label.Mui-focused": {
            zIndex: '1'

        },
    },
    autoCompleate: {
        "& .MuiOutlinedInput-root": {
            padding: '0px',
            "& .MuiAutocomplete-input": {
                padding: '5px 14px',
                fontSize: '13px'
            }

        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            backgroundColor: 'transparent',
            top: '-13px',
          
        },
        "& label.Mui-focused": {
            zIndex: '1'
        },
    },
    input: {
        "& .MuiOutlinedInput-root": {
            "& input": {
                padding: '6px 14px',
                fontSize: '12px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            top: '-13px',  
            backgroundColor: 'transparent',
        },
        "& label.Mui-focused": {
            zIndex: '1'
        },
    },
    select: {

        "& .MuiSelect-select": {
            padding: '3px 14px',
            fontSize: '12px'
        }, 
        

    },
    InputLabels: {
        fontSize: '13px',
        top: '-13px',
        backgroundColor: 'transparent',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
   

};
export default MaterialMaster