import React from 'react'
// import ProductMaster from './views/ProductMaster/ProductMaster'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Komonth = React.lazy(() => import('./views/Komonth/Komonth'))
const UnitMaster = React.lazy(() => import('./views/UnitMaster/UnitMaster'))
const MaterialMaster = React.lazy(() => import('./views/MaterialMaster/MaterialMaster'))
const PurchaseOrder = React.lazy(() => import('./views/PurchaseOrder/PurchaseOrder'))
const ProductMaster = React.lazy(() => import('./views/ProductMaster/ProductMaster'))

const RoleMaster = React.lazy(() => import('./views/RoleMaster/RoleMaster'))

const PageMaster = React.lazy(() => import('./views/PageMaster/PageMaster'))

const CreateUsers = React.lazy(() => import('./views/CreateUsers/CreateUsers'))


const MaterialTypeMaster = React.lazy(() => import('./views/MaterialTypeMaster/MaterialTypeMaster'))

const ProductCategoryMaster = React.lazy(() => import('./views/ProductCategoryMaster/ProductCategoryMaster'))

const ProductSubCategoryMaster = React.lazy(() => import('./views/ProductSubCategoryMaster/ProductSubCategoryMaster'))

const StorageConditionMaster = React.lazy(() => import('./views/StorageConditionMaster/StorageConditionMaster'))

const VarientMaster = React.lazy(() => import('./views/VarientMaster/VarientMaster'))


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
const VendorCategoryMaster = React.lazy(() => import('./views/VendorCategoryMaster/VendorCategoryMaster'))
const VendorSubCategoryMaster = React.lazy(() => import('./views/VendorSubCategoryMaster/VendorSubCategoryMaster'))
const RolePageLinkegList = React.lazy(() => import('./views/RolePageLinkege/RolePageLinkegList'))
const AddRolePageLinkeg = React.lazy(() => import('./views/RolePageLinkege/AddRolePageLinkeg'))
const EditRolePageLinkeg = React.lazy(() => import('./views/RolePageLinkege/EditRolePageLinkeg'))

const BomPdf = React.lazy(() => import('./views/BOMMaster/BomPdf'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  //  { path:"/login", name:"Login", element:Login },   
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/KOMonth', name: 'Ko Month', element: Komonth, exact: true },
  { path: '/ProductMaster', name: 'Brand', element: ProductMaster, exact: true },

  { path: '/Roles', name: 'Role', element: RoleMaster, exact: true },

  { path: '/Pages', name: 'Page', element: PageMaster, exact: true },

  { path: '/CreateUsers', name: 'Create Users', element: CreateUsers, exact: true },
  { path: '/RolePageLinkage', name: 'Role Page Linkage', element: RolePageLinkegList, exact: true },
  { path: '/AddRolePageLinkeg', name: 'Add Role Page Linkage', element: AddRolePageLinkeg, exact: true },
  { path: '/EditRolePageLinkeg', name: 'Edit Role Page Linkage', element: EditRolePageLinkeg, exact: true },

  { path: '/MaterialTypeMaster', name: 'Material Type', element: MaterialTypeMaster, exact: true },

  { path: '/ProductCategoryMaster', name: 'Brand Category', element: ProductCategoryMaster, exact: true },

  { path: '/ProductSubCategoryMaster', name: 'Brand Subcategory', element: ProductSubCategoryMaster, exact: true },

  { path: '/StorageConditionMaster', name: 'Storage Condition', element: StorageConditionMaster, exact: true },

  { path: '/VarientMaster', name: 'Varient', element: VarientMaster, exact: true },


  { path: '/UnitMaster', name: 'Unit', element: UnitMaster, exact: true },
  { path: '/update-email-id', name: 'Update Email Id', element: UpdateEmail, exact: true },
  { path: '/update-mobile-no', name: 'Update Mobile Number', element: UpdateMobileNo, exact: true },
  { path: '/update-password', name: 'Change Password', element: UpdatePassword, exact: true },
  { path: '/VendorMaster', name: 'Vendor', element: VenderForm, exact: true },
  { path: '/BrandMaster', name: 'Brand Unit', element: BrandMaster, exact: true },
  { path: '/PackMaster', name: 'SKU', element: PackMaster, exact: true },
  { path: '/PlantMaster', name: 'Plant', element: PlantMaster, exact: true },
  { path: '/MaterialMaster', name: 'Material', element: MaterialMaster, exact: true },
  { path: '/PurchaseOrder', name: 'Purchase Order', element: PurchaseOrder, exact: true },
  { path: '/LineMaster', name: 'Line', element: LineMaster, exact: true },
  { path: '/GodownMaster', name: 'Godown', element: GodownMaster, exact: true },
  { path: '/AddPurchaseOrder', name: 'Add Purchase Order', element: AddPurchaseOrder, exact: true },
  { path: '/EditPurchaseOrder', name: 'Edit Purchase Order', element: EditPurchaseOrder, exact: true },
  { path: '/GRNReceived', name: 'GRN Received', element: GRNReceivedList, exact: true },
  { path: '/AddGRNReceived', name: 'Add GRN Received', element: AddGRNReceived, exact: true },
  { path: '/EditGRNReceived', name: 'Edit GRN Received', element: EditGRNReceived, exact: true },
  { path: '/BOM', name: 'BOM', element: BomMasterList, exact: true },
  { path: '/AddBomMaster', name: 'Add BOM', element: AddBomMaster, exact: true },
  { path: '/EditBomMaster', name: 'Edit BOM', element: EditBomMaster, exact: true },
  { path: '/EnterOpeningStock', name: 'Inventory Module', element: EnterOpeningStock, exact: true },
  { path: '/AddEnterOpeningStock', name: 'Add Inventory Module', element: AddEnterOpeningStock, exact: true },
  { path: '/EditEnterOpeningStock', name: 'Edit Inventory Module', element: EditEnterOpeningStock, exact: true },
  { path: '/MaterialRelease', name: 'Material Release', element: MaterialRelease, exact: true },
  { path: '/AddMaterialRelease', name: 'Add Material Release', element: AddMaterialRelease, exact: true },
  { path: '/EditMaterialRelease', name: 'Edit Material Release', element: EditMaterialRelease, exact: true },
  { path: '/AdditionalIn', name: 'Additional In', element: AdditionalInList, exact: true },
  { path: '/AddAdditionalIn', name: 'Add Additional In', element: AddAdditionalIn, exact: true },
  { path: '/EditAdditionalIn', name: 'Edit Additional In', element: EditAdditionalIn, exact: true },
  { path: '/RejectedOut', name: 'Rejected Out / Drain', element: RejectedOutList, exact: true },
  { path: '/AddRejectedOut', name: 'Add Rejected Out / Drain', element: AddRejectedOut, exact: true },
  { path: '/EditRejectedOut', name: 'Edit Rejected Out / Drain', element: EditRejectedOut, exact: true },
  { path: '/CurrentStockStatus', name: 'Current Stock Status', element: CurrentStockStatus, exact: true },
  { path: '/ProductionDetails', name: 'Production Details ', element: ProductionDetailsList, exact: true },
  { path: '/AddProductionDetails', name: 'Add Production Details ', element: AddProductionDetails, exact: true },
  { path: '/EditProductionDetails', name: 'Edit Production Details ', element: EditProductionDetails, exact: true },
  { path: '/DispatchDetails', name: 'Dispatch Details ', element: DispatchDetailsList, exact: true },
  { path: '/AddDispatchDetails', name: 'Add Dispatch Details ', element: AddDispatchDetails, exact: true },
  { path: '/EditDispatchDetails', name: 'Edit Dispatch Details ', element: EditDispatchDetails, exact: true },
  { path: '/VendorCategoryMaster', name: 'Vendor / Material Category ', element: VendorCategoryMaster, exact: true },
  { path: '/VendorSubCategoryMaster', name: 'Vendor / Material Subcategory ', element: VendorSubCategoryMaster, exact: true },

  { path: '/BomPdf', name: 'PDF', element: BomPdf, exact: true },

]

export default routes
