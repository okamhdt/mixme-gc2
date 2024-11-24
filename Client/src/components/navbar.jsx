import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IonIcon } from '@ionic/react';
import { logoWhatsapp } from 'ionicons/icons';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-[#8B0000]/90 backdrop-blur-md shadow-lg" : "bg-[#8B0000]"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <motion.h1 
                        className="text-2xl font-bold text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        MixMe
                    </motion.h1>

                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            {["Our Story", "Menu", "Experience"].map((item) => (
                                <motion.li 
                                    key={item}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="cursor-pointer relative group"
                                >
                                    <span className="text-white hover:text-gray-200">
                                        {item}
                                    </span>
                                    <motion.div 
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full"
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.li>
                            ))}
                        </ul>
                    </nav>

                    <motion.a 
                        href="https://wa.me/6282231466314?text=Halo,%20ada%20yang%20bisa%20dibantu?%20atau%20mau%20booking%20meja?" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button className="bg-white text-[#8B0000] px-6 py-2 rounded-full hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2">
                            <IonIcon icon={logoWhatsapp} className="text-xl" />
                            Reservation
                        </button>
                    </motion.a>
                </div>
            </div>
        </motion.header>
    );
}