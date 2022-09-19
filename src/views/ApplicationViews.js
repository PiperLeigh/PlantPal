import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PlantList } from "../components/plant/PlantList"
import { SwapList } from "../components/swap/SwapList"
import { PalList } from "../components/pal/PalList"
import { PlantForm } from "../components/plant/PlantForm"
import { SwapForm } from "../components/swap/SwapForm"
import { UpdatePalProfile } from "../components/pal/Profile"
import { UpdatePlantDetail } from "../components/plant/UpdatePlantDetail"
import { UpdateSwapDetail } from "../components/swap/UpdateSwapDetail"

export const ApplicationViews = () => {
    return <>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized/>}>
            <Route path="/plantList" element={<PlantList />} />
            <Route path="/plantForm" element={<PlantForm />} />
            <Route path="/plantList/:plantId/update" element={<UpdatePlantDetail />} />
            <Route path="/swapList" element={<SwapList />} />
            <Route path="/swapForm" element={<SwapForm />} />
            <Route path="/swapList/:swapId/update" element={<UpdateSwapDetail />} />
            <Route path="/palList" element={<PalList />} />
            <Route path="/palUserProfile" element={<UpdatePalProfile />} />
        </Route>
    </Routes>
    </>
}