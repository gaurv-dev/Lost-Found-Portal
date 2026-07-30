# 🔍 Lost & Found Portal

> *"Every semester, someone loses their ID card, headphones, or a water bottle — and it just disappears into a lost-property drawer nobody checks. This project is my attempt to fix that."*

A full-stack Lost & Found management system built solo using the MERN stack (MongoDB, Express.js, React.js, Node.js). It replaces scattered, informal reporting — notice boards, WhatsApp groups, word of mouth — with one organized, searchable platform where lost and found items can actually find their way back to their owners.

**Status: 🚧 In Progress** — actively being built and updated.

---

## 🧩 Problem Statement

Most campuses handle lost items the same outdated way:
- Physical notice boards nobody checks regularly
- WhatsApp/Telegram groups where posts get buried in minutes
- Word of mouth, which rarely reaches the right person

The result — items sit unclaimed not because no one found them, but because the finder and owner never crossed paths. This portal solves that with a single, structured, always-searchable system.

---

## 🎯 Objectives

- Centralize lost & found reporting into one platform
- Make listings searchable and filterable (category, location, date)
- Secure every post behind user authentication
- Let the finder and owner connect directly, without a middleman
- Apply real full-stack engineering — REST APIs, JWT auth, MongoDB schema design — to a genuinely useful idea

---

## 📌 Scope

| In Scope | Out of Scope |
|---|---|
| Single institution/campus use | Multi-location, public marketplace use |
| Manual item posting & search | Automated image-based matching |
| Web-based access | Native mobile app |

*(Architecture is written to allow these later — see Future Improvements.)*

---

## 👨‍💻 Developer

Designed and built end-to-end, solo — frontend, backend, database, and deployment. No divided modules; every layer of the stack was implemented, tested, and connected independently.

---

## ⚙️ Core Modules

**1. Authentication**
Signup/Login secured with JWT; passwords hashed using bcrypt before being stored — no plain-text credentials at any point.

**2. Item Reporting**
Users can report a lost item or a found item with title, description, category, location, date, and an optional photo (uploaded via Multer/Cloudinary).

**3. Browse & Search**
All active listings are visible with keyword search and filters for category, location, and date — built to reduce scrolling through irrelevant posts.

**4. Dashboard**
A personal space to track your own posts, mark items as resolved once returned, and view related notifications.

---

## 🧰 Tech Stack

| Layer | Technology | Reason for Choosing |
|---|---|---|
| Frontend | React.js, React Router, Axios | Reusable components, smooth client-side navigation |
| Styling | Tailwind CSS | Fast, consistent UI without heavy custom CSS |
| Backend | Node.js, Express.js | Lightweight, fast REST API layer |
| Database | MongoDB (Mongoose) | Flexible schema — item fields vary by category |
| Auth | JWT, bcrypt.js | Stateless sessions, secure password storage |
| Uploads | Multer / Cloudinary | Handles item photo uploads |

---

## 🏗️ System Design

**Request Flow**
```
User → React Frontend → Express REST API → MongoDB
                ↑                  ↓
           JWT Middleware     Mongoose Models
```

**Data Model**
```
User                Item                     Claim
name                title                    item      → ref: Item
email               category                 claimedBy → ref: User
password (hashed)   type: lost/found         message
                     location, date           status
                     postedBy → ref: User
                     status
```

**Folder Structure**
```
lost-and-found-portal/
├── client/src/   → components, pages, context, App.jsx
├── server/       → models, routes, controllers, middleware, server.js
└── README.md
```

---

## 💡 Challenges Faced & What I'm Learning

- **Connecting frontend and backend cleanly** — working on structuring all API calls through a single Axios service layer instead of scattering fetch calls across components
- **Protecting routes** — currently building custom JWT middleware to guard both API endpoints and frontend routes
- **Handling image uploads** — started with local storage for images, now moving to Cloudinary for better reliability

This project is still a work in progress, and it's helping me actually understand why the MERN stack pieces fit together, not just how to copy-paste each one.

---

## 🚀 Future Improvements

- Real-time chat between finder and owner
- Email/SMS alerts when a matching item is posted
- Map-based location tagging for lost/found spots
- AI-based image matching to auto-suggest similar items

---

## ⚡ How to Run

```bash
git clone https://github.com/your-username/lost-and-found-portal.git
cd lost-and-found-portal

cd server && npm install && npm run dev
cd client && npm install && npm run dev
```

Add a `.env` file in `server/` with your MongoDB URI and JWT secret before running.

---

## 📄 License

Released under the MIT License — free to use for learning and academic reference.

---

## ✅ Conclusion

- Aims to solve a real, everyday campus problem — items not reaching their owners
- Being built entirely solo, covering frontend, backend, database, and auth
- Applying core full-stack concepts: REST APIs, JWT authentication, MongoDB schema design
- Building hands-on understanding of how MERN pieces connect, not just theory
- A growing foundation that can be extended into a larger, more feature-rich platform
