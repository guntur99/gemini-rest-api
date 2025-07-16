# 🔮 Gemini REST API (Node.js + Gemini AI 2.5 Flash)

Gemini REST API adalah layanan berbasis Node.js yang memanfaatkan kekuatan **Gemini AI 2.5 Flash** dari Google untuk menyediakan berbagai fitur AI generatif dalam bentuk RESTful API. Project ini dibuat untuk memudahkan integrasi teknologi AI ke dalam berbagai aplikasi melalui antarmuka HTTP sederhana.

## ✨ Fitur Utama

- **Text ➜ Text**  
  Kirim teks dan dapatkan respons cerdas dari Gemini AI (mirip seperti ChatGPT).

- **File (PDF, Image, dll) ➜ Text**  
  Upload file seperti PDF, DOCX, atau gambar (PNG, JPG) dan ekstrak isi teksnya menggunakan kemampuan multimodal Gemini.

- **Audio ➜ Text (Speech-to-Text)**  
  Kirim file audio (MP3, WAV, dsb) dan konversi otomatis menjadi teks menggunakan kemampuan transkripsi Gemini.

---

## 🚀 Teknologi yang Digunakan

- **Node.js (Express)** - Backend framework
- **Gemini AI 2.5 Flash** - Model AI dari Google untuk teks, multimodal, dan audio
- **Multer** - Middleware untuk upload file
- **dotenv** - Konfigurasi environment
- **Postman Documentation**: [View on Postman →](https://documenter.getpostman.com/view/36920255/2sB34ijeRF)

---

## 🔧 Instalasi & Setup

```bash
# 1. Clone repo
git clone https://github.com/username/gemini-rest-api.git
cd gemini-rest-api

# 2. Install dependencies
npm install
or
npm install express dotenv @google/generative-ai multer

# 3. Buat file .env
touch .env
