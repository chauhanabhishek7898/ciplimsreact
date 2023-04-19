import React, { Component, Suspense,useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  
  // useEffect(() => {
  //   // define a custom handler function
  //   // for the contextmenu event
  //   const handleContextMenu = (e) => {
  //     // prevent the right-click menu from appearing
  //     e.preventDefault()
  //   }

  //   // attach the event listener to 
  //   // the document object
  //   document.addEventListener("contextmenu", handleContextMenu)

  //   // clean up the event listener when 
  //   // the component unmounts
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu)
  //   }
  // }, [])
    return (
      <HashRouter>
        <Suspense fallback={loading} >
           <Routes>
            <Route path="*" name="Login" element={<Login />} />
            <Route exact path="/login" name="Login" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
          </Routes>
        </Suspense> 

      </HashRouter>
    )
}

export default App
