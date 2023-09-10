import React, { useEffect ,useState} from 'react';
import { BindRoleForRolePageLInkage, GetPagesForRolePageLinkageByRoleId, RolePageLinkagePost, RolePageLinkagePut, GetSavedPagesForRolePageLinkageByRoleId } from './RolePageLinkegService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from 'react-modal';
import Checkbox from '@mui/material/Checkbox';
import { TbEdit } from "react-icons/tb";
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate, useLocation, Link } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from '@mui/joy/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { CButton, CSpinner } from '@coreui/react';
import HomeIcon from '@mui/icons-material/Home';
function EditRolePageLinkeg() {
  const navigate = useNavigate();
  const location = useLocation();
  let RoleId = location.state.nRoleId
  let vRoleName = location.state.vRoleName
  const [RoleMasterData, setRoleMasterData] = React.useState([]);
  const [RoleMasterTableData, setRoleMasterTableData] = React.useState([]);
  const [RoleMasterTableData2, setRoleMasterTableData2] = React.useState([]);
  const [roleSelectedData, setRoleSelectedData] = React.useState([]);
  const [roleName, setnRoleName] = React.useState("");
  const [PageId, setnPageId] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loader, setLoader] = React.useState(false);
  const [nRoleId, setnRoleId] = React.useState('');
  const [btActive, setBtActive] = React.useState(false);
  const [pushbtActive, setPushBtActive] = React.useState(false);
  const [saveRight, setSaveRights] = React.useState(false);
  const [editRight, setEditRights] = React.useState(false);
  const [existingTable, setexistingTable] = React.useState(true);
  const [checkboxChange, setcheckboxChange] = React.useState(false);
  const [Addmore, setAddmore] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [modalIsOpen3, setIsOpen3] = React.useState(false);
  const [errorText, setErrorText] = React.useState({
    roleName: ''
  });
  const [responseData, setResponseData] = useState([])
  useEffect(() => {
    bindRoleForRolePageLInkage()
    getPagesForRolePageLinkageByRoleId(RoleId)
    getSavedPagesForRolePageLinkageByRoleId(RoleId)
  }, [])
  const bindRoleForRolePageLInkage = () => {
    BindRoleForRolePageLInkage().then(res => {
      console.log('res', res)
      setRoleMasterData(res)
    })
  }

  const handleChangeRoleMaster = (event) => {
    const selectedId = event.target.value;
    console.log('event.target.value', event.target.value)
    setnRoleName(selectedId)
    const selectedValue = RoleMasterData.find((item) => item.vRoleName === selectedId);
    console.log("selectedValue", selectedValue)
  };
  const handleBlurRoleMaster = (item) => {
    console.log("itemitemitem", item)
    setnRoleName(item.vRoleName)
    setnRoleId(item.nRoleId)
    getPagesForRolePageLinkageByRoleId(item.nRoleId)
  };
  const getPagesForRolePageLinkageByRoleId = (nRoleId) => {
    setLoader(true)
    GetPagesForRolePageLinkageByRoleId(nRoleId).then(res => {
      setRoleMasterTableData(res)
      setLoader(false)
    })
  }
  const createaccessData = (data)=>{
    const filterdata = data.map(item=>{
        return {
            nPageId: item.nPageId,
            btSaveRights: false,
            btEditRights: false,
            btActive: false
        }
    })
    setResponseData(filterdata)
}
  const getSavedPagesForRolePageLinkageByRoleId = (nRoleId) => {
    setLoader(true)
    GetSavedPagesForRolePageLinkageByRoleId(nRoleId).then(res => {
      createaccessData(res)
      setRoleMasterTableData2(res)
      setLoader(false)
    })
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  
  const submit = () => {
    setLoader(true)
    let RolePageData = {}
    RolePageData.RolePageLinkage = createAccessPayload(responseData),
      console.log('RolePageData', RolePageData)
    RolePageLinkagePost(RolePageData).then(res => {
      console.log('res', res)
      toast.success("Record Added Successfully !!")
      setLoader(false)
      setIsOpen3(false)
    })
  }
 
  const changeRights=(e,item,type)=>{
    if(type=='save'){
      alert(1)
      setSaveRights(e.target.checked)
      setEditRights(item.btEditRights)
      setBtActive(item.btActive)
      setcheckboxChange(true)
    }
    if(type=='edit'){
      setEditRights(e.target.checked)
      setSaveRights(item.btSaveRights)
      setBtActive(item.btActive)
      setcheckboxChange(true)
    }
    if(type=='btActive'){
      setBtActive(e.target.checked)
      setSaveRights(item.btSaveRights)
      setEditRights(item.btEditRights)
      setcheckboxChange(true)
    }
  }
  const openmodale = (item) => {
    if(checkboxChange==true){
      setIsOpen2(true)
      setnPageId(item.nPageId)
    }else{
      setIsOpen2(true)
      setBtActive(item.btActive)
      setSaveRights(item.btSaveRights)
      setEditRights(item.btEditRights)
      setnPageId(item.nPageId)
    }
    
}
const openSubmitmodale = () => {
  setIsOpen3(true)
    
}
  const update = () => {
    setLoader(true)
    let data = {
      nRoleId: RoleId,
      nPageId: PageId,
      btSaveRights: saveRight,
      btEditRights: editRight,
      btActive: btActive,

    }
    RolePageLinkagePut(data).then(res => {
      console.log('res', res)
      setIsOpen2(false)
      toast.success("Record Updated Successfully !!")
      setLoader(false)
      setcheckboxChange(false)
      getSavedPagesForRolePageLinkageByRoleId(RoleId)
    })
  }
  const changeTable = (type) => {
    if (type == 'existing') {
      setexistingTable(true)
      setAddmore(false)
    }
    if (type == 'addmore') {
      setexistingTable(false)
      setAddmore(true)
    }
  }
  const createAccessPayload = (data) =>{
    const payloaditems = data.filter(item=> item.btActive || item.btEditRights || item.btSaveRights)
    return payloaditems.map(item=>{
        let copyitem = {...item};
        copyitem['nRoleId'] = nRoleId;
        return copyitem;
        
    });
}

const handleChecked = (event, id, accessType)=>{
    const copyResponseData = [...responseData];
    setLoader(true)
    const updateRes = copyResponseData.map(item=>{
        let copyitem = {...item}
        // console.log('copyitem', copyitem)
        if(item.nPageId == id){
            if(accessType=='MAIN'){
                 copyitem['btActive'] = event.target.checked;
                 copyitem['btSaveRights'] = event.target.checked;
                 copyitem['btEditRights'] = event.target.checked;
            }else if(accessType=='SAVE_RIGHT'){
                 copyitem['btSaveRights'] = event.target.checked;

            }else{
                 copyitem['btEditRights'] = event.target.checked;
            }
        }
        
        return copyitem;
    })
     return setResponseData(updateRes), setLoader(false)

}
  return (
    <div className='citymasterContainer'>
       {loader == true ?
                <div className='progressBox'>
                    <div className='progressInner'>
                        <CircularProgress />
                    </div>
                </div>
                :
                null

            }
      <div className='rolePageLinkeg_box'>
        <Box className='inputBox-47 mt-4'>
          {/* <FormControl fullWidth className='input'>
            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Select Role</InputLabel>
             <Select
MenuProps={{
 style: { maxHeight: 400,
          maxWidth:150
        },
     }}
              sx={muiStyles.select}
              style={{ width: '100%', }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={roleName}
              label="Role Name"
              // disabled={true}
              onChange={handleChangeRoleMaster}
              defaultValue={3}
              name='roleName' >
              {RoleMasterData.map((item, index) => {
                return (
                  <MenuItem key={index} onBlur={() => handleBlurRoleMaster(item)} value={item.vRoleName} id={item.nRoleId}>{item.vRoleName}</MenuItem>
                )
              })
              }
            </Select>
            {errorText.roleName != '' ? <p className='error'>{errorText.roleName}</p> : null}
          </FormControl> */}
          <p className='roleText'>Role : {vRoleName}</p>
        </Box>
        <div className='ExistingPages'>
          <button onClick={() => changeTable('existing')} className={existingTable == true ? 'btnActive' : null}>Already Existing Pages</button>
          <button onClick={() => changeTable('addmore')} className={Addmore == true ? 'btnActive' : null}>Add Pages</button>
        </div>
        {existingTable == true ?
          <div className='tablecenter mt-3'>

            <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>
              <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell scope="row" style={{width:'2%'}}>SN.</TableCell> */}

                      <TableCell align="left" sx={muiStyles.tableHead}></TableCell>
                      {/* <TableCell align="left" sx={muiStyles.tableHead}>Page Id</TableCell> */}
                      <TableCell align="left" sx={muiStyles.tableHead}>Page Caption</TableCell>
                      {/* <TableCell align="left" sx={muiStyles.tableHead}>Module Name</TableCell> */}
                      <TableCell align="left" sx={muiStyles.tableHead}>Dependent On Page</TableCell>
                      <TableCell align="left" sx={muiStyles.tableHead}>Save Rights</TableCell>
                      <TableCell align="left" sx={muiStyles.tableHead}>Edit Rights</TableCell>
                      <TableCell align="left" sx={muiStyles.tableHead}>Is Active</TableCell>
                      <TableCell align="left" sx={muiStyles.tableHead}>Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  {RoleMasterTableData2?.length > 0 ?
                    <TableBody>
                      {RoleMasterTableData2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                        return (
                          <TableRow key={index}>
                            {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}

                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={true} value={pushbtActive} disabled={true} onChange={e => pushCheckedValues(e, item)} /></TableCell>
                            {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.nPageId}</TableCell> */}
                            <TableCell align="left" sx={muiStyles.tableBody}>{item.vPageName}</TableCell>
                            {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.vModuleName}</TableCell> */}
                            <TableCell align="left" sx={muiStyles.tableBody}>{item.DependentOn}</TableCell>
                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={item.btSaveRights} value={saveRight} onChange={e => changeRights(e,item,'save') } /></TableCell>
                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={item.btEditRights} value={editRight} onChange={e => changeRights(e,item,'edit') } /></TableCell>
                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={item.btActive} value={btActive} onChange={e => changeRights(e,item,'btActive') } /></TableCell>
                            <TableCell align="left" sx={muiStyles.tableBody}><button className='deletbtn' title='Edit' onClick={() => openmodale(item)}><TbEdit size={20} color='#000' /></button></TableCell>
                          </TableRow>
                        )
                      })
                      }
                    </TableBody>
                    :
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={9}>No Record</TableCell>
                      </TableRow>
                    </TableBody>

                  }
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={RoleMasterTableData2.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
          : null
        }
        {Addmore == true ?
          <>
            <div className='tablecenter mt-3'>

              <Paper sx={{ width: '100%', overflow: 'hidden', paddingTop: 1 }}>
                <TableContainer sx={muiStyles.tableBox} className='tableBox'>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {/* <TableCell scope="row" style={{width:'2%'}}>SN.</TableCell> */}

                        <TableCell align="left" sx={muiStyles.tableHead}></TableCell>
                        <TableCell align="left" sx={muiStyles.tableHead}>Page Id</TableCell>
                        <TableCell align="left" sx={muiStyles.tableHead}>Page Caption</TableCell>
                        <TableCell align="left" sx={muiStyles.tableHead}>Module Name</TableCell>
                        <TableCell align="left" sx={muiStyles.tableHead}>Dependent On Page</TableCell>
                        <TableCell align="left" sx={muiStyles.tableHead}>Save Rights</TableCell>
                        <TableCell align="left" sx={muiStyles.tableHead}>Edit Rights</TableCell>
                      </TableRow>
                    </TableHead>
                    {RoleMasterTableData?.length > 0 ?
                      <TableBody>
                        {RoleMasterTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                          return (
                            <TableRow key={index}>
                              {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}

                              <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={btActive} value={btActive} onChange={e => pushCheckedValues(e, item)} /></TableCell>
                              <TableCell align="left" sx={muiStyles.tableBody}>{item.nPageId}</TableCell>
                              <TableCell align="left" sx={muiStyles.tableBody}>{item.vPageCaption}</TableCell>
                              <TableCell align="left" sx={muiStyles.tableBody}>{item.vModuleName}</TableCell>
                              <TableCell align="left" sx={muiStyles.tableBody}>{item.DependentOnPage}</TableCell>

                              <TableCell align="left" sx={muiStyles.tableBody}><Checkbox  value={saveRight} onChange={e => SaveRightsCheckedValues(e, item)} /></TableCell>
                              <TableCell align="left" sx={muiStyles.tableBody}><Checkbox value={editRight} onChange={e => EditRightsCheckedValues(e, item)} /></TableCell>


                            </TableRow>
                          )
                        })
                        }
                      </TableBody>
                      :
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={7}>No Record</TableCell>
                        </TableRow>
                      </TableBody>

                    }
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={RoleMasterTableData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
            <div className='mt-3' style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button type="submit" className='submitbtn-2' style={{ marginRight: 10 }} onClick={()=>navigate('/RolePageLinkage')}><HomeIcon size={18} /> Home</button>
              {loader == true ?
                <CButton disabled className='submitbtn'>
                  <CSpinner component="span" size="sm" aria-hidden="true" />
                  Loading...
                </CButton>
                :
                <button type="submit" className='submitbtn' onClick={openSubmitmodale}>Submit</button>
              }

            </div>
          </>
          : null
        }
      </div>
      <Modal
                isOpen={modalIsOpen2}
                style={customStyles1}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Alert !!</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen2(false)} />
                </div>
                <div className='alertmsg'><p>Do you want to Update?</p></div>
                <div className='alertButton' >
                    <button type="submit" className='alertYes' onClick={update}>Yes</button>
                    <button type="submit" className='alertno' onClick={() => setIsOpen2(false)}>No</button>
                </div>
            </Modal > 
            <Modal
                isOpen={modalIsOpen3}
                style={customStyles1}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className='displayright'>
                    <div><span className='title'>Alert !!</span></div>
                    <HighlightOffIcon fontSize='large' onClick={() => setIsOpen3(false)} />
                </div>
                <div className='alertmsg'><p>Do you want to Add?</p></div>
                <div className='alertButton' >
                    <button type="submit" className='alertYes' onClick={submit}>Yes</button>
                    <button type="submit" className='alertno' onClick={() => setIsOpen2(false)}>No</button>
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
      left: '-10px',
      backgroundColor: 'transparent',
      zIndex: '1'
    },
    "& label.Mui-focused": {
      zIndex: '1'
    },
    '& .MuiInputAdornment-root': {
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
      left: '-10px',
    },
    "& label.Mui-focused": {
      zIndex: '1'
    }, '& .MuiFormHelperText-root': {
      position: 'absolute',
      fontSize: 10,
      bottom: -18
    },
  },
  input: {
    "& .MuiOutlinedInput-root": {
      "& input": {
        padding: '6px',
        fontSize: '12px',
        position: 'relative'
      }
    },
    "& .MuiFormLabel-root": {
      fontSize: '13px',
      top: '-13px',
      left: '-10px',
      backgroundColor: 'transparent',
    },
    "& label.Mui-focused": {
      zIndex: '1'
    }, '& .MuiFormHelperText-root': {
      position: 'absolute',
      fontSize: 10,
      bottom: -18
    },
  },
  select: {
    "& .MuiSelect-select": {
      padding: '3px 8px',
      fontSize: '12px'
    },
  },
  InputLabels: {
    fontSize: '13px',
    top: '-13px',
    left: '-10px',
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
      fontWeight: 'bold'
    }
  },
  tableBody: {
    "&.MuiTableCell-root": {
      padding: '8px',
      fontSize: '14px',
      lineHeight: '39px'
    }
  },
  checkboxLabel: {
    "&.MuiFormControlLabel-root": {
      "&.MuiTypography-root": {
        fontSize: '14px'
      }
    }
  },
  
};
const customStyles1 = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '30%',
  },
};
export default EditRolePageLinkeg