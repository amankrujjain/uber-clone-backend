
# User Registration API

This project is a Node.js application that provides a user registration API. It leverages **Express.js**, **Mongoose**, **Bcrypt**, **JWT**, and **Express Validator** to handle user registration, validation, and token generation. Below is a detailed explanation of the functionality.

---

## **Features**
1. **User Registration**:
   - Validate user input (email, first name, and password).
   - Hash passwords securely using `bcrypt`.
   - Store user details in a MongoDB database.
   - Generate authentication tokens using `JWT`.

2. **User Login**:
   - Validate user input (email and password).
   - Authenticate user credentials.
   - Generate authentication tokens using `JWT`.

3. **Validation**:
   - Input validation using `express-validator`.
   - Enforces rules for:
     - Email format.
     - First name minimum length.
     - Password strength.

4. **Modular Code Structure**:
   - Routes, controllers, models, and services are modularized for scalability and maintainability.

---

---

## **Endpoints**

### **1. User Registration**
**Endpoint**: `POST /register`

**Description**: Registers a new user.

**Request Body**:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Validations**:
- **Email**: Must be a valid email format.
- **First Name**: Minimum 3 characters.
- **Password**: Minimum 6 characters.

**Response**:
- **Success**: HTTP 201
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "_id": "unique_user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "jwt_token"
}
```
- **Validation Errors**: HTTP 400
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "Password at least 6 characters long", "param": "password", "location": "body" }
  ]
}
```
2. User Login

Endpoint: POST /users/login

Description: Logs in an existing user.

Request Body:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
 - Validations:

Email: Must be a valid email format.
Password: Minimum 6 characters.
Response:

Success: HTTP 200

```json
{
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "_id": "unique_user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "jwt_token"
}
```
 - Validation Errors: HTTP 400

 ```json
    {
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "Password must be at least 6 characters", "param": "password", "location": "body" }
  ]
}
 ```
- Authentication Errors: HTTP 401
```json
  {
  "success": false,
  "message": "Invalid email or password"
}
```
---

## **Technologies Used**
- **Node.js**: Backend runtime.
- **Express.js**: Web framework for building the API.
- **Mongoose**: MongoDB object modeling for defining schemas.
- **Bcrypt**: Password hashing.
- **JWT (JSON Web Token)**: Token-based authentication.
- **Express Validator**: Input validation middleware.

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js installed (version 14 or higher).
- MongoDB database setup and running.
- `.env` file with the following:
  ```env
  JWT_SECRET=your_jwt_secret
  MONGO_URI=your_mongo_connection_string
  ```

### **2. Install Dependencies**
Run the following command in the root directory:
```bash
npm install
```

### **3. Start the Server**
Run the application:
```bash
npm start
```

The server will start at `http://localhost:4000`.

---

## **Code Overview**

### **1. Routes**
File: `routes/user.routes.js`

Defines the `/register` route and applies input validation:
```javascript
router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password at least 6 characters long')
], userController.registerUser);
```

### **2. User Schema**
File: `models/user.model.js`

Defines the `user` schema and methods for hashing passwords, comparing passwords, and generating JWT tokens.
```javascript
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true, minlength: 3 },
        lastname: { type: String, minlength: 3 }
    },
    email: { type: String, required: true, unique: true, minlength: 5 },
    password: { type: String, required: true, select: false }
});
```

### **3. Controller**
File: `controllers/user.controller.js`

Handles the logic for user registration, including:
- Validation check.
- Hashing the password.
- Creating the user in the database.
- Generating an authentication token.

### **4. Service**
File: `services/user.service.js`

Handles the actual database operations like creating a new user:
```javascript
const createUser = async ({ firstname, lastname, email, password }) => {
    return await userModel.create({
        fullname: { firstname, lastname },
        email,
        password
    });
};
```

---

## **Future Enhancements**
- Add login functionality.
- Implement email verification.
- Add role-based authentication (e.g., Admin, User).
- Improve error handling and logging.

---

Feel free to contribute or suggest improvements! 🚀
