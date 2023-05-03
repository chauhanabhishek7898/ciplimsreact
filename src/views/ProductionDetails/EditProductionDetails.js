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
import { GetBatchNoDetails } from '../MaterialRelease/MaterialReleaseService'
import { MaterialMaster_SelectAll_ActiveLikeSearch } from '../MaterialMaster/MaterialMasterService'
import { PlantMaster_SelectAll_ActiveLikeSearch } from '../PlantMaster/PlantMasterService'
import { VendorMaster_SelectAll_ActiveLikeSearch, VendorMaster_SelectAll_Active } from '../VenderForm/VenderFormService'
import { GetPODetails, GetPOByPOId } from '../PurchaseOrder/POMasterService'
import { ProductionDetails_Insert, GetPODetailsLIkeSearch, GetExpDateForRejection, GetBalStockForRejection, GetMRDOCDetailsLIkeSearch, GetProductionDetailsByPDId, ProductionDetails_Update } from './ProductionDetailsService'
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
import { parseDateToString, parseDateToStringSubmit, parseTimeToStringSubmit } from '../../coreservices/Date';
import { useNavigate, useLocation } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import { number } from 'prop-types';
import { Navigation } from '@coreui/coreui';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import { makeStyles } from "@material-ui/core/styles";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { imageUrl } from 'src/coreservices/environment';
function EditProductionDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  let nPDIds = location.state.nPDId
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [brandData, setBrandData] = React.useState([]);
  const [MaterialMaster, setMaterialMaster] = React.useState([]);
  const [PlantMaster, setPlantMaster] = React.useState([]);
  const [vMRDocNoData, setvMRDocNoData] = React.useState([]);
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
    pdate: '',
    psTime: '',
    peTime: '',
    endDate: '',
    mrDocNo: '',
    bbdDate: '',
    mfgDate: '',
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
  const [LeftQty, setLeftQty] = useState('')
  const [vUOM, setvUOM] = useState('')
  const [expireDateValue, setexpireDateValue] = useState('')
  const [EditId, setEditId] = useState('')
  const [expireDate, setExpireDate] = useState([])
  const [monthmodalIsOpen, setmonthmodalIsOpen] = React.useState(false);
  const [GrnData, setGrnData] = React.useState([]);
  const [FirstTimeAdd, setFirstTimeAdd] = React.useState(true);
  const [CrruntTime, setCrruntTime] = React.useState(dayjs(startDates));
  const [vPDStartTime, setvPDStartTime] = React.useState(dayjs(startDates));
  const [vPDEndTime, setvPDEndTime] = React.useState(dayjs(startDates));
  const [nPDId, setnPDId] = useState('')
  const [vPDId, setvPDId] = useState('')
  const [nBDInMins, setnBDInMins] = useState('')
  const [vMRDocNo, setvMRDocNo] = useState('')
  const [vMRDocNolabel, setvMRDocNolabel] = useState('')
  const [vBrand, setvBrand] = useState('')
  const [vPack, setvPack] = useState('')
  const [nProductionQty, setnProductionQty] = useState('')
  const [nSampleQty, setnSampleQty] = useState('')
  const [nTotalSalableQty, setnTotalSalableQty] = useState('')
  const [nYieldPer, setnYieldPer] = useState('')
  const [nLossPer, setnLossPer] = useState('')
  const [dtBBD, setdtBBD] = useState(dayjs(startDates))
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
  const handleChangedtBBDdate = (newValue) => {
    setdtBBD(newValue);
    setError({
      date: ''
    })
  };
  const handleChangedtMfgdate = (newValue) => {
    setdtMfgDate(newValue);
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
    getProductionDetailsByPDId()
  }, [])
  const getProductionDetailsByPDId = () => {
    GetProductionDetailsByPDId(parseInt(nPDIds)).then(res => {
      setnPDId(res.ProductionDetails[0].nPDId)
      setStartDate(new Date(res.ProductionDetails[0].dtDated))
      setnPId(res.ProductionDetails[0].nPId)
      setPlantDetail(res.ProductionDetails[0].PlantDetail)
      let pstartTime = new Date(`${new Date().toDateString()} ${res.ProductionDetails[0].vPDStartTime}`)
      setvPDStartTime(pstartTime)
      let pEndTime = new Date(`${new Date().toDateString()} ${res.ProductionDetails[0].vPDEndTime}`)
      setvPDEndTime(pEndTime)
      setnBDInMins(res.ProductionDetails[0].nBDInMins)
      setvMRDocNo(res.ProductionDetails[0].vMRDocNo)
      setvMRDocNolabel(res.ProductionDetails[0].vMRDocNo)
      setvBrand(res.ProductionDetails[0].vBrand)
      setvPack(res.ProductionDetails[0].vPack)
      setnProductionQty(res.ProductionDetails[0].nProductionQty)
      setnSampleQty(res.ProductionDetails[0].nSampleQty)
      setnTotalSalableQty(res.ProductionDetails[0].nTotalSalableQty)
      setnYieldPer(res.ProductionDetails[0].nYieldPer)
      setnLossPer(res.ProductionDetails[0].nLossPer)
      setvBatchNo(res.ProductionDetails[0].vBatchNo)
      setdtBBD(new Date(res.ProductionDetails[0].dtBBD))
      setdtMfgDate(new Date(res.ProductionDetails[0].dtMFGDate))

      setBtActive(res.ProductionDetails[0].btActive)
      setvRemarks(res.ProductionDetails[0].vRemarks)
    })
  }
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
    GetMRDOCDetailsLIkeSearch(nPId, vGeneric == undefined || vGeneric == '' ? null : vGeneric.target.value).then(res => {
      let count = Object.keys(res).length
      let data = []
      for (var i = 0; i < count; i++) {
        data.push({
          value: res[i].vBatchNo,
          label: res[i].vBatchNo,
          vBrand: res[i].vBrand,
          vPack: res[i].vPack,
          // label: res[i].MaterialDetail,       
        })
      }
      setvMRDocNoData(data)
    })

  }
  const changePlantValue = (value) => {
    if (FirstTimeAdd == true) {
      setnPId(value.value)
      setPlantDetail(value.label)
      getExpDateForRejection(value.value, nMId == '' ? 0 : nMId)
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
              getExpDateForRejection(value.value, nMId == '' ? 0 : nMId)
              setError({
                plant: ''
              })
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
    setvMRDocNo(value.value)
    setvMRDocNolabel(value.label)
    setvBrand(value.vBrand)
    setvPack(value.vPack)
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
      
      setError({
        MaterialDetail: 'Select Item *'
      })
      return false
    } else if (expireDateValue == '' || expireDateValue == undefined) {
      setError({
        expireDateValue: 'Select Exp Date*'
      })
      return false
    } else if (nQty == '' || nQty == undefined) {
      setError({
        QuanAccept: 'Enter Qty*'
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
                poMasteerDetail[indexToUpdate].nQTYOut = parseFloat(nQty == '' ? 0 : nQty),
                poMasteerDetail[indexToUpdate].LeftQty = parseFloat(LeftQty == '' ? 0 : LeftQty),
                poMasteerDetail[indexToUpdate].vUOM = vUOM,
                poMasteerDetail[indexToUpdate].dtExpDate = expireDateValue,
                poMasteerDetail[indexToUpdate].nPId = nPId,


                setPODetails(poMasteerDetail)
              setbtnType('')
              setnMId('')
              setMaterialDetail('')
              setdtExpDate(new Date(Date.now()))
              setnQty('')
              setLeftQty('')
              setexpireDateValue('')
              setvUOM('')
              setEditId('')

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
                let findnMId = poMasteerDetail.find(e => e.nMId == nMId && e.dtExpDate == expireDateValue)
                if (findnMId) {
                  toast.success("Material with this expiry date is already Added.")
                } else {
                  poMasteerDetail.push({
                    id: new Date().getUTCMilliseconds(),
                    nMId: parseInt(nMId),
                    MaterialDetail: MaterialDetail,
                    nQTYOut: parseFloat(nQty == '' ? 0 : nQty),
                    LeftQty: parseFloat(LeftQty == '' ? 0 : LeftQty),
                    vUOM: vUOM,
                    dtExpDate: expireDateValue,
                    nPId: nPId,

                  })

                  setPODetails(poMasteerDetail)
                  setnMId('')
                  setMaterialDetail('')
                  setdtExpDate(new Date(Date.now()))
                  setnQty('')
                  setLeftQty('')
                  setexpireDateValue('')
                  setvUOM('')
                  setEditId('')


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
    if (parseDateToString(new Date(startDate))?.length != 10) {
      setError({
        pdate: 'Invaild Date *'
      })
      return false
    } else if (nPId == '') {
      setError({
        plant: 'Select PO No. *'
      })
      return false
    } else if (parseTimeToStringSubmit(new Date(vPDStartTime))?.length > 5 || parseTimeToStringSubmit(new Date(vPDStartTime))?.length < 3) {
      setError({
        psTime: 'Invaild Time *'
      })
      return false
    } else if (parseTimeToStringSubmit(new Date(vPDEndTime))?.length > 5 || parseTimeToStringSubmit(new Date(vPDEndTime))?.length < 3) {
      setError({
        peTime: 'Invaild Time *'
      })
      return false
    } else if (vMRDocNo == '' || vMRDocNo == undefined) {
      setError({
        mrDocNo: 'Select Material Release Doc No *'
      })
      return false
    } else if (parseDateToString(new Date(dtBBD))?.length != 10) {
      setError({
        bbdDate: 'Invaild Date *'
      })
      return false
    } else if (parseDateToString(new Date(dtMfgDate))?.length != 10) {
      setError({
        mfgDate: 'Invaild Date *'
      })
      return false
    } else {
      setError('')
      return true
    }

  }

  const submit = () => {
    if (validateform() == true) {
      confirmAlert({
        title: 'Alert !!',
        message: 'Do you want Proceed ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              setLoader(true)
              let psTime=parseTimeToStringSubmit(new Date(vPDStartTime)).split(':')
              let psHr= psTime[0]
              let psMinut= psTime[1]
              if(psMinut?.length==1){
                psMinut=0+psMinut
              }
              let pdsTime= psHr+':'+psMinut
              let peTime=parseTimeToStringSubmit(new Date(vPDEndTime)).split(':')
              let peHr= peTime[0]
              let peMinut= peTime[1]
              if(peMinut?.length==1){
                peMinut=0+peMinut
              }
              let pdeTime= peHr+':'+peMinut;
              let data = {
                ProductionDetails: [{
                  nPDId: nPDId,
                  nPId: nPId,
                  dtDated: parseDateToStringSubmit(new Date(startDate)),
                  vPDStartTime: pdsTime,
                  vPDEndTime: pdeTime,
                  nBDInMins: nBDInMins,
                  vMRDocNo: vMRDocNo,
                  vBrand: vBrand,
                  vPack: vPack,
                  nProductionQty: nProductionQty,
                  nSampleQty: nSampleQty,
                  nTotalSalableQty: nTotalSalableQty,
                  nYieldPer: nYieldPer,
                  nLossPer: nLossPer,
                  vBatchNo: vBatchNo,
                  dtBBD: parseDateToStringSubmit(new Date(dtBBD)),
                  dtMFGDate: parseDateToStringSubmit(new Date(dtMfgDate)),
                  vRemarks: vRemarks,
                  btActive: true,
                  nLoggedInUserId: parseInt(nLoggedInUserId)
                }]

              }
              // let GRNOrder = {}
              // GRNOrder.GRNMaster = POMasterData,
              //   GRNOrder.GRNDetails = PODetails
              console.log('PurchaseOrder', data)
              ProductionDetails_Update(data).then(res => {
                if (res) {
                  setLoader(false)
                  toast.success("Record Added Successfully !!")
                  navigate('/ProductionDetails')
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
    setexpireDateValue(item.dtExpDate)
    setnQty(item.nQTYOut)
    setLeftQty(item.LeftQty)
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
          onClick: () => { navigate('/ProductionDetails') },
        },
        {
          label: 'No',
          onClick: () => { return null }
        }
      ]
    });

  }

  const getBatchNoDetails = (value) => {
    setvBatchNo(value)
    setTimeout(() => {
      if (value == '' || value == undefined) {
      } else {
        setTimeout(() => {
          GetBatchNoDetails(value).then(res => {
            console.log('response', res)
            // setExpireDate(res)
            if (res?.length > 0) {

              setnPId(res[0].nPId)
              setPlantDetail(res[0].PlantDetail)
            } else {
              setPlantDetail('')
            }
          })
        }, 1000)
      }
    }, 2000)
  }
  const getExpDateForRejection = (PId, MId) => {

    GetExpDateForRejection(PId, MId).then(res => {
      console.log('response', res)
      setExpireDate(res)

    })
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
            getMaterialforRelease(nPId, nMId, e.target.value)
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
  const getMaterialforRelease = (PId, MId, expireDate) => {
    GetBalStockForRejection(PId, MId, expireDate).then(res => {
      console.log('response', res)
      setLeftQty(res[0].BalQty)

    })
  }
  const onChangenQty = (value) => {
    setnQty(value)
    setTimeout(() => {
      if (value != '' || value != undefined) {
        if (value <= LeftQty) {

        } else {
          console.log('false')
          confirmAlert({
            title: 'Alert !!',
            message: 'Input Qty. should not be greater than Quantity Stock .',
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
  const closeModal = () => {
    setmonthmodalIsOpen(false)
    navigate('/ProductionDetails')
  }
  const refreshbtn = () => {
    setEditId('')
    setnMId('')
    setMaterialDetail('')
    setexpireDateValue('')
    setnQty('')
    setLeftQty('')
    setvUOM('')
    setbtnType('')
  }
 
  return (
    <div className='citymasterContainer'>
      <div className='dateFilter-2'>
        <div className='displayflexend mt-2'>
          <Box className='inputBox-26' >
            <FormControl fullWidth className='input' >
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Stack spacing={3} >
                  <DesktopDatePicker

                    label="Production Date *"
                    inputFormat="DD-MM-YYYY"
                    value={startDate}
                    required
                    maxDate={startDates}

                    onChange={handleChangeStartdate}
                    renderInput={(params) => <TextField
                      {...params}
                      sx={muiStyles.date}
                    />}
                  />
                </Stack>
              </LocalizationProvider>
              {errorText.pdate != '' ? <p className='error'>{errorText.pdate}</p> : null}
            </FormControl>
          </Box>
          {/* <Box sx={{ width: '15%', marginTop: 1 }} >
                      <FormControl fullWidth className='input'>
                          <TextField
                              value={vBatchNo}
                              onChange={e => getBatchNoDetails(e.target.value)}
                              id="outlined-basic"
                              label="Batch No"
                              variant="outlined"
                              name='BatchNo'
                              required
                          inputRef={register({ required: "Batch No is required.", })}
                          error={Boolean(errors.BatchNo)}
                          helperText={errors.BatchNo?.message}
                          />
                      </FormControl>
                  </Box> */}
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
          <Box className='inputBox-38'>
            <FormControl fullWidth className='input' >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  required
                  label="Production Start Time *"
                  value={vPDStartTime}
                  ampm={false}
                  onChange={(newValue) => {
                    setvPDStartTime(newValue);
                    setError('')
                  }}
                  renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                />
              </LocalizationProvider>
              {errorText.psTime != '' ? <p className='error'>{errorText.psTime}</p> : null}
            </FormControl>
          </Box>
          <Box className='inputBox-38'>
            <FormControl fullWidth className='input' >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  required
                  label="Production End Time *"
                  value={vPDEndTime}
                  ampm={false}
                  onChange={(newValue) => {
                    
                    setvPDEndTime(newValue);
                    setError('')
                  }}
                  renderInput={(params) => <TextField sx={muiStyles.date} {...params} />}
                />
              </LocalizationProvider>
              {errorText.peTime != '' ? <p className='error'>{errorText.peTime}</p> : null}
            </FormControl>
          </Box>
          <Box className='inputBox-38' >
            <FormControl fullWidth className='input'>
              <TextField
                sx={muiStyles.input}
                value={nBDInMins}
                onChange={e => setnBDInMins(e.target.value)}
                id="outlined-basic"
                label="BD in Minutes"
                variant="outlined"
                name='BDinMinutes'
                required
                inputRef={register({ required: "BD in Minutes is required.", })}
                error={Boolean(errors.BDinMinutes)}
                helperText={errors.BDinMinutes?.message}
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
                options={vMRDocNoData}
                value={vMRDocNolabel}
                // changePlantValue(value)
                onChange={(event, value) => changeMaterialMasterValue(value)}
                // inputValue={inputValue}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onKeyDown={newInputValue => materialMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                onInputChange={(event, newInputValue) => {
                  // setInputValue(newInputValue);
                  console.log('newInputValue', newInputValue)
                }}

                renderInput={(params) => <TextField {...params} label="Search Material Release Doc No " required />}
              />
              {errorText.mrDocNo != '' ? <p className='error'>{errorText.mrDocNo}</p> : null}
            </FormControl>
          </Box>
          <Box className='inputBox-42'>
            <FormControl fullWidth className='input'>
              {/* <InputLabel required id="demo-simple-select-label">Plant</InputLabel>npm  */}
              {/* <Autocomplete
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

                              renderInput={(params) => <TextField {...params} label="Search Brand " required />}
                          />
                          {errorText.plant != '' ? <p className='error'>{errorText.plant}</p> : null} */}
              <TextField
                sx={muiStyles.input}
                value={vBrand}
                onChange={e => setvBrand(e.target.value)}
                id="outlined-basic"
                label="Brand"
                variant="outlined"
                name='Brand'
                disabled={true}
                required
                inputRef={register({ required: "Brand is required.", })}
                error={Boolean(errors.Brand)}
                helperText={errors.Brand?.message}
              />
            </FormControl>
          </Box>
          <Box className='inputBox-42'>
            <FormControl fullWidth className='input'>
              {/* <InputLabel required id="demo-simple-select-label">Plant</InputLabel>npm  */}
              {/* <Autocomplete
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

                              renderInput={(params) => <TextField {...params} label="Search Pack " required />}
                          />
                          {errorText.plant != '' ? <p className='error'>{errorText.plant}</p> : null} */}
              <TextField
                sx={muiStyles.input}
                value={vPack}
                onChange={e => setvPack(e.target.value)}
                id="outlined-basic"
                label="Pack"
                variant="outlined"
                name='Pack'
                disabled={true}
                required
                inputRef={register({ required: "Pack is required.", })}
                error={Boolean(errors.Pack)}
                helperText={errors.Pack?.message}
              />
            </FormControl>
          </Box>
          <Box className='inputBox-38' >
            <FormControl fullWidth className='input'>
              <TextField
                sx={muiStyles.input}
                value={nProductionQty}
                onChange={e => setnProductionQty(e.target.value)}
                id="outlined-basic"
                label="Production Qty"
                variant="outlined"
                name='ProductionQty'
                required
                inputRef={register({ required: "Production Qty is required.", })}
                error={Boolean(errors.ProductionQty)}
                helperText={errors.ProductionQty?.message}
              />
            </FormControl>
          </Box>
          <Box className='inputBox-38' >
            <FormControl fullWidth className='input'>
              <TextField
                sx={muiStyles.input}
                value={nSampleQty}
                onChange={e => setnSampleQty(e.target.value)}
                id="outlined-basic"
                label="Sample Qty"
                variant="outlined"
                name='SampleQty'
                required
                inputRef={register({ required: "Sample Qty is required.", })}
                error={Boolean(errors.SampleQty)}
                helperText={errors.SampleQty?.message}
              />
            </FormControl>
          </Box>
          <Box className='inputBox-8' >
            <FormControl fullWidth className='input'>
              <TextField
                sx={muiStyles.input}
                value={nTotalSalableQty}
                onChange={e => setnTotalSalableQty(e.target.value)}
                id="outlined-basic"
                label="Total Salable Stock Qty"
                variant="outlined"
                name='TotalSalableStockQty'
                required
                inputRef={register({ required: "Total Salable Stock Qty is required.", })}
                error={Boolean(errors.TotalSalableStockQty)}
                helperText={errors.TotalSalableStockQty?.message}
              />
            </FormControl>
          </Box>
          <Box className='inputBox-38' >
            <FormControl fullWidth className='input'>
              <TextField
                sx={muiStyles.input}
                value={nYieldPer}
                onChange={e => setnYieldPer(e.target.value)}
                id="outlined-basic"
                label="Yield Per"
                variant="outlined"
                name='YieldPer'
                required
                inputRef={register({ required: "Yield Per is required.", })}
                error={Boolean(errors.YieldPer)}
                helperText={errors.YieldPer?.message}
              />
            </FormControl>
          </Box>
          <Box className='inputBox-38' >
            <FormControl fullWidth className='input'>
              <TextField
                sx={muiStyles.input}
                value={nLossPer}
                onChange={e => setnLossPer(e.target.value)}
                id="outlined-basic"
                label="Lose Per"
                variant="outlined"
                name='LosePer'
                required
                inputRef={register({ required: "Lose Per is required.", })}
                error={Boolean(errors.LosePer)}
                helperText={errors.LosePer?.message}
              />
            </FormControl>
          </Box>
          <Box className='inputBox-38' >
            <FormControl fullWidth className='input'>
              <TextField
                sx={muiStyles.input}
                value={vBatchNo}
                onChange={e => setvBatchNo(e.target.value)}
                id="outlined-basic"
                label="Batch No"
                variant="outlined"
                name='BatchNo'
                required
                inputRef={register({ required: "Batch No is required.", })}
                error={Boolean(errors.BatchNo)}
                helperText={errors.BatchNo?.message}
              />
            </FormControl>
          </Box>
          <Box className='inputBox-26' >
            <FormControl fullWidth className='input' >
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Stack spacing={3} >
                  <DesktopDatePicker

                    label="BBD *"
                    inputFormat="DD-MM-YYYY"
                    value={dtBBD}
                    required
                    maxDate={startDates}

                    onChange={handleChangedtBBDdate}
                    renderInput={(params) => <TextField
                      {...params}
                      sx={muiStyles.date}
                    />}
                  />
                </Stack>
              </LocalizationProvider>
              {errorText.bbdDate != '' ? <p className='error'>{errorText.bbdDate}</p> : null}
            </FormControl>
          </Box>
          <Box className='inputBox-26' >
            <FormControl fullWidth className='input' >
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Stack spacing={3} >
                  <DesktopDatePicker

                    label="MFG. Date *"
                    inputFormat="DD-MM-YYYY"
                    value={dtMfgDate}
                    required
                    maxDate={startDates}

                    onChange={handleChangedtMfgdate}
                    renderInput={(params) => <TextField
                      {...params}
                      sx={muiStyles.date}
                    />}
                  />
                </Stack>
              </LocalizationProvider>
              {errorText.mfgDate != '' ? <p className='error'>{errorText.mfgDate}</p> : null}
            </FormControl>
          </Box>
          <Box className='inputBox-32' >
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
            <FormControlLabel style={{marginRight:0}} control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
          </FormGroup>
        </div>
      </div>
      <div className='displayflex-2 mt-2'>

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
        style={muiStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className='displayright'>
          <div><span className='title'>Alert !!</span></div>
          <HighlightOffIcon fontSize='large' onClick={closeModal} />
        </div>
        <div>
          <div className='editModel-2'>
            <div><p className='errormasg'>OOPS !!, For this selected Transaction, Input Quantity is greater than Balance Stock Quantity. Please try again with appropriate inputs.</p></div>
            <div className='tablecenter'>
              {GrnData.length > 0 ?
                <Paper sx={{ width: '100%', overflow: 'hidden',paddingTop:1 }}>
                  <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell scope="row">SN.</TableCell>
                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Plant Detail</TableCell>
                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Material Name</TableCell>
                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Exp Date</TableCell>
                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Bal Stock</TableCell>
                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Input Qty</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>

                        {GrnData.map((item, index) => {
                          return (

                            <TableRow key={index}>

                              <TableCell component="th" scope="row">{index + 1}.</TableCell>
                              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.PlantDetail}</TableCell>
                              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.MaterialDetail}</TableCell>
                              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.dtExpDate}</TableCell>
                              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.BalanceStockQty}</TableCell>
                              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nQTYOut}</TableCell>
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


export default EditProductionDetails