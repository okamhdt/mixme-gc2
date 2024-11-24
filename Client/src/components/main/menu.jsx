import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import MenuCard from '../menu/card'
import { BASE_URL } from '../../api'

export default function Menu() {
    const [menuItems, setMenuItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sort, setSort] = useState('ASC')
    const limit = 8

    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${BASE_URL}/categories`)
            setCategories(data.data)
        } catch (err) {
            console.log(err)
        }
    }

    async function fetchMenuItems() {
        try {
            setLoading(true)
            const { data } = await axios.get(
                `${BASE_URL}/cuisines?q=${search}&limit=${limit}&page=${currentPage}&sort=${sort}`
            )
            
            let filteredItems = data.data.query
            if (selectedCategory) {
                filteredItems = data.data.query.filter(
                    item => item.Category.name === selectedCategory
                )
            }
            
            const totalFilteredItems = filteredItems.length
            const calculatedTotalPages = Math.ceil(totalFilteredItems / limit)
            
            const startIndex = (currentPage - 1) * limit
            const endIndex = startIndex + limit
            const paginatedItems = filteredItems.slice(startIndex, endIndex)
            
            setMenuItems(paginatedItems)
            setTotalPages(calculatedTotalPages || 1)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
        fetchMenuItems()
    }, [search, currentPage, selectedCategory, sort])

    const Pagination = () => {
        return (
            <div className="flex justify-center gap-2 mt-8">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50"
                >
                    Prev
                </button>
                
                <div className="flex items-center px-4 text-white">
                    Page {currentPage} of {totalPages}
                </div>

                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        )
    }

    return (
        <section className="min-h-screen py-24 bg-gradient-to-b from-[#8B0000] via-[#800000] to-[#750000]">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {/* Filter & Search Section */}
                <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto mb-16">
                    {/* Search Bar */}
                    <div className="relative group">
                        <input 
                            type="text" 
                            className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-gray-300 
                                     border border-white/20 focus:outline-none focus:border-white/40 transition-all duration-300
                                     group-hover:bg-white/15 shadow-lg shadow-black/5"
                            placeholder="Search our menu..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2">
                            <motion.div 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-5 w-5 opacity-70">
                                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>

                    {/* Filter & Sort Controls */}
                    <div className="flex gap-4">
                        {/* Category Filter */}
                        <motion.select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-md text-white 
                                     border border-white/20 focus:outline-none focus:border-white/40 
                                     transition-all duration-300 hover:bg-white/15 cursor-pointer
                                     shadow-lg shadow-black/5"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <option value="" className="bg-[#8B0000] text-white">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name} className="bg-[#8B0000] text-white">
                                    {category.name}
                                </option>
                            ))}
                        </motion.select>

                        {/* Sort Button */}
                        <motion.button 
                            onClick={() => setSort(prev => prev === 'ASC' ? 'DESC' : 'ASC')}
                            className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white 
                                     border border-white/20 hover:bg-white/20 transition-all duration-300 
                                     flex items-center gap-3 shadow-lg shadow-black/5"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="font-medium">
                                Sort: {sort === 'ASC' ? 'A to Z' : 'Z to A'}
                            </span>
                            <motion.div
                                animate={{ rotate: sort === 'ASC' ? 0 : 180 }}
                                transition={{ duration: 0.3 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            </motion.div>
                        </motion.button>
                    </div>
                </div>

                {/* Title Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        Our Menu
                    </h2>
                    <p className="text-xl text-gray-200">Discover our delicious selections</p>
                </motion.div>

                {/* Menu Items & Pagination */}
                {!loading && (
                    <>
                        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                            {menuItems.map(item => (
                                <motion.div 
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MenuCard item={item} />
                                </motion.div>
                            ))}
                        </main>
                        <Pagination />
                    </>
                )}
            </motion.div>
        </section>
    )
}