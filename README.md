# ragxperiment.ai

[![Python](https://img.shields.io/badge/python-3.9%2B-blue)](https://www.python.org/)  
[![React](https://img.shields.io/badge/react-18.0-blue)](https://reactjs.org/)  

---

## Overview

**ragxperiment.ai** is an experimental platform that allows users to upload PDF and document files and interact with an AI-powered chat interface to ask questions and retrieve answers based on the uploaded content. It leverages modern retrieval-augmented generation (RAG) techniques to provide accurate, context-aware responses.

The project features:

- **FastAPI backend** for handling uploads, managing the knowledge base, and serving AI-driven responses.
- **React (TypeScript) frontend** with a sleek dashboard, knowledge base viewer, and chat interface.
- Modular, scalable folder structure enabling easy future enhancements.

---

## Features

- Upload and parse PDFs and document files.
- Build and manage a searchable knowledge base.
- AI-powered conversational interface using RAG techniques.
- Type-safe React frontend with intuitive UX.
- Robust backend with clear API versioning and modular services.

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 16+
- npm or yarn
- Git

### Installation

#### Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```


#### Frontend

```bash
cd frontend
npm start
# or
yarn start
```

## Contributing
Contributions are welcome! Please open issues or pull requests for bug fixes, features, or enhancements.

---

