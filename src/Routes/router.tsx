import { Routes, Route } from "react-router-dom"

import { Home } from "../pages/Home"
import { NewRoom } from "../pages/NewRoom"

export const Router = () => {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/rooms/new" element={<NewRoom />} />
    </Routes>
  )
}