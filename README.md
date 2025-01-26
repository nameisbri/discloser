# Project Title

## Overview

**_discloser_** is a web application designed to help users manage and share their sexual health information securely. It enables users to track STI test results, share anonymized health information with partners, and receive automated testing reminders, all while maintaining privacy and promoting informed consent.

### Problem Space

Sexual health conversations and STI status sharing can be awkward, inconsistent, and sometimes avoided altogether. Current methods of sharing test results often involve showing private medical documents that contain sensitive personal information beyond what's necessary. Additionally, many people struggle with maintaining regular testing schedules and notifying previous partners when necessary.

**Key issues:**

- Difficulty in sharing STI test results while protecting privacy
- Lack of streamlined partner notification systems
- Inconsistent testing schedules
- Need for secure storage of sensitive health information
- Limited accessibility to sexual health education resources

### User Profile

**Primary users include:**

- Sexually active adults seeking to manage their sexual health information
- People wanting to share test results with potential partners
- Users needing reminders for regular STI testing
- Individuals looking for discreet ways to notify partners

### Features

### User Management

- As a user, I want to create a secure personal account so I can safely store my health information
- As a user, I want to log in securely to access my stored test results and information

### Result Management

- As a user, I want to upload my test results by file or manual entry so I can store them digitally
- As a user, I want sensitive information automatically anonymized when I share results so my privacy is protected
- As a user, I want to generate PDFs of my results so I can share them

### Education & Resources

- As a user, I want to view testing guidelines so I know when to get tested
- As a user, I want to find information about healthcare access in my area so I can get care when needed
- As a user, I want to search a directory of local clinics so I can find testing locations near me

## Implementation

Frontend:

- React
- TypeScript
- Radix UI
- Libraries:
  - react-hook-form + zod
  - pdf-lib

Backend:

- Node.js
- Express
- MongoDB
- Libraries:
  - multer (file uploads)
  - bcrypt + JWT (authentication)
  - helmet (security headers)
  - mongoose (MongoDB ODM)

### APIs

No external APIs will be used for the first sprint

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date.

---

## Future Implementations

### User Management:

- Set testing schedule reminders
- Manage sharing preferences and permissions

### Result Management:

- Create public and private sharing versions
- Apple Wallet integration

### Partner Notification:

- Anonymous partner notification system
- Secure sharing links with expiration dates
- QR code generation for quick sharing
- Revocable access management
- Anonymous partner notification system

### Education & Health Resources:

- Sexual health resource library
- Evidence-based health information
- Consent education resources
