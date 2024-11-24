import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/Form'
import axios from 'axios'

export default function AddCuisine() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetchCategories()
    }, [])

    async function fetchCategories() {
        try {
            const { data } = await axios.get('https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories', {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setCategories(data.data || [])
        } catch (error) {
            console.error('Fetch categories error:', error)
            setCategories([])
        }
    }

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
                { 
                    label: 'Category', 
                    name: 'categoryId', 
                    type: 'select',
                    options: categories.map(cat => ({
                        label: cat.name,
                        value: cat.id
                    }))
                }
            ]}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
        />
    )
}
