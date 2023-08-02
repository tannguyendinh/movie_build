import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTemplate from "./template/UserTemplate";
import HomePage from "./pages/HomePage/HomePage";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/Login/Login";
import AdminTemplate from "./template/AdminTemplate";
import LoginAdmin from "./pages/LoginAdmin/LoginAdmin";
import UserManagement from "./pages/UserManagement/UserManagement";
// import Loading from "./pages/Loading/Loading";
import Detail from "./pages/Detail/Detail";
import CheckOutTemplate from "./template/CheckOutTemplate";
import CheckOut from "./pages/CheckOut/CheckOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="/detail/:id" element={<Detail />} />

          <Route path="/login" element={<Login />} />
        </Route>
        
        {/* checkout */}
        <Route path="/checkout/:id" element={<CheckOutTemplate />}>
          <Route index element={<CheckOut />} />
        </Route>

        {/* trang admin  */}
        <Route path="/admin" element={<AdminTemplate />}>
          <Route index element={<UserManagement />} />
        </Route>

        <Route path="/admin-login" element={<LoginAdmin />} />
        <Route path="*" element={<Page404 />} />
        {/* <Route path="/loading" element={<Loading />} /> */}
      </Routes>
      {/* <Route path="/loading" element={<Loading />} /> */}
    </BrowserRouter>
  );
}

export default App;
