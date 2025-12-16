# 🚀 AI-Powered Resume Builder

A full-stack MERN application for creating professional, ATS-optimized resumes with AI assistance. Build, customize, and analyze your resume with multiple templates and real-time preview.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-green)
![AI](https://img.shields.io/badge/AI-OpenAI-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **🎨 Multiple Templates** - Choose from 4 professional resume designs
- **🤖 AI Enhancement** - Improve professional summaries and job descriptions with AI
- **📊 ATS Checker** - Analyze resume compatibility with job descriptions
- **📤 PDF Upload** - Import existing resumes and extract data automatically
- **🖼️ Image Upload** - Add profile photos with background removal
- **🎨 Customization** - Change colors and templates in real-time
- **👁️ Public Sharing** - Share resumes via public links
- **💾 Auto-Save** - Changes saved automatically
- **🔐 Secure Auth** - JWT-based authentication with bcrypt

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **Redux Toolkit** for state management
- **TailwindCSS 4** for styling
- **React Router v7** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express 5
- **MongoDB** with Mongoose
- **OpenAI API** (Gemini) for AI features
- **ImageKit** for image hosting
- **JWT** for authentication
- **Multer** for file uploads

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key (or Gemini API key)
- ImageKit account (for image uploads)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url
PORT=5000
```

Start backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

Visit `http://localhost:5173`

## 📁 Project Structure

```
resume-builder/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   └── pages/
├── backend/           # Node.js backend
│   ├── models/
│   ├── routes/
│   └── middleware/
```

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Built with ❤️ by Sangamesh8892