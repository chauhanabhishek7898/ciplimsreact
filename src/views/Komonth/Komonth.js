import React, { useEffect } from 'react';
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { KOMonthMaster, KOMonth_SelectAll, KOMonth_SelectAllMonthView, KOMonth_SelectAllWeekWise, KOMonthMasterPut, KOMonthMaster_Update } from './Komonthapi'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { parseDateToString, parseDateToStringSubmit } from '../../coreservices/Date';
import { Controller, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react';
import RefreshIcon from '@mui/icons-material/Refresh';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import UpdateIcon from '@mui/icons-material/Update';
import { FormHelperText } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/joy/CircularProgress';
function KOMONTH() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpen2, setIsOpen2] = React.useState(false);
    const [weekmodalIsOpen, setweekmodalIsOpen] = React.useState(false);
    const [monthmodalIsOpen, setmonthmodalIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [koMonthData, setkoMonthData] = React.useState([]);
    const [weekData, setWeekData] = React.useState([]);
    const [nKOId, setnKOId] = React.useState(0);
    const [nKOWId, setnKOWId] = React.useState(0);
    const [weekNumberId, setWeekNumberId] = React.useState('');
    const [vKOMonth, setvKOMonth] = React.useState('');
    const [nKOYear, setnKOYear] = React.useState('');
    const [nDays, setnDays] = React.useState('');
    const [error, setError] = React.useState('');
    const [errorText, setErrorText] = React.useState({
        sDate: '',
        eDate: '',
        wsDate: '',
        weDate: '',
        koMonths: '',
        weekno: '',
        editsDate: '',
        editeDate: '',
        editwsDate: '',
        editweDate: '',
        editkoMonths: '',
        editweekno: ''
    });
    let fromDates = new Date(Date.now())
    fromDates.setDate(fromDates.getDate() - 7)
    let toDates = new Date(Date.now())
    const [fromDate, setFromdate] = React.useState(null);
    const [toDate, setTodate] = React.useState(null);
    let startDates = new Date(Date.now())
    let endDates = new Date(Date.now())
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const { register, handleSubmit, control, errors, name } = useForm();
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [disable, setDisable] = React.useState(false);
    const [monthDisable, setMonthDisable] = React.useState(false);
    const [WeekDisable, setWeekDisable] = React.useState(false);
    const [update, setupdate] = React.useState(false);
    const [tableView, setTableView] = React.useState('WeekView');

    const refreshdate = () => {
        setIsOpen(false)
        setvKOMonth('')
        setnKOYear('')
        setnDays('')
        setFromdate(null)
        setTodate(null)
    }
    const refreshdate2 = () => {
        setIsOpen2(false)
        setWeekNumberId('')
        setStartDate(null)
        setEndDate(null)     
    }
    const hidesetweekmodalIsOpen=()=>{
        setweekmodalIsOpen(false)
        setvKOMonth('')
        setnKOYear('')
        setnDays('')
        setFromdate(null)
        setTodate(null)
        setWeekNumberId('')
        setStartDate(null)
        setEndDate(null) 
    }
    const hidesetmonthmodalIsOpen=()=>{
        setmonthmodalIsOpen(false)
        setvKOMonth('')
        setnKOYear('')
        setnDays('')
        setFromdate(null)
        setTodate(null)
        setWeekNumberId('')
        setStartDate(null)
        setEndDate(null) 
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChange = (event) => {
        setWeekNumberId(event.target.value);
    };
    const handleChangevKOMonth = (event) => {
        setvKOMonth(event.target.value);
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
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const addKoMonthDate = () => {
        if (validateform() == true) {
            let koMonth = [...koMonthData]
            koMonth.push({
                id: new Date().getUTCMilliseconds(),
                fromDate: parseDateToString(new Date(fromDate)),
                toDate: parseDateToString(new Date(toDate)),
                weekNumber: weekNumberId,
                startDate: parseDateToString(new Date(startDate)),
                endDate: parseDateToString(new Date(endDate)),

            })
            console.log('koMonth', koMonth)
            setkoMonthData(koMonth)
        }
    }
    const validateform = () => {
        if (vKOMonth == '' || vKOMonth == undefined) {
            console.log('1')
            setError({
                koMonths: 'Select KO Month *'
            })
            return false
        } else if (fromDate == '' || fromDate == undefined) {
            console.log('2')
            setErrorText({
                sDate: 'Select Start Date *'
            })
            return false
        } else if (toDate == '' || toDate == undefined) {
            console.log('3')
            setErrorText({
                eDate: 'Select End Date *'
            })
            return false
        } else if (weekNumberId == '' || weekNumberId == undefined) {
            console.log('4')
            setErrorText({
                weekno: 'Select Week Number'
            })
            return false
        } else if (startDate == '' || startDate == undefined) {
            console.log('5')
            setErrorText({
                wsDate: 'Select Week Start Date *'
            })
            return false
        } else if (endDate == '' || endDate == undefined) {
            console.log('6')
            setErrorText({
                weDate: 'Select Week End Date *'
            })
            return false
        } else {
            console.log('7')
            setErrorText('')
            return true
        }
    }


    const submit = () => {
        if (validateform() == true) {
            setLoader(true)
            let data = {
                nKOId: nKOId == null ? 0 : nKOId,
                vKOMonth: vKOMonth,
                nKOYear: nKOYear,
                nDays: nDays,
                dtStartDate: parseDateToStringSubmit(new Date(fromDate)),
                dtEndDate: parseDateToStringSubmit(new Date(toDate)),
                vWeekNo: weekNumberId,
                dtWStartDate: parseDateToStringSubmit(new Date(startDate)),
                dtWEndDate: parseDateToStringSubmit(new Date(endDate)),
            }
            console.log('data', data)
            KOMonthMaster(data).then(res => {
                if (res) {
                    toast.success("Record Added Successfully !!")
                    setLoader(false)
                    setWeekNumberId('')
                    setStartDate(null)
                    setEndDate(null)
                    setErrorText('')
                    getKOMonth_SelectAll()
                }
            })

        }
    }
    useEffect(() => {
        getKOMonth_SelectAll()
    }, [])
    const getKOMonth_SelectAll = () => {
        setLoader2(true)
        KOMonth_SelectAll().then(res => {
            if (res) {
                console.log('resWeek', res)
                setkoMonthData(res)
                setLoader2(false)
            }
        })
    }
    const getKOMonth_SelectAllMonthView = () => {
        setLoader2(true)
        KOMonth_SelectAllMonthView().then(res => {
            if (res) {
                console.log('resMont', res)
                setkoMonthData(res)
                setLoader2(false)
            }
        })
    }
    let updateBtn = false
    // const openmodale = (item, type) => {
    //     if (type == 'Update') {
    //         
    //         setDisable(true)
    //         setvKOMonth(item.vKOMonth)
    //         setnKOYear(item.nKOYear)
    //         setnDays(item.nDays)
    //         setFromdate(item.dtStartDate)
    //         setTodate(item.dtEndDate)
    //         setWeekNumberId(item.vWeekNo)
    //         setStartDate(dayjs(item.dtWStartDate))
    //         setEndDate(dayjs(item.dtWEndDate))
    //         setupdate(true)
    //         updateBtn = true
    //     } else {
    //         alert(2)
    //         setupdate(false)
    //         updateBtn = false
    //         setDisable(true)
    //         setvKOMonth('')
    //         setnKOYear('')
    //         setnDays('')
    //         let fromDates = new Date(Date.now())
    //         fromDates.setDate(fromDates.getDate() - 7)
    //         let toDates = new Date(Date.now())
    //         setFromdate(dayjs(fromDates))
    //         setTodate(dayjs(toDates))
    //         setWeekNumberId('')
    //         let startDates = new Date(Date.now())
    //         let endDates = new Date(Date.now())
    //         setStartDate(dayjs(startDates))
    //         setEndDate(dayjs(endDates))
    //     }
    // }
    const onchangeTableView = (e) => {
        setTableView(e.target.value)
        if (e.target.value == 'WeekView') {
            console.log(e.target.value)
            getKOMonth_SelectAll()
        } else {
            console.log(e.target.value)
            getKOMonth_SelectAllMonthView()
        }

    }
    const openMonthModel = (item) => {
        setmonthmodalIsOpen(true)
        setWeekDisable(true)
        setnKOId(item.nKOId)
        setvKOMonth(item.vKOMonth)
        setnKOYear(item.nKOYear)
        setnDays(item.nDays)
        setFromdate(item.dtStartDate)
        setTodate(item.dtEndDate)

        KOMonth_SelectAllWeekWise(item.nKOId).then(res => {
            if (res) {
                setWeekNumberId(res[0].vWeekNo)
                setStartDate(dayjs(res[0].dtWStartDate))
                setEndDate(dayjs(res[0].dtWEndDate))
                setWeekData(res)
            }
        })
    }
    const openWeekModel = (item) => {
        setweekmodalIsOpen(true)
        setMonthDisable(true)
        setnKOId(item.nKOId)
        setnKOWId(item.nKOWId)
        setvKOMonth(item.vKOMonth)
        setnKOYear(item.nKOYear)
        setnDays(item.nDays)
        setFromdate(item.dtStartDate)
        setTodate(item.dtEndDate)
        setWeekNumberId(item.vWeekNo)
        setStartDate(dayjs(item.dtWStartDate))
        setEndDate(dayjs(item.dtWEndDate))
    }
    const validateupdateWeekform = () => {
        if (weekNumberId == '') {
            setError({
                editweekno: 'Select Week Number'
            })
            return false
        } else if (startDate != '' || startDate != undefined) {
            setErrorText({
                editwsDate: 'Select Week Start Date *'
            })
            return false
        } else if (endDate != '' || endDate != undefined) {
            setErrorText({
                editweDate: 'Select Week End Date *'
            })
            return false
        } else {
            setErrorText('')
            return true
        }
    }
    const updateWeekData = () => {
        if (validateupdateWeekform() == true) {
            setLoader(true)
            let data = {
                nKOWId: nKOWId,
                vWeekNo: weekNumberId,
                dtWStartDate: parseDateToStringSubmit(new Date(startDate)),
                dtWEndDate: parseDateToStringSubmit(new Date(endDate)),
            }
            console.log('data', data)
            KOMonthMasterPut(data).then(res => {
                if (res) {
                    toast.success("Record Added Successfully !!")
                    setLoader(false)
                    setweekmodalIsOpen(false)
                    setErrorText('')
                    getKOMonth_SelectAll()
                }
            })

        }
    }
    const validateupdateMonthform = () => {
        if (vKOMonth != '' || vKOMonth != undefined) {
            setErrorText({
                editkoMonths: 'Select KO Month *'
            })
            return false
        } else if (fromDate != '' || fromDate != undefined) {
            setErrorText({
                editsDate: 'Select Start Date *'
            })
            return false
        } else if (toDate != '' || toDate != undefined) {
            setErrorText({
                editeDate: 'Select End Date *'
            })
            return false
        } else {
            setErrorText('')
            return true
        }
    }
    const updateMonthData = () => {
        if (validateupdateMonthform() == true) {
            setLoader(true)
            let data = {
                nKOId: nKOId,
                vKOMonth: vKOMonth,
                nKOYear: nKOYear,
                nDays: nDays,
                dtStartDate: parseDateToStringSubmit(new Date(fromDate)),
                dtEndDate: parseDateToStringSubmit(new Date(toDate)),
            }
            console.log('data', data)
            KOMonthMaster_Update(data).then(res => {
                if (res) {
                    toast.success("Record Added Successfully !!")
                    setLoader(false)
                    setmonthmodalIsOpen(false)
                    setErrorText('')
                    getKOMonth_SelectAllMonthView()
                }
            })
        }
    }
    return (
        <div className='citymasterContainer'>
            {/* <button className='addbtn' onClick={openmodale}>Add</button> */}
            {loader2 == true ?
                <div className='progressBox'>
                    <div className='progressInner'>
                        <CircularProgress />
                    </div>
                </div>
                :
                null

            }
            <div className='dateFilter'>
                <Box sx={{ width: '100%' }}>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label" sx={muiStyles.InputLabels}>KO Month</InputLabel>
                        <Select value={vKOMonth} sx={muiStyles.select} onChange={handleChangevKOMonth} readOnly={disable}>
                            <MenuItem value={'JAN'}>JAN</MenuItem>
                            <MenuItem value={'FEB'}>FEB</MenuItem>
                            <MenuItem value={'MAR'}>MAR</MenuItem>
                            <MenuItem value={'APR'}>APR</MenuItem>
                            <MenuItem value={'MAY'}>MAY</MenuItem>
                            <MenuItem value={'JUN'}>JUN</MenuItem>
                            <MenuItem value={'JUL'}>JUL</MenuItem>
                            <MenuItem value={'AUG'}>AUG</MenuItem>
                            <MenuItem value={'SEP'}>SEP</MenuItem>
                            <MenuItem value={'OCT'}>OCT</MenuItem>
                            <MenuItem value={'NOV'}>NOV</MenuItem>
                            <MenuItem value={'DEC'}>DEC</MenuItem>
                        </Select>

                    </FormControl>
                    {errorText.koMonths != '' ? <p className='error'>{errorText.koMonths}</p> : null}
                </Box>

                <Box sx={{ width: '100%' }} >
                    <FormControl fullWidth className='input'>
                        <TextField
                            sx={muiStyles.input}
                            value={nKOYear}
                            onChange={e => setnKOYear(e.target.value)}
                            required id="outlined-basic"
                            label="KO Year"
                            variant="outlined"

                            name='nKOYear'
                            inputRef={register({ required: "KO Year is required *", })}
                            error={Boolean(errors.nKOYear)}
                            helperText={errors.nKOYear?.message}
                            disabled={disable}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: '100%' }} >
                    <FormControl fullWidth className='input'>
                        <TextField
                            sx={muiStyles.input}
                            value={nDays}
                            onChange={e => setnDays(e.target.value)}
                            required id="outlined-basic"
                            label="Days"
                            variant="outlined"
                            name='nDays'
                            inputRef={register({ required: "Days is required *", })}
                            error={Boolean(errors.nDays)}
                            helperText={errors.nDays?.message}
                            disabled={disable}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ width: '100%' }}>
                    <FormControl fullWidth required>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <Stack spacing={3} >
                                <DesktopDatePicker
                                    label={'Start Date *'}
                                    inputFormat="DD-MM-YYYY"
                                    value={fromDate}
                                    onChange={handleChangeFromedate}
                                    renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    disabled={disable}
                                />
                            </Stack>
                        </LocalizationProvider>
                        {errorText.sDate != '' ? <p className='error'>{errorText.sDate}</p> : null}
                    </FormControl>

                </Box>
                <Box sx={{ width: '100%' }}>
                    <FormControl fullWidth required>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="End Date *"
                                    inputFormat="DD-MM-YYYY"
                                    value={toDate}
                                    onChange={handleChangeTodate}
                                    renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    disabled={disable}
                                />
                            </Stack>
                        </LocalizationProvider>

                        {errorText.eDate != '' ? <p className='error'>{errorText.eDate}</p> : null}
                    </FormControl>

                </Box>
                <div className='date'>
                    <button title='Refresh' disabled={disable} className='addbtn' onClick={() => setIsOpen(true)}><RefreshIcon fontSize='large' /></button>

                </div>
            </div>
            <div className='databox'>
                <div className='data-form-box mt-2'>
                    <Box sx={{ width: '100%' }}>
                        <FormControl fullWidth className='input' >
                            <InputLabel id="demo-simple-select-label" sx={muiStyles.InputLabels}>Week Number <span>*</span></InputLabel>
                            {/* <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={weekNumberId}
                                label="Week Number"
                                onChange={handleChange}
                            >
                                <MenuItem value={'W1'}>W1</MenuItem>
                                <MenuItem value={'W2'}>W2</MenuItem>
                                <MenuItem value={'W3'}>W3</MenuItem>
                                <MenuItem value={'W4'}>W4</MenuItem>
                                <MenuItem value={'W5'}>W5</MenuItem>
                            </Select> */}
                            <Select value={weekNumberId} sx={muiStyles.select} onChange={handleChange} >
                                <MenuItem value={'W1'}>W1</MenuItem>
                                <MenuItem value={'W2'}>W2</MenuItem>
                                <MenuItem value={'W3'}>W3</MenuItem>
                                <MenuItem value={'W4'}>W4</MenuItem>
                                <MenuItem value={'W5'}>W5</MenuItem>
                            </Select>
                            {errorText.weekno != '' ? <p className='error'>{errorText.weekno}</p> : null}
                        </FormControl>

                    </Box>

                    <Box sx={{ width: '100%' }}>

                        <FormControl fullWidth required>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Week Start Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={startDate}
                                        onChange={handleChangeStartdate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>

                            {errorText.wsDate != '' ? <p className='error'>{errorText.wsDate}</p> : null}
                        </FormControl>
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <FormControl fullWidth required>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="Week End Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={endDate}
                                        onChange={handleChangeEnddate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.weDate != '' ? <p className='error'>{errorText.weDate}</p> : null}
                        </FormControl>

                    </Box>

                    {loader == true ?
                        <CButton disabled className='addbtn'>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Loading...
                        </CButton>
                        :
                        <div>
                            {update == true ?
                                <button title='Add' className='addbtn' onClick={handleSubmit(submit)}><UpdateIcon fontSize='large' />{update}</button>
                                :
                                <button title='Add' className='addbtn' onClick={handleSubmit(submit)}><AddIcon fontSize='large' />{update}</button>
                            }

                        </div>
                    }
                    <div className='date'>
                        <button title='Refresh' disabled={disable} className='addbtn' onClick={() => setIsOpen2(true)}><RefreshIcon fontSize='large' /></button>

                    </div>
                </div>
                <div >
                    <FormControl>
                        {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="WeekView"
                            name="radio-buttons-group"
                            className='tableview'
                            value={tableView}
                            onChange={(e) => onchangeTableView(e)}
                        >
                            <FormControlLabel style={{marginRight:0}} value="WeekView" control={<Radio />} label="Week View" />
                            <FormControlLabel style={{marginRight:0}} value="MonthView" control={<Radio />} label="Month View" />

                        </RadioGroup>
                    </FormControl>
                </div>
                <div className='tablecenter'>
                    {koMonthData.length > 0 ?
                        <Paper sx={{ width: '100%', overflow: 'hidden',paddingTop:1 }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    {tableView == 'MonthView' ?
                                        <TableHead>
                                            <TableRow>
                                                {/* <TableCell scope="row">SN.</TableCell> */}
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Edit</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>KO Month</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>KO Year</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Days</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>From Date</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>To Date </TableCell>
                                                {/* <TableCell align="left" >Week Number</TableCell>
                                                <TableCell align="left" >Start Date</TableCell>
                                                <TableCell align="left" >End Date</TableCell> */}

                                            </TableRow>
                                        </TableHead>
                                        :
                                        <TableHead>
                                            <TableRow>
                                                {/* <TableCell scope="row">SN.</TableCell> */}
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Edit</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>KO Month</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>KO Year</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Days</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>From Date</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>To Date </TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Week Number</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Start Date</TableCell>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>End Date</TableCell>

                                            </TableRow>
                                        </TableHead>

                                    }
                                    {tableView == 'MonthView' ?
                                        <TableBody>

                                            {koMonthData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                                return (

                                                    <TableRow key={index}>

                                                        {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}><div onClick={() => openMonthModel(item)} className='editbtn'><BorderColorIcon size={20} color='#000' /></div></TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.vKOMonth}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nKOYear}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nDays}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.dtStartDt}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.dtEndDt}</TableCell>
                                                        {/* <TableCell align="left" >{item.vWeekNo}</TableCell>
                                                    <TableCell align="left" >{item.dtWStartDt}</TableCell>
                                                    <TableCell align="left" >{item.dtWEndDt}</TableCell> */}
                                                    </TableRow>
                                                )
                                            })
                                            }


                                        </TableBody>
                                        :
                                        <TableBody>

                                            {koMonthData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                                return (

                                                    <TableRow key={index}>

                                                        {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}><div onClick={() => openWeekModel(item)} className='editbtn'><BorderColorIcon size={20} color='#000' /></div></TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.vKOMonth}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nKOYear}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nDays}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.dtStartDt}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.dtEndDt}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.vWeekNo}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.dtWStartDt}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.dtWEndDt}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            }


                                        </TableBody>
                                    }
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
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Alert !!</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='alertmsg'><p>Do you want to Clear the fields?</p></div>
                <div className='alertButton' >

                    <button type="submit" className='alertYes' onClick={refreshdate}>Yes</button>
                    <button type="submit" className='alertno' onClick={() => setIsOpen(false)}>No</button>

                </div>
            </Modal >
            <Modal
                isOpen={modalIsOpen2}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Alert !!</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen2(false)} />
                </div>
                <div className='alertmsg'><p>Do you want to Clear the fields?</p></div>
                <div className='alertButton' >

                    <button type="submit" className='alertYes' onClick={refreshdate2}>Yes</button>
                    <button type="submit" className='alertno' onClick={() => setIsOpen2(false)}>No</button>

                </div>
            </Modal >
            <Modal
                isOpen={weekmodalIsOpen}
                style={customStylesWeek}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright '>
                    <div><span className='title'>KO Week Update</span></div>
                    <HighlightOffIcon fontSize='large' onClick={hidesetweekmodalIsOpen} />
                </div>
                <div className='mt-4'>
                    <div className='editModel'>

                        <Box className='inputBox-6'>
                            <FormControl fullWidth className='input' required>
                                <InputLabel id="demo-simple-select-label" sx={muiStyles.InputLabels}>KO Month</InputLabel>
                                <Select
                                    sx={muiStyles.select}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={vKOMonth}
                                    label="KO Month"
                                    onChange={handleChangevKOMonth}
                                    readOnly={monthDisable}
                                >
                                    <MenuItem value={'JAN'}>JAN</MenuItem>
                                    <MenuItem value={'FEB'}>FEB</MenuItem>
                                    <MenuItem value={'MAR'}>MAR</MenuItem>
                                    <MenuItem value={'APR'}>APR</MenuItem>
                                    <MenuItem value={'MAY'}>MAY</MenuItem>
                                    <MenuItem value={'JUN'}>JUN</MenuItem>
                                    <MenuItem value={'JUL'}>JUL</MenuItem>
                                    <MenuItem value={'AUG'}>AUG</MenuItem>
                                    <MenuItem value={'SEP'}>SEP</MenuItem>
                                    <MenuItem value={'OCT'}>OCT</MenuItem>
                                    <MenuItem value={'NOV'}>NOV</MenuItem>
                                    <MenuItem value={'DEC'}>DEC</MenuItem>
                                </Select>
                                {errorText.editkoMonths != '' ? <p className='error'>{errorText.editkoMonths}</p> : null}
                            </FormControl>
                        </Box>


                        <Box className='inputBox-7' >
                            <FormControl fullWidth className='input'>
                                <TextField
                                    sx={muiStyles.input}
                                    value={nKOYear}
                                    onChange={e => setnKOYear(e.target.value)}
                                    required id="outlined-basic"
                                    label="KO Year"
                                    variant="outlined"

                                    name='nKOYears'
                                    inputRef={register({ required: "KO Year is required *", })}
                                    error={Boolean(errors.nKOYears)}
                                    helperText={errors.nKOYears?.message}
                                    disabled={monthDisable}
                                />
                            </FormControl>
                        </Box>

                        <Box className='inputBox-7'>
                            <FormControl fullWidth className='input'>
                                <TextField
                                    sx={muiStyles.input}
                                    value={nDays}
                                    onChange={e => setnDays(e.target.value)}
                                    required id="outlined-basic"
                                    label="Days"
                                    variant="outlined"
                                    name='nDayss'
                                    inputRef={register({ required: "Days is required *", })}
                                    error={Boolean(errors.nDayss)}
                                    helperText={errors.nDayss?.message}
                                    disabled={monthDisable}
                                />
                            </FormControl>
                        </Box>
                        <Box className='inputBox-8'>
                            <FormControl fullWidth required>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3} >
                                        <DesktopDatePicker
                                            label={'Start Date *'}
                                            inputFormat="DD-MM-YYYY"
                                            value={fromDate}
                                            onChange={handleChangeFromedate}
                                            renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                            disabled={monthDisable}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                {errorText.editsDate != '' ? <p className='error'>{errorText.editsDate}</p> : null}
                            </FormControl>

                        </Box>
                        <Box className='inputBox-8'>
                            <FormControl fullWidth required>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="End Date *"
                                            inputFormat="DD-MM-YYYY"
                                            value={toDate}
                                            onChange={handleChangeTodate}
                                            renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                            disabled={monthDisable}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                {errorText.editeDate != '' ? <p className='error'>{errorText.editeDate}</p> : null}
                            </FormControl>

                        </Box>

                        <Box className='inputBox-9'>
                            <FormControl fullWidth required >
                                <InputLabel id="demo-simple-select-label" sx={muiStyles.InputLabels}>Week Number</InputLabel>
                                <Select
                                    sx={muiStyles.select}
                                    style={{ width: '100%', }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={weekNumberId}
                                    label="Week Number"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'W1'}>W1</MenuItem>
                                    <MenuItem value={'W2'}>W2</MenuItem>
                                    <MenuItem value={'W3'}>W3</MenuItem>
                                    <MenuItem value={'W4'}>W4</MenuItem>
                                    <MenuItem value={'W5'}>W5</MenuItem>
                                </Select>
                                {errorText.editweekno != '' ? <p className='error'>{errorText.editweekno}</p> : null}
                            </FormControl>
                            <div className='error'>{error} </div>
                        </Box>

                        <Box className='inputBox-10'>
                            <FormControl fullWidth required>
                                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '100%', }}>
                                    <Stack spacing={3} >
                                        <DesktopDatePicker
                                            label="Week Start Date *"
                                            inputFormat="DD-MM-YYYY"
                                            value={startDate}
                                            onChange={handleChangeStartdate}
                                            renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                {errorText.editwsDate != '' ? <p className='error'>{errorText.editwsDate}</p> : null}
                            </FormControl>

                        </Box>

                        <Box className='inputBox-10'>
                            <FormControl fullWidth required >
                                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '100%', }}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="Week End Date *"
                                            inputFormat="DD-MM-YYYY"
                                            value={endDate}
                                            onChange={handleChangeEnddate}
                                            renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                {errorText.editweDate != '' ? <p className='error'>{errorText.editweDate}</p> : null}
                            </FormControl>

                        </Box>
                    </div>
                </div>
                {loader == true ?
                    <div className='alertButton' >
                        <CButton disabled className='updateko'>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Loading...
                        </CButton>
                    </div>
                    :
                    <div className='alertButton' >
                        <button type="submit" className='updateko' onClick={updateWeekData}>Update</button>
                    </div>
                }

            </Modal >
            <Modal
                isOpen={monthmodalIsOpen}
                style={customStylesWeek}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>KO Month Update</span></div>
                    <HighlightOffIcon fontSize='large' onClick={hidesetmonthmodalIsOpen} />
                </div>
                <div className='mt-4'>
                    <div className='editModel'>
                        <Box className='inputBox-6'>
                            <FormControl fullWidth required>
                                <InputLabel id="demo-simple-select-label" sx={muiStyles.InputLabels}>KO Month</InputLabel>
                                <Select
                                    sx={muiStyles.select}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={vKOMonth}
                                    label="KO Month"
                                    onChange={handleChangevKOMonth}
                                    readOnly={disable}

                                >
                                    <MenuItem value={'JAN'}>JAN</MenuItem>
                                    <MenuItem value={'FEB'}>FEB</MenuItem>
                                    <MenuItem value={'MAR'}>MAR</MenuItem>
                                    <MenuItem value={'APR'}>APR</MenuItem>
                                    <MenuItem value={'MAY'}>MAY</MenuItem>
                                    <MenuItem value={'JUN'}>JUN</MenuItem>
                                    <MenuItem value={'JUL'}>JUL</MenuItem>
                                    <MenuItem value={'AUG'}>AUG</MenuItem>
                                    <MenuItem value={'SEP'}>SEP</MenuItem>
                                    <MenuItem value={'OCT'}>OCT</MenuItem>
                                    <MenuItem value={'NOV'}>NOV</MenuItem>
                                    <MenuItem value={'DEC'}>DEC</MenuItem>
                                </Select>

                                {errorText.editkoMonths != '' ? <p className='error'>{errorText.editkoMonths}</p> : null}
                            </FormControl>
                        </Box>
                        <Box className='inputBox-7' >
                            <FormControl fullWidth className='input'>
                                <TextField
                                    sx={muiStyles.input}
                                    value={nKOYear}
                                    onChange={e => setnKOYear(e.target.value)}
                                    required id="outlined-basic"
                                    label="KO Year"
                                    variant="outlined"

                                    name='nKOYears'
                                    inputRef={register({ required: "KO Year is required *", })}
                                    error={Boolean(errors.nKOYears)}
                                    helperText={errors.nKOYears?.message}

                                />
                            </FormControl>
                        </Box>

                        <Box className='inputBox-7' >
                            <FormControl fullWidth className='input'>
                                <TextField
                                    sx={muiStyles.input}
                                    value={nDays}
                                    onChange={e => setnDays(e.target.value)}
                                    required id="outlined-basic"
                                    label="Days"
                                    variant="outlined"
                                    name='nDayss'
                                    inputRef={register({ required: "Days is required *", })}
                                    error={Boolean(errors.nDayss)}
                                    helperText={errors.nDayss?.message}
                                />
                            </FormControl>
                        </Box>

                        <Box className='inputBox-8'>
                            <FormControl fullWidth required>
                                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '100%', }}>
                                    <Stack spacing={3} >
                                        <DesktopDatePicker
                                            label={'Start Date *'}
                                            inputFormat="DD-MM-YYYY"
                                            value={fromDate}
                                            onChange={handleChangeFromedate}
                                            renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                {errorText.editsDate != '' ? <p className='error'>{errorText.editsDate}</p> : null}
                            </FormControl>

                        </Box>
                        <Box className='inputBox-8'>
                            <FormControl fullWidth required>
                                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '100%', }}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="End Date *"
                                            inputFormat="DD-MM-YYYY"
                                            value={toDate}
                                            onChange={handleChangeTodate}
                                            renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                {errorText.editeDate != '' ? <p className='error'>{errorText.editeDate}</p> : null}
                            </FormControl>


                        </Box>
                        <Box className='inputBox-9'>
                            <FormControl fullWidth required >
                                <InputLabel id="demo-simple-select-label" sx={muiStyles.InputLabels}>Week Number</InputLabel>
                                <Select
                                    sx={muiStyles.select}
                                    style={{ width: '100%', }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={weekNumberId}
                                    label="Week Number"
                                    onChange={handleChange}
                                    readOnly={WeekDisable}
                                >
                                    <MenuItem value={'W1'}>W1</MenuItem>
                                    <MenuItem value={'W2'}>W2</MenuItem>
                                    <MenuItem value={'W3'}>W3</MenuItem>
                                    <MenuItem value={'W4'}>W4</MenuItem>
                                    <MenuItem value={'W5'}>W5</MenuItem>
                                </Select>

                                {errorText.editweekno != '' ? <p className='error'>{errorText.editweekno}</p> : null}
                            </FormControl>
                        </Box>

                        <Box className='inputBox-10'>
                            <FormControl fullWidth required>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3} >
                                        <DesktopDatePicker
                                            label="Week Start Date *"
                                            inputFormat="DD-MM-YYYY"
                                            value={startDate}
                                            onChange={handleChangeStartdate}
                                            renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                            disabled={WeekDisable}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                {errorText.editwsDate != '' ? <p className='error'>{errorText.editwsDate}</p> : null}
                            </FormControl>

                        </Box>

                        <Box className='inputBox-10'>
                            <FormControl error={Boolean(errors.endDate)} required>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="Week End Date *"
                                            inputFormat="DD-MM-YYYY"
                                            value={endDate}
                                            onChange={handleChangeEnddate}
                                            renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                            disabled={WeekDisable}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                {errorText.editweDate != '' ? <p className='error'>{errorText.editweDate}</p> : null}
                            </FormControl>

                        </Box>


                        <div className='break'>

                        </div>
                        <div className='tablecenter'>
                            {koMonthData.length > 0 ?
                                <Paper sx={{ width: '100%', overflow: 'hidden',paddingTop:1 }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell scope="row">SN.</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Week Number</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Start Date</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>End Date</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {weekData.map((item, index) => {
                                                    return (

                                                        <TableRow key={index}>

                                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.vWeekNo}</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.dtWEndDt}</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.dtWEndDt}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                                }


                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {/* <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={koMonthData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            /> */}

                                </Paper>
                                :
                                null

                            }

                        </div>

                    </div>
                </div>
                {loader == true ?
                    <div className='alertButton' >
                        <CButton disabled className='updateko'>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Loading...
                        </CButton>
                    </div>
                    :
                    <div className='alertButton' >
                        <button type="submit" className='updateko' onClick={updateMonthData}>Update</button>
                    </div>
                }
            </Modal >
        </div>
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
        width: '30%',
    },
};
const customStylesWeek = {
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
            left:'-10px',
            backgroundColor: 'transparent',
            zIndex: '1'
        },
        "& label.Mui-focused": {
            zIndex: '1'

        },
        '& .MuiInputAdornment-root':{
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
            left:'-10px',
          
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
            left:'-10px',  
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
        left:'-10px',
        backgroundColor: 'transparent',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
   

};
export default KOMONTH
