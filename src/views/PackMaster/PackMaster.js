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
import { PackMaster_SelectAll, UnitMaster_SelectAll, PackMasterPost, PackMasterPut } from './PackMasterService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
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
import { CButton, CSpinner } from '@coreui/react'
import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/joy/CircularProgress';
function PackMaster() {

    let Heading = [['SN.', 'Pack Code', 'Pack Name', 'Pack Unit', 'Pack Product', 'Pack Cases', 'Status']];

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [packData, setPackData] = React.useState([]);
    const [unitid, setUnitid] = React.useState('');
    const [uniteData, setUnitData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);

    const [nPId, setnPId] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [packCode, setpackCode] = React.useState("");
    const [packName, setpackName] = React.useState("");
    const [unit, setunit] = React.useState("");
    const [packProduct, setpackProduct] = React.useState("");
    const [packCases, setpackCases] = React.useState("");

    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);

    const [error, setError] = React.useState('');

    const { register, handleSubmit, control, errors } = useForm();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangePackUnit = (event) => {
        setUnitid(event.target.value);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const openmodale = (item, type) => {
        if (type == 'Submit') {
            setIsOpen(true)
            setbuttonName(type)
            setBtActive(true)
            setnPId(item.nPId)
            setpackCode("")
            setpackName("")
            setUnitid('')
            setpackProduct("")
            setpackCases("")
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnPId(item.nPId)
            setpackCode(item.vPackCode)
            setpackName(item.vPackName)
            setBtActive(item.btActive)
            setUnitid(item.vUnit)
            setpackProduct(item.vPackProduct)
            setpackCases(item.vPackCases)
            setdisabled(false)
            setbuttonName(type)

        }
    }

    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getPackMaster_SelectAll()
    }
    useEffect(() => {
        getPackMaster_SelectAll()
    }, [])
    const getPackMaster_SelectAll = () => {
        setLoader2(true)
        PackMaster_SelectAll().then(response => {
            console.log('onlyActive', onlyActive)
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setPackData(activeData)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                setPackData(response)
                setMasterBrandData(response)
                setLoader2(false)

            }
        })
    }

    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = packData.filter((row) => {
                return row.vPackCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vPackName.toLowerCase().includes(searchedVal.toLowerCase()) || row.vUnit.toLowerCase().includes(searchedVal.toLowerCase()) || row.vPackProduct.toLowerCase().includes(searchedVal.toLowerCase()) || row.vPackCases.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setPackData(filteredRows);
        } else {
            setPackData(masterbrandData);
        }
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getPackMaster_SelectAll()
    };

    useEffect(() => {
        getUnitMaster_SelectAll()
    }, [])

    const getUnitMaster_SelectAll = () => {
        UnitMaster_SelectAll().then(response => {
            setUnitData(response)
        })
    }

    const validateform = () => {
        if (unitid == '') {
            setError('Select Unit')
            return false
        } else {
            setError('')
            return true
        }
    }

    const submit = () => {
        if (validateform() == true) {
            setLoader(true)
            let pack = {
                nPId: nPId == null ? 0 : nPId,
                vPackCode: packCode,
                vPackName: packName,
                vUnit: unitid,
                vPackProduct: packProduct,
                vPackCases: packCases,
                btActive: btActive,
            }
            console.log('pack', pack)
            if (buttonName == 'Submit') {
                PackMasterPost(pack).then(res => {
                    if (res) {
                        toast.success("Record Added Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getPackMaster_SelectAll()
                    }
                })

            } else {
                PackMasterPut(pack).then(res => {
                    if (res) {
                        toast.success("Record Updated Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getPackMaster_SelectAll()
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

            <div className='tablecenter'>
                <Paper sx={{ width: '100%' }}>

                    <div className='exportandfilter'>
                        <ExportExcel excelData={packData} Heading={Heading} fileName={'Pack_Master'} />
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
                                    {/* <TableCell scope="row">SN.</TableCell> */}
                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>Edit</TableCell>
                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>Status</TableCell>
                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>Pack Code</TableCell>
                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>Pack Name</TableCell>
                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>Unit</TableCell>
                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>Pack Product</TableCell>
                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>Pack Cases</TableCell>
                                </TableRow>
                            </TableHead>
                            {packData?.length>0?
                            <TableBody>
                                {packData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index) => {
                                    return (
                                        <TableRow >
                                            {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}><div onClick={() => openmodale(item, 'Update')}><BorderColorIcon size={20} color='#000' /></div></TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vPackCode}</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vPackName}</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vUnit}</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vPackProduct}</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vPackCases}</TableCell>

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
                        count={packData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Pack Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend mt-4'>
                    <Box sx={{ width: '32%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                            sx={muiStyles.input}
                                value={packCode}
                                onChange={e => setpackCode(e.target.value)}
                                id="outlined-basic"
                                required
                                label="Pack Code"
                                variant="outlined"
                                name='packCode'
                                inputRef={register({ required: "Pack Code is required.*", })}
                                error={Boolean(errors.packCode)}
                                helperText={errors.packCode?.message} />

                        </FormControl>
                    </Box>
                    <Box sx={{ width: '32%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={packName}
                                onChange={e => setpackName(e.target.value)}
                                id="outlined-basic"
                                required
                                label="Pack Name"
                                variant="outlined"
                                name='packName'
                                inputRef={register({ required: "Pack Name is required.*", })}
                                error={Boolean(errors.packName)}
                                helperText={errors.packName?.message} />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '32%', marginTop: 2 }}>
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={unitid}
                                onChange={e => setUnitid(e.target.value)}
                                id="outlined-basic"
                                required
                                label="Unit"
                                variant="outlined"
                                name='unitid'
                                inputRef={register({ required: "Unit is required.*", })}
                                error={Boolean(errors.unitid)}
                                helperText={errors.unitid?.message} />
                        </FormControl>
                        {/* <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label">Unit</InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={unitid}
                                label="Select Pack Unit"
                                onChange={handleChangePackUnit}
                                renderValue={(value) => `${value}`}
                            // name='unitid'
                            // inputRef={register({ required: "Pack Unit is required.*", })}
                            // error={Boolean(errors.unitid)}
                            // helperText={errors.unitid?.message}
                            >
                                {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {unitid != '' ? <p  className='error'>{error}</p> : null}
                        </FormControl> */}
                        {/* <div className='error'>{error} </div> */}
                    </Box>
                    <Box sx={{ width: '49%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                            sx={muiStyles.input}
                                value={packProduct}
                                onChange={e => setpackProduct(e.target.value)}
                                id="outlined-basic"
                                label="Pack Product"
                                variant="outlined"
                                name='packProduct'
                                inputRef={register({ required: "Pack Product is required.*", })}
                                error={Boolean(errors.packProduct)}
                                helperText={errors.packProduct?.message} />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '48.4%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                            sx={muiStyles.input}
                                value={packCases}
                                onChange={e => setpackCases(e.target.value)}
                                id="outlined-basic"
                                label="Pack Cases"
                                variant="outlined"
                                name='packCases'
                                inputRef={register({ required: "Pack Cases is required.*", })}
                                error={Boolean(errors.packCases)}
                                helperText={errors.packCases?.message} />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend-2'>
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
                padding: '5px 14px',
                fontSize: '13px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            top: '-13px',
            backgroundColor: '#fff',
            zIndex: '1'
        },
        "& label.Mui-focused": {
            zIndex: '1'

        },
    },
    autoCompleate: {
        "& .MuiOutlinedInput-root": {
            padding: '0px',
            "& .MuiAutocomplete-input": {
                padding: '5px 14px',
                fontSize: '13px'
            }

        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            backgroundColor: '#fff',
            top: '-13px',
          
        },
        "& label.Mui-focused": {
            zIndex: '1'
        },
    },
    input: {
        "& .MuiOutlinedInput-root": {
            "& input": {
                padding: '6px 14px',
                fontSize: '12px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            top: '-13px',  
            backgroundColor: '#fff',
        },
        "& label.Mui-focused": {
            zIndex: '1'
        },
    },
    select: {

        "& .MuiSelect-select": {
            padding: '3px 14px',
            fontSize: '12px'
        }, 
        

    },
    InputLabels: {
        fontSize: '13px',
        top: '-13px',
        backgroundColor: '#fff',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
   

};
export default PackMaster