import { createContext, useEffect, useState } from "react"
import app from "./firebase"

export const UserContext = createContext()

export function UserProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(``)
  const values = {
    isLoggedIn,
    setIsLoggedIn,
  }

  //   useEffect(() => {
  //     app.auth().onAuthStateChanged(setCurrentUser)
  //   }, [])

  // provider is the component to be provdided to the "tree". We will wrap it around <App /> for this exercise
  return (
    <UserContext.Provider value={values}>
      {/* Now the whole App tree has values*/}
      {props.children}
    </UserContext.Provider>
  )
}
