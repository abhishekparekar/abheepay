import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "../components/Common/Loader";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminRoute from "../components/Common/AdminRoute";

// Public pages
const Home        = lazy(() => import("../pages/Home/Home"));
const About       = lazy(() => import("../pages/About/About"));
const Services    = lazy(() => import("../pages/Services/Services"));
const ServiceDetail = lazy(() => import("../pages/Services/ServiceDetail"));
const Solutions   = lazy(() => import("../pages/Solutions/Solutions"));
const SolutionDetail = lazy(() => import("../pages/Solutions/SolutionDetail"));
const Partners    = lazy(() => import("../pages/Partners/Partners"));
const Contact     = lazy(() => import("../pages/Contact/Contact"));
const Login       = lazy(() => import("../pages/Login/Login"));
const Register    = lazy(() => import("../pages/Register/Register"));
const Privacy     = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const Terms       = lazy(() => import("../pages/Terms/Terms"));
const NotFound    = lazy(() => import("../pages/NotFound/NotFound"));

// Admin pages
const Dashboard         = lazy(() => import("../pages/Admin/Dashboard"));
const ManageServices    = lazy(() => import("../pages/Admin/ManageServices"));
const ManagePartners    = lazy(() => import("../pages/Admin/ManagePartners"));
const ManageTestimonials = lazy(() => import("../pages/Admin/ManageTestimonials"));
const ManageContacts    = lazy(() => import("../pages/Admin/ManageContacts"));
const ManageSolutions   = lazy(() => import("../pages/Admin/ManageSolutions"));
const SiteSettings      = lazy(() => import("../pages/Admin/SiteSettings"));

const AppRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {/* Auth pages - no layout */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index                   element={<Dashboard />} />
        <Route path="services"         element={<ManageServices />} />
        <Route path="partners"         element={<ManagePartners />} />
        <Route path="testimonials"     element={<ManageTestimonials />} />
        <Route path="contacts"         element={<ManageContacts />} />
        <Route path="solutions"        element={<ManageSolutions />} />
        <Route path="settings"         element={<SiteSettings />} />
      </Route>

      {/* Main layout pages */}
      <Route element={<MainLayout />}>
        <Route index         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetail />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/:solutionId" element={<SolutionDetail />} />
        <Route path="/partners"  element={<Partners />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="/privacy"   element={<Privacy />} />
        <Route path="/terms"     element={<Terms />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
