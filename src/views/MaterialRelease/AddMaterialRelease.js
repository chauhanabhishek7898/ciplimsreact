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
import { GetBOMDetailsLIkeSearch } from '../BOMMaster/BomMasteerService'
import { MaterialMaster_SelectAll_ActiveLikeSearch } from '../MaterialMaster/MaterialMasterService'
import { PlantMaster_SelectAll_ActiveLikeSearch } from '../PlantMaster/PlantMasterService'
import { VendorMaster_SelectAll_ActiveLikeSearch, VendorMaster_SelectAll_Active } from '../VenderForm/VenderFormService'
import { GetPODetails, GetPOByPOId } from '../PurchaseOrder/POMasterService'
import { MaterialRelease_Insert, GetPODetailsLIkeSearch, GetBOMMaterialsQty, GetExpiryDatesforMaterialRelease, GetMaterialforRelease, GetBatchNoDetails, GetMaterialforReleaseForEdit, GetCurrentDBTime } from './MaterialReleaseService'
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
import { parseDateToString, parseDateToStringSubmit,parseTimeToStringSubmit } from '../../coreservices/Date';
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { number } from 'prop-types';
import { Navigation } from '@coreui/coreui';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from "moment";
function AddMaterialRelease() {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [brandData, setBrandData] = React.useState([]);
    const [MaterialMaster, setMaterialMaster] = React.useState([]);
    const [PlantMaster, setPlantMaster] = React.useState([]);
    const [VendorMaster, setVendorMaster] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [nBId, setnBId] = React.useState(0);
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
    const [errorText, setError] = React.useState({
        plant: '',
        vendor: '',
        date: '',
        endDate: '',
        MaterialDetail: '',
        BomDetail: '',
        expireDate: '',
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
    const [btCOAReceived, setbtCOAReceived] = useState(false)
    const [vGRNCopyFilePath, setvGRNCopyFilePath] = useState('')
    const [vCourierToCCIPL, setvCourierToCCIPL] = useState('')
    const [vCourierDocketNo, setvCourierDocketNo] = useState('')
    const [nPoQtyAccepted, setnPoQtyAccepted] = useState('')
    const [BalanceQuantity, setBalanceQuantity] = useState('')
    const [AllTotalAmount, setAllTotalAmount] = useState('')
    const [nQtyAccepted, setnQtyAccepted] = useState('')
    const [nQtyRejected, setnQtyRejected] = useState('')

    const [dtExpDate, setdtExpDate] = useState(dayjs(startDates))

    const [vUOM, setvUOM] = useState('')
    const [vBatchNo, setvBatchNo] = useState('')
    const [nBOMUnit, setnBOMUnit] = useState('')
    const [BOMMaterialsQty, setBOMMaterialsQty] = useState([])
    const [BomDetail, setBomDetail] = useState('')
    const [BOMMaster, setBOMMaster] = useState([])
    const [expireDate, setExpireDate] = useState([])
    const [expireDateValue, setexpireDateValue] = useState('')
    const [RequiredQty, setRequiredQty] = useState('')
    const [ReleasedQty, setReleasedQty] = useState('')
    const [LeftStockQty, setLeftStockQty] = useState('')
    const [LeftQty, setLeftQty] = useState('')
    const [nGRNId, setnGRNId] = useState('')
    const [TableShow, setTableShow] = useState(false)
    const [firstRecord, setfirstRecord] = useState(false)
    const [BomDisable, setBomDisable] = useState(false)
    const [EditId, setEditId] = useState('')
    const [FirstTimeAdd, setFirstTimeAdd] = React.useState(true);
    const [CrruntTime, setCrruntTime] = React.useState(dayjs(startDates));
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


        PlantMaster_SelectAll_ActiveLikeSearch(vGeneric == undefined || vGeneric == '' ? null : vGeneric.target.value).then(res => {
            console.log('response', res)

            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nPId,
                    label: res[i].PlantDetail,
                })
            }
            setPlantMaster(data)
        })
    }
    const getBOMDetailsLIkeSearch = (vGeneric) => {
        GetBOMDetailsLIkeSearch(vGeneric == undefined || vGeneric == '' ? null : vGeneric.target.value).then(res => {
            console.log('response', res)

            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nBId,
                    label: res[i].vBOMName,
                })
            }
            setBOMMaster(data)
        })
    }

    const getPODetails = (vGeneric) => {
        if (vGeneric != '') {
            vGeneric = vGeneric.target.value
        } else {
            vGeneric = null
        }
        GetPODetailsLIkeSearch(vGeneric).then(res => {
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

    const materialMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
        MaterialMaster_SelectAll_ActiveLikeSearch(vGeneric == undefined || vGeneric == '' ? null : vGeneric.target.value).then(res => {
            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].nMId,
                    label: res[i].MaterialDetail,
                    vUOM: res[i].vUOM,
                    // label: res[i].MaterialDetail,       
                })
            }
            setMaterialMaster(data)
        })

    }
    const changePlantValue = (value) => {
        if (FirstTimeAdd == true) {
            setnPId(value.value)
            setPlantDetail(value.label)
            getExpiryDatesforMaterialRelease(value.value, nMId == '' ? 0 : nMId)
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
                            setnPId(value.value)
                            setPlantDetail(value.label)
                            getExpiryDatesforMaterialRelease(value.value, nMId == '' ? 0 : nMId)
                            setError({
                                plant: ''
                            })
                            setnMId('')
                            setMaterialDetail('')
                            setexpireDateValue('')
                            setRequiredQty('')
                            setReleasedQty('')
                            setLeftQty('')
                            setLeftStockQty('')
                            setnQty('')
                            setvUOM('')
                            setbtnType('')
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
    const changeBOMValue = (value) => {
        setnBId(value.value)
        setBomDetail(value.label)
        // setError({
        //     plant: ''
        // })
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
        setvUOM(value.vUOM)
        getExpiryDatesforMaterialRelease(nPId == '' ? 0 : nPId, value.value)
        setError({
            MaterialDetail: ''
        })
    }

    const changeBOMMaterialsQtyValue = (value) => {
        setnBOMUnit(value)
        if (value != '' && value != undefined) {
            setTimeout(() => {
                getBOMMaterialsQty(value)
            }, 1500)
        } else {
            setBOMMaterialsQty([])
            setTableShow(false)
        }
    }
    const getBOMMaterialsQty = (value) => {
        GetBOMMaterialsQty(nBId, value).then(res => {

            setBOMMaterialsQty(res)
        })
    }
    const getExpiryDatesforMaterialRelease = (PId, MId) => {

        GetExpiryDatesforMaterialRelease(PId, MId).then(res => {
            console.log('response', res)
            setExpireDate(res)

        })
    }
    const getBatchNoDetails = (value) => {
        setvBatchNo(value)
        setTimeout(() => {
            if (value == '' || value == undefined) {
                console.log('1')
            } else {
                setTimeout(() => {
                    GetBatchNoDetails(value).then(res => {
                        console.log('response', res)
                        // setExpireDate(res)
                        if (res?.length > 0) {
                            setnBId(res[0].nBId)
                            setBomDetail(res[0].vBOMName)
                            setnBOMUnit(res[0].nBOMUnit)
                            setnPId(res[0].nPId)
                            setPlantDetail(res[0].PlantDetail)
                            // setBomDisable(true)
                        } else {
                            setBomDisable(false)
                            setnBId('')
                            setBomDetail('')
                            setnBOMUnit('')
                            setnPId('')
                            setPlantDetail('')
                        }
                    })
                }, 1000)
            }
        }, 2000)
    }
    const handleexpireDateChange = (e) => {
        confirmAlert({
            title: 'Alert !!',
            closeOnClickOutside: false,
            message: 'Are you Sure ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setexpireDateValue(e.target.value)
                        getMaterialforRelease(nPId, nMId, e.target.value, nBId, nBOMUnit, vBatchNo)
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
    const getMaterialforRelease = (PId, MId, expireDate, Bid, BOMUnit, BatchNo) => {
        GetMaterialforRelease(PId, MId, expireDate, Bid, BOMUnit, BatchNo).then(res => {
            console.log('response', res)
            // setExpireDate(res)
            setRequiredQty(res[0].RequiredQty)
            setReleasedQty(res[0].ReleasedQty)
            setLeftStockQty(res[0].LeftStockQty)
            setLeftQty(res[0].LeftQty)
            setnQty(res[0].LeftQty)

        })
    }
    const onChangenQty = (value) => {
        setnQty(value)
        setTimeout(() => {
            if (value != '' || value != undefined) {
                if (value <= LeftQty) {
                    if (value <= LeftStockQty) {

                    } else {
                        confirmAlert({
                            title: 'Alert !!',
                            message: 'Input Qty. should not be greater than Balance Left Stock Quantity.',
                            closeOnClickOutside: false,
                            buttons: [
                                {
                                    label: 'Ok',
                                    onClick: () => { setnQty('') },
                                },
                            ]
                        });

                    }
                } else {
                    console.log('false')
                    confirmAlert({
                        title: 'Alert !!',
                        message: 'Input Qty. should not be greater than Quantity to be Released.',
                        closeOnClickOutside: false,
                        buttons: [
                            {
                                label: 'Ok',
                                onClick: () => { setnQty('') },
                            },
                        ]
                    });
                }
            }

        }, 2000)
    }
    // const calculateAmount = (value, type) => {

    //     if (type == 'nQtyAccepted') {
    //         setnQtyAccepted(value)
    //         setnAmt(0)
    //         let amount = parseFloat(value == '' ? 0 : value) + parseFloat(nQtyRejected == '' ? 0 : nQtyRejected)
    //         setnAmt(parseFloat(amount))

    //     }

    //     if (type == 'nQtyRejected') {
    //         setnQtyRejected(value)
    //         let amount = parseFloat(value == '' ? 0 : value) + parseFloat(nQtyAccepted == '' ? 0 : nQtyAccepted)
    //         setnAmt(parseFloat(amount))

    //     }

    // }
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

    const addKoMonthDate = () => {

        if (btnType == 'edit') {
            confirmAlert({
                title: 'Alert !!',
                message: 'Do you want Edit this Material ?',
                closeOnClickOutside: false,
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
                                poMasteerDetail[indexToUpdate].nQtyAccepted = parseFloat(nQtyAccepted == '' ? 0 : nQtyAccepted),
                                poMasteerDetail[indexToUpdate].nQtyRejected = parseFloat(nQtyRejected == '' ? 0 : nQtyRejected),
                                poMasteerDetail[indexToUpdate].vUOM = vUOM,
                                poMasteerDetail[indexToUpdate].TotalQty = parseFloat(nAmt == '' ? 0 : nAmt),
                                poMasteerDetail[indexToUpdate].dtExpDate = parseDateToStringSubmit(new Date(dtExpDate)),
                                poMasteerDetail[indexToUpdate].dtExpDate2 = dtExpDate,

                                setPODetails(poMasteerDetail)
                            setbtnType('')
                            setnMId('')
                            setMaterialDetail('')
                            setdtExpDate(new Date(Date.now()))
                            setnAmt('')
                            setnQtyAccepted('')
                            setnQtyRejected('')

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
                closeOnClickOutside: false,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            if (validateformPoDetial() == true) {
                                let poMasteerDetail = [...PODetails]
                                let findnMId = poMasteerDetail.find(e => e.nMId == nMId && e.dtExpDate == parseDateToStringSubmit(new Date(dtExpDate)))
                                if (findnMId) {
                                    toast.success("Material with this expiry date is already Exists.")
                                } else {
                                    poMasteerDetail.push({
                                        id: new Date().getUTCMilliseconds(),
                                        nMId: parseInt(nMId),
                                        MaterialDetail: MaterialDetail,
                                        nQtyAccepted: parseFloat(nQtyAccepted == '' ? 0 : nQtyAccepted),
                                        nQtyRejected: parseFloat(nQtyRejected == '' ? 0 : nQtyRejected),
                                        vUOM: vUOM,
                                        TotalQty: parseFloat(nAmt == '' ? 0 : nAmt),
                                        dtExpDate: parseDateToStringSubmit(new Date(dtExpDate)),
                                        dtExpDate2: dtExpDate,

                                    })

                                    setPODetails(poMasteerDetail)
                                    submit
                                    // setnMId('')
                                    // setMaterialDetail('')
                                    // setdtExpDate(new Date(Date.now()))
                                    // setnAmt('')
                                    // setnQtyAccepted('')
                                    // setnQtyRejected('')


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
        if (nPId == '') {
            setError({
                plant: 'Select PO No. *'
            })
            return false
        } else if (nBId == '' || nBId == undefined) {
            setError({
                BomDetail: 'Select Material *'
            })
            return false
        } else if (nMId == '' || nMId == undefined) {
            setError({
                MaterialDetail: 'Select Material *'
            })
            return false
        } else if (expireDateValue == '' || expireDateValue == undefined) {
            setError({
                expireDate: 'Select Exp Date *'
            })
            return false
        } else if (parseDateToString(new Date(startDate))?.length != 10) {
            setError({
                date: 'Invaild Date *'
            })
            return false
        } else {
            setError('')
            return true
        }

    }
    // useEffect(() => {
    //     GetCurrentDBTime().then(res => {
    //         if (res) {
    //             console.log('time', res[0].CurrTime)
    //             setCrruntTime(res[0].CurrTime)
    //         }
    //     })
    // }, [CrruntTime])
    const submit = () => {
        if (btnType == 'edit') {
            if (validateform() == true) {
                // if (PODetails.length > 0) {



                // } else {
                //     confirmAlert({
                //         title: 'Alert !!',
                //         message: 'Please Add at least one Material.',
                //         buttons: [
                //             {
                //                 label: 'Ok',
                //                 onClick: () => { return null },
                //             },
                //         ]
                //     });
                // }
                confirmAlert({
                    title: 'Alert !!',
                    message: 'Do you want Proceed ?',
                    closeOnClickOutside: false,
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {

                                setLoader(true)
                                const POMasterData = [{
                                    nGRNId: nGRNId==''?0:nGRNId,
                                    nPId: nPId,
                                    nBId: nBId,
                                    nBOMUnit: nBOMUnit,
                                    vBatchNo: vBatchNo,
                                    vTime: parseTimeToStringSubmit(new Date(CrruntTime)),
                                    btActive: true,
                                    dtGRNDate: parseDateToStringSubmit(new Date(startDate)),
                                    nLoggedInUserId: parseInt(nLoggedInUserId)
                                }]
                                const POMasterDataDtails = [{
                                    nGRNId: nGRNId==''?0:nGRNId,
                                    nMId: nMId,
                                    nQTYOut: nQty,
                                    dtExpDate: expireDateValue
                                }]
                                let GRNOrder = {}
                                GRNOrder.GRNMaster = POMasterData,
                                    GRNOrder.GRNDetails = POMasterDataDtails
                                console.log('PurchaseOrder', GRNOrder)
                                MaterialRelease_Insert(GRNOrder).then(res => {
                                    if (res) {
                                        let count = Object.keys(res).length
                                        let data = res
                                        for (var i = 0; i < count; i++) {
                                            let counts = i
                                            res[i].id = counts
                                        }
                                        setPODetails(data)
                                        setBomDisable(true)
                                        
                                            setLoader(false)
                                        toast.success("Record Added Successfully !!")
                                        setfirstRecord(true)
                                        setnMId('')
                                        setMaterialDetail('')
                                        setexpireDateValue('')
                                        setRequiredQty('')
                                        setReleasedQty('')
                                        setLeftQty('')
                                        setLeftStockQty('')
                                        setnQty('')
                                        setvUOM('')
                                        setEditId(null)
                                        setbtnType('')
                                        setnGRNId(res[0].nGRNId)
                                        // navigate('/EnterOpeningStock')

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
            let expDateFind = PODetails.find(e => e.nMId == nMId && e.ExpDate == expireDateValue)
            if (expDateFind) {
                toast.success("Material with this Expiry Date is already Exists.")
            } else {
                if (validateform() == true) {
                    // if (PODetails.length > 0) {



                    // } else {
                    //     confirmAlert({
                    //         title: 'Alert !!',
                    //         message: 'Please Add at least one Material.',
                    //         buttons: [
                    //             {
                    //                 label: 'Ok',
                    //                 onClick: () => { return null },
                    //             },
                    //         ]
                    //     });
                    // }
                    confirmAlert({
                        title: 'Alert !!',
                        message: 'Do you want Proceed ?',
                        closeOnClickOutside: false,
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {

                                    setLoader(true)
                                    const POMasterData = [{
                                        nGRNId: nGRNId==''?0:nGRNId,
                                        nPId: nPId,
                                        nBId: nBId,
                                        nBOMUnit: nBOMUnit,
                                        vBatchNo: vBatchNo,
                                        btActive: true,
                                        dtGRNDate: parseDateToStringSubmit(new Date(startDate)),
                                        vTime: parseTimeToStringSubmit(new Date(CrruntTime)),
                                        nLoggedInUserId: parseInt(nLoggedInUserId)
                                    }]
                                    const POMasterDataDtails = [{
                                        nGRNId: nGRNId==''?0:nGRNId,
                                        nMId: nMId,
                                        nQTYOut: nQty,
                                        dtExpDate: expireDateValue
                                    }]
                                    let GRNOrder = {}
                                    GRNOrder.GRNMaster = POMasterData,
                                        GRNOrder.GRNDetails = POMasterDataDtails
                                    console.log('PurchaseOrder', GRNOrder)
                                    MaterialRelease_Insert(GRNOrder).then(res => {
                                        if (res) {
                                            setPODetails(res)
                                            setBomDisable(true)
                                            setLoader(false)
                                            toast.success("Record Added Successfully !!")
                                            setfirstRecord(true)
                                            setnMId('')
                                            setMaterialDetail('')
                                            setexpireDateValue('')
                                            setRequiredQty('')
                                            setReleasedQty('')
                                            setLeftQty('')
                                            setLeftStockQty('')
                                            setnQty('')
                                            setvUOM('')
                                            setEditId(null)
                                            setbtnType('')
                                            setnGRNId(res[0].nGRNId)
                                            // navigate('/EnterOpeningStock')

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

        }
        // let expDateFind = PODetails.find(e => e.nMId == nMId && e.ExpDate == expireDateValue)
        // if (expDateFind) {
        //     toast.success("Material with this Expiry Date is already Exists.")
        // } else {
        //     if (validateform() == true) {
        //         // if (PODetails.length > 0) {



        //         // } else {
        //         //     confirmAlert({
        //         //         title: 'Alert !!',
        //         //         message: 'Please Add at least one Material.',
        //         //         buttons: [
        //         //             {
        //         //                 label: 'Ok',
        //         //                 onClick: () => { return null },
        //         //             },
        //         //         ]
        //         //     });
        //         // }
        //         confirmAlert({
        //             title: 'Alert !!',
        //             message: 'Do you want Proceed ?',
        //             closeOnClickOutside: false,
        //             buttons: [
        //                 {
        //                     label: 'Yes',
        //                     onClick: () => {

        //                         setLoader(true)
        //                         const POMasterData = [{
        //                             nGRNId: firstRecord == false ? 0 : nGRNId,
        //                             nPId: nPId,
        //                             nBId: nBId,
        //                             nBOMUnit: nBOMUnit,
        //                             vBatchNo: vBatchNo,
        //                             btActive: true,
        //                             dtGRNDate: parseDateToStringSubmit(new Date(startDate)),
        //                             nLoggedInUserId: parseInt(nLoggedInUserId)
        //                         }]
        //                         const POMasterDataDtails = [{
        //                             nGRNId: firstRecord == false ? 0 : nGRNId,
        //                             nMId: nMId,
        //                             nQTYOut: nQty,
        //                             dtExpDate: expireDateValue
        //                         }]
        //                         let GRNOrder = {}
        //                         GRNOrder.GRNMaster = POMasterData,
        //                             GRNOrder.GRNDetails = POMasterDataDtails
        //                         console.log('PurchaseOrder', GRNOrder)
        //                         MaterialRelease_Insert(GRNOrder).then(res => {
        //                             if (res) {
        //                                 setPODetails(res)
        //                                 setBomDisable(true)
        //                                 setnGRNId(res[0].nGRNId),
        //                                     setLoader(false)
        //                                 toast.success("Record Added Successfully !!")
        //                                 setfirstRecord(true)
        //                                 setnMId('')
        //                                 setMaterialDetail('')
        //                                 setexpireDateValue('')
        //                                 setRequiredQty('')
        //                                 setReleasedQty('')
        //                                 setLeftQty('')
        //                                 setLeftStockQty('')
        //                                 setnQty('')
        //                                 setvUOM('')
        //                                 setEditId(null)
        //                                 // navigate('/EnterOpeningStock')

        //                             }
        //                         })

        //                     }
        //                 },
        //                 {
        //                     label: 'No',
        //                     onClick: () => { return null }
        //                 }
        //             ]
        //         });

        //     }
        // }


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
        getExpiryDatesforMaterialRelease(nPId, item.nMId)
        setexpireDateValue(item.ExpDate)
        setnQtyAccepted(item.nQtyAccepted)
        setnQtyRejected(item.nQtyRejected)
        setnAmt(item.TotalQty)
        setvUOM(item.vUOM)
        getMaterialforReleaseForEdit(nPId, item.nMId, item.ExpDate, nBId, nBOMUnit, vBatchNo, item.nQTYOut)

    }
    const getMaterialforReleaseForEdit = (PId, MId, expireDate, Bid, BOMUnit, BatchNo, nOutQty) => {

        GetMaterialforReleaseForEdit(PId, MId, expireDate, Bid, BOMUnit, BatchNo, nOutQty).then(res => {
            console.log('response', res)
            // setExpireDate(res)
            setRequiredQty(res[0].RequiredQty)
            setReleasedQty(res[0].ReleasedQty)
            setLeftStockQty(res[0].LeftStockQty)
            setLeftQty(res[0].LeftQty)
            setnQty(res[0].ReleasedQty)

        })
    }
    const goback = () => {
        confirmAlert({
            title: 'Alert !!',
            closeOnClickOutside: false,
            message: 'Are you Sure ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { navigate('/MaterialRelease') },
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
        setexpireDateValue('')
        setRequiredQty('')
        setReleasedQty('')
        setLeftQty('')
        setLeftStockQty('')
        setnQty('')
        setvUOM('')
        setbtnType('')
    }
    return (
        <div className='citymasterContainer'>
            <div className='dateFilter-2'>
                <div className='displayflexend mt-2'>
                    <Box className='inputBox-30' >
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={startDate}
                                        required
                                        disabled={BomDisable}
                                        onChange={handleChangeStartdate}
                                        renderInput={(params) => <TextField sx={muiStyles.date}{...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.date != '' ? <p className='error'>{errorText.date}</p> : null}
                        </FormControl>
                    </Box>
                    <Box  className='inputBox-38'>
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Select Time"
                                    value={CrruntTime}
                                    ampm={false}
                                    onChange={(newValue) => {
                                        setCrruntTime(newValue);
                                    }}
                                    renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                />
                            </LocalizationProvider>
                            {/* {errorText.date != '' ? <p className='error'>{errorText.date}</p> : null} */}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-1'>
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={vBatchNo}
                                onChange={e => getBatchNoDetails(e.target.value)}
                                id="outlined-basic"
                                label="Doc No"
                                variant="outlined"
                                name='BatchNo'
                                disabled={BomDisable}
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-12'>
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
                                disabled={BomDisable}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                onKeyDown={newInputValue => plantMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Search Plant " required />}
                            />
                            {errorText.plant != '' ? <p className='error'>{errorText.plant}</p> : null}
                        </FormControl>
                    </Box>

                    <Box className='inputBox-3'>
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Plant</InputLabel>npm  */}
                            <Autocomplete
                                sx={muiStyles.autoCompleate}
                                disablePortal
                                id="combo-box-demo"
                                options={BOMMaster}
                                value={BomDetail}
                                // changePlantValue(value)
                                onChange={(event, value) => changeBOMValue(value)}
                                disabled={BomDisable}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                onKeyDown={newInputValue => getBOMDetailsLIkeSearch(newInputValue)}
                                onInputChange={(event, newInputValue) => {
                                    // setInputValue(newInputValue);
                                    console.log('newInputValue', newInputValue)
                                }}
                                renderInput={(params) => <TextField {...params} label="Search BOM " required />}
                            />
                            {errorText.BomDetail != '' ? <p className='error'>{errorText.BomDetail}</p> : null}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-33' >
                        <FormControl fullWidth className='input'>
                            <TextField
                                sx={muiStyles.input}
                                value={nBOMUnit}
                                onChange={e => changeBOMMaterialsQtyValue(e.target.value)}
                                id="outlined-basic"
                                label="BOM Unit"
                                variant="outlined"
                                name='vBOMUnit'
                                disabled={BomDisable}
                            // inputRef={register({ required: "Remarks is required.", })}
                            // error={Boolean(errors.brandCode)}
                            // helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    {/* <Box sx={{ width: '53%', marginTop: 1 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
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
                    </Box> */}
                    <FormGroup >
                        <FormControlLabel style={{marginRight:0}} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                    </FormGroup>
                    {BOMMaterialsQty.length > 0 ?
                        <div>
                            <button onClick={() => setTableShow(!TableShow)} className='infobtn' title='BOM Info'>
                                {TableShow == true ?
                                    <CloseIcon style={{ width: 20, height: 20 }} />
                                    :
                                    <InfoIcon style={{ width: 20, height: 20 }} />
                                }

                            </button>
                        </div>
                        : null
                    }
                    {TableShow == true ?
                        <div className='tablecenter'>
                            {BOMMaterialsQty.length > 0 ?
                                <Paper sx={{ width: '100%', overflow: 'hidden',paddingTop:1 }}>
                                    <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell scope="row" style={{ width: '2%' }} >SN.</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Material Name</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>UOM</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Qty</TableCell>
                                                    <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Required Qty</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {BOMMaterialsQty.map((item, index) => {
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.MaterialDetail}</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.vUOM}</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nQty}</TableCell>
                                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.RequiredQty}</TableCell>
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
                        :
                        null
                    }
                </div>
            </div>
            <div className='databox'>
                <div className='data-form-box mt-2'>
                    <Box className='inputBox-41'>
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Item</InputLabel>  */}
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
                                renderInput={(params) => <TextField {...params} label="Search Material" required />}
                            />
                            {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null}
                        </FormControl>
                    </Box>

                    {/* {errorText != '' ?
                            <p style={{ color: 'red' }}>{errorText}</p>
                            :
                            null

                        } */}
                    {/* <Box sx={{ width: '7%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
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
                    </Box> */}
                    {/* <Box sx={{ width: '7%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
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
                    </Box> */}
                    <Box className='inputBox-35'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={vUOM}
                                // onChange={e => setnAmt(e.target.value)}
                                id="outlined-basic"
                                label="UOM"
                                variant="outlined"
                                name='Amount'
                                disabled={true}
                            // inputRef={register({ required: "Amount is required.*", })}
                            // error={Boolean(errors.Amount)}
                            // helperText={errors.Amount?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-38'>
                        <FormControl fullWidth className='input'>
                            <InputLabel id="demo-simple-select-label" required sx={muiStyles.InputLabels}>Exp Date</InputLabel>
                            <Select
                                sx={muiStyles.select}
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={expireDateValue}
                                label="Location"
                                onChange={handleexpireDateChange}
                            >
                                {expireDate.map((item, index) => {
                                    return (
                                        <MenuItem value={item.ExpDate} key={index}>{item.ExpDate}</MenuItem>
                                    )
                                })

                                }

                            </Select>
                            {errorText.expireDate != '' ? <p className='error'>{errorText.expireDate}</p> : null}
                        </FormControl>

                    </Box>
                    <Box className='inputBox-31'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={RequiredQty}
                                onChange={e => setRequiredQty(e.target.value)}
                                required id="outlined-basic"
                                label="Required Qty"
                                variant="outlined"
                                name='RequiredQty'
                                disabled={true}
                                type="number" inputProps={{ min: 4, max: 1000000000000000000 }}
                            // inputRef={register({ required: "Quantity is required.*", })}
                            // error={Boolean(errors.Quantity)}
                            // helperText={errors.Quantity?.message}
                            />
                            {/* {errorText.QuanAccept != '' ? <p className='error'>{errorText.QuanAccept}</p> : null} */}
                        </FormControl>
                    </Box>
                    <Box className='inputBox-31'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={ReleasedQty}
                                onChange={e => setReleasedQty(e.target.value)}
                                required id="outlined-basic"
                                label="Released Qty"
                                variant="outlined"
                                name='Quantity'
                                disabled={true}
                            // type="number" inputProps={{ min: 4, max: 10 }}
                            // inputRef={register({ required: "Quantity is required.*", })}
                            // error={Boolean(errors.Quantity)}
                            // helperText={errors.Quantity?.message}
                            />
                            {errorText.QuanReject != '' ? <p className='error'>{errorText.QuanReject}</p> : null}
                        </FormControl>
                    </Box>


                    <Box className='inputBox-30'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={LeftQty}
                                onChange={e => setLeftQty(e.target.value)}
                                id="outlined-basic"
                                label="Qty to be Released"
                                variant="outlined"
                                name='Amount'
                                // type="number" inputProps={{ min: 4, max: 1000000000000000000000000000000 }}
                                disabled={true}
                            // inputRef={register({ required: "Amount is required.*", })}
                            // error={Boolean(errors.Amount)}
                            // helperText={errors.Amount?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-25'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={LeftStockQty}
                                onChange={e => setLeftStockQty(e.target.value)}
                                id="outlined-basic"
                                label="Bal. Stock"
                                variant="outlined"
                                name='Amount'
                                // type="number" inputProps={{ min: 4, max: 1000000000000000000000000000000 }}
                                disabled={true}
                            // inputRef={register({ required: "Amount is required.*", })}
                            // error={Boolean(errors.Amount)}
                            // helperText={errors.Amount?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box className='inputBox-25'>
                        <FormControl fullWidth className='input' >
                            <TextField
                                sx={muiStyles.input}
                                value={nQty}
                                onChange={e => onChangenQty(e.target.value)}
                                id="outlined-basic"
                                label="Qty"
                                variant="outlined"
                                name='Qty'
                                required
                                type="number" inputProps={{ min: 4, max: 1000000000000000000000000000000 }}
                                inputRef={register({ required: "Qty is required.*", })}
                                error={Boolean(errors.Qty)}
                                helperText={errors.Qty?.message}
                            />
                        </FormControl>
                    </Box>
                    {/* <Box sx={{ width: '11.5%' }} >
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Expire Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={dtExpDate}
                                        required
                                        onChange={handleChangedtExpDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.date != '' ? <p className='error'>{errorText.date}</p> : null}
                        </FormControl>
                    </Box> */}
                    <div >
                        {firstRecord == true ?
                            <div>
                                {loader == true ?
                                    <CButton disabled className='addbtn'>
                                        <CSpinner component="span" size="sm" aria-hidden="true" />
                                        Loading...
                                    </CButton>
                                    :
                                    // <button type="submit" className='submitbtn' onClick={submit}>Submit</button>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <button title='Add&Submit' className='addbtn' style={{fontSize:11}} onClick={handleSubmit(submit)}>{btnType == 'edit' ? 'Update' : <AddIcon fontSize='small' />}</button>

                                        <button title='Refresh' className='addbtn' onClick={refreshbtn}><ReplayIcon fontSize='large' /></button>
                                    </div>

                                }
                            </div>
                            :
                            <div >
                                {loader == true ?
                                    <CButton disabled className='addbtn'>
                                        <CSpinner component="span" size="sm" aria-hidden="true" />
                                        Loading...
                                    </CButton>
                                    :
                                    // <button type="submit" className='submitbtn' onClick={submit}>Submit</button>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between', width: '100%',marginBottom:10 }}>
                                        <button title='Add&Submit' className='addbtn' style={{fontSize:11}} onClick={handleSubmit(submit)}>Submit</button>

                                        <button title='Refresh' className='addbtn' onClick={refreshbtn}><ReplayIcon fontSize='large' /></button>
                                    </div>
                                }
                            </div>
                        }

                    </div>
                </div>
                <div className='tablecenter'>
                    {PODetails.length > 0 ?
                        <Paper sx={{ width: '100%', overflow: 'hidden',paddingTop:1 }}>
                            <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="row" style={{ width: '2%' }} >SN.</TableCell>
                                            <TableCell align="center" style={{ width: '5%' }}>Action</TableCell>
                                            {/* <TableCell align="left" >Ref No</TableCell> */}
                                            {/* <TableCell align="left" >PO Qty</TableCell>
                                            <TableCell align="left" >Balance QTY</TableCell> */}
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Material Detail</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Exp Date</TableCell>
                                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Qty Released</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {PODetails?.length > 0 ?

                                        <TableBody>

                                            {PODetails.map((item, index) => {
                                                return (
                                                    <TableRow key={index} style={item.id == EditId ? { background: 'rgba(239,30,44,0.15)' } : { background: '#fff' }}>
                                                        <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                        <TableCell align="center">
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <button className='deletbtn' title='Delete' onClick={() => deleteItem(item.id)}><DeleteIcon size={20} color='red' /></button>
                                                                <button className='deletbtn' title='Edit' onClick={() => editItem(item)}><BorderColorIcon size={20} color='#000' /></button>
                                                            </div>

                                                        </TableCell>
                                                        {/* <TableCell align="left" >{item.RefNo}</TableCell> */}
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.MaterialDetail}</TableCell>
                                                        {/* <TableCell align="left" >{item.nQty}</TableCell>
                                                        <TableCell align="left" >{item.BalanceQuantity}</TableCell> */}
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.ExpDate}</TableCell>
                                                        <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nQTYOut}</TableCell>


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
            </div>

            <div className='displayflex-2'>

                <button type="submit" className='submitbtn-2' style={{ marginRight: 10 }} onClick={goback}><HomeIcon size={18} /> Home</button>
                {/* {firstRecord == true ?
                    <div>
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
                    :
                } */}
                <div></div>
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
            left:'-10px',  
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
        left:'-10px',
        backgroundColor: 'transparent',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
   

};
export default AddMaterialRelease