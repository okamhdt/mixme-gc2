import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

    const handleInputChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)
        
        if (!value) {
            setSearchParams({})
        } else {
            setSearchParams({ search: value })
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <nav className="fixed w-full bg-white/10 backdrop-blur-lg shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-white font-bold text-xl">
                            WarmPlate CMS 🍽️
                        </Link>
                        
                        <div className="flex space-x-4">
                            <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md">
                                Cuisine
                            </Link>
                            <Link to="/category" className="text-white hover:text-gray-300 px-3 py-2 rounded-md">
                                Category
                            </Link>
                            <Link to="/add-staff" className="text-white hover:text-gray-300 px-3 py-2 rounded-md">
                                Staff
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search..."
                                className="bg-white/20 text-white placeholder-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            {searchQuery && (
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery('')
                                        setSearchParams({})
                                    }}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                                >
                                    ✕
                                </button>
                            )}
                        </form>

                        <button onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}