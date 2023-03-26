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
import { PackMaster_SelectAll_ActiveLikeSearch } from '../PackMaster/PackMasterService'
import { BrandMaster_SelectAll_ActiveLikeSearch } from '../BrandMaster/BrandMasterService'
import { BOMMasterPost,GetBOMByBId,BOMMasterPut } from './BomMasteerService'
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
function EditBomMaster() {
    const navigate = useNavigate();
    const location = useLocation();
    let nBId = location.state.nBId
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [brandData, setBrandData] = React.useState([]);
    const [MaterialMaster, setMaterialMaster] = React.useState([]);
    const [PlantMaster, setPlantMaster] = React.useState([]);
    const [VendorMaster, setVendorMaster] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [PlantDetail, setPlantDetail] = React.useState('');
    const [VendorDetail, setVendorDetail] = React.useState('');
    const [nMId, setnMId] = React.useState('');
    const [MaterialDetail, setMaterialDetail] = React.useState('');
    const { register, handleSubmit, control, errors } = useForm();
    const [searched, setSearched] = React.useState("");
    // const [nBId, setnBId] = React.useState("");
    const [vBOMNo, setvBOMNo] = React.useState("");
    const [vBrand, setvBrand] = React.useState("");
    const [vPack, setvPack] = React.useState("");
    const [vBOMName, setvBOMName] = React.useState("");
    const [vUnit, setvUnit] = React.useState("");
    const [nQty, setnQty] = React.useState('');
    const [vUMO, setvUMO] = React.useState("");
    const [vPOFilePath, setvPOFilePath] = React.useState('');
    const [vRemarks, setvRemarks] = React.useState('');
    const [btActive, setBtActive] = React.useState(true);
    const [disabled, setdisabled] = React.useState(true)
    const [localImage, setlocalImage] = useState(false)
    const [PODetails, setPODetails] = React.useState([]);
   
    const [nLoggedInUserId, setnLoggedInUserId] = React.useState('');
    const [errorText, setError] = React.useState({
        plant: '',
        vendor: '',
        date: '',
        MaterialDetail: '',
        Quan: '',
        amount: '',
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
    useEffect(() => {
        getPOByPOId()
    }, [])
    const getPOByPOId = () => {
        GetBOMByBId(nBId).then(res => {
            console.log('response', res)
            let count = Object.keys(res.BOMDetail).length
            let data = res.BOMDetail
            for(var i = 0; i < count; i++) {
                let counts = i
                res.BOMDetail[i].id=counts
            }
            setPODetails(data)
            setvBOMNo(res.BOMMaster[0].vBOMNo)
            setvBrand(res.BOMMaster[0].vBrand)
            setPlantDetail(res.BOMMaster[0].vBrand)
            setvPack(res.BOMMaster[0].vPack)
            setVendorDetail(res.BOMMaster[0].vPack)
            setvBOMName(res.BOMMaster[0].vBOMName)
            setvUnit(res.BOMMaster[0].vUnit)
            setvRemarks(res.BOMMaster[0].vRemarks)
            setvPOFilePath(res.BOMMaster[0].vBOMCopyFilePath)
            if (res.BOMMaster[0].vBOMCopyFilePath != '' && res.BOMMaster[0].vBOMCopyFilePath != null) {
                setimgPreview(true)
                setPreview(res.BOMMaster[0].vBOMCopyFilePath)
                setlocalImage(false)
            } else {
                setimgPreview(false)
            }
            if (res.BOMMaster[0].btActive == true) {
                console.log('1')
                setBtActive(true)
            } else {
                setBtActive(false)
                console.log('2')
            }
        })

    }
    const plantMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
        if (vGeneric != '') {
            vGeneric = vGeneric.target.value
        } else {
            vGeneric = null
        }

        BrandMaster_SelectAll_ActiveLikeSearch(vGeneric).then(res => {
            console.log('response', res)

            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].vBrandName,
                    label: res[i].vBrandName,
                  
                })
            }
            setPlantMaster(data)
        })
    }

    const vendorMaster_SelectAll_ActiveLikeSearch = (vGeneric) => {
        if (vGeneric != '') {
            vGeneric = vGeneric.target.value
        } else {
            vGeneric = null
        }
        PackMaster_SelectAll_ActiveLikeSearch(vGeneric).then(res => {
            console.log('response', res)

            let count = Object.keys(res).length
            let data = []
            for (var i = 0; i < count; i++) {
                data.push({
                    value: res[i].vPackName,
                    label: res[i].vPackName,
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
  
        setPlantDetail(value.label)
        setvBrand(value.value)
        setError({
            plant: ''
        })
    }
    const changeVendorMasterValue = (value) => {
        setVendorDetail(value.label)
        setvPack(value.value)
        setError({
            vendor: ''
        })
    }
    const changeMaterialMasterValue = (value) => {
        console.log('value',value)
        setnMId(value.value)
        setMaterialDetail(value.label)
        setvUMO(value.vUOM)
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
                MaterialDetail: 'Select Item *'
            })
            return false
        } else if (nQty == '' || nQty == undefined) {
            setError({
                Quan: 'Enter Qty *'
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
                                poMasteerDetail[indexToUpdate].nMId = parseInt(nMId),
                                poMasteerDetail[indexToUpdate].MaterialDetail = MaterialDetail,
                                poMasteerDetail[indexToUpdate].nQty = parseFloat(nQty == '' ? 0 : nQty),
                                poMasteerDetail[indexToUpdate].vUOM = vUMO == '' ? null : vUMO,
                            console.log('koMonth', poMasteerDetail)
                            setPODetails(poMasteerDetail)
                            setbtnType('')
                            setnMId('')
                            setMaterialDetail('')
                            setnQty('')
                            setvUMO('')
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
                                let findnMId=poMasteerDetail.find(e=>e.nMId==nMId)
                                if(findnMId){
                                    toast.success("Item is already Added")
                                }else{
                                    poMasteerDetail.push({
                                        id: new Date().getUTCMilliseconds(),
                                        nMId: parseInt(nMId),
                                        MaterialDetail: MaterialDetail,
                                        nQty: parseFloat(nQty == '' ? 0 : nQty),
                                        vUOM: vUMO == '' ? null : vUMO,
                                    })
                                    console.log('koMonth', poMasteerDetail)
                                    setPODetails(poMasteerDetail)
                                    setnMId('')
                                    setMaterialDetail('')
                                    setnQty('')
                                    setvUMO('')
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
        if (vBrand == '' || vBrand == undefined) {
            setError({
                plant: 'Select Brand *'
            })
            return false
        } else if (vPack == '' || vPack == undefined) {
            setError({
                vendor: 'Select Pack *'
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
                                    nBId:nBId,
                                    vBOMNo: vBOMNo,
                                    vBrand: vBrand == '' ? null : vBrand,
                                    vPack: vPack == '' ? null : vPack,
                                    vBOMName: vBOMName == '' ? null : vBOMName,
                                    vUnit: vUnit == '' ? null : vUnit,
                                    vRemarks: vRemarks == '' ? null : vRemarks,
                                    btActive: true,
                                    vBOMCopyFilePath: '',
                                    nLoggedInUserId: parseInt(nLoggedInUserId)
                                }]
                                let PurchaseOrder = {}
                                PurchaseOrder.BOMMaster = POMasterData,
                                PurchaseOrder.BOMDetails = PODetails
                                console.log('PurchaseOrder', PurchaseOrder)
                                BOMMasterPut(PurchaseOrder, vPOFilePath).then(res => {
                                    if (res) {
                                        setLoader(false)
                                        toast.success("BOM Updated Successfully !!")
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
    const editItem = (item) => {
        setbtnType('edit')
        setId(item.id)
        setnMId(item.nMId)
        setMaterialDetail(item.MaterialDetail)
        setnQty(item.nQty)
        setvUMO(item.vUOM)

    }
    const goback = () => {
        confirmAlert({
            title: 'Alert !!',
            message: 'Are you Sure.?',
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
    return (
        <div className='citymasterContainer'>
            <div className='dateFilter-2'>
                <div className='displayflexend'>
                    <Box sx={{ width: '18%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
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
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Plant</InputLabel>npm  */}
                            <Autocomplete
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
                                renderInput={(params) => <TextField {...params} label="Search Brand " required />}
                            />
                            {errorText.plant != '' ? <p className='error'>{errorText.plant}</p> : null}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Vendor</InputLabel> */}
                            <Autocomplete
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
                                renderInput={(params) => <TextField {...params} label="Search Pack" required />}
                            />
                            {errorText.vendor != '' ? <p className='error'>{errorText.vendor}</p> : null}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '18%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
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
                    <Box sx={{ width: '18%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={vUnit}
                                onChange={e => setvUnit(e.target.value)}
                                required id="outlined-basic"
                                label="Unit"
                                variant="outlined"
                                name='vUnit'
                                inputRef={register({ required: "Unit is required.*", })}
                                error={Boolean(errors.vUnit)}
                                helperText={errors.vUnit?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '59.5%' }} >
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
                    </Box>


                    <Box sx={{ width: '13%' }} >
                        <div >
                            <InputLabel id="demo-simple-select-label" style={{ marginTop: 5, marginBottom: 5 }}>Attach BOM</InputLabel>
                            <input type="file" name='vPOFilePath' onChange={imageFile} hidden ref={imageRef} />
                            <div style={{ flexDirection: 'row', display: 'flex' }}>
                                <button onClick={() => imageRef.current.click()} className='choosebtn'>Choose File</button>
                                {localImage == true ?
                                    <div style={{ flexDirection: 'row' }}>
                                        {imgpreview != false ?
                                            <a href={preview} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>BOM Copy</a>
                                            : null
                                        }
                                    </div>
                                    :
                                    <div style={{ flexDirection: 'row' }}>
                                        {imgpreview != false ?
                                            <a href={imageUrl + '/' + preview} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>BOM Copy</a>
                                            : null
                                        }
                                    </div>
                                }


                            </div>
                        </div>

                    </Box>
                    <FormGroup >
                        <FormControlLabel control={<Checkbox  checked ={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active"  />
                    </FormGroup>
                </div>
            </div>
            <div className='databox'>
                <div className='data-form-box'>
                    <Box sx={{ width: '22%' }} >
                        <FormControl fullWidth className='input'>
                            {/* <InputLabel required id="demo-simple-select-label">Item</InputLabel> */}
                            <Autocomplete
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

                    
                    <Box sx={{ width: '6%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
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
                            {errorText.Quan != '' ? <p className='error'>{errorText.Quan}</p> : null}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '6%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
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
                    </Box>
                    <div>
                        <button title='Add' className='addbtn' onClick={addKoMonthDate}><AddIcon fontSize='large' /></button>
                    </div>
                </div>
                <div className='tablecenter'>
                    {PODetails.length > 0 ?
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell scope="row" style={{width: '5%',}}>SN.</TableCell>
                                            <TableCell align="center" style={{width: '10%',}}>Action</TableCell>
                                            <TableCell align="left">Material Name</TableCell>
                                            <TableCell align="left">UOM</TableCell>
                                            <TableCell align="left">Qty</TableCell>
                                       
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {PODetails.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                    <TableCell align="center" >
                                                        <button className='deletbtn' title='Delete' onClick={() => deleteItem(item.id)}><DeleteIcon size={20} color='red' /></button>
                                                        <button className='deletbtn' title='Edit' onClick={() => editItem(item)}><BorderColorIcon size={20} color='#000' /></button>

                                                    </TableCell>
                                                    <TableCell align="left">{item.MaterialDetail}</TableCell>
                                                    <TableCell align="left">{item.vUOM}</TableCell>
                                                    <TableCell align="left">{item.nQty}</TableCell>
                                                  


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

export default EditBomMaster