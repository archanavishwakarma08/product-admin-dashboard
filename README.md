# Product Admin Dashboard

A responsive product administration dashboard built with Next.js, React, TypeScript, Tailwind CSS, Axios, and the DummyJSON API.

The application provides authentication and a complete product management interface with product listing, search, filtering, sorting, pagination, product details, and CRUD operations.

## Features

### Authentication

- Login using DummyJSON authentication API
- Form validation
- Authentication error handling
- Protected product routes
- Prevents duplicate login submissions
- Logout support with redirect to the login page

### Product Management

- Product listing
- Product details
- Add product
- Edit product
- Delete product
- Delete confirmation
- Form validation
- Local UI updates after CRUD operations

### Search

- Product search using DummyJSON search API
- 500ms debounce
- Search state stored in URL
- Resets pagination when a new search is performed
- AbortController used to prevent stale search responses

### Filtering

- Category filtering
- Categories loaded dynamically from the API
- Search and category filtering are mutually exclusive

### Sorting

Products can be sorted by:

- Price
- Rating
- Title

Both ascending and descending order are supported.

### Pagination

- API-based pagination using `limit` and `skip`
- Previous/Next controls
- Numbered page navigation
- Page size options:
  - 10
  - 20
  - 50

- Displays the current item range and total product count

### Responsive Design

- Desktop product table
- Mobile product cards
- Responsive search, filter, sorting, and pagination controls

### Error & Loading States

- Loading states
- Empty states
- API error handling
- Retry functionality
- Invalid product ID handling

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- DummyJSON API
- ESLint

---

## API

This project uses the DummyJSON API for:

- Authentication
- Products
- Product search
- Categories
- Product details
- Product CRUD simulation

API documentation:

https://dummyjson.com/docs

---

## Login Credentials

Use the following DummyJSON test credentials:

```text
Username: emilys
Password: emilyspass
```

---

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/archanavishwakarma08/product-admin-dashboard.git
```

Navigate to the project directory:

```bash
cd product-admin-dashboard
```

Install dependencies:

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## Available Scripts

### Development

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

## Project Structure

```text
product-admin-dashboard/
│
├── app/
│   ├── login/
│   │   └── page.tsx
│   ├── products/
│   │   └── page.tsx
│   └── page.tsx
│
├── components/
│   └── products/
│       ├── ProductPagination.tsx
│       ├── ProductSearch.tsx
│       ├── ProductTable.tsx
│       └── ProductsList.tsx
│
├── context/
│   └── AuthContext.tsx
│
├── hooks/
│
├── lib/
│   └── axios.ts
│
├── services/
│   ├── authService.ts
│   └── productService.ts
│
├── types/
│   └── product.ts
│
├── utils/
│
├── middleware.ts
├── package.json
├── tsconfig.json
├── next.config.ts
└── readme.md
```

---

## Application Flow

1. User opens the application.
2. User logs in using the provided DummyJSON test credentials.
3. Authentication state is managed through `AuthContext`.
4. Protected routes prevent unauthenticated access to the product dashboard.
5. Products are fetched through the service layer using Axios.
6. Users can search, filter, sort, and paginate products.
7. Product details can be viewed individually.
8. Users can add, edit, and delete products.
9. API request cancellation helps prevent stale search results.
10. User can log out and is redirected to the login page.

---

## Error Handling

The application handles common API and UI states including:

- Loading state
- Empty results
- API errors
- Retry functionality
- Invalid product IDs
- Cancelled API requests

---

## Responsive Behavior

The dashboard adapts to different screen sizes.

- Desktop: Product data is displayed in a table.
- Mobile: Product data is displayed using responsive product cards.
- Search, filtering, sorting, and pagination controls are responsive.

---

## Repository

GitHub Repository:

https://github.com/archanavishwakarma08/product-admin-dashboard
