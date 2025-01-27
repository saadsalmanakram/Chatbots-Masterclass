
---

# Chatbot Agent: AI Chatbot with Django Backend and Hugging Face Integration

## Required Packages

Before starting the project, install the necessary dependencies:

```bash
pip install django djangorestframework django-cors-headers requests python-dotenv huggingface_hub
```

## Overview

The **Artilence Project** is an AI-powered chatbot built with a **Django backend** and integrated with the **Hugging Face API** for generating intelligent responses. The chatbot listens for user messages, sends them to Hugging Face's pre-trained models for processing, and returns generated responses. The backend API is designed to receive `POST` requests with a user's message and provide an AI-generated response. The project also includes a frontend interface to interact with the chatbot.

### Task: Build an AI-Powered Q&A Agent

#### Objective
Develop a small web application that uses an AI model (OpenAI or any other LLM) to allow users to query and receive answers. The application maintains a history of the conversation for context.

#### Requirements

**Frontend**
- Framework: Use a framework of your choice (React, Vue, or Angular preferred).
- Functionality:
  - An input box for the user to type a query.
  - A submit button to send the query.
  - A section to display the AI’s responses along with the query history.
  - Display the conversation history in a user-friendly format (e.g., chat bubbles or a list).
  - Ensure the UI updates dynamically without requiring a page reload.

**Backend**
- Framework: Use any backend framework (Django, FastAPI, Flask, or Node.js preferred).
- Functionality:
  - Provide an API endpoint to:
    - Accept a user query.
    - Forward the query to the chosen AI/LLM (e.g., OpenAI’s GPT model).
    - Return the AI’s response along with the conversation history.
  - Store conversation history (in-memory storage like Python dictionaries or JavaScript objects is sufficient for this task).
  - Implement basic error handling to manage invalid inputs or API failures.

**AI Integration**
- Integrate with an LLM (OpenAI GPT or similar) to generate responses.
- Use context from the conversation history to provide better answers (pass the history along with the current query to the AI API).

**Additional Requirements**
- Document the code and explain:
  - How the AI agent is set up and integrated.
  - How the conversation history is managed.
- Ensure the application is easy to run locally with clear setup instructions.

**Deliverables**
- **Codebase:**
  - A GitHub repository with the frontend and backend code.
  - Include a README.md file with setup instructions and dependencies.
- **Working Application:**
  - The frontend should call the backend API to query the AI and display responses.
- **Documentation:**
  - Brief explanation of how the AI agent works.
  - Description of any challenges faced and how they were addressed.

**Evaluation Criteria**
- **Technical Skills:**
  - Code quality and adherence to best practices.
  - Efficient use of APIs and frameworks.
- **Functionality:**
  - Smooth integration between frontend and backend.
  - Correct handling of conversation history.
- **Creativity:**
  - Design and usability of the frontend.
  - Innovative approaches to managing conversation history.
- **Communication:**
  - Clarity of documentation and comments in the code.

## Features

- **Backend:** Django REST framework to handle API requests.
- **Hugging Face Integration:** Utilizes Hugging Face’s **DistilGPT-2** model for generating chatbot responses.
- **Cross-Origin Resource Sharing (CORS):** Enabled to allow requests from different origins.
- **Environment Configuration:** Uses a `.env` file to manage environment variables, including the Hugging Face API key.

## Technologies Used

- **Backend:**
  - Python (Django 5.1)

## Setup Instructions

### 1. **Clone the Repository**

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/saadsalmanakram/chatbot-agent.git
cd chatbot-agent
```

### 2. **Backend Setup (Django)**

#### Install Dependencies

Make sure you have **Python 3.7+** and **pip** installed. Then, create a virtual environment and install the required dependencies.

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
pip install django djangorestframework django-cors-headers requests python-dotenv
pip install -r requirements.txt
```

#### Setup Environment Variables

Create a `.env` file in the root directory and add your **Hugging Face API key**:

```env
HUGGINGFACE_API_KEY=your_hugging_face_api_key
```

> **Note:** You can obtain your API key from [Hugging Face](https://huggingface.co/).

#### Run Migrations

Apply the migrations to set up the database:

```bash
python manage.py migrate
```

#### Start the Django Development Server

Start the backend server:

```bash
python manage.py runserver
```

Your API will now be running at `http://127.0.0.1:8000/`.

### 3. **Frontend Setup (React)**

#### Install Dependencies

Navigate to the frontend directory (or create your React project if not already created), and install the required dependencies:

```bash
cd frontend  # or your React directory
npm install
```

#### Start the Frontend Server

Run the development server for React:

```bash
npm start
```

This will open the React application in your browser, and it will communicate with the Django backend running at `http://127.0.0.1:8000/api/chat/`.

## Author

**Saad Salman Akram**\
GitHub: [https://github.com/saadsalmanakram](https://github.com/saadsalmanakram)\
LinkedIn: [https://www.linkedin.com/in/saadsalmanakram/](https://www.linkedin.com/in/saadsalmanakram/)

---

