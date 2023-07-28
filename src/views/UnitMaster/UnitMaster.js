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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { CButton, CSpinner } from '@coreui/react'
import { UnitMastersPost, UnitMaster_SelectAll, UnitMastersPut } from './UnitMasterApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from 'react-hook-form';

import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import { TbEdit } from "react-icons/tb";
import { apiUrlAddEdit } from '../../coreservices/environment'

function UnitMaster() {
    let Heading = [['SN.', 'UOM Code', 'Status']];
    const formValidation = new SimpleReactValidator()
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [unitData, setUnitData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [btActive, setbtActive] = React.useState(true);
    const [nUId, setnUId] = React.useState(0);
    const [vUnitName, setvUnitName] = React.useState('');
    const [vUnitName2, setvUnitName2] = React.useState('');

    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);

    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);

    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);

    const { register, handleSubmit, control, errors } = useForm();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getUnitMaster_SelectAll()
    }
    useEffect(() => {
        getUnitMaster_SelectAll()

        let storedArray = localStorage.getItem('linkAccess');
        const parsedArray = JSON.parse(storedArray);
        let currentURL = window.location.href;
        // let splitcurrentURL = currentURL.split('/')[4]
        let splitcurrentURL
        if (apiUrlAddEdit == 'http://localhost:3000') {
            splitcurrentURL = currentURL.split('/')[4]
        } else {
            splitcurrentURL = currentURL.split('/')[2]
        }
        let filterLinks = parsedArray.filter(e => e.vPageName == splitcurrentURL)
        console.log('filterLinks:', filterLinks[0].btEditRights);
        // setEnableActions(filterLinks)
        if (filterLinks) {
            setbtSaveRights(filterLinks[0].btSaveRights)
            setbtEditRights(filterLinks[0].btEditRights)
        }

    }, [])
    const getUnitMaster_SelectAll = () => {
        setLoader2(true)
        UnitMaster_SelectAll().then(response => {
            console.log('onlyActive', onlyActive)
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setUnitData(response)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                let inactiveData = response.filter(e => e.btActive == false)
                setUnitData(inactiveData)
                setMasterBrandData(inactiveData)
                setLoader2(false)

            }
        })
    }


    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = unitData.filter((row) => {
                return row.vUnitName.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setUnitData(filteredRows);
        } else {
            setUnitData(masterbrandData);
        }

    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getUnitMaster_SelectAll()
    };

    const openmodale = (item, type) => {
        if (type == 'Submit') {
            setIsOpen(true)
            setbuttonName(type)
            setvUnitName('')
            setbtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnUId(item.nUId)
            setvUnitName2(item.vUnitName)
            setvUnitName(item.vUnitName)
            setbtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)

        }
    }

    const submit = () => {

        setLoader(true)
        let data = {
            nUId: nUId == null ? 0 : nUId,
            vUnitName: vUnitName,
            btActive: btActive
        }
        if (buttonName == 'Submit') {
            let unistData = [...unitData]
            console.log("unistData", unistData)
            let unitName = unistData.find(e => e.vUnitName == vUnitName.toLowerCase() || e.vUnitName == vUnitName.toUpperCase())
            console.log("unitName", unitName)
            if (unitName) {
                setLoader(false)
                toast.success("Item is already Exists")
            }
            else {
                UnitMastersPost(data).then(res => {
                    if (res) {
                        toast.success(res)
                        setLoader(false)
                        setIsOpen(false)
                        getUnitMaster_SelectAll()
                    }
                })
            }

        }

        else {

            UnitMastersPut(data).then(res => {
                if (res) {
                    toast.success(res)
                    setLoader(false)
                    setIsOpen(false)
                    getUnitMaster_SelectAll()
                }
            })
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
                {/* <button className='submitbtn_exp' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
                <button className={btSaveRights == false ? 'submitbtn_exp notAllow' : 'submitbtn_exp'} onClick={() => openmodale(null, 'Submit')} title='Add' disabled={btSaveRights == false} ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button>

                <ExportExcel excelData={unitData} Heading={Heading} fileName={'UOM'} />
            </div>
            {/* <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add' ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>UOM</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <form >
                    <div className='displayflexend mt-4'>
                        <TextField
                            sx={muiStyles.input}
                            fullWidth
                            id="outlined-basic"
                            label="Enter UOM"
                            variant="outlined"
                            value={vUnitName}
                            name='vUnitName'
                            onChange={e => setvUnitName(e.target.value)}
                            inputRef={register({ required: "UOM is required.*", })}
                            error={Boolean(errors.vUnitName)}
                            helperText={errors.vUnitName?.message}
                        />
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

                </form>
            </Modal >
            <div className='tablecenter'>

                <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1, }}>
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
                                    <TableCell align="left" sx={muiStyles.tableHead}>UOM</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Status</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Edit</TableCell>

                                </TableRow>
                            </TableHead>
                            {unitData?.length > 0 ?
                                <TableBody>
                                    {unitData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vUnitName}</TableCell>
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
                                        <TableCell align="center" colSpan={4}>No Record</TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={unitData.length}
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
        }, '& .MuiFormHelperText-root': {
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
        }, '& .MuiFormHelperText-root': {
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

export default UnitMaster
