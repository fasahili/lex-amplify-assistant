# 🤖 Lex Amplify Assistant – Serverless AI Chatbot on AWS

Lex Amplify Assistant is a **full-stack serverless chatbot application** built using **React**, **Amazon Lex V2**, and **AWS Amplify**. It enables authenticated users to chat with a bot, execute AWS tasks (like listing EC2 instances or fetching S3 buckets), and view their personalized chat history stored in **DynamoDB**.

---

## 📌 Features

- 🔐 **Cognito Authentication** (Sign up / Sign in)
- 💬 **Chatbot UI** built with React + Amplify
- 🤖 **Amazon Lex V2** integration
- 🧠 **Lambda fulfillment** for AWS commands:
  - `List EC2 Instances`
  - `Start / Stop EC2 Instance`
  - `Describe VPCs`
  - `List S3 Buckets`
- 🗂 **DynamoDB logging** of messages per user
- 🕓 **Chat history** view with delete option
- 🧾 **Command menu** to guide users on how to interact
- 🌐 **Deployed with Amplify Hosting + CI/CD**

---

## 🧠 Architecture

```

React (Frontend) ←→ Amazon Lex V2 ←→ AWS Lambda ←→ AWS Services
↑
Cognito Auth via Amplify
↑
Chat Logs to DynamoDB

```

---

## 🚀 Technologies Used

| Category     | Services & Tools                       |
|--------------|----------------------------------------|
| Frontend     | React, Amplify UI Authenticator        |
| Auth         | Amazon Cognito                         |
| Chatbot      | Amazon Lex V2                          |
| Functions    | AWS Lambda                             |
| Storage      | Amazon DynamoDB                        |
| Deployment   | AWS Amplify (Hosting + CI/CD)          |
| Styling      | CSS Modules                            |

---

## 🛠 Project Structure

```

frontend/
├── components/         # React Components (Chat, History, Menu)
├── style/              # Component CSS files
├── App.jsx             # Root layout with Auth and Navigation
├── amplify/            # Amplify config
├── aws-exports.js      # Auto-generated Amplify config
└── index.js            # Entry point

````

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/lex-amplify-assistant.git
cd frontend
npm install
````

### 2. Configure Amplify CLI

```bash
amplify configure
amplify init
```

### 3. Add Auth & Hosting

```bash
amplify add auth
amplify add hosting
amplify push
```

### 4. Connect to Lex & Lambda

* Create a Lex bot (with intents like `ListEC2InstancesIntent`, `StopEC2InstanceIntent`, etc.)
* Add a Lambda function to fulfill Lex requests
* Attach `AmazonLexFullAccess` to your `amplify-*-authRole`

### 5. Run locally

```bash
npm run start
```

---

## ✅ Sample Lex Utterances

| Intent             | Example Inputs                |
| ------------------ | ----------------------------- |
| `ListEC2Instances` | "list my ec2 instances"       |
| `StartEC2Instance` | "start instance i-0abc123456" |
| `StopEC2Instance`  | "stop instance i-0abc123456"  |
| `DescribeVPCs`     | "show my VPCs"                |
| `ListS3Buckets`    | "get all S3 buckets"          |

---

## 📂 Environment Variables

No `.env` file needed — all configs handled via `aws-exports.js` from Amplify CLI.

---

## 💡 UX Features

* Copy-to-clipboard command menu
* Scrollable chat history with timestamps
* Styled alerts via `SweetAlert2`
* Chat typing animation indicator
* Responsive design

---

## 📌 Known Issues

* Make sure the correct IAM Role has `lex:RecognizeText` permission
* If user pool is deleted, re-run `amplify pull` or `amplify update auth`

---
