import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDasboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";

import ManageCategory from "./admin/ManageCategory";
import UpdateCategory from "./admin/UpdateCategory";

import ManageUsers from "./admin/ManageUsers";

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact component={Shop} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
          <AdminRoute
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoute path="/create/category" exact component={AddCategory} />
          <AdminRoute path="/create/product" exact component={AddProduct} />
          <AdminRoute path="/admin/orders" exact component={Orders} />
          <AdminRoute path="/admin/products" exact component={ManageProducts} />
          <AdminRoute path="/admin/users" exact component={ManageUsers} />
          <AdminRoute
            path="/admin/categories"
            exact
            component={ManageCategory}
          />
          <AdminRoute
            path="/admin/product/update/:productId"
            exact
            component={UpdateProduct}
          />
          <AdminRoute
            path="/admin/category/update/:categoryId"
            exact
            component={UpdateCategory}
          />
          <Route path="/product/:productId" exact component={Product} />
          <Route path="/cart/" exact component={Cart} />
          <PrivateRoute path="/profile/:userId" exact component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
