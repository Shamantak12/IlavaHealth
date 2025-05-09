# Ilava - Agricultural Waste Management App

Ilava is an innovative application that helps farmers transform agricultural waste into valuable products. The platform connects farmers with buyers to create a sustainable ecosystem for agricultural waste management.

## Project Structure

This repository contains both a web application and a mobile application for the Ilava platform:

- `/` (root) - Web application built with React, Express, and PostgreSQL
- `/mobile` - Mobile application built with React Native

## Features

- **User Type Selection**: Choose between Farmer or Buyer accounts
- **Multiple Authentication Methods**: Log in with phone, email, Google, or Apple
- **Waste Scanner**: Scan agricultural waste to get recommendations for products
- **Product Listing**: Browse products made from agricultural waste
- **Category Navigation**: Filter products by waste type
- **Cart & Favorites**: Save and purchase products

## Web Application

The web application is built using:

- React + TypeScript for the frontend
- Express.js for the backend
- PostgreSQL for data storage
- TanStack Query for data fetching
- Shadcn UI + Tailwind CSS for styling

### Running the Web App

1. Ensure you have Node.js and npm installed
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. The application will be available at http://localhost:5000

## Mobile Application

The mobile application is built using:

- React Native + TypeScript
- React Navigation for routing
- React Native Camera for the waste scanner

### Running the Mobile App

> **Note:** The mobile app requires React Native CLI and either Android Studio for Android development or Xcode for iOS development.

1. Navigate to the mobile directory:
   ```
   cd mobile
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Install required native modules:
   ```
   npm install react-native-camera
   ```
4. Start the React Native development server:
   ```
   npm start
   ```
5. In a separate terminal, run on Android or iOS:
   ```
   npm run android
   ```
   or
   ```
   npm run ios
   ```

To set up a development environment for React Native, please refer to the [official React Native documentation](https://reactnative.dev/docs/environment-setup).

## Environment Variables

The following environment variables are required:

- `DATABASE_URL`: PostgreSQL database connection URL
- `OPENAI_API_KEY`: OpenAI API key for waste analysis (optional)

## Database Schema

The application uses the following database tables:

- `users`: User accounts (farmers and buyers)
- `products`: Products made from agricultural waste
- `cart_items`: Items in user shopping carts
- `favorites`: User's favorite products

## License

MIT