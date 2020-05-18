import React from "react";
import AppContextProvider from "./contexts/AppContext";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

function App() {
  return (
    <div id="wrapper">
      <AppContextProvider>
        <Sidebar />
      </AppContextProvider>
    </div>
  );
}

export default App;
