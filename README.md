# ✓ _discloser_ 

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

- As a user, I want to create a secure account
- As a user, I want to log in securely

### Result Management

- As a user, I want to upload test results (file/manual)
- As a user, I want to share results with basic anonymization
- As a user, I want to generate PDFs of results

- Basic educational content (static, no search/directory features)

## Implementation

Frontend:

- React
- TypeScript
- Libraries:
  - react-hook-form + zod
  - pdf-lib

Backend:

- Node.js
- Express
- MySQL
- Libraries:
  - multer (file uploads)
  - bcrypt + JWT (authentication)
  - helmet (security headers)

### APIs

No external APIs will be used for the first sprint

### Sitemap

**Public**

- Landing (/)
- Login (/login)
- Signup (/signup)

**Protected**

- Dashboard (/dashboard)
  - Recent results
  - Upload new results
- Result View (/results/:id)
  - View details
  - Generate PDF
  - Basic sharing
- Share Page (/share/:token)
  - Public view of shared result

### Mockups
![landing-page](https://github.com/user-attachments/assets/829ae193-c1d0-4208-aa64-90f376c301d0)
![authentication](https://github.com/user-attachments/assets/d0dbce9a-eabc-46fc-ab66-86f350975872)
![dashboard](https://github.com/user-attachments/assets/6bd29320-b3b3-487c-9171-3ae0cff1e783)
![single-test-detail](https://github.com/user-attachments/assets/91fc94d7-f2e6-4269-b828-f9137fe7b625)
![share-results](https://github.com/user-attachments/assets/ce474fd3-01d0-4962-8cca-fab85c6e8e13)
![education-content](https://github.com/user-attachments/assets/6ce82f61-fc53-45c8-8186-237013fb7365)

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
