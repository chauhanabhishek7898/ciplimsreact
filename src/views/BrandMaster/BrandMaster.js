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
import { BrandMaster_SelectAll, BrandMasterPost } from './BrandMasterService'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RiEditBoxLine } from "react-icons/ri"
import AddIcon from '@mui/icons-material/Add';
import { ChangeCircle } from '@mui/icons-material';
function BrandMaster() {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [brandData, setBrandData] = React.useState([]);

    const [nBid, setnBid] = React.useState(0);
    const [btActive, setBtActive] = React.useState(false);
    const [brandCode, setBrandCode] = React.useState("");
    const [brandName, setBrandName] = React.useState("");
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const openmodale = () => {
        setIsOpen(true)
    }
    useEffect(() => {
        getBrandMaster_SelectAll()
    }, [])
    const getBrandMaster_SelectAll = () => {
        BrandMaster_SelectAll().then(response => {
            console.log(response)
            setBrandData(response)
        })
    }
    const addBrandMaster = () => {
        // if(validateform()==true){

        let brand = {
            nBId: 0,
            vBrandCode: brandCode,
            vBrandName: brandName,
            btActive: true,
        }


        console.log('brand', brand)
        BrandMasterPost(brand).then(res => {
            if (res) {
                console.log('res', res)
                alert("Record Added Successfully !!")
            }
        })

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
    const openEditmodale = (item) => {
        setIsOpenEdit(true)
        setnBid(item.nBId)
        setBrandCode(item.vBrandCode)
        setBrandName(item.vBrandName)
        setBtActive(item.btActive)


    }
    const onChkChange = (e) => {
       if(e.target.checked){
        setBtActive(true)
       }else{
        setBtActive(false)
       }
       


    }
    
    return (
        <div className='citymasterContainer'>
            <button className='addbtn_2' onClick={openmodale} title='Add' ><AddIcon fontSize='large' /></button>
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
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Active" disabled />
                    </FormGroup>
                    <button type="" className='submitbtn' onClick={addBrandMaster}>Submit</button>
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
                                            <TableCell align="left"><div onClick={() => openEditmodale(item)}><RiEditBoxLine fontSize="1.5em" style={{ cursor: 'pointer' }} /></div></TableCell>
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

            <Modal
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
            </Modal >

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