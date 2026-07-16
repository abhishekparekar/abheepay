import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import ScrollTop from "./components/Common/ScrollTop";
import WhatsappButton from "./components/Floating/WhatsappButton";

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ScrollTop />
      <WhatsappButton />
    </div>
  );
}

export default App;
