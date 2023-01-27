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
import { KOMonthMaster,KOMonth_SelectAll } from './Komonthapi'
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
import { parseDateToString,parseDateToStringSubmit } from '../../coreservices/Date';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react';
import RefreshIcon from '@mui/icons-material/Refresh';
function KOMONTH() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [koMonthData, setkoMonthData] = React.useState([]);
    const [weekData, setWeekData] = React.useState([]);
    const [nKOId, setnKOId] = React.useState(0);
    const [weekNumberId, setWeekNumberId] = React.useState('');
    const [vKOMonth, setvKOMonth] = React.useState('');
    const [nKOYear, setnKOYear] = React.useState('');
    const [nDays, setnDays] = React.useState('');
    const [error, setError] = React.useState('');
    let fromDates = new Date(Date.now())
    fromDates.setDate(fromDates.getDate() - 7)
    let toDates = new Date(Date.now())
    const [fromDate, setFromdate] = React.useState(dayjs(fromDates));
    const [toDate, setTodate] = React.useState(dayjs(toDates));
    let startDates = new Date(Date.now())
    let endDates = new Date(Date.now())
    const [startDate, setStartDate] = React.useState(dayjs(startDates));
    const [endDate, setEndDate] = React.useState(dayjs(endDates));
    const { register, handleSubmit, control, errors } = useForm();
    const [loader, setLoader] = React.useState(false);
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
    useEffect(() => {
        getCityList()
    }, [])
    const getCityList = () => {
        // CityMasters().then(response => {
        //     setCityData(response)
        // })
    }


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
    const refreshdate = () => {
        setIsOpen(false)
        setvKOMonth('')
        setnKOYear('')
        setnDays('')
        let fromDates = new Date(Date.now())
        fromDates.setDate(fromDates.getDate() - 7)
        let toDates = new Date(Date.now())
        setFromdate(dayjs(fromDates))
        setTodate(dayjs(toDates))
    }
    const submit = () => {
        setLoader(true)
        let data = {
            nKOId: nKOId==null?0:nKOId,
            vKOMonth: vKOMonth,
            nKOYear: nKOYear,
            nDays: nDays,
            dtStartDate: parseDateToStringSubmit(new Date(fromDate)),
            dtEndDate: parseDateToStringSubmit(new Date(toDate)),
            vWeekNo: weekNumberId,
            dtWStartDate: parseDateToStringSubmit(new Date(startDate)),
            dtWEndDate: parseDateToStringSubmit(new Date(endDate)),
        }
        console.log('data',data)
        KOMonthMaster(data).then(res => {
            if (res) {
                toast.success("Record Added Successfully !!")
                setLoader(false)
                let startDates = new Date(Date.now())
                let endDates = new Date(Date.now())
                setWeekNumberId('')
                setStartDate(startDates)
                setEndDate(endDates)
            }
        })
    }
    useEffect(()=>{
        getKOMonth_SelectAll()
    },[])
    const getKOMonth_SelectAll=()=>{
        KOMonth_SelectAll().then(res=>{
            if(res){
                setkoMonthData(res)
            }
        })
    }
    return (
        <div className='citymasterContainer'>
            {/* <button className='addbtn' onClick={openmodale}>Add</button> */}
            <div className='dateFilter'>
                <div className='date'>
                    <Box sx={{ width: '100%' }}>
                        <FormControl fullWidth inputRef={register({ required: "KO Month is required.*", })}>
                            <InputLabel id="demo-simple-select-label">KO Month<span style={{ color: "red" }}>*</span></InputLabel>
                            <Select
                                style={{ width: 130, }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vKOMonth}
                                label="KO Month"
                                name="KO Month"
                                onChange={handleChangevKOMonth}
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
                        </FormControl>
                        <div className='error'>{error} </div>
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
                                inputRef={register({ required: "KO Year is required.*", })}
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
                                inputRef={register({ required: "Days is required.*", })}
                                error={Boolean(errors.nDays)}
                                helperText={errors.nDays?.message}
                            />
                        </FormControl>
                    </Box>

                </div>
                <div className='date'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} >
                            <DesktopDatePicker
                                label={'Start Date'}
                                inputFormat="DD-MM-YYYY"
                                value={fromDate}
                                onChange={handleChangeFromedate}
                                renderInput={(params) => <TextField {...params} />}
                                name="fromDate"
                                inputRef={register({ required: "Start Date is required.*", })}
                                error={Boolean(errors.fromDate)}
                                helperText={errors.fromDate?.message}
                            />
                        </Stack>
                    </LocalizationProvider>

                </div>
                <div className='date'>
                    <FormControl fullWidth required >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="End Date "
                                    inputFormat="DD-MM-YYYY"
                                    value={toDate}
                                    onChange={handleChangeTodate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>

                    </FormControl>

                </div>
                <div className='date'>
                    <button title='Refresh' className='addbtn' onClick={()=>setIsOpen(true)}><RefreshIcon fontSize='large' /></button>

                </div>
            </div>
            <div className='databox'>
                <div className='data-form-box'>
                    <Box sx={{ width: '15%' }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel id="demo-simple-select-label">Week Number <span style={{ color: "red" }}>*</span></InputLabel>
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
                        </FormControl>
                        <div className='error'>{error} </div>
                    </Box>

                    <div className='date'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <Stack spacing={3} >
                                <DesktopDatePicker
                                    label="Week Start Date"
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
                                    label="Week End Date"
                                    inputFormat="DD-MM-YYYY"
                                    value={endDate}
                                    onChange={handleChangeEnddate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>

                    </div>
                    {loader == true ?
                        <CButton disabled className='addbtn'>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Loading...
                        </CButton>
                        :
                        <button title='Add' className='addbtn' onClick={submit}><AddIcon fontSize='large' /></button>
                    }
                </div>
                <div className='tablecenter'>
                    {koMonthData.length > 0 ?
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="row">SN.</TableCell>
                                            <TableCell align="left">KO Month</TableCell>
                                            <TableCell align="left">KO Year</TableCell>
                                            <TableCell align="left">From Date</TableCell>
                                            <TableCell align="left">Days</TableCell>
                                            <TableCell align="left">To Date </TableCell>
                                            <TableCell align="left">Week Number</TableCell>
                                            <TableCell align="left">Start Date</TableCell>
                                            <TableCell align="left">End Date</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {koMonthData.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                    <TableCell align="left">{item.vKOMonth}</TableCell>
                                                    <TableCell align="left">{item.nKOYear}</TableCell>
                                                    <TableCell align="left">{item.nDays}</TableCell>
                                                    <TableCell align="left">{item.dtStartDate}</TableCell>
                                                    <TableCell align="left">{item.dtEndDate}</TableCell>
                                                    <TableCell align="left">{item.vWeekNo}</TableCell>
                                                    <TableCell align="left">{item.dtWStartDate}</TableCell>
                                                    <TableCell align="left">{item.dtWEndDate}</TableCell>


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
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Alert !!</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
               <div className='alertmsg'><p>Do you want to Refresh?</p></div>
                <div className='alertButton' >
                    
                        <button type="submit" className='alertYes' onClick={refreshdate}>Yes</button>
                        <button type="submit" className='alertno' onClick={()=>setIsOpen(false)}>No</button>
                    
                </div>
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

export default KOMONTH
