import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
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
const BomMasterList = React.lazy(() => import('./views/BOMMaster/BomMasterList'))
const AddBomMaster = React.lazy(() => import('./views/BOMMaster/AddBomMaster'))
const EditBomMaster = React.lazy(() => import('./views/BOMMaster/EditBomMaster'))
const EnterOpeningStock = React.lazy(() => import('./views/EnterOpeningStock/EnterOpeningStockList'))
const AddEnterOpeningStock = React.lazy(() => import('./views/EnterOpeningStock/AddEnterOpeningStock'))
const EditEnterOpeningStock = React.lazy(() => import('./views/EnterOpeningStock/EditEnterOpeningStock'))
const MaterialRelease = React.lazy(() => import('./views/MaterialRelease/MaterialReleaseList'))
const AddMaterialRelease = React.lazy(() => import('./views/MaterialRelease/AddMaterialRelease'))
const EditMaterialRelease = React.lazy(() => import('./views/MaterialRelease/EditMaterialRelease'))
const AdditionalInList = React.lazy(() => import('./views/AdditionalIn/AdditionalInList'))
const AddAdditionalIn = React.lazy(() => import('./views/AdditionalIn/AddAdditionalIn'))
const EditAdditionalIn = React.lazy(() => import('./views/AdditionalIn/EditAdditionalIn'))
const RejectedOutList = React.lazy(() => import('./views/RejectedOut/RejectedOutList'))
const AddRejectedOut = React.lazy(() => import('./views/RejectedOut/AddRejectedOut'))
const EditRejectedOut = React.lazy(() => import('./views/RejectedOut/EditRejectedOut'))
const CurrentStockStatus = React.lazy(() => import('./views/CurrentStockStatus/CurrentStockStatus'))
const ProductionDetailsList = React.lazy(() => import('./views/ProductionDetails/ProductionDetailsList'))
const AddProductionDetails = React.lazy(() => import('./views/ProductionDetails/AddProductionDetails'))
const EditProductionDetails = React.lazy(() => import('./views/ProductionDetails/EditProductionDetails'))
const DispatchDetailsList = React.lazy(() => import('./views/DispatchDetails/DispatchDetailsList'))
const AddDispatchDetails = React.lazy(() => import('./views/DispatchDetails/AddDispatchDetails'))
const EditDispatchDetails = React.lazy(() => import('./views/DispatchDetails/EditDispatchDetails'))

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
  //  { path:"/login", name:"Login", element:Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/KOMonth', name: 'Ko Month', element: Komonth, exact: true },
  { path: '/UnitMaster', name: 'Unit Master', element: UnitMaster, exact: true },
  { path: '/update-email-id', name: 'Update Email', element: UpdateEmail, exact: true },
  { path: '/update-mobile-no', name: 'Update Mobile No', element: UpdateMobileNo, exact: true },
  { path: '/update-password', name: 'Change Password', element: UpdatePassword, exact: true },
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
  { path: '/BOM', name: 'BOM', element: BomMasterList, exact: true },
  { path: '/AddBomMaster', name: 'Add BOM', element: AddBomMaster, exact: true },
  { path: '/EditBomMaster', name: 'Edit BOM', element: EditBomMaster, exact: true },
  { path: '/EnterOpeningStock', name: 'Enter Opening Stock', element: EnterOpeningStock, exact: true },
  { path: '/AddEnterOpeningStock', name: 'Add Enter Opening Stock', element: AddEnterOpeningStock, exact: true },
  { path: '/EditEnterOpeningStock', name: 'Edit Enter Opening Stock', element: EditEnterOpeningStock, exact: true },
  { path: '/MaterialRelease', name: 'Material Release', element: MaterialRelease, exact: true },
  { path: '/AddMaterialRelease', name: 'Add Material Release', element: AddMaterialRelease, exact: true },
  { path: '/EditMaterialRelease', name: 'Edit Material Release', element: EditMaterialRelease, exact: true },
  { path: '/AdditionalIn', name: 'Additional In', element: AdditionalInList, exact: true },
  { path: '/AddAdditionalIn', name: 'Add Additional In', element: AddAdditionalIn, exact: true },
  { path: '/EditAdditionalIn', name: 'Edit Additional In', element: EditAdditionalIn, exact: true }, 
  { path: '/RejectedOut', name: 'Rejected Out', element: RejectedOutList, exact: true },
  { path: '/AddRejectedOut', name: 'Add Rejected Out', element: AddRejectedOut, exact: true },
  { path: '/EditRejectedOut', name: 'Edit Rejected Out', element: EditRejectedOut, exact: true },
  { path: '/CurrentStockStatus', name: 'Current Stock Status', element: CurrentStockStatus, exact: true },
  { path: '/ProductionDetails', name: 'Production Details ', element: ProductionDetailsList, exact: true },
  { path: '/AddProductionDetails', name: 'Add Production Details ', element: AddProductionDetails, exact: true },
  { path: '/EditProductionDetails', name: 'Edit Production Details ', element: EditProductionDetails, exact: true },
  { path: '/DispatchDetails', name: 'Dispatch Details ', element: DispatchDetailsList, exact: true },
  { path: '/AddDispatchDetails', name: 'Add Dispatch Details ', element: AddDispatchDetails, exact: true },
  { path: '/EditDispatchDetails', name: 'Edit Dispatch Details ', element: EditDispatchDetails, exact: true },
]

export default routes
