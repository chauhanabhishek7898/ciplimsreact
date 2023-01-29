import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Komonth = React.lazy(() => import('./views/Komonth/Komonth'))
const UnitMaster = React.lazy(() => import('./views/UnitMaster/UnitMaster'))
const MaterialMaster = React.lazy(() => import('./views/MaterialMaster/MaterialMaster'))
const PurchaseOrder = React.lazy(() => import('./views/PurchaseOrder/PurchaseOrder'))
const LineMaster = React.lazy(() => import('./views/LineMaster/LineMaster'))

const VenderForm = React.lazy(() => import('./views/VenderForm/VenderForm'))
const BrandMaster = React.lazy(() => import('./views/BrandMaster/BrandMaster'))
const PackMaster = React.lazy(() => import('./views/PackMaster/PackMaster'))
const PlantMaster = React.lazy(() => import('./views/PlantMaster/PlantMaster'))
const UpdateEmail = React.lazy(() => import('./views/Settings/UpdateEmail/UpdateEmail'))
const UpdateMobileNo = React.lazy(() => import('./views/Settings/UpdateMobileNo/UpdateMobileNo'))
const UpdatePassword = React.lazy(() => import('./views/Settings/UpdatePassword/UpdatePassword'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/KOMonth', name: 'Ko Month', element: Komonth, exact: true },
  { path: '/UnitMaster', name: 'Unit Master', element: UnitMaster, exact: true },
  { path: '/update-email-id', name: 'Update Email', element: UpdateEmail, exact: true },
  { path: '/update-mobile-no', name: 'Update Mobile No', element: UpdateMobileNo, exact: true },
  { path: '/update-password', name: 'Update Password', element: UpdatePassword, exact: true },
  { path: '/VendorMaster', name: 'Vender Form', element: VenderForm, exact: true },
  { path: '/BrandMaster', name: 'Brand Master', element: BrandMaster, exact: true },
  { path: '/PackMaster', name: 'Pack Master', element: PackMaster, exact: true },
  { path: '/PlantMaster', name: 'Plant Master', element: PlantMaster, exact: true },
  { path: '/MaterialMaster', name: 'Material Master', element: MaterialMaster, exact: true },
  { path: '/PurchaseOrder', name: 'Purchase Order', element: PurchaseOrder, exact: true },
  { path: '/LineMaster', name: 'Line Master', element: LineMaster, exact: true },
]

export default routes
