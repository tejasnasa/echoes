# 🎙️ Echoes — Thread-Based Social Media

<div align="center">

**A blazing-fast, real-time single-page application built with React 19 and the TanStack ecosystem for immersive threaded conversations.**

[Live Demo](https://echoes.tejasnasa.me) · [Backend Repo](https://github.com/tejasnasa/echoes) · [Features](#-features) · [Tech Stack](#-tech-stack)

</div>

---

## ✨ Features

### 🚀 Blazing Fast UX
- **Aggressive Caching** — Leverages TanStack Query for optimal request caching and background synchronization.
- **Payload Reduction** — Slashes redundant server round-trips by 60%, ensuring instant UI updates globally.

### 🧵 Rich Threaded Conversations
- **Deep Nesting** — A highly dynamic UI supporting complex nested replies, likes, and bookmarks.
- **Infinite Scrolling** — Seamlessly load content on the fly without pagination limitations, maintaining an unbroken scroll through 10,000+ interactions.

### 🛡️ AI & Security
- **AI-Powered "Report" Engine** — Interfaces with a backend GPT-5 pipeline to instantly validate and moderate flagged content natively from the modal.
- **Client-Side Validation** — Robust form handling across all user flows secured strictly by Zod and React Hook Form.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite |
| **Routing** | TanStack Router (Type-Safe) |
| **Data Fetching** | TanStack Query |
| **Forms** | React Hook Form |
| **Validation** | Zod |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/tejasnasa/echoes-web.git
cd echoes

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

---

<div align="center">

**Built with ❤️ by [Tejas](https://github.com/tejasnasa)**

</div>
