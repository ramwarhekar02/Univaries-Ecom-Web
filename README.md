# 🛍️ UNIVARIES – Fashion Ecommerce Website

UNIVARIES is a full-stack fashion ecommerce web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The platform features separate **Admin** and **User Dashboards**, secure authentication, full CRUD operations, and a responsive UI built with **Tailwind CSS**.

---

## 🎥 Demo Video

### 🔹 Landing Page
Uploading LandingPage.mp4…

---

## 📸 Screenshots

### 🔹 Product Listings
![Shop](https://github.com/user-attachments/assets/48afdb69-5036-469e-94c3-a6d1a0c4c369)


### 🔹 Product Detail & Cart
![cart](https://github.com/user-attachments/assets/4f00b817-c59b-4b70-bac4-30e172c3ca24)


### 🔹 User Login
![login](https://github.com/user-attachments/assets/798375f8-a881-4524-9eb6-abc15e657802)


### 🔹 User Register
![Shop](https://github.com/user-attachments/assets/789b0617-0515-4271-afb7-44eb9fe8d8b3)

![register](https://github.com/user-attachments/assets/c293437a-9621-4460-838b-0cbc82d728a0)

---

## 🧰 Tech Stack

| Technology | Description |
|------------|-------------|
| React.js   | Frontend framework |
| Tailwind CSS | Responsive and modern UI styling |
| Node.js    | Backend runtime environment |
| Express.js | Server-side web framework |
| MongoDB    | NoSQL database |
| Mongoose   | MongoDB ODM |
| JWT        | Secure user authentication |
| Bcrypt     | Password encryption |
| Postman    | API testing and documentation |

---

## 🔐 Features

### 👤 User Features
- Register/Login with secure password encryption
- Browse products by category
- Add to cart and checkout (mock)
- View and manage personal orders
- Edit user profile

### 🧑‍💼 Admin Features
- Add/Edit/Delete products (CRUD)
- Manage user roles and details
- View, update, or cancel orders
- Dashboard analytics and controls

### 🔐 Authentication
- JWT-based protected routes
- Password hashing with bcrypt
- Role-based access (Admin/User)

---

## 🧪 API Testing

All API routes are built using RESTful principles and tested with **Postman**.

- `GET /api/products` – List all products  
- `POST /api/auth/login` – Login and receive JWT  
- `PUT /api/orders/:id` – Update order status (Admin only)  
- etc...

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/univaries-ecommerce.git
cd univaries-ecommerce
