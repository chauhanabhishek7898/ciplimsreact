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
import { UnitMastersPost, UnitMaster_SelectAll, UnitMastersPut, MaterialMaster_SelectAll_ActiveLikeSearch } from './VendorSubCategoryMasterApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import { TbEdit } from "react-icons/tb";
function VendorSubCategoryMaster() {
    let Heading = [['SN.', 'Unit Code', 'Status']];

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
    const [vSubCatPrefix, setvSubCatPrefix] = React.useState('');

    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const { register, handleSubmit, control, errors } = useForm();
    const [errorText, setError] = React.useState({
        MaterialDetail: '',
    });
    const [MaterialMaster, setMaterialMaster] = React.useState([]);
    const [MaterialDetail, setMaterialDetail] = React.useState('');
    const [nMId, setnMId] = React.useState('');
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const validateformPoDetial = () => {
        if (MaterialDetail == '' || MaterialDetail == undefined) {
            setError({
                MaterialDetail: 'Select Cetegory *'
            })
            return false
        }
        else {
            setError({
                MaterialDetail: ''
            })
            return true
        }

    }
    const submit = () => {
        if (validateformPoDetial() == true) {
            setLoader(true)
            let data = {
                nSCId: nUId == null ? 0 : nUId,
                nCId: nMId,
                vSubCategoryName: vUnitName,
                vSubCatPrefix: vSubCatPrefix,
                btActive: btActive
            }
            if (buttonName == 'Submit') {
                let unistData = [...unitData]
                console.log("unistData", unistData)
                let venderexistCode = unistData.find(e => e.vSubCatPrefix == vSubCatPrefix.toLowerCase() || e.vSubCatPrefix == vSubCatPrefix.toUpperCase())

                let unitName = unistData.find(e => e.vSubCategoryName == vUnitName.toLowerCase() || e.vSubCategoryName == vUnitName.toUpperCase())
                console.log("unitName", unitName)
                if (unitName) {
                    setLoader(false)
                    toast.success("Item is already Exists")
                }
                else {
                    if (venderexistCode) {
                        setLoader(false)
                        toast.success("Prefix is already Exists")
                    } else {
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

    }
    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getUnitMaster_SelectAll()
    }
    useEffect(() => {
        getUnitMaster_SelectAll()
    }, [])
    const getUnitMaster_SelectAll = () => {
        setLoader2(true)
        UnitMaster_SelectAll().then(response => {
            console.log('onlyActive', onlyActive)
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                // setUnitData(activeData)

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

        // console.log("searchedVal.length", searchedVal.length)
        // const filteredRows = lineData.filter((row) => {
        //     return row.vBrandCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vLineDescription.toLowerCase().includes(searchedVal.toLowerCase());
        // });
        // setlineData(m);
        // console.log("filteredRows", filteredRows)
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getUnitMaster_SelectAll()
    };


    // useEffect(() => {
    //     UnitMaster_SelectAllget()
    // })
    // const UnitMaster_SelectAllget = () => {
    //     UnitMaster_SelectAll().then(res => {
    //         if (res) {
    //             setUnitData(res)

    //         }
    //     })
    // }
    const openmodale = (item, type) => {
        if (type == 'Submit') {
            setIsOpen(true)
            setbuttonName(type)
            setvUnitName('')
            setvSubCatPrefix('')
            setbtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnUId(item.nSCId)
            setvUnitName2(item.vCategoryName)
            setvUnitName(item.vSubCategoryName)
            setvSubCatPrefix(item.vSubCatPrefix)
            setnMId(item.nCId)
            setMaterialDetail(item.vCategoryName)
            setbtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)

        }
    }
    const materialMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
        console.log('response', vGeneric)
        if (vGeneric != '') {
            vGeneric = vGeneric
        } else {
            vGeneric = null
        }
        MaterialMaster_SelectAll_ActiveLikeSearch(vGeneric).then(res => {


            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nCId,
                    label: res[i].vCategoryName,
                })
            }
            setMaterialMaster(data)
        })

    }
    const changeMaterialMasterValue = (value) => {
        console.log('value', value)
        setnMId(value == null ? '' : value.value)
        // setMaterialDetail(value.label)
        setError({
            MaterialDetail: ''
        })
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
                <ExportExcel excelData={unitData} Heading={Heading} fileName={'Unit_Master'} />
            </div>
            {/* <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add' ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Vendor Sub Category Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <form >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className='inputBox-12 mt-4'>
                            <TextField
                                sx={muiStyles.input}
                                fullWidth
                                id="outlined-basic"
                                label="Enter Sub Category Name"
                                variant="outlined"
                                value={vUnitName}
                                name='vUnitName'
                                onChange={e => setvUnitName(e.target.value)}
                                inputRef={register({ required: "Sub Category Name is required.*", })}
                                error={Boolean(errors.vUnitName)}
                                helperText={errors.vUnitName?.message}
                            />
                        </div>
                        <Box className='inputBox-12 mt-4'>
                            <FormControl fullWidth className='input'>
                                {/* <InputLabel required id="demo-simple-select-label">Item</InputLabel> */}
                                <Autocomplete
                                    sx={muiStyles.autoCompleate}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={MaterialMaster}
                                    value={MaterialDetail}
                                    // inputValue={MaterialDetail}
                                    onChange={(event, value) => changeMaterialMasterValue(value)}
                                    // onKeyDown={newInputValue => materialMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                                    onInputChange={(event, newInputValue) => {
                                        // setInputValue(newInputValue);
                                        if (newInputValue.length >= 3) {
                                            materialMaster_SelectAll_ActiveLikeSearch(newInputValue)

                                        }
                                        console.log('newInputValue', newInputValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Search Category" required />}
                                />
                                {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                            </FormControl>
                        </Box>

                        <div className='inputBox-12 mt-4'>
                            <TextField
                                sx={muiStyles.input}
                                fullWidth
                                id="outlined-basic"
                                label="Enter Prefix"
                                variant="outlined"
                                value={vSubCatPrefix}
                                name='vSubCatPrefix'
                                onChange={e => setvSubCatPrefix(e.target.value)}
                                inputRef={register({ required: "Sub Category Prefix is required.*", })}
                                error={Boolean(errors.vSubCatPrefix)}
                                helperText={errors.vSubCatPrefix?.message}
                            />
                        </div>

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
                                    <TableCell align="left" sx={muiStyles.tableHead}>Sub Category Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Category Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Prefix</TableCell>

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
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vSubCategoryName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vCategoryName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vSubCatPrefix}</TableCell>

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
        },'& .MuiFormHelperText-root': {
            position: 'absolute',
            fontSize: 10,
            bottom: -18
        },
       
        "& .MuiIconButton-root": {
            padding: '0'
        }
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

export default VendorSubCategoryMaster
