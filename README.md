# 🏋️‍♂️ MuscleNook - Professional Fitness Platform

A modern, AI-powered fitness web application designed to transform your fitness journey with personalized workouts, comprehensive nutrition tracking, and professional progress analytics.

![MuscleNook Banner](https://img.shields.io/badge/MuscleNook-Professional%20Fitness%20Platform-blue?style=for-the-badge&logo=fitness)

## ✨ Features

### 🧠 **AI-Powered Intelligence**
- **Smart Workout Recommendations** - Personalized exercise suggestions based on your goals
- **Progress Analytics** - Advanced tracking with visual insights and trends
- **Adaptive Training Plans** - Workouts that evolve with your fitness level

### 📱 **Modern User Experience**
- **Responsive Design** - Seamless experience across all devices
- **Professional UI/UX** - Clean, modern interface with smooth animations
- **Intuitive Navigation** - Easy-to-use interface for all fitness levels

### 🏃‍♂️ **Comprehensive Fitness Tools**
- **Exercise Database** - Extensive library of exercises with detailed instructions
- **Workout Planning** - Custom workout creation and scheduling
- **Body Part Targeting** - Focus on specific muscle groups
- **Equipment Integration** - Workouts for gym and home environments

### 🍎 **Nutrition & Wellness**
- **Nutrition Checker** - Analyze your meals and get recommendations
- **BMR Calculator** - Calculate your daily caloric needs
- **Meal Planning** - Smart meal suggestions and tracking
- **Water Intake Monitoring** - Hydration tracking and reminders

### 📊 **Progress Tracking**
- **Performance Metrics** - Track strength, endurance, and body composition
- **Visual Analytics** - Charts and graphs for progress visualization
- **Goal Setting** - Set and monitor fitness objectives
- **Achievement System** - Celebrate milestones and accomplishments

## 🛠️ Tech Stack

### **Frontend**
- **React.js 18** - Modern React with hooks and functional components
- **Material-UI (MUI)** - Professional component library
- **React Bootstrap** - Responsive UI components
- **Redux Toolkit** - State management
- **React Router** - Client-side routing

### **Backend**
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication and authorization

### **Styling & Design**
- **CSS3** - Modern CSS with custom properties
- **Google Fonts** - Professional typography (Inter, Poppins)
- **Responsive Design** - Mobile-first approach
- **CSS Animations** - Smooth transitions and micro-interactions

### **Deployment**
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **GitHub** - Version control and collaboration

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/musclenook.git
cd musclenook
```

### 2. Environment Setup
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5123
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

### 3. Install Dependencies
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 4. Run the Application
```bash
# Option 1: Run both together (Recommended)
cd backend
npm run dev

# Option 2: Run separately
# Terminal 1 - Backend
cd backend
npm run server

# Terminal 2 - Frontend
cd frontend
npm start
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5123

## 📁 Project Structure

```
MuscleNook/
├── backend/                 # Backend server
│   ├── api/                # API endpoints
│   ├── config/             # Database and app configuration
│   ├── controllers/        # Business logic controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── slices/         # Redux state management
│   │   ├── assets/         # Images, icons, and styles
│   │   └── utils/          # Frontend utilities
│   └── public/             # Static assets
└── docs/                   # Documentation
```

## 🎯 Available Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run server     # Start development server with nodemon
npm run dev        # Start both backend and frontend concurrently
npm test           # Run test suite
```

### Frontend Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 🔧 Configuration

### Database Configuration
The application uses MongoDB with Mongoose ODM. Configure your database connection in `backend/config/db.js`.

### Authentication
JWT-based authentication system with secure token management and user sessions.

### Environment Variables
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5123)
- `NODE_ENV`: Environment mode
- `JWT_SECRET`: Secret key for JWT tokens

## 📱 Responsive Design

MuscleNook is built with a mobile-first approach, ensuring optimal user experience across all devices:
- **Desktop**: Full-featured interface with advanced navigation
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with simplified navigation

## 🎨 Design System

### Color Palette
- **Primary**: #00d4ff (Cyan Blue)
- **Secondary**: #0099cc (Dark Blue)
- **Accent**: #1e3c72 (Navy Blue)
- **Background**: Linear gradients with professional tones
- **Text**: High contrast for accessibility

### Typography
- **Headings**: Poppins (Bold, Professional)
- **Body**: Inter (Clean, Readable)
- **Hierarchy**: Clear visual hierarchy for better UX

### Components
- **Cards**: Glassmorphism design with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with smooth transitions

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Render)
1. Connect your GitHub repository to Render
2. Configure environment variables
3. Deploy automatically on push to main branch

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Lead Developer**: Pawan Yaduveer  
**GitHub**: [Pawan-Yaduveer](https://github.com/Pawan-Yaduveer)

## 🙏 Acknowledgments

- **Material-UI** for professional component library
- **React Bootstrap** for responsive components
- **MongoDB** for robust database solution
- **Fitness enthusiasts** for inspiration and feedback

## 📞 Support

- **Email**: support@musclenook.com
- **Documentation**: [docs.musclenook.com](https://docs.musclenook.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/musclenook/issues)

---

<div align="center">
  <p>Made with ❤️ for the fitness community</p>
  <p>Transform your fitness journey with <strong>MuscleNook</strong></p>
</div>

