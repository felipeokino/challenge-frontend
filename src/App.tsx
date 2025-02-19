import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "components/Layout";
import PrivateRoute from "components/Layout/privateRoute";
import ProductCreate from "components/ProductCreate";
import ProductDetail from "components/ProductDetail";
import ProductEdit from "components/ProductEdit";

import Home from "pages/Home";
import Login from "pages/Login";
import Logs from "pages/Logs";
import Seeds from "pages/Seeds";

function App() {
  useEffect(() => {
    document.title = "React Challenge";
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:id/edit" element={<ProductEdit />} />
        <Route path="/product/create" element={<ProductCreate />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="seeds" element={<Seeds />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
