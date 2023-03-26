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
import { LineMaster_SelectAll, LineMasterPost, LineMasterPut } from './LineMasterService'
import { PlantMaster_SelectAll } from '../PlantMaster/PlantMasterService'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
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
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
function LineMaster() {

    let Heading = [['SN.', 'Line Code', 'Line Description', 'Plant Detail', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [lineData, setlineData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [nLId, setnLId] = React.useState(0);
    const [nPId, setnPId] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [lineName, setlineName] = React.useState("");
    const [lineDescription, setlineDescription] = React.useState("");
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const { register, handleSubmit, control, errors } = useForm();
    const [searched, setSearched] = React.useState("");
    const [error, setError] = React.useState('');
    const [onlyActive, setonlyActive] = React.useState(true);
    const [errorText, setErrorText] = React.useState({
        plantid: '',
    });
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getLineMaster_SelectAll()
    }
    useEffect(() => {
        getLineMaster_SelectAll()
    }, [])
    const getLineMaster_SelectAll = () => {
        setLoader2(true)
        LineMaster_SelectAll().then(response => {
            console.log('onlyActive', onlyActive)
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setlineData(activeData)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                setlineData(response)
                setMasterBrandData(response)
                setLoader2(false)

            }
        })
    }

    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = lineData.filter((row) => {
                return row.vLineName.toLowerCase().includes(searchedVal.toLowerCase()) || row.vLineDescription.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setlineData(filteredRows);
        } else {
            setlineData(masterbrandData);
        }
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getLineMaster_SelectAll()
    };

    const [plantData, setPlantData] = React.useState([]);
    const [plantid, setPlantid] = React.useState('');
    const handleChangePackUnit = (event) => {
        setPlantid(event.target.value);
        console.log("event.target.value", event.target.value)
        const currentplantData = plantData.find((pl) => pl.vPlantName === event.target.value)
        console.log('currentplantData', currentplantData)
        // console.log("plantData",plantData)
        setnPId(currentplantData.nPId);
    };
    useEffect(() => {
        getPlantMaster_SelectAll()
    }, [])

    const getPlantMaster_SelectAll = () => {
        PlantMaster_SelectAll().then(response => {
            setPlantData(response)
            console.log("PlantMaster_SelectAll_response", response)
        })
    }

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
            setnPId('')
            setPlantid('')
            setlineName('')
            setlineDescription('')
            setBtActive(true)
            setdisabled(true)
        } else {
            console.log('plantData', plantData)
            setIsOpen(true)
            setnLId(item.nLId)

            console.log("item", item)
            console.log("item.nPId", item.nPId)
            const currentplantData = plantData.find((pl) => pl.nPId === item.nPId)
            console.log('currentplantData', currentplantData)
            setnPId(currentplantData.nPId)
            setPlantid(currentplantData.vPlantName)
            setlineName(item.vLineName)
            setlineDescription(item.vLineDescription)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
        }
    }

    const validateform = () => {
        if (plantid == '') {
            setErrorText({plantid:'Select Plant Name'})
            return false
        } else {
            setErrorText('')
            return true
        }
    }

    const submit = () => {
        if (validateform() == true) {
            setLoader(true)
            let line = {
                nLId: nLId == null ? 0 : nLId,
                nPId: nPId,
                vLineName: lineName,
                vLineDescription: lineDescription,
                btActive: btActive,
            }
            if (buttonName == 'Submit') {
                console.log('line', line)
                LineMasterPost(line).then(res => {
                    if (res) {
                        console.log('res', res)
                        toast.success("Record Added Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getLineMaster_SelectAll()
                    }
                })

            } else {
                console.log('line', line)
                LineMasterPut(line).then(res => {
                    if (res) {
                        console.log('res', res)
                        toast.success("Record Updated Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getLineMaster_SelectAll()
                    }
                })
            }
        }
    }

    return (
        <div className='citymasterContainer'>
              {loader2==true?
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
                    <div><span className='title'>Line Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '49%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={lineName}
                                onChange={e => setlineName(e.target.value)}
                                required id="outlined-basic"
                                label="Line Name"
                                variant="outlined"
                                name='lineName'
                                inputRef={register({ required: "Line Name is required.*", })}
                                error={Boolean(errors.lineName)}
                                helperText={errors.lineName?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '49%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={lineDescription}
                                onChange={e => setlineDescription(e.target.value)}
                                 id="outlined-basic"
                                label="Line Description"
                                variant="outlined"
                                name='lineDescription'
                                // inputRef={register({ required: "Line Description is required.*", })}
                                // error={Boolean(errors.lineDescription)}
                                // helperText={errors.lineDescription?.message}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ width: '49%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label">Plant Name </InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={plantid}
                                label="Select Plant Name"
                                onChange={handleChangePackUnit}
                                name='plantid'
                                // inputRef={register({ required: "Plant Name is required.*", })}
                                // error={Boolean(errors.plantid)}
                                // helperText={errors.plantid?.message}
                            >
                                {plantData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.vPlantName}>{item.vPlantName}</MenuItem>
                                    )
                                })
                                }
                            </Select> 
                            {errorText.plantid != '' ? <p  className='error'>{errorText.plantid}</p> : null}
                        </FormControl>
                       
                    </Box>

                </div>
                <div className='displayflexend'>
                    <FormGroup >
                        <FormControlLabel control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
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

                    <div className='exportandfilter'>
                        <ExportExcel excelData={lineData} Heading={Heading} fileName={'Line_Master'} />
                        <Box sx={{ width: '65%' }} >
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
                                    <TableCell scope="row">SN.</TableCell>
                                    <TableCell align="left">Line Name</TableCell>
                                    <TableCell align="left">Line Description</TableCell>
                                    <TableCell align="left">Plant Detail</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            {lineData?.length?
                            <TableBody>
                                {lineData.map((item, index) => {
                                    return (
                                        <TableRow >
                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                            <TableCell align="left">{item.vLineName}</TableCell>
                                            <TableCell align="left">{item.vLineDescription}</TableCell>
                                            <TableCell align="left">{item.PlantDetail}</TableCell>
                                            <TableCell align="left">{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                            <TableCell align="left"><div onClick={() => openmodale(item, 'Update')}><BorderColorIcon size={20} color='#000' /></div></TableCell>
                                        </TableRow>
                                    )
                                })
                                }
                            </TableBody>

                                :
                                <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={6}>No Record</TableCell>
                                </TableRow>
                            </TableBody>
                                
                            }
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={lineData.length}
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
        width: '50%',
    },
};
export default LineMaster