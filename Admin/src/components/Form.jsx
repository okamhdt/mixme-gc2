import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function AuthForm({ title, subtitle, fields, handleSubmit, error, isLoading }) {
    const [formData, setFormData] = useState(() => {
        const initialData = {}
        fields.forEach(field => {
            if (field.defaultValue !== undefined) {
                initialData[field.name] = field.defaultValue
            }
        })
        return initialData
    })
    
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        handleSubmit(formData)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#800000] via-[#8B0000] to-[#A52A2A]">
            <div className="max-w-md w-full p-8 backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl">
                <h1 className="text-center text-4xl font-bold text-white mb-2">{title}</h1>
                {subtitle && <p className="text-center text-white/80 mb-6">{subtitle}</p>}
                
                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-white">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    {fields.map((field, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-white/90 mb-1">
                                {field.label}
                            </label>
                            <input 
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleInputChange}
                                placeholder={`Masukkan ${field.label.toLowerCase()}`}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white"
                            />
                        </div>
                    ))}

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-white rounded-xl font-medium text-indigo-600 disabled:opacity-50"
                    >
                        {isLoading ? 'Loading...' : title}
                    </button>
                </form>
            </div>
        </div>
    )
}