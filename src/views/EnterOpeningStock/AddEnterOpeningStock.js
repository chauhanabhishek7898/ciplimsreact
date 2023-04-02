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
import { MaterialMaster_SelectAll_ActiveLikeSearch } from '../MaterialMaster/MaterialMasterService'
import { PlantMaster_SelectAll_ActiveLikeSearch } from '../PlantMaster/PlantMasterService'
import { VendorMaster_SelectAll_ActiveLikeSearch, VendorMaster_SelectAll_Active } from '../VenderForm/VenderFormService'
import { GetPODetails, GetPOByPOId } from '../PurchaseOrder/POMasterService'
import { OpeningStock_Insert, GetPODetailsLIkeSearch } from './EnterOpeningStockService'
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
function AddEnterOpeningStock() {
    const navigate = useNavigate();
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
    const [vUOM, setvUOM] = useState('')
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
            setnPOId(value.value)
            setPlantDetail(value.label)
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
                            setError({
                                plant: ''
                            })
                            setnMId('')
                            setMaterialDetail('')
                            setdtExpDate(new Date(Date.now()))
                            setnQtyAccepted('')
                            setnQtyRejected('')
                            setnAmt('')
                            setvUOM('')
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

        if (type == 'nQtyAccepted') {
            setnQtyAccepted(value)
            setnAmt(0)
            let amount = parseFloat(value == '' ? 0 : value) + parseFloat(nQtyRejected == '' ? 0 : nQtyRejected)
            setnAmt(parseFloat(amount))

        }

        if (type == 'nQtyRejected') {
            setnQtyRejected(value)
            let amount = parseFloat(value == '' ? 0 : value) + parseFloat(nQtyAccepted == '' ? 0 : nQtyAccepted)
            setnAmt(parseFloat(amount))

        }

    }
    const validateformPoDetial = () => {
        if (nMId == '' || nMId == undefined) {
            alert(1)
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
                                poMasteerDetail[indexToUpdate].vUOM = vUOM ,
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
                            setvUOM('')
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
                                let findnMId = poMasteerDetail.find(e => e.nMId == nMId&&e.dtExpDate == parseDateToStringSubmit(new Date(dtExpDate)))
                                if (findnMId) {
                                    toast.success("Material with this expiry date is already Added.")
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
                                    setnMId('')
                                    setMaterialDetail('')
                                    setdtExpDate(new Date(Date.now()))
                                    setnAmt('')
                                    setnQtyAccepted('')
                                    setnQtyRejected('')
                                    setvUOM('')
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
        if (nPOId == '') {
            setError({
                plant: 'Select PO No. *'
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
                                    nPId: nPOId,
                                    dtGRNDate: parseDateToStringSubmit(new Date(startDate)),
                                    vRemarks: vRemarks,
                                    btActive: true,
                                    nLoggedInUserId: parseInt(nLoggedInUserId)
                                }]
                                let GRNOrder = {}
                                GRNOrder.GRNMaster = POMasterData,
                                    GRNOrder.GRNDetails = PODetails
                                console.log('PurchaseOrder', GRNOrder)
                                OpeningStock_Insert(GRNOrder, vPOFilePath).then(res => {
                                    if (res) {
                                        setLoader(false)
                                        toast.success("Record Added Successfully !!")
                                        navigate('/EnterOpeningStock')

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
        setdtExpDate(item.dtExpDate2)
        setnQtyAccepted(item.nQtyAccepted)
        setnQtyRejected(item.nQtyRejected)
        setnAmt(item.TotalQty)
        setvUOM(item.vUOM)

    }
    const goback = () => {
        confirmAlert({
            title: 'Alert !!',
            closeOnClickOutside: false,
            message: 'Are you Sure ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { navigate('/EnterOpeningStock') },
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
        setdtExpDate(new Date(Date.now()))
        setnQtyAccepted('')
        setnQtyRejected('')
        setnAmt('')
        setvUOM('')
        setbtnType('')
    }
    return (
        <div className='citymasterContainer'>
            <div className='dateFilter-2'>
                <div className='displayflexend'>
                <Box sx={{ width: '11.5%' }} >
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={startDate}
                                        required
                                        maxDate={startDates}
                                        onChange={handleChangeStartdate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.date != '' ? <p className='error'>{errorText.date}</p> : null}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '39%', marginTop: 2 }} >
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
                    <Box sx={{ width: '41%', marginTop: 1 }} >
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
                    <FormGroup >
                        <FormControlLabel control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                    </FormGroup>
                </div>
            </div>
            <div className='databox'>
                <div className='data-form-box'>
                    <Box sx={{ width: '25%' }} >
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
                     <Box sx={{ width: '11%' }} >
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
                    <Box sx={{ width: '12%' }} >
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
                    <Box sx={{ width: '12%' }} >
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

                   
                    <Box sx={{ width: '11%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                            sx={muiStyles.input}
                                value={nAmt}
                                onChange={e => setnAmt(e.target.value)}
                                id="outlined-basic"
                                label="Total Qty"
                                variant="outlined"
                                name='Amount'
                                type="number" inputProps={{ min: 4, max: 1000000000000000000000000000000 }}
                                disabled={true}
                            // inputRef={register({ required: "Amount is required.*", })}
                            // error={Boolean(errors.Amount)}
                            // helperText={errors.Amount?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '11.5%' }} >
                        <FormControl fullWidth className='input' >
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <Stack spacing={3} >
                                    <DesktopDatePicker
                                        label="Expire Date *"
                                        inputFormat="DD-MM-YYYY"
                                        value={dtExpDate}
                                        required
                                        onChange={handleChangedtExpDate}
                                        renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                            {errorText.date != '' ? <p className='error'>{errorText.date}</p> : null}
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
                                            <TableCell scope="row" style={{ width: '2%' }} >SN.</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Material Name</TableCell>
                                            {/* <TableCell align="left" style={{whiteSpace:'nowrap'}}>PO Qty</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Balance QTY</TableCell> */}
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>UOM</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Qty Accepted</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Qty Rejected</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Total Qty</TableCell>
                                            <TableCell align="left" style={{whiteSpace:'nowrap'}}>Exp Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {PODetails?.length > 0 ?

                                        <TableBody>

                                            {PODetails.map((item, index) => {
                                                return (
                                                    <TableRow key={index} style={item.id==EditId?{background:'rgba(239,30,44,0.15)'}:{background:'#fff'}}>
                                                        <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                        <TableCell align="center">
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <button className='deletbtn' title='Delete' onClick={() => deleteItem(item.id)}><DeleteIcon size={20} color='red' /></button>
                                                                <button className='deletbtn' title='Edit' onClick={() => editItem(item)}><BorderColorIcon size={20} color='#000' /></button>

                                                            </div>

                                                        </TableCell>
                                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.MaterialDetail}</TableCell>
                                                        {/* <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nQty}</TableCell>
                                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.BalanceQuantity}</TableCell> */}
                                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.vUOM}</TableCell>
                                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nQtyAccepted}</TableCell>
                                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.nQtyRejected}</TableCell>
                                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{item.TotalQty}</TableCell>
                                                        <TableCell align="left" style={{whiteSpace:'nowrap'}}>{parseDateToString(new Date(item.dtExpDate2))}</TableCell>

                                                    </TableRow>
                                                )
                                            })
                                            }

                                        </TableBody>
                                        :

                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left" style={{whiteSpace:'nowrap'}}>No Record</TableCell>
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
            backgroundColor: 'transparent',
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
            backgroundColor: 'transparent',
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
            backgroundColor: 'transparent',
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
        backgroundColor: 'transparent',
        "&.Mui-focused": {
            zIndex: '1'
        }
    },
   

};
export default AddEnterOpeningStock