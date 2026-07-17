import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import ScrollTop from "./components/Common/ScrollTop";
import ScrollToTop from "./components/Common/ScrollToTop";
import WhatsappButton from "./components/Floating/WhatsappButton";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <AppRoutes />
      <ScrollTop />
      <WhatsappButton />
    </div>
  );
}

export default App;
