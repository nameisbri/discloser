# Discloser - Documentation

## Project Overview

Discloser is a web application designed to help users manage and share their sexual health information securely. It enables users to track STI test results, set automated testing reminders, and access basic educational resources, all while maintaining privacy and promoting informed consent.

## Live Demo

Check out the live demo: [Discloser App](https://discloser-1f219.web.app/landing)

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Project Structure](#project-structure)
5. [Key Components](#key-components)
6. [Styling Approach](#styling-approach)
7. [Deployment](#deployment)
8. [Sample Test Files](#sample-test-files)
9. [Future Enhancements](#future-enhancements)

## Features

### Test Result Management

- Upload and securely store test results (PDF, JPG, PNG)
- Automatic parsing of test documents to extract key information
- View test history with clear status indicators

### Automated Testing Reminders

- Set personalized testing schedules based on risk level
- In app reminder when it's time to test
- Track upcoming test dates

### Secure Sharing

- Generate shareable links for test results
- Control what information is shared and for how long
- Share results discreetly with needed parties

### Health Resources

- Access to verified sexual health information
- Links to testing locations and support services

## Tech Stack

- **React.js** - Frontend library
- **SCSS with BEM methodology** - For styling with modular, maintainable CSS
- **Vite** - Build tool for faster development
- **React Router** - For navigation
- **Axios** - For API requests
- **Lucide React** - Icon library

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/discloser.git
   cd discloser
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   VITE_APP_URL=http://localhost:8000
   VITE_MINIO_API_URL=http://localhost:9001
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 to view the app in your browser.

## Key Components

### RecentResults

Displays the user's most recent test results with status indicators and dates.

### TestingSchedule

Shows upcoming test dates, risk level, and reminder settings based on user preferences.

### StatusBadge

Reusable component for displaying test result status (Negative, Positive, etc.) with appropriate color coding.

### Upload Component

Handles file uploads with drag-and-drop functionality, progress tracking, and immediate feedback.

### Reminders Component

Allows users to set testing schedules based on personalized risk assessment.

## Deployment

The frontend is deployed using Firebase Hosting:

1. Build the production version:

   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Sample Test Files

In the `/sample-files` directory, you'll find example medical documents that can be used to test the upload and parsing functionality. These files are sanitized and contain no real patient information, but demonstrate the format that the application can parse.

## Future Enhancements

### User Management

- User authentication implementation
- Enhanced sharing preferences and permissions management

### Result Management

- Create separate public and private sharing versions
- Apple Wallet integration for quick result access
- Revocable access management for shared results

### Partner Notification

- Anonymous partner notification system
- Secure sharing links with expiration dates

### Education & Health Resources

- Evidence-based health information
- Consent education resources

### Technical Improvements

- Mobile responsive design optimization
- Accessibility enhancements
- Dark mode theme
- Performance optimizations
