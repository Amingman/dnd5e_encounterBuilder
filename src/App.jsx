import { useContext, useState } from "react"
import "./App.css"
import HomePage from "./pages/HomePage"
import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import { createTheme, ThemeProvider } from "@mui/material"
import { purple } from "@mui/material/colors"
import SearchPage from "./pages/SearchPage"
import LoginPage from "./pages/LoginPage"
import { UserContext } from "./UserContext"
import EncounterDay from "./components/EncounterDay"

const theme = createTheme({
  palette: {
    primary: {
      light: "#E0EFDF",
      main: "#4EAD89",
      dark: "#003319",
      contrastText: "#003319",
      // light: "#E0EFDF",
      // main: "#4EAD89",
      // dark: "#003319",
      // contrastText: "#0065D2",
    },
    secondary: {
      light: "#E0EFDF",
      main: "#003319",
      dark: "#003319",
      contrastText: "#e0efdf",
    },
    dark: purple,
  },
  typography: {},
})

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
  const palletes = {
    main: `#4EAD89`,
    mainBold: `#003319`,
    callToAction: `#0065D2`,
    bg: `#DEB887`,
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        {/* <LoginPage /> */}
        {/* <HomePage /> */}
        {/* <MainPage /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mycampaign" element={<LoginPage />} />
          <Route path="/myencounters" element={<LoginPage />} />
          <Route path="/browsemonsters" element={<SearchPage />} />
        </Routes>
        <EncounterDay />
      </ThemeProvider>
    </>
  )
}

export default App
