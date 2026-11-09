# Website Custom Birthday "Tema Blue Navy" (Aesthetic Gift Website)

Website ucapan ulang tahun interaktif estetis berbasis **React + Vite + Tailwind CSS** dengan tema **Blue Navy**, terinspirasi dari video TikTok viral `@yepaauoii`. Dikonfigurasi spesial untuk **Ali Mansur** (14 November 2008) dan dirancang 100% *client-side static* sehingga sangat **ringan, cepat, dan siap langsung di-deploy ke Vercel** tanpa membutuhkan database eksternal seperti Supabase.

---

## ✨ Fitur Unggulan

1. **Full Animasi 7 Slide Estetis:**
   - **Slide 1 - Cover Amplop 3D:** Segel lilin (*wax seal*) berlogo hati dengan denyut "Tap to open". Ketika dibuka, surat keluar dan musik otomatis mulai berputar.
   - **Slide 2 - The Day My Favorite Person Was Born:** Kalender interaktif otomatis menghitung & memberi tanda hati bercahaya di tanggal **14 November 2008**, serta pemutar lagu ala Spotify dengan animasi piringan hitam (*vinyl disc*).
   - **Slide 3 - Scrapbook Kamera & Kue Tiup Lilin:** Frame kamera polaroid berisikan foto kenangan + kue ulang tahun interaktif. Ketuk lilin untuk meniupnya $\rightarrow$ asap lilin padam + letupan konfeti (*confetti blast*) perayaan!
   - **Slide 4 - A Little Letter:** Amplop terbuka dengan surat yang muncul ke atas, ditemani animasi beruang lucu dengan topi pesta dan kotak kado.
   - **Slide 5 - Message for You:** Bingkai estetis bercahaya berisi surat panjang yang menyentuh hati untuk Ali Mansur + animasi mobil vintage.
   - **Slide 6 - One Last Thing:** Bingkai cermin oval klasik (*ornate mirror*) berisi foto istimewa Ali Mansur dan pesan manis penutup.
   - **Slide 7 - You Are My Moon:** Bulan 3D bercahaya di langit berbintang, roket kecil yang meluncur, dan galeri kartu foto Polaroid yang melayang di langit malam (bisa diklik untuk diperbesar/lightbox).
2. **Editor / Kustomisasi Lengkap:**
   - **Pilih Tanggal:** Pemilih tanggal (Hari, Bulan, Tahun) otomatis sinkron ke kalender.
   - **Input Foto:** Upload foto dari laptop/HP atau ganti foto Polaroid, Cermin, dan Scrapbook.
   - **Input Kata-kata:** Kustomisasi nama panggilan, pesan kue, surat cinta, hingga kutipan penutup.
   - **Pilihan Musik:** Pilihan melodi romantis bawaan atau input link lagu MP3 sendiri.
   - **Penyimpanan Lokal:** Perubahan disimpan di browser (`localStorage`) secara aman dan instan tanpa server.
3. **Generator Heart QR Code:**
   - Menghasilkan QR code berbentuk **Hati (Heart)** bernuansa Navy Blue & White persis seperti di video TikTok.
   - Tombol 1-klik unduh gambar PNG resolusi tinggi siap dicetak atau dibagikan via WhatsApp.
4. **100% Static & Super Ringan:**
   - Tidak memerlukan database cloud, token API, atau konfigurasi backend.
   - Loading instan tanpa jeda koneksi jaringan.

---

## 🚀 Cara Menjalankan Secara Lokal

```bash
# 1. Masuk ke direktori proyek
cd /home/yoga/Data/Project/FreeLance

# 2. Jalankan server development
npm run dev
```
Akses di browser: `http://localhost:3000`

---

## 🌐 Cara Deploy ke Vercel (Gratis & Sangat Mudah)

Proyek ini sudah dilengkapi konfigurasi `vercel.json` dan siap di-deploy langsung ke Vercel tanpa perlu mengatur environment variables apa pun.

### Opsi 1: Menggunakan GitHub & Vercel Dashboard (Paling Populer)
1. Buat repository baru di GitHub dan upload folder proyek ini:
   ```bash
   git init
   git add .
   git commit -m "Update birthday website for Ali Mansur - static & lightweight"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com).
3. Klik **Add New** $\rightarrow$ **Project**, lalu pilih repository GitHub Anda.
4. Vercel akan otomatis mendeteksi framework Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Klik **Deploy**! Website langsung online dengan link gratis (contoh: `https://ali-mansur-birthday.vercel.app`).

### Opsi 2: Menggunakan Vercel CLI
```bash
# Install Vercel CLI (jika belum ada)
npm i -g vercel

# Login dan deploy langsung dari terminal
vercel --prod
```
