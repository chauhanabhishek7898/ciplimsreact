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
import { PlantMaster_SelectAll, PlantMasterPost, PlantMasterPut } from './PlantMasterService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RiEditBoxLine } from "react-icons/ri"
import AddIcon from '@mui/icons-material/Add';
import { CButton, CSpinner } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
function PlantMaster() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [plantData, setPlantData] = React.useState([]);
    const [buttonName, setbuttonName] = React.useState('');
    const [vPlantCode, setvPlantCode] = React.useState('');
    const [vPlantName, setvPlantName] = React.useState('');
    const [vPlantAddress, setvPlantAddress] = React.useState('');
    const [vProfitCentre, setvProfitCentre] = React.useState('');
    const [vCostCentre, setvCostCentre] = React.useState('');
    const [nPId, setnPId] = React.useState(0);
    const [disabled, setdisabled] = React.useState(true);
    const { register, handleSubmit, control, errors } = useForm();
    const [loader, setLoader] = React.useState(false);
    const [btActive, setbtActive] = React.useState(true);
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
            setvPlantCode("")
            setvPlantName("")
            setvPlantAddress("")
            setvProfitCentre("")
            setvCostCentre("")
            setbtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnPId(item.nPId)
            setvPlantCode(item.vPlantCode)
            setvPlantName(item.vPlantName)
            setvPlantAddress(item.vPlantAddress)
            setvProfitCentre(item.vProfitCentre)
            setvCostCentre(item.vCostCentre)
            setbtActive(item.btActive)

            setdisabled(false)
            setbuttonName(type)

        }
    }
    const submit = () => {
        setLoader(true)
        let data = {
            nPId: nPId == null ? 0 : nPId,
            vPlantCode: vPlantCode,
            vPlantName: vPlantName,
            vPlantAddress: vPlantAddress,
            vProfitCentre: vProfitCentre,
            vCostCentre: vCostCentre,
            btActive: btActive
        }
        if (buttonName == 'Submit') {
            PlantMasterPost(data).then(res => {
                if (res) {
                    toast.success(res)
                    setLoader(false)
                    setIsOpen(false)
                    plantMaster_SelectAll()
                }
            })

        } else {
            PlantMasterPut(data).then(res => {
                if (res) {
                    toast.success(res)
                    setLoader(false)
                    setIsOpen(false)
                    plantMaster_SelectAll()
                }
            })
        }
    }
    useEffect(() => {
        plantMaster_SelectAll()
    }, [])
    const plantMaster_SelectAll = () => {
        PlantMaster_SelectAll().then(response => {
            console.log(response)
            setPlantData(response)
        })
    }
    return (
        <div className='citymasterContainer'>
            <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add' ><AddIcon fontSize='large' /></button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Plant Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                id="outlined-basic"
                                label="Enter Plant Code"
                                variant="outlined"
                                value={vPlantCode}
                                name='vPlantCode'
                                onChange={e => setvPlantCode(e.target.value)}
                                inputRef={register({ required: "Plant Code is required.*", })}
                                error={Boolean(errors.vPlantCode)}
                                helperText={errors.vPlantCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                id="outlined-basic"
                                label="Enter Plant Name"
                                variant="outlined"
                                value={vPlantName}
                                name='vPlantName'
                                onChange={e => setvPlantName(e.target.value)}
                                inputRef={register({ required: "Plant Name is required.*", })}
                                error={Boolean(errors.vPlantName)}
                                helperText={errors.vPlantName?.message}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ width: '17%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                id="outlined-basic"
                                label="Profit Centre"
                                variant="outlined"
                                value={vProfitCentre}
                                name='vProfitCentre'
                                onChange={e => setvProfitCentre(e.target.value)}
                                inputRef={register({ required: "Profit Centre is required.*", })}
                                error={Boolean(errors.vProfitCentre)}
                                helperText={errors.vProfitCentre?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '17%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                id="outlined-basic"
                                label="Cost Centre"
                                variant="outlined"
                                value={vCostCentre}
                                name='vCostCentre'
                                onChange={e => setvCostCentre(e.target.value)}
                                inputRef={register({ required: "Cost Centre is required.*", })}
                                error={Boolean(errors.vCostCentre)}
                                helperText={errors.vCostCentre?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '100%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                id="outlined-basic"
                                label="Plant Address"
                                variant="outlined"
                                value={vPlantAddress}
                                name='vPlantAddress'
                                onChange={e => setvPlantAddress(e.target.value)}
                                inputRef={register({ required: "Plant Address is required.*", })}
                                error={Boolean(errors.vPlantAddress)}
                                helperText={errors.vPlantAddress?.message}
                            />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend'>
                    <FormGroup >
                        <FormControlLabel control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setbtActive(e.target.checked)} />} label="Active" disabled={disabled} />
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
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="row">SN.</TableCell>
                                    <TableCell align="left">Plant Code</TableCell>
                                    <TableCell align="left">Plant Name</TableCell>
                                    <TableCell align="left">Plant Address</TableCell>
                                    <TableCell align="left">Profit Centre</TableCell>
                                    <TableCell align="left">Cost Centre</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {plantData.map((item, index) => {
                                    return (
                                        <TableRow >
                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                            <TableCell align="left">{item.vPlantCode}</TableCell>
                                            <TableCell align="left">{item.vPlantName}</TableCell>
                                            <TableCell align="left">{item.vPlantAddress}</TableCell>
                                            <TableCell align="left">{item.vProfitCentre}</TableCell>
                                            <TableCell align="left">{item.vCostCentre}</TableCell>
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
                        count={plantData.length}
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
        width: '80%',
    },
};
export default PlantMaster