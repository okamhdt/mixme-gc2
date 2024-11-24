import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthForm from '../../components/Form'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function EditCategory() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [initialData, setInitialData] = useState(null)

    useEffect(() => {
        fetchCategory()
    }, [])

    async function fetchCategory() {
        try {
            const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setInitialData(data.data)
        } catch (error) {
            console.error('Fetch error:', error)
            Swal.fire('Error!', 'Gagal ambil data category 😭', 'error')
            navigate('/')
        }
    }

    async function handleSubmit(formData) {
        setError('')
        try {
            setIsLoading(true)
            await axios.put(`https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories/${id}`, {
                name: formData.name
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            
            Swal.fire('Sukses!', 'Category berhasil diupdate!', 'success')
            navigate('/category')
            
        } catch (error) {
            setError(error.response?.data?.message || 'Ada error nih, coba lagi!')
            console.error('Edit category error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!initialData) return null

    return (
        <AuthForm 
            title="Edit Category" 
            subtitle="Update kategori yg udh ada"
            fields={[
                { label: 'Nama', name: 'name', type: 'text', defaultValue: initialData.name }
            ]}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
        />
    )
}