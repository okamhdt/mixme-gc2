import { useState } from 'react'
import { motion } from 'framer-motion'
import CategoryFilter from '../components/menu/category'
import SortingMenu from '../components/menu/sorting'
import MenuCard from '../components/menu/card'
import Pagination from '../components/menu/pagination'

export default function Menu() {
    const [currentPage, setCurrentPage] = useState(1)
    const [category, setCategory] = useState('all')
    const [sortBy, setSortBy] = useState('default')

    // Contoh data dummy
    const menuItems = [
        { id: 1, name: 'Nasi Goreng', category: 'main-course', price: 25000, image: '/path/to/image' },
        // ... tambah item lainnya
    ]

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        >
            <div className="flex justify-between items-center mb-8">
                <CategoryFilter 
                    selectedCategory={category} 
                    onCategoryChange={setCategory} 
                />
                <SortingMenu 
                    selectedSort={sortBy} 
                    onSortChange={setSortBy} 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.map(item => (
                    <MenuCard key={item.id} item={item} />
                ))}
            </div>

            <Pagination 
                currentPage={currentPage}
                totalPages={10} 
                onPageChange={setCurrentPage}
            />
        </motion.div>
    )
}