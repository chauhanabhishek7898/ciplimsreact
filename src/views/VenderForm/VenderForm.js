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
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import { getKMLimitMaster_SelectAll } from './VenderFormService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RiEditBoxLine } from "react-icons/ri"
function VenderForm() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsEditOpen, setIsEditOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [kmLimitData, setKmLimitData] = React.useState([]);
    const labelVenderCode = "Enter Vendor Code";
    // const [vehicleid, setVehicleid] = React.useState('');
    // const [vehicleData, setVehicleData] = React.useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // const handleChangeVehicle = (event) => {
    //     setVehicleid(event.target.value);
    // };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const openmodale = () => {
        setIsOpen(true)
    }

    const openEditmodale = (nLimitId) => {
        console.log("nLimitId", nLimitId)
        setIsEditOpen(true)
    }

    useEffect(() => {
        KMLimitMaster_SelectAll()
        // GetVehicleTypeMaster_SelectAll()
    }, [])
    const KMLimitMaster_SelectAll = () => {
        getKMLimitMaster_SelectAll().then(response => {
            console.log(response)
            setKmLimitData(response)
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
                    <div><span className='title'>Vender Form</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label={labelVenderCode} variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField required id="outlined-basic" label="Enter Vendor Name" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Vendor Address" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Contact Person" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Mobile No" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Email Id" variant="outlined" />
                        </FormControl>
                    </Box>
                </div>
                <div className='displaystart'>
                    <Box sx={{ width: '30%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter GST No" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '65%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Remarks" variant="outlined" />
                        </FormControl>
                    </Box>
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
                                    <TableCell align="left">Vendor Code</TableCell>
                                    <TableCell align="left">Vendor Name</TableCell>
                                    <TableCell align="left">Vendor Address</TableCell>
                                    <TableCell align="left">Contact Person</TableCell>
                                    <TableCell align="left">Mobile No</TableCell>
                                    <TableCell align="left">Email Id</TableCell>
                                    <TableCell align="left">GST No</TableCell>
                                    <TableCell align="left">Remarks</TableCell>
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
                                            <TableCell align="left">{item.nKMLimit}</TableCell>
                                            <TableCell align="left">{item.vVehicleType}</TableCell>
                                            <TableCell align="left">{item.nKMLimit}</TableCell>
                                            <TableCell align="left">{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                            <TableCell align="left"><div onClick={() => openEditmodale(item.nLimitId)}><RiEditBoxLine /></div></TableCell>
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
            <Modal
                isOpen={modalIsEditOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Edit</span></div>
                    <HighlightOffIcon fontSize='large'
                        onClick={() => setIsEditOpen(false)}
                    />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label={labelVenderCode} variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField required id="outlined-basic" label="Enter Vendor Name" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Vendor Address" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Contact Person" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Mobile No" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Email Id" variant="outlined" />
                        </FormControl>
                    </Box>
                </div>
                <div className='displaystart'>
                    <Box sx={{ width: '30%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter GST No" variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '65%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <TextField required id="outlined-basic" label="Enter Remarks" variant="outlined" />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend'>
                    <FormGroup >
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Active" />
                    </FormGroup>
                    <button type="" className='submitbtn' onClick={openEditmodale}>Submit</button>
                </div>
            </Modal >
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