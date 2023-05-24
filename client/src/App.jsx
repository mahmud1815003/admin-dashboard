import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { useMemo } from "react";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../src/scenes/dashboard/Dashboard.jsx";
import Layout from "../src/scenes/layout/Layout";
import Products from "./scenes/products/Products";
import Customers from "./scenes/customer/Customers";
import Transactions from "./scenes/transaction/Transactions.jsx";
import Geography from "./scenes/geography/Geography";
import Sales from "./scenes/sales/Sales";
import Daily from "./scenes/daily/Daily";
import Monthly from './scenes/monthly/Monthly';
import BreakDown from "./scenes/breadDown/BreakDown";
import AdminPanel from "./scenes/admin/AdminPanel";
import Performance from "./scenes/performance/Performance";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Sales />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<BreakDown />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
