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
import { KOMonthMaster, KOMonth_SelectAll, KOMonth_SelectAllMonthView, KOMonth_SelectAllWeekWise, KOMonthMasterPut,KOMonthMaster_Update } from './Komonthapi'
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
import { RiEditBoxLine } from "react-icons/ri"
import UpdateIcon from '@mui/icons-material/Update';
import { FormHelperText } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
function KOMONTH() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
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
        if (weekNumberId == '') {
            console.log('Select Week Number')
            setError('Select Week Number' + '' + '*')
            return false
        } else {
            setError('')
            return true
        }
    }
    

    const submit = (alldata) => {
        setLoader(true)
        let data = {
            nKOId: nKOId == null ? 0 : nKOId,
            vKOMonth: alldata.vKOMonth,
            nKOYear: nKOYear,
            nDays: nDays,
            dtStartDate: parseDateToStringSubmit(new Date(alldata.fromDate)),
            dtEndDate: parseDateToStringSubmit(new Date(alldata.toDate)),
            vWeekNo: alldata.weekNumberId,
            dtWStartDate: parseDateToStringSubmit(new Date(alldata.startDate)),
            dtWEndDate: parseDateToStringSubmit(new Date(alldata.endDate)),
        }
        console.log('data', data)
        KOMonthMaster(data).then(res => {
            if (res) {
                toast.success("Record Added Successfully !!")
                setLoader(false)
                setWeekNumberId('')
                setStartDate(null)
                setEndDate(null)
                getKOMonth_SelectAll()
            }
        })
    }
    useEffect(() => {
        getKOMonth_SelectAll()
    }, [])
    const getKOMonth_SelectAll = () => {
        KOMonth_SelectAll().then(res => {
            if (res) {
                console.log('resWeek', res)
                setkoMonthData(res)
            }
        })
    }
    const getKOMonth_SelectAllMonthView = () => {
        KOMonth_SelectAllMonthView().then(res => {
            if (res) {
                console.log('resMont', res)
                setkoMonthData(res)
            }
        })
    }
    let updateBtn = false
    // const openmodale = (item, type) => {
    //     if (type == 'Update') {
    //         alert(1)
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
    const updateWeekData = () => {
        setLoader(true)
        let data = {
            nKOWId: nKOWId,
            vWeekNo: weekNumberId,
            dtWStartDate: parseDateToStringSubmit(new Date(startDate)),
            dtWEndDate: parseDateToStringSubmit(new Date(endDate)),
        }
        console.log('data', data)
        KOMonthMasterPut(data).then(res=>{
            if(res){
                toast.success("Record Added Successfully !!")
                setLoader(false)
                setweekmodalIsOpen(false)
                getKOMonth_SelectAll()
            }
        })
    }
    const updateMonthData = () => {
        setLoader(true)
        let data = {
            nKOId: nKOId,
            vKOMonth: vKOMonth,
            nKOYear:nKOYear,
            nDays:nDays,
            dtStartDate: parseDateToStringSubmit(new Date(fromDate)),
            dtEndDate: parseDateToStringSubmit(new Date(toDate)),
        }
        console.log('data', data)
        KOMonthMaster_Update(data).then(res=>{
            if(res){
                toast.success("Record Added Successfully !!")
                setLoader(false)
                setmonthmodalIsOpen(false)
                getKOMonth_SelectAllMonthView()
            }
        })
    }
    return (
        <div className='citymasterContainer'>
            {/* <button className='addbtn' onClick={openmodale}>Add</button> */}
            <div className='dateFilter'>
                <div className='date'>
                    <Box sx={{ width: '100%' }}>
                        <FormControl fullWidth error={Boolean(errors.nKOYear)}>
                            <InputLabel id="demo-simple-select-label">KO Month<span >*</span></InputLabel>
                            {/* <Select
                            style={{ width: 130, }}
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
                        </Select> */}
                            <Controller
                                render={(props) => (
                                    <Select value={props.value} onChange={props.onChange} style={{ width: 130, }} readOnly={disable}>
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
                                )}
                                name="vKOMonth"
                                control={control}
                                defaultValue={vKOMonth}
                                rules={{
                                    required: "Select KO Month *",
                                }}
                            />
                            <FormHelperText>{errors.vKOMonth?.message}</FormHelperText>
                        </FormControl>
                    </Box>

                </div>
                <div className='date'>
                    <Box sx={{ width: '100%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
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

                </div>
                <div className='date'>
                    <Box sx={{ width: '100%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
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

                </div>
                <div className='date'>
                    <FormControl error={Boolean(errors.fromDate)} required>
                        <Controller
                            render={(props) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3} >
                                        <DesktopDatePicker
                                            label={'Start Date *'}
                                            inputFormat="DD-MM-YYYY"
                                            value={props.value}
                                            onChange={props.onChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            disabled={disable}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            )}
                            name="fromDate"
                            control={control}
                            defaultValue={fromDate}
                            rules={{
                                required: "Select Start Date *",
                            }}
                        />
                        <FormHelperText>{errors.fromDate?.message}</FormHelperText>
                    </FormControl>

                </div>
                <div className='date'>
                    <FormControl error={Boolean(errors.toDate)} required>
                        <Controller
                            render={(props) => (
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="End Date *"
                                            inputFormat="DD-MM-YYYY"
                                            value={props.value}
                                            onChange={props.onChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            disabled={disable}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            )}
                            name="toDate"
                            control={control}
                            defaultValue={toDate}
                            rules={{
                                required: "Select End Date *",
                            }}
                        />
                        <FormHelperText>{errors.toDate?.message}</FormHelperText>
                    </FormControl>


                </div>
                <div className='date'>
                    <button title='Refresh' disabled={disable} className='addbtn' onClick={() => setIsOpen(true)}><RefreshIcon fontSize='large' /></button>

                </div>
            </div>
            <div className='databox'>
                <div className='data-form-box'>
                    <Box sx={{ width: '15%' }}>
                        <FormControl fullWidth className='input' error={Boolean(errors.nKOYear)}>
                            <InputLabel id="demo-simple-select-label">Week Number <span>*</span></InputLabel>
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
                            <Controller
                                render={(props) => (
                                    <Select value={props.value} onChange={props.onChange} style={{ width: 170, }} >
                                        <MenuItem value={'W1'}>W1</MenuItem>
                                        <MenuItem value={'W2'}>W2</MenuItem>
                                        <MenuItem value={'W3'}>W3</MenuItem>
                                        <MenuItem value={'W4'}>W4</MenuItem>
                                        <MenuItem value={'W5'}>W5</MenuItem>
                                    </Select>
                                )}
                                name="weekNumberId"
                                control={control}
                                defaultValue={weekNumberId}
                                rules={{
                                    required: "Select Week Number *.",
                                }}
                            />
                            <FormHelperText>{errors.weekNumberId?.message}</FormHelperText>
                        </FormControl>
                        <div className='error'>{error} </div>
                    </Box>

                    <div className='date'>
                        <FormControl error={Boolean(errors.startDate)} required>
                            <Controller
                                render={(props) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <Stack spacing={3} >
                                            <DesktopDatePicker
                                                label="Week Start Date *"
                                                inputFormat="DD-MM-YYYY"
                                                value={props.value}
                                                onChange={props.onChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                )}
                                name="startDate"
                                control={control}
                                defaultValue={startDate}
                                rules={{
                                    required: "Select Week Start Date *",
                                }}
                            />
                            <FormHelperText>{errors.startDate?.message}</FormHelperText>
                        </FormControl>


                    </div>
                    <div className='date'>
                        <FormControl error={Boolean(errors.endDate)} required>
                            <Controller
                                render={(props) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <Stack spacing={3}>
                                            <DesktopDatePicker
                                                label="Week End Date *"
                                                inputFormat="DD-MM-YYYY"
                                                value={props.value}
                                                onChange={props.onChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                )}
                                name="endDate"
                                control={control}
                                defaultValue={endDate}
                                rules={{
                                    required: "Select Week End Date *",
                                }}
                            />
                            <FormHelperText>{errors.endDate?.message}</FormHelperText>
                        </FormControl>

                    </div>

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
                            <FormControlLabel value="WeekView" control={<Radio />} label="Week View" />
                            <FormControlLabel value="MonthView" control={<Radio />} label="Month View" />

                        </RadioGroup>
                    </FormControl>
                </div>
                <div className='tablecenter'>
                    {koMonthData.length > 0 ?
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    {tableView == 'MonthView' ?
                                        <TableHead>
                                            <TableRow>
                                                <TableCell scope="row">SN.</TableCell>
                                                <TableCell align="left">Edit</TableCell>
                                                <TableCell align="left">KO Month</TableCell>
                                                <TableCell align="left">KO Year</TableCell>
                                                <TableCell align="left">Days</TableCell>
                                                <TableCell align="left">From Date</TableCell>
                                                <TableCell align="left">To Date </TableCell>
                                                {/* <TableCell align="left">Week Number</TableCell>
                                                <TableCell align="left">Start Date</TableCell>
                                                <TableCell align="left">End Date</TableCell> */}

                                            </TableRow>
                                        </TableHead>
                                        :
                                        <TableHead>
                                            <TableRow>
                                                <TableCell scope="row">SN.</TableCell>
                                                <TableCell align="left">Edit</TableCell>
                                                <TableCell align="left">KO Month</TableCell>
                                                <TableCell align="left">KO Year</TableCell>
                                                <TableCell align="left">Days</TableCell>
                                                <TableCell align="left">From Date</TableCell>
                                                <TableCell align="left">To Date </TableCell>
                                                <TableCell align="left">Week Number</TableCell>
                                                <TableCell align="left">Start Date</TableCell>
                                                <TableCell align="left">End Date</TableCell>

                                            </TableRow>
                                        </TableHead>

                                    }
                                    {tableView == 'MonthView' ?
                                        <TableBody>

                                            {koMonthData.map((item, index) => {
                                                return (

                                                    <TableRow key={index}>

                                                        <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                        <TableCell align="left"><div onClick={() => openMonthModel(item)}><RiEditBoxLine fontSize="1.5em" color='red' /></div></TableCell>
                                                        <TableCell align="left">{item.vKOMonth}</TableCell>
                                                        <TableCell align="left">{item.nKOYear}</TableCell>
                                                        <TableCell align="left">{item.nDays}</TableCell>
                                                        <TableCell align="left">{item.dtStartDt}</TableCell>
                                                        <TableCell align="left">{item.dtEndDt}</TableCell>
                                                        {/* <TableCell align="left">{item.vWeekNo}</TableCell>
                                                    <TableCell align="left">{item.dtWStartDt}</TableCell>
                                                    <TableCell align="left">{item.dtWEndDt}</TableCell> */}
                                                    </TableRow>
                                                )
                                            })
                                            }


                                        </TableBody>
                                        :
                                        <TableBody>

                                            {koMonthData.map((item, index) => {
                                                return (

                                                    <TableRow key={index}>

                                                        <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                        <TableCell align="left"><div onClick={() => openWeekModel(item)}><RiEditBoxLine fontSize="1.5em" color='red'/></div></TableCell>
                                                        <TableCell align="left">{item.vKOMonth}</TableCell>
                                                        <TableCell align="left">{item.nKOYear}</TableCell>
                                                        <TableCell align="left">{item.nDays}</TableCell>
                                                        <TableCell align="left">{item.dtStartDt}</TableCell>
                                                        <TableCell align="left">{item.dtEndDt}</TableCell>
                                                        <TableCell align="left">{item.vWeekNo}</TableCell>
                                                        <TableCell align="left">{item.dtWStartDt}</TableCell>
                                                        <TableCell align="left">{item.dtWEndDt}</TableCell>
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
                isOpen={weekmodalIsOpen}
                style={customStylesWeek}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>KO Week Update</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setweekmodalIsOpen(false)} />
                </div>
                <div>
                    <div className='editModel'>
                        <div className='date'>
                            <Box sx={{ width: '100%' }}>
                                <FormControl fullWidth error={Boolean(errors.nKOYear)}>
                                    <InputLabel id="demo-simple-select-label">KO Month <span >*</span></InputLabel>
                                    <Select
                                        style={{ width: 130, }}
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
                                    {/* <Controller
                                        render={(props) => (
                                            <Select value={props.value} onChange={props.onChange} style={{ width: 130, }} readOnly={monthDisable}>
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
                                        )}
                                        name="vKOMonth"
                                        control={control}
                                        defaultValue={vKOMonth}
                                        rules={{
                                            required: "Select KO Month *",
                                        }}
                                    /> */}
                                    <FormHelperText>{errors.vKOMonth?.message}</FormHelperText>
                                </FormControl>
                            </Box>

                        </div>
                        <div className='date'>
                            <Box sx={{ width: '100%' }} >
                                <FormControl fullWidth className='input'>
                                    <TextField
                                        value={nKOYear}
                                        onChange={e => setnKOYear(e.target.value)}
                                        required id="outlined-basic"
                                        label="KO Year"
                                        variant="outlined"

                                        name='nKOYear'
                                        inputRef={register({ required: "KO Year is required *", })}
                                        error={Boolean(errors.nKOYear)}
                                        helperText={errors.nKOYear?.message}
                                        disabled={monthDisable}
                                    />
                                </FormControl>
                            </Box>

                        </div>
                        <div className='date'>
                            <Box sx={{ width: '100%' }} >
                                <FormControl fullWidth className='input'>
                                    <TextField
                                        value={nDays}
                                        onChange={e => setnDays(e.target.value)}
                                        required id="outlined-basic"
                                        label="Days"
                                        variant="outlined"
                                        name='nDays'
                                        inputRef={register({ required: "Days is required *", })}
                                        error={Boolean(errors.nDays)}
                                        helperText={errors.nDays?.message}
                                        disabled={monthDisable}
                                    />
                                </FormControl>
                            </Box>

                        </div>
                        <div className='date'>
                            <FormControl error={Boolean(errors.fromDate)} required>
                                {/* <Controller
                                    render={(props) => (
                                        
                                    )}
                                    name="fromDate"
                                    control={control}
                                    defaultValue={fromDate}
                                    rules={{
                                        required: "Select Start Date *",
                                    }}
                                /> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3} >
                                        <DesktopDatePicker
                                            label={'Start Date *'}
                                            inputFormat="DD-MM-YYYY"
                                            value={fromDate}
                                            onChange={handleChangeFromedate}
                                            renderInput={(params) => <TextField {...params} />}
                                            disabled={monthDisable}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <FormHelperText>{errors.fromDate?.message}</FormHelperText>
                            </FormControl>

                        </div>
                        <div className='date'>
                            <FormControl error={Boolean(errors.toDate)} required>
                                {/* <Controller
                                    render={(props) => (
                                        
                                    )}
                                    name="toDate"
                                    control={control}
                                    defaultValue={toDate}
                                    rules={{
                                        required: "Select End Date *",
                                    }}
                                /> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="End Date *"
                                            inputFormat="DD-MM-YYYY"
                                            value={toDate}
                                            onChange={handleChangeTodate}
                                            renderInput={(params) => <TextField {...params} />}
                                            disabled={monthDisable}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <FormHelperText>{errors.toDate?.message}</FormHelperText>
                            </FormControl>


                        </div>
                        <div className='break'> </div>
                        <div className='date'>
                            <Box sx={{ width: '33%' }}>
                                <FormControl fullWidth error={Boolean(errors.nKOYear)} style={{ width: 170 }}>
                                    <InputLabel id="demo-simple-select-label">Week Number <span>*</span></InputLabel>
                                    <Select
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
                                    {/* <Controller
                                        render={(props) => (
                                            <Select value={props.value} onChange={props.onChange} style={{ width: 170, }} >
                                                <MenuItem value={'W1'}>W1</MenuItem>
                                                <MenuItem value={'W2'}>W2</MenuItem>
                                                <MenuItem value={'W3'}>W3</MenuItem>
                                                <MenuItem value={'W4'}>W4</MenuItem>
                                                <MenuItem value={'W5'}>W5</MenuItem>
                                            </Select>
                                        )}
                                        name="weekNumberId"
                                        control={control}
                                        defaultValue={weekNumberId}
                                        rules={{
                                            required: "Select Week Number *.",
                                        }}
                                    /> */}
                                    <FormHelperText>{errors.weekNumberId?.message}</FormHelperText>
                                </FormControl>
                                <div className='error'>{error} </div>
                            </Box>

                        </div>

                        <div className='date'>
                            <Box sx={{ width: '100%' }}>
                                <FormControl error={Boolean(errors.startDate)} required>
                                    {/* <Controller
                                        render={(props) => (
                                            
                                        )}
                                        name="startDate"
                                        control={control}
                                        defaultValue={startDate}
                                        rules={{
                                            required: "Select Week Start Date *",
                                        }}
                                    /> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <Stack spacing={3} >
                                            <DesktopDatePicker
                                                label="Week Start Date *"
                                                inputFormat="DD-MM-YYYY"
                                                value={startDate}
                                                onChange={handleChangeStartdate}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                    <FormHelperText>{errors.startDate?.message}</FormHelperText>
                                </FormControl>

                            </Box>
                        </div>
                        <div className='date'>
                            <Box sx={{ width: '100%' }}>
                                <FormControl error={Boolean(errors.endDate)} required>
                                    {/* <Controller
                                        render={(props) => (
                                            
                                        )}
                                        name="endDate"
                                        control={control}
                                        defaultValue={endDate}
                                        rules={{
                                            required: "Select Week End Date *",
                                        }}
                                    /> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <Stack spacing={3}>
                                            <DesktopDatePicker
                                                label="Week End Date *"
                                                inputFormat="DD-MM-YYYY"
                                                value={endDate}
                                                onChange={handleChangeEnddate}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                    <FormHelperText>{errors.endDate?.message}</FormHelperText>
                                </FormControl>

                            </Box>

                        </div>
                        <div className='date'>
                            <Box sx={{ width: 340 }}></Box>
                        </div>

                        <div >



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
                    <HighlightOffIcon fontSize='large' onClick={() => setmonthmodalIsOpen(false)} />
                </div>
                <div>
                    <div className='editModel'>
                        <div className='date'>
                            <Box sx={{ width: '100%' }}>
                                <FormControl fullWidth error={Boolean(errors.nKOYear)}>
                                    <InputLabel id="demo-simple-select-label">KO Month <span >*</span></InputLabel>
                                    <Select
                                        style={{ width: 130, }}
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
                                    {/* <Controller
                                        render={(props) => (
                                            <Select value={props.value} onChange={props.onChange} style={{ width: 130, }}>
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
                                        )}
                                        name="vKOMonth"
                                        control={control}
                                        defaultValue={vKOMonth}
                                        rules={{
                                            required: "Select KO Month *",
                                        }}
                                    /> */}
                                    <FormHelperText>{errors.vKOMonth?.message}</FormHelperText>
                                </FormControl>
                            </Box>

                        </div>
                        <div className='date'>
                            <Box sx={{ width: '100%' }} >
                                <FormControl fullWidth className='input'>
                                    <TextField
                                        value={nKOYear}
                                        onChange={e => setnKOYear(e.target.value)}
                                        required id="outlined-basic"
                                        label="KO Year"
                                        variant="outlined"

                                        name='nKOYear'
                                        inputRef={register({ required: "KO Year is required *", })}
                                        error={Boolean(errors.nKOYear)}
                                        helperText={errors.nKOYear?.message}

                                    />
                                </FormControl>
                            </Box>

                        </div>
                        <div className='date'>
                            <Box sx={{ width: '100%' }} >
                                <FormControl fullWidth className='input'>
                                    <TextField
                                        value={nDays}
                                        onChange={e => setnDays(e.target.value)}
                                        required id="outlined-basic"
                                        label="Days"
                                        variant="outlined"
                                        name='nDays'
                                        inputRef={register({ required: "Days is required *", })}
                                        error={Boolean(errors.nDays)}
                                        helperText={errors.nDays?.message}
                                    />
                                </FormControl>
                            </Box>

                        </div>
                        <div className='date'>
                            <FormControl error={Boolean(errors.fromDate)} required>
                                {/* <Controller
                                    render={(props) => (
                                        
                                    )}
                                    name="fromDate"
                                    control={control}
                                    defaultValue={fromDate}
                                    rules={{
                                        required: "Select Start Date *",
                                    }}
                                /> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3} >
                                        <DesktopDatePicker
                                            label={'Start Date *'}
                                            inputFormat="DD-MM-YYYY"
                                            value={fromDate}
                                            onChange={handleChangeFromedate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <FormHelperText>{errors.fromDate?.message}</FormHelperText>
                            </FormControl>

                        </div>
                        <div className='date'>
                            <FormControl error={Boolean(errors.toDate)} required>
                                {/* <Controller
                                    render={(props) => (
                                        
                                    )}
                                    name="toDate"
                                    control={control}
                                    defaultValue={toDate}
                                    rules={{
                                        required: "Select End Date *",
                                    }}
                                /> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="End Date *"
                                            inputFormat="DD-MM-YYYY"
                                            value={toDate}
                                            onChange={handleChangeTodate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <FormHelperText>{errors.toDate?.message}</FormHelperText>
                            </FormControl>


                        </div>
                        <div className='break'> </div>
                        <div className='date'>
                            <Box sx={{ width: '33%' }}>
                                <FormControl fullWidth error={Boolean(errors.nKOYear)} style={{ width: 170 }}>
                                    <InputLabel id="demo-simple-select-label">Week Number <span>*</span></InputLabel>
                                    <Select
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
                                    {/* <Controller
                                        render={(props) => (
                                            <Select value={props.value} onChange={props.onChange} style={{ width: 170, }} readOnly={WeekDisable}>
                                                <MenuItem value={'W1'}>W1</MenuItem>
                                                <MenuItem value={'W2'}>W2</MenuItem>
                                                <MenuItem value={'W3'}>W3</MenuItem>
                                                <MenuItem value={'W4'}>W4</MenuItem>
                                                <MenuItem value={'W5'}>W5</MenuItem>
                                            </Select>
                                        )}
                                        name="weekNumberId"
                                        control={control}
                                        defaultValue={weekNumberId}
                                        rules={{
                                            required: "Select Week Number *.",
                                        }}
                                    /> */}
                                    <FormHelperText>{errors.weekNumberId?.message}</FormHelperText>
                                </FormControl>
                                <div className='error'>{error} </div>
                            </Box>

                        </div>

                        <div className='date'>
                            <Box sx={{ width: '100%' }}>
                                <FormControl error={Boolean(errors.startDate)} required>
                                    {/* <Controller
                                        render={(props) => (
                                            
                                        )}
                                        name="startDate"
                                        control={control}
                                        defaultValue={startDate}
                                        rules={{
                                            required: "Select Week Start Date *",
                                        }}
                                    /> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <Stack spacing={3} >
                                            <DesktopDatePicker
                                                label="Week Start Date *"
                                                inputFormat="DD-MM-YYYY"
                                                value={startDate}
                                                onChange={handleChangeStartdate}
                                                renderInput={(params) => <TextField {...params} />}
                                                disabled={WeekDisable}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                    <FormHelperText>{errors.startDate?.message}</FormHelperText>
                                </FormControl>

                            </Box>
                        </div>
                        <div className='date'>
                            <Box sx={{ width: '100%' }}>
                                <FormControl error={Boolean(errors.endDate)} required>
                                    {/* <Controller
                                        render={(props) => (
                                            
                                        )}
                                        name="endDate"
                                        control={control}
                                        defaultValue={endDate}
                                        rules={{
                                            required: "Select Week End Date *",
                                        }}
                                    /> */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <Stack spacing={3}>
                                            <DesktopDatePicker
                                                label="Week End Date *"
                                                inputFormat="DD-MM-YYYY"
                                                value={endDate}
                                                onChange={handleChangeEnddate}
                                                renderInput={(params) => <TextField {...params} />}
                                                disabled={WeekDisable}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                    <FormHelperText>{errors.endDate?.message}</FormHelperText>
                                </FormControl>

                            </Box>

                        </div>
                        <div className='date'>
                            <Box sx={{ width: 340 }}></Box>
                        </div>
                        <div className='break'>

                        </div>
                        <div className='tablecenter'>
                            {koMonthData.length > 0 ?
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell scope="row">SN.</TableCell>
                                                    <TableCell align="left">Week Number</TableCell>
                                                    <TableCell align="left">Start Date</TableCell>
                                                    <TableCell align="left">End Date</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {weekData.map((item, index) => {
                                                    return (

                                                        <TableRow key={index}>

                                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                            <TableCell align="left">{item.vWeekNo}</TableCell>
                                                            <TableCell align="left">{item.dtWEndDt}</TableCell>
                                                            <TableCell align="left">{item.dtWEndDt}</TableCell>
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

export default KOMONTH
