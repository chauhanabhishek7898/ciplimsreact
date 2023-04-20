import React, { useEffect, useState, useRef } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { GetStockStatus } from './CurrentStockStatusService'
import { PlantMaster_SelectAll_ActiveLikeSearch } from '../PlantMaster/PlantMasterService'
import { MaterialMaster_SelectAll_ActiveLikeSearch } from '../MaterialMaster/MaterialMasterService'
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
import { CButton, CSpinner } from '@coreui/react';

import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';
import CircularProgress from '@mui/joy/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
function CurrentStockStatus() {
    let Heading = [['SN.','Plant Detail',' Material Detail','UOM','Category',' Material Type','Exp Date','Aeging','Balance Stock']];
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [brandData, setBrandData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [loader2, setLoader2] = React.useState(false);
    const [nBid, setnBid] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [brandCode, setBrandCode] = React.useState("");
    const [brandName, setBrandName] = React.useState("");
    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const { register, handleSubmit, control, errors } = useForm();
    const tableRef = useRef(null);
    // const [rows, setRows] = useState(brandData);
    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);
    const [nPId, setnPId] = React.useState('');
    const [PlantDetail, setPlantDetail] = React.useState('');
    const [nMId, setnMId] = React.useState('');
    const [MaterialDetail, setMaterialDetail] = React.useState('');
    const [vGeneric, setvGeneric] = React.useState('');
    const [MaterialMaster, setMaterialMaster] = React.useState([]);
    const [PlantMaster, setPlantMaster] = React.useState([]);
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getBrandMaster_SelectAll(nPId,nMId,vGeneric)
    }
    useEffect(() => {
        getBrandMaster_SelectAll('','')
    }, [])
    const getBrandMaster_SelectAll = (PId,MId) => {
        setLoader2(true)

        GetStockStatus(PId==''?null:PId,MId==''?null:MId,vGeneric==''?null:vGeneric).then(response => {
            if(response){
                setBrandData(response)
                setMasterBrandData(response)
                setLoader2(false)
                // console.log('onlyActive1', brandData)
            }
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
        setnPId(value.value)
        setPlantDetail(value.label)
        getBrandMaster_SelectAll(value.value, nMId == '' ? null : nMId)
    }
 const changeMaterialMasterValue = (value) => {
        setnMId(value.value)
        setMaterialDetail(value.label)
        getBrandMaster_SelectAll(nPId == '' ? null : nPId, value.value)
    }
    const requestSearch = (searchedVal) => {

        if (searchedVal.length > 0) {
            const filteredRows = brandData.filter((row) => {
                return row.vBrandCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vBrandName.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setBrandData(filteredRows);
        } else {
            setBrandData(masterbrandData);
        }

    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getBrandMaster_SelectAll()
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

   


    const submit = () => {
        setLoader(true)
        let brand = {
            nBId: nBid == null ? 0 : nBid,
            vBrandCode: brandCode,
            vBrandName: brandName,
            btActive: btActive,
        }
        if (buttonName == 'Submit') {
            console.log('brand', brand)
            BrandMasterPost(brand).then(res => {
                if (res) {
                    console.log('res', res)
                    toast.success("Record Added Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    getBrandMaster_SelectAll()
                }
            })

        } else {
            console.log('brand', brand)
            BrandMasterPut(brand).then(res => {
                if (res) {
                    console.log('res', res)
                    toast.success("Record Updated Successfully !!")
                    setLoader(false)
                    setIsOpen(false)
                    getBrandMaster_SelectAll()
                }
            })
        }
    }



    return (
        <div className='citymasterContainer'>
              {loader2==true?
            <div className='progressBox'>
                <div className='progressInner'>
                    <CircularProgress />
                </div>
            </div>
            :
            null
            }
            <div className='tablecenter'>
                <Paper sx={{ width: '100%', overflow: 'hidden',paddingTop:1 }}>
                <div className='displayflexend-2'>
                        <Box className='inputBox-24' >
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
                            {/* {errorText.plant != '' ? <p className='error'>{errorText.plant}</p> : null} */}
                        </FormControl>
                        </Box>
                        <Box className='inputBox-24' >
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
                            {/* {errorText.MaterialDetail != '' ? <p className='error'>{errorText.MaterialDetail}</p> : null} */}
                        </FormControl>
                        </Box>

                        <Box className='inputBox-24'>
                            <FormControl fullWidth className='input' >
                                <TextField
                                   sx={muiStyles.input}
                                    value={vGeneric}
                                    onChange={e => setvGeneric(e.target.value)}
                                    id="outlined-basic"
                                    label="Search.."
                                    variant="outlined"
                                    name='vPODesc'
                                />
                            </FormControl>

                        </Box>

                        <Box className='inputBox-25'>
                            <button className='applybtn' onClick={()=>getBrandMaster_SelectAll(nPId,nMId)}>Apply</button>
                        </Box>

                    </div>
                    <div className='exportandfilter'>
                    <ExportExcel excelData={brandData} Heading={Heading} fileName={'Current_Stock_Status'}/>
                    {/* <Box sx={{ width: '68%' }} >
                    <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />

                        </Box> */}
                        <FormGroup >
                        {/* <FormControlLabel style={{marginRight:0}} control={<Checkbox checked={onlyActive} value={onlyActive} onChange={checkedonlyActive} />} label="Only Active Data" /> */}
                    </FormGroup>
                    </div>

                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" >Plant Detail</TableCell>
                                    <TableCell align="left" >Material Detail</TableCell>
                                    <TableCell align="left" >UOM</TableCell>
                                    <TableCell align="left" >Category</TableCell>
                                    <TableCell align="left" >Material Type</TableCell>
                                    <TableCell align="left" >Exp Date</TableCell>
                                    <TableCell align="left" >Aeging</TableCell>
                                    <TableCell align="left" >Balance Stock</TableCell>
                                </TableRow>
                            </TableHead>
                            {brandData?.length>0?
                                  <TableBody>
                                  {brandData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index) => {
                                      return (
                                          <TableRow key={index}>
                                              <TableCell align="left" >{item.PlantDetail}</TableCell>
                                              <TableCell align="left" >{item.MaterialDetail}</TableCell>
                                              <TableCell align="left" >{item.vUOM}</TableCell>
                                              <TableCell align="left" >{item.vCategory}</TableCell>
                                              <TableCell align="left" >{item.vMaterialType}</TableCell>
                                              <TableCell align="left" >{item.ExpDate}</TableCell>
                                              <TableCell align="left" >{item.Aeging}</TableCell>
                                              <TableCell align="left" >{item.BalanceStock}</TableCell>
                                          </TableRow>
                                      )
                                  })
                                  }
                              </TableBody>
                                :
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={8}>No Record</TableCell>
                                    </TableRow>
                                </TableBody>
                            }
                          
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5,10, 25, 100]}
                        component="div"
                        count={brandData.length}
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
            fontWeight:'bold'
        }
    },
    tableBody: {
        "&.MuiTableCell-root": {
            padding: '8px',
            fontSize:'14px',
            lineHeight: '39px'
        }
    },
    checkboxLabel: {
        "&.MuiFormControlLabel-root": {
            "&.MuiTypography-root": {
                fontSize:'14px'
            }
        }
    },
   

};

export default CurrentStockStatus