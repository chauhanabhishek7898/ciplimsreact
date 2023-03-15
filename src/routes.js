import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Komonth = React.lazy(() => import('./views/Komonth/Komonth'))
const UnitMaster = React.lazy(() => import('./views/UnitMaster/UnitMaster'))
const MaterialMaster = React.lazy(() => import('./views/MaterialMaster/MaterialMaster'))
const PurchaseOrder = React.lazy(() => import('./views/PurchaseOrder/PurchaseOrder'))
const AddPurchaseOrder = React.lazy(() => import('./views/PurchaseOrder/AddPurchaseOrder'))
const EditPurchaseOrder = React.lazy(() => import('./views/PurchaseOrder/EditPurchaseOrder'))
const GRNReceivedList = React.lazy(() => import('./views/GRNReceivedMaster/GRNReceivedList'))
const AddGRNReceived = React.lazy(() => import('./views/GRNReceivedMaster/AddGRNReceived'))
const EditGRNReceived = React.lazy(() => import('./views/GRNReceivedMaster/EditGRNReceived'))
const LineMaster = React.lazy(() => import('./views/LineMaster/LineMaster'))

const VenderForm = React.lazy(() => import('./views/VenderForm/VenderForm'))
const BrandMaster = React.lazy(() => import('./views/BrandMaster/BrandMaster'))
const PackMaster = React.lazy(() => import('./views/PackMaster/PackMaster'))
const PlantMaster = React.lazy(() => import('./views/PlantMaster/PlantMaster'))
const GodownMaster = React.lazy(() => import('./views/GodownMaster/GodownMaster'))
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
  { path: '/VendorMaster', name: 'Vendor Master', element: VenderForm, exact: true },
  { path: '/BrandMaster', name: 'Brand Master', element: BrandMaster, exact: true },
  { path: '/PackMaster', name: 'Pack Master', element: PackMaster, exact: true },
  { path: '/PlantMaster', name: 'Plant Master', element: PlantMaster, exact: true },
  { path: '/MaterialMaster', name: 'Material Master', element: MaterialMaster, exact: true },
  { path: '/PurchaseOrder', name: 'Purchase Order', element: PurchaseOrder, exact: true },
  { path: '/LineMaster', name: 'Line Master', element: LineMaster, exact: true },
  { path: '/GodownMaster', name: 'Godown Master', element: GodownMaster, exact: true },
  { path: '/AddPurchaseOrder', name: 'Add Purchase Order', element: AddPurchaseOrder, exact: true },
  { path: '/EditPurchaseOrder', name: 'Edit Purchase Order', element: EditPurchaseOrder, exact: true },
  { path: '/GRNReceived', name: 'GRN Received', element: GRNReceivedList, exact: true },
  { path: '/AddGRNReceived', name: 'Add GRN Received', element: AddGRNReceived, exact: true },
  { path: '/EditGRNReceived', name: 'Edit GRN Received', element: EditGRNReceived, exact: true },
]

export default routes
