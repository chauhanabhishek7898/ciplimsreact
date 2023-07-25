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
import { VendorMaster_SelectAll, VendorMaster_SelectAll_Active, VendorMasterPost, VendorMasterPut, VendorDetail_UpdatePut, SubCategory_SelectAll_ActiveLikeSearch, CategoryMaster_ActiveLikeSearch, VendorMaster_GetVendorById } from './VenderFormService'
import { MaterialTypeMaster_SelectAll_Active } from '../MaterialMaster/MaterialMasterService'

import { GetSubCategory } from '../MaterialMaster/MaterialMasterService'
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
import { CSpinner } from '@coreui/react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CForm,
    CFormInput,
    CImage,
    CNavbar,
    CNavbarNav,
    CNavbarBrand,
    CNavbarText,
    CNavbarToggler,
    CNavLink,
    CDropdown,
    CButton,
} from '@coreui/react'
import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import { Tooltip } from 'react-tooltip'
import { TbEdit } from "react-icons/tb";
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { confirmAlert } from 'react-confirm-alert';
function VenderForm() {
    let Heading = [['SN.', 'Vendor Code', 'Vendor Name', 'Vendor Address', 'Contact Person', 'Mobile No', 'Email Id', 'GST No', 'Remarks', 'Status']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [vendorData, setVendorData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [nVId, setnVId] = React.useState(0);
    const [nVDId, setnVDId] = React.useState(0);
    const [vVendorCode, setvVendorCode] = React.useState("");
    const [vVendorName, setvVendorName] = React.useState("");
    const [vVendorAddress, setvVendorAddress] = React.useState("");
    const [vContactPerson, setvContactPerson] = React.useState(0);
    const [vMobileNo, setvMobileNo] = React.useState(false);
    const [vEmailId, setvEmailId] = React.useState("");
    const [vGSTNo, setvGSTNo] = React.useState("");
    const [vRemarks, setvRemarks] = React.useState("");
    const [btActive, setbtActive] = React.useState(false);
    const [btDActive, setbtDActive] = React.useState(false);
    const [secondtimeSubmit, setsecondtimeSubmit] = React.useState(false);
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [loader3, setLoader3] = React.useState(false);
    const [loader4, setLoader4] = React.useState(false);
    const [loader5, setLoader5] = React.useState(false);
    const [venderMasterTable, setvenderMasterTable] = React.useState(true);
    const [venderDetailsTable, setvenderDetailsTable] = React.useState(false);
    const [venderDetailsDisable, setvenderDetailsDisable] = React.useState(false);
    const [venderMasterDisable, setvenderMasterDisable] = React.useState(false);
    const [btSaveRights, setbtSaveRights] = React.useState(false);
    const [btEditRights, setbtEditRights] = React.useState(false);
    const [MaterialType, setMaterialType] = React.useState(false);
    const [MaterialMaster, setMaterialMaster] = React.useState([]);
    const [enableActions, setEnableActions] = React.useState([]);
    const [MaterialDetail, setCategoryDetail] = React.useState('');
    const [nMId, setnMId] = React.useState('');
    const [subcategoryMaster, setsubcategoryMaster] = React.useState([]);
    const [vendorMasterData, setvendorMasterData] = React.useState([]);
    const [vendorDetailData, setvendorDetailData] = React.useState([]);
    const [subcategoryMasterDetail, setsubcategoryMasterDetail] = React.useState('');
    const [subcategoryMasterId, setsubcategoryMasterId] = React.useState('');
    const [nCid, setnCid] = React.useState('');
    const [errorText, setError] = React.useState({
        MaterialType: '',
        MaterialDetail: '',
        subCategory: '',
    });
    const { register, handleSubmit, control, errors } = useForm();
    const [vMaterialType, setvMaterialType] = React.useState("");
    const [vMaterialTypeId, setvMaterialTypeId] = React.useState("");
    const [vMaterialTypeData, setvMaterialTypeData] = React.useState([]);
    useEffect(() => {
        getMaterialTypeMaster_SelectAll_Active()
    }, [])

    const getMaterialTypeMaster_SelectAll_Active = () => {
        MaterialTypeMaster_SelectAll_Active().then(response => {
            setvMaterialTypeData(response)
        })
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
            setvVendorCode('')
            setvVendorName('')
            setvVendorAddress('')
            setvContactPerson('')
            setvMobileNo('')
            setvEmailId('')
            setvGSTNo('')
            setvRemarks('')
            setbtActive(true)
            setbtDActive(true)
            setdisabled(true)
            setsecondtimeSubmit(false)
            setMaterialType('')
            setCategoryDetail('')
            setSubCategory('')
        } else {
            setIsOpen(true)
            setnVId(item.nVId)
            setvVendorCode(item.vVendorCode)
            setvVendorName(item.vVendorName)
            setvVendorAddress(item.vVendorAddress)
            setvContactPerson(item.vContactPerson)
            setvMobileNo(item.vMobileNo)
            setvEmailId(item.vEmailId)
            setvGSTNo(item.vGSTNo)
            setvRemarks(item.vRemarks)
            setbtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)
            vendorMaster_GetVendorById(item.nVId)
            setvenderMasterTable(true)
            setvenderDetailsTable(false)
            setvenderDetailsDisable(true)
            setvenderMasterDisable(false)

        }
    }
    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getVendorMaster_SelectAll() 
    }
    useEffect(() => {
        getVendorMaster_SelectAll()
        let storedArray = localStorage.getItem('linkAccess');
        const parsedArray = JSON.parse(storedArray);
        let currentURL = window.location.href;
    //     // let splitcurrentURL = currentURL.split('/')[4]
    //     let splitcurrentURL = currentURL.split('/')[2]
    //     console.log('Current URL:', splitcurrentURL);
    //     let filterLinks = parsedArray.filter(e => e.vPageName == splitcurrentURL)
    //     console.log('filterLinks:', filterLinks[0].btEditRights);
    //     // setEnableActions(filterLinks)
    //    if(filterLinks){ setbtSaveRights(filterLinks[0].btSaveRights)
    //     setbtEditRights(filterLinks[0].btEditRights) }

    }, [])
    const getVendorMaster_SelectAll = () => {
        setLoader2(true)
        VendorMaster_SelectAll().then(response => {

            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setVendorData(activeData)
                setMasterBrandData(activeData)
                setLoader2(false)
            } else {
                let inactiveData = response.filter(e => e.btActive == false)
                setVendorData(inactiveData)
                setMasterBrandData(inactiveData)
                setLoader2(false)

            }
        })
    }

    const vendorMaster_GetVendorById = (nVId) => {
        setLoader2(true)
        VendorMaster_GetVendorById(nVId).then(response => {
            setvendorMasterData(response.TAB1)
            setvendorDetailData(response.TAB2)
            if (response) {
                setLoader2(false)
            }
        })
    }
    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = vendorData.filter((row) => {
                return row.vVendorCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.MaterialTypes.toLowerCase().includes(searchedVal.toLowerCase()) || row.Categories.toLowerCase().includes(searchedVal.toLowerCase()) || row.SubCategories.toLowerCase().includes(searchedVal.toLowerCase()) || row.vVendorAddress.toLowerCase().includes(searchedVal.toLowerCase()) || row.vContactPerson.toLowerCase().includes(searchedVal.toLowerCase()) || row.vMobileNo.toLowerCase().includes(searchedVal.toLowerCase()) || row.vEmailId.toLowerCase().includes(searchedVal.toLowerCase()) || row.vGSTNo.toLowerCase().includes(searchedVal.toLowerCase()) || row.vRemarks.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setVendorData(filteredRows);
        } else {
            setVendorData(masterbrandData);
        }
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getVendorMaster_SelectAll()
    };

    const submit = () => {

        let vendor = {
            nVId: nVId == null ? 0 : nVId,
            vVendorCode: vVendorCode,
            vVendorName: vVendorName,
            vVendorAddress: vVendorAddress,
            vContactPerson: vContactPerson,
            vMobileNo: vMobileNo,
            vEmailId: vEmailId,
            vGSTNo: vGSTNo,
            vRemarks: vRemarks,
            btActive: btActive,
            vMaterialType: MaterialType,
            vCategoryName: MaterialDetail,
            vSubCategoryName: SubCategory,

        }
        if (buttonName == 'Submit') {

            let vendorDatas = [...vendorDetailData]
            let venderexistcode = vendorDatas.find(e => e.vMaterialType == MaterialType && e.vCategoryName == MaterialDetail && e.vSubCategoryName == SubCategory)
            let venderexist = vendorDatas.find(e => e.vMaterialType == MaterialType && e.vCategoryName == MaterialDetail && e.vSubCategoryName == SubCategory)
            if (venderexist && secondtimeSubmit == true) {
                setLoader(false)
                toast.success("Data already Exists for these selections.")
            } else if (venderexistcode && secondtimeSubmit == true) {
                setLoader(false)
                toast.success("Data already Exists for these selections.")
            }

            else {
                if (validateVenderDetailForm() == true) {

                    confirmAlert({
                        title: 'Alert !!',
                        message: 'Do you want to Add ?',
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                    setLoader(true)
                                    VendorMasterPost(vendor).then(res => {
                                        if (res) {
                                            console.log('res', res[0].VendorId)
                                            toast.success("Record Added Successfully !!")
                                            setLoader(false)
                                            // setIsOpen(false)
                                            setsecondtimeSubmit(true)
                                            setMaterialType('')
                                            setCategoryDetail('')
                                            setSubCategory('')
                                            vendorMaster_GetVendorById(res[0].VendorId)
                                            getVendorMaster_SelectAll()

                                        }
                                    })

                                }
                            },
                            {
                                label: 'No',
                                onClick: () => { return null }
                            }
                        ]
                    });
                }


            }
        } else {
            confirmAlert({
                title: 'Alert !!',
                message: 'Do you want to Edit ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            setLoader(true)
                            VendorMasterPut(vendor).then(res => {
                                if (res) {
                                    toast.success("Record Updated Successfully !!")
                                    setLoader(false)
                                    setIsOpen(false)
                                    getVendorMaster_SelectAll()
                                }
                            })

                        }
                    },
                    {
                        label: 'No',
                        onClick: () => { return null }
                    }
                ]
            });


        }
    }
    const validateVenderDetailForm = () => {
        if (MaterialType == '' || MaterialType == undefined) {
            setError({
                MaterialType: 'Select Material Type *'
            })
            return false
        } else if (MaterialDetail == '' || MaterialDetail == undefined) {
            setError({
                MaterialDetail: 'Select Category*'
            })
            return false
        } else if (SubCategory == '' || SubCategory == undefined) {
            setError({
                subCategory: 'Select Subcategory*'
            })
            return false
        } else {
            setError('')
            return true
        }
    }
    const vendorDetail_UpdatePut = () => {
        if (validateVenderDetailForm() == true) {

            let vendor = {
                nVDId: nVDId == null ? 0 : nVDId,
                vMaterialType: MaterialType,
                vCategoryName: MaterialDetail,
                vSubCategoryName: SubCategory,
                btDActive: btDActive,

            }
            confirmAlert({
                title: 'Alert !!',
                message: 'Do you want to Edit ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            setLoader5(true)
                            VendorDetail_UpdatePut(vendor).then(res => {
                                if (res) {
                                    toast.success("Record Updated Successfully !!")
                                    setLoader5(false)
                                    setIsOpen(false)
                                    setMaterialType('')
                                    setCategoryDetail('')
                                    setSubCategory('')
                                    getVendorMaster_SelectAll()
                                }
                            })

                        }
                    },
                    {
                        label: 'No',
                        onClick: () => { return null }
                    }
                ]
            });




        }
    }

    const categoryMaster_ActiveLikeSearch = (vGeneric) => {
        console.log('response', vGeneric)
        if (vGeneric != '') {
            vGeneric = vGeneric
        } else {
            vGeneric = null
        }
        CategoryMaster_ActiveLikeSearch(vGeneric).then(res => {
            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nCId,
                    label: res[i].vCategoryName,
                })
            }
            setMaterialMaster(data)
            getSubCategoryMaster_SelectAll(res[0].nCId)
            // setnCid(res[0].nCId)
        })

    }
    const changeCetegoryValue = (value) => {
        console.log('value', value)
        // setnMId(value == null ? '' : value.label)
        setCategoryDetail(value == null ? '' : value.label)
        if (value != null) {
            getSubCategoryMaster_SelectAll(value.value)
        }
        setError({
            MaterialDetail: ''
        })
    }

    const changeTable = (type) => {
        if (type == 'VendorMaster') {
            setvenderMasterTable(true)
            setvenderDetailsTable(false)

        }
        if (type == 'VendorDetails') {
            setvenderDetailsTable(true)
            setvenderMasterTable(false)

        }
    }
    const [SubCategoryData, setSubCategoryData] = React.useState([]);
    const [SubCategory, setSubCategory] = React.useState("");
    const [SubCategoryId, setSubCategoryId] = React.useState("");


    const getSubCategoryMaster_SelectAll = (nCId) => {
        GetSubCategory(nCId).then(response => {
            setSubCategoryData(response)

            // const forselectionSC = response.find((item) => item.nCId === vCategoryId);
            // console.log("forselectionSC", forselectionSC)
        })
    }
    const handleChangeSubCategory = (event) => {
        const selectedId = event.target.value;
        setSubCategoryId(selectedId)
    };

    const handleBlurSC = (item) => {
        console.log("itemitemitem", item)
        setSubCategory(item.vSubCategoryName)
        setSubCategoryId(item.nSCId)
    };
    const changeupdatedata = (item, type) => {
        if (type == 'venderMaster') {
            setnVId(item.nVId)
            setvVendorCode(item.vVendorCode)
            setvVendorName(item.vVendorName)
            setvVendorAddress(item.vVendorAddress)
            setvContactPerson(item.vContactPerson)
            setvMobileNo(item.vMobileNo)
            setvEmailId(item.vEmailId)
            setvGSTNo(item.vGSTNo)
            setvRemarks(item.vRemarks)
            setbtActive(item.btActive)
            setvenderDetailsDisable(true)
            setvenderMasterDisable(false)
        }
        if (type == 'venderDetails') {
            setnVDId(item.nVDId)
            setMaterialType(item.vMaterialType)
            setCategoryDetail(item.vCategoryName)
            setSubCategory(item.vSubCategoryName)
            setsubcategoryMasterDetail(item.vSubCategoryName)
            setbtDActive(item.btDActive)
            categoryMaster_ActiveLikeSearch(item.vCategoryName)
            setvenderDetailsDisable(false)
            setvenderMasterDisable(true)

        }
    }
    const limitChar = 10;
    const handleChangeNumber = (e) => {
        if (e.target.value.toString().length <= limitChar) {
            setvMobileNo(e.target.value)
        }
    };

    // const handleChangeMaterialType = (event) => {
    //     const selectedId = event.target.value;
    //     setMaterialType(selectedId)
    //     const selectedValue = vMaterialTypeData.find((item) => item.vMaterialType === selectedId);
    //     console.log("selectedValue", selectedValue)
    // };

    const handleChange = (event) => {
        const selectedId = event.target.value;
        setMaterialType(selectedId)
        const selectedValue = vMaterialTypeData.find((item) => item.vMaterialType === selectedId);
        console.log("selectedValue", selectedValue)
    };

    const handleBlurM = (item) => {
        console.log("itemitemitem", item)
        setMaterialType(item.vMaterialType)
        setvMaterialTypeId(item.nMTId)
    };

    return (
        <div className='citymasterContainer'>
            <div className='add_export'>
                <button className={btSaveRights == false?'submitbtn_exp notAllow':'submitbtn_exp'} onClick={() => openmodale(null, 'Submit')} title='Add' disabled={btSaveRights == false}><AddIcon fontSize='small' /><span className='addFont'>Add</span></button>
                <ExportExcel excelData={vendorData} Heading={Heading} fileName={'Vendor_Master'} />
            </div>
            {loader2 == true ?
                <div className='progressBox'>
                    <div className='progressInner'>
                        <CircularProgress />
                    </div>
                </div>
                :
                null
            }

            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Example Modal"
            >
                <div className='displayright mb-4'>
                    <div><span className='title'>Vendor Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box className='inputBox-1'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vVendorCode}
                                onChange={e => setvVendorCode(e.target.value)}
                                id="outlined-basic"
                                label="Vendor Code"
                                required
                                variant="outlined"
                                name='vVendorCode'
                                inputRef={register({ required: "Vendor Code is required.*", })}
                                error={Boolean(errors.vVendorCode)}
                                helperText={errors.vVendorCode?.message}

                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-1' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vVendorName}
                                onChange={e => setvVendorName(e.target.value)}
                                id="outlined-basic"
                                required
                                label="Vendor Name"
                                variant="outlined"
                                name='vVendorName'
                                inputRef={register({ required: "Vendor Name is required.*", })}
                                error={Boolean(errors.vVendorName)}
                                helperText={errors.vVendorName?.message}

                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-2' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vContactPerson}
                                onChange={e => setvContactPerson(e.target.value)}
                                id="outlined-basic"
                                label="Contact Person"
                                variant="outlined"
                                name='ContactPerson'
                                required
                                inputRef={register({ required: "Contact Person is required.*", })}
                                error={Boolean(errors.ContactPerson)}
                                helperText={errors.ContactPerson?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-1'  >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vMobileNo}
                                onChange={e => handleChangeNumber(e)}
                                id="outlined-basic"
                                label="Mobile No"
                                variant="outlined"
                                type='number'
                                name='MobileNo'
                                required
                                inputRef={register({ required: "Mobile No is required.*", })}
                                error={Boolean(errors.MobileNo)}
                                helperText={errors.MobileNo?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-3'  >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vEmailId}
                                onChange={e => setvEmailId(e.target.value)}
                                id="outlined-basic"
                                label="Email Id"
                                variant="outlined"

                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-4' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vVendorAddress}
                                onChange={e => setvVendorAddress(e.target.value)}
                                id="outlined-basic"
                                label="Vendor Address"
                                variant="outlined"

                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-3'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vGSTNo}
                                onChange={e => setvGSTNo(e.target.value)}
                                id="outlined-basic"
                                label="GST No"
                                variant="outlined"
                                name='vGSTNo'

                            />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-5'>
                        <FormControl fullWidth className='input'>
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
                    <div className='displayflexend-3'>
                        <FormGroup >
                            <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setbtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                        </FormGroup>
                        {loader == true && buttonName == 'Update' ?
                            <CButton disabled className='submitbtn'>
                                <CSpinner component="span" size="sm" aria-hidden="true" />
                                Loading...
                            </CButton>
                            :
                            <div>
                                {buttonName == 'Update' ?
                                    <button type="submit" className='submitbtn' onClick={handleSubmit(submit)}>{buttonName}</button>
                                    : null
                                }
                            </div>

                        }
                    </div>
                </div>

                {/* <Box className='inputBox-6'>
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
                    </Box> */}


                <div className='displayflexend borderTop' >
                    <Box className='inputBox-3'>
                        <FormControl fullWidth className='input'>
                            <InputLabel id="demo-simple-select-label" required sx={muiStyles.InputLabels}>Material Type</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={MaterialType}
                                label="Select Material Type"
                                onChange={handleChange}
                            >
                                {vMaterialTypeData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurM(item)} value={item.vMaterialType} id={item.nMTId}>{item.vMaterialType}</MenuItem>
                                        // <MenuItem key={index} value={item.vMaterialType}>{item.vMaterialType}</MenuItem>
                                    )
                                })
                                }

                            </Select>
                            {errorText.MaterialType != '' ? <p className='error'>{errorText.MaterialType}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-3'>
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Item</InputLabel> */}
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={MaterialMaster}
                                value={MaterialDetail}
                                // inputValue={MaterialDetail}

                                onChange={(event, value) => changeCetegoryValue(value)}
                                // onKeyDown={newInputValue => categoryMaster_ActiveLikeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    if (newInputValue.length >= 3) {
                                        categoryMaster_ActiveLikeSearch(newInputValue)

                                    }
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Search Category" required />}
                            />
                            {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-3'>
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
                            >
                                {SubCategoryData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurSC(item)} value={item.vSubCategoryName} id={item.nSCId}>{item.vSubCategoryName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.subCategory != '' ? <p className='error'>{errorText.subCategory}</p> : null}
                        </FormControl>
                    </Box>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <FormGroup style={{ marginLeft: 10, marginRight: 10 }}>
                            <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox defaultChecked={btDActive} value={btDActive} onChange={e => setbtDActive(e.target.checked)} />} label="Active" disabled={disabled} />
                        </FormGroup>
                        {secondtimeSubmit == true ?
                            <>
                                {loader3 == true ?
                                    <CButton disabled className='submitbtn'>
                                        <CSpinner component="span" size="sm" aria-hidden="true" />
                                        Loading...
                                    </CButton>
                                    :
                                    <div>
                                        {buttonName == 'Submit' ?
                                            <button type="submit" className='addbtn' onClick={handleSubmit(submit)}><AddIcon fontSize='small' /></button>
                                            : null
                                        }
                                    </div>

                                }
                            </>
                            : null
                        }

                    </div>



                </div>

                {buttonName == 'Update' || secondtimeSubmit == true ?
                    <div>
                        <div className='tablecenter'>
                            <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>
                                <TableContainer sx={muiStyles.tableBox} className='tableBox' >
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" sx={muiStyles.tableHead}>MaterialType</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableHead}>Category Name</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableHead}>Subcategory Name</TableCell>

                                                {buttonName == 'Update' ?
                                                    <TableCell align="left" sx={muiStyles.tableHead} >Edit</TableCell>
                                                    : null

                                                }
                                            </TableRow>
                                        </TableHead>
                                        {vendorDetailData?.length > 0 ?
                                            <TableBody>
                                                {vendorDetailData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                                    return (
                                                        <TableRow key={index}>

                                                            <TableCell align="left" sx={muiStyles.tableBody}>{item.vMaterialType}</TableCell>
                                                            <TableCell align="left" sx={muiStyles.tableBody}>{item.vCategoryName}</TableCell>

                                                            <TableCell align="left" sx={muiStyles.tableBody}>{item.vSubCategoryName}</TableCell>
                                                            {buttonName == 'Update' ?
                                                                <TableCell align="left" sx={muiStyles.tableBody}><div onClick={() => changeupdatedata(item, 'venderDetails')} className='editbtn' ><TbEdit size={20} color='#000' disabled={btEditRights == false} /></div></TableCell>
                                                                :
                                                                null
                                                            }
                                                        </TableRow>
                                                    )
                                                })
                                                }
                                            </TableBody>
                                            :
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center" colSpan={11}>No Record</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        }
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 100]}
                                    component="div"
                                    count={vendorDetailData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </div>
                    </div>
                    : null
                }
                <div className='displayflexend-2'>
                    <div></div>
                    {secondtimeSubmit == false ?
                        <>
                            {loader4 == true ?
                                <CButton disabled className='submitbtn'>
                                    <CSpinner component="span" size="sm" aria-hidden="true" />
                                    Loading...
                                </CButton>
                                :
                                <div>
                                    {buttonName == 'Submit' ?
                                        <button type="submit" className='submitbtn' onClick={handleSubmit(submit)}>{buttonName}</button>
                                        : null
                                    }
                                </div>

                            }
                        </>
                        : null
                    }
                </div>
                <div className='displayflexend-2'>
                    <div></div>
                    {loader5 == true ?
                        <CButton disabled className='submitbtn'>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Loading...
                        </CButton>
                        :
                        <div>
                            {buttonName == 'Update' ?
                                <button type="submit" className='submitbtn' onClick={vendorDetail_UpdatePut}>{buttonName}</button>
                                : null

                            }
                        </div>

                    }
                </div>
            </Modal >
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
                                <FormControlLabel style={{ marginRight: 0, fontSize: 10 }} control={<Checkbox checked={onlyActive} value={onlyActive} onChange={checkedonlyActive} />} label={'Active Data'} />
                            </FormGroup>
                        </div>
                    </div>
                    <TableContainer sx={muiStyles.tableBox} className='tableBox' >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Vendor Code</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Name</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Address</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Contact Person</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Mobile No</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Email Id</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>GST No</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Material Types</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Categories</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Sub Categories</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Remarks</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead}>Status</TableCell>
                                    <TableCell align="left" sx={muiStyles.tableHead} >Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            {vendorData?.length > 0 ?
                                <TableBody>
                                    {vendorData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vVendorCode}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vVendorName}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}><a data-tooltip-id="my-tooltip" data-tooltip-content={item.vVendorAddress}>{(item.vVendorAddress.length > 10) ? (item.vVendorAddress.slice(0, 10)) + '...' : (item.vVendorAddress)}</a><Tooltip id="my-tooltip" place="bottom" /></TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vContactPerson}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vMobileNo}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vEmailId}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.vGSTNo}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.MaterialTypes}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.Categories}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.SubCategories}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}><a data-tooltip-id="my-tooltip" data-tooltip-content={item.vRemarks}>{(item.vRemarks.length > 10) ? (item.vRemarks.slice(0, 10)) + '...' : (item.vRemarks)}</a><Tooltip id="my-tooltip" place="bottom" /></TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}>{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                                <TableCell align="left" sx={muiStyles.tableBody}><button onClick={() => openmodale(item, 'Update')} disabled={btEditRights == false} className={btEditRights == false?'editbtn notAllow':'editbtn'}><TbEdit size={20} color='#000' /></button></TableCell>
                                            </TableRow>
                                        )
                                    })
                                    }
                                </TableBody>
                                :
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={11}>No Record</TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={vendorData.length}
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
        zIndex: 1000
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
        // "& .MuiFormLabel-root": {
        //     fontSize: '13px',
        //     top: '-20px',
        //     left: '-10px',
        //     backgroundColor: 'transparent',
        //     zIndex: '1'
        // },
        "& label.Mui-focused": {
            zIndex: '1'
        }, '& .MuiFormHelperText-root': {
            position: 'absolute',
            fontSize: 10,
            bottom: -18
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
                paddingLeft: '20px',
                fontSize: '12px'
            }
        },
        "& .MuiFormLabel-root": {
            fontSize: '13px',
            paddingLeft: '8px',
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
export default VenderForm