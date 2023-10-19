# MERN stack based Full stack web app - eCommerce app

## Overview

The eCommerce app is a convenient and user-friendly platform that allows users to easily shop for a wide range of products from the comfort of their own homes. With a sleek and intuitive interface, navigating through the app is a breeze. Whether you are searching for the latest fashion trends, electronic gadgets, or household essentials, the app has got you covered. With its secure payment options and reliable shipping services, you can shop with confidence knowing that your personal information is protected and your orders will arrive in a timely manner. The app also provides personalized recommendations based on your browsing history, ensuring that you discover new and exciting items tailored to your preferences. This app is a replica app of eCommerce platforms.

## Features

- User-friendly interface: The eCommerce app is designed to be easy to navigate, ensuring a smooth and enjoyable shopping experience for users.
- Product catalog: The app provides an extensive catalog of products, ranging from clothing and accessories to electronics and home goods, allowing users to easily find what they are looking for.
- Smooth and streamlined checkout process: The eCommerce app offers a seamless and straightforward checkout experience, allowing users to easily review their selected items, enter shipping and billing information, and complete their purchase with minimal effort.

## Tech Stack

This app combines a number of third party open-source tools:

- [Express](https://expressjs.com/) builds the backend.
- [Vite](https://vitejs.dev/) builds the [React](https://reactjs.org/) frontend.
- [React Router](https://reactrouter.com/) is used for routing. We wrap this with file-based routing.
- [React Query](https://react-query.tanstack.com/) queries the Admin API.
- [MongoDB](https://www.mongodb.com/) is used as a database.

## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
2. You must [download and install TypeScript](https://www.typescriptlang.org/download) if you don't already have it.

### Installing the project
1. Clone the repository: Clone this project repository using the following command in your terminal or command prompt:

```shell
git clone https://github.com/mangeshk1239/eCommerce-app-TypeScript-MERN.git
```

2. Navigate to the project directory: Change to the eCommerce-app-TypeScript-MERN directory within the main project folder:
cd .\eCommerce-app-TypeScript-MERN\

3. This directory consists of two folders: backend and frontend.

4. 
Install dependencies in both the folders: Run the following command to install the necessary dependencies:


```shell
npm install
```
5. Create a ".env" file in the "backend" directory and copy the environment variables from the .envexample file to this file.

6. Run the development environment for both the folders: Use the following command to start the development environment:

```shell
npm run dev
```