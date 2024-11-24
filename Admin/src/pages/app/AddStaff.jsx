import AuthForm from '../../components/Form'
import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function AddStaff() {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData) {
        try {
            setIsLoading(true)
            await axios.post('https://h8-phase2-gc.vercel.app/apis/add-user', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                address: formData.address
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            Swal.fire({
                icon: 'success',
                title: 'Staff berhasil ditambahkan!',
                text: 'Staff baru sudah bisa login',
                timer: 1500
            })
            
        } catch (error) {
            setError(error.response?.data?.message || 'error, coba lagi!')
            console.error('Add staff error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthForm 
            title="Add Staff"
            subtitle="Tambahkan staff baru"
            fields={[
                {
                    label: 'Username',
                    type: 'text',
                    name: 'username'
                },
                {
                    label: 'Email',
                    type: 'email',
                    name: 'email'
                },
                {
                    label: 'Password',
                    type: 'password',
                    name: 'password'
                },
                {
                    label: 'Phone Number',
                    type: 'text',
                    name: 'phoneNumber'
                },
                {
                    label: 'Address',
                    type: 'text',
                    name: 'address'
                }
            ]}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
        />
    )
}
