import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {
  console.log('localStorage.getItem("token")',localStorage.getItem("token"))
  return (
    <CContainer xxl>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    localStorage.getItem("token") != null||localStorage.getItem("token") != undefined ? (
                      <route.element />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                  //  element={<route.element />}
                  
                />
              )
            )
          })}
          {/* <Route path="/" element={<Navigate to="dashboard" replace />} /> */}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
