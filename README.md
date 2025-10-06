<a id="top"></a>

[![Issues][issues-shield]][issues-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Contributors][contributors-shield]][contributors-url]

<br />

<!-- LOGO -->

<div align="center">

  <a href="https://project-7-hattah-application-uf58.vercel.app/">
    <img src="https://res.cloudinary.com/djudpwhsa/image/upload/v1759128020/logo_fsc9r8.png" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Hattah</h3>

  <p align="center">
    Hattah is an e-commerce marketplace featuring a customer-facing shop for browsing and buying products, alongside a user dashboard for managing inventory, tracking sales, and analyzing product performance.
    <br />
    <a href="https://github.com/arsh-sengar-github/project_7_hattah_application">
    <strong>Explore Documents »</strong>
    </a>
    <br />
    <br />
    <a href="https://project-7-hattah-application-uf58.vercel.app/">View Demonstration</a>
    &middot;
    <a href="https://github.com/arsh-sengar-github/project_7_hattah_application/issues/new?labels=bug&template=bug-report---.md">Report a Bug</a>
    &middot;
    <a href="https://github.com/arsh-sengar-github/project_7_hattah_application/issues/new?labels=enhancement&template=feature-request---.md">Request a Feature</a>
  </p>

</div>

<!-- CONTENTS -->

<details>

  <summary>Contents</summary>

  <ol>
  
  <li>
  <a href="#acknowledgment">Acknowledgment</a>
  </li>
    <li>
      <a href="#about">About</a>
      <ul>
        <li>
        <a href="#technologies">Technologies</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#start">Start</a>
      <ul>
        <li>
        <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
        <a href="#installation">Installation</a>
        </li>
      </ul>
    </li>
    <li>
    <a href="#usage">Usage</a>
    </li>
    <li>
    <a href="#contribution">Contribution</a>
    </li>
    <li>
    <a href="#contact">Contact</a>
    </li>

  </ol>

</details>

<!-- ACKNOWLEDGMENT -->

## Acknowledgment

Special thanks to the tools, libraries, and communities that made **Hattah** possible:

- [Next.js](https://nextjs.org/) — for powering the frontend and backend seamlessly.
- [Shadcn/UI](https://ui.shadcn.com/) — for beautiful, customizable UI components.
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) — for reliable, flexible database management.
- [Cloudinary](https://cloudinary.com/) — for effortless media storage and delivery.
- [Razorpay](https://razorpay.com/) — for smooth and secure payment integration.
- [Redux Toolkit](https://redux-toolkit.js.org/) & [TanStack Query](https://tanstack.com/query/latest) — for efficient state and data management.
- [Vercel](https://vercel.com/) — for frictionless deployment and hosting.
- All open-source maintainers and contributors whose libraries made this project shine.

---

<p align="right">
(<a href="#top">back to top</a>)
</p>

---

<!-- ABOUT -->

## About

[![Screen Shot][screenshot]](https://www.figma.com/design/jOEdCnuwaQRmBE4N8CalmJ/Hattah?node-id=0-1&t=bKynE38B67B50ySj-1)

---

## 🛍️ About Hattah

**Hattah** is a full-featured, modern **e-commerce web application** built using the latest web technologies, designed to deliver a seamless and engaging shopping experience for both customers and administrators. The platform emphasizes performance, scalability, and a polished user interface while maintaining secure authentication and efficient backend data handling.

The application features a fully functional **frontend, backend, and admin control panel**, all integrated under one ecosystem. Every part of Hattah — from product browsing and filtering to checkout and order management — has been carefully implemented with attention to user experience, functionality, and responsiveness across all devices.

### 🌐 Universal Pages

- **Home:**
  The landing page provides an immersive shopping experience with four dynamic **sliders**, two promotional **banners**, and a **featured products** section showcasing selected items. It also includes another banner to highlight offers, a **reviews section** for customer feedback, and a **services grid** highlighting benefits such as _Exclusive Discounts, Fast & Reliable Shipping, Hassle-Free Returns, and 24/7 Customer Support_.
  Universal elements like the **Top Navigation Bar** (with Logo, Home, About, Shop, Contact, Search, Cart, and Auth options) and the **Footer Bottom Bar** (with brand logo, quick links, services, and contact info) appear across the entire site, maintaining consistency and ease of navigation.

- **About:**
  A dedicated informational page providing details about the brand’s mission, story, and commitment to quality service.

- **Shop:**
  A dynamic catalog view featuring advanced **filters** (Category, Color, Size, Price, Sorting options like Default, Ascending, Descending, and Price-based). Products are displayed in a grid layout with pagination and sorting controls.

- **Contact:**
  A straightforward **contact form** allowing users to send inquiries or feedback directly.

- **Privacy Policy** and **Terms & Conditions:**
  Static content pages that ensure transparency and compliance, clearly outlining data use and user responsibilities.

- **Product Page:**
  Detailed view of each product featuring a **carousel**, main display image, and full product details including name, ratings (stars and count), short description, and selectable attributes (color, size, quantity).
  It includes **Add to Cart** functionality, an extended **description tab**, and a **review system** showing average ratings, review breakdowns, and a form to submit new reviews.

- **Cart:**
  Displays all added items in a structured **table view** with real-time updates. A **summary panel** shows MRP, discounts, and final total, along with buttons for **Checkout** and **Continue Shopping**.

- **Checkout:**
  A secure page to finalize purchases, containing fields for user information (Name, Email, Phone, Address, Special Instructions), an order summary, and the option to apply **coupon codes** for extra discounts.

---

### 👮 Authentication Pages

- **Register:**
  Users can create accounts using a clean interface with input fields for name, email, password, and password confirmation. Includes links for login redirection.

- **Login:**
  A simple yet secure login interface that includes links for registration and password recovery.

- **Verify (OTP):**
  After registration or password reset, users verify their accounts using a **One-Time Password**, with the option to **resend OTP** if needed.

---

### 🧑🏻 User Dashboard

- **Dashboard Overview:**
  Displays user statistics such as total orders, cart items, and order history.

- **Profile:**
  A profile card shows the user’s avatar, name, phone number, and address, allowing easy management of personal details.

- **History:**
  A table view displaying past orders with relevant details like date, status, and amount.

Each user feature — from password recovery to checkout — is backed by **fully functional APIs**, ensuring reliable, real-time data flow throughout the system.

---

### 🤴🏻 Administrator Dashboard

The admin dashboard provides powerful control over the store’s content and data. It features a modern **side navigation bar** and **top bar** for easy management.

- **Dashboard Overview:**
  Displays key statistics such as the total number of **Categories, Products, Orders, and Customers**. Includes tools for adding categories, products, coupons, and uploading media.
  Interactive **Bar Charts** show order statistics over time, while **Doughnut Charts** visualize order statuses. Tables list recent orders and customer reviews for quick insight.

- **Category, Product, Variant, Coupon Management:**
  Dedicated pages for **Add** and **All** views, each equipped with dynamic forms and data tables.

- **Orders & Customers:**
  Detailed views of all orders and registered customers, allowing administrators to manage and track business operations effectively.

- **Review & Media Management:**
  Review moderation tools and integrated media handling via **Cloudinary** ensure efficient content control.

Every admin route and operation is fully protected by role-based authentication, ensuring only authorized users can access sensitive functionality.

---

<p align="right">
(<a href="#top">back to top</a>)
</p>

---

### ⚙️ Technologies

This project was built using a modern, full-stack web development ecosystem that combines performance, scalability, and user experience. Below are the key frameworks, libraries, and services that power **Hattah**:

- [![Next][Next.js]][Next-url]
- [![Shadcn][Shadcn.ui]][Shadcn-url]
- [![MongoDB][MongoDB]][MongoDB-url]
- [![Mongoose][Mongoose]][Mongoose-url]
- [![Redux][Redux]][Redux-url]
- [![TanStack][TanStack]][TanStack-url]
- [![MaterialUI][MaterialUI]][MaterialUI-url]
- [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
- [![Cloudinary][Cloudinary]][Cloudinary-url]
- [![Razorpay][Razorpay]][Razorpay-url]
- [![Axios][Axios]][Axios-url]
- [![React Toastify][ReactToastify]][ReactToastify-url]
- [![Zod][Zod]][Zod-url]
- [![CKEditor][CKEditor]][CKEditor-url]

---

| Category                        | Technologies                                                  |
| ------------------------------- | ------------------------------------------------------------- |
| **Framework & Core**            | Next.js, React, MongoDB, mongoose                             |
| **UI & Components**             | Shadcn/ui, MUI, Emotion, Material React Table                 |
| **State Management**            | Redux, Redux Persist, TanStack Query, TanStack Query Devtools |
| **Validation & Utilities**      | zod, slugify, dayjs, fuse.js, entities, faker-js              |
| **API & Requests**              | axios                                                         |
| **Authentication & Security**   | bcryptjs, jose                                                |
| **Email & Communication**       | nodemailer                                                    |
| **Media & Storage**             | Cloudinary, react-dropzone                                    |
| **Payments**                    | Razorpay                                                      |
| **Rich Text & Interactivity**   | CKEditor, react-slick, slick-carousel                         |
| **Notifications**               | react-toastify                                                |
| **Data Export & Visualization** | export-to-csv                                                 |
| **Icons & Styling**             | React Icons, Tailwind CSS                                     |
| **Deployment**                  | Vercel                                                        |

---

<p align="right">
(<a href="#top">back to top</a>)
</p>

---

<!-- START -->

## Start

Follow these simple steps to set up the **Hattah** application locally for development and testing purposes.
You’ll have a fully functional version of the app — frontend, backend, and database — running on your machine.

---

<p align="right">
(<a href="#top">back to top</a>)
</p>

---

### 📋 Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version ≥ 18.x recommended)
  [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (local instance or Atlas cloud database)
  [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **Cloudinary** account (for media upload & storage)
  [Cloudinary](https://cloudinary.com/)
- **Razorpay** account (for payment integration)
  [Razorpay](https://razorpay.com/)
- A code editor like **VS Code**

---

### 📥 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/arsh-sengar-github/project_7_hattah_application.git
   ```

2. **Navigate into the project directory**

   ```bash
   cd project_7_hattah_application
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. **Create your environment file**

   > Duplicate the `.env.example` file (if available) or create a new file named `.env.local` in the project root.

   ```bash
   NODE_ENV="development"

   # Base URLs
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"

   # MongoDB
   MONGODB_URI="your_mongodb_connection_string"

   # JWT / Security
   SECRET_KEY="your_secret_key"

   # Nodemailer (for sending OTPs and password resets)
   NODEMAILER_HOST="smtp.gmail.com"
   NODEMAILER_PORT="587"
   NODEMAILER_EMAL_ADDRESS="your_email@gmail.com"
   NODEMAILER_PASSWORD="your_app_specific_password"

   # Cloudinary (for media upload)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   NEXT_PUBLIC_CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_upload_preset"

   # Razorpay (for payments)
   NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
   RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

6. **Open the app**
   Visit [http://localhost:3000](http://localhost:3000) to view **Hattah** in your browser.

---

### ⭐ Tips

- For best results, ensure your **MongoDB** and **Cloudinary** credentials are valid before running the app.
- To build for production:

  ```bash
  npm run build
  npm start
  ```

- All admin-related routes are protected — make sure to register and promote a user as admin manually in your database for access.

---

<p align="right">
(<a href="#top">back to top</a>)
</p>

---

<!-- USAGE -->

## Usage

Once your development server is running, you can explore **Hattah** through the following routes and dashboards:

### 🌐 Public Pages

| Page                   | Path                    | Description                                                                              |
| ---------------------- | ----------------------- | ---------------------------------------------------------------------------------------- |
| **Home**               | `/`                     | Showcases sliders, banners, featured products, customer reviews, and service highlights. |
| **About**              | `/about`                | Introduces Hattah’s mission, values, and brand story.                                    |
| **Shop**               | `/shop`                 | Browse products by category, color, size, and price with advanced sorting and filters.   |
| **Contact**            | `/contact`              | Contact form for customer inquiries and feedback.                                        |
| **Privacy Policy**     | `/privacy-policy`       | Learn how Hattah manages user data securely.                                             |
| **Terms & Conditions** | `/terms-and-conditions` | Legal and service guidelines for the platform.                                           |
| **Product Details**    | `/product/[slug]`       | View images, descriptions, ratings, and reviews for each product.                        |
| **Cart**               | `/cart`                 | Manage selected items, update quantities, and proceed to checkout.                       |
| **Checkout**           | `/checkout`             | Finalize orders, apply coupons, and process payments through Razorpay.                   |

---

### 👮‍♂️ Authentication Pages

| Page                | Path              | Description                                          |
| ------------------- | ----------------- | ---------------------------------------------------- |
| **Register**        | `/register`       | Create a new user account.                           |
| **Login**           | `/login`          | Access your existing account.                        |
| **Verify**          | `/verify`         | Submit one-time passwords for secure authentication. |
| **Forgot Password** | `/reset-password` | Reset your password via email OTP.                   |

---

### 🧑🏻 User Dashboard Pages

Accessible after login via `/dashboard`.

| Section       | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| **Dashboard** | Overview of total orders, cart items, and purchase history. |
| **Profile**   | Update avatar, name, phone number, and address.             |
| **History**   | View detailed order history and statuses.                   |

---

### 🤴🏻 Admin Dashboard Pages

Accessible only to administrators via `/admin/dashboard`.

| Section                             | Description                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| **Dashboard**                       | Summary of categories, products, orders, and customers with charts and statistics. |
| **Categories / Products / Coupons** | Add, edit, or remove entities via structured tables and modals.                    |
| **Orders & Reviews**                | Manage customer orders and feedback.                                               |
| **Media**                           | Upload, view, and delete product or banner assets stored on Cloudinary.            |
| **Theme & Mode Switch**             | Toggle between light, dark, and system modes.                                      |

---

### 💳 Payment Workflow

- **Razorpay** integration enables secure and real-time online transactions.
- Coupons and discounts are dynamically applied at checkout.
- Orders are confirmed via backend API and persisted in MongoDB.

---

### 🤖 Toasts, Loaders, and Validations

- User-friendly **toasts** via `react-toastify` for all feedback and error messages.
- Input validation powered by **Zod** ensures all forms are secure and reliable.
- Loading and data-fetching handled with **Tanstack Query** and **Redux Persist**.

---

<p align="right">
(<a href="#top">back to top</a>)
</p>

---

<!-- CONTRIBUTION -->

## Contribution

Contributions are what make the open-source community such an inspiring space to **learn**, **collaborate**, and **create**.
Any contributions you make to **Hattah** are **deeply appreciated** — whether it’s improving the UI, optimizing backend logic, or suggesting new features!

If you have an idea to make this project even better, feel free to **fork** the repository and submit a **pull request**.
Alternatively, you can simply open an **issue** with the label `enhancement`.

And of course — don’t forget to ⭐ **star the repo** if you like what you see!

---

### ❓ How to Contribute

1. **Fork** the Project
2. **Create your Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your Changes**

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

---

### 👨‍💻 Top Contributors

<a href="https://github.com/arsh-sengar-github/project_7_hattah_application/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=arsh-sengar-github/project_7_hattah_application" alt="Contributors Graph" />
</a>

---

<p align="right">
(<a href="#top">back to top</a>)
</p>

---

<!-- CONTACT -->

## Contact

**Project Maintainer:** [Arsh Sengar](https://github.com/arsh-sengar-github)

📧 **Email:** [arshsengar.academic@gmail.com](mailto:arshsengar.academic@gmail.com)

📁 **Repository:** [https://github.com/arsh-sengar-github/project_7_hattah_application](https://github.com/arsh-sengar-github/project_7_hattah_application)

🌐 **Application:** [https://project-7-hattah-application-uf58.vercel.app](https://project-7-hattah-application-uf58.vercel.app)

If you have any questions, feedback, or suggestions, feel free to reach out!
Collaboration and constructive ideas are always welcome. 💡

---

<p align="right">
(<a href="#top">back to top</a>)
</p>

---

<!-- Badge Definitions -->

[issues-shield]: https://img.shields.io/github/issues/arsh-sengar-github/project_7_hattah_application.svg?style=for-the-badge
[issues-url]: https://github.com/arsh-sengar-github/project_7_hattah_application/issues
[forks-shield]: https://img.shields.io/github/forks/arsh-sengar-github/project_7_hattah_application.svg?style=for-the-badge
[forks-url]: https://github.com/arsh-sengar-github/project_7_hattah_application/network/members
[stars-shield]: https://img.shields.io/github/stars/arsh-sengar-github/project_7_hattah_application.svg?style=for-the-badge
[stars-url]: https://github.com/arsh-sengar-github/project_7_hattah_application/stargazers
[contributors-shield]: https://img.shields.io/github/contributors/arsh-sengar-github/project_7_hattah_application.svg?style=for-the-badge
[contributors-url]: https://github.com/arsh-sengar-github/project_7_hattah_application/graphs/contributors
[screenshot]: https://res.cloudinary.com/djudpwhsa/image/upload/v1759729252/demonstration_zx6fnz.png
[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Shadcn.ui]: https://img.shields.io/badge/shadcn/ui-111111?style=for-the-badge&logo=react&logoColor=61DAFB
[Shadcn-url]: https://ui.shadcn.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Mongoose]: https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white
[Mongoose-url]: https://mongoosejs.com/
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[TanStack]: https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white
[TanStack-url]: https://tanstack.com/query/latest
[MaterialUI]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MaterialUI-url]: https://mui.com/
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Cloudinary]: https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white
[Cloudinary-url]: https://cloudinary.com/
[Razorpay]: https://img.shields.io/badge/Razorpay-0C90E7?style=for-the-badge&logo=razorpay&logoColor=white
[Razorpay-url]: https://razorpay.com/
[Axios]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[Axios-url]: https://axios-http.com/
[ReactToastify]: https://img.shields.io/badge/React--Toastify-FF9800?style=for-the-badge&logo=react&logoColor=white
[ReactToastify-url]: https://fkhadra.github.io/react-toastify/
[Zod]: https://img.shields.io/badge/Zod-3068D2?style=for-the-badge&logo=zod&logoColor=white
[Zod-url]: https://zod.dev/
[CKEditor]: https://img.shields.io/badge/CKEditor-1D6FB8?style=for-the-badge&logo=ckeditor&logoColor=white
[CKEditor-url]: https://ckeditor.com/
