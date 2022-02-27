import './App.css';
import Sidebar from './components/MainPage/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Market from './components/MarketPage/Market/Market';
import Dashboard from './components/MainPage/Dashboard/Dashboard';
import CoinViewPage from './components/MarketPage/CoinViewPage/CoinViewPage';
import Login from './components/AccountSetup/Login/Login';
import Register from './components/AccountSetup/Register/Register';
import ForgotPassword from './components/AccountSetup/ForgotPassword/ForgotPassword';
import VerifyProfile from './components/AccountSetup/VerifyProfile/VerifyProfile';
import SuccessfullyVerified from './components/AccountSetup/SuccessfullyVerified/SuccessfullyVerified';
import AccountType from './components/AccountSetup/BankAccount/AccountType/AccountType';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '././theme';
import React from 'react';
import BankAccount from './components/AccountSetup/BankAccount/BankAccount';
import EditProfile from './components/AccountSetup/EditProfile/EditProfile';
import Congratulations from './components/AccountSetup/Congratulations/Congratulations';
import ResetPassword from './components/AccountSetup/ResetPassword/ResetPassword';
import BarSide from './components/MainPage/Sidebar/Sidebar';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Sidebar />
        <Routes>
          <Route
            path="reset-password/:userId/:resetString"
            element={<ResetPassword />}
          />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="market" element={<Market />} />
          <Route path="market/:id" element={<CoinViewPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="verify-profile" element={<VerifyProfile />} />

          <Route
            path="successfully-verified/:emailToken"
            element={<SuccessfullyVerified />}
          />
          <Route path="account-type" element={<AccountType />} />
          <Route path="bank-account" element={<BankAccount />} />
          <Route path="congratulations" element={<Congratulations />} />
          <Route path="sidebar" element={<BarSide />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
