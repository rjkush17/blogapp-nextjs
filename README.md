
# LifeStyle mag - Next.JS Blog WebApp

Welcome to "LifeStyle Mag Blog App" - a next.js project aimed at learning web development through building a fully functional blog platform.

## Demo

You can see live demo - https://lifestylemag.vercel.app/

## Screenshots

![Screenshot](https://i.ibb.co/1f0DGhZ/Screenshot-1.png)

![Screenshot](https://i.ibb.co/5RwG252/Screenshot-5.png)

![Screenshot](https://i.ibb.co/G5rGkHk/Screenshot-3.png)

![Screenshot](https://i.ibb.co/HCxkWCR/Screenshot-2.png)

![Screenshot](https://i.ibb.co/z87LrHG/Screenshot-4.png)


## Tech Stack
This project is built with the following technologies:

Next.js - A powerful JavaScript library for building interactive user interfaces, ensuring a smooth and dynamic experience for users.

Tailwind CSS - A utility-first CSS framework for rapidly building custom designs, allowing for efficient styling without leaving the HTML.

MongoDB - A NoSQL database that offers flexibility and scalability for the application's data storage needs.

## Deployment

Full Project Deployed at [Vercel](https://vercel.com/).

## Getting Started

Follow these steps to set up the project on your local machine.

1. Navigate to the root directory.

2. Create a .env file to store your environment variables.

DATABASE - Your MongoDB database URL.
JWTKEY - Your secret key for JSON Web Tokens (JWT). For example:

 ```
DATABASE  =mongodb://your-database-url
JWTKEY = yourSecretKey
```
### Running the App

Open the Terminal and Run Following Command -

Install Dependencies: Install all necessary npm packages by running:
```
npm install

```

Start the Application: Launch the development server with:

```
npm run app
```

## Libraries and Dependencies

The project utilizes a range of libraries and dependencies for both the backend and frontend to enhance functionality and performance.

- **bcrypt**: For hashing and securing passwords.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens for secure authentication.
- **jose**: A versatile library for working with JSON Object Signing and Encryption.
- **mongoose**: An ODM (Object Document Mapping) library for MongoDB and Node.js.

- **@reduxjs/toolkit**: A toolset for efficient Redux development.
- **jwt-decode**: A small browser library that helps decoding JWTs token which are Base64Url encoded.

- **react-icons**: Utilizes ES6 imports that allow you to include only the icons your project is using.
- **react-redux**: Official React bindings for Redux.
- **react-scroll-to-top**: A React component for scrolling back to the top of the page.
- **react-toastify**: Allows you to add notifications to your app with ease.
## Features
- **Interactive Design:** An engaging and user-friendly interface to enhance user experience.
- **Authentication System:** Secure user authentication including sign up, login, and logout.
- **Like and Unlike Blogs:** Users can like or unlike blog posts to show their appreciation.
- **Profile Page:** Each user has a profile page displaying their information and activity.
- **Single Blog Page:** Detailed view for each blog post with full content and comments.
