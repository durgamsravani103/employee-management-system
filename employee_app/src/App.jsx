import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeList from "./components/EmployeeList";
import CreateEmployeePage from "./components/CreateEmployeePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/employees" element={<EmployeeList />} />

        <Route path="/create-employee" element={<CreateEmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
