import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { GetUserDetailsUsingUNandPW } from './loginApi'
import { useNavigate } from "react-router-dom";
import DefaultLayout from 'src/layout/DefaultLayout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dashboard, setDashboard] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  useEffect(() => {
    const vUserName = localStorage.getItem("vUserName")
    const token = localStorage.getItem("token")
    if (vUserName&&token) {
      setDashboard(true)
    } else {
      setDashboard(false)
    }

  }, [])
  const login = () => {
    console.log('userName', userName)
    if (userName == '' && password == '' || password == '' || userName == '') {
      toast.error('Enter Username & Password')
    } else {
      setLoader(true)
      GetUserDetailsUsingUNandPW(userName, password, null).then(res => {

        if (res.data?.length > 0) {
          setDashboard(true)
          localStorage.setItem("vFullName", res.data[0].vFullName);
          localStorage.setItem("nUserId", res.data[0].nUserId);
          localStorage.setItem("vUserName", res.data[0].vUserName);
          localStorage.setItem("vMobileNo", res.data[0].vMobileNo);
          localStorage.setItem("vEmailId", res.data[0].vEmailId);
          localStorage.setItem("nRoleId", res.data[0].nRoleId);
          localStorage.setItem("vDeviceId", res.data[0].vDeviceId);
          localStorage.setItem("token", String(res.jwtToken));
          
          navigate('/GRNReceived')
          setLoader(false)
        } else {
        
          toast.error('Invalid Username & Password')
          setDashboard(false)
          setLoader(false)
        }
      })
    }
  }

  return (
    <div>


      {dashboard == true ?
        <DefaultLayout />
        :
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                <CCard className="text-white loginBox py-5" style={{background:'#ef1e2c' }}>
                    <CCardBody className="text-center" style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                      <div>
                        <h style={{fontSize:65}}>IMS</h>
                      </div>
                    </CCardBody>
                  </CCard>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h1>Login</h1>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput placeholder="Username" autoComplete="username" value={userName} onChange={e => setUserName(e.target.value)} />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                        </CInputGroup>
                        <CRow>
                          {loader == true ?
                            <CCol xs={6}>
                              <CButton disabled color="primary" className="px-4">
                                <CSpinner component="span" size="sm" aria-hidden="true" />
                                Loading...
                              </CButton>

                            </CCol>
                            :
                            <CCol xs={6}>
                              <CButton type='button' style={{background:'#ef1e2c',color:"#fff",border:'none'}} className="px-4"  onClick={login}>
                                Login
                              </CButton>
                            </CCol>
                          }

                          {/* <CCol xs={6} className="text-right">
                            <CButton color="link" className="px-0">
                              Forgot password?
                            </CButton>
                          </CCol> */}
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                 
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>

        </div>
      }
      <ToastContainer />
    </div>

  )
}

export default Login
