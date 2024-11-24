import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthForm from '../../components/Form'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function EditCuisine() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [initialData, setInitialData] = useState(null)

    useEffect(() => {
        fetchCuisine()
    }, [])

    async function fetchCuisine() {
        try {
            const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setInitialData(data.data)
        } catch (error) {
            console.error('Fetch error:', error)
            Swal.fire('Error!', 'Gagal mengambil data cuisine', 'error')
            navigate('/')
        }
    }

    async function handleSubmit(formData) {
        setError('')
        try {
            setIsLoading(true)
            await axios.put(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines/${id}`, {
                name: formData.name,
                description: formData.description,
                price: +formData.price,
                imgUrl: formData.imgUrl,
                categoryId: +formData.categoryId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            
            Swal.fire('Sukses!', 'Cuisine berhasil diupdate!', 'success')
            navigate('/')
            
        } catch (error) {
            setError(error.response?.data?.message || 'error, coba lagi!')
            console.error('Edit cuisine error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!initialData) return null

    return (
        <AuthForm 
            title="Edit Cuisine" 
            subtitle="Update menu yg udh ada"
            fields={[
                { label: 'Nama', name: 'name', type: 'text', defaultValue: initialData.name },
                { label: 'Deskripsi', name: 'description', type: 'text', defaultValue: initialData.description },
                { label: 'Harga', name: 'price', type: 'number', defaultValue: initialData.price },
                { label: 'URL Gambar', name: 'imgUrl', type: 'text', defaultValue: initialData.imgUrl },
                { label: 'Category ID', name: 'categoryId', type: 'number', defaultValue: initialData.categoryId }
            ]}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
        />
    )
}
