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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import { RiEditBoxLine } from "react-icons/ri"
import { CButton, CSpinner } from '@coreui/react'
import { UnitMastersPost, UnitMaster_SelectAll, UnitMastersPut } from './UnitMasterApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import { useForm } from 'react-hook-form';

import SearchBar from "material-ui-search-bar";
import ExportExcel from 'src/shareFunction/Excelexport';

function UnitMaster() {
    // <TableCell scope="row">SN.</TableCell>
    // <TableCell align="left">Unit Name</TableCell>
    // <TableCell align="left">Status</TableCell>

    let Heading = [['SN.', 'Unit Code', 'Status']];

    const formValidation = new SimpleReactValidator()
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [unitData, setUnitData] = React.useState([]);
    const [masterbrandData, setMasterBrandData] = React.useState([]);
    const [loader, setLoader] = React.useState(false);
    const [btActive, setbtActive] = React.useState(true);
    const [nUId, setnUId] = React.useState(0);
    const [vUnitName, setvUnitName] = React.useState('');
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

    const submit = () => {
        setLoader(true)
        let data = {
            nUId: nUId == null ? 0 : nUId,
            vUnitName: vUnitName,
            btActive: btActive
        }
        if (buttonName == 'Submit') {
            UnitMastersPost(data).then(res => {
                if (res) {
                    toast.success(res)
                    setLoader(false)
                    setIsOpen(false)
                    UnitMaster_SelectAllget()
                }
            })

        } else {
            UnitMastersPut(data).then(res => {
                if (res) {
                    toast.success(res)
                    setLoader(false)
                    setIsOpen(false)
                    UnitMaster_SelectAllget()
                }
            })
        }
    }
    const [searched, setSearched] = React.useState("");
    const [onlyActive, setonlyActive] = React.useState(true);
    let checkedData = true
    const checkedonlyActive = (event) => {
        setonlyActive(event.target.checked)
        checkedData = event.target.checked
        getUnitMaster_SelectAll()
    }
    useEffect(() => {
        getUnitMaster_SelectAll()
    }, [])
    const getUnitMaster_SelectAll = () => {
        UnitMaster_SelectAll().then(response => {
            console.log('onlyActive', onlyActive)
            if (checkedData == true) {
                let activeData = response.filter(e => e.btActive == true)
                setUnitData(activeData)
                setMasterBrandData(activeData)
            } else {
                setUnitData(response)
                setMasterBrandData(response)

            }
        })
    }


    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = unitData.filter((row) => {
                return row.vUnitName.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setUnitData(filteredRows);
        } else {
            setUnitData(masterbrandData);
        }

        // console.log("searchedVal.length", searchedVal.length)
        // const filteredRows = lineData.filter((row) => {
        //     return row.vBrandCode.toLowerCase().includes(searchedVal.toLowerCase()) || row.vLineDescription.toLowerCase().includes(searchedVal.toLowerCase());
        // });
        // setlineData(m);
        // console.log("filteredRows", filteredRows)
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
        getUnitMaster_SelectAll()
    };


    // useEffect(() => {
    //     UnitMaster_SelectAllget()
    // })
    // const UnitMaster_SelectAllget = () => {
    //     UnitMaster_SelectAll().then(res => {
    //         if (res) {
    //             setUnitData(res)

    //         }
    //     })
    // }
    const openmodale = (item, type) => {
        if (type == 'Submit') {
            setIsOpen(true)
            setbuttonName(type)
            setvUnitName('')
            setbtActive(true)
            setdisabled(true)
        } else {
            setIsOpen(true)
            setnUId(item.nUId)
            setvUnitName(item.vUnitName)
            setbtActive(item.btActive)
            setdisabled(false)
            setbuttonName(type)

        }
    }
    return (
        <div className='citymasterContainer'>
            <button className='addbtn_2' onClick={() => openmodale(null, 'Submit')} title='Add' ><AddIcon fontSize='large' /></button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='displayright'>
                    <div><span className='title'>Unit Master</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen(false)} />
                </div>
                <form >
                    <div className='displayflexend'>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Enter Unit"
                            variant="outlined"
                            value={vUnitName}
                            name='vUnitName'
                            onChange={e => setvUnitName(e.target.value)}
                            inputRef={register({ required: "Unit Name is required.*", })}
                            error={Boolean(errors.vUnitName)}
                            helperText={errors.vUnitName?.message}
                        />
                    </div>
                    <div className='displayflexend'>
                        <FormGroup >
                            <FormControlLabel control={<Checkbox defaultChecked={btActive} value={btActive} onChange={e => setbtActive(e.target.checked)} />} label="Active" disabled={disabled} />
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

                </form>
            </Modal >
            <div className='tablecenter'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>

                        <div className='exportandfilter'>
                            <ExportExcel excelData={unitData} Heading={Heading} fileName={'Unit_Master'} />
                            <Box sx={{ width: '72%' }} >
                                <SearchBar
                                    value={searched}
                                    onChange={(searchVal) => requestSearch(searchVal)}
                                    onCancelSearch={() => cancelSearch()}
                                />

                            </Box>
                            <FormGroup >
                                <FormControlLabel control={<Checkbox checked={onlyActive} value={onlyActive} onChange={checkedonlyActive} />} label="Only Active" />
                            </FormGroup>
                        </div>

                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell scope="row">SN.</TableCell>
                                    <TableCell align="left">Unit Name</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unitData.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                            <TableCell align="left">{item.vUnitName}</TableCell>
                                            <TableCell align="left">{item.btActive === true ? <Checkbox disabled checked /> : <Checkbox disabled />}</TableCell>
                                            <TableCell align="left"><div onClick={() => openmodale(item, 'Update')}><RiEditBoxLine fontSize="1.5em" /></div></TableCell>
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
                        count={unitData.length}
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


export default UnitMaster
