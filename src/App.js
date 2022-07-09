import 'regenerator-runtime/runtime'
import React, { useEffect, useState } from 'react'
import './global.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Detail from './pages/Detail'


export default function App() {

  const [displayCreateModal, setDisplayCreateModal] = useState(false)
  const [listRepo, setListRepo] = useState([])

  useEffect(() => {
    window.contract.get_sources({ start: "0", limit: 100 }).then(result => setListRepo(result))
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}