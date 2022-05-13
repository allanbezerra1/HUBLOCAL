import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import ReadAccountable from "./components/rules/accountable/read";
import CreateAccountable from "./components/rules/accountable/create";
import UpdateAccountable from "./components/rules/accountable/update";
import ReadCompany from "./components/rules/company/read";
import CreateCompany from "./components/rules/company/create";
import UpdateCompany from "./components/rules/company/update";
import ReadLocation from "./components/rules/location/read";
import CreateLocation from "./components/rules/location/create";
import UpdateLocation from "./components/rules/location/update";
import ReadTicket from "./components/rules/ticket/read";
import UpdateTicket from "./components/rules/ticket/update";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tickets" element={<ReadTicket />} />
          <Route path="tickets/edit" element={<UpdateTicket />} />
          <Route path="companies" element={<ReadCompany />} />
          <Route path="companies/create" element={<CreateCompany />} />
          <Route path="companies/edit" element={<UpdateCompany />} />
          <Route path="accountables" element={<ReadAccountable />} />
          <Route path="accountables/create" element={<CreateAccountable />} />
          <Route path="accountables/edit" element={<UpdateAccountable />} />
          <Route path="locations" element={<ReadLocation />} />
          <Route path="locations/create" element={<CreateLocation />} />
          <Route path="locations/edit" element={<UpdateLocation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
