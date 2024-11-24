import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../../components/Form'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function AddCategory() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData) {
        setError('')
        try {
            setIsLoading(true)
            await axios.post('https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories', {
                name: formData.name
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            
            Swal.fire('Sukses!', 'Category baru berhasil ditambah!', 'success')
            navigate('/category')
            
        } catch (error) {
            setError(error.response?.data?.message || 'Ada error nih, coba lagi!')
            console.error('Add category error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthForm 
            title="Add Category" 
            subtitle="Tambah category baru"
            fields={[
                { label: 'Nama', name: 'name', type: 'text' }
            ]}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
        />
    )
}
