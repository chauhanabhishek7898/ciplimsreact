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
import { MaterialMasterPost, MaterialMasterPut, MaterialMaster_SelectAll, MaterialTypeMaster_SelectAll_Active, GetSubCategory } from './MaterialMasterService'
import { UnitMaster_SelectAll_Active, StorageConditionMaster_SelectAll_Active, SubCategoryMaster_SelectAll, CategoryMaster_SelectAll } from '../UnitMaster/UnitMasterApi'

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
function MaterialMaster() {
    let Heading = [['SN.', 'Material Code', 'Material Name', 'Category', 'Material Type', 'UOM', 'HSN Code', 'Remarks', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [brandData, setBrandData] = React.useState([]);
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

    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);

    const [errorText, setErrorText] = React.useState({
        vCategory: '',
        vMaterialType: '',
        vUOM: '',
    });
    let checkedData = true


    const [vMaterialTypeData, setvMaterialTypeData] = React.useState([]);
    const [vMaterialType, setvMaterialType] = React.useState("");
    const [vMaterialTypeId, setvMaterialTypeId] = React.useState("");

    const handleChangeMaterialType = (event) => {
        const selectedId = event.target.value;
        setvMaterialType(selectedId)
        const selectedValue = vMaterialTypeData.find((item) => item.vMaterialType === selectedId);
        console.log("selectedValue", selectedValue)
    };

    const handleBlurM = (item) => {
        console.log("itemitemitem", item)
        setvMaterialType(item.vMaterialType)
        setvMaterialTypeId(item.nMTId)
    };

    const [vCategoryData, setvCategoryData] = React.useState([]);
    const [vCategory, setvCategory] = React.useState("");
    const [vCategoryId, setvCategoryId] = React.useState("");

    const [SubCategoryDataForSelection, setSubCategoryDataForSelection] = React.useState([]);

    const handleChangeCategory = (event) => {
        const selectedId = event.target.value;
        setvCategory(selectedId)
        const selectedValue = vCategoryData.find((item) => item.vCategoryName === selectedId);
        console.log("selectedValue", selectedValue)
        console.log("SubCategoryDataSubCategoryData", SubCategoryData)
        const forselectionSC = SubCategoryData.find((item) => item.nCId === selectedValue.nCId);
        const itemsWithSameId = SubCategoryData.filter((item) => item.nCId === selectedValue.nCId);
        setSubCategoryDataForSelection(itemsWithSameId)
        console.log("forselectionSC", forselectionSC)
        console.log("itemsWithSameId", itemsWithSameId)
    };

    const handleBlurC = (item) => {
        console.log("itemitemitem", item)
        setvCategory(item.vCategoryName)
        setvCategoryId(item.nCId)
        getSubCategoryMaster_SelectAll(item.nCId)
    };

    const [SubCategoryData, setSubCategoryData] = React.useState([]);

    const [SubCategory, setSubCategory] = React.useState("");
    const [SubCategoryId, setSubCategoryId] = React.useState("");


    const handleChangeSubCategory = (event) => {
        const selectedId = event.target.value;
        setSubCategoryId(selectedId)
        // const selectedValue = SubCategoryData.find((item) => item.vSubCategoryName === selectedId);
        // console.log("selectedValue", selectedValue)
    };

    const handleBlurSC = (item) => {
        console.log("itemitemitem", item)
        setSubCategory(item.vSubCategoryName)
        setSubCategoryId(item.nSCId)
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

        let storedArray = localStorage.getItem('linkAccess');
        const parsedArray = JSON.parse(storedArray);
        let currentURL = window.location.href;
        // let splitcurrentURL = currentURL.split('/')[4]
       // let splitcurrentURL = currentURL.split('/')[2]
     
      //  let filterLinks = parsedArray.filter(e => e.vPageName == splitcurrentURL)

        // setEnableActions(filterLinks)
     //  if(filterLinks){ setbtSaveRights(filterLinks[0].btSaveRights)
       // setbtEditRights(filterLinks[0].btEditRights) }

    }, [])
    const getMaterialMaster_SelectAll = () => {
        setLoader2(true)
        MaterialMaster_SelectAll().then(response => {
            if (checkedData == true) {
                console.log("MaterialMaster_SelectAll", response)
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


    useEffect(() => {
        getMaterialTypeMaster_SelectAll_Active()
    }, [])

    const getMaterialTypeMaster_SelectAll_Active = () => {
        MaterialTypeMaster_SelectAll_Active().then(response => {
            setvMaterialTypeData(response)
        })
    }


    useEffect(() => {
        getCategoryMaster_SelectAll()
    }, [])

    const getCategoryMaster_SelectAll = () => {
        CategoryMaster_SelectAll().then(response => {
            setvCategoryData(response)
        })
    }


    const getSubCategoryMaster_SelectAll = (nCId) => {
        GetSubCategory(nCId).then(response => {
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

    const requestSearch = (searchedVal) => {

        if (searchedVal.length > 0) {
            const filteredRows = brandData.filter((row) => {
                return row.vMCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vMName.toLowerCase().includes(searchedVal.toLowerCase()) || row.vCategory.toLowerCase().includes(searchedVal.toLowerCase()) || row.vMaterialType.toLowerCase().includes(searchedVal.toLowerCase());
            });
            if (filteredRows?.length > 0) {
                setnoRecord(false)
                setBrandData(filteredRows);
            } else {
                setnoRecord(true)
            }
        } else {
            setnoRecord(false)
            setBrandData(masterbrandData);
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
            setvMaterialType('')
            setvUOM('')
            setvHSNCode('')
            setvRemarks('')
            setSubCategory('')
            setStorageCondition('')
            setvMaterialTypeId('')
            setvCategoryId('')
            setSubCategoryId('')
            setStorageConditionId('')
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
            setvMaterialType(item.vMaterialType)
            setvUOM(item.vUOM)
            setvHSNCode(item.vHSNCode)
            setvRemarks(item.vRemarks)
            setBtActive(item.btActive)
            setvMaterialTypeId(item.MTId)
            setvCategoryId(item.CatId)
            getSubCategoryMaster_SelectAll(item.CatId)
            setSubCategoryId(item.SubCatId)
            setStorageConditionId(item.StorageId)
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
        } else if (vMaterialType == '' || vMaterialType == undefined) {
            setErrorText({
                vMaterialType: 'Select Material Type *'
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
                // vMCodeOrg:vMCode,
                vMCode: vMCode,
                vMName: vMName,
                vMaterialType: vMaterialType,
                vCategory: vCategory,
                vSubCategory: SubCategory,
                vUOM: vUOM,
                vStorageCondition: StorageCondition,
                vHSNCode: vHSNCode,
                vRemarks: vRemarks,
                nLoggedInUserId: parseInt(nLoggedInUserId),
                MTID: vMaterialTypeId,
                CatId: vCategoryId,
                SubCatId: SubCategoryId,
                StorageId: StorageConditionId,
                btActive: btActive,
            }
            console.log(brand)
            setLoader(true)
            if (buttonName == 'Submit') {

                let brandDatas = [...brandData]
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
                            setvMaterialType('')
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
                {/* <button className='submitbtn_exp' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
                <button className={btSaveRights == false ? 'submitbtn_exp notAllow' : 'submitbtn_exp'} onClick={() => openmodale(null, 'Submit')} title='Add' disabled={btSaveRights == false} ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button>

                <ExportExcel excelData={brandData} Heading={Heading} fileName={'Material_Master'} />
            </div>
            {/* <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='small' /> <span className='addFont'>Add</span></button> */}
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false} >


                <div className='displayright'>
                    <div><span className='title'>Material Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>


                <div className='displayflexend mt-4'>
                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vMCode}
                                onChange={e => setvMCode(e.target.value)}
                                id="outlined-basic"
                                label={buttonName == 'Submit'?"Material Code (Auto generated)":"Material Code"}
                                variant="outlined"
                                name='MaterialCode '
                                disabled={buttonName == 'Submit'}
                            // inputRef={register({ required: "Material Code is required.*", })}
                            // error={Boolean(errors.MaterialCode)}
                            // helperText={errors.MaterialCode?.message}
                            />
                        </FormControl>
                        {/* {buttonName == 'Submit' ?
                            <p className='autogenreated'>Auto generated</p>
                            :
                            null

                        } */}
                    </Box>
                    <Box className='inputBox-6' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vMName}
                                onChange={e => setvMName(e.target.value)}
                                required id="outlined-basic"
                                label="Material Name"
                                variant="outlined"
                                name='MaterialName'
                                inputRef={register({ required: "Material Name is required.*", })}
                                error={Boolean(errors.MaterialName)}
                                helperText={errors.MaterialName?.message}
                            />
                        </FormControl>

                    </Box>


                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Material Type</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vMaterialType}
                                label="Select Material Type"
                                onChange={handleChangeMaterialType}
                                name='nMTId' >
                                {vMaterialTypeData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurM(item)} value={item.vMaterialType} id={item.nMTId}>{item.vMaterialType}</MenuItem>
                                        // <MenuItem key={index} value={item.vMaterialType}>{item.vMaterialType}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.vMaterialType != '' ? <p className='error'>{errorText.vMaterialType}</p> : null}
                        </FormControl>
                    </Box>


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
                                name='nCId' >
                                {vCategoryData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurC(item)} value={item.vCategoryName} id={item.nCId}>{item.vCategoryName}</MenuItem>
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
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Subcategory</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={SubCategory}
                                label="Select Subcategory"
                                onChange={handleChangeSubCategory}
                                name='nSCId'
                            >
                                {SubCategoryData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurSC(item)} value={item.vSubCategoryName} id={item.nSCId}>{item.vSubCategoryName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    {/* <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Sub Category</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedOption.id}
                                label="Select Sub Category"
                                onChange={handleChangeSubCategory}
                                name='nSCId'
                            >
                                {SubCategoryData.map((item, index) => (
                                    <MenuItem key={index} onBlur={() => handleBlur(item)} name={item.vSubCategoryName} value={item.nSCId} id={item.nSCId}>
                                        {item.vSubCategoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <p>Selected Item ID: {selectedOption.id}</p>
                        <p>Selected Item Value: {selectedOption.value}</p>
                    </Box> */}




                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>UOM</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vUOM}
                                label="Select UOM"
                                onChange={handleChangePackUnit}
                                name='unitid' >
                                {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurU(item)} value={item.vUnitName} id={item.nUId}>{item.vUnitName}</MenuItem>
                                        // <MenuItem key={index} value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {/* {errorText.vUOM != '' ? <p className='error'>{errorText.vUOM}</p> : null} */}
                        </FormControl>
                    </Box>


                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Storage Condition</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={StorageCondition}
                                label="Select Subcategory"
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


                    <Box className='inputBox-6' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vHSNCode}
                                onChange={e => setvHSNCode(e.target.value)}
                                id="outlined-basic"
                                label="HSN Code"
                                variant="outlined"
                                name='HSNCode'
                            />
                        </FormControl>
                    </Box>


                    <Box className='inputBox-14'>
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
                    <div style={{ display: 'flex', flexBasis: '100%' }}></div>


                    <FormGroup >
                        <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                    </FormGroup>


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

                                        <TableCell align="left" sx={muiStyles.tableHead}>Material Code</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Material Name</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Material Type</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Category</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Subcategory</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>UOM</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Storage Condition</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>HSN Code</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Remarks</TableCell>

                                        <TableCell align="left" sx={muiStyles.tableHead}>Status</TableCell>
                                        <TableCell align="left" sx={muiStyles.tableHead}>Edit</TableCell>

                                    </TableRow>
                                </TableHead>

                                {brandData?.length > 0 ?
                                    <TableBody>
                                        {brandData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                    {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}

                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vMCode}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vMName}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vMaterialType}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vCategory}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vSubCategory}</TableCell>

                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vUOM}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vStorageCondition}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vHSNCode}</TableCell>
                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.vRemarks}</TableCell>

                                                    <TableCell align="left" sx={muiStyles.tableBody}>{item.btActive === true ? <Checkbox disabled checked='checked' /> : <Checkbox disabled />}</TableCell>
                                                    {/* <TableCell align="left" sx={muiStyles.tableBody}><div onClick={() => openmodale(item, 'Update')} className='editbtn'><TbEdit size={20} color='#000' /></div></TableCell> */}
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
                            count={brandData.length}
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
                fontSize: '12px',
                position: 'relative'
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
export default MaterialMaster