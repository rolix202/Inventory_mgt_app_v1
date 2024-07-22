# Inventory Management System

An inventory management system built with Node.js, Express, and MongoDB. This system allows users to manage products, categories, and view detailed information about each item.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)


## Features

- Add, view, update, and delete products
- Manage categories
- Upload and display product images
- User authentication and authorization
- Flash messages for notifications

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/rolix202/inventory_mgt_app_v1.git
   cd inventory_mgt_app_v1

2. Install dependencies:
    npm install

3. Set up environment variables:
    Create a .env file in the root directory and add the following:

    ```sh
    CONN_LOCAL=your_mongodb_connection_string
    PORT=your_working_port
    SESSION_SECRET=your_session_secret
    CLOUD_NAME=your_cloudinary_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret

4. Start the application:
    ```sh
    npm start

## Usage:

1. Access the application at http://localhost:3000

2. Navigate to the dashboard to manage products and categories

3. Use the sidebar to add new items or categories

## Folder Structure:
    
    ```sh
        inventory_mgt_app_v1/
        ├── bin/
        │   └── www
        ├── controllers/
        │   ├── category.js
        │   ├── items.js
        │   └── middleware.js
        ├── models/
        │   ├── admin.js
        │   ├── category.js
        │   ├── items.js
        │   └── user.js
        ├── node_modules/
        ├── public/
        │   ├── images/
        │   ├── javascripts/
        │   └── stylesheets/
        ├── routes/
        │   ├── index.js
        │   ├── items.js
        │   ├── categories.js
        │   └── users.js
        ├── views/
        │   ├── partials/
        │   │   ├── footer.ejs
        │   │   ├── header.ejs
        │   │   ├── menu_bar.ejs
        │   │   └── nav_header.ejs
        │   ├
        │   │── category_form.ejs
        │   │── category_list.ejs
        │   │── category_detail.ejs
        │   |
        │   │── item_form.ejs
        │   │── item_list.ejs
        │   │── item_detail.ejs
        │   └── error.ejs
        ├── .env
        ├── .gitignore
        ├── app.js
        ├── package-lock.json
        ├── package.json
        ├── populatedb.js
        └── README.md


## Technologies Used:

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS (Embedded JavaScript templates)
- Multer (for file uploads)
- Cloudinary (for storing images and videos)

## Contributing:

Contributions are welcome! Please fork the repository and submit a pull request for review.

