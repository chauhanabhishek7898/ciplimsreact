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
import { MaterialMasterPost, MaterialMasterPut, MaterialMaster_SelectAll } from '../MaterialMaster/MaterialMasterService'
import { UnitMaster_SelectAll_Active, StorageConditionMaster_SelectAll_Active } from '../UnitMaster/UnitMasterApi'
import { ProductCategoryMaster_SelectAll, ProductSubCategoryMaster_SelectAll } from './ProductMasterApi'
import { BrandMaster_SelectAll } from '../BrandMaster/BrandMasterService'
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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react';

import SearchBar from "material-ui-search-bar";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { parseDateToString } from '../../coreservices/Date';
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import { TbEdit } from "react-icons/tb";
function ProductMaster() {
    let Heading = [['SN.', 'Material Code', 'Material Name', 'Category', 'Material Type', 'UOM', 'HSN Code', 'Remarks', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [ProductData, setProductData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [nMId, setnMId] = React.useState(0);
    const [btActive, setBtActive] = React.useState(true);
    const [brandName, setbrandName] = React.useState("");
    const [vMCode, setvMCode] = React.useState("");
    const [vMName, setvMName] = React.useState("");
    const [vHSNCode, setvHSNCode] = React.useState("");
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
    const [startDate, setStartDate] = React.useState(dayjs(startDates));
    const [endDate, setEndDate] = React.useState(dayjs(endDates));
    const [koMonthData, setkoMonthData] = React.useState([]);
    const [weekNumberId, setWeekNumberId] = React.useState('');
    const [error, setError] = React.useState('');
    const [unitid, setUnitid] = React.useState('');
    const [onlyActive, setonlyActive] = React.useState(true);
    const [errorText, setErrorText] = React.useState({
        vCategory: '',
        vBrandName: '',
        vUOM: '',
    });
    let checkedData = true

    const [PackMaster, setPackMaster] = useState([])
    const [PackLabel, setPackLabel] = useState('')

    const [brandData, setBrandData] = React.useState([]);
    const [vBrandName, setvBrandName] = React.useState("");
    const [vBrandNameId, setvBrandNameId] = React.useState("");
    const [nPackId, setnPackId] = useState('')
    const handleChangeBrand = (event) => {
        const selectedId = event.target.value;
        setvBrandName(selectedId)
        const selectedValue = brandData.find((item) => item.vBrandName === selectedId);
        console.log("selectedValue", selectedValue)
    };

    const handleBlurB = (item) => {
        console.log("itemitemitem", item)
        setvBrandName(item.vBrandName)
        setvBrandNameId(item.nBId)
    };

    const [vCategoryData, setvCategoryData] = React.useState([]);
    const [vCategory, setvCategory] = React.useState("");
    const [vCategoryId, setvCategoryId] = React.useState("");

    const [SubCategoryDataForSelection, setSubCategoryDataForSelection] = React.useState([]);

    const handleChangeCategory = (event) => {
        const selectedId = event.target.value;
        setvCategory(selectedId)
        const selectedValue = vCategoryData.find((item) => item.vPDCategoryName === selectedId);
        console.log("selectedValue", selectedValue)
        console.log("SubCategoryDataSubCategoryData", SubCategoryData)
        const forselectionSC = SubCategoryData.find((item) => item.nPDCId === selectedValue.nPDCId);
        const itemsWithSameId = SubCategoryData.filter((item) => item.nPDCId === selectedValue.nPDCId);
        setSubCategoryDataForSelection(itemsWithSameId)
        console.log("forselectionSC", forselectionSC)
        console.log("itemsWithSameId", itemsWithSameId)
    };

    const handleBlurC = (item) => {
        console.log("itemitemitem", item)
        setvCategory(item.vPDCategoryName)
        setvCategoryId(item.nPDCId)
    };

    const [SubCategoryData, setSubCategoryData] = React.useState([]);

    const [SubCategory, setSubCategory] = React.useState("");
    const [SubCategoryId, setSubCategoryId] = React.useState("");


    const handleChangeSubCategory = (event) => {
        const selectedId = event.target.value;
        setSubCategoryId(selectedId)
        const selectedValue = SubCategoryData.find((item) => item.vPDSubCategoryName === selectedId);
        console.log("selectedValue", selectedValue)
    };

    const handleBlurSC = (item) => {
        console.log("itemitemitem", item)
        setSubCategory(item.vPDSubCategoryName)
        setSubCategoryId(item.nPDSCId)
    };

    const [uniteData, setUnitData] = React.useState([]);
    const [vUOM, setvUOM] = React.useState("");
    const [vUOMId, setvUOMId] = React.useState("");

    const handleChangePackUnit = (event) => {
        const selectedId = event.target.value;
        setvUOM(selectedId)
        const selectedValue = uniteData.find((item) => item.vUnitName === selectedId);
        console.log("selectedValue", selectedValue)
    };

    const handleBlurU = (item) => {
        console.log("itemitemitem", item)
        setvUOM(item.vUnitName)
        setvUOMId(item.nUId)
    };


    const [StorageConditionData, setStorageConditionData] = React.useState([]);
    const [StorageCondition, setStorageCondition] = React.useState("");
    const [StorageConditionId, setStorageConditionId] = React.useState("");

    const handleChangeStorageCondition = (event) => {
        const selectedId = event.target.value;
        setStorageCondition(selectedId)
        const selectedValue = StorageConditionData.find((item) => item.vStorageCondition === selectedId);
        console.log("selectedValue", selectedValue)
    };

    const handleBlurS = (item) => {
        console.log("itemitemitem", item)
        setStorageCondition(item.vStorageCondition)
        setStorageConditionId(item.nSCId)
    };

    useEffect(() => {
        const userId = localStorage.getItem("nUserId")
        setnLoggedInUserId(userId)
    }, [])
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getMaterialMaster_SelectAll()
    }

    useEffect(() => {
        getMaterialMaster_SelectAll()
    }, [])
    const getMaterialMaster_SelectAll = () => {
        setLoader2(true)
        MaterialMaster_SelectAll().then(response => {
            if (checkedData == true) {
                console.log("MaterialMaster_SelectAll", response)
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


    useEffect(() => {
        getBrandMaster_SelectAll()
    }, [])

    const getBrandMaster_SelectAll = () => {
        BrandMaster_SelectAll().then(response => {
            setBrandData(response)
        })
    }


    useEffect(() => {
        getCategoryMaster_SelectAll()
    }, [])

    const getCategoryMaster_SelectAll = () => {
        ProductCategoryMaster_SelectAll().then(response => {
            setvCategoryData(response)
        })
    }


    useEffect(() => {
        getSubCategoryMaster_SelectAll()
    }, [])

    const getSubCategoryMaster_SelectAll = () => {
        ProductSubCategoryMaster_SelectAll().then(response => {
            setSubCategoryData(response)

            // const forselectionSC = response.find((item) => item.nCId === vCategoryId);
            // console.log("forselectionSC", forselectionSC)
        })
    }


    useEffect(() => {
        getUnitMaster_SelectAll()
    }, [])

    const getUnitMaster_SelectAll = () => {
        UnitMaster_SelectAll_Active().then(response => {
            setUnitData(response)
        })
    }


    useEffect(() => {
        getStorageConditionMaster_SelectAll_Active()
    }, [])

    const getStorageConditionMaster_SelectAll_Active = () => {
        StorageConditionMaster_SelectAll_Active().then(response => {
            setStorageConditionData(response)
        })
    }

    const packMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
        PackMaster_SelectAll_ActiveLikeSearch(vGeneric == undefined || vGeneric == '' ? null : vGeneric.target.value).then(res => {
            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nPId,
                    label: res[i].vPackName,
                    // label: res[i].MaterialDetail,       
                })
            }
            setPackMaster(data)
        })
  
    }

    const handleChangeFromedate = (newValue) => {
        setFromdate(formatedDate);
    };

    const handleChangeTodate = (newValue) => {
        setTodate(newValue);
    };

    const handleChangeStartdate = (newValue) => {
        setStartDate(newValue);
    };

    const handleChangeEnddate = (newValue) => {
        setEndDate(newValue);
    };
    const changepackMasterValue = (value) => {
        setnPackId(value.value)
        setPackLabel(value.label)
        setvPack(value.label)
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
            setvMCode('')
            setvMName('')
            setvCategory('')
            setvBrandName('')
            setvUOM('')
            setvHSNCode('')
            setvRemarks('')
            setSubCategory('')
            setStorageCondition('')

            setBtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnMId(item.nMId)
            setvMCode(item.vMCode)
            setvMName(item.vMName)
            setvCategory(item.vCategory)
            setSubCategory(item.vSubCategory)
            setStorageCondition(item.vStorageCondition)

            setvBrandName(item.vMaterialType)
            setvUOM(item.vUOM)
            setvHSNCode(item.vHSNCode)
            setvRemarks(item.vRemarks)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
        }
    }
    const validateform = () => {
        if (vCategory == '' || vCategory == undefined) {
            setErrorText({
                vCategory: 'Select Category *'
            })
            return false
        } else if (vBrandName == '' || vBrandName == undefined) {
            setErrorText({
                vBrandName: 'Select Material Type *'
            })
            return false
        } else if (vUOM == '' || vUOM == undefined) {
            setErrorText({
                vUOM: 'Select UOM *'
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
        if (validateform() == true) {
            let brand = {
                nMId: nMId == null ? 0 : nMId,
                vMCode: vMCode,
                vMName: vMName,
                vBrandName: vBrandName,
                vCategory: vCategory,
                vSubCategory: SubCategory,
                vUOM: vUOM,
                vStorageCondition: StorageCondition,
                vHSNCode: vHSNCode,
                vRemarks: vRemarks,
                nLoggedInUserId: parseInt(nLoggedInUserId),


                // MTID: MTID,
                // CatId:CatId ,
                // SubCatId: SubCatId,
                // StorageId: StorageId,
                btActive: btActive,
            }
            console.log(brand)
            setLoader(true)
            if (buttonName == 'Submit') {

                let brandDatas = [...ProductData]
                console.log("brandDatas", brandDatas)
                let venderexist = brandDatas.find(e => e.vMName == vMName.toLowerCase() || e.vMName == vMName.toUpperCase())

                let venderexistcode = brandDatas.find(e => e.vMCode == vMCode.toLowerCase() || e.vMCode == vMCode.toUpperCase())
                if (venderexist) {
                    setLoader(false)
                    toast.success("Item is already Exists")
                }
                else if (venderexistcode) {
                    setLoader(false)
                    toast.success("Code is already Exists")
                }
                else {
                    MaterialMasterPost(brand).then(res => {
                        if (res) {
                            console.log('res', res)
                            toast.success("Record Added Successfully !!")
                            setvMCode('')
                            setvMName('')
                            setvCategory('')
                            setvBrandName('')
                            setvUOM('')
                            setvHSNCode('')
                            setvRemarks('')
                            setLoader(false)
                            setIsOpen(false)
                            getMaterialMaster_SelectAll()
                        }
                    })
                }

            } else {
                setLoader(true)
                MaterialMasterPut(brand).then(res => {

                    if (res) {
                        console.log('res', res)
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
            console.log('koMonth', koMonth)
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
                <button className='submitbtn_exp' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button>
                <ExportExcel excelData={ProductData} Heading={Heading} fileName={'Product_Master'} />
            </div>
            {/* <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false} >


                <div className='displayright'>
                    <div><span className='title'>Product Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>


                <div className='displayflexend mt-4'>
                    {/* <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vMCode}
                                onChange={e => setvMCode(e.target.value)}
                                required id="outlined-basic"
                                label="Product Code"
                                variant="outlined"
                                name='vProductCode'

                            />
                        </FormControl>
                    </Box>


                    <Box className='inputBox-6' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vMName}
                                onChange={e => setvMName(e.target.value)}
                                required id="outlined-basic"
                                label="Product Name"
                                variant="outlined"
                                name='vProductName'
                                inputRef={register({ required: "Product Name is required.*", })}
                                error={Boolean(errors.MaterialName)}
                                helperText={errors.MaterialName?.message}
                            />
                        </FormControl>
                    </Box> */}





                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Category</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vCategory}
                                label="Select Category"
                                onChange={handleChangeCategory}
                                name='nPDCId' >
                                {vCategoryData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurC(item)} value={item.vPDCategoryName} id={item.nPDCId}>{item.vPDCategoryName}</MenuItem>
                                        // <MenuItem key={index} value={item.vCategoryName}>{item.vCategoryName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.vCategory != '' ? <p className='error'>{errorText.vCategory}</p> : null}
                        </FormControl>
                    </Box>


                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Sub Category</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={SubCategory}
                                label="Select Sub Category"
                                onChange={handleChangeSubCategory}
                                name='nPDSCId'
                            >
                                {SubCategoryDataForSelection.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurSC(item)} value={item.vPDSubCategoryName} id={item.nPDSCId}>{item.vPDSubCategoryName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box>


                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Brand</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vBrandName}
                                label="Select Brand"
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



                    <Box className='inputBox-6' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vHSNCode}
                                onChange={e => setvHSNCode(e.target.value)}
                                id="outlined-basic"
                                label="Variant"
                                variant="outlined"
                                name='HSNCode'
                            />
                        </FormControl>
                    </Box>



                    <Box className='inputBox-29' >
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Item</InputLabel>  */}
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={PackMaster}
                                value={PackLabel}
                                // inputValue={MaterialDetail}
                                onChange={(event, value) => changepackMasterValue(value)}
                                onKeyDown={newInputValue => packMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    // materialMaster_SelectAll_ActiveLikeSearch()
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Search Pack" required />}
                            />
                            {/* {errorText.pack != '' ? <p className='error'>{errorText.pack}</p> : null} */}
                        </FormControl>
                    </Box>



                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Unit Name</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={StorageCondition}
                                label="Select Unit"
                                onChange={handleChangeStorageCondition}
                                name='nSCId' >
                                {StorageConditionData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurS(item)} value={item.vStorageCondition} id={item.nSCId}>{item.vStorageCondition}</MenuItem>
                                        // <MenuItem key={index} value={item.vStorageCondition}>{item.vStorageCondition}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {/* {errorText.SubCategory != '' ? <p className='error'>{errorText.SubCategory}</p> : null} */}
                        </FormControl>
                    </Box>


                    {/* <Box className='inputBox-14'>
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
                    </Box> */}
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


                {/* <div className='data-form-box'>
                    <Box sx={{ width: '20%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={brandName}
                                onChange={e => setBrandName(e.target.value)}
                                required id="outlined-basic"
                                label="Opening Stock"
                                variant="outlined"
                                name='brandName'
                                // inputRef={register({ required: "Opening Stock is required.*", })}
                                // error={Boolean(errors.brandName)}
                                // helperText={errors.brandName?.message}
                            />
                        </FormControl>
                    </Box>

                    <div className='date'>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <Stack spacing={3} >
                                <DesktopDatePicker
                                    label="Start Date"
                                    inputFormat="DD-MM-YYYY"
                                    value={startDate}
                                    onChange={handleChangeStartdate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>

                    </div>
                    <div className='date'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="End Date"
                                    inputFormat="DD-MM-YYYY"
                                    value={endDate}
                                    onChange={handleChangeEnddate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>

                    </div>
                    <Box sx={{ width: '20%' }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel id="demo-simple-select-label">Location <span style={{ color: "red" }}>*</span></InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={weekNumberId}
                                label="Location"
                                onChange={handleChange}
                            >
                                <MenuItem value={'1'}>1</MenuItem>
                                <MenuItem value={'2'}>2</MenuItem>
                                <MenuItem value={'3'}>3</MenuItem>
                                <MenuItem value={'4'}>4</MenuItem>
                                <MenuItem value={'5'}>5</MenuItem>
                                <MenuItem value={'6'}>6</MenuItem>
                                <MenuItem value={'7'}>7</MenuItem>
                            </Select>
                        </FormControl>
                        <div className='error'>{error} </div>
                    </Box>
                    {loader == true ?
                        <CButton disabled className='addbtn'>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Loading...
                        </CButton>
                        :
                        <button title='Add' className='addbtn' type="submit" onClick={handleSubmit(submit)}><AddIcon fontSize='small' /></button>
                    }
                    <div>
                        
                    </div>
                </div> */}


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
                                        {/* <TableCell scope="row">SN.</TableCell> */}

                                        {/* <TableCell align="left" sx={muiStyles.tableHead}>Product Code</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Product Name</TableCell> */}
                                        <TableCell align="left" sx={muiStyles.tableHead}>Category</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Sub Category</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Brand</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Variant</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>SKU Name</TableCell>


                                        <TableCell align="left" sx={muiStyles.tableHead}>Status</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Edit</TableCell>

                                    </TableRow>
                                </TableHead>

                                {ProductData?.length > 0 ?
                                    <TableBody>
                                        {ProductData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}

                                                    {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.vCategory}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vSubCategory}</TableCell> */}
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vCategory}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vSubCategory}</TableCell>

                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vMaterialType}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vUOM}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vStorageCondition}</TableCell>


                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.btActive === true ? <Checkbox disabled checked='checked' /> : <Checkbox disabled />}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}><div onClick={() => openmodale(item, 'Update')} className='editbtn'><TbEdit size={20} color='#000' /></div></TableCell>

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