import React, { useEffect } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { getKMLimitMaster_SelectAll, getVehicleTypeMaster_SelectAll } from './PackMasterService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RiEditBoxLine } from "react-icons/ri"
function PackMaster() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [kmLimitData, setKmLimitData] = React.useState([]);
    const [vehicleid, setVehicleid] = React.useState('');
    const [vehicleData, setVehicleData] = React.useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeVehicle = (event) => {
        setVehicleid(event.target.value);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const openmodale = () => {
        setIsOpen(true)
    }
    useEffect(() => {
        KMLimitMaster_SelectAll()
        GetVehicleTypeMaster_SelectAll()
    }, [])
    const KMLimitMaster_SelectAll = () => {
        getKMLimitMaster_SelectAll().then(response => {
            console.log(response)
            setKmLimitData(response)
        })
    }
    const GetVehicleTypeMaster_SelectAll = () => {
        getVehicleTypeMaster_SelectAll().then(response => {
            setVehicleData(response)
        })
    }
    return (
        <div className='citymasterContainer'>
            <button className='addbtn' onClick={openmodale}>Add+</button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Pack Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Pack Code" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField required id="outlined-basic" label="Enter Pack Name" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label">Pack Unit</InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vehicleid}
                                label="Select Pack Unit"
                                onChange={handleChangeVehicle}
                            >
                                {vehicleData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.nVId}>{item.vVehicleType}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '48%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Pack Product" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '48%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Pack Cases" variant="outlined" />
                        </FormControl>
                    </Box>
                    {/* <Box sx={{ width: '48%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vehicleid}
                                label="Select Status"
                                onChange={handleChangeVehicle}
                            >
                                {vehicleData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.nVId}>{item.vVehicleType}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box> */}  
                </div>
                <div className='displayflexend'>
                    <FormGroup >
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Active" disabled />
                    </FormGroup>
                    <button type="" className='submitbtn' onClick={openmodale}>Submit</button>
                </div>
            </Modal >
            <div className='tablecenter'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="row">SN.</TableCell>
                                    <TableCell align="left">Pack Code</TableCell>
                                    <TableCell align="left">Pack Name</TableCell>
                                    <TableCell align="left">Pack Unit</TableCell>
                                    <TableCell align="left">Pack Product</TableCell>
                                    <TableCell align="left">Pack Cases</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {kmLimitData.map((item, index) => {
                                    return (
                                        <TableRow >
                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                            <TableCell align="left">{item.CityStateDetailsPX}</TableCell>
                                            <TableCell align="left">{item.vVehicleType}</TableCell>
                                            <TableCell align="left">{item.nKMLimit}</TableCell>
                                            <TableCell align="left">{item.CityStateDetailsPX}</TableCell>
                                            <TableCell align="left">{item.vVehicleType}</TableCell>
                                            <TableCell align="left">{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                            <TableCell align="left"><div onClick={openmodale}><RiEditBoxLine /></div></TableCell>
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
                        count={kmLimitData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
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
export default PackMaster