import React, { useEffect } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { PackMaster_SelectAll, UnitMaster_SelectAll, PackMasterPost, PackMasterPut } from './PackMasterService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RiEditBoxLine } from "react-icons/ri"
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CSpinner } from '@coreui/react'
function PackMaster() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    // const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [packData, setPackData] = React.useState([]);
    const [unitid, setUnitid] = React.useState('');
    const [uniteData, setUnitData] = React.useState([]);

    const [loader, setLoader] = React.useState(false);

    const [nPId, setnPId] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [packCode, setpackCode] = React.useState("");
    const [packName, setpackName] = React.useState("");
    const [unit, setunit] = React.useState("");
    const [packProduct, setpackProduct] = React.useState("");
    const [packCases, setpackCases] = React.useState("");

    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);

    const { register, handleSubmit, control, errors } = useForm();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangePackUnit = (event) => {
        setUnitid(event.target.value);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const openmodale = (item, type) => {
        if (type == 'Submit') {
            setIsOpen(true)
            setbuttonName(type)
            setBtActive(true)
            setnPId(item.nPId)
            setpackCode("")
            setpackName("")
            setUnitid("")
            setpackProduct("")
            setpackCases("")
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnPId(item.nPId)
            setpackCode(item.vPackCode)
            setpackName(item.vPackName)
            setBtActive(item.btActive)
            setUnitid(item.vUnit)
            setpackProduct(item.vPackProduct)
            setpackCases(item.vPackCases)
            setdisabled(false)
            setbuttonName(type)

        }
    }
    useEffect(() => {
        getPackMaster_SelectAll()
        getUnitMaster_SelectAll()
    }, [])
    const getPackMaster_SelectAll = () => {
        PackMaster_SelectAll().then(response => {
            console.log(response)
            setPackData(response)
        })
    }
    const getUnitMaster_SelectAll = () => {
        UnitMaster_SelectAll().then(response => {
            setUnitData(response)
        })
    }

    const submit = () => {
        // if(validateform()==true){
            // setLoader(true)
            let pack = {
                nPId: nPId==null ? 0 : nPId,
                vPackCode: packCode,
                vPackName: packName,
                vUnit: unitid,
                vPackProduct: packProduct,
                vPackCases: packCases,
                btActive: btActive,
            }
            console.log('pack', pack)
            if(buttonName=='Submit'){
                PackMasterPost(pack).then(res=>{
                    if(res){
                        toast.success("Record Added Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getPackMaster_SelectAll()
                    }
                })
    
            }else{
                PackMasterPut(pack).then(res=>{
                    if(res){
                        toast.success("Record Updated Successfully !!")
                        setLoader(false)
                        setIsOpen(false)
                        getPackMaster_SelectAll()
                    }
                })
            }
        // }
    }
    // const validateform=()=>{
    //     if(weekNumberId==''){
    //         console.log('Select Week Number')
    //         setError('Select Week Number'+''+'*')
    //         return false
    //     }else{
    //         setError('')
    //         return true
    //     }
    // }
    // const openEditmodale = (item) => {
    //     console.log('item', item)
    //     setIsOpenEdit(true)
    //     setnPId(item.nPId)
    //     setpackCode(item.vPackCode)
    //     setpackName(item.vPackName)
    //     setBtActive(item.btActive)
    //     setUnitid(item.vUnit)
    //     setpackProduct(item.vPackProduct)
    //     setpackCases(item.vPackCases)
    // }
    // const onChkChange = (e) => {
    //     console.log('e', e)
    //     console.log('e.target.value', e.target.value)
    //     if (e.target.value == true) {
    //         setBtActive(btActive)
    //     } else {
    //         setBtActive(!btActive)
    //     }



    // }

    // const editPackMaster = () => {
    //     // if(validateform()==true){

    //     let pack = {
    //         nPId: nPId,
    //         vPackCode: packCode,
    //         vPackName: packName,
    //         vUnit: unitid,
    //         vPackProduct: packProduct,
    //         vPackCases: packCases,
    //         btActive: btActive,
    //     }


    //     console.log('pack', pack)
    //     PackMasterPut(pack).then(res => {
    //         if (res) {
    //             console.log('res', res)
    //             alert("Record Updated Successfully !!")
    //         }
    //     })

    //     // }
    // }
    return (
        <div className='citymasterContainer'>
            <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='large' /></button>

            <div className='tablecenter'>
                <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="row">SN.</TableCell>
                                    <TableCell align="left">Pack Code</TableCell>
                                    <TableCell align="left">Pack Name</TableCell>
                                    <TableCell align="left">Pack Unit</TableCell>
                                    <TableCell align="left">Pack Product</TableCell>
                                    <TableCell align="left">Pack Cases</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {packData.map((item, index) => {
                                    return (
                                        <TableRow >
                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                            <TableCell align="left">{item.vPackCode}</TableCell>
                                            <TableCell align="left">{item.vPackName}</TableCell>
                                            <TableCell align="left">{item.vUnit}</TableCell>
                                            <TableCell align="left">{item.vPackProduct}</TableCell>
                                            <TableCell align="left">{item.vPackCases}</TableCell>
                                            <TableCell align="left">{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                            <TableCell align="left"><div onClick={() => openmodale(item, 'Update')}><RiEditBoxLine fontSize="1.5em" /></div></TableCell>

                                            {/* <TableCell align="left"><div onClick={() => openEditmodale(item)}><RiEditBoxLine fontSize="1.5em" /></div></TableCell> */}
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
                        count={packData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Pack Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={packCode}
                                onChange={e => setpackCode(e.target.value)}
                                id="outlined-basic"
                                label="Pack Code"
                                variant="outlined"
                                name='packCode'
                                inputRef={register({ required: "Pack Code is required.*", })}
                                error={Boolean(errors.packCode)}
                                helperText={errors.packCode?.message} />

                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={packName}
                                onChange={e => setpackName(e.target.value)}
                                id="outlined-basic"
                                label="Pack Name"
                                variant="outlined"
                                name='packName'
                                inputRef={register({ required: "Pack Name is required.*", })}
                                error={Boolean(errors.packName)}
                                helperText={errors.packName?.message} />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label">Pack Unit</InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={unitid}
                                label="Select Pack Unit"
                                onChange={handleChangePackUnit}
                                name='unitid'
                                inputRef={register({ required: "Pack Unit is required.*", })}
                                error={Boolean(errors.unitid)}
                                helperText={errors.unitid?.message} 
                            >
                                {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '48%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={packProduct}
                                onChange={e => setpackProduct(e.target.value)}
                                id="outlined-basic"
                                label="Pack Product"
                                variant="outlined"
                                name='packProduct'
                                inputRef={register({ required: "Pack Product is required.*", })}
                                error={Boolean(errors.packProduct)}
                                helperText={errors.packProduct?.message} />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '48%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={packCases}
                                onChange={e => setpackCases(e.target.value)}
                                id="outlined-basic"
                                label="Pack Cases"
                                variant="outlined"
                                name='packCases'
                                inputRef={register({ required: "Pack Cases is required.*", })}
                                error={Boolean(errors.packCases)}
                                helperText={errors.packCases?.message} />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend'>
                    <FormGroup >
                    <FormControlLabel control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} />} label="Active" disabled={disabled} />
                        {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Active" disabled /> */}
                    </FormGroup>

                    {loader == true ?
                        <CButton disabled className='submitbtn'>
                            <CSpinner component="span" size="sm" aria-hidden="true" />
                            Loading...
                        </CButton>
                        :
                        <button type="submit"  className='submitbtn' onClick={handleSubmit(submit)}>{buttonName}</button>
                    }
                </div>
            </Modal >

            {/* <Modal
                isOpen={modalIsOpenEdit}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Edit Pack Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpenEdit(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={packCode}
                                onChange={e => setpackCode(e.target.value)}
                                required
                                id="outlined-basic"
                                label="Pack Code"
                                variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={packName}
                                onChange={e => setpackName(e.target.value)}
                                required
                                id="outlined-basic"
                                label="Pack Name"
                                variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '30%', marginTop: 2 }}>
                        <FormControl fullWidth className='input'>
                            <InputLabel required id="demo-simple-select-label">Pack Unit</InputLabel>
                            <Select
                                style={{ width: '100%', }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={unitid}
                                label="Select Pack Unit"
                                onChange={handleChangePackUnit}
                            >
                                {uniteData.map((item, index) => {
                                    return (
                                        <MenuItem value={item.vUnitName}>{item.vUnitName}</MenuItem>
                                    )
                                })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '48%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={packProduct}
                                onChange={e => setpackProduct(e.target.value)}
                                required
                                id="outlined-basic"
                                label="Pack Product"
                                variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '48%', marginTop: 2 }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={packCases}
                                onChange={e => setpackCases(e.target.value)}
                                required id="outlined-basic"
                                label="Pack Cases"
                                variant="outlined" />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend'>
                    <FormGroup >
                        <FormControlLabel control=
                            {<Checkbox
                                checked={btActive}
                                onChange={() => onChkChange(e)}
                            />}
                            label="Active" />
                    </FormGroup>
                    <button type="" className='submitbtn' onClick={editPackMaster}>Submit</button>
                </div>
            </Modal > */}

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
        width: '50%',
    },
};
export default PackMaster