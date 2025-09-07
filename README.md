# Шашлык-Машлык Food Delivery Application

A full-featured food delivery mobile application for the Russian shashlik restaurant "Шашлык-Машлык" (Shashlyk-Mashlyk).

## Project Structure

```
shashlyk-mashlyk-app/
├── mobile/                 # React Native mobile application
│   ├── src/
│   │   ├── screens/        # Application screens
│   │   ├── components/     # Reusable components
│   │   ├── navigation/     # Navigation setup
│   │   └── ...
│   ├── App.js              # Main application file
│   ├── index.html          # Web version of the mobile app
│   └── package.json        # Mobile app dependencies
├── backend/                # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── ...
│   ├── src/server.js       # Main server file
│   ├── src/supabaseClient.js # Supabase client
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies
├── admin-dashboard/        # Admin dashboard
│   ├── index.html          # Main dashboard page
│   └── ...
├── supabase-setup.sql      # SQL script to set up Supabase tables
├── install-dependencies.bat # Script to install all dependencies
├── start-backend.bat       # Script to start backend server
├── start-mobile.bat        # Script to start mobile app
├── test-api.bat            # Script to test API endpoints
├── test-api.js             # API testing script
└── README.md
```

## Features

### Mobile Application
- Beautiful and intuitive interface with Eastern cuisine styling
- Appetizing food photos with hover effects and animations
- Complete ordering flow: menu browsing, cart management, checkout
- Russian payment system integration (Sberbank, Tinkoff, YooMoney)
- Loyalty program with bonuses and personalized offers
- Real-time order tracking from preparation to delivery
- Profile management and order history
- User authentication (registration and login)
- Responsive design for all device sizes
- Smooth animations and transitions
- Premium UI with gold accents and modern styling

### Backend API
- RESTful API for mobile app communication
- Menu management
- Order processing
- User management with registration and login
- Loyalty program tracking
- Supabase integration for authentication and data storage
- Health check endpoint for monitoring

### Admin Dashboard
- Order management
- Menu management
- Analytics dashboard
- User management

## Color Scheme

- Primary: Warm Red (#D32F2F) - Color of fire and appetite
- Secondary: Golden Orange (#FF8F00) - Color of coals
- Accent: Green (#388E3C) - Freshness of vegetables
- Gold: #FFD700 - Premium elements
- Neutral: Dark Gray (#424242), Light Gray (#F5F5F5)
- Background: Cream White (#FAFAFA)

## Technical Stack

### Mobile Application
- React Native (cross-platform iOS & Android)
- React Navigation for routing
- Redux for state management (in full implementation)
- Supabase for authentication and data storage

### Backend
- Node.js with Express
- Supabase for database and authentication
- JWT for authentication
- Socket.IO for real-time features (in full implementation)

### Admin Dashboard
- HTML5, CSS3, Bootstrap 5
- JavaScript

## Running the Application on PC

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (version 14 or higher)
2. Install [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Running the Backend Server
1. Double-click on `start-backend.bat` file
2. Or open Command Prompt, navigate to the project directory and run:
   ```bash
   cd backend
   npm install
   npm start
   ```
3. The server will start on port 3000
4. Access the admin dashboard at http://localhost:3000

### Running the Mobile App (Web Version)
1. After starting the backend server, open your browser and go to:
   http://localhost:3000/mobile/index.html
2. Or you can directly open the `mobile/index.html` file in your browser

### Accessing Different Parts of the Application
- **Admin Dashboard**: http://localhost:3000
- **Mobile App (Web Version)**: http://localhost:3000/mobile/index.html
- **API Endpoints**:
  - Menu: http://localhost:3000/api/menu
  - Orders: http://localhost:3000/api/orders/:id
  - Loyalty: http://localhost:3000/api/user/loyalty
  - Auth: http://localhost:3000/api/auth

## Deployment with Supabase

### Setting up Supabase

1. Create a new project at [Supabase](https://supabase.io/)
2. Get your project URL and anon key from the project settings
3. Update the [backend/.env](file://c:\Users\PC\Desktop\1\shashlyk-mashlyk-app\backend\.env) file with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the SQL script from [supabase-setup.sql](file://c:\Users\PC\Desktop\1\shashlyk-mashlyk-app\supabase-setup.sql) in your Supabase SQL editor to create the necessary tables

5. Enable email signup in Supabase Authentication settings

### Deploying the Backend

1. You can deploy the backend to services like:
   - [Vercel](https://vercel.com/)
   - [Railway](https://railway.app/)
   - [Render](https://render.com/)
   - [Heroku](https://heroku.com/)

2. Make sure to set the environment variables in your deployment service

### Deploying the Mobile App

1. For React Native apps, you can use:
   - [Expo](https://expo.io/) for easy deployment
   - Build native binaries for App Store and Google Play

2. Update API endpoints in the mobile app to point to your deployed backend

## Development Phases

### Phase 1: MVP (2-3 months)
- User registration and authentication
- Menu browsing and order placement
- Integration with one payment system
- Basic order tracking
- Simple admin interface

### Phase 2: Enhanced Features (1-2 months)
- Loyalty program and bonuses
- Reviews and ratings
- Personalized recommendations
- Multiple payment methods
- Push notifications

### Phase 3: Optimization (Ongoing)
- A/B testing of interface
- Advanced user behavior analytics
- Automated marketing campaigns
- CRM system integration
- API for franchise partners

## Payment Integration
- Sberbank Online
- Tinkoff
- YooMoney
- Credit cards
- Cash on delivery

## Delivery Features
- Real-time order tracking
- Courier location tracking
- Estimated delivery time
- Contact options with courier
- Delivery zones and pricing

## Loyalty Program
- Bonus system (3-5% of order value)
- Welcome bonus (200 rubles for registration)
- Referral program (10% of friend's first order)
- Birthday discount (20%)
- Cashback on birthday orders

## Success Metrics
- DAU/MAU (Daily/Monthly Active Users)
- Session length
- Order frequency
- User retention rates
- Average order value
- Conversion rate
- Customer acquisition cost
- Customer lifetime value

---

This is a prototype implementation demonstrating the core concepts and structure of the application. A production version would require additional implementation work, security enhancements, database integration, and thorough testing.