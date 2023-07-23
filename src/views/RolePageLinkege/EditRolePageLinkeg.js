import React, { useEffect } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import { TbEdit } from "react-icons/tb";
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate, useLocation, Link } from "react-router-dom";
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loader, setLoader] = React.useState(false);
  const [nRoleId, setnRoleId] = React.useState('');
  const [btActive, setBtActive] = React.useState(false);
  const [pushbtActive, setPushBtActive] = React.useState(false);
  const [saveRight, setSaveRights] = React.useState(false);
  const [editRight, setEditRights] = React.useState(false);
  const [existingTable, setexistingTable] = React.useState(true);
  const [Addmore, setAddmore] = React.useState(false);
  const [errorText, setErrorText] = React.useState({
    roleName: ''
  });
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
    GetPagesForRolePageLinkageByRoleId(nRoleId).then(res => {
      setRoleMasterTableData(res)
    })
  }
  const getSavedPagesForRolePageLinkageByRoleId = (nRoleId) => {
    GetSavedPagesForRolePageLinkageByRoleId(nRoleId).then(res => {
      setRoleMasterTableData2(res)
    })
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const pushCheckedValues = (e,item,type) => {
    alert(0)
    if(type=='add'){
      alert(1)
      setPushBtActive(e.target.checked)
      if (e.target.checked == true) {
        let selectedData = [...roleSelectedData]
        selectedData.push({
          id: new Date().getUTCMilliseconds(),
          nRoleId: RoleId,
          nPageId: item.nPageId,
          btSaveRights: saveRight,
          btEditRights: editRight,
          btActive: true,
  
        })
        console.log('item2', selectedData)
        setRoleSelectedData(selectedData)
        setSaveRights(false)
        setEditRights(false)
  
      } else {
        var poMasteerDetail = [...roleSelectedData]
        var all = poMasteerDetail.indexOf(item.id)
        if (all !== -1) {
          poMasteerDetail.splice(all, 1);
        }
        let filteredArray = poMasteerDetail.filter(item => item.id !== item.id)
        console.log('filteredArray', filteredArray)
        setRoleSelectedData(filteredArray)
       
      }
    }

    if(type=='SaveRights'){
      alert(2)
      setSaveRights(e.target.checked)
      var poMasteerDetail = [...roleSelectedData]
      var all = poMasteerDetail.indexOf(item.nPageId)
      if (all !== -1) {
        poMasteerDetail.splice(all, 1);
      }
      let filteredArray = poMasteerDetail.filter(item => item.nPageId !== item.nPageId)
      console.log('filteredArray', filteredArray)
      setRoleSelectedData(filteredArray)
      let selectedData = [...roleSelectedData]
      selectedData.push({
        id: new Date().getUTCMilliseconds(),
        nRoleId: RoleId,
        nPageId: item.nPageId,
        btSaveRights: saveRight,
        btEditRights: editRight,
        btActive: true,
      })
      console.log('selectedData', selectedData)
    }



    if(type=='EditRights'){
      alert(3)
      setEditRights(e.target.checked)
      var poMasteerDetail = [...roleSelectedData]
      var all = poMasteerDetail.indexOf(item.id)
      if (all !== -1) {
        poMasteerDetail.splice(all, 1);
      }
      let filteredArray = poMasteerDetail.filter(item => item.id !== item.id)
      console.log('filteredArray', filteredArray)
      setRoleSelectedData(filteredArray)
    }
    console.log('item', item, e.target.checked)
   

  }
 
  const submit = () => {
    let RolePageData = {}
    RolePageData.RolePageLinkage = roleSelectedData,
      console.log('RolePageData', RolePageData)
    RolePageLinkagePost(RolePageData).then(res => {
      console.log('res', res)
    })
  }
  const updatedata=(item)=>{
    setBtActive(item.btActive)
    setSaveRights(item.btSaveRights)
    setEditRights(item.btEditRights)
    update(item)
  }
  const update = (item) => {
    
    confirmAlert({
      title: 'Alert !!',
      message: 'Do you want Edit ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {

            let data = {
              nRoleId: RoleId,
              nPageId: item.nPageId,
              btSaveRights: saveRight,
              btEditRights: editRight,
              btActive: true,

            }
            RolePageLinkagePut(data).then(res => {
              console.log('res', res)
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
  return (
    <div className='citymasterContainer'>
      <div className='rolePageLinkeg_box'>
        <Box className='inputBox-47 mt-4'>
          {/* <FormControl fullWidth className='input'>
            <InputLabel required id="demo-simple-select-label" sx={muiStyles.InputLabels}>Select Role</InputLabel>
            <Select
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
                      <TableCell align="center" sx={muiStyles.tableHead}>Edit Rights</TableCell>
                      <TableCell align="center" sx={muiStyles.tableHead}>Is Active</TableCell>
                      <TableCell align="center" sx={muiStyles.tableHead}>Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  {RoleMasterTableData2?.length > 0 ?
                    <TableBody>
                      {RoleMasterTableData2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                        return (
                          <TableRow key={index}>
                            {/* <TableCell component="th" scope="row">{index + 1}.</TableCell> */}

                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={true} value={pushbtActive} disabled={true} onChange={e => pushCheckedValues(e, item,'add')} /></TableCell>
                            {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.nPageId}</TableCell> */}
                            <TableCell align="left" sx={muiStyles.tableBody}>{item.vPageName}</TableCell>
                            {/* <TableCell align="left" sx={muiStyles.tableBody}>{item.vModuleName}</TableCell> */}
                            <TableCell align="left" sx={muiStyles.tableBody}>{item.DependentOn}</TableCell>
                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={item.btSaveRights} value={saveRight} onChange={e => pushCheckedValues(e, item,'SaveRights') } /></TableCell>
                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={item.btEditRights} value={editRight} onChange={e => pushCheckedValues(e, item,'EditRights') } /></TableCell>
                            <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={item.btActive} value={btActive} onChange={e => setBtActive(e.target.checked)} /></TableCell>
                            <TableCell align="center" sx={muiStyles.tableBody}><button className='deletbtn' title='Edit' onClick={() => update(item)}><TbEdit size={20} color='#000' /></button></TableCell>
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
                        <TableCell align="center" sx={muiStyles.tableHead}>Edit Rights</TableCell>


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

                              <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={saveRight} value={saveRight} onChange={e => setSaveRights(e.target.checked)} /></TableCell>
                              <TableCell align="left" sx={muiStyles.tableBody}><Checkbox defaultChecked={editRight} value={editRight} onChange={e => setEditRights(e.target.checked)} /></TableCell>


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
            <div className='mt-3' style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              {loader == true ?
                <CButton disabled className='submitbtn'>
                  <CSpinner component="span" size="sm" aria-hidden="true" />
                  Loading...
                </CButton>
                :
                <button type="submit" className='submitbtn' onClick={submit}>Submit</button>
              }

            </div>
          </>
          : null
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

export default EditRolePageLinkeg