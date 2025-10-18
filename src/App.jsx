import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import SidebarLayout from "./component/layout/SideBarLayout";
import MainPage from "./component/pages/mainPage/MainPage";
import LoginPage from "./component/pages/userPage/LoginPage";
import SettingPage from "./component/pages/userPage/SettingPage";
import ProductPage from "./component/pages/productPage/ProductPage";
import PlanPage from "./component/pages/productPage/PlanPage";
import ClientPage from "./component/pages/clientPage/ClientPage";
import ContractPage from "./component/pages/contractPage/ContractPage";
import ContractRevenuePage from "./component/pages/contractPage/ContractRevenuePage";
import RevenuePage from "./component/pages/revenuePage/RevenuePage";
import RevenueGraphPage from "./component/pages/revenuePage/RevenueGraphPage";
import NoticePage from "./component/pages/noticePage/NoticePage";
import ContentPage from "./component/pages/noticePage/ContentPage";
import ContentWritePage from "./component/pages/noticePage/ContentWritePage";
import ContentEditPage from "./component/pages/noticePage/ContentEditPage";
import UserPage from "./component/pages/adminPage/UserPage";

function App() {

  return (
    <Router>
        <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<SidebarLayout />}>
            <Route index element={<MainPage />} />
            <Route path="setting" element={<SettingPage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="products/:productId/plan" element={<PlanPage />} />
            <Route path="clients" element={<ClientPage />} />
            <Route path="contracts" element={<ContractPage />} />
            <Route path="contracts/:contractId/revenue" element={<ContractRevenuePage />} />
            <Route path="revenues" element={<RevenuePage />} />
            <Route path="revenues/graph" element={<RevenueGraphPage />} />
            <Route path="notices" element={<NoticePage />} />
            <Route path="notices/:noticeId" element={<ContentPage />} />
            <Route path="notice/write" element={<ContentWritePage />} />
            <Route path="notices/:noticeId/edit" element={<ContentEditPage />} />
            <Route path="admin/users" element={<UserPage />} />
          </Route>
        </Routes>
      </AuthProvider>
      </Router>
  )
}

export default App
