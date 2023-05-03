import React, { useEffect, useRef, useState, useStateDebounced } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { TableFooter } from "@material-ui/core";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { BrandMaster_SelectAll, BrandMasterPost, BrandMasterPut, } from '../BrandMaster/BrandMasterService'
import { UnitMaster_SelectAll } from '../PackMaster/PackMasterService'
import { GetBOMDetailsLIkeSearch } from '../BOMMaster/BomMasteerService'
import { PlantMaster_SelectAll_ActiveLikeSearch } from '../PlantMaster/PlantMasterService'
import { VendorMaster_SelectAll_ActiveLikeSearch, VendorMaster_SelectAll_Active } from '../VenderForm/VenderFormService'
import { GetPODetails, GetPOByPOId } from '../PurchaseOrder/POMasterService'
import { POMasterPost, GetPODetailsLIkeSearch, MaterialMasterForGRN_SelectAll_ActiveLikeSearch } from './GRNReceivedService'
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
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { number } from 'prop-types';
import { Navigation } from '@coreui/coreui';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
function AddGRNReceived() {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
    const [monthmodalIsOpen, setmonthmodalIsOpen] = React.useState(false);
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
    const [dtGateEntryDate, setdtGateEntryDate] = React.useState(dayjs(endDates));
    const [dtPaymentReceiveDate, setdtPaymentReceiveDate] = React.useState(dayjs(endDates));
    const [PODetails, setPODetails] = React.useState([]);
    const [weekNumberId, setWeekNumberId] = React.useState('');
    const [nLoggedInUserId, setnLoggedInUserId] = React.useState('');
    const [GrnData, setGrnData] = React.useState([]);
    const [errorText, setError] = React.useState({
        plant: '',
        vendor: '',
        grndate: '',
        date: '',
        inDate: '',
        gtDate: '',
        prDate: '',
        mfDate: '',
        exDate: '',
        MaterialDetail: '',
        Quan: '',
        amount: '',
        QuanAccept: '',
        QuanReject: '',
        Freight: '',

    });
    const [unitid, setUnitid] = React.useState('');
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState('')
    const [btnType, setbtnType] = useState('')
    const [imgpreview, setimgPreview] = useState(false)
    const imageRef = useRef(null)
    const [alert, setAlert] = React.useState({
        type: 'error',
        text: 'This is a alert message',
        show: false
    })
    const [vMId, setvMId] = useState('')
    const [vVehicleNo, setvVehicleNo] = useState('')
    const [vInvoiceNo, setvInvoiceNo] = useState('')
    const [vTransportName, setvTransportName] = useState('')
    const [nPOId, setnPOId] = useState('')
    const [vLorryRecNo, setvLorryRecNo] = useState('')
    const [vEWayBillNo, setvEWayBillNo] = useState('')
    const [vBatchNo, setvBatchNo] = useState('')
    const [btCOAReceived, setbtCOAReceived] = useState(false)
    const [vGRNCopyFilePath, setvGRNCopyFilePath] = useState('')
    const [vCourierToCCIPL, setvCourierToCCIPL] = useState('')
    const [vCourierDocketNo, setvCourierDocketNo] = useState('')
    const [nPoQtyAccepted, setnPoQtyAccepted] = useState('')
    const [BalanceQuantity, setBalanceQuantity] = useState('')
    const [AllTotalAmount, setAllTotalAmount] = useState('')
    const [nQtyAccepted, setnQtyAccepted] = useState('')
    const [nQtyRejected, setnQtyRejected] = useState('')
    const [dtMfgDate, setdtMfgDate] = useState(dayjs(startDates))
    const [dtExpDate, setdtExpDate] = useState(dayjs(startDates))
    const [nFreight, setnFreight] = useState('')
    const [nGrandTotal, setnGrandTotal] = useState('')
    const [nNetTotalAmt, setnNetTotalAmt] = useState('')
    const [EditId, setEditId] = useState('')
    const [FirstTimeAdd, setFirstTimeAdd] = React.useState(true);
    useEffect(() => {
        const userId = localStorage.getItem("nUserId")
        setnLoggedInUserId(userId)
    }, [])
    const handleChangePackUnit = (event) => {
        setvBusiness(event.target.value);
        let item = MaterialMaster.find(e => e.nMId == event.target.value)
        setId(item.id)
        setnMId(item.nMId)
        setvMId(item.MaterialDetail)
        setMaterialDetail(item.MaterialDetail)
        setnQty(item.nQty)
        setnPoQtyAccepted(item.nQty)
        setBalanceQuantity(item.BalanceQuantity)
        setnRate(item.nRate)
        setnAmt(item.nAmt)
        setnSGSTP(item.nSGSTP)
        setnSGST(item.nSGST)
        setnCGSTP(item.nCGSTP)
        setnCGST(item.nCGST)
        setnIGSTP(item.nIGSTP)
        setnIGST(item.nIGST)
        setnTax(item.nTax)
        setnGrandTotal(item.nTotalAmt)
        setnNetTotalAmt(parseInt(item.nTotalAmt))
    };
    const handleChangeStartdate = (newValue) => {
        setStartDate(newValue);
        setError({
            date: ''
        })
    };
    const handleChangeEndtdate = (newValue) => {
        setEndDate(newValue);
        setError({
            date: ''
        })
    };
    const handleChangedtGateEntryDate = (newValue) => {
        setdtGateEntryDate(newValue);
        setError({
            date: ''
        })
    };
    const handleChangedtdtPaymentReceiveDate = (newValue) => {
        setdtPaymentReceiveDate(newValue);
        setError({
            date: ''
        })
    };
    const handleChangedtMfgDate = (newValue) => {
        setdtMfgDate(newValue);
        setError({
            date: ''
        })
    };
    const handleChangedtExpDate = (newValue) => {
        setdtExpDate(newValue);
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
    const getPODetails = (vGeneric) => {
        // if (vGeneric != '') {
        //     vGeneric = vGeneric.target.value
        // } else {
        //     vGeneric = null
        // }
        GetPODetailsLIkeSearch(vGeneric == undefined || vGeneric == '' ? null : vGeneric.target.value).then(res => {
            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nPOId,
                    label: res[i].PODetail,
                })

            }
            setPlantMaster(data)
        })
    }
    const getMaterialMasterForGRN_SelectAll_ActiveLikeSearch = (nPOId, vGeneric) => {
        MaterialMasterForGRN_SelectAll_ActiveLikeSearch(nPOId, vGeneric == undefined || vGeneric == '' ? null : vGeneric.target.value).then(res => {
            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nMId,
                    label: res[i].MaterialDetail,
                    nPOId: res[i].nPOId,
                    nQty: res[i].nQty,
                    BalanceQuantity: res[i].BalanceQuantity,
                    nRate: res[i].nRate,
                    nAmt: res[i].nAmt,
                    nSGSTP: res[i].nSGSTP,
                    nSGST: res[i].nSGST,
                    nCGSTP: res[i].nCGSTP,
                    nCGST: res[i].nCGST,
                    nIGSTP: res[i].nIGSTP,
                    nIGST: res[i].nIGST,
                    nTax: res[i].nTax,
                    nTotalAmt: res[i].nTotalAmt,
                })

            }
            setMaterialMaster(data)
        })
    }

    const getPOByPOId = (nPOId) => {
        GetPOByPOId(nPOId).then(res => {
            console.log('response', res)
            // let count = Object.keys(res.PODetail).length
            // let data = []
            // for (var i = 0; i < count; i++) {
            //     data.push({
            //         value: res[i].nMId,
            //         label: res[i].MatDetail,
            //     })

            // }
            setMaterialMaster(res.PODetail)

        })

    }

    const changePlantValue = (value) => {
        if (FirstTimeAdd == true) {
            setnPOId(value.value)
            setPlantDetail(value.label)
            getMaterialMasterForGRN_SelectAll_ActiveLikeSearch(value.value, '')
            setCostCentre(value.vCostCentre)
            setProfitCentre(value.vProfitCentre)
            setError({
                plant: ''
            })
            setFirstTimeAdd(false)
        } else {
            confirmAlert({
                title: 'Alert !!',
                closeOnClickOutside: false,
                message: 'You are going to change the Plant of this transaction. In case you change it, all the below selections done will be removed. Do you still want to proceed ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            setnPOId(value.value)
                            setPlantDetail(value.label)
                            getMaterialMasterForGRN_SelectAll_ActiveLikeSearch(value.value, '')
                            setCostCentre(value.vCostCentre)
                            setProfitCentre(value.vProfitCentre)
                            setError({
                                plant: ''
                            })
                            setnMId('')
                            setMaterialDetail('')
                            setnQty('')
                            setBalanceQuantity('')
                            setnRate('')
                            setnAmt('')
                            setnSGSTP('')
                            setnSGST('')
                            setnCGSTP('')
                            setnCGST('')
                            setnIGSTP('')
                            setnIGST('')
                            setnTax('')
                            setnGrandTotal('')
                            setdtMfgDate(new Date(Date.now()))
                            setdtExpDate(new Date(Date.now()))
                            setnFreight('')
                            setnPoQtyAccepted('')
                            setnQtyAccepted('')
                            setnQtyRejected('')
                            setvBusiness('')
                            setnNetTotalAmt('')
                            setAllTotalAmount('')
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
    }
    const changeMaterialValue = (item) => {
        setId(item.id)
        setnMId(item.value)
        setvMId(item.label)
        setMaterialDetail(item.label)
        setnQty(item.nQty)
        setnPoQtyAccepted(item.nQty)
        setBalanceQuantity(item.BalanceQuantity)
        setnRate(item.nRate)
        setnAmt(item.nAmt)
        setnSGSTP(item.nSGSTP)
        setnSGST(item.nSGST)
        setnCGSTP(item.nCGSTP)
        setnCGST(item.nCGST)
        setnIGSTP(item.nIGSTP)
        setnIGST(item.nIGST)
        setnTax(item.nTax)
        setnGrandTotal(item.nTotalAmt)
        setnNetTotalAmt(parseInt(item.nTotalAmt))
        setError({
            MaterialDetail: ''
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
        setvPOFilePath(event.target.files[0])
        if (event.target.files[0]) {
            setimgPreview(true)
            const objectUrl = URL.createObjectURL(event.target.files[0])
            setPreview(objectUrl)
        } else {
            setimgPreview(false)
        }
    }
    const calculateAmount = (value, type) => {
        // if (type == 'nQty') {
        //     setnQty(value)
        //     setnQtyRejected(value)
        //     setnAmt(0)
        //     setnRate(0)
        //     setnSGSTP(0)
        //     setnSGST(0)
        //     setnCGSTP(0)
        //     setnCGST(0)
        //     setnIGSTP(0)
        //     setnIGST(0)
        //     setnTax(0)
        //     setnTotalAmt(0)
        //     setnFreight(0)
        //     setnPoQtyAccepted(0)
        //     setnQtyAccepted(0)
        //     setnQtyRejected(0)
        //     setnGrandTotal(0)
        //     setnNetTotalAmt(0)
        //     let amount = value * nRate
        //     setnAmt(parseInt(amount))
        //     setnGrandTotal(parseInt(amount))
        //     setnNetTotalAmt(parseInt(amount) + parseInt(nFreight == '' ? 0 : nFreight))
        // }
        if (type == 'nQtyAccepted') {
            setnQtyAccepted(value)
            setnAmt(0)
            let amount = parseInt(value == '' ? 0 : value) + parseInt(nQtyRejected == '' ? 0 : nQtyRejected)
            const FinalAmount = amount * nRate
            setnAmt(parseInt(FinalAmount))
            setnGrandTotal(parseInt(FinalAmount) + parseInt(nSGST) + parseInt(nCGST) + parseInt(nIGST))
            setnNetTotalAmt(parseInt(FinalAmount) + parseInt(nSGST) + parseInt(nCGST) + parseInt(nIGST) + parseInt(nFreight == '' ? 0 : nFreight))
            if (amount > BalanceQuantity) {
                console.log('1')
                setTimeout(() => {
                    checkbalanceQty('nQtyAccepted')
                }, 2000)

            }
        }

        if (type == 'nQtyRejected') {
            setnQtyRejected(value)
            let amount = parseInt(value == '' ? 0 : value) + parseInt(nQtyAccepted == '' ? 0 : nQtyAccepted)
            const FinalAmount = amount * nRate
            setnAmt(parseInt(FinalAmount))
            setnGrandTotal(parseInt(FinalAmount) + parseInt(nSGST) + parseInt(nCGST) + parseInt(nIGST))
            setnNetTotalAmt(parseInt(FinalAmount) + parseInt(nSGST) + parseInt(nCGST) + parseInt(nIGST) + parseInt(nFreight == '' ? 0 : nFreight))
            if (amount > BalanceQuantity) {
                console.log('1')
                setTimeout(() => {
                    checkbalanceQty('nQtyRejected')
                }, 2000)

            }
        }
        if (type == 'nRate') {
            setnRate(value)
            let amount = parseInt(nQtyAccepted) + parseInt(nQtyRejected)
            const FinalAmount = parseInt(value == '' ? 0 : value) * parseInt(amount)
            setnAmt(parseInt(FinalAmount))
            setnGrandTotal(parseInt(FinalAmount) + parseInt(nSGST) + parseInt(nCGST) + parseInt(nIGST))
            setnNetTotalAmt(parseInt(FinalAmount) + parseInt(nSGST) + parseInt(nCGST) + parseInt(nIGST) + parseInt(nFreight == '' ? 0 : nFreight))
        }

        if (type == 'nSGSTP') {
            setnSGSTP(value)
            let amount = value == '' ? 0 : value * nAmt / 100
            setnSGST(parseInt(amount))
            setnTax(parseInt(amount) + parseInt(nCGST) + parseInt(nIGST))
            setnGrandTotal(parseInt(nCGST) + parseInt(nIGST) + parseInt(nAmt) + parseInt(amount))
            setnNetTotalAmt(parseInt(nCGST) + parseInt(nIGST) + parseInt(nAmt) + parseInt(amount) + parseInt(nFreight == '' ? 0 : nFreight))
        }
        if (type == 'nCGSTP') {
            setnCGSTP(value)
            let amount = value == '' ? 0 : value * nAmt / 100
            setnCGST(parseInt(amount))
            setnTax(parseInt(nSGST) + parseInt(nIGST) + parseInt(amount))
            setnGrandTotal(parseInt(nSGST) + parseInt(nIGST) + parseInt(nAmt) + parseInt(amount))
            setnNetTotalAmt(parseInt(nSGST) + parseInt(nIGST) + parseInt(nAmt) + parseInt(amount) + parseInt(nFreight == '' ? 0 : nFreight))
        }
        if (type == 'nIGSTP') {
            setnIGSTP(value)
            let amount = value == '' ? 0 : value * nAmt / 100
            setnIGST(parseInt(amount))
            console.log('parseInt(nSGST) + parseInt(nCGST) + parseInt(amount)', parseInt(nSGST == undefined ? 0 : nSGST), parseInt(nCGST == undefined ? 0 : nCGST), parseInt(amount))
            setnTax(parseInt(nSGST == NaN ? 0 : nSGST) + parseInt(nCGST == NaN ? 0 : nCGST) + parseInt(amount))
            setnGrandTotal(parseInt(nSGST) + parseInt(nCGST) + parseInt(nAmt) + parseInt(amount))
            setnNetTotalAmt(parseInt(nSGST) + parseInt(nCGST) + parseInt(nAmt) + parseInt(amount) + parseInt(nFreight == '' ? 0 : nFreight))
        }
        if (type == 'nFreight') {
            setnFreight(value)
            // let amount = value + nTotalAmt
            setnNetTotalAmt(parseInt(value == '' ? 0 : value) + parseInt(nGrandTotal))
        }
    }
    const validateformPoDetial = () => {
        if (nMId == '' || nMId == undefined) {
            setError({
                MaterialDetail: 'Select Item *'
            })
            return false
        } else if (nQtyAccepted == '' || nQtyAccepted == undefined) {
            setError({
                QuanAccept: 'Enter Qty Accepted *'
            })
            return false
        } else if (nQtyRejected == '' || nQtyRejected == undefined) {
            setError({
                QuanReject: 'Enter Qty Rejected *'
            })
            return false
        } else if (nRate == '' || nRate == undefined) {
            setError({
                amount: 'Enter Rate *'
            })
            return false
        }else if (parseDateToString(new Date(dtMfgDate))?.length != 10) {
            setError({
                mfDate: 'Invaild Date *'
            })
            return false
        }else if (parseDateToString(new Date(dtExpDate))?.length != 10) {
            setError({
                exDate: 'Invaild Date *'
            })
            return false
        }
        else {
            setError({
                QuanReject: '',
                MaterialDetail: '',
                QuanAccept: '',
                amount: '',
            })
            return true
        }

    }
    const checkbalanceQty = (type) => {
        if (type == 'nQtyAccepted') {
            confirmAlert({
                title: 'Alert !!',
                message: 'Qty. Accepted + Qty. Rejected should not be greater than Bal. Qty.',
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => {
                            setnQtyAccepted('')
                        },
                    },
                ]
            });

        }
        if (type == 'nQtyRejected') {
            confirmAlert({
                title: 'Alert !!',
                message: 'Qty. Accepted + Qty. Rejected should not be greater than Bal. Qty.',
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => {
                            setnQtyRejected('')
                        },
                    },
                ]
            });

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
                                poMasteerDetail[indexToUpdate].nPOId = parseInt(nPOId),
                                poMasteerDetail[indexToUpdate].MaterialDetail = MaterialDetail,
                                poMasteerDetail[indexToUpdate].nQty = parseInt(nQty == '' ? 0 : nQty),
                                poMasteerDetail[indexToUpdate].BalanceQuantity = parseInt(BalanceQuantity == '' ? 0 : BalanceQuantity),
                                poMasteerDetail[indexToUpdate].nQtyAccepted = parseInt(nQtyAccepted == '' ? 0 : nQtyAccepted),
                                poMasteerDetail[indexToUpdate].nQtyRejected = parseInt(nQtyRejected == '' ? 0 : nQtyRejected),
                                poMasteerDetail[indexToUpdate].nRate = parseInt(nRate == '' ? 0 : nRate),
                                poMasteerDetail[indexToUpdate].dtMfgDate = parseDateToStringSubmit(new Date(dtMfgDate)),
                                poMasteerDetail[indexToUpdate].dtExpDate = parseDateToStringSubmit(new Date(dtExpDate)),
                                poMasteerDetail[indexToUpdate].dtMfgDate1 = dtMfgDate,
                                poMasteerDetail[indexToUpdate].dtExpDate2 = dtExpDate,
                                poMasteerDetail[indexToUpdate].nAmt = parseInt(nAmt == '' ? 0 : nAmt),
                                poMasteerDetail[indexToUpdate].nSGSTP = parseInt(nSGSTP == '' ? 0 : nSGSTP),
                                poMasteerDetail[indexToUpdate].nSGST = parseInt(nSGST == '' ? 0 : nSGST),
                                poMasteerDetail[indexToUpdate].nCGSTP = parseInt(nCGSTP == '' ? 0 : nCGSTP),
                                poMasteerDetail[indexToUpdate].nCGST = parseInt(nCGST == '' ? 0 : nCGST),
                                poMasteerDetail[indexToUpdate].nIGSTP = parseInt(nIGSTP == '' ? 0 : nIGSTP),
                                poMasteerDetail[indexToUpdate].nIGST = parseInt(nIGST == '' ? 0 : nIGST),
                                poMasteerDetail[indexToUpdate].nTax = parseInt(nTax == '' ? 0 : nTax),
                                // poMasteerDetail[indexToUpdate].nTotalAmt = parseInt(nTotalAmt == '' ? 0 : nTotalAmt),
                                poMasteerDetail[indexToUpdate].nGrandTotal = parseInt(nGrandTotal == '' ? 0 : nGrandTotal),
                                poMasteerDetail[indexToUpdate].nFreight = parseInt(nFreight == '' ? 0 : nFreight),
                                poMasteerDetail[indexToUpdate].nNetTotalAmt = parseInt(nNetTotalAmt == '' ? 0 : nNetTotalAmt)
                            let count = Object.keys(poMasteerDetail).length
                            let data = 0
                            for (var i = 0; i < count; i++) {
                                data = data + poMasteerDetail[i].nNetTotalAmt
                            }
                            setAllTotalAmount(data)
                            console.log('koMonth', data)
                            setPODetails(poMasteerDetail)
                            setbtnType('')
                            setnMId('')
                            setMaterialDetail('')
                            setnQty('')
                            setnRate('')
                            setdtMfgDate(new Date(Date.now()))
                            setdtExpDate(new Date(Date.now()))
                            setnAmt('')
                            setnSGSTP('')
                            setnSGST('')
                            setnCGSTP('')
                            setnCGST('')
                            setnIGSTP('')
                            setnIGST('')
                            setnTax('')
                            setnTotalAmt('')
                            setnFreight('')
                            setnPoQtyAccepted('')
                            setnQtyAccepted('')
                            setnQtyRejected('')
                            setvBusiness('')
                            setnGrandTotal('')
                            setnNetTotalAmt('')
                            setBalanceQuantity('')
                            setEditId(null)

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
                message: 'Do you want Add this Material ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            if (validateformPoDetial() == true) {
                                let poMasteerDetail = [...PODetails]
                                let findnMId = poMasteerDetail.find(e => e.nMId == nMId)
                                if (findnMId) {
                                    toast.success("Material is already Added.")
                                } else {
                                    poMasteerDetail.push({
                                        id: new Date().getUTCMilliseconds(),
                                        nMId: parseInt(nMId),
                                        nPOId: parseInt(nPOId),
                                        MaterialDetail: MaterialDetail,
                                        nQty: parseInt(nQty == '' ? 0 : nQty),
                                        BalanceQuantity: parseInt(BalanceQuantity == '' ? 0 : BalanceQuantity),
                                        nQtyAccepted: parseInt(nQtyAccepted == '' ? 0 : nQtyAccepted),
                                        nQtyRejected: parseInt(nQtyRejected == '' ? 0 : nQtyRejected),
                                        nRate: parseInt(nRate == '' ? 0 : nRate),
                                        dtMfgDate: parseDateToStringSubmit(new Date(dtMfgDate)),
                                        dtExpDate: parseDateToStringSubmit(new Date(dtExpDate)),
                                        dtMfgDate1: dtMfgDate,
                                        dtExpDate2: dtExpDate,
                                        nTotalAmount: parseInt(nAmt == '' ? 0 : nAmt),
                                        nSGSTP: parseInt(nSGSTP == '' ? 0 : nSGSTP),
                                        nSGST: parseInt(nSGST == '' ? 0 : nSGST),
                                        nCGSTP: parseInt(nCGSTP == '' ? 0 : nCGSTP),
                                        nCGST: parseInt(nCGST == '' ? 0 : nCGST),
                                        nIGSTP: parseInt(nIGSTP == '' ? 0 : nIGSTP),
                                        nIGST: parseInt(nIGST == '' ? 0 : nIGST),
                                        nTax: parseInt(nTax == '' ? 0 : nTax),
                                        nGrandTotal: parseInt(nGrandTotal == '' ? 0 : nGrandTotal),
                                        nFreight: parseInt(nFreight == '' ? 0 : nFreight),
                                        nNetTotalAmt: parseInt(nNetTotalAmt == '' ? 0 : nNetTotalAmt)
                                    })
                                    let count = Object.keys(poMasteerDetail).length
                                    let data = 0
                                    for (var i = 0; i < count; i++) {
                                        data = data + poMasteerDetail[i].nNetTotalAmt
                                    }
                                    setAllTotalAmount(data)
                                    console.log('koMonth', data)
                                    setPODetails(poMasteerDetail)
                                    setnMId('')
                                    setMaterialDetail('')
                                    setnQty('')
                                    setnRate('')
                                    setdtMfgDate(new Date(Date.now()))
                                    setdtExpDate(new Date(Date.now()))
                                    setnAmt('')
                                    setnSGSTP('')
                                    setnSGST('')
                                    setnCGSTP('')
                                    setnCGST('')
                                    setnIGSTP('')
                                    setnIGST('')
                                    setnTax('')
                                    setnTotalAmt('')
                                    setnFreight('')
                                    setnPoQtyAccepted('')
                                    setnQtyAccepted('')
                                    setnQtyRejected('')
                                    setvBusiness('')
                                    setnGrandTotal('')
                                    setnNetTotalAmt('')
                                    setBalanceQuantity('')
                                    setEditId(null)
                                }
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
    const validateform = () => {
        if (startDate == undefined) {
            setError({
                date: 'Select GRN Date *'
            })
            return false
        } else if (endDate == undefined) {
            setError({
                endDate: 'Select Invoce Date *'
            })
            return false
        } else if (nPOId == '') {
            setError({
                plant: 'Select PO No. *'
            })
            return false
        }else if (parseDateToString(new Date(startDate))?.length != 10) {
            setError({
                sdate: 'Invaild Date *'
            })
            return false
        }else if (parseDateToString(new Date(endDate))?.length != 10) {
            setError({
                edate: 'Invaild Date *'
            })
            return false
        }else if (parseDateToString(new Date(dtGateEntryDate))?.length != 10) {
            setError({
                gtDate: 'Invaild Date *'
            })
            return false
        }else if (parseDateToString(new Date(dtPaymentReceiveDate))?.length != 10) {
            setError({
                prDate: 'Invaild Date *'
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
                                    vInvoiceNo: vInvoiceNo,
                                    dtGRNDate: parseDateToStringSubmit(new Date(startDate)),
                                    dtInvDate: parseDateToStringSubmit(new Date(endDate)),
                                    vVehicleNo: vVehicleNo,
                                    vTransportName: vTransportName,
                                    nPOId: nPOId,
                                    vLorryRecNo: vLorryRecNo,
                                    vEWayBillNo: vEWayBillNo,
                                    vBatchNo: vBatchNo,
                                    btCOAReceived: btCOAReceived,
                                    dtGateEntryDate: parseDateToStringSubmit(new Date(dtGateEntryDate)),
                                    vCourierToCCIPL: vCourierToCCIPL,
                                    vCourierDocketNo: vCourierDocketNo,
                                    dtPaymentReceiveDate: parseDateToStringSubmit(new Date(dtPaymentReceiveDate)),
                                    vRemarks: vRemarks,
                                    btActive: true,
                                    vGRNCopyFilePath: '',
                                    nLoggedInUserId: parseInt(nLoggedInUserId),
                                }]
                                let GRNOrder = {}
                                GRNOrder.GRNMaster = POMasterData,
                                    GRNOrder.GRNDetails = PODetails
                                console.log('PurchaseOrder', GRNOrder)
                                POMasterPost(GRNOrder, vPOFilePath).then(res => {
                                    console.log('res', res)
                                    if (res?.length > 0) {
                                        setGrnData(res)
                                        setmonthmodalIsOpen(true)
                                        setLoader(false)
                                    } else {
                                        setLoader(false)
                                        toast.success("Record Added Successfully !!")
                                        navigate('/GRNReceived')
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
        setnQty(parseInt(item.nQty))
        setBalanceQuantity(parseInt(item.BalanceQuantity))
        setnRate(item.nRate)
        setnAmt(item.nTotalAmount)
        setnSGSTP(item.nSGSTP)
        setnSGST(item.nSGST)
        setnCGSTP(item.nCGSTP)
        setnCGST(item.nCGST)
        setnIGSTP(item.nIGSTP)
        setnIGST(item.nIGST)
        setnTax(item.nTax)
        setnGrandTotal(item.nGrandTotal)
        setdtMfgDate(item.dtMfgDate1)
        setdtExpDate(item.dtExpDate2)
        setnFreight(item.nFreight)
        setnPoQtyAccepted(item.nQty)
        setnQtyAccepted(item.nQtyAccepted)
        setnQtyRejected(item.nQtyRejected)
        setvBusiness(item.nMId)
        setnNetTotalAmt(item.nNetTotalAmt)
    }
    const goback = () => {
        confirmAlert({
            title: 'Alert !!',
            closeOnClickOutside: false,
            message: 'Are you Sure ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { navigate('/GRNReceived') },
                },
                {
                    label: 'No',
                    onClick: () => { return null }
                }
            ]
        });
    }
    const closeModal = () => {
        setmonthmodalIsOpen(false)
        navigate('/GRNReceived')
    }
    const refreshbtn = () => {
        setEditId(null)
        setnMId('')
        setMaterialDetail('')
        setnQty('')
        setBalanceQuantity('')
        setnRate('')
        setnAmt('')
        setnSGSTP('')
        setnSGST('')
        setnCGSTP('')
        setnCGST('')
        setnIGSTP('')
        setnIGST('')
        setnTax('')
        setnGrandTotal('')
        setdtMfgDate(new Date(Date.now()))
        setdtExpDate(new Date(Date.now()))
        setnFreight('')
        setnPoQtyAccepted('')
        setnQtyAccepted('')
        setnQtyRejected('')
        setvBusiness('')
        setnNetTotalAmt('')
        setbtnType('')
    }
    return (
        <div className='citymasterContainer'>
            <div className='dateFilter-2'>
                <div className='displayflexend mt-2'>
                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vInvoiceNo}
                                onChange={e => setvInvoiceNo(e.target.value)}
                                required id="outlined-basic"
                                label="Invoice No."
                                variant="outlined"
                                name='InvoiceNo'
                                inputRef={register({ required: "Invoice No. is required.*", })}
                                error={Boolean(errors.InvoiceNo)}
                                helperText={errors.InvoiceNo?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="GRN Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={startDate}
                                        required
                                        maxDate={toDates}
                                        onChange={handleChangeStartdate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.sdate != '' ? <p className='error'>{errorText.sdate}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Invoice Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={endDate}
                                        required
                                        maxDate={toDates}
                                        onChange={handleChangeEndtdate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.edate != '' ? <p className='error'>{errorText.edate}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-38' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vVehicleNo}
                                onChange={e => setvVehicleNo(e.target.value)}
                                id="outlined-basic"
                                label="Vehicle No"
                                variant="outlined"
                                name='vPODesc'
                            // inputRef={register({ required: "PO Description is required.", })}
                            // error={Boolean(errors.vPODesc)}
                            // helperText={errors.vPODesc?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-39' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vTransportName}
                                onChange={e => setvTransportName(e.target.value)}
                                id="outlined-basic"
                                label="Transport Name"
                                variant="outlined"
                                name='vPODesc'
                            // inputRef={register({ required: "PO Description is required.", })}
                            // error={Boolean(errors.vPODesc)}
                            // helperText={errors.vPODesc?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-32'>
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
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                onKeyDown={newInputValue => getPODetails(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Search PO No. " required />}
                            />
                            {errorText.plant != '' ? <p className='error'>{errorText.plant}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-38' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vLorryRecNo}
                                onChange={e => setvLorryRecNo(e.target.value)}
                                id="outlined-basic"
                                label="Lorry Rec No"
                                variant="outlined"
                                name='vLorryRecNo'

                            // inputRef={register({ required: "Cost Centre is required.*", })}
                            // error={Boolean(errors.CostCentre)}
                            // helperText={errors.CostCentre?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-33'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vEWayBillNo}
                                onChange={e => setvEWayBillNo(e.target.value)}
                                id="outlined-basic"
                                label="EWay Bill No"

                                variant="outlined"
                                name='vEWayBillNo'
                            // inputRef={register({ required: "Profit Centre is required.*", })}
                            // error={Boolean(errors.ProfitCentre)}
                            // helperText={errors.ProfitCentre?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-33'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vBatchNo}
                                onChange={e => setvBatchNo(e.target.value)}
                                id="outlined-basic"
                                label="Batch No."
                                variant="outlined"
                                name='GLCode'
                            // inputRef={register({ required: "GL. Code is required.*", })}
                            // error={Boolean(errors.GLCode)}
                            // helperText={errors.GLCode?.message}
                            />
                        </FormControl>
                    </Box>

                    <Box className='inputBox-30'>
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Gate Entry Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={dtGateEntryDate}
                                        required
                                        maxDate={toDates}
                                        onChange={handleChangedtGateEntryDate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.gtDate != '' ? <p className='error'>{errorText.gtDate}</p> : null}
                        </FormControl>
                    </Box>
                    {/* <Box sx={{ width: '10%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel id="demo-simple-select-label">Business</InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vBusiness}
                                label="Select Business"
                                onChange={handleChangePackUnit}
                                name='unitid'
                            inputRef={register({ required: "Business is required.*", })}
                            error={Boolean(errors.unitid)}
                            helperText={errors.unitid?.message}
                            >
                                {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                }
                                <MenuItem value='B1'>B1</MenuItem>
                                <MenuItem value='B2'>B2</MenuItem>
                                <MenuItem value='B3'>B3</MenuItem>
                                <MenuItem value='B4'>B4</MenuItem>
                            </Select>
                        </FormControl>
                    </Box> */}
                    <Box className='inputBox-37'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vCourierToCCIPL}
                                onChange={e => setvCourierToCCIPL(e.target.value)}
                                id="outlined-basic"
                                label="Courier To CCIPL"
                                variant="outlined"
                                name='Remarks'
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-25' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vCourierDocketNo}
                                onChange={e => setvCourierDocketNo(e.target.value)}
                                id="outlined-basic"
                                label="Courier Docket No"
                                variant="outlined"
                                name='Remarks'
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-30'>
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Payment Receive Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={dtPaymentReceiveDate}
                                        required
                                        maxDate={toDates}
                                        onChange={handleChangedtdtPaymentReceiveDate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.prDate != '' ? <p className='error'>{errorText.prDate}</p> : null}
                        </FormControl>
                    </Box>
                    {/* <Box sx={{ width: '23%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label">Vendor</InputLabel>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={VendorMaster}
                                value={VendorDetail}
                                // inputValue={inputValue}
                                onChange={(event, value) => changeVendorMasterValue(value)}
                                onKeyDown={newInputValue => vendorMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                     setInputValue(newInputValue);
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Vendor" required />}
                            />
                            {errorText.vendor != '' ? <p  className='error'>{errorText.vendor}</p> : null}
                        </FormControl>
                    </Box> */}
                    <Box className='inputBox-40'>
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

                    <div style={{ display: 'flex', width: '100%', alignItems: 'flex-end', gap: 18 }}>
                        <Box className='inputBox-25'>
                            <div style={{position:'relative'}}>
                                <InputLabel id="demo-simple-select-label" style={{ marginTop: 5, marginBottom: 5,fontSize: 10,position: 'absolute',top: -23}}>Attach GRN</InputLabel>
                                <input type="file" name='vPOFilePath' onChange={imageFile} hidden ref={imageRef} />
                                <div style={{ flexDirection: 'row' }}>
                                    <button onClick={() => imageRef.current.click()} className='choosebtn'>Choose File</button>
                                    {imgpreview != false ?
                                        <a href={preview} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10, fontSize: 13 }}>GRN Copy</a>
                                        : null
                                    }

                                </div>
                            </div>

                        </Box>
                        <FormGroup >
                            <FormControlLabel style={{marginRight:0}} control={<Checkbox defaultChecked={btCOAReceived} value={btCOAReceived} onChange={e => setbtCOAReceived(e.target.checked)} />} label="COA Received" />
                        </FormGroup>
                        <FormGroup >
                            <FormControlLabel style={{marginRight:0}} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                        </FormGroup>
                    </div>
                </div>
            </div>
            <div className='databox'>
                <div className='data-form-box-2 mt-2'>
                    <Box className='inputBox-29'>
                        <FormControl fullWidth className='input'>
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={MaterialMaster}
                                value={MaterialDetail}
                                // inputValue={MaterialDetail}
                                onChange={(event, value) => changeMaterialValue(value)}
                                onKeyDown={newInputValue => getMaterialMasterForGRN_SelectAll_ActiveLikeSearch(nPOId, newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    // materialMaster_SelectAll_ActiveLikeSearch()
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Search Material" required />}
                            />
                            {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                        </FormControl>
                    </Box>
                    {/* <Box sx={{ width: '25%' }} >
                        <FormControl fullWidth className='input'>
                            <InputLabel id="demo-simple-select-label">Select Material</InputLabel>
                            <Select
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
                                {MaterialMaster.map((item, index) => {
                                    return (
                                        <MenuItem value={item.nMId} key={index}>{item.MaterialDetail}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                            {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                        </FormControl>
                    </Box> */}
                    {/* {errorText != '' ?
                            <p style={{ color: 'red' }}>{errorText}</p>
                            :
                            null

                        } */}
                    <Box className='inputBox-33'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={nQty}
                                // onChange={e => calculateAmount(e.target.value,'nQty')}
                                required id="outlined-basic"
                                label="PO Qty"
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
                    <Box className='inputBox-33' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={BalanceQuantity}
                                // onChange={e => calculateAmount(e.target.value,'nQty')}
                                id="outlined-basic"
                                label="Balance Qty"
                                variant="outlined"
                                name='BalanceQuantity'
                                type="number" inputProps={{ min: 4, max: 10 }}
                                disabled={true}
                            // inputRef={register({ required: "Quantity is required.*", })}
                            // error={Boolean(errors.Quantity)}
                            // helperText={errors.Quantity?.message}
                            />
                            {errorText.Quan != '' ? <p className='error'>{errorText.Quan}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-31'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={nQtyAccepted}
                                onChange={e => calculateAmount(e.target.value, 'nQtyAccepted')}
                                required id="outlined-basic"
                                label="Quantity Accepted"
                                variant="outlined"
                                name='Quantity'
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "Quantity is required.*", })}
                            // error={Boolean(errors.Quantity)}
                            // helperText={errors.Quantity?.message}
                            />
                            {errorText.QuanAccept != '' ? <p className='error'>{errorText.QuanAccept}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-31' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={nQtyRejected}
                                onChange={e => calculateAmount(e.target.value, 'nQtyRejected')}
                                required id="outlined-basic"
                                label="Quantity Rejected"
                                variant="outlined"
                                name='Quantity'
                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "Quantity is required.*", })}
                            // error={Boolean(errors.Quantity)}
                            // helperText={errors.Quantity?.message}
                            />
                            {errorText.QuanReject != '' ? <p className='error'>{errorText.QuanReject}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-33'>
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
                    <Box className='inputBox-26'>
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Mfg Date"
                                        inputFormat="DD-MM-YYYY"
                                        value={dtMfgDate}
                                        required
                                        maxDate={toDates}
                                        onChange={handleChangedtMfgDate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.mfDate != '' ? <p className='error'>{errorText.mfDate}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-26' >
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Expire Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={dtExpDate}
                                        required
                                        maxDate={toDates}
                                        onChange={handleChangedtExpDate}
                                        renderInput={(params) => <TextField sx={muiStyles.date}{...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.exDate != '' ? <p className='error'>{errorText.exDate}</p> : null}
                        </FormControl>
                    </Box>


                    <Box className='inputBox-38' >
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={nAmt}
                                onChange={e => setnAmt(e.target.value)}
                                id="outlined-basic"
                                label="Total Amount"
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
                    <Box className='inputBox-21' >
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
                    <Box className='inputBox-35'>
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
                    <Box className='inputBox-21'>
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
                    <Box className='inputBox-35'>
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
                    <Box className='inputBox-21'>
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
                    <Box className='inputBox-35'>
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
                    <Box className='inputBox-33'>
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
                    <Box className='inputBox-38'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={nGrandTotal}
                                onChange={e => setnGrandTotal(e.target.value)}
                                required id="outlined-basic"
                                label="Grand Total"
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
                    <Box className='inputBox-35'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={nFreight}
                                onChange={e => calculateAmount(e.target.value, 'nFreight')}
                                id="outlined-basic"
                                label="Freight"
                                variant="outlined"
                                name='TotalAmount'

                                type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "Total Amount is required.*", })}
                            // error={Boolean(errors.brandName5)}
                            // helperText={errors.brandName5?.message}
                            />
                            {/* {errorText.Freight != '' ? <p className='error'>{errorText.Freight}</p> : null} */}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-37'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={nNetTotalAmt}
                                onChange={e => setnNetTotalAmt(e.target.value)}
                                required id="outlined-basic"
                                label="Net Total Amt"
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between',marginBottom:10 }}>
                        <button title='Add' className='addbtn' onClick={addKoMonthDate}>{btnType=='edit'?'Update':<AddIcon fontSize='small' />}</button>

                        <button title='Refresh' className='addbtn' onClick={refreshbtn}><ReplayIcon fontSize='large' /></button>
                    </div>
                    <div>
                     
                    </div>
                </div>
                <div className='tablecenter'>
                    {PODetails.length > 0 ?
                        <Paper sx={{ width: '100%', overflow: 'hidden',paddingTop:1 }}>
                            <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="row">SN.</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Material Name</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>PO Qty</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Balance QTY</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Qty Accepted</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Qty Rejected</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Total Qty</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Rate</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Mfg Date</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Exp Date</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Total Amount</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>SGST (%)</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>SGST </TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>CGST (%)</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>CGST</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>IGST (%)</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>IGST</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Total Tax</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Grand Total</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Freight</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Net Total Amt</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {PODetails?.length > 0 ?

                                        <TableBody>

                                            {PODetails.map((item, index) => {
                                                return (
                                                    <TableRow key={index} style={item.id == EditId ? { background: 'rgba(239,30,44,0.15)' } : { background: '#fff' }}>
                                                        <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                        <TableCell align="center">
                                                            <div style={{ display: 'flex', }}>
                                                                <button className='deletbtn' title='Delete' onClick={() => deleteItem(item.id)}><DeleteIcon size={20} color='red' /></button>
                                                                <button className='deletbtn' title='Edit' onClick={() => editItem(item)}><BorderColorIcon size={20} color='#000' /></button>

                                                            </div>

                                                        </TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.MaterialDetail}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nQty}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.BalanceQuantity}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nQtyAccepted}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nQtyRejected}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nQtyAccepted + item.nQtyRejected}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nRate}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{parseDateToString(new Date(item.dtMfgDate))}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{parseDateToString(new Date(item.dtExpDate))}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nTotalAmount}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nSGSTP}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nSGST}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nCGSTP}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nCGST}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nIGSTP}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nIGST}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nTax}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nGrandTotal}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nFreight}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nNetTotalAmt}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            }

                                        </TableBody>
                                        :

                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>No Record</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    }
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
                {AllTotalAmount != '' ?
                    <div className='dateFilter-2' style={{ width: '25%', minHeight: 30 }}>
                        <div className='displayflex'>
                            <p style={{ fontWeight: '700' }}>Total</p>
                            <p>: &#8377; {AllTotalAmount}</p>

                        </div>
                    </div>
                    :
                    null
                }
            </div>

            <div className='displayflex-2' >

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

            <Modal
                isOpen={monthmodalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Alert !!</span></div>
                    <HighlightOffIcon fontSize='large' onClick={closeModal} />
                </div>
                <div>
                    <div className='editModel-2'>
                        <div><p className='errormasg'>OOPS !!, For this selected Transaction, Input Quantity is greater than Balance Left Quantity. Please try again with appropriate inputs.</p></div>
                        <div className='tablecenter'>
                            {GrnData.length > 0 ?
                                <Paper sx={{ width: '100%', overflow: 'hidden',paddingTop:1 }}>
                                    <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell scope="row">SN.</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>PO No</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Material Name</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Qty</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Bal Qty</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Input Qty</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {GrnData.map((item, index) => {
                                                    return (

                                                        <TableRow key={index}>

                                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.vPONo}</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.MaterialDetail}</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nQty}</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.BalanceQty}</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.SelectedQty}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                                }


                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </Paper>
                                :
                                null

                            }

                        </div>

                    </div>
                </div>

            </Modal >
        </div>
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
            left:'-10px',
            backgroundColor: 'transparent',
            zIndex: '1'
        },
        "& label.Mui-focused": {
            zIndex: '1'

        },
        '& .MuiInputAdornment-root':{
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
            left:'-10px',
          
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
            left:'-10px',  
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
        left:'-10px',
        backgroundColor: 'transparent',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
   

};
export default AddGRNReceived