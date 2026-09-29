import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { PublicSiteProvider } from "./components/public/PublicSiteContext";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DealsTypePage = lazy(() => import("./pages/DealsTypePage"));
const DealDetailPage = lazy(() => import("./pages/DealDetailPage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const MyBuyBoxPage = lazy(() => import("./pages/MyBuyBoxPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PublicSiteProvider>
          <Header />
          <Suspense fallback={<main className="min-h-[50vh] grid place-items-center" role="status">Loading page…</main>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/deals" element={<DealsTypePage />} />
              <Route path="/deals/:id" element={<DealDetailPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
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
          </Suspense>
        </PublicSiteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
