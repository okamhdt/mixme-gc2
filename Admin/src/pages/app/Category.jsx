import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Category() {
    const [searchParams] = useSearchParams()
    const [categories, setCategories] = useState([])

    async function fetchCategories() {
        try {
            const { data } = await axios.get('https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories', { 
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setCategories(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    async function handleDelete(id) {
        try {
            const result = await Swal.fire({
                title: 'Yakin mau hapus?',
                text: "Ntar nyesel loh klo ud kehapus",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Batal'
            })

            if (!result.isConfirmed) return

            await axios.delete(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            await fetchCategories()
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Category-nya berhasil dihapus!',
                timer: 1500,
                showConfirmButton: false
            })
            
        } catch (error) {
            console.error('Gagal hapus category:', error)
            
            Swal.fire({
                icon: 'error',
                title: 'Waduh!',
                text: 'Gabisa dihapus nih, category masih dipake di menu! 😅'
            })
        }
    }

    const filteredCategories = categories.filter(category => {
        const search = searchParams.get('search')?.toLowerCase()
        if (!search) return true
        return category.name.toLowerCase().includes(search)
    })

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Category List</h1>
                <Link to="/add-category" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                    Add New Category
                </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <table className="min-w-full">
                    <thead>
                        <tr className="text-white border-b border-white/20">
                            <th className="py-3 text-left">Name</th>
                            <th className="py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map((category) => (
                            <tr key={category.id} className="text-white border-b border-white/10">
                                <td className="py-4">{category.name}</td>
                                <td className="py-4 space-x-2">
                                    <Link 
                                        to={`/edit-category/${category.id}`}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(category.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}