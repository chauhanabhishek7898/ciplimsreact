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
import { BrandMaster_SelectAll, BrandMasterPost, BrandMasterPut, } from '../BrandMaster/BrandMasterService'
import { UnitMaster_SelectAll } from '../PackMaster/PackMasterService'
import { MaterialMaster_SelectAll_ActiveLikeSearch } from '../MaterialMaster/MaterialMasterService'
import { PlantMaster_SelectAll_ActiveLikeSearch } from '../PlantMaster/PlantMasterService'
import { VendorMaster_SelectAll_ActiveLikeSearch, VendorMaster_SelectAll_Active } from '../VenderForm/VenderFormService'
import { POMasterPut, GetPOByPOId } from './POMasterService'
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
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { parseDateToString, parseDateToStringSubmit } from '../../coreservices/Date';
import { useNavigate, useLocation } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { number } from 'prop-types';
import { Navigation } from '@coreui/coreui';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useParams } from 'react-router';
import { imageUrl } from 'src/coreservices/environment';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
function EditPurchaseOrder() {
    const navigate = useNavigate();
    const location = useLocation();
    let nPOId = location.state.nPOId
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [brandData, setBrandData] = React.useState([]);
    const [MaterialMaster, setMaterialMaster] = React.useState([]);
    const [PlantMaster, setPlantMaster] = React.useState([]);
    const [VendorMaster, setVendorMaster] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [nBid, setnBid] = React.useState(0);
    const [id, setId] = React.useState(0);
    const [nPId, setnPId] = React.useState('');
    const [PlantDetail, setPlantDetail] = React.useState('');

    const [vPONo, setvPONo] = React.useState('');
    const [vPODesc, setvPODesc] = React.useState('');
    const [CostCentre, setCostCentre] = React.useState('');
    const [ProfitCentre, setProfitCentre] = React.useState('');
    const [vGLCode, setvGLCode] = React.useState('');
    const [vBusiness, setvBusiness] = React.useState('');
    const [nVId, setnVId] = React.useState('');
    const [VendorDetail, setVendorDetail] = React.useState('');
    const [nMId, setnMId] = React.useState('');
    const [MaterialDetail, setMaterialDetail] = React.useState('');

    const [vRemarks, setvRemarks] = React.useState('');
    const [vPOFilePath, setvPOFilePath] = React.useState('');
    const [vPOFilePathFile, setvPOFilePathFile] = React.useState({});
    const [nQty, setnQty] = React.useState('');
    const [nRate, setnRate] = React.useState('');
    const [nAmt, setnAmt] = React.useState('');
    const [nSGSTP, setnSGSTP] = React.useState('');
    const [nSGST, setnSGST] = React.useState('');
    const [nCGSTP, setnCGSTP] = React.useState('');
    const [nCGST, setnCGST] = React.useState('');
    const [nIGSTP, setnIGSTP] = React.useState('');
    const [nIGST, setnIGST] = React.useState('');
    const [nTax, setnTax] = React.useState('');
    const [nTotalAmt, setnTotalAmt] = React.useState('');

    const [btActive, setBtActive] = React.useState(true);
    const [disabled, setdisabled] = React.useState(true)
    const { register, handleSubmit, control, errors } = useForm();

    // const [rows, setRows] = useState(brandData);
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
    const [PODetails, setPODetails] = React.useState([]);
    const [weekNumberId, setWeekNumberId] = React.useState('');
    const [nLoggedInUserId, setnLoggedInUserId] = React.useState('');
    const [errorText, setError] = React.useState({
        plant: '',
        vendor: '',
        date: '',
        MaterialDetail: '',
        Quan: '',
        amount: '',
    });
    const [unitid, setUnitid] = React.useState('');
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState('')
    const [btnType, setbtnType] = useState('')
    const [imgpreview, setimgPreview] = useState(false)
    const [localImage, setlocalImage] = useState(false)
    const imageRef = useRef(null)
    const [EditId, setEditId] = useState('')
    const [alert, setAlert] = React.useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
    })

    useEffect(() => {
        const userId = localStorage.getItem("nUserId")
        setnLoggedInUserId(userId)
    }, [])
    const handleChangePackUnit = (event) => {
        setvBusiness(event.target.value);
    };
    const handleChangeStartdate = (newValue) => {
        setStartDate(newValue);
        setError({
            date: ''
        })
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        getPOByPOId()
    }, [])
    const plantMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
        if (vGeneric != '') {
            vGeneric = vGeneric.target.value
        } else {
            vGeneric = null
        }

        PlantMaster_SelectAll_ActiveLikeSearch(vGeneric).then(res => {
            console.log('response', res)

            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nPId,
                    label: res[i].PlantDetail,
                    vCostCentre: res[i].vCostCentre,
                    vProfitCentre: res[i].vProfitCentre,
                })
            }
            setPlantMaster(data)
        })
    }
    const getPOByPOId = () => {
        GetPOByPOId(nPOId).then(res => {
            console.log('response', res)
            let count = Object.keys(res.PODetail).length
            let data = res.PODetail
            for(var i = 0; i < count; i++) {
                let counts = i
                res.PODetail[i].id=counts
            }
            setPODetails(data)
            setStartDate(res.POMaster[0].dtPODated)
            setnPId(res.POMaster[0].nPId)
            setPlantDetail(res.POMaster[0].PlantDetail)
            setvPONo(res.POMaster[0].vPONo)
            setvPODesc(res.POMaster[0].vPODesc)
            setCostCentre(res.POMaster[0].vCostCentre)
            setProfitCentre(res.POMaster[0].vProfitCentre)
            setvGLCode(res.POMaster[0].vGLCode)
            setvBusiness(res.POMaster[0].vBusiness)
            setnVId(res.POMaster[0].nVId)
            setVendorDetail(res.POMaster[0].VendorDetail)
            setvRemarks(res.POMaster[0].vRemarks)
            setvPOFilePath(res.POMaster[0].vPOFilePath)
            if (res.POMaster[0].vPOFilePath != '' && res.POMaster[0].vPOFilePath != null) {
                setimgPreview(true)
                setPreview(res.POMaster[0].vPOFilePath)
                setlocalImage(false)
            } else {
                setimgPreview(false)
            }
            if (res.POMaster[0].btActive == true) {
                console.log('1')
                setBtActive(true)
            } else {
                setBtActive(false)
                console.log('2')
            }
            setEditId(null)
        })

    }

    const vendorMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
        if (vGeneric != '') {
            vGeneric = vGeneric.target.value
        } else {
            vGeneric = null
        }
        VendorMaster_SelectAll_ActiveLikeSearch(vGeneric).then(res => {
            console.log('response', res)

            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nVId,
                    label: res[i].VendorDetail,
                })

            }
            setVendorMaster(data)
        })
    }
    const materialMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {

        if (vGeneric != '') {
            vGeneric = vGeneric.target.value
        } else {
            vGeneric = null
        }
        MaterialMaster_SelectAll_ActiveLikeSearch(vGeneric).then(res => {
            console.log('response', res)
            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nMId,
                    label: res[i].MaterialDetail,
                })
            }
            setMaterialMaster(data)
        })

    }
    const changePlantValue = (value) => {
        confirmAlert({
            title: 'Alert !!',
            closeOnClickOutside: false,
            message: 'You are going to change the Plant of this transaction. In case you change it, all the below selections done will be removed. Do you still want to proceed ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setnPId(value.value)
                        setPlantDetail(value.label)
                        setCostCentre(value.vCostCentre)
                        setProfitCentre(value.vProfitCentre)
                        setError({
                            plant: ''
                        })
                        setnMId('')
                        setMaterialDetail('')
                        setnQty('')
                        setnRate('')
                        setnAmt('')
                        setnSGSTP('')
                        setnSGST('')
                        setnCGSTP('')
                        setnCGST('')
                        setnIGSTP('')
                        setnIGST('')
                        setnTax('')
                        setnTotalAmt('')
                        setEditId(null)
                        setPODetails([])

                    },
                },
                {
                    label: 'No',
                    onClick: () => {
                        return null
                    },
                },
            ]
        });
    }
    const changeVendorMasterValue = (value) => {
        setnVId(value.value)
        setVendorDetail(value.label)
        setError({
            vendor: ''
        })
    }
    const changeMaterialMasterValue = (value) => {
        setnMId(value.value)
        setMaterialDetail(value.label)
        setError({
            MaterialDetail: ''
        })
    }
    const imageFile = (event) => {
        // setvPOFilePath(event.target.files[0])
        setvPOFilePathFile(event.target.files[0])
        setlocalImage(true)
        if (event.target.files[0]) {
            setimgPreview(true)
            const objectUrl = URL.createObjectURL(event.target.files[0])
            setPreview(objectUrl)
        } else {
            setimgPreview(false)
        }
    }
    const calculateAmount = (value, type) => {
        if (type == 'nQty') {
            setnQty(value)
            let amount = parseInt(value==''?0:value) * parseInt(nRate==''?0:nRate) 
            setnAmt(parseInt(amount==''?0:amount))
            setnTotalAmt(parseInt(amount==''?0:amount))
        }
        if (type == 'nRate') {
            setnRate(value)
            let amount = parseInt(value==''?0:value) * parseInt(nQty==''?0:nQty)
            setnAmt(parseInt(amount==''?0:amount))
            setnTotalAmt(parseInt(amount==''?0:amount))
        }
        if (type == 'nSGSTP') {
            setnSGSTP(value)
            let amount = parseInt(value==''?0:value) *  parseInt(nAmt==''?0:nAmt) / 100
            setnSGST(parseInt(amount==''?0:amount))
            setnTax(parseInt(amount==''?0:amount) + parseInt(nCGST==''?0:nCGST) + parseInt(nIGST==''?0:nIGST))
            setnTotalAmt( parseInt(nCGST==''?0:nCGST) + parseInt(nIGST==''?0:nIGST) + parseInt(nAmt==''?0:nAmt) + parseInt(amount==''?0:amount))
        }
        if (type == 'nCGSTP') {
            setnCGSTP(value)
            let amount = parseInt(value==''?0:value) *  parseInt(nAmt==''?0:nAmt) / 100
            setnCGST(parseInt(amount==''?0:amount))
            setnTax(parseInt(nSGST==''?0:nSGST) + parseInt(nIGST==''?0:nIGST) + parseInt(amount==''?0:amount))
            setnTotalAmt(parseInt(nSGST==''?0:nSGST) + parseInt(nIGST==''?0:nIGST) +  parseInt(nAmt==''?0:nAmt) + parseInt(amount==''?0:amount))
        }
        if (type == 'nIGSTP') {
            setnIGSTP(value)
            let amount = parseInt(value==''?0:value) * parseInt(nAmt) / 100
            setnIGST(parseInt(amount==''?0:amount))
            setnTax(parseInt(nSGST == '' ? 0 : nSGST) + parseInt(nCGST == '' ? 0 : nCGST) + parseInt(amount==''?0:amount))
            setnTotalAmt(parseInt(nSGST==''?0:nSGST) +parseInt(nCGST == '' ? 0 : nCGST) + parseInt(nAmt) + parseInt(amount==''?0:amount))
        }
    }
    const validateformPoDetial = () => {
        if (MaterialDetail == '' || MaterialDetail == undefined) {
            setError({
                MaterialDetail: 'Select Item *'
            })
            return false
        } else if (nQty == '' || nQty == undefined) {
            setError({
                Quan: 'Enter Qty *'
            })
            return false
        } else if (nAmt == '' || nAmt == undefined) {
            setError({
                amount: 'Enter Amount *'
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
                                poMasteerDetail[indexToUpdate].nPOId = parseInt(nPOId),
                                poMasteerDetail[indexToUpdate].nMId = parseInt(nMId),
                                poMasteerDetail[indexToUpdate].vMId = MaterialDetail,
                                poMasteerDetail[indexToUpdate].nQty = parseInt(nQty == '' ? 0 : nQty),
                                poMasteerDetail[indexToUpdate].nRate = parseInt(nRate == '' ? 0 : nRate),
                                poMasteerDetail[indexToUpdate].nAmt = parseInt(nAmt == '' ? 0 : nAmt),
                                poMasteerDetail[indexToUpdate].nSGSTP = parseInt(nSGSTP == '' ? 0 : nSGSTP),
                                poMasteerDetail[indexToUpdate].nSGST = parseInt(nSGST == '' ? 0 : nSGST),
                                poMasteerDetail[indexToUpdate].nCGSTP = parseInt(nCGSTP == '' ? 0 : nCGSTP),
                                poMasteerDetail[indexToUpdate].nCGST = parseInt(nCGST == '' ? 0 : nCGST),
                                poMasteerDetail[indexToUpdate].nIGSTP = parseInt(nIGSTP == '' ? 0 : nIGSTP),
                                poMasteerDetail[indexToUpdate].nIGST = parseInt(nIGST == '' ? 0 : nIGST),
                                poMasteerDetail[indexToUpdate].nTax = parseInt(nTax == '' ? 0 : nTax),
                                poMasteerDetail[indexToUpdate].nTotalAmt = parseInt(nTotalAmt == '' ? 0 : nTotalAmt)
                            console.log('koMonth', poMasteerDetail)
                            setPODetails(poMasteerDetail)
                            setbtnType('')
                            setnMId('')
                            setMaterialDetail('')
                            setnQty('')
                            setnRate('')
                            setnAmt('')
                            setnSGSTP('')
                            setnSGST('')
                            setnCGSTP('')
                            setnCGST('')
                            setnIGSTP('')
                            setnIGST('')
                            setnTax('')
                            setnTotalAmt('')
                            setEditId(null)
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
                    message: 'Do you want Edit this Material ?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                let poMasteerDetail = [...PODetails]
                                let findnMId=poMasteerDetail.find(e=>e.nMId==nMId)
                                if(findnMId){
                                    toast.success("Item is already Added")
                                }else{
                                    poMasteerDetail.push({
                                        id: new Date().getUTCMilliseconds(),
                                        nPOId: parseInt(nPOId),
                                        nMId: parseInt(nMId),
                                        MaterialDetail: MaterialDetail,
                                        nQty: parseInt(nQty == '' ? 0 : nQty),
                                        nRate: parseInt(nRate == '' ? 0 : nRate),
                                        nAmt: parseInt(nAmt == '' ? 0 : nAmt),
                                        nSGSTP: parseInt(nSGSTP == '' ? 0 : nSGSTP),
                                        nSGST: parseInt(nSGST == '' ? 0 : nSGST),
                                        nCGSTP: parseInt(nCGSTP == '' ? 0 : nCGSTP),
                                        nCGST: parseInt(nCGST == '' ? 0 : nCGST),
                                        nIGSTP: parseInt(nIGSTP == '' ? 0 : nIGSTP),
                                        nIGST: parseInt(nIGST == '' ? 0 : nIGST),
                                        nTax: parseInt(nTax == '' ? 0 : nTax),
                                        nTotalAmt: parseInt(nTotalAmt == '' ? 0 : nTotalAmt)
                                    })
                                    console.log('koMonth', poMasteerDetail)
                                    setPODetails(poMasteerDetail)
                                    setnMId('')
                                    setMaterialDetail('')
                                    setnQty('')
                                    setnRate('')
                                    setnAmt('')
                                    setnSGSTP('')
                                    setnSGST('')
                                    setnCGSTP('')
                                    setnCGST('')
                                    setnIGSTP('')
                                    setnIGST('')
                                    setnTax('')
                                    setnTotalAmt('')
                                    setEditId(null)
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
        if (startDate == undefined) {
            setError({
                date: 'Select Date *'
            })
            return false
        } else if (PlantDetail == '' || PlantDetail == undefined) {
            setError({
                plant: 'Select Plant *'
            })
            return false
        } else if (VendorDetail == '' || VendorDetail == undefined) {
            setError({
                vendor: 'Select Vendor *'
            })
            return false
        }else if (parseDateToString(new Date(startDate))?.length != 10) {
            setError({
                date: 'Invaild Date *'
            })
            return false
        } else {
            setError('')
            return true
        }

    }
    const submit = () => {
        if (validateform() == true) {
            if (PODetails.length > 0) {
                confirmAlert({
                    title: 'Alert !!',
                    message: 'Do you want Proceed ?',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                setLoader(true)
                                const POMasterData = [{
                                    nPOId: nPOId,
                                    vPONo: vPONo,
                                    dtPODated: parseDateToStringSubmit(new Date(startDate)),
                                    vPODesc: vPODesc,
                                    vCostCentre: CostCentre,
                                    vProfitCentre: ProfitCentre,
                                    vGLCode: vGLCode,
                                    vBusiness: vBusiness,
                                    nVId: parseInt(nVId),
                                    nPId: parseInt(nPId),
                                    vRemarks: vRemarks,
                                    btActive: btActive,
                                    vPOFilePath: vPOFilePath,
                                    nLoggedInUserId: parseInt(nLoggedInUserId)
                                }]
                                let PurchaseOrder = {}
                                PurchaseOrder.POMaster = POMasterData,
                                    PurchaseOrder.PODetails = PODetails
                                console.log('PurchaseOrder', PurchaseOrder)
                                POMasterPut(PurchaseOrder, vPOFilePathFile).then(res => {
                                    if (res) {
                                        setLoader(false)
                                        toast.success("PO Updated Successfully")
                                        navigate('/PurchaseOrder')
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


            } else {
                confirmAlert({
                    title: 'Alert !!',
                    message: 'Please Add at least one Material.',
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
            message: 'Do you want to delete ?',
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
    const editItem = (item) => {
        setbtnType('edit')
        setId(item.id)
        setEditId(item.id)
        setnMId(item.nMId)
        setMaterialDetail(item.MaterialDetail)
        setnQty(item.nQty)
        setnRate(item.nRate)
        setnAmt(item.nAmt)
        setnSGSTP(item.nSGSTP)
        setnSGST(item.nSGST)
        setnCGSTP(item.nCGSTP)
        setnCGST(item.nCGST)
        setnIGSTP(item.nIGSTP)
        setnIGST(item.nIGST)
        setnTax(item.nTax)
        setnTotalAmt(item.nTotalAmt)

    }
    const goback = () => {
        confirmAlert({
            title: 'Alert !!',
            closeOnClickOutside: false,
            message: 'Are you Sure ??',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { navigate('/PurchaseOrder') },
                },
                {
                    label: 'No',
                    onClick: () => { return null }
                }
            ]
        });

    }
    const refreshbtn = () => {
        setEditId(null)
        setnMId('')
        setMaterialDetail('')
        setnQty('')
        setnRate('')
        setnAmt('')
        setnSGSTP('')
        setnSGST('')
        setnCGSTP('')
        setnCGST('')
        setnIGSTP('')
        setnIGST('')
        setnTax('')
        setnTotalAmt('')
        setbtnType('')
    }
    return (
        <div className='citymasterContainer'>
            <div className='dateFilter-2'>
                <div className='displayflexend'>
                    <Box sx={{ width: '11%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                            sx={muiStyles.input}
                                value={vPONo}
                                onChange={e => setvPONo(e.target.value)}
                                required id="outlined-basic"
                                label="Purchase Order No."
                                variant="outlined"
                                name='vPONo'
                                inputRef={register({ required: "PO No. is required.*", })}
                                error={Boolean(errors.vPONo)}
                                helperText={errors.vPONo?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '11%' }} >
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Purchase Order Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={startDate}
                                        required
                                        onChange={handleChangeStartdate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.date != '' ? <p className='error'>{errorText.date}</p> : null}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '34%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={vPODesc}
                                onChange={e => setvPODesc(e.target.value)}
                                id="outlined-basic"
                                label="Purchase Order Description"
                                variant="outlined"
                                name='vPODesc'
                            // inputRef={register({ required: "PO Description is required.", })}
                            // error={Boolean(errors.vPODesc)}
                            // helperText={errors.vPODesc?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '18%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Plant</InputLabel>npm  */}
                            <Autocomplete
                            sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={PlantMaster}
                                value={PlantDetail}
                                // changePlantValue(value)
                                onChange={(event, value) => changePlantValue(value)}
                                // inputValue={inputValue}
                                onKeyDown={newInputValue => plantMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Plant " required />}
                            />
                            {errorText.plant != '' ? <p className='error'>{errorText.plant}</p> : null}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '11%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={String(CostCentre == undefined ? '' : CostCentre)}
                                // onChange={e => setBrandName(e.target.value)}
                                id="outlined-basic"
                                label="Cost Centre"
                                variant="outlined"
                                name='CostCentre'
                                disabled={true}
                            // inputRef={register({ required: "Cost Centre is required.*", })}
                            // error={Boolean(errors.CostCentre)}
                            // helperText={errors.CostCentre?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '11%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={String(ProfitCentre == undefined ? '' : ProfitCentre)}
                                // onChange={e => setBrandName(e.target.value)} 
                                id="outlined-basic"
                                label="Profit Centre"
                                disabled={true}
                                variant="outlined"
                                name='ProfitCentre'
                            // inputRef={register({ required: "Profit Centre is required.*", })}
                            // error={Boolean(errors.ProfitCentre)}
                            // helperText={errors.ProfitCentre?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '7%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={vGLCode}
                                onChange={e => setvGLCode(e.target.value)}
                                id="outlined-basic"
                                label="GL. Code"
                                variant="outlined"
                                name='GLCode'
                            // inputRef={register({ required: "GL. Code is required.*", })}
                            // error={Boolean(errors.GLCode)}
                            // helperText={errors.GLCode?.message}
                            />
                        </FormControl>
                    </Box>


                    <Box sx={{ width: '10%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel id="demo-simple-select-label" sx={muiStyles.InputLabels}>Business</InputLabel>
                            <Select
                            sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vBusiness}
                                label="Select Business"
                                onChange={handleChangePackUnit}
                                name='unitid'
                            // inputRef={register({ required: "Business is required.*", })}
                            // error={Boolean(errors.unitid)}
                            // helperText={errors.unitid?.message}
                            >
                                {/* {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                } */}
                                <MenuItem value='B1'>B1</MenuItem>
                                <MenuItem value='B2'>B2</MenuItem>
                                <MenuItem value='B3'>B3</MenuItem>
                                <MenuItem value='B4'>B4</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ width: '23%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Vendor</InputLabel> */}
                            <Autocomplete
                            sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={VendorMaster}
                                value={VendorDetail}
                                // inputValue={inputValue}
                                onChange={(event, value) => changeVendorMasterValue(value)}
                                onKeyDown={newInputValue => vendorMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Vendor" required />}
                            />
                            {errorText.vendor != '' ? <p className='error'>{errorText.vendor}</p> : null}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '37.5%' }} >
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


                    <Box sx={{ width: '13%' }} >
                        <div >
                            <InputLabel id="demo-simple-select-label" style={{ marginTop: 5, marginBottom: 5 }}>Attach PO</InputLabel>
                            <input type="file" name='vPOFilePath' onChange={imageFile} hidden ref={imageRef} />
                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                <button onClick={() => imageRef.current.click()} className='choosebtn'>Choose File</button>
                                {localImage == true ?
                                    <div style={{ flexDirection: 'row' }}>
                                        {imgpreview != false ?
                                            <a href={preview} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>PO Copy</a>
                                            : null
                                        }
                                    </div>
                                    :
                                    <div style={{ flexDirection: 'row' }}>
                                        {imgpreview != false ?
                                            <a href={imageUrl + '/' + preview} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>PO Copy</a>
                                            : null
                                        }
                                    </div>
                                }


                            </div>
                        </div>

                    </Box>
                    <FormGroup >
                        <FormControlLabel control={<Checkbox checked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" />
                    </FormGroup>
                </div>
            </div>
            <div className='databox'>
                <div className='data-form-box'>
                    <Box sx={{ width: '22%' }} >
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
                                onKeyDown={newInputValue => materialMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    // materialMaster_SelectAll_ActiveLikeSearch()
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Material Name" required />}
                            />
                            {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                        </FormControl>
                    </Box>
                    {/* {errorText != '' ?
                            <p style={{ color: 'red' }}>{errorText}</p>
                            :
                            null

                        } */}
                    <Box sx={{ width: '5%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nRate}
                                onChange={e => calculateAmount(e.target.value, 'nRate')}
                                required id="outlined-basic"
                                label="Rate"
                                variant="outlined"
                                name='rate'
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "rate is required.*", })}
                            // error={Boolean(errors.rate)}
                            // helperText={errors.rate?.message}
                            />
                            {errorText.amount != '' ? <p className='error'>{errorText.amount}</p> : null}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '6%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nQty}
                                onChange={e => calculateAmount(e.target.value, 'nQty')}
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
                    </Box>

                    <Box sx={{ width: '6%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nAmt}
                                onChange={e => setnAmt(e.target.value)}
                                id="outlined-basic"
                                label="Amount"
                                variant="outlined"
                                name='Amount'
                                type="number" inputProps={{ min: 4, max: 10 }}
                                disabled={true}
                            // inputRef={register({ required: "Amount is required.*", })}
                            // error={Boolean(errors.Amount)}
                            // helperText={errors.Amount?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '6.5%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nSGSTP}
                                onChange={e => calculateAmount(e.target.value, 'nSGSTP')}
                                id="outlined-basic"
                                label="SGST (%)"
                                variant="outlined"
                                name='SGSTin'
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "SGST in % is required.*", })}
                            // error={Boolean(errors.SGSTin)}
                            // helperText={errors.SGSTin?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '5%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nSGST}
                                onChange={e => setnSGST(e.target.value)}
                                id="outlined-basic"
                                label="SGST"
                                variant="outlined"
                                name='sGST'
                                disabled={true}
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "SGST is required.*", })}
                            // error={Boolean(errors.sGST)}
                            // helperText={errors.sGST?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '6.5%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nCGSTP}
                                onChange={e => calculateAmount(e.target.value, 'nCGSTP')}
                                id="outlined-basic"
                                label="CGST (%)"
                                variant="outlined"
                                name='CGSTin'
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "CGST in % is required.*", })}
                            // error={Boolean(errors.CGSTin)}
                            // helperText={errors.CGSTin?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '5%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nCGST}
                                onChange={e => setnCGST(e.target.value)}
                                id="outlined-basic"
                                label="CGST"
                                variant="outlined"
                                name='cGST'
                                disabled={true}
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "CGST is required.*", })}
                            // error={Boolean(errors.cGST)}
                            // helperText={errors.cGST?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '6.5%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nIGSTP}
                                onChange={e => calculateAmount(e.target.value, 'nIGSTP')}
                                id="outlined-basic"
                                label="IGST (%)"
                                variant="outlined"
                                name='IGSTin'
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "IGST in % is required.*", })}
                            // error={Boolean(errors.IGSTin)}
                            // helperText={errors.IGSTin?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '5%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nIGST}
                                onChange={e => setnIGST(e.target.value)}
                                id="outlined-basic"
                                label="IGST"
                                variant="outlined"
                                name='iGST'
                                type="number" inputProps={{ min: 4, max: 10 }}
                                disabled={true}
                            // inputRef={register({ required: "IGST is required.*", })}
                            // error={Boolean(errors.iGST)}
                            // helperText={errors.iGST?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '6%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nTax}
                                onChange={e => setnTax(e.target.value)}
                                id="outlined-basic"
                                label="Total Tax"
                                variant="outlined"
                                name='Tax'
                                disabled={true}
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "Total Tax is required.*", })}
                            // error={Boolean(errors.Tax)}
                            // helperText={errors.Tax?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '9%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nTotalAmt}
                                onChange={e => setnTotalAmt(e.target.value)}
                                required id="outlined-basic"
                                label="Total Amount"
                                variant="outlined"
                                name='TotalAmount'
                                disabled={true}
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "Total Amount is required.*", })}
                            // error={Boolean(errors.brandName5)}
                            // helperText={errors.brandName5?.message}
                            />
                        </FormControl>
                    </Box>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between', width: '100%', }}>
                        <button title='Add' className='addbtn' onClick={addKoMonthDate}>{btnType == 'edit' ? 'Update' : <AddIcon fontSize='large' />}</button>

                        <button title='Refresh' className='addbtn' onClick={refreshbtn}><ReplayIcon fontSize='large' /></button>
                    </div>
                </div>
                <div className='tablecenter'>
                    {PODetails.length > 0 ?
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="row">SN.</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Material Name</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Quantity</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Rate</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Amount</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>SGST (%)</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>SGST </TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>CGST (%)</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>CGST</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>IGST (%)</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>IGST</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Total Tax</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Total Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {PODetails.map((item, index) => {
                                            return (
                                                <TableRow key={index} style={item.id==EditId?{background:'rgba(239,30,44,0.15)'}:{background:'#fff'}}>
                                                    <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                    <TableCell align="center">
                                                        <button className='deletbtn' title='Delete' onClick={() => deleteItem(item.id)}><DeleteIcon size={20} color='red' /></button>
                                                        <button className='deletbtn' title='Edit' onClick={() => editItem(item)}><BorderColorIcon size={20} color='#000' /></button>

                                                    </TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.MaterialDetail}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nQty}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nRate}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nAmt}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nSGSTP}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nSGST}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nCGSTP}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nCGST}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nIGSTP}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nIGST}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nTax}</TableCell>
                                                    <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nTotalAmt}</TableCell>


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
export default EditPurchaseOrder