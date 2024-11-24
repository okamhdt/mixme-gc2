import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/Form'
import axios from 'axios'

export default function AddCuisine() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData) {
        setError('')
        try {
            setIsLoading(true)
            await axios.post('https://h8-phase2-gc.vercel.app/apis/restaurant-app/cuisines', {
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
            
            navigate('/')
            
        } catch (error) {
            setError(error.response?.data?.message || 'Ada error nih, coba lagi!')
            console.error('Add cuisine error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthForm 
            title="Add Cuisine" 
            subtitle="Tambah menu baru"
            fields={[
                { label: 'Nama', name: 'name', type: 'text' },
                { label: 'Deskripsi', name: 'description', type: 'text' },
                { label: 'Harga', name: 'price', type: 'number' },
                { label: 'URL Gambar', name: 'imgUrl', type: 'text' },
                { label: 'Category ID', name: 'categoryId', type: 'number' }
            ]}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
        />
    )
}
