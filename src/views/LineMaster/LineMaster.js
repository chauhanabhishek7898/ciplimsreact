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
import { TbEdit } from "react-icons/tb";
function LineMaster() {

    let Heading = [['SN.', 'Line Code', 'Line Description', 'Plant Detail', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
                let inactiveData = response.filter(e => e.btActive == false)
                setlineData(inactiveData)
                setMasterBrandData(inactiveData)
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
            setErrorText({ plantid: 'Select Plant Name' })
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

                let lineDatas = [...lineData]
                console.log("lineDatas", lineDatas)
                let venderexist = lineDatas.find(e => e.vLineName == lineName.toLowerCase() || e.vLineName == lineName.toUpperCase())
                if (venderexist) {
                    setLoader(false)
                    toast.success("Item is already Exists")
                }
                else {

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
                }

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
            {loader2 == true ?
                <div className='progressBox'>
                    <div className='progressInner'>
                        <CircularProgress />
                    </div>
                </div>
                :
                null

            }
            <div className='add_export'>
                <button className='submitbtn_exp' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button>
                <ExportExcel excelData={lineData} Heading={Heading} fileName={'Line_Master'} />

            </div>
            {/* <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /><span className='addFont'>Add</span></button> */}
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
                <div className='displayflexend mt-4' >
                    <Box className='inputBox-14' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
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
                    <Box className='inputBox-14' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
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

                    <Box className='inputBox-14'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Plant Name </InputLabel>
                            <Select
                                sx={muiStyles.select}
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
                            {errorText.plantid != '' ? <p className='error'>{errorText.plantid}</p> : null}
                        </FormControl>

                    </Box>

                </div>
                <div className='displayflexend-2'>
                    <FormGroup >
                        <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
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
                <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>

                    <div className='exportandfilter'>


                        <div className='filterbox'>
                            <Box className='searchbox' >
                                <SearchBar
                                    value={searched}
                                    onChange={(searchVal) => requestSearch(searchVal)}
                                    onCancelSearch={() => cancelSearch()}
                                />

                            </Box>
                            <FormGroup className='activeonly'>
                                <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox checked={onlyActive} value={onlyActive} onChange={checkedonlyActive} />} label="Active Data" />
                            </FormGroup>

                        </div>
                    </div>

                    <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell scope="row">SN.</TableCell> */}

                                    <TableCell align="left" sx={muiStyles.tableHead}>Line Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Line Description</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Plant Detail</TableCell>

                                    <TableCell align="left" sx={muiStyles.tableHead}>Status</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Edit</TableCell>

                                </TableRow>
                            </TableHead>
                            {lineData?.length ?
                                <TableBody>
                                    {lineData.map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}

                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vLineName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vLineDescription}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.PlantDetail}</TableCell>

                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}><div onClick={() => openmodale(item, 'Update')} className='editbtn'><TbEdit size={20} color='#000' /></div></TableCell>

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
            left: '-10px',
            backgroundColor: 'transparent',
            zIndex: '1'
        },
        "& label.Mui-focused": {
            zIndex: '1'

        },
        '& .MuiInputAdornment-root': {
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
            left: '-10px',

        },
         "& label.Mui-focused": {
            zIndex: '1'
        },'& .MuiFormHelperText-root': {
            position: 'absolute',
            fontSize: 10,
            bottom: -18
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
            left: '-10px',
            backgroundColor: 'transparent',
        },
         "& label.Mui-focused": {
            zIndex: '1'
        },'& .MuiFormHelperText-root': {
            position: 'absolute',
            fontSize: 10,
            bottom: -18
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
        left: '-10px',
        backgroundColor: 'transparent',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
    tableBox: {
        "&.MuiTableContainer-root": {
            width: '100%',
            maxHeight: '440px',
            padding: '0px 16px',
        },
    },
    tableHead: {
        "&.MuiTableCell-root": {
            padding: '8px',
            fontWeight: 'bold',
        }
    },
    tableBody: {
        "&.MuiTableCell-root": {
            padding: '8px',
            fontSize: '14px',
            lineHeight: '39px'
        }
    },
    checkboxLabel: {
        "&.MuiFormControlLabel-root": {
            "&.MuiTypography-root": {
                fontSize: '14px'
            }
        }
    },


};
export default LineMaster