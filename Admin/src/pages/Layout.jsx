import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#cc3333] via-[#b32d2d] to-[#992626]">
            <Navbar />
            <div className="pt-20 px-8">
                <Outlet />
            </div>
        </div>
    )
}