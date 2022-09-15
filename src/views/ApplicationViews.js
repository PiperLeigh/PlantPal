import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PlantList } from "../components/plant/PlantList"
import { SwapList } from "../components/swap/SwapList"
import { PalList } from "../components/pal/PalList"
import { PlantForm } from "../components/plant/PlantForm"

export const ApplicationViews = () => {
    return <>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized/>}>
            <Route path="/plantList" element={<PlantList />} />
            <Route path="/plantForm" element={<PlantForm />} />
            <Route path="/swapList" element={<SwapList />} />
            <Route path="/palList" element={<PalList />} />
        </Route>
    </Routes>
    </>
}