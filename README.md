
# 📘 GlossifyAI

*A full-stack AI-powered glossary generator built using React, Node.js, Express, and the Groq API.*

---

## 🚀 Overview

GlossifyAI is a web application that extracts important technical terms from any text and automatically generates concise glossary-style definitions using an AI model. Users can paste content, generate a glossary in one click, and view highlighted terms directly in the text for quick understanding.
The project demonstrates full-stack development, prompt engineering, secure API integration, and dynamic UI rendering.

---

## ✨ Features

* 🧠 **AI-generated glossary** (Groq LLM API)
* 📝 **Paste any article or essay** to extract key terms
* 🎯 **Inline highlighting** of glossary terms
* 🔐 **Secure backend** to protect API keys
* ⚡ **Responsive, fast UI** built with React & Vite
* 🔄 **Clear button** and loading spinner for smooth UX

---

## 🛠 Tech Stack

### **Frontend**

* React
* Axios
* JavaScript (ES6)
* Plain CSS

### **Backend**

* Node.js
* Express.js
* Axios (server → Groq API)
* dotenv (environment variables)
* cors (for dev)

### **AI Model / API Used**

✔ **Groq API**

* Endpoint: `https://api.groq.com/openai/v1/chat/completions`
* Model: **llama-3.1-8b-instant**
* Purpose: Generates glossary definitions from user input text
  (Groq uses an OpenAI-compatible API interface.)

---

## 🧩 Architecture

```
React Frontend  →  Node.js/Express Backend  →  Groq LLM API
       ↑                      ↓                     ↑
 UI updates              Sends prompt           Returns glossary
 highlights terms         with text             as plain text
```

---

## 📂 Project Structure

```
glossifyai/
├── server/
│   └── index.js           # Express backend
├── src/
│   ├── App.jsx            # Main UI + logic
│   ├── App.css            # Styling
│   └── main.jsx
├── .env                   # API keys (not committed)
├── package.json
└── vite.config.js
```

---

## ⚙️ How It Works

1. User pastes text into the React UI.
2. React sends a POST request with the text to `/api/generate`.
3. The Node.js + Express backend loads the Groq API key from `.env`.
4. Backend sends a prompt to **Groq’s chat completion endpoint** using Axios.
5. Groq returns glossary-style definitions.
6. Backend returns the glossary to the frontend as JSON.
7. React highlights the terms and shows the glossary in the UI.

---

## 🧪 Running the Project Locally

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/glossifyai.git
cd glossifyai
```

---

### **2. Backend Setup**

```bash
cd server
npm install
```

Create a `.env` file:

```
GROQ_API_KEY=gsk_your_api_key_here
```

Run the backend:

```bash
node index.js
```

Runs on: `http://localhost:4000`

---

### **3. Frontend Setup**

```bash
cd ..
npm install
npm run dev
```

Opens at: `http://localhost:5173`

---

## 🧠 Groq API Reference

**POST:**

```
https://api.groq.com/openai/v1/chat/completions
```

**Example Body:**

```json
{
  "model": "llama-3.1-8b-instant",
  "messages": [
    {
      "role": "user",
      "content": "Extract glossary terms from this text..."
    }
  ]
}
```

**Headers:**

```
Authorization: Bearer YOUR_GROQ_API_KEY
Content-Type: application/json
```

---

## 🔮 Future Improvements

* Upload PDFs or text files
* Export glossary as CSV
* Multi-language glossary generation
* Smarter term extraction using NLP
* Save glossaries for user accounts
* Tailwind UI redesign

---


## 🤝 Contributions

PRs and suggestions are welcome!
