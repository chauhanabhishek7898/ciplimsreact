import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { VarientMaster_SelectAll, VarientMasterPost, VarientMasterPut,VarientMaster_ActiveLikeSearch } from './VarientMasterApi'
import TextField from '@mui/material/TextField';
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
import {apiUrlAddEdit} from '../../coreservices/environment'

function VarientMaster() {
    let Heading = [['SN.', ' Brand Code', 'Brand Name', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [brandData, setBrandData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [nBid, setnBid] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [brandCode, setBrandCode] = React.useState("");
    const [brandName, setBrandName] = React.useState("");
    const [vPrefix, setvPrefix] = React.useState("");
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const { register, handleSubmit, control, errors } = useForm();
    const tableRef = useRef(null);
    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);

    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);

    useEffect(() => {
        getVarientMaster_SelectAll()

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

    const getVarientMaster_SelectAll = () => {
        setLoader2(true)
        VarientMaster_SelectAll().then(response => {
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setBrandData(activeData)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                let inactiveData = response.filter(e => e.btActive == false)
                setBrandData(inactiveData)
                setMasterBrandData(inactiveData)
                setLoader2(false)

            }
        })
    }

    const requestSearch = (searchedVal) => {

        if (searchedVal.length > 0) {
            const filteredRows = brandData.filter((row) => {
                return row.vVarient.toLowerCase().includes(searchedVal.toLowerCase())
                // || row.vVPrefix.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setBrandData(filteredRows);
        } else {
            setBrandData(masterbrandData);
        }

    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getVarientMaster_SelectAll()
    };

    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getVarientMaster_SelectAll()
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
            setvPrefix('')
            setBrandName('')
            setBtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnBid(item.nVRId)
            setvPrefix(item.vVPrefix)
            setBrandName(item.vVarient)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
        }
    }

    const [matchResult, setMatchResult] = useState(null);
    const [matchResult2, setMatchResult2] = useState(null);

    const handleBrandName = (event) => {
        setBrandName(event.target.value)
    };
    const handlevPrefix = (event) => {
        setvPrefix(event.target.value)
    };

    const handleCompare = () => {

        const brandDatas = [...brandData]

        const venderexist = brandDatas.find(e => e.vVarient.toLowerCase() == brandName.toLowerCase())

        const venderexistvVPrefix = brandDatas.find(e => e.vVPrefix.toLowerCase() == vPrefix.toLowerCase())

        let lowercaseString3 = ''
        let lowercaseString4 = ''
        if (venderexist != undefined) {
            lowercaseString3 = venderexist.vVarient.toLowerCase();
        }

        if (venderexistvVPrefix != undefined) {
            lowercaseString4 = venderexistvVPrefix.vVPrefix.toLowerCase();
        }

        const lowercaseString1 = brandName.toLowerCase();
        const lowercaseString2 = vPrefix.toLowerCase();

        const isMatch = lowercaseString1 === lowercaseString3;
        setMatchResult(isMatch);

        const isMatch2 = lowercaseString2 === lowercaseString4;
        setMatchResult2(isMatch2);

        if (isMatch == true || isMatch2 == true) {
            if (isMatch == true) {
                setLoader(false)
                toast.error("Variant is already Exists")
            }
            if (isMatch2 == true) {
                setLoader(false)
                toast.error("Variant Prefix is already Exists")
            }
        } else {

        }

    };

    const submit = () => {
        setLoader(true)
        const brandDatas = [...brandData]

        const venderexist = brandDatas.find(e => e.vVarient.toLowerCase() == brandName.toLowerCase())

        const venderexistvVPrefix = brandDatas.find(e => e.vVPrefix.toLowerCase() == vPrefix.toLowerCase())

        let lowercaseString3 = ''
        let lowercaseString4 = ''
        if (venderexist != undefined) {
            lowercaseString3 = venderexist.vVarient.toLowerCase();
        }

        if (venderexistvVPrefix != undefined) {
            lowercaseString4 = venderexistvVPrefix.vVPrefix.toLowerCase();
        }

        const lowercaseString1 = brandName.toLowerCase();
        const lowercaseString2 = vPrefix.toLowerCase();

        const isMatch = lowercaseString1 === lowercaseString3;
        setMatchResult(isMatch);

        const isMatch2 = lowercaseString2 === lowercaseString4;
        setMatchResult2(isMatch2);

        let brand = {
            nVRId: nBid == null ? 0 : nBid,
            vVPrefix: vPrefix,
            vVarient: brandName,
            btActive: btActive, lowercaseString2
        }
        if (buttonName == 'Submit') {
            if (isMatch == true) {
                if (isMatch == true) {
                    setLoader(false)
                    toast.error("Variant is already Exists")
                }
                // if (isMatch2 == true) {
                //     setLoader(false)
                //     toast.error("Variant Prefix is already Exists")
                // }
            } else {
                VarientMasterPost(brand).then(res => {
                    if (res) {
                        toast.success("Record Added Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getVarientMaster_SelectAll()
                    }
                })
            }
        } else {
            VarientMasterPut(brand).then(res => {
                if (res) {
                    toast.success("Record Updated Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    getVarientMaster_SelectAll()
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

                <ExportExcel excelData={brandData} Heading={Heading} fileName={'Varient_Master'} />

            </div>

            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Varient</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend mt-4'>
                    <Box className='inputBox-11' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={brandName}
                                onChange={handleBrandName}
                                required id="outlined-basic"
                                label="Varient Name"
                                variant="outlined"
                                name='brandName'
                                inputRef={register({ required: "Varient Name is required.*", })}
                                error={Boolean(errors.brandName)}
                                helperText={errors.brandName?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-11'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vPrefix}
                                onChange={handlevPrefix}
                                required id="outlined-basic"
                                label="Prefix"
                                variant="outlined"
                                name='vPrefix'
                                inputProps={{
                                    maxLength: 1, // Set the maximum length here (e.g., 20)
                                }}
                                inputRef={register({ required: "Varient Prefix is required.*", })}
                                error={Boolean(errors.vPrefix)}
                                helperText={errors.vPrefix?.message}

                            />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend-2'>
                    <FormGroup >
                        <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox defaultChecked={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
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
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    {/* <TableCell scope="row">SN.</TableCell> */}
                                    {/* <TableCell align="left" sx={muiStyles.tableHead} >vPrefix Code</TableCell> */}
                                    <TableCell align="left" sx={muiStyles.tableHead} >Varient Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Varient Prefix</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Status</TableCell>

                                    <TableCell align="left" sx={muiStyles.tableHead} >Edit</TableCell>

                                </TableRow>
                            </TableHead>
                            {brandData?.length > 0 ?
                                <TableBody>
                                    {brandData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}
                                                {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.vBrandCode}</TableCell> */}
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vVarient}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vVPrefix}</TableCell>
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
                                        <TableCell align="center" colSpan={5}>No Record</TableCell>
                                    </TableRow>
                                </TableBody>
                            }

                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={brandData.length}
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
export default VarientMaster


