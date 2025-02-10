# ✓ _discloser_ 

## Overview

**_discloser_** is a web application designed to help users manage and share their sexual health information securely. It enables users to track STI test results, set automated testing reminders, and access basic educational resources, all while maintaining privacy and promoting informed consent.

### Problem Space

Sexual health conversations and STI status sharing can be awkward, inconsistent, and sometimes avoided altogether. Current methods of sharing test results often involve showing private medical documents that contain sensitive personal information beyond what's necessary. Additionally, many people struggle with maintaining regular testing schedules and notifying previous partners when necessary.

**Key issues:**
- Difficulty in sharing STI test results while protecting privacy.  
- Lack of streamlined tools for managing and viewing test results.  
- Inconsistent testing schedules due to lack of reminders.  

### User Profile

**Primary users include:**

**Primary users include:**
- Sexually active adults seeking to manage their sexual health information.  
- People wanting to share test results with potential partners.  
- Users needing reminders for regular STI testing.  
- Individuals looking for discreet ways to notify partners.  

### Features

### **Test Record Management**
- Upload and store test results (file or manual entry).  
- View anonymized test results.  
- Generate shareable links for results.  

### **Automated Testing Reminders**
- Set testing schedules (e.g., every 3 months, 6 months, 1 year).  
- Receive email reminders when it’s time to test.  
- Mark reminders as completed or reschedule them.  

### **Basic Educational Content**
- Static educational resources for sexual health. 

## Implementation

### **Frontend**
- React
- JavaScript

#### **Key Libraries**
- react-hook-form
- axios  
- html2canvas

---

### **Backend**
- Node.js
- Express
- MySQL
- MinIO

  
#### **Key Libraries**
- Knex.js
- multer
- pdf-parse
- node-cro
- nodemailer
- helmet


### APIs

No external APIs will be used for this MVP

### Sitemap

**Public**

#### **Public**
- Landing (`/`)  

#### **Protected**
- Dashboard (`/dashboard`)  
  - Recent results  
  - Upload new results  
  - Set testing reminders  
- Result View (`/results/:id`)  
  - View details  
  - Generate shareable link  
- Share Page (`/share/:id`)  
  - Public view of shared result  

### Mockups

![landing-page](https://github.com/user-attachments/assets/e48e9f8a-d2a2-49e0-9708-186c7315ac09)
![authentication](https://github.com/user-attachments/assets/cc2447f6-ba11-4c37-811f-1246534374ed)
![dashboard](https://github.com/user-attachments/assets/12ac61b7-404b-4904-b0a7-ac5acfc3260c)
![single-test-detail](https://github.com/user-attachments/assets/d24dd61b-dd2b-4a15-8653-56fcfaad8b43)
![share-results](https://github.com/user-attachments/assets/c949854b-68cb-4d9e-b371-e98d68504d75)
![education-content](https://github.com/user-attachments/assets/ff57bb25-33b4-48ae-a3b8-f898cb0c0939)




### Data

#### **Entities**
1. **User**:  
   - `id`, `email`, `created_at`, `updated_at`.  

2. **TestRecord**:  
   - `id`, `user_id`, `test_date`, `file_path` (MinIO file URL or key), `created_at`, `updated_at`.  

3. **TestResult**:  
   - `id`, `test_record_id`, `test_type`, `result`, `notes`, `created_at`, `updated_at`.  

4. **TestingReminders**:  
   - `id`, `user_id`, `frequency`, `next_test_date`, `last_notified_date`, `created_at`, `updated_at`.  

#### **Relationships**
- **User** → **TestRecord** (One-to-Many).  
- **TestRecord** → **TestResult** (One-to-Many).  
- **User** → **TestingReminders** (One-to-One).  


### Endpoints

#### **Test Record Management**
1. **POST /upload**:  
   - Upload a test record (file or manual entry).  

2. **GET /results**:  
   - Retrieve all test records for the authenticated user.  

3. **GET /results/:id**:  
   - Retrieve details of a specific test record.  

#### **Automated Testing Reminders**
4. **POST /reminders**:  
   - Set or update a user’s testing schedule.  

5. **GET /reminders**:  
   - Retrieve the user’s current reminder settings.  

6. **POST /reminders/complete**:  
   - Mark a reminder as completed and schedule the next one.  

## Roadmap
---

#### **Week 1: February 10 - February 16**
**Focus**: Backend setup, core functionality, and database integration.

| **Day**       | **Tasks**                                                                 |
|---------------|---------------------------------------------------------------------------|
| **Feb 10**    | - Finalize proposal and project setup. <br> - Set up backend (Node.js, Express, MySQL). <br> - Initialize Knex.js for database migrations. |
| **Feb 11**    | - Create database schema (Users, TestRecords, TestResults, TestingReminders). <br> - Implement file upload functionality with MinIO. |
| **Feb 12**    | - Build API endpoints for test record management (`/upload`, `/results`, `/results/:id`). <br> - Test file upload and retrieval. |
| **Feb 13**    | - Implement automated testing reminders (new table, API endpoints). <br> - Set up cron job for sending email reminders. |
| **Feb 14**    | - Begin PDF parsing: Research and test `pdf-parse` for text extraction. <br> - Identify common patterns in lab PDFs (e.g., test names, results, dates). |
| **Feb 15**    | - Build frontend components for uploading and viewing test records. <br> - Connect frontend to backend API. |
| **Feb 16**    | - Implement reminder settings form on the frontend. <br> - Connect reminder functionality to backend API. |

---

#### **Week 2: February 17 - February 23**
**Focus**: PDF parsing, frontend polish, and deployment.

| **Day**       | **Tasks**                                                                 |
|---------------|---------------------------------------------------------------------------|
| **Feb 17**    | - Continue PDF parsing: Develop logic to extract test names, results, and dates from different PDF structures. <br> - Test with sample PDFs from various labs. |
| **Feb 18**    | - Build frontend components to display parsed PDF data. <br> - Add functionality to edit or confirm extracted data. |
| **Feb 19**    | - Implement basic educational content (static pages). <br> - Add shareable link generation for test results. |
| **Feb 20**    | - Test all features (file upload, reminders, PDF parsing). <br> - Fix bugs and optimize performance. |
| **Feb 21**    | - Add error handling and user feedback (e.g., success/error messages). <br> - Polish UI/UX (responsive design, styling). |
| **Feb 22**    | - Conduct final testing and debugging. <br> - Deploy the app|

---


## Future Implementations

### User Management:

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
