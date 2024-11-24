# Catatan Week 2

> Tuliskan apapun yang kalian pelajari pada phase 2 week-2 di file ini.

> layouting dasar

1. Alignment Horizontal:
* Alignment horizontal mengatur bagaimana elemen-elemen diselaraskan sepanjang lebar (kiri ke kanan) container.
* Beberapa cara umum untuk mengatur alignment horizontal adalah:
    * Left alignment (rata kiri): Elemen-elemen ditempatkan di sisi kiri container.
    * Center alignment (rata tengah): Elemen-elemen ditempatkan di tengah secara horizontal dalam container.
    * Right alignment (rata kanan): Elemen-elemen ditempatkan di sisi kanan container.
    * Justify: Ruang antara elemen dibagi rata sehingga elemen-elemen tersebar dengan jarak yang sama sepanjang container.
Dalam Flexbox:
* Gunakan properti justify-content untuk mengatur alignment horizontal:
    * justify-content: flex-start: Elemen ditempatkan di sisi kiri.
    * justify-content: center: Elemen ditempatkan di tengah.
    * justify-content: flex-end: Elemen ditempatkan di sisi kanan.
    * justify-content: space-between: Elemen ditempatkan dengan jarak yang sama di antara mereka.
    * justify-content: space-around: Ada jarak yang sama di sekitar setiap elemen.
2. Alignment Vertikal:
* Alignment vertikal mengatur bagaimana elemen-elemen diselaraskan sepanjang tinggi (atas ke bawah) container.
* Beberapa cara umum untuk mengatur alignment vertikal adalah:
    * Top alignment (rata atas): Elemen-elemen ditempatkan di bagian atas container.
    * Middle alignment (rata tengah): Elemen-elemen ditempatkan di tengah secara vertikal dalam container.
    * Bottom alignment (rata bawah): Elemen-elemen ditempatkan di bagian bawah container.
Dalam Flexbox:
* Gunakan properti align-items atau align-self untuk mengatur alignment vertikal:
    * align-items: flex-start: Elemen-elemen ditempatkan di bagian atas.
    * align-items: center: Elemen-elemen ditempatkan di tengah secara vertikal.
    * align-items: flex-end: Elemen-elemen ditempatkan di bagian bawah.

grid
Header akan menempati seluruh baris pertama.
Sidebar akan menempati bagian kiri baris kedua.
Konten akan menempati dua kolom lainnya di baris kedua.
Footer akan menempati seluruh baris ketiga.


> library dan framework apa bedanya?
    > library adalah kumpulan fungsi dan modul yang dapat digunakan untuk membantu dalam pengembangan aplikasi.
    > framework adalah kumpulan library dan aturan yang sudah ditentukan, yang membantu dalam pengembangan aplikasi.

> jsx adalah syntax extension untuk javascript..
    > jsx adalah syntax extension untuk javascript yang memungkinkan kita untuk menulis html di dalam javascript.

> npm create vite@latest Client 
    > pilih react > javascript
    > cd Client
    > npm install
    > npm run dev

> membungkus sesuatu tanpa style pakai fregment <></>
> Hapus seluruh code yang ada di dalam file src/index.css (file jangan dihapus, akan digunakan ketika mau install framework CSS tailwind etc)
> Hapus seluruh code yang ada di dalam function App dan seluruh import yg tidak digunakan
> dari html ke jsx gunakan transformasi jsx
> import useState dari react > import useState from 'react'
> useState sebuah function yg membantu komponen react.
>  di dalam function const nya pakai array ada getter dan setter yg disebut state variable >> [ email, setEmail ]= useState("") bisa diganti sesuai keinginan contoh buat password [ password, setPassword ]= useState("")
> cara pakai nya didalam return nya <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
> kalau mau lihat error klik kanan dan inspect > console
> conditional rendering adalah kondisi tertentu yang mempengaruhi tampilan komponen.
> menambahkan event onClick={} pada button untuk pindah halaman
> ambil data dummy untuk product (product.json)
> Membuat "data" reaktif (state) untuk data Product
> cara looping didalam jsx pakai map untuk membuat banyak kartu sesuai banyaknya data dan kalau map pasti ada return untuk merubah hal baru 
	> {product.map((product)) => {
		return ( … )
	    }}
	> bikin function baru tdk bisa, dan mendiclare sesuatu gabisa di function component

> bedanya export default function dan export function adalah export default function bisa langsung dipanggil tanpa nama functionnya sedangkan export function harus dipanggil dengan nama functionnya
> lebih baik pakai export default function

> props adalah parameter yang diterima oleh component
    > cara pakai props <Component props={} />
    > syntax && adalah operator logika yang digunakan untuk mengevaluasi ekspresi dan menghasilkan nilai boolean.
    > page === 'login' && <LoginPage />
    
> React Hooks
React hooks adalah fungsi yang memungkinkan kamu menggunakan fitur state dan lifecycle di dalam komponen fungsional, tanpa harus menggunakan komponen kelas.

> useState
	const [nilaiState, setNilaiState] = useState(nilaiAwal);
* nilaiState: variabel yang menyimpan data state saat ini.
* setNilaiState: fungsi yang digunakan untuk memperbarui nilai state.
* useState(nilaiAwal): fungsi yang memerlukan nilai awal sebagai parameter. Nilai ini adalah state awal ketika komponen pertama kali dirender.

import { useState } from 'react'

function Contoh() {
  // Deklarasi state "count" dan fungsinya untuk memperbarui, dengan nilai awal 0
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Kamu telah mengklik sebanyak {count} kali</p>
      <button onClick={() => setCount(count + 1)}>
        Klik untuk menambah
      </button>
    </div>
  )
}
* Pada contoh di atas, useState(0) membuat state count dengan nilai awal 0.
* setCount digunakan untuk memperbarui nilai count. Setiap kali tombol diklik, nilai count akan bertambah 1.
* Ketika setCount dipanggil, komponen akan dirender ulang untuk menampilkan nilai terbaru dari count.


> useEffect 
dengan arr dependensi 
useEffect(() => {
  // kode yang akan dieksekusi
  return () => {
    // kode cleanup (opsional), untuk membersihkan efek samping
console.log(“side effect / watchers to state”
  }
}, [dependensi])

biasanya digunakan untuk memantau yg kita pasang contoh diatas count, atau seperti waktu kita masukkan password cuma 5 dibilang kurang kuat padahal kita belum enter .. 

> Effect
useEffect(() => {
  // ini akan dijalankan setiap re-render
})

> Mounted
useEffect(() => {
  // ini akan dijalankan saat component dirender pertama kali
}, [])

> Update 
useEffect(() => {
  // ini akan dijalankan bila ada perubahan pada dependencies
}, [count]) // ini adalah list dependecies yang akan di-watch

>Unmiunted 
useEffect(() => {
  return () => {
    // ini akan dijalankan saat component unmount
    // biasanya digunakan untuk clean up atau mematikan fitur 
  }
}, [])


* siapkan state data dan loading
* siapkan function untuk fetch data menggunakan axios
* gunakan useEffect mounted untuk melakukan fetch data saat awal component di-render
* set loading menjadi true
* get data menggunakan axios
* set data menggunakan data yang didapat dari axios
* finally set loading menjadi false
* gunakan conditional rendering untuk loading
* data siap digunakan
Login

* siapkan state untuk menampung inputan
* siapkan function untuk mengambil value dari input
* lakukan validasi inputan
* bila lolos validasi lakukan langkah selanjutnya
* siapkan function untuk handle submit form axios post
* pindah ke halaman home
Add Data (with authentication)

* siapkan beberapa state untuk menyimpan perubahan input form
* gunakan setter di event on change per input dalam formnya, value yang digunakan untuk setter berasal dari event.target.value, agar perubahan input dapat diterima
* siapkan function untuk menambahkan data ke dalam database , jangan lupa pasang tokennya di headers
* siapkan function untuk memanggil entitas support
* gunakan useEffect mounted untuk melakukan fetch data entitas support saat awal component di-render
* pasang function untuk menambahkan data di onSubmit formnya

> jangan matikan strictmode 
> kalau err pakai server sendiri instal dulu cors..
> set loading pakek useState = setLoading(false) dia bolean false dan di funtionnya true = setLoading(true)
> dan manfaatkan conditional rendering untuk loading pakai ternary operator 

> handlelogin 
  > import axios 
  > buat async function handleLogin
  > buat try catch
  > axios post ke endpoint login
  > simpan token ke local storage
  > simpan response ke variable
  > console log response
  > return response

> e.preventDefault() supaya tidak refresh / reload
> munculin gagal tidak boleh pakai alert.. gunakan aja notifikasi ui package javascript cari di google / pakai aja toastifyjs
    > install toastifyjs
    > import toastify
    > import toastify css di main.jsx
    > toastify("pesan")
    > set dia di bottom right
    > text nya error.response.data.error
    > style nya baground warna merah


> react router dom
    > npm install react-router-dom
    > buat folder router isi dengan file index.jsx
    > import { createBrowserRouter } from 'react-router-dom'
    > buat router dengan createBrowserRouter
    > export const router = createBrowserRouter([
        {
            path: "/", 
            element: <div>Home</div> 
        }
    ])
    > di app.jsx import router
    > import { RouterProvider } from "react-router-dom";
    > <RouterProvider router={router} />
    > buat function app() return <RouterProvider router={router} />
    > di index.jsx render <App />

> cara melindungi applikasi kita > loader
    > import { redirect } from 'react-router-dom'
    > loader: async () => {
        const token = localStorage.getItem('access_token')
        if (!token) {
            return redirect('/login')
        }
        return null
    }


> jangan lupa pasang loader
> cara deploy pakai vercel 
    > buat repository di github baru 
    > copast
    > focus ke root directory dan pilih


> "Pemahaman yang baik berasal dari keinginan untuk terus belajar, dan catatan adalah langkah pertama menuju pengetahuan yang dalam."
