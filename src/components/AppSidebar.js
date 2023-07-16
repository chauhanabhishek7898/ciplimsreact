import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { GetProfileDetails } from '../views/Komonth/Komonthapi'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  // cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { useNavigate } from "react-router-dom";
const AppSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [navigationData, setNavigationData] = React.useState([]);
  useEffect(() => {
    getProfileDetails()
  }, [])
  const getProfileDetails = () => {
    GetProfileDetails(localStorage.getItem('nUserId')).then(response => {
      const nav = []
      let pageId = 0
      response.TAB2.forEach(item => {
        if (item.vPageName != null && item.nPageDependentId == null) {
          nav.push({
            component: CNavItem,
            name: item.vPageCaption,
            to: item.vPageName,
            icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
          })
        }
        
        if (item.vPageName == null && item.nPageDependentId == null) {
          let subNav=[]
          let subChildNav=[]
          let filterItem = response.TAB2.filter(e=>e.nPageDependentId==item.nPageId)
          // console.log('filterItem',filterItem)
          
          filterItem.forEach(el => {
           
            
            if(el.vPageName==null){
              let childFilterItem = response.TAB2.filter(e => e.nPageDependentId == el.nPageId)
            console.log('childFilterItem',childFilterItem)
            subChildNav=[]
              childFilterItem.forEach(child=>{
                subChildNav.push({
                  component: CNavItem,
                  name: child.vPageCaption,
                  to: child.vPageName,
                  // icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
                })
              })
              
              subNav.push({
                component:  CNavGroup,
                name: el.vPageCaption,
                to: el.vPageName,
                items: subChildNav
                // icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
              })
            }else{
             
              subNav.push({
                component: CNavItem,
                name: el.vPageCaption,
                to: el.vPageName,
                // icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
              })
            }
           
          })
       
          nav.push({
            component: CNavGroup,
            name: item.vPageCaption,
            icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
            items: subNav
          })
          pageId=item.nPageId
          // console.log('pageId',pageId)
          
        }
       })
      //  console.log('subNav',subNav)
      setNavigationData(nav)
    })
  }
  const gotoLogin=()=>{
    if(localStorage.getItem('token')==null||localStorage.getItem('token')==undefined){
      navigate('/login')
      window.location.reload(false);
    }
    
  }
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <div>
        <img style={{width: 190,height:28}} src={require('../assets/brand/IMSLogoWhite.png')} alt='' />
        </div>
      </CSidebarBrand>
      <CSidebarNav onClick={gotoLogin}>
        <SimpleBar>
          <AppSidebarNav items={navigationData} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
