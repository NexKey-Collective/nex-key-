import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DealsTypePage from "./pages/DealsTypePage";
import DealDetailPage from "./pages/DealDetailPage";
import MapPage from "./pages/MapPage";
import MyBuyBoxPage from "./pages/MyBuyBoxPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/deals" element={<DealsTypePage />} />
          <Route path="/deals/:id" element={<DealDetailPage />} />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-buy-box"
            element={
              <ProtectedRoute>
                <MyBuyBoxPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}