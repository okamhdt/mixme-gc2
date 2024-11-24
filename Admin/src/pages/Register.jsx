import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/Form'

export default function Register() {
    const navigate = useNavigate()

    async function handleSubmit(e, email, password, firstName, lastName, confirmPassword) {
        e.preventDefault()
        console.log({ email, password, firstName, lastName, confirmPassword })
        navigate('/')
    }

    return (
        <AuthForm 
            title="Register"
            subtitle="Register akun anda"
            handleSubmit={handleSubmit}
            fields={[
                {
                    label: 'First Name',
                    type: 'text'
                },
                {
                    label: 'Last Name',
                    type: 'text'
                },
                {
                    label: 'Email',
                    type: 'text'
                },
                {
                    label: 'Password',
                    type: 'password'
                },
                {
                    label: 'Confirm Password',
                    type: 'password'
                }
            ]}
        />
    )
}