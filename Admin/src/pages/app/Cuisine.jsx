import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useSearchParams } from 'react-router-dom'

export default function Cuisine() {
    const [searchParams] = useSearchParams()
    const [cuisines, setCuisines] = useState([])
    const [uploadingStates, setUploadingStates] = useState({})

    async function fetchCuisines() {
        try {
            const { data } = await axios.get('https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines', { 
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setCuisines(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCuisines()
    }, [])

    async function handleDelete(id) {
        const result = await Swal.fire({
            title: 'Yakin mau hapus?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Hapus!',
            cancelButtonText: 'Batal'
        })

        if (!result.isConfirmed) return

        try {
            await axios.delete(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
        
            fetchCuisines()
            Swal.fire(
                'Berhasil!',
                'Cuisine berhasil dihapus!',
                'success'
            )
            
        } catch (error) {
            console.log('Gagal hapus cuisine:', error)
            Swal.fire(
                'Waduh Error!',
                'Coba refresh dulu ya!',
                'error'
            )
        }
    }

    async function handleImageUpload(event, cuisineId) {
        const file = event.target.files[0]
        if (!file) return

        try {
            setUploadingStates(prev => ({ ...prev, [cuisineId]: true }))
            const formData = new FormData()
            formData.append('file', file)

            await axios.patch(
                `https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${cuisineId}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.access_token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            await Swal.fire({
                icon: 'success',
                title: '',
                text: 'Gambar berhasil diupdate!'
            })

            fetchCuisines()
        } catch (error) {
            console.log('Gagal upload image:', error)
            Swal.fire({
                icon: 'error',
                title: '',
                text: 'Gagal upload gambar, coba lagi'
            })
        } finally {
            setUploadingStates(prev => ({ ...prev, [cuisineId]: false }))
        }
    }

    const filteredCuisines = cuisines.filter(cuisine => {
        const search = searchParams.get('search')?.toLowerCase()
        if (!search) return true
        return cuisine.name.toLowerCase().includes(search)
    })

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Cuisine List</h1>
                <Link to="/add-cuisine" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                    Add New Cuisine
                </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <table className="min-w-full">
                    <thead>
                        <tr className="text-white border-b border-white/20">
                            <th className="py-3 text-left">Image</th>
                            <th className="py-3 text-left">Name</th>
                            <th className="py-3 text-left">Price</th>
                            <th className="py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCuisines.map((cuisine) => (
                            <tr key={cuisine.id} className="text-white border-b border-white/10">
                                <td className="py-4">
                                    <div className="relative group">
                                        <input 
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, cuisine.id)}
                                            className="hidden"
                                            id={`image-upload-${cuisine.id}`}
                                        />
                                        <label 
                                            htmlFor={`image-upload-${cuisine.id}`}
                                            className="cursor-pointer block relative"
                                        >
                                            <img 
                                                src={cuisine.imgUrl} 
                                                alt={cuisine.name} 
                                                className="w-16 h-16 object-cover rounded-lg transition-all duration-300 
                                                         group-hover:opacity-50"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center 
                                                          opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    strokeWidth={1.5} 
                                                    stroke="currentColor" 
                                                    className="w-6 h-6"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" 
                                                    />
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" 
                                                    />
                                                </svg>
                                            </div>
                                        </label>
                                        {uploadingStates[cuisine.id] && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4">{cuisine.name}</td>
                                <td className="py-4">Rp {cuisine.price.toLocaleString()}</td>
                                <td className="py-4 space-x-2">
                                    <Link 
                                        to={`/edit-cuisine/${cuisine.id}`} 
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(cuisine.id)} 
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