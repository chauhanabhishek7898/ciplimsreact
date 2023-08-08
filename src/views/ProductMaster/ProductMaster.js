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
import { UnitMaster_SelectAll_Active, StorageConditionMaster_SelectAll_Active } from '../UnitMaster/UnitMasterApi'
import { ProductCategoryMaster_SelectAll, ProductMasterPost, GetProductSubCategory, ProductMasterPut, ProductMaster_SelectAll } from './ProductMasterApi'
import { VarientMaster_ActiveLikeSearch, VarientMaster_SelectAll_Active } from '../VarientMaster/VarientMasterApi'
import { BrandMaster_SelectAll } from '../BrandMaster/BrandMasterService'
import { ProductCategoryMaster_ActiveLikeSearch } from '../ProductCategoryMaster/ProductCategoryMasterapi'
import Autocomplete from '@mui/material/Autocomplete';
import { PackMaster_SelectAll_ActiveLikeSearch } from '../PackMaster/PackMasterService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react';
import SearchBar from "material-ui-search-bar";
import dayjs from 'dayjs';
import { parseDateToString } from '../../coreservices/Date';
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import { TbEdit } from "react-icons/tb";
import { ProductSubCategoryMaster_ActiveLikeSearch } from '../ProductSubCategoryMaster/ProductSubCategoryMasterapi';

function ProductMaster() {

    let Heading = [['SN.', 'Brand Code', 'Brand Name', 'Category', 'Subcategory', 'Brand', 'Variant', 'SKU', 'UOM', 'Remarks', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [ProductData, setProductData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [btActive, setBtActive] = React.useState(true);
    const [brandName, setbrandName] = React.useState("");
    const [vProductName, setvProductName] = React.useState("");
    const [vProductCode, setvProductCode] = React.useState("");
    const [vRemarks, setvRemarks] = React.useState("");
    const [nLoggedInUserId, setnLoggedInUserId] = React.useState("");
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const [noRecord, setnoRecord] = React.useState(false);
    const { register, handleSubmit, control, errors } = useForm();
    const [searched, setSearched] = React.useState("");
    let fromDates = new Date(Date.now())
    fromDates.setDate(fromDates.getDate() - 7)
    let toDates = new Date(Date.now())
    const [fromDate, setFromdate] = React.useState(dayjs(fromDates));
    const [toDate, setTodate] = React.useState(dayjs(toDates));
    let startDates = new Date(Date.now())
    let endDates = new Date(Date.now())
    const [koMonthData, setkoMonthData] = React.useState([]);
    const [weekNumberId, setWeekNumberId] = React.useState('');
    const [nPDId, setnPDId] = React.useState('');
    const [error, setError] = React.useState('');
    const [unit, setunit] = React.useState('');
    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);
    const [onlyActive, setonlyActive] = React.useState(true);
    const [errorText, setErrorText] = React.useState({
        vProductName: '',
        vCategory: '',
        vBrandName: '',
        SubCategory: '',
        VariantMasterLabel: '',
        PackLabel: '',
    });
    let checkedData = true
    const [PackMaster, setPackMaster] = useState([])
    const [PackLabel, setPackLabel] = useState('')
    const [VariantMaster, setVariantMaster] = useState([])
    const [VariantMasterLabel, setVariantMasterLabel] = useState('')
    const [variantId, setVariantId] = useState('')
    const [brandData, setBrandData] = React.useState([]);
    const [vBrandName, setvBrandName] = React.useState("");
    const [vBrandNameId, setvBrandNameId] = React.useState("");
    const [nPackId, setnPackId] = useState('')
    const [vCategoryData, setvCategoryData] = React.useState([]);
    const [vCategory, setvCategory] = React.useState("");
    const [vCategoryId, setvCategoryId] = React.useState("");
    const [SubCategoryDataForSelection, setSubCategoryDataForSelection] = React.useState([]);
    const [SubCategoryData, setSubCategoryData] = React.useState([]);
    const [SubCategory, setSubCategory] = React.useState("");
    const [SubCategoryId, setSubCategoryId] = React.useState("");
    const [uniteData, setUnitData] = React.useState([]);
    const [vUOM, setvUOM] = React.useState("");
    const [vUOMId, setvUOMId] = React.useState("");
    const [StorageConditionData, setStorageConditionData] = React.useState([]);

    useEffect(() => {
        getMaterialMaster_SelectAll()
        let storedArray = localStorage.getItem('linkAccess');
        const parsedArray = JSON.parse(storedArray);
        let currentURL = window.location.href;
        // let splitcurrentURL = currentURL.split('/')[4]
        let splitcurrentURL
        // if(apiUrlAddEdit=='http://localhost:3000'){
        splitcurrentURL = currentURL.split('/')[4]
        // console.log('parsedArray:', window.location.href);
        // }else{
        //     splitcurrentURL = currentURL.split('/')[2]
        // }
        let filterLinks = parsedArray.filter(e => e.vPageName == splitcurrentURL)
        // console.log('filterLinks:', filterLinks[0].btEditRights);
        // setEnableActions(filterLinks)
        if (filterLinks) {
            setbtSaveRights(filterLinks[0].btSaveRights)
            setbtEditRights(filterLinks[0].btEditRights)
        }
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem("nUserId")
        setnLoggedInUserId(userId)
    }, [])

    useEffect(() => {
        getVarientMaster_SelectAll_Active()
    }, [])

    useEffect(() => {
        getBrandMaster_SelectAll()
    }, [])

    useEffect(() => {
        getCategoryMaster_SelectAll()
    }, [])

    useEffect(() => {
        getUnitMaster_SelectAll()
    }, [])

    useEffect(() => {
        getStorageConditionMaster_SelectAll_Active()
    }, [])

    useEffect(() => {
        productCategoryMaster_ActiveLikeSearch(null)
    }, [])

    useEffect(() => {
        packMaster_SelectAll_ActiveLikeSearch(null)
    }, [])

    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getMaterialMaster_SelectAll()
    }

    const getMaterialMaster_SelectAll = () => {
        setLoader2(true)
        ProductMaster_SelectAll().then(response => {
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setProductData(activeData)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                let inactiveData = response.filter(e => e.btActive == false)
                setProductData(inactiveData)
                setMasterBrandData(inactiveData)
                setLoader2(false)
            }
        })
    }

    const handleChangeBrand = (event) => {
        const selectedId = event.target.value;
        setvBrandName(selectedId)
    };

    const handleBlurB = (item) => {
        setvBrandName(item.vBrandName)
        setvBrandNameId(item.nBId)
    };

    const handleChangeVariant = (event) => {
        const selectedId = event.target.value;
        setVariantMasterLabel(selectedId)
    };

    const handleBlurV = (item) => {
        setVariantMasterLabel(item.vVarient)
        setVariantId(item.nVRId)
    };

    const handleChangeSubCategory = (event) => {
        const selectedId = event.target.value;
        setSubCategoryId(selectedId)
    };

    const handleBlurSC = (item) => {
        setSubCategory(item.vPDSubCategoryName)
        setSubCategoryId(item.nPDSCId)
    };

    const getVarientMaster_SelectAll_Active = () => {
        VarientMaster_SelectAll_Active().then(response => {
            setVariantMaster(response)
        })
    }

    const getBrandMaster_SelectAll = () => {
        BrandMaster_SelectAll().then(response => {
            setBrandData(response)
        })
    }

    const getCategoryMaster_SelectAll = () => {
        ProductCategoryMaster_SelectAll().then(response => {
            setvCategoryData(response)
        })
    }

    const getSubCategoryMaster_SelectAll = (nPDCId) => {
        GetProductSubCategory(nPDCId).then(response => {
            console.log("GetProductSubCategory", response)
            setSubCategoryData(response)
        })
    }

    const getUnitMaster_SelectAll = () => {
        UnitMaster_SelectAll_Active().then(response => {
            setUnitData(response)
        })
    }

    const getStorageConditionMaster_SelectAll_Active = () => {
        StorageConditionMaster_SelectAll_Active().then(response => {
            setStorageConditionData(response)
        })
    }

    const productCategoryMaster_ActiveLikeSearch = (vGeneric) => {
        if (vGeneric != '') {
            vGeneric = vGeneric
        } else {
            vGeneric = null
        }
        ProductCategoryMaster_ActiveLikeSearch(vGeneric).then(res => {
            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nPDCId,
                    label: res[i].vPDCategoryName,
                })
            }
            setvCategoryData(data)
            // getSubCategoryMaster_SelectAll(res[0].nPDCId)
        })
    }

    const productSubCategoryMaster_ActiveLikeSearch = (vGeneric) => {
        if (vGeneric != '') {
            vGeneric = vGeneric
        } else {
            vGeneric = null
        }
        ProductSubCategoryMaster_ActiveLikeSearch(vGeneric).then(res => {
            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nVRId,
                    label: res[i].vVarient,
                    // label: res[i].MaterialDetail,       
                })
            }
            setVariantMaster(data)
        })
    }

    const packMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
        if (vGeneric != '') {
            vGeneric = vGeneric
        } else {
            vGeneric = null
        }
        PackMaster_SelectAll_ActiveLikeSearch(vGeneric).then(res => {
            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nPId,
                    label: res[i].vPackName,
                    vUnit: res[i].vUnit,
                })
            }
            setPackMaster(data)
        })
    }

    const changeProductCategoryValue = (value) => {
        // setnPackId(value == null ? '' : value.value)
        setvCategory(value == null ? '' : value.label)
        getSubCategoryMaster_SelectAll(value.value)
        setError('')
    }

    const changepackMasterValue = (value) => {
        setnPackId(value == null ? '' : value.value)
        setPackLabel(value == null ? '' : value.label)
        setunit(value == null ? '' : value.vUnit)
        setError('')
    }

    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = ProductData.filter((row) => {
                return row.vMCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vMName.toLowerCase().includes(searchedVal.toLowerCase()) || row.vCategory.toLowerCase().includes(searchedVal.toLowerCase()) || row.vMaterialType.toLowerCase().includes(searchedVal.toLowerCase());
            });
            if (filteredRows?.length > 0) {
                setnoRecord(false)
                setProductData(filteredRows);
            } else {
                setnoRecord(true)
            }
        } else {
            setnoRecord(false)
            setProductData(masterbrandData);
        }
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getMaterialMaster_SelectAll()
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
            setvProductName('')
            setvCategory(null)
            setSubCategory('')
            setvBrandName('')
            setVariantMasterLabel('')
            setPackLabel('')
            setunit('')
            setvRemarks('')

            setBtActive(true)
            setdisabled(true)
            productCategoryMaster_ActiveLikeSearch(null)
        } else {
            console.log("item.vPCategory", item.vPCategory)
            setIsOpen(true)
            setnPDId(item.nPDId)
            setvProductCode(item.vProductCode)
            setvProductName(item.vProductName)
            setvCategory(item.vPCategory)
            productCategoryMaster_ActiveLikeSearch(item.vPCategory)
            setSubCategory(item.vPSubCategory)
            console.log("vCategoryData", vCategoryData)
            const forselectionSC = vCategoryData.find((items) => items.label === item.vPCategory);
            console.log("forselectionSC", forselectionSC)
            getSubCategoryMaster_SelectAll(forselectionSC.value)


            setvBrandName(item.vBrand)
            setVariantMasterLabel(item.vVarient)
            setPackLabel(item.vPackName)
            setunit(item.vUnit)
            setvRemarks(item.vRemarks)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
        }
    }
    const validateform = () => {
        if (vProductName == '' || vProductName == undefined) {
            setErrorText({
                vProductName: 'Enter Brand Name *'
            })
            return false
        } else if (vCategory == '' || vCategory == undefined) {
            setErrorText({
                vCategory: 'Select Category *'
            })
            return false
        } else if (SubCategory == '' || SubCategory == undefined) {
            setErrorText({
                SubCategory: 'Select Subcategory *'
            })
            return false
        } else if (vBrandName == '' || vBrandName == undefined) {
            setErrorText({
                vBrandName: 'Select Brand *'
            })
            return false
        } else if (VariantMasterLabel == '' || VariantMasterLabel == undefined) {
            setErrorText({
                VariantMasterLabel: 'Select Variant *'
            })
            return false
        } else if (PackLabel == '' || PackLabel == undefined) {
            setErrorText({
                PackLabel: 'Select Pack *'
            })
            return false
        }
        else {
            setError('')
            return true
        }
    }
    const submit = () => {
        if (validateform() == true) {
            let brand = {
                nPDId: nPDId == '' ? 0 : nPDId,
                vProductName: vProductName,
                vPCategory: vCategory,
                vPSubCategory: SubCategory,
                vBrand: vBrandName,
                vVarient: VariantMasterLabel,
                vPackName: PackLabel,
                vRemarks: vRemarks,
                btActive: btActive,
            }
            setLoader(true)
            if (buttonName == 'Submit') {
                let existdata = [...ProductData]
                let venderexist = existdata.find(e => e.vProductName == vProductName ||
                    e.vPCategory == vCategory &&
                    e.vPSubCategory == SubCategory &&
                    e.vBrand == vBrandName &&
                    e.vVarient == VariantMasterLabel &&
                    e.vPackName == PackLabel
                )
                let venderexistcode = existdata.find(e => e.vProductName == vProductName ||
                    e.vPCategory == vCategory &&
                    e.vPSubCategory == SubCategory &&
                    e.vBrand == vBrandName &&
                    e.vVarient == VariantMasterLabel &&
                    e.vPackName == PackLabel
                )
                if (venderexist != undefined) {
                    setLoader(false)
                    toast.success("This selection criteria already Exists. Brand name is unique; and selection of (Brand category, Brand Subcategory, Brand, variant, Pack) is unique.")
                }
                else if (venderexistcode) {
                    setLoader(false)
                    toast.success("This selection criteria already Exists. Brand name is unique; and selection of (Brand category, Brand Subcategory, Brand, variant, Pack) is unique.")
                }
                else {
                    ProductMasterPost(brand).then(res => {
                        if (res) {
                            toast.success("Record Added Successfully !!")
                            setLoader(false)
                            setIsOpen(false)
                            getMaterialMaster_SelectAll()
                        }
                    })
                }
            } else {
                setLoader(true)
                ProductMasterPut(brand).then(res => {

                    if (res) {
                        toast.success("Record Updated Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getMaterialMaster_SelectAll()
                    }
                })
            }
        }
    }

    const handleChange = (event) => {
        setWeekNumberId(event.target.value);
    };

    const addKoMonthDate = () => {
        if (validateform() == true) {
            let koMonth = [...koMonthData]
            koMonth.push({
                id: new Date().getUTCMilliseconds(),
                brandName: brandName,
                fromDate: parseDateToString(new Date(fromDate)),
                toDate: parseDateToString(new Date(toDate)),
                weekNumber: weekNumberId,
            })
            setkoMonthData(koMonth)
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

                <ExportExcel excelData={ProductData} Heading={Heading} fileName={'Brand_Master'} />
            </div>
            {/* <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false} >

                <div className='displayright'>
                    <div><span className='title'>Brand</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>

                <div className='displayflexend mt-4'>
                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vProductCode}
                                // onChange={e => setvProduct(e.target.value)}
                                id="outlined-basic"
                                label="Brand Code (Auto Generated)"
                                variant="outlined"
                                disabled={true}

                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vProductName}
                                onChange={e => setvProductName(e.target.value)}
                                required id="outlined-basic"
                                label="Brand Name"
                                variant="outlined"
                                name='vProductName'
                            />
                            {errorText.vProductName != '' ? <p className='error'>{errorText.vProductName}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-6'>

                        <FormControl fullWidth className='input'>
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={vCategoryData}
                                value={vCategory}
                                onChange={(event, value) => changeProductCategoryValue(value)}
                                onInputChange={(event, newInputValue) => {
                                    productCategoryMaster_ActiveLikeSearch(newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Search Category" required />}
                            />
                            {errorText.vCategory != '' ? <p className='error'>{errorText.vCategory}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Subcategory</InputLabel>
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
                                value={SubCategory}
                                label="Select Subcategory"
                                onChange={handleChangeSubCategory}
                                name='nPDSCId'
                            >
                                {SubCategoryData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurSC(item)} value={item.vPDSubCategoryName} id={item.nPDSCId}>{item.vPDSubCategoryName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.nPDSCId != '' ? <p className='error'>{errorText.nPDSCId}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Brand Unit</InputLabel>
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
                                value={vBrandName}
                                label="Select Brand Unit"
                                onChange={handleChangeBrand}
                                name='nBId' >
                                {brandData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurB(item)} value={item.vBrandName} id={item.nBId}>{item.vBrandName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.vBrandName != '' ? <p className='error'>{errorText.vBrandName}</p> : null}
                        </FormControl>
                    </Box>

                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Varient</InputLabel>
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
                                value={VariantMasterLabel}
                                label="Select Varient"
                                onChange={handleChangeVariant}
                                name='VariantMasterLabel' >
                                {VariantMaster.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurV(item)} value={item.vVarient} id={item.nVRId}>{item.vVarient}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.VariantMasterLabel != '' ? <p className='error'>{errorText.VariantMasterLabel}</p> : null}
                        </FormControl>
                    </Box>

                    <Box className='inputBox-6' >
                        <FormControl fullWidth className='input'>
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={PackMaster}
                                value={PackLabel}
                                onChange={(event, value) => changepackMasterValue(value)}
                                onInputChange={(event, newInputValue) => {
                                    if (newInputValue.length >= 0) {
                                        packMaster_SelectAll_ActiveLikeSearch(newInputValue)
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} label="Search SKU" required />}
                            />
                            {errorText.PackLabel != '' ? <p className='error'>{errorText.PackLabel}</p> : null}
                        </FormControl>
                    </Box>

                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={unit}
                                id="outlined-basic"
                                label="UOM"
                                variant="outlined"
                                disabled={true}
                            />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-4'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vRemarks}
                                onChange={e => setvRemarks(e.target.value)}
                                id="outlined-basic"
                                label="Remarks"
                                variant="outlined"
                                name='vRemarks'
                            />
                        </FormControl>
                    </Box>

                    <div className='check'>
                        <FormGroup >
                            <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                        </FormGroup>

                    </div>

                </div>
                <div className='displayflexendmodal'>
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
            <div>
                <div className='tablecenter'>
                    <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>
                        <div className='exportandfilter'>
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
                                        <TableCell align="left" sx={muiStyles.tableHead}>Brand Code</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Brand Name</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Category</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Subcategory</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Brand Unit</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Variant</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>SKU</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>UOM</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Status</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                {ProductData?.length > 0 ?
                                    <TableBody>
                                        {ProductData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vProductCode}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vProductName}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vPCategory}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vPSubCategory}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vBrand}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vVarient}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vPackName}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vUnit}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.btActive === true ? <Checkbox disabled checked='checked' /> : <Checkbox disabled />}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}><button onClick={() => openmodale(item, 'Update')} disabled={btEditRights == false} className={btEditRights == false ? 'editbtn notAllow' : 'editbtn'}><TbEdit size={20} color='#000' /></button></TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                    :
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={10}>No Record</TableCell>
                                        </TableRow>
                                    </TableBody>
                                }
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={ProductData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}
const customStyles = {
    content: {
        top: '50%',
        left: '58%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
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
export default ProductMaster