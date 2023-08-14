import React, { useEffect, useRef, useState } from 'react'
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
import { MaterialMaster_SelectAll_ActiveLikeSearch } from '../MaterialMaster/MaterialMasterService'
import { ProductMaster_SelectAll_Active } from '../ProductMaster/ProductMasterApi'
import { BrandMaster_SelectAll_ActiveLikeSearch } from '../BrandMaster/BrandMasterService'
import { BOMMasterPost, ProductMaster_ActiveLikeSearch, GetBOMDetails } from './BomMasteerService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
import { parseDateToString, parseDateToStringSubmit } from '../../coreservices/Date';
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { number } from 'prop-types';
import { Navigation } from '@coreui/coreui';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import HomeIcon from '@mui/icons-material/Home';

function AddBomMaster() {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [bomData, setBrandData] = React.useState([]);
    const [MaterialMaster, setMaterialMaster] = React.useState([]);
    const [PlantMaster, setPlantMaster] = React.useState([]);
    const [ProductMaster, setProductMaster] = React.useState([]);
    const [VendorMaster, setVendorMaster] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [PlantDetail, setPlantDetail] = React.useState('');
    const [ProductDetail, setProductDetail] = React.useState('');
    const [VendorDetail, setVendorDetail] = React.useState('');
    const [nMId, setnMId] = React.useState('');
    const [MaterialMasterId, setMaterialMasterId] = React.useState('');
    const [MaterialMasterLabel, setMaterialMasterLable] = React.useState('');
    const [MaterialDetail, setMaterialDetail] = React.useState('');
    const { register, handleSubmit, control, errors } = useForm();
    const [searched, setSearched] = React.useState("");
    const [nBId, setnBId] = React.useState("");
    const [vBOMNo, setvBOMNo] = React.useState("");
    const [vPack, setvPack] = React.useState("");
    const [vPCategory, setvPCategory] = React.useState("");
    const [vPSubCategory, setvPSubCategory] = React.useState("");
    const [vBrand, setvBrand] = React.useState("");
    const [vVarient, setvVarient] = React.useState("");
    const [vPackName, setvPackName] = React.useState("");


    const [Variant, setVariant] = React.useState("");

    const [Product, setProduct] = React.useState("");
    const [nPDId, setnPDId] = React.useState("");
    const [CaseConfig, setCaseConfig] = React.useState("");
    const [nPerUnitBBVolLt, setnPerUnitBBVolLt] = React.useState("");
    const [nPerCaseVolLt, setnPerCaseVolLt] = React.useState("");
    const [nSUofConcentrate, setnSUofConcentrate] = React.useState("");
    const [nBOMofConcentrate, setnBOMofConcentrate] = React.useState("");
    const [nRequirementinCS, setnRequirementinCS] = React.useState("");
    const [nYieldPercentage, setnYieldPercentage] = React.useState("");
    const [nPerSUUsage, setnPerSUUsage] = React.useState("");
    const [nBOM, setnBOM] = React.useState("");
    const [nRequirementinCSDetail, setnRequirementinCSDetail] = React.useState("");
    const [nReqInUOM, setnReqInUOM] = React.useState("");
    const [nStandardRate, setnStandardRate] = React.useState("");
    const [nStdCOGS, setnStdCOGS] = React.useState("");
    const [vBOMName, setvBOMName] = React.useState("");
    const [vUnit, setvUnit] = React.useState("");
    const [nQty, setnQty] = React.useState('');
    const [vUMO, setvUMO] = React.useState("");
    const [vPOFilePath, setvPOFilePath] = React.useState('');
    const [vRemarks, setvRemarks] = React.useState('');
    const [btActive, setBtActive] = React.useState(true);
    const [disabled, setdisabled] = React.useState(true)
    const [firstTimeSuDisable, setfirstTimeSuDisable] = React.useState(true)
    const [PODetails, setPODetails] = React.useState([]);

    const [nLoggedInUserId, setnLoggedInUserId] = React.useState('');
    const [errorText, setError] = React.useState({
        plant: '',
        vendor: '',
        date: '',
        MaterialDetail: '',
        Quan: '',
        amount: '',
        PerSUUsage: '',
        YieldPercentage: '',
        StandardRate: '',
        product: '',
        PerUnitBBVolLt: '',
        CaseConfig: '',
        materialMasterId: '',
        SUofConcentrate: ''
    });

    const [preview, setPreview] = useState('')
    const [btnType, setbtnType] = useState('')
    const [imgpreview, setimgPreview] = useState(false)
    const imageRef = useRef(null)
    const [alert, setAlert] = React.useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
    })

    useEffect(() => {
        getPODetails()
    }, [])
    const getPODetails = () => {
        setLoader(true)

        GetBOMDetails(null).then(response => {
            console.log(response)
            setBrandData(response)
            setLoader(false)
        })
    }
    const handleChangeVariant = (event) => {
        setVariant(event.target.value);
    };

    const handleChangeProduct = (event) => {
        setProduct(event.target.value);
    };

    const [Requirement, setRequirement] = React.useState("");

    const handleChangeRequirement = (event) => {
        setRequirement(event.target.value);
    };
    const [perCaseVolume, setperCaseVolume] = React.useState("");

    const handleChangeperCaseVolume = (event) => {
        setperCaseVolume(event.target.value);
    };
    const [PerUnitVolume, setPerUnitVolume] = React.useState("");

    const handleChangePerUnitVolume = (event) => {
        setPerUnitVolume(event.target.value);
    };


    const handleChangeCaseConfig = (event) => {
        setCaseConfig(event.target.value);
    };


    useEffect(() => {
        const userId = localStorage.getItem("nUserId")
        setnLoggedInUserId(userId)
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const plantMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
        if (vGeneric != '' && vGeneric != null) {
            vGeneric = vGeneric.split('/')[0]
        } else {
            vGeneric = null
        }
        // console.log('vGeneric',vGeneric.target.value)
        ProductMaster_ActiveLikeSearch(null).then(res => {
            console.log('response', res)

            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nPDId,
                    // label: res[i].vProductName,
                    label: res[i].ProductDetail,
                    vPCategory: res[i].vPCategory,
                    vPSubCategory: res[i].vPSubCategory,
                    vBrand: res[i].vBrand,
                    vVarient: res[i].vVarient,
                    vPackName: res[i].vPackPrefix,
                    vProductCode: res[i].vProductCode,
                })
            }
            setProductMaster(data)
        })
    }
    useEffect(() => {
        materialMaster_SelectAll_ActiveLikeSearch(null)
    }, [])
    const materialMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {

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
                    value: res[i].nMId,
                    label: res[i].vMName,
                    vUOM: res[i].vUOM,
                    // label: res[i].MaterialDetail,       
                })
            }
            setMaterialMaster(data)
        })

    }

    const changeProductValue = (event) => {
        const selectedId = event.target.value;
        setProductDetail(selectedId)
        const selectedValue = ProductMaster.find((item) => item.ProductDetail === selectedId);
        console.log("selectedValue", selectedValue)
    };

    const handleBlurM = (item) => {
        console.log("itemitemitem", item)
        setProductDetail(item == null ? '' : item.ProductDetail)
        setnPDId(item == null ? '' : item.nPDId)
        setvBOMName(item == null ? '' : item.vProductCode)
        setvPCategory(item == null ? '' : item.vPCategory)
        setvPSubCategory(item == null ? '' : item.vPSubCategory)
        setvBrand(item == null ? '' : item.vBrand)
        setvVarient(item == null ? '' : item.vVarient)
        setvPackName(item == null ? '' : item.vPackName)
        setError({
            plant: ''
        })
    };

    useEffect(() => {
        getProductMaster_SelectAll_Active()
    }, [])

    const getProductMaster_SelectAll_Active = () => {
        ProductMaster_SelectAll_Active().then(response => {
            setProductMaster(response)
        })
    }


    // const changeProductValue = (value) => {
    //     setnPDId(value == null ? '' : value.value)
    //     setProductDetail(value == null ? '' : value.label)
    //     setvBOMName(value == null ? '' : value.vProductCode)
    //     setvPCategory(value == null ? '' : value.vPCategory)
    //     setvPSubCategory(value == null ? '' : value.vPSubCategory)
    //     setvBrand(value == null ? '' : value.vBrand)
    //     setvVarient(value == null ? '' : value.vVarient)
    //     setvPackName(value == null ? '' : value.vPackName)
    //     setError({
    //         plant: ''
    //     })
    // }

    const changeMaterialMasterValueMaster = (value) => {
        console.log('value', value)
        setMaterialMasterId(value == null ? '' : value.value)
        setMaterialMasterLable(value == null ? '' : value.label)
        setnMId(value == null ? '' : value.value)
        setMaterialDetail(value == null ? '' : value.label)
        setvUMO(value == null ? '' : value.vUOM)
        setError({
            MaterialDetail: ''
        })
    }
    const changeMaterialMasterValueDetail = (value) => {
        console.log('value', value)
        setnMId(value == null ? '' : value.value)
        setMaterialDetail(value == null ? '' : value.label)
        setvUMO(value == null ? '' : value.vUOM)
        setError({
            MaterialDetail: ''
        })
    }
    const imageFile = (event) => {
        setvPOFilePath(event.target.files[0])
        if (event.target.files[0]) {
            setimgPreview(true)
            const objectUrl = URL.createObjectURL(event.target.files[0])
            setPreview(objectUrl)
        } else {
            setimgPreview(false)
        }
    }

    const validateformPoDetial = () => {
        if (MaterialDetail == '' || MaterialDetail == undefined) {
            setError({
                MaterialDetail: 'Select Material *'
            })
            return false
        } else if (nPerSUUsage == '' || nPerSUUsage == undefined) {
            setError({
                PerSUUsage: 'Enter Per SU Usage *'
            })
            return false
        } else if (nYieldPercentage == '' || nYieldPercentage == undefined) {
            setError({
                YieldPercentage: 'Enter Yield Percentage *'
            })
            return false
        } else if (nStandardRate == '' || nStandardRate == undefined) {
            setError({
                StandardRate: 'Enter Standard Rate*'
            })
            return false
        }
        else {
            setError({
                MaterialDetail: '',
                PerSUUsage: '',
                YieldPercentage: '',
                StandardRate: '',
            })
            return true
        }

    }
    const addKoMonthDate = () => {

        if (btnType == 'edit') {
            confirmAlert({
                title: 'Alert !!',
                message: 'Do you want Edit this Material ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            const indexToUpdate = PODetails.findIndex((todo) => todo.id == id);
                            let poMasteerDetail = [...PODetails]

                            // setPODetails(complaintDetail)
                            poMasteerDetail[indexToUpdate].id = id,
                                poMasteerDetail[indexToUpdate].nMId = parseInt(nMId),
                                poMasteerDetail[indexToUpdate].MaterialDetail = MaterialDetail,
                                // poMasteerDetail[indexToUpdate].nQty = parseFloat(nQty == '' ? 0 : nQty),
                                poMasteerDetail[indexToUpdate].vUOM = vUMO == '' ? null : vUMO,
                                poMasteerDetail[indexToUpdate].nYieldPercentage = nYieldPercentage == '' ? null : nYieldPercentage,
                                poMasteerDetail[indexToUpdate].nPerSUUsage = nPerSUUsage == '' ? null : nPerSUUsage,
                                poMasteerDetail[indexToUpdate].nBOM = nBOM == '' ? null : nBOM,
                                poMasteerDetail[indexToUpdate].nReqInUOM = nReqInUOM == '' ? null : nReqInUOM,
                                poMasteerDetail[indexToUpdate].nRequirementinCSDetail = nRequirementinCSDetail == '' ? null : nRequirementinCSDetail,
                                poMasteerDetail[indexToUpdate].nStandardRate = nStandardRate == '' ? null : nStandardRate,
                                poMasteerDetail[indexToUpdate].nStdCOGS = nStdCOGS == '' ? null : nStdCOGS,

                                console.log('koMonth', poMasteerDetail)
                            setPODetails(poMasteerDetail)
                            setbtnType('')
                            setnMId('')
                            setMaterialDetail('')
                            setnQty('')
                            setvUMO('')
                            setnYieldPercentage('')
                            setnPerSUUsage('')
                            setnBOM('')
                            setnReqInUOM('')
                            setnStandardRate('')
                            setnRequirementinCSDetail('')
                            setnStdCOGS('')
                            setMaterialMaster([])

                        }
                    },
                    {
                        label: 'No',
                        onClick: () => { return null }
                    }
                ]
            });

        } else {
            if (validateformPoDetial() == true) {
                confirmAlert({
                    title: 'Alert !!',
                    message: 'Do you want Add this Material ?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                let poMasteerDetail = [...PODetails]
                                let findnMId = poMasteerDetail.find(e => e.nMId == nMId)
                                if (findnMId) {
                                    toast.success("Item is already Exists")
                                } else {
                                    poMasteerDetail.push({
                                        id: new Date().getUTCMilliseconds(),
                                        nMId: parseInt(nMId),
                                        MaterialDetail: MaterialDetail,
                                        // nQty: parseFloat(nQty == '' ? 0 : nQty),
                                        vUOM: vUMO == '' ? null : vUMO,
                                        nYieldPercentage: nYieldPercentage == '' ? null : parseFloat(nYieldPercentage),
                                        nPerSUUsage: nPerSUUsage == '' ? null : parseFloat(nPerSUUsage),
                                        nBOM: nBOM == '' ? null : parseFloat(nBOM),
                                        nReqInUOM: nReqInUOM == '' ? null : parseFloat(nReqInUOM),
                                        nRequirementinCSDetail: nRequirementinCSDetail == '' ? null : parseFloat(nRequirementinCSDetail),
                                        nStandardRate: nStandardRate == '' ? null : parseFloat(nStandardRate),
                                        nStdCOGS: nStdCOGS == '' ? null : parseFloat(nStdCOGS),
                                    })
                                    console.log('koMonth', poMasteerDetail)
                                    setPODetails(poMasteerDetail)
                                    setnMId('')
                                    setMaterialDetail('')
                                    setnQty('')
                                    setvUMO('')
                                    setnYieldPercentage('')
                                    setnPerSUUsage('')
                                    setnBOM('')
                                    setnReqInUOM('')
                                    setnStandardRate('')
                                    setnRequirementinCSDetail('')
                                    setnStdCOGS('')
                                    setfirstTimeSuDisable(false)
                                    setMaterialMaster([])
                                }

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
    }
    const validateform = () => {
        if (nPDId == '' || nPDId == undefined) {
            setError({
                product: 'Select Product *'
            })
            return false
        } else if (nPerUnitBBVolLt == '' || nPerUnitBBVolLt == undefined) {
            setError({
                PerUnitBBVolLt: 'Enter Per Unit BB VolLt *'
            })
            return false
        } else if (CaseConfig == '' || CaseConfig == undefined) {
            setError({
                CaseConfig: 'Enter Case Config*'
            })
            return false
        } else if (MaterialMasterId == '' || MaterialMasterId == undefined) {
            setError({
                materialMasterId: 'Enter Case Config*'
            })
            return false
        } else if (nSUofConcentrate == '' || nSUofConcentrate == undefined) {
            setError({
                SUofConcentrate: 'Enter Case Config*'
            })
            return false
        } else {
            setError('')
            return true
        }
        return true
    }
    const submit = () => {
        if (validateform() == true) {
            if (PODetails.length > 0) {
                let vendorDatas = [...bomData]
                let venderexistcode = vendorDatas.find(e => e.nPDId == nPDId)
                let venderexist = vendorDatas.find(e => e.nPDId == nPDId)
                if (venderexist) {
                    setLoader(false)
                    toast.success("Product already Exists.")
                } else if (venderexistcode) {
                    setLoader(false)
                    toast.success("Product already Exists ")
                } else {
                    confirmAlert({
                        title: 'Alert !!',
                        message: 'Do you want Proceed ?',
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                    setLoader(true)
                                    const POMasterData = [{
                                        // vBOMNo: vBOMNo,
                                        nBId: nBId == '' || nBId == null ? 0 : nBId,
                                        vBOMName: vBOMName,
                                        vBrand: vBrand == '' ? null : vBrand,
                                        nPDId: parseInt(nPDId),
                                        nPack: parseFloat(vPackName),
                                        nPerUnitBBVolLt: parseInt(nPerUnitBBVolLt),
                                        nCaseConfig: parseFloat(CaseConfig),
                                        nPerCaseVolLt: parseFloat(nPerCaseVolLt),
                                        nMIdToCalculateBOMnReqInCS: parseInt(MaterialMasterId),
                                        nSUofConcentrate: parseFloat(nSUofConcentrate),
                                        nBOMofConcentrate: parseFloat(nBOMofConcentrate),
                                        nRequirementinCS: parseFloat(nRequirementinCS),
                                        vRemarks: vRemarks == '' ? null : vRemarks,
                                        btActive: true,
                                        vBOMCopyFilePath: '',
                                        nLoggedInUserId: parseInt(nLoggedInUserId)
                                    }]
                                    let PurchaseOrder = {}
                                    PurchaseOrder.BOMMaster = POMasterData,
                                        PurchaseOrder.BOMDetails = PODetails
                                    console.log('PurchaseOrder', PurchaseOrder)
                                    BOMMasterPost(PurchaseOrder, vPOFilePath).then(res => {
                                        if (res) {
                                            setLoader(false)
                                            toast.success("BOM Added Successfully !!")
                                            navigate('/Bom')

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
            } else {
                confirmAlert({
                    title: 'Alert !!',
                    message: 'Add at least one Material to Proceed.',
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => { return null },
                        },
                    ]
                });
            }

        }
    }
    const deleteItem = (ids) => {
        confirmAlert({
            title: 'Alert !!',
            closeOnClickOutside: false,
            message: 'Do you want to delete',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log('id', ids)
                        var poMasteerDetail = [...PODetails]
                        var all = poMasteerDetail.indexOf(ids)
                        if (all !== -1) {
                            poMasteerDetail.splice(all, 1);
                        }
                        let filteredArray = poMasteerDetail.filter(item => item.id !== ids)
                        setPODetails(filteredArray)

                    }
                },
                {
                    label: 'No',
                    onClick: () => { return null }
                }
            ]
        });
    }
    const editItem = (item, index) => {
        setbtnType('edit')
        setId(item.id)
        setnMId(item.nMId)
        setMaterialDetail(item.MaterialDetail)
        // setnQty(item.nQty)
        setvUMO(item.vUOM)
        setnYieldPercentage(item.nYieldPercentage)
        setnPerSUUsage(item.nPerSUUsage)
        setnBOM(item.nBOM)
        setnReqInUOM(item.nReqInUOM)
        setnStandardRate(item.nStandardRate)
        setnStdCOGS(item.nStdCOGS)
        setnRequirementinCSDetail(item.nRequirementinCSDetail)
        if (index == 0) {
            setfirstTimeSuDisable(true)
        } else {
            setfirstTimeSuDisable(false)
        }


    }
    const goback = () => {
        confirmAlert({
            title: 'Alert !!',
            closeOnClickOutside: false,
            message: 'Are you Sure ??',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { navigate('/BOM') },
                },
                {
                    label: 'No',
                    onClick: () => { return null }
                }
            ]
        });
    }
    const calculatePerCaseVol = (e) => {
        setCaseConfig(e.target.value)
        setnPerCaseVolLt(parseInt(e.target.value == undefined || e.target.value == '' ? 0 : e.target.value) * parseInt(vPackName) / parseInt(1000))
    }
    const calculateSUofConcentrate = (e) => {
        setnSUofConcentrate(e.target.value)
        setnPerSUUsage(e.target.value)
        let BOMofConcentrate = parseFloat(e.target.value == undefined || e.target.value == '' ? 0 : e.target.value) * (parseFloat(nPerCaseVolLt)) / parseFloat(nPerUnitBBVolLt)
        let formatedBOMofConcentrate = BOMofConcentrate.toFixed(4)
        setnBOMofConcentrate(formatedBOMofConcentrate)
        setnBOM(formatedBOMofConcentrate)
        let RequirementinCS = parseFloat(e.target.value == undefined || e.target.value == '' ? 0 : e.target.value) / parseFloat(formatedBOMofConcentrate)
        setnRequirementinCS(parseInt(RequirementinCS))
        setnRequirementinCSDetail(parseInt(RequirementinCS))
    }
    const calculateSUofConcentrateDetails = (e) => {
        // setnSUofConcentrate(e.target.value)
        setnPerSUUsage(e.target.value)
        let BOMofConcentrate = parseFloat(e.target.value == undefined || e.target.value == '' ? 0 : e.target.value) * (parseFloat(nPerCaseVolLt)) / parseFloat(nPerUnitBBVolLt)
        let formatedBOMofConcentrate = BOMofConcentrate.toFixed(4)
        setnBOMofConcentrate(formatedBOMofConcentrate)
        setnBOM(formatedBOMofConcentrate)
        let RequirementinCS = parseFloat(e.target.value == undefined || e.target.value == '' ? 0 : e.target.value) / parseFloat(formatedBOMofConcentrate)
        setnRequirementinCSDetail(parseInt(RequirementinCS))
    }

    const calculateWithYieldPercentage = (e) => {
        setnYieldPercentage(e.target.value)
        let reqinumo = parseInt(nRequirementinCSDetail) * parseFloat(nBOMofConcentrate) / parseInt(e.target.value == undefined || e.target.value == '' ? 0 : e.target.value) * 100
        setnReqInUOM(reqinumo)
    }

    const calculateStandardRate = (e) => {
        setnStandardRate(e.target.value)
        let stdCOGS = parseFloat(e.target.value == undefined || e.target.value == '' ? 0 : e.target.value) * parseFloat(nBOMofConcentrate) / parseInt(nYieldPercentage) * 100
        setnStdCOGS(stdCOGS)

    }

    return (
        <div className='citymasterContainer'>
            <div className='dateFilter-2 '>
                <div className='displayflexend mt-2'>
                    {/* <Box className='inputBox-10' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vBOMNo}
                                onChange={e => setvBOMNo(e.target.value)}
                                required id="outlined-basic"
                                label="BOM No."
                                variant="outlined"
                                name='vBOMNo'
                                inputRef={register({ required: "BOM No. is required.*", })}
                                error={Boolean(errors.vBOMNo)}
                                helperText={errors.vBOMNo?.message}
                            />
                        </FormControl>
                    </Box> */}
                    {/* <Box className='inputBox-45' >
                        <FormControl fullWidth className='input'>
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={ProductMaster}
                                value={ProductDetail}
                                onChange={(event, value) => changeProductValue(value)}
                                onInputChange={(event, newInputValue) => {
                                    if (newInputValue.length >= 2) {
                                        plantMaster_SelectAll_ActiveLikeSearch(newInputValue)

                                    }
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Search Product " required />}
                            />
                            {errorText.product != '' ? <p className='error'>{errorText.product}</p> : null}
                        </FormControl>
                    </Box> */}

                    <Box className='inputBox-6'>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Select Brand</InputLabel>
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
                                value={ProductDetail}
                                label="Select Brand"
                                onChange={changeProductValue}
                                name='ProductDetail' >
                                {ProductMaster.map((item, index) => {
                                    return (
                                        <MenuItem key={index} onBlur={() => handleBlurM(item)} value={item.ProductDetail} id={item.nPDId}>{item.ProductDetail}</MenuItem>
                                        // <MenuItem key={index} value={item.vMaterialType}>{item.vMaterialType}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.ProductDetail != '' ? <p className='error'>{errorText.ProductDetail}</p> : null}
                        </FormControl>
                    </Box>

                    <Box className='inputBox-22' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vBOMName}
                                onChange={e => setvBOMName(e.target.value)}
                                required id="outlined-basic"
                                label="BOM Name"
                                variant="outlined"
                                name='vBOMName'
                                inputRef={register({ required: "BOM Name is required.*", })}
                                error={Boolean(errors.vBOMName)}
                                helperText={errors.vBOMName?.message}
                            />
                        </FormControl>
                    </Box>


                    {/* <Box className='inputBox-10' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vPCategory}
                                // onChange={e => setvRemarks(e.target.value)}
                                id="outlined-basic"
                                label="Product Category"
                                variant="outlined"
                                name='Remarks'
                                disabled={true}
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-10' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vPSubCategory}
                                // onChange={e => setvRemarks(e.target.value)}
                                id="outlined-basic"
                                label="Product Sub Category"
                                variant="outlined"
                                name='Remarks'
                                disabled={true}
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box> */}
                    <Box className='inputBox-10' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vBrand}
                                // onChange={e => setvRemarks(e.target.value)}
                                id="outlined-basic"
                                label="Brand"
                                variant="outlined"
                                name='Remarks'
                                disabled={true}
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-10' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vVarient}
                                // onChange={e => setvRemarks(e.target.value)}
                                id="outlined-basic"
                                label="Variant"
                                variant="outlined"
                                name='Remarks'
                                disabled={true}
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-31' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vPackName}
                                // onChange={e => setvRemarks(e.target.value)}
                                id="outlined-basic"
                                label="Pack"
                                variant="outlined"
                                name='Remarks'
                                disabled={true}
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-31' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nPerUnitBBVolLt}
                                onChange={e => setnPerUnitBBVolLt(e.target.value)}
                                required id="outlined-basic"
                                label="Per Unit BB VolLt"
                                variant="outlined"
                                name='PerUnitBBVolLt'
                            // inputRef={register({ required: "Per Unit BB VolLt is required. *", })}
                            // error={Boolean(errors.PerUnitBBVolLt)}
                            // helperText={errors.PerUnitBBVolLt?.message}
                            />
                            {errorText.PerUnitBBVolLt != '' ? <p className='error'>{errorText.PerUnitBBVolLt}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-31' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={CaseConfig}
                                onChange={e => calculatePerCaseVol(e)}
                                required id="outlined-basic"
                                label="Case Config"
                                variant="outlined"
                                name='CaseConfig'
                            // inputRef={register({ required: "Case Config is required.*", })}
                            // error={Boolean(errors.CaseConfig)}
                            // helperText={errors.CaseConfig?.message}
                            />
                            {errorText.CaseConfig != '' ? <p className='error'>{errorText.CaseConfig}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-31' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nPerCaseVolLt}
                                onChange={e => setnPerCaseVolLt(e.target.value)}
                                required id="outlined-basic"
                                label="Per Case VolLt"
                                variant="outlined"
                                disabled={true}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-45' >
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Item</InputLabel> */}
                            <p style={{ color: '#1976d2', fontSize: 10, position: 'absolute', top: -20, lineHeight: 1 }}>Select Concentrate</p>
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={MaterialMaster}
                                value={MaterialMasterLabel}
                                // inputValue={MaterialDetail}
                                onChange={(event, value) => changeMaterialMasterValueMaster(value)}
                                // onKeyDown={newInputValue => materialMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    // materialMaster_SelectAll_ActiveLikeSearch()
                                    materialMaster_SelectAll_ActiveLikeSearch(newInputValue)
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="" required />}
                            />
                            {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                            <p style={{ color: 'red', fontSize: 10, position: 'absolute', bottom: -12, lineHeight: 1 }}></p>
                        </FormControl>
                    </Box>
                    <Box className='inputBox-31' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nSUofConcentrate}
                                onChange={e => calculateSUofConcentrate(e)}
                                required id="outlined-basic"
                                label="SU of Concentrate"
                                variant="outlined"
                            />
                            {errorText.SUofConcentrate != '' ? <p className='error'>{errorText.SUofConcentrate}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-31' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nBOMofConcentrate}
                                onChange={e => setnBOMofConcentrate(e.target.value)}
                                required id="outlined-basic"
                                label="BOM of Concentrate"
                                variant="outlined"
                                disabled={true}
                            />
                        </FormControl>
                    </Box>
                    {/* <Box className='inputBox-31' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nRequirementinCS}
                                onChange={e => setnRequirementinCS(e.target.value)}
                                required id="outlined-basic"
                                label="Requirement in CS"
                                variant="outlined"
                                disabled={true}
                            />
                        </FormControl>
                    </Box> */}
                    <Box className='inputBox-44' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vRemarks}
                                onChange={e => setvRemarks(e.target.value)}
                                id="outlined-basic"
                                label="Remarks"
                                variant="outlined"
                                name='Remarks'
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>


                    <Box className='inputBox-8' >
                        <div style={{ position: 'relative' }}>
                            <InputLabel id="demo-simple-select-label" style={{ marginTop: 5, marginBottom: 5, fontSize: 10, position: 'absolute', top: -23 }}>Attach BOM </InputLabel>
                            <input type="file" name='vPOFilePath' onChange={imageFile} hidden ref={imageRef} />
                            <div style={{ flexDirection: 'row' }}>
                                <button onClick={() => imageRef.current.click()} className='choosebtn'>Choose File</button>
                                {imgpreview != false ?
                                    <a href={preview} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>BOM Copy</a>
                                    : null
                                }

                            </div>
                        </div>

                    </Box>
                    <FormGroup >
                        <FormControlLabel style={{ marginRight: 20 }} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                    </FormGroup>

                </div>
            </div>


            <div className='databox '>
                <div className='data-form-box mt-2 '>
                    <Box className='inputBox-46' >
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Item</InputLabel> */}
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={MaterialMaster}
                                value={MaterialDetail}
                                disabled={firstTimeSuDisable}
                                // inputValue={MaterialDetail}
                                onChange={(event, value) => changeMaterialMasterValueDetail(value)}
                                // onKeyDown={newInputValue => materialMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    // materialMaster_SelectAll_ActiveLikeSearch()
                                    materialMaster_SelectAll_ActiveLikeSearch(newInputValue)
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Select Material" required />}
                            />
                            {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-21' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vUMO}
                                onChange={e => setvUMO(e.target.value)}
                                required id="outlined-basic"
                                label="UOM"
                                variant="outlined"
                                name='Quantity'
                                disabled={true}
                            // inputRef={register({ required: "Quantity is required.*", })}
                            // error={Boolean(errors.Quantity)}
                            // helperText={errors.Quantity?.message}
                            />
                            {/* {errorText.Quan != '' ? <p className='error'>{errorText.Quan}</p> : null} */}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nPerSUUsage}
                                onChange={e => calculateSUofConcentrateDetails(e)}
                                required id="outlined-basic"
                                label="Per SU Usage"
                                variant="outlined"
                                disabled={firstTimeSuDisable}
                            />
                            {errorText.PerSUUsage != '' ? <p className='error'>{errorText.PerSUUsage}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nYieldPercentage}
                                onChange={e => calculateWithYieldPercentage(e)}
                                required id="outlined-basic"
                                label="Yield %"
                                variant="outlined"

                            />
                            {errorText.YieldPercentage != '' ? <p className='error'>{errorText.YieldPercentage}</p> : null}
                        </FormControl>
                    </Box>

                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nBOM}
                                onChange={e => setnBOM(e.target.value)}
                                required id="outlined-basic"
                                label="BOM"
                                variant="outlined"
                                disabled={true}
                            />
                        </FormControl>
                    </Box>
                    {/* <Box className='inputBox-30' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nRequirementinCSDetail}
                                onChange={e => setnRequirementinCSDetail(e.target.value)}
                                required id="outlined-basic"
                                label="Requirement in CS"
                                variant="outlined"
                                disabled={true}
                            />
                        </FormControl>
                    </Box> */}
                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nReqInUOM}
                                onChange={e => setnReqInUOM(e.target.value)}
                                required id="outlined-basic"
                                label="Req In UOM"
                                variant="outlined"
                                disabled={true}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nStandardRate}
                                onChange={e => calculateStandardRate(e)}
                                required id="outlined-basic"
                                label="Standard Rate"
                                variant="outlined"
                            />
                            {errorText.StandardRate != '' ? <p className='error'>{errorText.StandardRate}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nStdCOGS}
                                onChange={e => setnStdCOGS(e.target.value)}
                                required id="outlined-basic"
                                label="Std COGS"
                                variant="outlined"
                                disabled={true}
                            />
                        </FormControl>
                    </Box>

                    {/* <Box className='inputBox-22' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={nQty}
                                onChange={e => setnQty(e.target.value)}
                                required id="outlined-basic"
                                label="Quantity"
                                variant="outlined"
                                name='Quantity'
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "Quantity is required.*", })}
                            // error={Boolean(errors.Quantity)}
                            // helperText={errors.Quantity?.message}
                            />
                            {errorText.Quan != '' ? <p className='error'>{errorText.Quan}</p> : null}
                        </FormControl>
                    </Box> */}
                    <div style={{ marginBottom: 10 }}>
                        <button title={btnType == 'edit' ? 'Update' : 'Add'} className='addbtn' onClick={addKoMonthDate}>{btnType == 'edit' ? <EditIcon fontSize='small' /> : <AddIcon fontSize='small' />}</button>
                    </div>
                </div>
                <div className='tablecenter'>
                    {PODetails.length > 0 ?
                        <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>
                            <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="row" style={{ width: '5%', }}>SN.</TableCell>
                                            <TableCell align="center" style={{ width: '10%', }}>Action</TableCell>
                                            <TableCell align="left" >Material Name</TableCell>
                                            <TableCell align="left" >UOM</TableCell>
                                            <TableCell align="left" >Per SU Usage</TableCell>
                                            <TableCell align="left" >Yield %</TableCell>
                                            <TableCell align="left" >BOM</TableCell>
                                            <TableCell align="left" >Req In UOM</TableCell>
                                            <TableCell align="left" >Standard Rate</TableCell>
                                            <TableCell align="left" >Std COGS</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {PODetails.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                    <TableCell align="center" >
                                                        {index != 0 ?
                                                            <>
                                                                <button className='deletbtn' title='Delete' onClick={() => deleteItem(item.id)}><DeleteIcon size={20} color='red' /></button>
                                                            </>
                                                            : null
                                                        }
                                                        <button className='deletbtn' title='Edit' onClick={() => editItem(item, index)}><BorderColorIcon size={20} color='#000' /></button>

                                                    </TableCell>
                                                    <TableCell align="left" >{item.MaterialDetail}</TableCell>
                                                    <TableCell align="left" >{item.vUOM}</TableCell>
                                                    <TableCell align="left" >{item.nPerSUUsage}</TableCell>
                                                    <TableCell align="left" >{item.nYieldPercentage}</TableCell>
                                                    <TableCell align="left" >{item.nBOM}</TableCell>
                                                    <TableCell align="left" >{item.nReqInUOM}</TableCell>
                                                    <TableCell align="left" >{item.nStandardRate}</TableCell>
                                                    <TableCell align="left" >{item.nStdCOGS}</TableCell>



                                                </TableRow>
                                            )
                                        })
                                        }


                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={PODetails.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </Paper>
                        :
                        null

                    }

                </div>
            </div>

            <div className='displayflex-2'>
                <button type="submit" className='submitbtn-2' style={{ marginRight: 10 }} onClick={goback}><HomeIcon size={18} /> Home</button>

                {loader == true ?
                    <CButton disabled className='submitbtn'>
                        <CSpinner component="span" size="sm" aria-hidden="true" />
                        Loading...
                    </CButton>
                    :
                    // <button type="submit" className='submitbtn' onClick={submit}>Submit</button>
                    <button type="submit" className='submitbtn' onClick={handleSubmit(submit)}>Submit</button>
                }
            </div>


        </div>
    )
}
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


};

export default AddBomMaster