import React, { useEffect } from 'react'
import Modal from 'react-modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { BrandMaster_SelectAll, BrandMasterPost, BrandMasterPut } from './BrandMasterService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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
function BrandMaster() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    // const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [brandData, setBrandData] = React.useState([]);

    const [loader, setLoader] = React.useState(false);

    const [nBid, setnBid] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [brandCode, setBrandCode] = React.useState("");
    const [brandName, setBrandName] = React.useState("");

    const [buttonName, setbuttonName] = React.useState('');
    const [disabled, setdisabled] = React.useState(true);
    const { register, handleSubmit, control, errors } = useForm();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openmodale = (item, type) => {
        if (type == 'Submit') {
            setIsOpen(true)
            setbuttonName(type)
            setBrandCode('')
            setBrandName('')
            setBtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnBid(item.nBId)
            setBrandCode(item.vBrandCode)
            setBrandName(item.vBrandName)
            setBtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)

        }
    }

    // const openmodale = () => {
    //     setIsOpen(true)
    // }
    useEffect(() => {
        getBrandMaster_SelectAll()
    }, [])
    const getBrandMaster_SelectAll = () => {
        BrandMaster_SelectAll().then(response => {
            console.log(response)
            setBrandData(response)
        })
    }
    const submit = () => {
        // if(validateform()==true){
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
                    // alert("Record Added Successfully !!")
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
                    // alert("Record Added Successfully !!")
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
    //     setIsOpenEdit(true)
    //     setnBid(item.nBId)
    //     setBrandCode(item.vBrandCode)
    //     setBrandName(item.vBrandName)
    //     setBtActive(item.btActive)


    // }
    // const onChkChange = (e) => {
    //     if (e.target.checked) {
    //         setBtActive(true)
    //     } else {
    //         setBtActive(false)
    //     }



    // }

    return (
        <div className='citymasterContainer'>
            <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add'  ><AddIcon fontSize='large' /></button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Brand Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '48%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={brandCode}
                                onChange={e => setBrandCode(e.target.value)}
                                required id="outlined-basic"
                                label="Enter Brand Code"
                                variant="outlined"
                                name='brandCode'
                                inputRef={register({ required: "Brand Code is required.*", })}
                                error={Boolean(errors.brandCode)}
                                helperText={errors.brandCode?.message}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '48%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={brandName}
                                onChange={e => setBrandName(e.target.value)}
                                required id="outlined-basic"
                                label="Enter Brand Name"
                                variant="outlined"
                                name='brandName'
                                inputRef={register({ required: "Brand Name is required.*", })}
                                error={Boolean(errors.brandName)}
                                helperText={errors.brandName?.message}
                            />
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
                        <button type="submit" className='submitbtn' onClick={handleSubmit(submit)}>{buttonName}</button>
                    }
                </div>
            </Modal >
            <div className='tablecenter'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="row">SN.</TableCell>
                                    <TableCell align="left">Brand Code</TableCell>
                                    <TableCell align="left">Brand Name</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {brandData.map((item, index) => {
                                    return (
                                        <TableRow >
                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                            <TableCell align="left">{item.vBrandCode}</TableCell>
                                            <TableCell align="left">{item.vBrandName}</TableCell>
                                            <TableCell align="left">{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                            <TableCell align="left"><div onClick={() => openmodale(item, 'Update')}><RiEditBoxLine fontSize="1.5em" /></div></TableCell>
                                            {/* <TableCell align="left"><div onClick={() => openEditmodale(item)}><RiEditBoxLine fontSize="1.5em" style={{ cursor: 'pointer' }} /></div></TableCell> */}
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
                        count={brandData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

            {/* <Modal
                isOpen={modalIsOpenEdit}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Edit Brand Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <div className='displayflexend'>
                    <Box sx={{ width: '48%' }} >
                        <FormControl fullWidth className='input'>
                            <TextField
                                value={brandCode}
                                onChange={e => setBrandCode(e.target.value)}
                                required id="outlined-basic"
                                label="Enter Brand Code"
                                variant="outlined" />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '48%' }} >
                        <FormControl fullWidth className='input' >
                            <TextField
                                value={brandName}
                                onChange={e => setBrandName(e.target.value)}
                                required id="outlined-basic"
                                label="Enter Brand Name"
                                variant="outlined" />
                        </FormControl>
                    </Box>
                </div>
                <div className='displayflexend'>
                    <FormGroup >
                        <FormControlLabel control=
                            {<Checkbox
                                checked={btActive}
                                onChange={()=>onChkChange(e)}
                                
                            />}
                            label="Active"  />
                    </FormGroup>
                    <button type="" className='submitbtn' >Submit</button>
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
export default BrandMaster