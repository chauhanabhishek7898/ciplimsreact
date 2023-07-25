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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';
import { CButton, CSpinner } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import { TbEdit } from "react-icons/tb";
function PlantMaster() {
    {/* <TableCell scope="row">SN.</TableCell>
                                    <TableCell align="left" >Plant Code</TableCell>
                                    <TableCell align="left" >Plant Name</TableCell>
                                    <TableCell align="left" >Plant Address</TableCell>
                                    <TableCell align="left" >Profit Centre</TableCell>
                                    <TableCell align="left" >Cost Centre</TableCell>
                                    <TableCell align="left" >Status</TableCell> */}

    let Heading = [['SN.', 'Plant Code', 'Plant Name', 'Plant Address', 'Profit Centre', 'Cost Centre', 'Status']];

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [plantData, setPlantData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
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
    const [loader2, setLoader2] = React.useState(false);
    const [btActive, setbtActive] = React.useState(true);

    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);

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

            let plantDatas = [...plantData]
            console.log("plantDatas", plantDatas)
            let venderexist = plantDatas.find(e => e.vPlantName == vPlantName.toLowerCase() || e.vPlantName == vPlantName.toUpperCase())

            let venderexistCode = plantDatas.find(e => e.vPlantCode == vPlantCode.toLowerCase() || e.vPlantCode == vPlantCode.toUpperCase())
            if (venderexist) {
                setLoader(false)
                toast.success("Item is already Exists")
            }
            else if (venderexistCode) {
                setLoader(false)
                toast.success("Code is already Exists")

            }
            else {
                PlantMasterPost(data).then(res => {
                    if (res) {
                        toast.success(res)
                        setLoader(false)
                        setIsOpen(false)
                        getPlantMaster_SelectAll()()
                    }
                })
            }
        } else {
            PlantMasterPut(data).then(res => {
                if (res) {
                    toast.success(res)
                    setLoader(false)
                    setIsOpen(false)
                    getPlantMaster_SelectAll()()
                }
            })
        }
    }
    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getPlantMaster_SelectAll()
    }
    useEffect(() => {
        getPlantMaster_SelectAll()

        let storedArray = localStorage.getItem('linkAccess');
        const parsedArray = JSON.parse(storedArray);
        let currentURL = window.location.href;
        // let splitcurrentURL = currentURL.split('/')[4]
    //     let splitcurrentURL = currentURL.split('/')[2]
     
    //     let filterLinks = parsedArray.filter(e => e.vPageName == splitcurrentURL)

    //     // setEnableActions(filterLinks)
    //    if(filterLinks){ setbtSaveRights(filterLinks[0].btSaveRights)
    //     setbtEditRights(filterLinks[0].btEditRights) }

    }, [])
    const getPlantMaster_SelectAll = () => {
        setLoader2(true)
        PlantMaster_SelectAll().then(response => {
            console.log('onlyActive', onlyActive)
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setPlantData(activeData)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                let inactiveData = response.filter(e => e.btActive == false)
                setPlantData(inactiveData)
                setMasterBrandData(inactiveData)
                setLoader2(false)

            }
        })
    }


    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = plantData.filter((row) => {
                return row.vPlantName.toLowerCase().includes(searchedVal.toLowerCase()) || row.vPlantAddress.toLowerCase().includes(searchedVal.toLowerCase()) || row.vProfitCentre.toLowerCase().includes(searchedVal.toLowerCase()) || row.vCostCentre.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setPlantData(filteredRows);
        } else {
            setPlantData(masterbrandData);
        }


    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getPlantMaster_SelectAll()
    };

    // useEffect(() => {
    //     plantMaster_SelectAll()
    // }, [])
    // const plantMaster_SelectAll = () => {
    //     PlantMaster_SelectAll().then(response => {
    //         console.log(response)
    //         setPlantData(response)
    //     })
    // }
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
                {/* <button className='submitbtn_exp' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
                <button className={btSaveRights == false?'submitbtn_exp notAllow':'submitbtn_exp'} onClick={() => openmodale(null, 'Submit')} title='Add' disabled={btSaveRights == false}><AddIcon fontSize='small' /><span className='addFont'>Add</span></button>

                <ExportExcel excelData={plantData} Heading={Heading} fileName={'Brand_Master'} />

            </div>

            {/* <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add' ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Plant Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend mt-4'>
                    <Box className='inputBox-12' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                id="outlined-basic"
                                label="Enter Plant Code"
                                required
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
                    <Box className='inputBox-12' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                id="outlined-basic"
                                label="Enter Plant Name"
                                variant="outlined"
                                required
                                value={vPlantName}
                                name='vPlantName'
                                onChange={e => setvPlantName(e.target.value)}
                                inputRef={register({ required: "Plant Name is required.*", })}
                                error={Boolean(errors.vPlantName)}
                                helperText={errors.vPlantName?.message}
                            />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-13' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                id="outlined-basic"
                                label="Profit Centre"
                                variant="outlined"
                                value={vProfitCentre}
                                name='vProfitCentre'
                                onChange={e => setvProfitCentre(e.target.value)}
                            // inputRef={register({ required: "Profit Centre is required.*", })}
                            // error={Boolean(errors.vProfitCentre)}
                            // helperText={errors.vProfitCentre?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-13' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                id="outlined-basic"
                                label="Cost Centre"
                                variant="outlined"
                                value={vCostCentre}
                                name='vCostCentre'
                                onChange={e => setvCostCentre(e.target.value)}
                            // inputRef={register({ required: "Cost Centre is required.*", })}
                            // error={Boolean(errors.vCostCentre)}
                            // helperText={errors.vCostCentre?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '100%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                id="outlined-basic"
                                label="Plant Address"
                                variant="outlined"
                                value={vPlantAddress}
                                name='vPlantAddress'
                                onChange={e => setvPlantAddress(e.target.value)}
                            // inputRef={register({ required: "Plant Address is required.*", })}
                            // error={Boolean(errors.vPlantAddress)}
                            // helperText={errors.vPlantAddress?.message}
                            />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend-2'>
                    <FormGroup >
                        <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setbtActive(e.target.checked)} />} label="Active" disabled={disabled} />
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
                        {/* <ExportExcel excelData={plantData} Heading={Heading} fileName={'Plant_Master'} /> */}
                        <div className='filterbox'>
                            <Box className='searchbox'>
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

                                    <TableCell align="left" sx={muiStyles.tableHead}>Plant Code</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Plant Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Plant Address</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Profit Centre</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Cost Centre</TableCell>

                                    <TableCell align="left" sx={muiStyles.tableHead}>Status</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Edit</TableCell>

                                </TableRow>
                            </TableHead>
                            {plantData?.length > 0 ?
                                <TableBody>
                                    {plantData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}

                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vPlantCode}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vPlantName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vPlantAddress}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vProfitCentre}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vCostCentre}</TableCell>

                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                                {/* <TableCell align="left" sx={muiStyles.tableBody}><div onClick={() => openmodale(item, 'Update')} className='editbtn'><TbEdit size={20} color='#000' /></div></TableCell> */}
                                                <TableCell align="left" sx={muiStyles.tableBody}><button onClick={() => openmodale(item, 'Update')} disabled={btEditRights == false} className={btEditRights == false ? 'editbtn notAllow' : 'editbtn'}><TbEdit size={20} color='#000' /></button></TableCell>

                                            </TableRow>
                                        )
                                    })

                                    }
                                </TableBody>
                                :
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={8}>No Record</TableCell>
                                    </TableRow>
                                </TableBody>
                            }
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
            fontWeight: 'bold'
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
export default PlantMaster