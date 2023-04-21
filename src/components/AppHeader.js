import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { CImage } from '@coreui/react'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

import { useNavigate } from "react-router-dom";
const AppHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }
  return (
    <CHeader position="sticky" className="bg-set mb-4">
      <CContainer fluid>


        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <div>
            <div className="hamburger-toggle"
            // onClick={handleToggle}
            >
              <div className={`line ${isOpen ? "open" : ""}`}></div>
              <div className={`line ${isOpen ? "open" : ""}`}></div>
              <div className={`line ${isOpen ? "open" : ""}`}></div>
            </div>
          </div>
          {/* <CIcon width={25} height={30} size='40'  icon={cilMenu}  /> */}
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <div>
            <img style={{ width: 133 }} src={require('../assets/brand/logosmobile.png')} />
          </div>
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            {/* <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink> */}
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem> */}
          <CNavItem>
            <CNavLink
              style={{ fontSize: 25, fontWeight: 500 }}
            // onClick={() => navigate('/')}
            >IMS</CNavLink>
          </CNavItem>
        </CHeaderNav>
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
        <CDropdown>
          <CDropdownToggle href="#" color="secondary">Nitin Chaudhary</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem href="#">Prlofile</CDropdownItem>
            <CDropdownItem href="#">Others</CDropdownItem>
            <CDropdownItem href="#">Settings</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
