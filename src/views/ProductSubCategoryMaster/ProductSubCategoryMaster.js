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
import { ProductSubCategoryMaster_SelectAll, ProductSubCategoryMasterPost, ProductSubCategoryMasterPut } from './ProductSubCategoryMasterapi'
import { ProductCategoryMaster_ActiveLikeSearch } from '../ProductCategoryMaster/ProductCategoryMasterapi.js'
import Autocomplete from '@mui/material/Autocomplete';
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
import { apiUrlAddEdit } from '../../coreservices/environment'
import { InputLabel, MenuItem, Select } from '@mui/material';
function ProductSubCategoryMaster() {
    let Heading = [['SN.', 'Brand Subcategory', 'Brand Subcategory Prefix', 'Status']];
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
    const [nPDCId, setnPDCId] = React.useState(0);
    const [vPrefix, setvPrefix] = React.useState("");
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const tableRef = useRef(null);
    const [searched, setSearched] = React.useState("");

    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);

    const [onlyActive, setonlyActive] = React.useState(true);
    const { register, handleSubmit, control, errors } = useForm();
    const [errorText, setError] = React.useState({
        MaterialDetail: '',
    });
    const [MaterialMaster, setMaterialMaster] = React.useState([]);
    const [MaterialDetail, setMaterialDetail] = React.useState('');
    const [nMId, setnMId] = React.useState('');
    const validateformPoDetial = () => {
        if (MaterialDetail == '' || MaterialDetail == undefined) {
            setError({
                MaterialDetail: 'Select Brand Cetegory *'
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
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getProductSubCategoryMaster_SelectAll()
    }
    useEffect(() => {
        getProductSubCategoryMaster_SelectAll()

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
        if (filterLinks) {
            setbtSaveRights(filterLinks[0].btSaveRights)
            setbtEditRights(filterLinks[0].btEditRights)
        }

    }, [])
    const getProductSubCategoryMaster_SelectAll = () => {
        setLoader2(true)
        ProductSubCategoryMaster_SelectAll().then(response => {
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
                return row.vPDSubCategoryName.toLowerCase().includes(searchedVal.toLowerCase())
                // || row.vPDSubCatPrefix.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setBrandData(filteredRows);
        } else {
            setBrandData(masterbrandData);
        }
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getProductSubCategoryMaster_SelectAll()
    };
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
            // setBrandCode('')
            setvPrefix('')
            setBrandName('')
            setBtActive(true)
            setdisabled(true)
            setLoader(false)
        } else {
            setIsOpen(true)
            setnBid(item.nPDSCId)
            setnPDCId(item.nPDCId)
            setvPrefix(item.vPDSubCatPrefix)
            setBrandName(item.vPDSubCategoryName)
            setMaterialDetail(item.vPDCategoryName)
            setnMId(item.nPDCId)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
            setLoader(false)
        }
    }

    const [matchResult, setMatchResult] = useState(null);
    const [matchResult2, setMatchResult2] = useState(null);

    const handleBrandName = (event) => {
        console.log("event", event)
        setBrandName(event.target.value)
    };
    const handlevPrefix = (event) => {
        console.log("event", event)
        setvPrefix(event.target.value)
    };

    const handleCompare = () => {

        const brandDatas = [...brandData]
        console.log("brandDatas", brandDatas)

        const venderexist = brandDatas.find(e => e.vPDSubCategoryName.toLowerCase() == brandName.toLowerCase())
        console.log("venderexist", venderexist)
        // console.log("venderexist.vPDSubCatPrefix", venderexist.vPDSubCatPrefix)

        const venderexistvVPrefix = brandDatas.find(e => e.vPDSubCatPrefix.toLowerCase() == vPrefix.toLowerCase())
        console.log("venderexistvVPrefix", venderexistvVPrefix)
        // console.log("venderexistvVPrefix.vPDSubCatPrefix", venderexistvVPrefix.vPDSubCatPrefix)

        let lowercaseString3 = ''
        let lowercaseString4 = ''
        if (venderexist != undefined) {
            lowercaseString3 = venderexist.vPDSubCategoryName.toLowerCase();
            console.log("lowercaseString3", lowercaseString3)
        }

        if (venderexistvVPrefix != undefined) {
            lowercaseString4 = venderexistvVPrefix.vPDSubCatPrefix.toLowerCase();
            console.log("lowercaseString4", lowercaseString4)
        }

        const lowercaseString1 = brandName.toLowerCase();
        const lowercaseString2 = vPrefix.toLowerCase();

        console.log("lowercaseString1", lowercaseString1)
        console.log("lowercaseString2", lowercaseString2)

        const isMatch = lowercaseString1 === lowercaseString3;
        setMatchResult(isMatch);
        console.log("isMatch", isMatch)

        const isMatch2 = lowercaseString2 === lowercaseString4;
        setMatchResult2(isMatch2);


        if (isMatch == true || isMatch2 == true) {
            if (isMatch == true) {
                setLoader(false)
                toast.error("Brand Subcategory is already Exists")
            }
            if (isMatch2 == true) {
                setLoader(false)
                toast.error("Brand Subcategory Prefix is already Exists")
            }
        } else {
            console.log('brand', brand)
            ProductSubCategoryMasterPost(brand).then(res => {
                if (res) {
                    toast.success("Record Added Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    getProductSubCategoryMaster_SelectAll()
                }
            })
        }

    };

    const submit = () => {
        if (validateformPoDetial() == true) {
            const brandDatas = [...brandData]

            const venderexist = brandDatas.find(e => e.vPDSubCategoryName.toLowerCase() == brandName.toLowerCase())

            const venderexistvVPrefix = brandDatas.find(e => e.vPDSubCatPrefix.toLowerCase() == vPrefix.toLowerCase())

            let lowercaseString3 = ''
            let lowercaseString4 = ''
            if (venderexist != undefined) {
                lowercaseString3 = venderexist.vPDSubCategoryName.toLowerCase();
            }

            if (venderexistvVPrefix != undefined) {
                lowercaseString4 = venderexistvVPrefix.vPDSubCatPrefix.toLowerCase();
            }

            const lowercaseString1 = brandName.toLowerCase();
            const lowercaseString2 = vPrefix.toLowerCase();

            const isMatch = lowercaseString1 === lowercaseString3;
            setMatchResult(isMatch);

            const isMatch2 = lowercaseString2 === lowercaseString4;
            setMatchResult2(isMatch2);

            setLoader(true)
            let brand = {
                nPDSCId: nBid == null ? 0 : nBid,
                vPDSubCatPrefix: vPrefix,
                vPDSubCategoryName: brandName,
                nPDCId: nMId,
                btActive: btActive,
            }
            if (buttonName == 'Submit') {
                if (isMatch == true || isMatch2 == true) {
                    if (isMatch == true) {
                        setLoader(false)
                        toast.error("Brand Subcategory is already Exists")
                    }
                    if (isMatch2 == true) {
                        setLoader(false)
                        toast.error("Brand Subcategory Prefix is already Exists")
                    }
                } else {
                    ProductSubCategoryMasterPost(brand).then(res => {
                        if (res) {
                            toast.success("Record Added Successfully !!")
                            setLoader(false)
                            setIsOpen(false)
                            getProductSubCategoryMaster_SelectAll()
                        }
                    })
                }

            } else {
                console.log('brand', brand)
                ProductSubCategoryMasterPut(brand).then(res => {
                    if (res) {
                        console.log('res', res)
                        toast.success("Record Updated Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getProductSubCategoryMaster_SelectAll()
                    }
                })
            }
        }
    }


    const [vCategoryData, setvCategoryData] = React.useState([]);
    const [vCategory, setvCategory] = React.useState("");
    const [vCategoryId, setvCategoryId] = React.useState("");

    const [SubCategoryDataForSelection, setSubCategoryDataForSelection] = React.useState([]);

    useEffect(() => {
        getCategoryMaster_SelectAll()
    }, [])

    const getCategoryMaster_SelectAll = () => {
        ProductCategoryMaster_ActiveLikeSearch(null).then(response => {
            setMaterialMaster(response)
        })
    }


    const handleChangeCategory = (event) => {
        const selectedId = event.target.value;
        setMaterialDetail(selectedId)
        setError({
            MaterialDetail: ''
        })
       
    };

    const handleBlurC = (item) => {
        console.log("itemitemitem", item)
        setMaterialDetail(item.vPDCategoryName)
        setnMId(item.nPDCId)
    };
    // useEffect(() => {
    //     productCategoryMaster_ActiveLikeSearch(null)
    // }, [])

    // const productCategoryMaster_ActiveLikeSearch = (vGeneric) => {
    //     console.log('response', vGeneric)
    //     if (vGeneric != '') {
    //         vGeneric = vGeneric
    //     } else {
    //         vGeneric = null
    //     }
    //     ProductCategoryMaster_ActiveLikeSearch(vGeneric).then(res => {


    //         let count = Object.keys(res).length
    //         let data = []
    //         for (var i = 0; i < count; i++) {
    //             data.push({
    //                 value: res[i].nPDCId,
    //                 label: res[i].vPDCategoryName,
    //             })
    //         }
    //         setMaterialMaster(data)
    //     })

    // }

    const changeMaterialMasterValue = (value) => {
        console.log('value', value)
        setnMId(value == null ? '' : value.value)
        setMaterialDetail(value.label)
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
                {/* <button className='submitbtn_exp' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
                <button className={btSaveRights == false ? 'submitbtn_exp notAllow' : 'submitbtn_exp'} onClick={() => openmodale(null, 'Submit')} title='Add' disabled={btSaveRights == false} ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button>

                <ExportExcel excelData={brandData} Heading={Heading} fileName={'BrandSubCategory_Master'} />

            </div>

            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Brand SubCategory</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Box className='inputBox-12 mt-4' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={brandName}
                                onChange={e => setBrandName(e.target.value)}
                                required id="outlined-basic"
                                label="Brand Subcategory"
                                variant="outlined"
                                name='brandName'
                                inputRef={register({ required: "Brand Subcategory is required.*", })}
                                error={Boolean(errors.brandName)}
                                helperText={errors.brandName?.message}
                            />
                        </FormControl>
                    </Box>


                    <Box className='inputBox-12 mt-4' >
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Category</InputLabel>
                             <Select
MenuProps={{
 style: { maxHeight: 400,
          maxWidth:150
        },
     }}
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={MaterialDetail}
                                label="Select Category"
                                onChange={handleChangeCategory}
                                name='nPDCId' >
                                {MaterialMaster.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurC(item)} value={item.vPDCategoryName} id={item.nPDCId}>{item.vPDCategoryName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                        </FormControl>
                    </Box>


                    {/* <Box className='inputBox-12 mt-4'>
                        <FormControl fullWidth className='input'>
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={MaterialMaster}
                                value={MaterialDetail}
                                name='MaterialDetail'
                                onChange={(event, value) => changeMaterialMasterValue(value)}
                                onInputChange={(event, newInputValue) => {
                                   
                                        productCategoryMaster_ActiveLikeSearch(newInputValue)

                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Search Category" required />}
                            />
                            {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                        </FormControl>
                    </Box> */}



                    <Box className='inputBox-12 mt-4'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vPrefix}
                                onChange={e => setvPrefix(e.target.value)}
                                required id="outlined-basic"
                                label="Brand Subcategory Prefix"
                                variant="outlined"
                                name='vPrefix'
                                inputProps={{
                                    maxLength: 2, // Set the maximum length here (e.g., 20)
                                }}
                                inputRef={register({ required: "Brand Subcategory Prefix is required.*", })}
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
                                    {/* <TableCell align="left" sx={muiStyles.tableHead} >Brand Code</TableCell> */}
                                    <TableCell align="left" sx={muiStyles.tableHead} >Brand Subcategory</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Brand Category</TableCell>

                                    <TableCell align="left" sx={muiStyles.tableHead} >Brand Subcategory Prefix</TableCell>
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
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vPDSubCategoryName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vPDCategoryName}</TableCell>

                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vPDSubCatPrefix}</TableCell>
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
        height: 'auto',
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
export default ProductSubCategoryMaster


