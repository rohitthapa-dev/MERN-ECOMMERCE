🛍️ ShopNepal – MERN E-Commerce Web App 🌏

ShopNepal is a full-stack MERN e-commerce web  
application tailored for Nepalese users 🇳🇵, featuring  
product browsing, search, cart management, secure  
user authentication, and an admin dashboard.

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)](https://www.mongodb.com/mern-stack) [![React](https://img.shields.io/badge/React-17.0-blue)](https://reactjs.org/) [![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-5.0-green)](https://www.mongodb.com/) [![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/ShopNepal?style=social)](https://github.com/YOUR_USERNAME/ShopNepal/stargazers)

🌟 Features

🛍️ Public  
• 📝 User Registration & Login  
• 🔍 Product Search  
• 📦 Browse & View Product Details  
• 🛒 Add to Cart  
• 👤 User Profile

🔐 Protected (User)  
• ✏️ Update Profile  
• 💳 Checkout / Cart Management

🛠️ Admin Panel  
• ⚡ Admin Dashboard  
• ➕ Add New Products (with image upload)  
• 📝 Edit Products  
• ❌ Delete Products

🖼️ Screenshots

<!-- Add screenshots here -->

📁 Folder Structure  
MERN-ECOMMERCE/  
├── frontend/ # React frontend  
│ ├── src/  
│ ├── public/  
│ └── package.json  
├── backend/ # Node + Express backend  
│ ├── routes/  
│ ├── models/  
│ ├── controllers/  
│ ├── uploads/  
│ └── package.json  
├── README.md  
└── .gitignore

⚙️ Installation

Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ShopNepal.git
cd ShopNepal
```

Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on: http://localhost:5050

Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

🔐 Authentication  
• JWT token-based authentication  
• Protected routes with AuthRoute component  
• Roles: User & Admin

🛒 Modules

| Module      | Description         |
| ----------- | ------------------- |
| 🛍️ Products | CRUD + image upload |
| 🛒 Cart     | Add/Remove items    |
| 🔍 Search   | Filter products     |
| 👤 Users    | Profile management  |

📌 API Endpoints (Preview)

| Method | Endpoint      | Access |
| ------ | ------------- | ------ |
| POST   | /register     | Public |
| POST   | /login        | Public |
| GET    | /products     | Public |
| POST   | /products     | Admin  |
| PUT    | /products/:id | Admin  |
| DELETE | /products/:id | Admin  |

🌐 Deployment  
• Backend → Render  
• Frontend → Vercel  
• Database → MongoDB Atlas

📦 Tech Stack

| Layer    | Technology                                                 |
| -------- | ---------------------------------------------------------- |
| Frontend | React.js, React Router, Context API, React Hot Toast, CSS  |
| Backend  | Node.js, Express.js, MongoDB, Mongoose, JWT Authentication |
| Tools    | VS Code, Git & GitHub, REST APIs, Postman                  |

🙌 Author

Rohit Thapa Magar  
🇳🇵 Nepal | 💻 MERN Developer

⭐ Star the Repo

If you like this project, please give it a ⭐ on GitHub!
