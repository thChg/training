import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RoleList from "./system/containers/RoleListContainer";
import RoleForm from "./system/containers/RoleFormContainer";
import PurchaseOrder from "./product/pages/PurchaseOrder";
import InventoryProvider from "./product/components/InventoryProvider";
import Inventory from "./product/pages/Inventory";
import PurchaseOrderProvider from "./product/components/PurchaseOrderProvider";
import BillOfLadingProvider from "./product/components/BillOfLadingProvider";
import BillOfLading from "./product/pages/BillOfLading";
import POAppoveProvider from "./accounting/components/POApproveProvider";
import POApprove from "./accounting/pages/POApprove";
import POAppoveDetailProvider from "./accounting/components/POApproveDetailProvider";
import POApproveDetail from "./accounting/pages/POApproveDetail";
import AccountantProvider from "./employee/components/AccountantProvider";
import Accountant from "./employee/pages/Accountant";
import BOLDetailProvider from "./product/components/BOLDetailProvider";
import BOLDetail from "./product/pages/BillOfLadingDetail";
import PODetailProvider from "./product/components/PODetailProvider";
import PODetail from "./product/pages/PurchaseOrderDetail";
import ProductProvider from "./product/components/ProductProvider";
import Product from "./product/pages/Product";
import CreatePO from "./product/pages/CreatePurchaseOrder";
import CreatePOProvider from "./product/components/CreatePOProvider";
import SaleOrderProvider from "./sales/components/SaleOrderProvider";
import SaleOrder from "./sales/pages/SaleOrder";
import CreateSOProvider from "./sales/components/CreateSOProvider";
import CreateSO from "./sales/pages/CreateSaleOrder";
import SODetail from "./sales/pages/SaleOrderDetail";
import SODetailProvider from "./sales/components/SODetailProvider";
import SOApproveProvider from "./accounting/components/SOApproveProvider";
import SOApprove from "./accounting/pages/SOApprove";
import SOApproveDetailProvider from "./accounting/components/SOApproveDetailProvider";
import SOApproveDetail from "./accounting/pages/SOApproveDetail";
import CustomerProvider from "./community/components/CustomerProvider";
import Customer from "./community/pages/Customer";
import VendorProvider from "./community/components/VendorProvider";
import Vendor from "./community/pages/Vendor";
import VendorDetailProvider from "./community/components/VendorDetailProvider";
import VendorDetail from "./community/pages/VendorDetail";
import CustomerDetailProvider from "./community/components/CustomerDetailProvider";
import CustomerDetail from "./community/pages/CustomerDetail";
import DeliveryNoteProvider from "./warehouse/components/DeliveryNoteProvider";
import DeliveryNote from "./warehouse/pages/DeliveryNote";
import DeliveryNoteDetailProvider from "./warehouse/components/DeliveryNoteDetailProvider";
import DeliveryNoteDetail from "./warehouse/pages/DeliveryNoteDetail";
import FiscalPeriodProvider from "./accounting/components/FiscalPeriodProvider";
import FiscalPeriod from "./accounting/pages/FiscalPeriod";
import CreateBOLProvider from "./product/components/CreateBOLProvider";
import CreateBillOfLading from "./product/pages/CreateBillOfLading";
import InventorySummaryProvider from "./reports/components/InventorySummaryProvider";
import InventorySummary from "./reports/pages/InventorySummary";
import ModuleList from "./system/containers/ModuleListContainer";
import ModuleForm from "./system/containers/ModuleFormContainer";
import FunctionList from "./system/containers/FunctionListContainer";
import FunctionForm from "./system/containers/FunctionFormContainer";
import UserList from "./system/containers/UserListContainer";
import UserForm from "./system/containers/UserFormContainer";
import PositionList from "./humanResource/containers/PositionListContainer";
import PositionForm from "./humanResource/containers/PositionFormContainer";
import DepartmentList from "./humanResource/containers/DepartmentListContainer";
import DepartmentForm from "./humanResource/containers/DepartmentFormContainer";
import TitleList from "./humanResource/containers/TitleListContainer";
import TitleForm from "./humanResource/containers/TitleFormContainer";
import CompanyForm from "./humanResource/containers/CompanyFormContainer";
import CompanyList from "./humanResource/containers/CompanyListContainer";
import EmployeeList from "./humanResource/containers/EmployeeListContainer";
import EmployeeForm from "./humanResource/containers/EmployeeFormContainer";
import ResourceList from "./system/containers/ResourceListContainer";
import ResourceForm from "./system/containers/ResourceFormContainer";
import PolicyList from "./system/containers/PolicyListContainer";
import PolicyForm from "./system/containers/PolicyFormContainer";
import AccessList from "./system/containers/AccessListContainer";
import AccessForm from "./system/containers/AccessFormContainer";

export class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes>
        {/* <Route
          path="products"
          element={
            <ProductProvider>
              <Product />
            </ProductProvider>
          }
        /> */}
        <Route path="system/user" element={<UserList />} />
        <Route path="system/role" element={<RoleList />} />
        <Route path="system/role/:id" element={<RoleForm />} />
        <Route path="system/module" element={<ModuleList />} />
        <Route path="system/module/:id" element={<ModuleForm />} />
        <Route path="system/function" element={<FunctionList />} />
        <Route path="system/function/:id" element={<FunctionForm />} />
        <Route path="system/user" element={<UserList />} />
        <Route path="system/user/:id" element={<UserForm />} />
        <Route path="system/resource" element={<ResourceList />} />
        <Route path="system/resource/:id" element={<ResourceForm />} />
        <Route path="system/policy" element={<PolicyList />} />
        <Route path="system/policy/:id" element={<PolicyForm />} />
        <Route path="system/access" element={<AccessList />} />
        <Route path="system/access/:id" element={<AccessForm />} />

        <Route path="human-resource/position" element={<PositionList />} />
        <Route path="human-resource/position/:id" element={<PositionForm />} />
        <Route path="human-resource/department" element={<DepartmentList />} />
        <Route
          path="human-resource/department/:id"
          element={<DepartmentForm />}
        />
        <Route path="human-resource/title" element={<TitleList />} />
        <Route path="human-resource/title/:id" element={<TitleForm />} />
        <Route path="human-resource/company" element={<CompanyList />} />
        <Route path="human-resource/company/:id" element={<CompanyForm />} />
        <Route path="human-resource/employee" element={<EmployeeList />} />
        <Route path="human-resource/employee/:id" element={<EmployeeForm />} />

        {/* <Route
          path="inventory"
          element={
            <InventoryProvider>
              <Inventory />
            </InventoryProvider>
          }
        />
        <Route
          path="purchase-orders"
          element={
            <PurchaseOrderProvider>
              <PurchaseOrder />
            </PurchaseOrderProvider>
          }
        />
        <Route
          path="purchase-orders/details/:id"
          element={
            <PODetailProvider>
              <PODetail />
            </PODetailProvider>
          }
        />
        <Route
          path="create-purchase-order"
          element={
            <CreatePOProvider>
              <CreatePO />
            </CreatePOProvider>
          }
        />
        <Route
          path="bill-of-ladings"
          element={
            <BillOfLadingProvider>
              <BillOfLading />
            </BillOfLadingProvider>
          }
        />
        <Route
          path="bill-of-ladings/create"
          element={
            <CreateBOLProvider>
              <CreateBillOfLading />
            </CreateBOLProvider>
          }
        />
        <Route
          path="bill-of-ladings/details/:id"
          element={
            <BOLDetailProvider>
              <BOLDetail />
            </BOLDetailProvider>
          }
        />
        <Route
          path="po-approve"
          element={
            <POAppoveProvider>
              <POApprove />
            </POAppoveProvider>
          }
        />
        <Route
          path="po-approve/details/:id"
          element={
            <POAppoveDetailProvider>
              <POApproveDetail />
            </POAppoveDetailProvider>
          }
        />
        <Route
          path="so-approve"
          element={
            <SOApproveProvider>
              <SOApprove />
            </SOApproveProvider>
          }
        />
        <Route
          path="so-approve/details/:id"
          element={
            <SOApproveDetailProvider>
              <SOApproveDetail />
            </SOApproveDetailProvider>
          }
        />
        <Route
          path="accountant"
          element={
            <AccountantProvider>
              <Accountant />
            </AccountantProvider>
          }
        />
        <Route
          path="sale-orders"
          element={
            <SaleOrderProvider>
              <SaleOrder />
            </SaleOrderProvider>
          }
        />
        <Route
          path="create-sale-order"
          element={
            <CreateSOProvider>
              <CreateSO />
            </CreateSOProvider>
          }
        />
        <Route
          path="sale-orders/details/:id"
          element={
            <SODetailProvider>
              <SODetail />
            </SODetailProvider>
          }
        />
        <Route
          path="customers"
          element={
            <CustomerProvider>
              <Customer />
            </CustomerProvider>
          }
        />
        <Route
          path="customers/details/:id"
          element={
            <CustomerDetailProvider>
              <CustomerDetail />
            </CustomerDetailProvider>
          }
        />
        <Route
          path="vendors"
          element={
            <VendorProvider>
              <Vendor />
            </VendorProvider>
          }
        />
        <Route
          path="vendors/details/:id"
          element={
            <VendorDetailProvider>
              <VendorDetail />
            </VendorDetailProvider>
          }
        />
        <Route
          path="delivery-notes"
          element={
            <DeliveryNoteProvider>
              <DeliveryNote />
            </DeliveryNoteProvider>
          }
        />
        <Route
          path="delivery-notes/details/:id"
          element={
            <DeliveryNoteDetailProvider>
              <DeliveryNoteDetail />
            </DeliveryNoteDetailProvider>
          }
        />
        <Route
          path="fiscal-period"
          element={
            <FiscalPeriodProvider>
              <FiscalPeriod />
            </FiscalPeriodProvider>
          }
        />
        <Route
          path="inventory-summary"
          element={
            <InventorySummaryProvider>
              <InventorySummary />
            </InventorySummaryProvider>
          }
        /> */}
        {/* <Route
          path="inventory-manager"
          element={
            <POAppoveDetailProvider>
              <POApproveDetail />
            </POAppoveDetailProvider>
          }
        /> */}
      </Routes>
    );
  }
}

export default AppRouter;
