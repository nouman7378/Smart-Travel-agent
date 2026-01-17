# AI Travel Chatbot Application

A complete full-stack AI Travel Chatbot application with React (TypeScript) frontend and Django backend.

## 🎯 Features

### Frontend Features
- **Chat Interface**: Real-time chat with AI assistant
- **Message Types**: Support for text, images, and location sharing
- **Quick Replies**: Fast interaction buttons
- **Typing Indicators**: Visual feedback during AI processing
- **Chat History**: View and continue previous conversations
- **Itinerary Builder**: AI-powered travel planning with day-by-day breakdown
- **Budget Planner**: Interactive budget calculation and management
- **Flight Search**: Search and compare flights
- **Bus Routes**: Local transportation information
- **Package Suggestions**: AI-powered travel package recommendations
- **Admin Dashboard**: Analytics, trends, model performance, and training data management

### Backend Features
- **RESTful API**: Django REST Framework
- **Chat Management**: Session and message handling
- **Itinerary Generation**: AI-powered itinerary creation
- **Training Data Management**: Dataset management for model fine-tuning
- **User Authentication**: Secure user management
- **CORS Support**: Cross-origin resource sharing for frontend integration

## 📁 Project Structure

```
FYP/
├── components/
│   └── chat/
│       ├── MessageBubble.tsx
│       ├── ChatInput.tsx
│       ├── QuickReplies.tsx
│       ├── TypingIndicator.tsx
│       └── FileUpload.tsx
├── pages/
│   ├── chat/
│   │   ├── ChatPage.tsx
│   │   ├── ChatHistoryPage.tsx
│   │   └── QuickActionsPanel.tsx
│   ├── itinerary/
│   │   ├── ItineraryBuilderPage.tsx
│   │   ├── ItineraryDetailPage.tsx
│   │   └── BudgetPlannerPage.tsx
│   ├── integrations/
│   │   ├── FlightSearchPage.tsx
│   │   ├── BusRoutesPage.tsx
│   │   └── PackageSuggestionsPage.tsx
│   └── admin/
│       ├── ChatAnalytics.tsx
│       ├── UserQueryTrends.tsx
│       ├── ModelPerformance.tsx
│       └── TrainingDataManager.tsx
├── backend/
│   ├── chat/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── itinerary/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── travel_chatbot/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   └── requirements.txt
└── App.tsx
```

## 🚀 Setup Instructions

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create .env file:**
```bash
SECRET_KEY=your-secret-key-here
DEBUG=True
```

5. **Run migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

6. **Create superuser:**
```bash
python manage.py createsuperuser
```

7. **Start development server:**
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api/`

## 📡 API Endpoints

### Chat Endpoints
- `POST /api/chat/send-message/` - Send a message to the AI bot
- `GET /api/chat/history/` - Get chat history for the current user
- `GET /api/chat/sessions/` - List all chat sessions
- `POST /api/chat/sessions/` - Create a new chat session
- `GET /api/chat/sessions/{id}/messages/` - Get messages for a session
- `POST /api/chat/train-model/` - Train the AI model

### Itinerary Endpoints
- `POST /api/itinerary/get-itinerary/` - Generate an AI-powered itinerary
- `GET /api/itinerary/` - List all itineraries
- `POST /api/itinerary/` - Create a new itinerary
- `GET /api/itinerary/{id}/` - Get itinerary details

## 🎨 Frontend Routes

### Chat Routes
- `/chat` - Main chat interface
- `/chat/history` - Chat history page
- `/chat/quick-actions` - Quick actions panel

### Itinerary Routes
- `/itinerary/builder` - Itinerary builder page
- `/itinerary/:id` - Itinerary detail page
- `/budget/planner` - Budget planner page

### Integration Routes
- `/chat/flights` - Flight search page
- `/bus/routes` - Bus routes page
- `/packages/suggestions` - Package suggestions page

### Admin Routes
- `/admin/analytics` - Chat analytics dashboard
- `/admin/trends` - User query trends
- `/admin/performance` - Model performance metrics
- `/admin/training` - Training data manager

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Vite** - Build tool and dev server

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API framework
- **SQLite/PostgreSQL** - Database
- **CORS Headers** - Cross-origin support

## 📝 Development Notes

### Adding AI Integration

To integrate with an AI service (OpenAI, etc.):

1. Update `backend/chat/views.py` in the `send_message` method
2. Update `backend/itinerary/views.py` in the `_generate_placeholder_itinerary` method
3. Add API keys to environment variables

### Customization

- **Styling**: Modify TailwindCSS classes in components
- **API Responses**: Update serializers in `backend/*/serializers.py`
- **Database**: Change database settings in `backend/travel_chatbot/settings.py`

## 🔐 Security Considerations

- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Add rate limiting for API endpoints
- Validate and sanitize user inputs
- Use HTTPS in production

## 📦 Deployment

### Frontend
```bash
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend
- Set `DEBUG=False` in production
- Use a production database (PostgreSQL recommended)
- Configure proper CORS settings
- Set up static file serving
- Use a production WSGI server (Gunicorn, uWSGI)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is part of a Final Year Project (FYP).

## 🎯 Future Enhancements

- Real-time AI integration (OpenAI, Anthropic, etc.)
- WebSocket support for real-time chat
- Advanced analytics and reporting
- Multi-language support
- Mobile app development
- Payment integration
- Social sharing features

