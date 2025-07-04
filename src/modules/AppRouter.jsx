import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserManagement from "./user/pages/UserManagement";
import RoleManagement from "./user/pages/RoleManagement";
import UserManagementProvider from "./user/components/UserManagementProvider";
import RoleManagementProvider from "./user/components/RoleManagementProvider";
import RoleInfo from "./user/pages/RoleInfo";
import RoleInfoProvider from "./user/components/RoleInfoProvider";
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

export class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Routes>
        <Route
          path="products"
          element={
            <ProductProvider>
              <Product />
            </ProductProvider>
          }
        />
        <Route
          path="user-management"
          element={
            <UserManagementProvider>
              <UserManagement />
            </UserManagementProvider>
          }
        />
        <Route
          path="role-management"
          element={
            <RoleManagementProvider>
              <RoleManagement />
            </RoleManagementProvider>
          }
        />
        <Route
          path="role-management/detail"
          element={
            <RoleInfoProvider>
              <RoleInfo />
            </RoleInfoProvider>
          }
        />
        <Route
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
