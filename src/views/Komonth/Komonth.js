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
import { CityMasters, GetAllActiveStates, GetMainInterrelatedCities } from './authService'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { parseDateToString } from '../../coreservices/Date';

function KOMONTH() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [koMonthData, setkoMonthData] = React.useState([]);
    const [weekData, setWeekData] = React.useState([]);
    const [weekNumberId, setWeekNumberId] = React.useState('');
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
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChange = (event) => {
        setWeekNumberId(event.target.value);
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
        if(validateform()==true){
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
    const validateform=()=>{
        if(weekNumberId==''){
            console.log('Select Week Number')
            setError('Select Week Number'+''+'*')
            return false
        }else{
            setError('')
            return true
        }
    }
    return (
        <div className='citymasterContainer'>
            {/* <button className='addbtn' onClick={openmodale}>Add</button> */}
            <div className='dateFilter'>
                <div className='date'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} >
                            <DesktopDatePicker
                                label={'Start Date'}
                                inputFormat="DD-MM-YYYY"
                                value={fromDate}
                                onChange={handleChangeFromedate}
                                renderInput={(params) => <TextField {...params} />}
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
                    <div>
                        <button title='Add' className='addbtn' onClick={addKoMonthDate}><AddIcon fontSize='large'/></button>
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
                                            <TableCell align="left">From Date</TableCell>
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
                                                    <TableCell align="left">{item.fromDate}</TableCell>
                                                    <TableCell align="left">{item.toDate}</TableCell>
                                                    <TableCell align="left">{item.weekNumber}</TableCell>
                                                    <TableCell align="left">{item.startDate}</TableCell>
                                                    <TableCell align="left">{item.endDate}</TableCell>


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
        width: '50%',
    },
};

export default KOMONTH
