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
import { UnitMastersPost, CategoryMaster_SelectAll, UnitMastersPut } from './VendorCategoryMasterApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from 'react-hook-form';

import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import { TbEdit } from "react-icons/tb";
import {apiUrlAddEdit} from '../../coreservices/environment'
function VendorCategoryMaster() {
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
    const [vCatPrefix, setvCatPrefix] = React.useState('');

    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);

    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const { register, handleSubmit, control, errors } = useForm();
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const submit = () => {

        setLoader(true)
        let data = {
            nCId: nUId == null ? 0 : nUId,
            vCategoryName: vUnitName,
            vCatPrefix: vCatPrefix,
            btActive: btActive
        }
        if (buttonName == 'Submit') {
            let unistData = [...unitData]
            console.log("unistData", unistData)
            let venderexistCode = unistData.find(e => e.vCatPrefix == vCatPrefix.toLowerCase() || e.vCatPrefix == vCatPrefix.toUpperCase())

            let unitName = unistData.find(e => e.vCategoryName == vUnitName.toLowerCase() || e.vCategoryName == vUnitName.toUpperCase())
            console.log("unitName", unitName)
            if (unitName || venderexistCode) {
                // if (venderexist && venderexistCode) {
                //     setLoader(false)
                //     toast.error("Product Category and Product Category Prefix is already Exists")
                // }
                if (unitName) {
                    setLoader(false)
                    toast.error("Vender Category is already Exists")
                }
                if (venderexistCode) {
                    setLoader(false)
                    toast.error("Vender Category Prefix is already Exists")
                }

            } else {
                UnitMastersPost(data).then(res => {
                    if (res) {
                        toast.success(res)
                        setLoader(false)
                        setIsOpen(false)
                        getCategoryMaster_SelectAll()
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
                    getCategoryMaster_SelectAll()
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
        getCategoryMaster_SelectAll()
    }
    useEffect(() => {
        getCategoryMaster_SelectAll()

        let storedArray = localStorage.getItem('linkAccess');
        const parsedArray = JSON.parse(storedArray);
        let currentURL = window.location.href;
        // let splitcurrentURL = currentURL.split('/')[4]
        let splitcurrentURL
        // if(apiUrlAddEdit=='http://localhost:3000'){
            splitcurrentURL = currentURL.split('/')[4] 
            console.log('parsedArray:', window.location.href);
        // }else{
        //     splitcurrentURL = currentURL.split('/')[2]
        // }
        let filterLinks = parsedArray.filter(e => e.vPageName == splitcurrentURL)
        console.log('filterLinks:', filterLinks[0].btEditRights);
        // setEnableActions(filterLinks)
       if(filterLinks){ setbtSaveRights(filterLinks[0].btSaveRights)
        setbtEditRights(filterLinks[0].btEditRights) }
    }, [])
    const getCategoryMaster_SelectAll = () => {
        setLoader2(true)
        CategoryMaster_SelectAll().then(response => {
            console.log('onlyActive', onlyActive)
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                // setUnitData(activeData)

                setUnitData(activeData)
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
        getCategoryMaster_SelectAll()
    };


    // useEffect(() => {
    //     CategoryMaster_SelectAllget()
    // })
    // const CategoryMaster_SelectAllget = () => {
    //     CategoryMaster_SelectAll().then(res => {
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
            setvCatPrefix('')
            setbtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnUId(item.nCId)
            setvUnitName2(item.vCategoryName)
            setvCatPrefix(item.vCatPrefix)
            setvUnitName(item.vCategoryName)
            setbtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)

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

                <ExportExcel excelData={unitData} Heading={Heading} fileName={'VendorCategoryMaster'} />
            </div>
            {/* <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add' ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Vendor Category</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <form >
                    <div className='displayflexend mt-4'>
                        <div className='inputBox-14 mt-4'>
                            <TextField
                                sx={muiStyles.input}
                                fullWidth
                                id="outlined-basic"
                                label="Enter Category Name"
                                variant="outlined"
                                value={vUnitName}
                                name='vUnitName'
                                onChange={e => setvUnitName(e.target.value)}
                                inputRef={register({ required: "Category Name is required.*", })}
                                error={Boolean(errors.vUnitName)}
                                helperText={errors.vUnitName?.message}
                            />
                        </div>
                        <div className='inputBox-14 mt-4'>
                            <TextField
                                sx={muiStyles.input}
                                fullWidth
                                id="outlined-basic"
                                label="Enter Prefix"
                                variant="outlined"
                                value={vCatPrefix}
                                name='vCatPrefix'
                                inputProps={{
                                    maxLength: 2, // Set the maximum length here (e.g., 20)
                                }}
                                onChange={e => setvCatPrefix(e.target.value)}
                                inputRef={register({ required: "Subcategory Prefix is required.*", })}
                                error={Boolean(errors.vCatPrefix)}
                                helperText={errors.vCatPrefix?.message}
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
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vCategoryName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vCatPrefix}</TableCell>

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

export default VendorCategoryMaster
