  ### Flow of Login & Signup pages for MINI_Ecomers...

### Backend flow from frontend 

Frontend Form
   ↓
Axios API Call
   ↓
Backend server.js / app.js
   ↓
authRoutes.js
   ↓
authController.js
   ↓
User.js Model
   ↓
MongoDB Database
   ↓
Backend Response
   ↓
Frontend UI Update


### backend files for login & signup 

backend/
├── server.js          → Starts backend server
├── app.js             → Handles express setup
├── db.js              → Connects MongoDB
├── routes/
│   └── authRoutes.js  → Defines signup/login API paths
├── controllers/
│   └── authController.js → Signup/login logic
└── models/
    └── User.js        → User schema/table structure

### Signup Work like this


Signup.js
↓
axios.post("http://localhost:9000/api/auth/signup", formData)
↓
authRoutes.js checks /signup route
↓
authController.js runs signup function
↓
User.js creates user format
↓
MongoDB saves user
↓
Response goes back to frontend



### Login work 


Login.js
↓
axios.post("http://localhost:9000/api/auth/login", formData)
↓
authRoutes.js checks /login route
↓
authController.js runs login function
↓
MongoDB checks email and password
↓
If correct → Login success
↓
Frontend saves user in localStorage
↓
Navigate to home/dashboard


### Memory Trick
React → Axios → Express Route → Controller → Model → MongoDB

### suceccess message updation 
User clicks Login
↓
Frontend sends email & password
↓
Backend receives data
↓
Find user in MongoDB
↓
User found ✅
↓
Password correct ✅
↓
loginController.js
↓
res.status(200).json({
   success: true,
   message: "Login Successful",
   user: existingUser
})
↓
Response sent to frontend
↓
Frontend receives response.data
↓
response.data.message
↓
"Login Successful" shown to user

### bcrypt flow

SIGNUP
│
├── User enters password
│      ↓
│   password = "123456"
│
├── bcrypt.hash(password, 10)
│      ↓
│   hashedPassword
│      ↓
│   "$2b$10$asdfghj..."
│
├── new User({
│      name,
│      email,
│      password: hashedPassword
│   })
│
├── await newUser.save()
│
└── MongoDB
       ↓
   Password stored as HASH


--------------------------------------------------


LOGIN
│
├── User enters password
│      ↓
│   password = "123456"
│
├── Find User
│      ↓
│   existingUser
│
├── MongoDB returns
│      ↓
│   existingUser.password
│      ↓
│   "$2b$10$asdfghj..."
│
├── bcrypt.compare(
│      password,
│      existingUser.password
│   )
│
├── Result
│      ↓
│   true / false
│
├── false
│      ↓
│   Invalid Password
│
└── true
       ↓
   Login Successful

   ### jwt flow

   LOGIN
│
├── User enters email + password
│
├── Backend finds user
│
├── bcrypt.compare()
│
├── Password match true ✅
│
├── jwt.sign()
│      ↓
│   create token
│
├── Backend sends response
│      ↓
│   {
│     success: true,
│     message: "Login Successful",
│     token: token
│   }
│
└── Frontend stores token
       ↓
    localStorage

    
   ###  Admin Dashboard
   
   
  
↓
Enter Product Details
↓
POST Request
↓
productController.js
↓
new Product(...)
↓
save()
↓
MongoDB
↓
Product Saved Admin Dash board  --------------------------

   ### Create tables / model
   1. Users
   → signup/login users

2. Products
   → admin adds products

3. Orders
   → user places orders

   # fOR PRODUCT 

   Admin Dashboard
↓
Add Product Form
↓
POST Request
↓
productController.js
↓
Product.js Model
↓
MongoDB
↓
Product Saved

-----------------------------------------------------
Admin Dashboard
↓
Enter Product Details
↓
POST Request
↓
productController.js
↓
new Product(...)
↓
save()
↓
MongoDB
↓
Product Saved

# example from mini- ecommerce    
   Ex:- frontend send reques as
    {
  title: "iPhone",
  price: 70000
}  
This comes to backend as: req.body

1st Copy
↓
Reading data from request

2nd Copy
↓
Creating product for database

# Product Routes 

addProduct()  exists, but nobody can call it.

need routes 

Flow :- Frontend/Postman
↓
POST /api/products
↓
productRoutes.js
↓
addProduct()
↓
Product Model
↓
MongoDB

# Flow : Post
      productRoutes.js
│
├── Router Created
│
├── POST /
│      ↓
│   addProduct()
│
└── Export Router
# Get
 Mini Ecommerce Frontend
↓
GET /api/products
↓
Backend gets products from MongoDB
↓
Frontend shows products


 ## Postman
│
├── POST /api/products
│      ↓
│   Add Product
│      ↓
│   MongoDB
│
└── GET /api/products
       ↓
    Get All Products
       ↓
    MongoDB
 

### strucute of admin dash board 

Admin Dashboard
│
├── Sidebar
│   ├── Dashboard
│   ├── Users
│   ├── Categories
│   ├── Products
│   └── Admins
│
├── Users
│   └── Manage normal users
│
├── Categories
│   └── Mobiles, Laptops, Furniture, Kitchen
│
├── Products
│   └── Add/Edit/Delete products
│
└── Admins
    └── Give admin access to another person

  #   login flow 

  Login Page
↓
Click Login as User/Admin
↓
Frontend sends loginType
↓
Backend checks user role
↓
If match → allow
↓
If not match → block

### frontend 
Admin Dashboard
│
├── Users ✅ Clickable
├── Categories ✅ Clickable
├── Products ✅ Clickable
└── Admins ✅ Clickable

# add product flow POST 

Admin Form
↓
Frontend sends data
↓
POST /api/products
↓
Backend
↓
MongoDB
↓
Product Saved
↓
Immediately visible in Ecommerce

# product section design 

Products
│
├── Add Product Form
│   ├── Title
│   ├── Price
│   ├── Category (Dropdown)
│   ├── Description
│   ├── Image URL
│   └── Stock
│
└── Products Table
    ├── Image
    ├── Title
    ├── Price
    ├── Category
    ├── Stock
    └── Actions
         ├── Edit
         └── Delete

         