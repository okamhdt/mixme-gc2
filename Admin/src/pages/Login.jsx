import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/Form'
import axios from 'axios'

export default function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData) {
        setError('')
        
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://h8-phase2-gc.vercel.app/apis/login', {
                email: formData.email,
                password: formData.password
            })
            
            localStorage.setItem('access_token', data.data.access_token)
            navigate('/')
            
        } catch (error) {
            setError(error.response?.data?.message || 'Terjadi kesalahan, coba lagi!')
            console.error('Login error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthForm 
            title="Login" 
            subtitle="Masuk ke akun kamu"
            fields={[
                { label: 'Email', type: 'email', name: 'email' },
                { label: 'Password', type: 'password', name: 'password' }
            ]}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
        />
    )
}