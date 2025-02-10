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
- JavaScript

Key Libraries
- react-hook-form
- axios
- html2canvas

Backend:

-Node.js
- Express
- MySQ
- MinIO

Key Libraries
- Knex.js
- multer
- pdf-parse
- Better Auth
- AWS SDK
- helmet

### APIs

No external APIs will be used for this MVP

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
- Share Page (/share/)
  - Public view of shared result

### Mockups

![landing-page](https://github.com/user-attachments/assets/e48e9f8a-d2a2-49e0-9708-186c7315ac09)
![authentication](https://github.com/user-attachments/assets/cc2447f6-ba11-4c37-811f-1246534374ed)
![dashboard](https://github.com/user-attachments/assets/12ac61b7-404b-4904-b0a7-ac5acfc3260c)
![single-test-detail](https://github.com/user-attachments/assets/d24dd61b-dd2b-4a15-8653-56fcfaad8b43)
![share-results](https://github.com/user-attachments/assets/c949854b-68cb-4d9e-b371-e98d68504d75)
![education-content](https://github.com/user-attachments/assets/ff57bb25-33b4-48ae-a3b8-f898cb0c0939)




### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out.

### Endpoints

#### **User Management**
1.  **POST /signup**
    -   Create a new user account.
2.  **POST /login**
    -   Authenticate a user and return a token.
        

#### **Test Record Management**
3.  **POST /upload**
    -   Upload a test record (file or manual entry).        
4.  **GET /results**
    -   Retrieve all test records for the authenticated user.      
5.  **GET /results/:id**
    -   Retrieve details of a specific test record.
        

#### **Sharing**
6.  **GET /share/:id**
    -   Retrieve a public view of a test record.

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
