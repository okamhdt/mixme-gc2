import { motion } from 'framer-motion'

export default function OurStory() {
    return (
        <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <h2 className="text-7xl font-bold text-[#8B0000]">
                            OUR<br/>STORY
                        </h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                MixMe pertama kali dibuka oleh Karisha Oka, seorang yg berasal dari Surabaya yg memiliki kecintaan terhadap kuliner dan terinspirasi utk memulai perjalanan kulinernya pada 11 Oktober 2024. MixMe Kwetiau telah menjadi salah satu hidangan spesial kami.
                            </p>
                            <p>
                                Kami memulai dgn memilih (hand-picked) bahan berkualitas premium terbaik, dimarinasi dgn bumbu rahasia turun temurun, dimasak dgn teknik khusus MixMe kemudian disajikan dgn cita rasa yg sempurna.
                            </p>
                            <p>
                                MixMe berkomitmen utk menyajikan makanan yg luar biasa utk kmu dan keluarga. Resep MixMe dibuat utk meningkatkan cita rasa alami dari bahan berkualitas yg digunakan. Kami jg baru saja mulai menggunakan rempah-rempah yg ditanam di kebun kami sendiri dgn visi utk memenuhi kebutuhan rempah secara mandiri dari kebun kami.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img 
                            src="https://res.cloudinary.com/dngm0voif/image/upload/v1732271839/wp13371550-italy-food-wallpapers_gs1rmb.jpg" 
                            alt="MixMe Story" 
                            className="rounded-lg shadow-xl w-full h-auto"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}