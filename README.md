# 📝 Skictynote App

Skictynote is a responsive React notes application with Gemini-powered actions
for summarizing and improving note content.

## ✨ Features

- Create, edit, and delete notes
- Persist notes in browser `localStorage`
- Expand a note into a full-screen editor on focus
- Responsive layout for mobile, tablet, and desktop
- Summarize notes with Gemini
- Improve note writing with Gemini
- Backend rate limiting for AI requests
- CORS-protected frontend/backend communication

## 🧰 Tech stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Tabler Icons

### Backend

- Node.js
- Express
- Google Gemini API
- `express-rate-limit`
- `cors`

## 📁 Project structure

```text
notes/
├── README.md
├── .gitignore
├── frontend/
│   ├── .env.example
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── public/
│   │   └── icon.png
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── main.jsx
│       ├── components/
│       │   ├── Nav.jsx
│       │   └── NoteBox.jsx
│       └── utils/
│           └── date.js
└── backend/
    ├── .env.example
    ├── .gitignore
    ├── index.js
    ├── package.json
    ├── package-lock.json
    └── src/
        ├── index.js
        ├── config/
        │   └── env.js
        ├── controllers/
        │   └── app.controllers.js
        ├── middleware/
        │   ├── error.handling.js
        │   ├── rateLimiter.js
        │   └── validateAi.js
        ├── prompt/
        │   └── prompt.js
        ├── routes/
        │   └── app.routes.js
        ├── services/
        │   └── gemini.services.js
        └── utils/
            └── appError.js
```

## 🚀 Run locally

### 1. Clone the repository

```bash
git clone https://github.com/kaushalsahu07/notes.git
cd notes
```

### 2. Configure the backend

Create `backend/.env` from `backend/.env.example`:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_gemini_model
CLIENT_ORIGIN=http://localhost:5173
```

Install backend dependencies and start the API:

```bash
cd backend
npm install
npm run dev
```

The backend runs at [http://localhost:3000](http://localhost:3000).

The health endpoint is:

```text
GET http://localhost:3000/
```

### 3. Configure the frontend

Open a second terminal from the repository root and create
`frontend/.env` from `frontend/.env.example`:

```env
VITE_CLIENT_ORIGIN=http://localhost:3000
```

Install frontend dependencies and start Vite:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

Restart the Vite server whenever a frontend `.env` value changes.

## 🔌 API

### Generate AI content

```text
POST http://localhost:3000/app
```

Request body:

```json
{
  "option": "summarize",
  "content": "Your note content goes here."
}
```

Supported options:

- `summarize`
- `improve`

Successful response:

```json
{
  "success": true,
  "data": {
    "text": "Generated Gemini response"
  }
}
```

The endpoint allows up to 10 requests per IP address per minute. Invalid
content returns a `400` response, and rate-limited clients receive a `429`
response.

## 🧪 Useful commands

Run these commands from the relevant application directory:

```bash
# Frontend
npm run dev
npm run build
npm run lint

# Backend
npm run dev
npm start
```

## 💾 Note storage

Notes are currently stored in the browser's `localStorage` under the key
`notes`. The backend does not store note records; it only processes AI
requests.

## 👨‍💻 Contact

- GitHub: [@kaushalsahu07](https://github.com/kaushalsahu07)
- Portfolio: [kaushalsahu.tech](https://kaushalsahu.tech)
- LinkedIn: [@kaushalsahu07](https://www.linkedin.com/in/sahukaushal/)
- Instagram: [@cd.kaushal](https://www.instagram.com/cd.kaushal/)

Created with ❤️ by Kaushal Sahu.
