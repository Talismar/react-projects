import { Routes, Route } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import History from './pages/History'
import Home from './pages/Home'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>

      {/* Aplicar esse layout para essas routas que começa com /admin */}
      {/* <Route path="/admin" element={<AdminLatout/>}>

      </Route> */}
    </Routes>
  )
}

export default Router
