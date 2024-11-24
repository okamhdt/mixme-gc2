import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Landing() {
    return (
        <div className="w-screen h-screen">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-screen h-screen"
            >
                <SwiperSlide>
                    <img 
                        loading="lazy"
                        src="https://res.cloudinary.com/dngm0voif/image/upload/v1732272113/wp13947878-disney-food-wallpapers_eomhry.jpg"
                        alt="Disney Food Wallpaper"
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}