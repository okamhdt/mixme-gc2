export default function MenuCard({ item }) {
    return (
        <div className="bg-transparent p-4 text-center h-[450px] transition-all duration-300 
            hover:scale-105 rounded-xl my-4">
            <div className="relative w-64 h-64 mx-auto mb-4">
                <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2 h-[40px]">
                {item.description}
            </p>
            <div className="flex flex-col items-center gap-3">
                <div>
                    <p className="text-yellow-400 font-bold text-xl">
                        Rp {item.price.toLocaleString()}
                    </p>
                </div>
                <button className="bg-[#8B0000] text-white px-6 py-2 rounded-full text-sm font-medium 
                    transition-all duration-300 hover:bg-[#6B0000] hover:scale-105">
                    See Detail
                </button>
            </div>
        </div>
    )
}