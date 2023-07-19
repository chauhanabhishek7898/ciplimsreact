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
import { PackMaster_SelectAll_ActiveLikeSearch } from '../PackMaster/PackMasterService'
import { MaterialMaster_SelectAll_ActiveLikeSearch } from '../MaterialMaster/MaterialMasterService'
import { PlantMaster_SelectAll_ActiveLikeSearch } from '../PlantMaster/PlantMasterService'
import { BrandMaster_SelectAll_ActiveLikeSearch } from '../BrandMaster/BrandMasterService'
import { GetPODetails, GetPOByPOId } from '../PurchaseOrder/POMasterService'
import { DispatchMasterPost, GetPODetailsLIkeSearch ,GetDispatchById,DispatchMasterPut} from './DispatchDetailsService'
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
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import { imageUrl } from 'src/coreservices/environment';
function EditDispatchDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  let nDSIds = location.state.nDSId
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [PlantMaster, setPlantMaster] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [nPId, setnPId] = React.useState('');
  const [PlantDetail, setPlantDetail] = React.useState('');
  const [vRemarks, setvRemarks] = React.useState('');
  const [vPOFilePath, setvPOFilePath] = React.useState('');
  const [btActive, setBtActive] = React.useState(true);
  const [disabled, setdisabled] = React.useState(true)
  const { register, handleSubmit, control, errors } = useForm();

  // const [rows, setRows] = useState(brandData);
  const [searched, setSearched] = React.useState("");

  let fromDates = new Date(Date.now())
  fromDates.setDate(fromDates.getDate() - 7)
  let toDates = new Date(Date.now())
  let startDates = new Date(Date.now())
  let endDates = new Date(Date.now())
  const [startDate, setStartDate] = React.useState(dayjs(startDates));
  const [PODetails, setPODetails] = React.useState([]);
  const [nLoggedInUserId, setnLoggedInUserId] = React.useState('');
  const [errorText, setError] = React.useState({
      plant: '',
      vendor: '',
      date: '',
      brand:'',
      pack:'',
      dom:'',
      bbd:'',
      qSold:'',
      batchno:'',
      salesreturn:''

  });
  const [preview, setPreview] = useState('')
  const [btnType, setbtnType] = useState('')
  const [imgpreview, setimgPreview] = useState(false)
  const [localImage, setlocalImage] = useState(false)
  const imageRef = useRef(null)
  const [alert, setAlert] = React.useState({
      type: 'error',
      text: 'This is a alert message',
      show: false
  })
  const [vVehicleNo, setvVehicleNo] = useState('')
  const [vInvoiceNo, setvInvoiceNo] = useState('')
  const [nPOId, setnPOId] = useState('')
  const [vLorryRecNo, setvLorryRecNo] = useState('')
  const [vEWayBillNo, setvEWayBillNo] = useState('')
  const [vBatchNo, setvBatchNo] = useState('')
  
  const [EditId, setEditId] = useState('')
  const [vShipToLocation, setvShipToLocation] = useState('')
  const [vTransporterName, setvTransporterName] = useState('')
  const [vVehicleCapacity, setvVehicleCapacity] = useState('')
  const [vMATCOAFilePath, setvMATCOAFilePath] = useState('')
  const [vBrand, setvBrand] = useState('')
  const [vPack, setvPack] = useState('')
  const [nQtySold, setnQtySold] = useState('')
  const [nSalesReturn, setnSalesReturn] = useState('')
  const [BrandMaster, setBrandMaster] = useState([])
  const [PackMaster, setPackMaster] = useState([])
  const [PackLabel, setPackLabel] = useState('')
  const [BrandLabel, setBrandLabel] = useState('')
  const [nPackId, setnPackId] = useState('')
  const [nBrandId, setnBrandId] = useState('')

  const [dtDOM, setdtDOM] = useState(dayjs(startDates))
  const [dtBBD, setdtBBD] = useState(dayjs(startDates))
  const [FirstTimeAdd, setFirstTimeAdd] = React.useState(true);


  useEffect(() => {
      const userId = localStorage.getItem("nUserId")
      setnLoggedInUserId(userId)
  }, [])
  
  const handleChangeStartdate = (newValue) => {
      setStartDate(newValue);
      setError({
          date: ''
      })
  };
 
  const handleChangedtDOMDate = (newValue) => {
      setdtDOM(newValue);
      setError({
          date: ''
      })
  };
  const handleChangedtBBDDate = (newValue) => {
      setdtBBD(newValue);
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
    GetDispatchById(parseInt(nDSIds)).then(res => {
      setStartDate(new Date(res.TAB1[0].dtDated))
      setnPId(res.TAB1[0].nPId)
      setPlantDetail(res.TAB1[0].PlantDetail)
      setvInvoiceNo(res.TAB1[0].vInvoiceNo)
      setvInvoiceNo(res.TAB1[0].vInvoiceNo)
      setvEWayBillNo(res.TAB1[0].vEWayBillNo)
      setvShipToLocation(res.TAB1[0].vShipToLocation)
      setvTransporterName(res.TAB1[0].vTransporterName)
      setvVehicleCapacity(res.TAB1[0].vVehicleCapacity)
      setvVehicleNo(res.TAB1[0].vVehicleNo)
      setvMATCOAFilePath(res.TAB1[0].vMATCOAFilePath)
      setBtActive(res.TAB1[0].btActive)
      setvRemarks(res.TAB1[0].vRemarks)
      if (res.TAB1[0].vMATCOAFilePath != '' && res.TAB1[0].vMATCOAFilePath != null) {
        setimgPreview(true)
        setPreview(res.TAB1[0].vMATCOAFilePath)
        setlocalImage(false)
    } else {
        setimgPreview(false)
    }
    let count = Object.keys(res.TAB2).length
            let data = res.TAB2
            for(var i = 0; i < count; i++) {
                let counts = i
                res.TAB2[i].id=counts
                res.TAB2[i].dtDOM = parseDateToStringSubmit(new Date(res.TAB2[i].dtDOM))
                res.TAB2[i].dtBBD = parseDateToStringSubmit(new Date(res.TAB2[i].dtBBD))
            }
            setPODetails(data)
    })
    setEditId(null)
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
  const brandMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
      BrandMaster_SelectAll_ActiveLikeSearch(vGeneric == undefined || vGeneric == '' ? null : vGeneric.target.value).then(res => {
          let count = Object.keys(res).length
          let data = []
          for (var i = 0; i < count; i++) {
              data.push({
                  value: res[i].nBId,
                  label: res[i].BrandDetail,
                  // label: res[i].MaterialDetail,       
              })
          }
          setBrandMaster(data)
      })

  }
  const changePlantValue = (value) => {
      if (FirstTimeAdd == true) {
          setnPId(value.value)
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

  const changepackMasterValue = (value) => {
      setnPackId(value.value)
      setPackLabel(value.label)
      setvPack(value.label)
      setError('')
  }
  const changebrandMasterValue = (value) => {
      setnBrandId(value.value)
      setBrandLabel(value.label)
      setvBrand(value.label)
      setError('')
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
      if (vBrand == '' || vBrand == undefined) {
          
          setError({
              brand: 'Select Brand *'
          })
          return false
      } else if (vPack == '' || vPack == undefined) {
          setError({
              pack: 'Select Pack *'
          })
          return false
      }else if (nQtySold == '' || nQtySold == undefined) {
          setError({
              qSold: 'Enteer Qty Sold *'
          })
          return false
      } else if (vBatchNo == '' || vBatchNo == undefined) {
          setError({
              batchno: 'Enteer Batch No *'
          })
          return false
      } else if (parseDateToString(new Date(dtDOM))?.length != 10 ) {
          setError({
              dom: 'Invaild Time *'
          })
          return false
      } else if (parseDateToString(new Date(dtBBD))?.length != 10 ) {
          setError({
              bbd: 'Invaild Time *'
          })
          return false
      }else if (nSalesReturn == '' || nSalesReturn == undefined ) {
          setError({
              salesreturn: 'Enteer Sales Return *'
          })
          return false
      }
      else {
          setError('')
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
                              poMasteerDetail[indexToUpdate].nDSId = nDSIds,
                              poMasteerDetail[indexToUpdate].vBrand = vBrand,
                              poMasteerDetail[indexToUpdate].vPack = vPack,
                              poMasteerDetail[indexToUpdate].nQtySold = parseInt(nQtySold == '' ? 0 : nQtySold),
                              poMasteerDetail[indexToUpdate].vBatchNo = vBatchNo,
                              poMasteerDetail[indexToUpdate].dtDOM = parseDateToStringSubmit(new Date(dtDOM)),
                              poMasteerDetail[indexToUpdate].dtBBD = parseDateToStringSubmit(new Date(dtBBD)),
                              poMasteerDetail[indexToUpdate].nSalesReturn = parseFloat(nSalesReturn == '' ? 0 : nSalesReturn),

                              setPODetails(poMasteerDetail)
                          setnBrandId('')
                          setBrandLabel('')
                          setBrandLabel('')
                          setnPackId('')
                          setPackLabel('')
                          setvPack('')
                          setnQtySold('')
                          setnSalesReturn('')
                          setvBatchNo('')
                          setdtDOM(new Date(Date.now()))
                          setdtBBD(new Date(Date.now()))
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
              message: 'Do you want Add this ?',
              buttons: [
                  {
                      label: 'Yes',
                      onClick: () => {
                          if (validateformPoDetial() == true) {
                             
                              // let findnMId = poMasteerDetail.find(e => e.nMId == nMId && e.dtExpDate == parseDateToStringSubmit(new Date(dtExpDate)))
                              // if (findnMId) {
                              //     toast.success("Material with this expiry date is already Exists.")
                              // } else {
                              // }
                              let poMasteerDetail = [...PODetails]
                              poMasteerDetail.push({
                                  id: new Date().getUTCMilliseconds(),
                                  nDSId: nDSIds,
                                  vBrand: vBrand,
                                  vPack: vPack,
                                  nQtySold: parseInt(nQtySold == '' ? 0 : nQtySold),
                                  vBatchNo: vBatchNo,
                                  dtDOM: parseDateToStringSubmit(new Date(dtDOM)),
                                  dtBBD: parseDateToStringSubmit(new Date(dtBBD)),
                                  nSalesReturn: nSalesReturn,
                              })
  
                              setPODetails(poMasteerDetail)
                              setnBrandId('')
                              setBrandLabel('')
                              setBrandLabel('')
                              setnPackId('')
                              setPackLabel('')
                              setvPack('')
                              setnQtySold('')
                              setnSalesReturn('')
                              setvBatchNo('')
                              setdtDOM(new Date(Date.now()))
                              setdtBBD(new Date(Date.now()))
                              setEditId(null)
                             
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
      if ( parseDateToString(new Date(startDate))?.length != 10) {
          setError({
              date: 'Invaild Date *'
          })
          return false
      } else if (nPId == '') {
          
          setError({
              plant: 'Select Plant . *'
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
                                  nDSId: nDSIds,
                                  nPId: nPId,
                                  vInvoiceNo: vInvoiceNo,
                                  dtDated: parseDateToStringSubmit(new Date(startDate)),
                                  vEWayBillNo: vEWayBillNo,
                                  vShipToLocation: vShipToLocation,
                                  vTransporterName: vTransporterName,
                                  vVehicleCapacity: vVehicleCapacity,
                                  vVehicleNo: vVehicleNo,
                                  vMATCOAFilePath: vMATCOAFilePath,
                                  vRemarks: vRemarks,
                                  btActive: true,
                                  nLoggedInUserId: parseInt(nLoggedInUserId)
                              }]
                              let GRNOrder = {}
                              GRNOrder.DispatchMaster = POMasterData,
                              GRNOrder.DispatchDetails = PODetails
                              console.log('PurchaseOrder', GRNOrder)
                              DispatchMasterPut(GRNOrder, vPOFilePath).then(res => {
                                  if (res) {
                                      setLoader(false)
                                      toast.success("Record Added Successfully !!")
                                      navigate('/DispatchDetails')
  
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
      setBrandLabel(item.vBrand)
      setvBrand(item.vBrand)
      setPackLabel(item.vPack)
      setvPack(item.vPack)
      setnQtySold(item.nQtySold)
      setvBatchNo(item.vBatchNo)
      setdtDOM(item.dtDOM)
      setdtBBD(item.dtBBD)
      setnSalesReturn(item.nSalesReturn)
      

  }
  const goback = () => {
      confirmAlert({
          title: 'Alert !!',
          closeOnClickOutside: false,
          message: 'Are you Sure ?',
          buttons: [
              {
                  label: 'Yes',
                  onClick: () => { navigate('/DispatchDetails') },
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
      setBrandLabel('')
      setPackLabel('')
      setnQtySold('')
      setvBatchNo('')
      setdtDOM(new Date(Date.now()))
      setdtBBD(new Date(Date.now()))
      setnSalesReturn('')
      setbtnType('')
  }
  return (
      <div className='citymasterContainer'>
          <div className='dateFilter-2'>
              <div className='displayflexend mt-2'>
                  <Box className='inputBox-26'>
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
                                      renderInput={(params) => <TextField sx={muiStyles.date}{...params} />}
                                  />
                              </Stack>
                          </LocalizationProvider>
                          {errorText.date != '' ? <p className='error'>{errorText.date}</p> : null}
                      </FormControl>
                  </Box>

                  <Box className='inputBox-27'>
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
                  <Box className='inputBox-1'>
                      <FormControl fullWidth className='input'>
                          <TextField
                              sx={muiStyles.input}
                              value={vInvoiceNo}
                              onChange={e => setvInvoiceNo(e.target.value)}
                              id="outlined-basic"
                              label="Invoice No"
                              variant="outlined"
                              name='InvoiceNo'
                              required
                              inputRef={register({ required: "Batch No is required.", })}
                              error={Boolean(errors.InvoiceNo)}
                              helperText={errors.InvoiceNo?.message}
                          />
                      </FormControl>
                  </Box>
                  <Box className='inputBox-1' >
                      <FormControl fullWidth className='input'>
                          <TextField
                              sx={muiStyles.input}
                              value={vEWayBillNo}
                              onChange={e => setvEWayBillNo(e.target.value)}
                              id="outlined-basic"
                              label="EWay Bill No"
                              variant="outlined"
                              name='vEWayBillNo'
                              required
                              inputRef={register({ required: "EWay Bill No is required.", })}
                              error={Boolean(errors.vEWayBillNo)}
                              helperText={errors.vEWayBillNo?.message}
                          />
                      </FormControl>
                  </Box>
                  <Box className='inputBox-1' >
                      <FormControl fullWidth className='input'>
                          <TextField
                              sx={muiStyles.input}
                              value={vShipToLocation}
                              onChange={e => setvShipToLocation(e.target.value)}
                              id="outlined-basic"
                              label="Ship To Location"
                              variant="outlined"
                              name='vShipToLocation'
                              required
                              inputRef={register({ required: "Ship To Location is required.", })}
                              error={Boolean(errors.vShipToLocation)}
                              helperText={errors.vShipToLocation?.message}
                          />
                      </FormControl>
                  </Box>
                  <Box className='inputBox-1' >
                      <FormControl fullWidth className='input'>
                          <TextField
                              sx={muiStyles.input}
                              value={vTransporterName}
                              onChange={e => setvTransporterName(e.target.value)}
                              id="outlined-basic"
                              label="Transporter Name"
                              variant="outlined"
                              name='vTransporterName'
                              required
                              inputRef={register({ required: "Transporter Name is required.", })}
                              error={Boolean(errors.vTransporterName)}
                              helperText={errors.vTransporterName?.message}
                          />
                      </FormControl>
                  </Box>
                  <Box className='inputBox-1' >
                      <FormControl fullWidth className='input'>
                          <TextField
                              sx={muiStyles.input}
                              value={vVehicleCapacity}
                              onChange={e => setvVehicleCapacity(e.target.value)}
                              id="outlined-basic"
                              label="Vehicle Capacity"
                              variant="outlined"
                              name='vVehicleCapacity'
                              required
                              inputRef={register({ required: "Vehicle Capacity is required.", })}
                              error={Boolean(errors.vVehicleCapacity)}
                              helperText={errors.vVehicleCapacity?.message}
                          />
                      </FormControl>
                  </Box>
                  <Box className='inputBox-1' >
                      <FormControl fullWidth className='input'>
                          <TextField
                              sx={muiStyles.input}
                              value={vVehicleNo}
                              onChange={e => setvVehicleNo(e.target.value)}
                              id="outlined-basic"
                              label="Vehicle No"
                              variant="outlined"
                              name='vVehicleNo'
                              required
                              inputRef={register({ required: "Vehicle No is required.", })}
                              error={Boolean(errors.vVehicleNo)}
                              helperText={errors.vVehicleNo?.message}
                          />
                      </FormControl>
                  </Box>
                  <Box className='inputBox-3'>
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
                        <div style={{position:'relative'}}>
                            <InputLabel id="demo-simple-select-label" style={{ marginTop: 5, marginBottom: 5,fontSize: 10,position: 'absolute',top: -23}}>Attach MATCOA</InputLabel>
                            <input type="file" name='vPOFilePath' onChange={imageFile} hidden ref={imageRef} />
                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                <button onClick={() => imageRef.current.click()} className='choosebtn'>Choose File</button>
                                {localImage == true ?
                                    <div style={{ flexDirection: 'row' }}>
                                        {imgpreview != false ?
                                            <a href={preview} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>MATCOA Copy</a>
                                            : null
                                        }
                                    </div>
                                    :
                                    <div style={{ flexDirection: 'row' }}>
                                        {imgpreview != false ?
                                            <a href={imageUrl + '/' + preview} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>MATCOA Copy</a>
                                            : null
                                        }
                                    </div>
                                }


                            </div>
                        </div>

                    </Box>
                  <FormGroup >
                  <FormControlLabel style={{marginRight:0}} control={<Checkbox checked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" />
                  </FormGroup>
              </div>
          </div>
          <div className='databox'>
              <div className='data-form-box mt-2'>
                  <Box className='inputBox-29'>
                      <FormControl fullWidth className='input'>
                          {/* <InputLabel required id="demo-simple-select-label">Item</InputLabel>  */}
                          <Autocomplete
                              sx={muiStyles.autoCompleate}
                              disablePortal
                              id="combo-box-demo"
                              options={BrandMaster}
                              value={BrandLabel}
                              // inputValue={MaterialDetail}
                              onChange={(event, value) => changebrandMasterValue(value)}
                              onKeyDown={newInputValue => brandMaster_SelectAll_ActiveLikeSearch(newInputValue)}
                              onInputChange={(event, newInputValue) => {
                                  // setInputValue(newInputValue);
                                  // materialMaster_SelectAll_ActiveLikeSearch()
                                  console.log('newInputValue', newInputValue)
                              }}
                              renderInput={(params) => <TextField {...params} label="Search Brand" required />}
                          />
                          {errorText.brand != '' ? <p className='error'>{errorText.brand}</p> : null}
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
                          {errorText.pack != '' ? <p className='error'>{errorText.pack}</p> : null}
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
                  <Box className='inputBox-30' >
                      <FormControl fullWidth className='input' >
                          <TextField
                              sx={muiStyles.input}
                              value={nQtySold}
                              onChange={e => setnQtySold(e.target.value)}
                              id="outlined-basic"
                              label="Qty Sold"
                              variant="outlined"
                              name='nQtySold'

                              // inputRef={register({ required: "Qty Sold is required.*", })}
                              // error={Boolean(errors.nQtySold)}
                              // helperText={errors.nQtySold?.message}

                          />
                          {errorText.qSold != '' ? <p className='error'>{errorText.qSold}</p> : null}
                      </FormControl>
                  </Box>
                  <Box className='inputBox-31' >
                      <FormControl fullWidth className='input' >
                          <TextField
                              sx={muiStyles.input}
                              value={vBatchNo}
                              onChange={e => setvBatchNo(e.target.value)}
                              required id="outlined-basic"
                              label="Batch No"
                              variant="outlined"
                              name='vBatchNo'
                              type="number" inputProps={{ min: 4, max: 10 }}
                              // inputRef={register({ required: "Batch No is required.*", })}
                              // error={Boolean(errors.vBatchNo)}
                              // helperText={errors.vBatchNo?.message}
                          />
                          {errorText.batchno != '' ? <p className='error'>{errorText.batchno}</p> : null}
                      </FormControl>
                  </Box>
                  <Box className='inputBox-43' >
                      <FormControl fullWidth className='input' >
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                              <Stack spacing={3} >
                                  <DesktopDatePicker
                                      label="DOM Date *"
                                      inputFormat="DD-MM-YYYY"
                                      value={dtDOM}
                                      required
                                      onChange={handleChangedtDOMDate}
                                      renderInput={(params) => <TextField sx={muiStyles.date}{...params} />}
                                  />
                              </Stack>
                          </LocalizationProvider>
                          {errorText.dom != '' ? <p className='error'>{errorText.dom}</p> : null}
                      </FormControl>
                  </Box>
                  <Box className='inputBox-43' >
                      <FormControl fullWidth className='input' >
                          <LocalizationProvider dateAdapter={AdapterDayjs} >
                              <Stack spacing={3} >
                                  <DesktopDatePicker
                                      label="BBD Date *"
                                      inputFormat="DD-MM-YYYY"
                                      value={dtBBD}
                                      required
                                      onChange={handleChangedtBBDDate}
                                      renderInput={(params) => <TextField sx={muiStyles.date}{...params} />}
                                  />
                              </Stack>
                          </LocalizationProvider>
                          {errorText.bbd != '' ? <p className='error'>{errorText.bbd}</p> : null}
                      </FormControl>
                  </Box>
                  <Box className='inputBox-31' >
                      <FormControl fullWidth className='input' >
                          <TextField
                              sx={muiStyles.input}
                              value={nSalesReturn}
                              onChange={e => setnSalesReturn(e.target.value)}
                              required id="outlined-basic"
                              label="Sales Return"
                              variant="outlined"
                              name='nSalesReturn'
                              type="number" inputProps={{ min: 4, max: 10 }}
                              // inputRef={register({ required: "Sales Return is required.*", })}
                              // error={Boolean(errors.nSalesReturn)}
                              // helperText={errors.nSalesReturn?.message}
                          />
                          {errorText.salesreturn != '' ? <p className='error'>{errorText.salesreturn}</p> : null}
                      </FormControl>
                  </Box>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between',marginBottom:10 }}>
                      <button title='Add' className='addbtn' onClick={addKoMonthDate}>{btnType == 'edit' ? 'Update' : <AddIcon fontSize='small' />}</button>

                      <button title='Refresh' className='addbtn' onClick={refreshbtn}><ReplayIcon fontSize='large' /></button>
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
                                     
                                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Brand</TableCell>
                                          {/* <TableCell align="left" >PO Qty</TableCell>
                                          <TableCell align="left" >Balance QTY</TableCell> */}
                                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Pack</TableCell>
                                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Qty Sold</TableCell>
                                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Batch No</TableCell>
                                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>DOM Date</TableCell>
                                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>BBD Date</TableCell>
                                          <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>Sales Return</TableCell>
                                          <TableCell align="center">Action</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  {PODetails?.length > 0 ?

                                      <TableBody>

                                          {PODetails.map((item, index) => {
                                              return (
                                                  <TableRow key={index} style={item.id == EditId ? { background: 'rgba(239,30,44,0.15)' } : { background: '#fff' }}>
                                                      <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                    
                                                      <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.vBrand}</TableCell>
                                                      {/* <TableCell align="left" >{item.nQty}</TableCell>
                                                      <TableCell align="left" >{item.BalanceQuantity}</TableCell> */}
                                                      <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.vPack}</TableCell>
                                                      <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nQtySold}</TableCell>
                                                      <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.vBatchNo}</TableCell>
                                                      <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{parseDateToString(new Date(item.dtDOM))}</TableCell>
                                                      <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{parseDateToString(new Date(item.dtBBD))}</TableCell>
                                                      <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{item.nSalesReturn}</TableCell>
                                                      <TableCell align="center">
                                                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                              <button className='deletbtn' title='Delete' onClick={() => deleteItem(item.id)}><DeleteIcon size={20} color='red' /></button>
                                                              <button className='deletbtn' title='Edit' onClick={() => editItem(item)}><BorderColorIcon size={20} color='#000' /></button>

                                                          </div>

                                                      </TableCell>
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


export default EditDispatchDetails