import { useState } from "react"
import "./App.css"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"
import { createTheme, ThemeProvider } from "@mui/material"
import { purple } from "@mui/material/colors"
import MainPage from "./pages/MainPage"

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
        {/* <HomePage /> */}
        <MainPage />
      </ThemeProvider>
    </>
  )
}

export default App
