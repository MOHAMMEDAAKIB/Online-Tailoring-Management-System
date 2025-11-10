# UI Design Overview - Online Tailoring Management System

## 📋 Table of Contents
- [Overview](#overview)
- [Design Principles](#design-principles)
- [Color Scheme & Branding](#color-scheme--branding)
- [Navigation Architecture](#navigation-architecture)
- [Page Specifications](#page-specifications)
- [Component Library](#component-library)
- [Responsive Design](#responsive-design)
- [User Flows](#user-flows)

---

## Overview

The UI consists of **3 main sections**:
1. **Public Section** - Marketing and authentication (7 pages)
2. **Customer Portal** - Order management and profile (10 pages)
3. **Admin Dashboard** - Business management (14 pages)

**Total Pages**: ~31 pages  
**Tech Stack**: React (Vite) + Tailwind CSS + Shadcn/ui  
**State Management**: React Context + React Query  
**Routing**: React Router v6

---

## Design Principles

### 🎨 Core Principles
- **Mobile-First**: Optimized for smartphone users (primary customer access)
- **Clean & Professional**: Trustworthy tailoring business aesthetic
- **Fast & Responsive**: Quick load times, optimistic UI updates
- **Accessible**: WCAG 2.1 AA compliant
- **Intuitive**: Minimal learning curve for non-technical users

### 🎯 User Experience Goals
- **For Customers**: Easy order placement, measurement submission, and payment
- **For Admin**: Quick order management, customer overview, and billing
- **For Both**: Clear status updates and communication

---

## Color Scheme & Branding

### Primary Palette
```css
--primary: #1E40AF        /* Royal Blue - Trust & Professionalism */
--primary-light: #3B82F6  /* Lighter Blue */
--primary-dark: #1E3A8A   /* Darker Blue */

--secondary: #F59E0B      /* Amber - Creativity & Craft */
--secondary-light: #FBBF24
--secondary-dark: #D97706

--accent: #8B5CF6         /* Purple - Premium Feel */

--success: #10B981        /* Green - Completed Orders */
--warning: #F59E0B        /* Orange - Pending Actions */
--error: #EF4444          /* Red - Issues/Overdue */
--info: #3B82F6           /* Blue - Information */

--neutral-50: #F9FAFB     /* Background */
--neutral-100: #F3F4F6    /* Secondary Background */
--neutral-900: #111827    /* Text */
```

### Typography
- **Headings**: Inter or Poppins (Bold, 600-700 weight)
- **Body**: Inter or Open Sans (Regular, 400 weight)
- **Accent**: Playfair Display (for landing page elegance)

---

## Navigation Architecture

### 1️⃣ Public Navigation (Before Login)

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Home  Services  Gallery  Track Order  Contact  │
│                                    [Login]  [Sign Up] ←  │
└─────────────────────────────────────────────────────────┘
```

**Pages:**
1. **Landing Page** (`/`)
2. **Services** (`/services`)
3. **Gallery** (`/gallery`)
4. **Track Order** (`/track-order`)
5. **About/Contact** (`/about`, `/contact`)
6. **Login** (`/login`)
7. **Register** (`/register`)

**Additional Pages:**
- Email Verification (`/verify-email/:token`)
- Password Reset Request (`/forgot-password`)
- Password Reset Confirm (`/reset-password/:token`)

---

### 2️⃣ Customer Portal Navigation

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Dashboard  Orders  Measurements  Profile        │
│                           [🔔 Notifications]  [Avatar] ↓ │
└─────────────────────────────────────────────────────────┘

Avatar Dropdown:
├─ Profile Settings
├─ Help & Support
├─ Terms & Privacy
└─ Logout
```

**Desktop Sidebar Navigation:**
```
┌─────────────────┐
│  [Logo]         │
│                 │
│  📊 Dashboard   │
│  📦 My Orders   │
│  📏 Measurements│
│  👤 Profile     │
│  🔔 Notifications│
│  ❓ Help        │
│  ⚙️  Settings   │
│                 │
│  🚪 Logout      │
└─────────────────┘
```

**Mobile Bottom Navigation:**
```
┌─────────────────────────────────────────────────┐
│  [🏠 Home] [📦 Orders] [➕ New] [🔔] [👤 Me]   │
└─────────────────────────────────────────────────┘
```

**Customer Pages (10 Pages):**

1. **Dashboard** (`/customer/dashboard`)
   - Summary cards: Active orders, pending payments, saved measurements
   - Recent order history
   - Quick actions: Place new order, update measurements

2. **My Orders** (`/customer/orders`)
   - List view with filters (status, date range)
   - Search by order ID
   - Status badges (Pending, In Progress, Ready, Completed)

3. **Order Details** (`/customer/orders/:orderId`)
   - Order timeline visualization
   - Items list with measurements used
   - Bill/Invoice download
   - Payment status
   - Chat/notes section

4. **Place New Order** (`/customer/orders/new`)
   - Multi-step form:
     - Step 1: Select garment type
     - Step 2: Choose measurements
     - Step 3: Fabric & customization
     - Step 4: Delivery date & notes
     - Step 5: Review & submit

5. **My Measurements** (`/customer/measurements`)
   - Card view of all measurement profiles
   - Add new measurement set
   - Edit/delete existing

6. **Measurement Form** (`/customer/measurements/new`, `/customer/measurements/:id/edit`)
   - Visual body diagram
   - Input fields for all measurements
   - Unit selector (inches/cm)
   - Notes section

7. **Profile** (`/customer/profile`)
   - Personal info (name, email, phone, address)
   - Change password
   - Notification preferences

8. **Billing & Payments** (`/customer/billing`)
   - Invoice list
   - Payment history
   - Download receipts
   - Make payment button

9. **Notifications** (`/customer/notifications`)
   - List of all notifications
   - Filter by type (order updates, payment, promotional)
   - Mark as read/unread

10. **Help & Support** (`/customer/help`)
    - FAQ accordion
    - Contact form
    - Live chat widget

---

### 3️⃣ Admin Dashboard Navigation

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Dashboard  Orders  Customers  Billing          │
│                    [🔍 Search]  [🔔]  [Admin Avatar] ↓  │
└─────────────────────────────────────────────────────────┘
```

**Desktop Sidebar (Expanded):**
```
┌──────────────────────────┐
│  [Logo] Tailor Admin     │
│                          │
│  📊 Dashboard            │
│                          │
│  📋 ORDERS               │
│    ├─ All Orders         │
│    ├─ Create New         │
│    └─ Calendar View      │
│                          │
│  👥 CUSTOMERS            │
│    ├─ All Customers      │
│    └─ Measurements       │
│                          │
│  💰 FINANCE              │
│    ├─ Invoices           │
│    ├─ Payments           │
│    └─ Reports            │
│                          │
│  📦 INVENTORY            │
│                          │
│  🔔 NOTIFICATIONS        │
│                          │
│  ⚙️  SETTINGS            │
│                          │
│  🚪 Logout               │
└──────────────────────────┘
```

**Admin Pages (14 Pages):**

#### Dashboard & Analytics
1. **Admin Dashboard** (`/admin/dashboard`)
   - KPI Cards:
     - Total orders (this month)
     - Active orders
     - Pending payments
     - New customers
   - Charts:
     - Revenue trend (line chart)
     - Order status distribution (pie chart)
     - Popular garment types (bar chart)
   - Recent activity feed
   - Quick actions panel

#### Order Management (5 Pages)
2. **All Orders** (`/admin/orders`)
   - Data table with sorting & filtering
   - Columns: Order ID, Customer, Date, Status, Amount, Actions
   - Bulk actions: Update status, send notification
   - Export to CSV/PDF

3. **Create Order** (`/admin/orders/new`)
   - Wizard flow:
     - Step 1: Select/search customer
     - Step 2: Select measurements
     - Step 3: Add order items (garment type, quantity, fabric)
     - Step 4: Calculate pricing (subtotal, tax, discount)
     - Step 5: Set delivery date & notes
     - Step 6: Review & confirm

4. **Order Details** (`/admin/orders/:orderId`)
   - Full order information
   - Edit order items
   - Update status with reason/notes
   - View/edit measurements used
   - Generate invoice
   - Communication history with customer
   - Print order receipt

5. **Order Calendar** (`/admin/orders/calendar`)
   - Monthly/weekly calendar view
   - Orders shown by delivery date
   - Color-coded by status
   - Drag-and-drop to reschedule
   - Filter by customer or garment type

6. **Order Timeline View** (`/admin/orders/timeline`)
   - Kanban board: Pending → In Progress → Ready → Delivered
   - Drag-and-drop to update status
   - Quick view modal on click

#### Customer Management (3 Pages)
7. **All Customers** (`/admin/customers`)
   - Data table with search & filters
   - Columns: Name, Email, Phone, Total Orders, Last Order, Actions
   - Quick actions: View details, add order, send message
   - Export customer list

8. **Customer Details** (`/admin/customers/:customerId`)
   - Tabs:
     - Overview: Contact info, stats (total orders, revenue)
     - Orders: List of all orders
     - Measurements: All saved measurements
     - Communication: Message history
     - Notes: Internal admin notes

9. **Measurement Management** (`/admin/measurements`)
   - All customer measurements in one view
   - Filter by customer
   - Add/edit measurements for any customer
   - Compare measurements (version history)

#### Finance (3 Pages)
10. **Invoices** (`/admin/invoices`)
    - List of all invoices
    - Filter by paid/unpaid, date range
    - Generate invoice for orders
    - Download/print invoice (PDF)
    - Email invoice to customer

11. **Payments** (`/admin/payments`)
    - Payment transaction list
    - Status: Pending, Completed, Failed, Refunded
    - Match payments to orders
    - Manual payment entry
    - Payment gateway status

12. **Financial Reports** (`/admin/reports`)
    - Revenue reports (daily, weekly, monthly, yearly)
    - Customer lifetime value
    - Outstanding payments
    - Tax reports
    - Export options (PDF, Excel)

#### Additional Admin Pages
13. **Inventory Management** (`/admin/inventory`) *[Optional - Future]*
    - Fabric stock tracking
    - Low stock alerts
    - Add/remove inventory items
    - Supplier information

14. **Notifications Center** (`/admin/notifications`)
    - Send individual notifications
    - Send bulk notifications (filter by customer segment)
    - Notification templates
    - Delivery logs (email/SMS status)
    - Schedule notifications

15. **Settings** (`/admin/settings`)
    - Tabs:
      - **General**: Shop name, logo, contact info
      - **Payment Gateway**: Stripe/PayHere API keys
      - **Notifications**: Email SMTP, SMS provider (Twilio)
      - **Users**: Manage admin accounts
      - **Pricing**: Default pricing rules, tax rates
      - **Preferences**: Currency, date format, units

---

## Page Specifications

### 🏠 Landing Page (Public)

**Purpose**: Marketing & first impression

**Sections:**
1. **Hero Section**
   - Headline: "Custom Tailoring, Perfectly Fitted"
   - Subheading: Professional tailoring service description
   - CTA Buttons: "Get Started" (→ Register), "View Services"
   - Background: High-quality image of tailored suits

2. **Services Section**
   - Card grid: Men's wear, Women's wear, Alterations, Custom design
   - Each card: Icon, title, brief description, "Learn More"

3. **How It Works**
   - 4-step process with icons:
     1. Submit measurements
     2. Place order
     3. We craft your garment
     4. Delivery to your door

4. **Gallery/Portfolio**
   - Image carousel of completed work
   - Filter by category

5. **Testimonials**
   - Customer reviews with photos & ratings

6. **Pricing Highlights**
   - Starting prices for common items
   - "View Full Price List" button

7. **Contact Section**
   - Address, phone, email
   - Google Maps embed
   - Contact form

8. **Footer**
   - Quick links, social media, copyright

---

### 🔐 Authentication Pages

#### Login Page (`/login`)
```
┌─────────────────────────────────────┐
│         [Logo]                      │
│                                     │
│   Welcome Back!                     │
│                                     │
│   Email:    [________________]      │
│   Password: [________________]      │
│                                     │
│   [x] Remember me   Forgot password?│
│                                     │
│   [        Login Button        ]    │
│                                     │
│   ──────────── OR ────────────      │
│                                     │
│   Don't have an account? Sign Up    │
└─────────────────────────────────────┘
```

#### Register Page (`/register`)
```
┌─────────────────────────────────────┐
│         [Logo]                      │
│                                     │
│   Create Your Account               │
│                                     │
│   Full Name:    [________________]  │
│   Email:        [________________]  │
│   Phone:        [________________]  │
│   Password:     [________________]  │
│   Confirm Pass: [________________]  │
│                                     │
│   [x] I agree to Terms & Privacy    │
│                                     │
│   [      Create Account       ]     │
│                                     │
│   Already have account? Login       │
└─────────────────────────────────────┘
```

---

### 📊 Customer Dashboard

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Header: Welcome back, [Customer Name]!                 │
└─────────────────────────────────────────────────────────┘

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ 📦 Active   │ │ 💰 Pending  │ │ 📏 Saved    │
│    Orders   │ │   Payments  │ │ Measurements│
│      3      │ │   $250.00   │ │      2      │
└─────────────┘ └─────────────┘ └─────────────┘

┌─────────────────────────────────────────────────────────┐
│  Recent Orders                           [View All →]   │
├─────────────────────────────────────────────────────────┤
│  #ORD-001  Custom Suit    In Progress   $450  [View]   │
│  #ORD-002  Shirt          Ready         $120  [View]   │
│  #ORD-003  Pants          Pending       $80   [View]   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Quick Actions                                          │
│  [➕ Place New Order]  [📏 Update Measurements]         │
└─────────────────────────────────────────────────────────┘
```

---

### 📦 Orders Page (Customer)

**Features:**
- Search bar (order ID, item name)
- Filters: Status (All, Pending, In Progress, Ready, Completed), Date range
- Sort: Date, Amount, Status

**Order Card:**
```
┌─────────────────────────────────────────────────────────┐
│  Order #ORD-001                    [In Progress Badge]  │
│  Placed: Oct 15, 2025  •  Delivery: Nov 5, 2025        │
├─────────────────────────────────────────────────────────┤
│  Items: Custom 3-Piece Suit                             │
│  Amount: $450.00                                        │
│                                                         │
│  Status Timeline:                                       │
│  ✓ Order Placed → ✓ In Progress → ○ Ready → ○ Delivered│
│                                                         │
│  [View Details]  [Track]  [Contact Tailor]              │
└─────────────────────────────────────────────────────────┘
```

---

### 📏 Measurements Page (Customer)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  My Measurements                    [➕ Add New]         │
└─────────────────────────────────────────────────────────┘

┌──────────────────────────┐ ┌──────────────────────────┐
│  Formal Wear Profile     │ │  Casual Wear Profile     │
│  Last Updated: Oct 2025  │ │  Last Updated: Sep 2025  │
├──────────────────────────┤ ├──────────────────────────┤
│  Chest:   40 in          │ │  Chest:   39 in          │
│  Waist:   34 in          │ │  Waist:   33 in          │
│  Sleeve:  24 in          │ │  Sleeve:  24 in          │
│  ...                     │ │  ...                     │
│                          │ │                          │
│  [Edit]  [Delete]        │ │  [Edit]  [Delete]        │
└──────────────────────────┘ └──────────────────────────┘
```

---

### 🔧 Admin Dashboard

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Dashboard Overview               Period: [This Month ▼]│
└─────────────────────────────────────────────────────────┘

┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ 📦 Total    │ │ ⏳ Active   │ │ 💵 Revenue  │ │ 👥 New      │
│   Orders    │ │   Orders    │ │             │ │  Customers  │
│    127      │ │     18      │ │  $12,450    │ │     8       │
│  +12% ↑     │ │   +3 today  │ │  +8% ↑      │ │   +2 today  │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘

┌──────────────────────────────┐ ┌─────────────────────────┐
│  Revenue Trend (Line Chart)  │ │  Order Status (Pie)     │
│                              │ │                         │
│  [Chart Visualization]       │ │  [Chart Visualization]  │
│                              │ │                         │
└──────────────────────────────┘ └─────────────────────────┘

┌──────────────────────────────┐ ┌─────────────────────────┐
│  Recent Orders               │ │  Pending Actions        │
│  [Table with 5 recent]       │ │  • 3 orders due today   │
│                              │ │  • 5 unpaid invoices    │
│  [View All →]                │ │  • 2 low stock items    │
└──────────────────────────────┘ └─────────────────────────┘
```

---

### 📋 Admin Order Management

**All Orders Table:**
```
┌─────────────────────────────────────────────────────────────────┐
│  [🔍 Search orders...]    [Filter ▼] [Status ▼] [Export ▼]     │
├──────────────────────────────────────────────────────────────────┤
│ Order ID │Customer    │Date       │Status      │Amount │Actions │
├──────────────────────────────────────────────────────────────────┤
│ ORD-127  │John Doe    │Oct 28     │In Progress │$450   │[•••]  │
│ ORD-126  │Jane Smith  │Oct 27     │Ready       │$280   │[•••]  │
│ ORD-125  │Bob Wilson  │Oct 26     │Pending     │$195   │[•••]  │
└──────────────────────────────────────────────────────────────────┘

Actions menu (•••):
├─ View Details
├─ Update Status
├─ Generate Invoice
├─ Send Notification
└─ Delete Order
```

---

## Component Library

### Reusable Components

1. **Navigation Components**
   - `<Navbar />` - Public/Customer/Admin headers
   - `<Sidebar />` - Admin & customer sidebar
   - `<MobileNav />` - Bottom navigation for mobile
   - `<Breadcrumb />` - Navigation trail

2. **Layout Components**
   - `<PageLayout />` - Standard page wrapper
   - `<DashboardLayout />` - Dashboard grid system
   - `<Card />` - Content container
   - `<Modal />` - Dialog/popup
   - `<Drawer />` - Slide-in panel

3. **Data Display**
   - `<DataTable />` - Sortable, filterable table
   - `<StatCard />` - KPI display card
   - `<Timeline />` - Order status timeline
   - `<Badge />` - Status indicators
   - `<Avatar />` - User profile picture
   - `<EmptyState />` - No data placeholder

4. **Forms**
   - `<Input />` - Text input with validation
   - `<Select />` - Dropdown selector
   - `<DatePicker />` - Date selection
   - `<FileUpload />` - Image/file upload
   - `<FormWizard />` - Multi-step form
   - `<SearchBar />` - Search input with autocomplete

5. **Feedback**
   - `<Toast />` - Notification messages
   - `<Alert />` - Warning/info boxes
   - `<LoadingSpinner />` - Loading indicator
   - `<Skeleton />` - Content placeholder
   - `<ProgressBar />` - Progress indicator

6. **Business-Specific**
   - `<OrderCard />` - Order display card
   - `<MeasurementForm />` - Body measurement input
   - `<InvoiceTemplate />` - Printable invoice
   - `<StatusBadge />` - Order status indicator
   - `<PriceDisplay />` - Currency formatting

---

## Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
xs: 0px      /* Mobile phones */
sm: 640px    /* Large phones, small tablets */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large screens */
```

### Mobile Adaptations
- **Navigation**: Hamburger menu + bottom nav
- **Tables**: Horizontal scroll or card view
- **Forms**: Full-width inputs, larger touch targets
- **Dashboards**: Stacked cards instead of grid
- **Modals**: Full-screen on mobile

---

## User Flows

### 🎯 Customer Order Flow
```
Landing Page
    ↓
Register/Login
    ↓
Customer Dashboard
    ↓
Place New Order
    ↓
Select Garment Type
    ↓
Choose/Create Measurements
    ↓
Enter Order Details
    ↓
Review & Submit
    ↓
Order Confirmation
    ↓
Payment (if required)
    ↓
Track Order Status
    ↓
Receive Notification (Ready)
    ↓
Pick Up / Delivery
```

### 🔧 Admin Order Management Flow
```
Admin Dashboard
    ↓
View New Orders / Create Order
    ↓
Select Customer
    ↓
Choose Measurements
    ↓
Add Order Items
    ↓
Set Pricing & Delivery Date
    ↓
Create Order
    ↓
Update Status (Pending → In Progress)
    ↓
Update Status (In Progress → Ready)
    ↓
Generate Invoice
    ↓
Send Notification to Customer
    ↓
Confirm Payment
    ↓
Mark as Delivered
```

### 💳 Payment Flow
```
Customer Views Invoice
    ↓
Click "Pay Now"
    ↓
Redirect to Stripe/PayHere Checkout
    ↓
Customer Completes Payment
    ↓
Webhook Received (Backend)
    ↓
Payment Status Updated
    ↓
Customer Receives Confirmation Email
    ↓
Receipt Available in Dashboard
```

---

## Technical Implementation Notes

### Routing Structure (React Router)
```javascript
// Public Routes
/
/services
/gallery
/track-order
/about
/contact
/login
/register
/verify-email/:token
/forgot-password
/reset-password/:token

// Customer Routes (Protected)
/customer/dashboard
/customer/orders
/customer/orders/new
/customer/orders/:orderId
/customer/measurements
/customer/measurements/new
/customer/measurements/:id/edit
/customer/profile
/customer/billing
/customer/notifications
/customer/help

// Admin Routes (Protected + Admin Role)
/admin/dashboard
/admin/orders
/admin/orders/new
/admin/orders/:orderId
/admin/orders/calendar
/admin/customers
/admin/customers/:customerId
/admin/measurements
/admin/invoices
/admin/payments
/admin/reports
/admin/inventory
/admin/notifications
/admin/settings
```

### State Management Strategy
```
Global State (React Context):
├─ AuthContext (user, token, role)
├─ ThemeContext (dark mode, preferences)
└─ NotificationContext (toast messages)

Server State (React Query):
├─ useOrders()
├─ useMeasurements()
├─ useCustomers()
├─ useInvoices()
└─ usePayments()

Local State (useState/useReducer):
└─ Form data, UI toggles, temporary state
```

### Performance Optimizations
- **Code Splitting**: Lazy load routes
- **Image Optimization**: WebP format, lazy loading
- **API Caching**: React Query with stale-while-revalidate
- **Debouncing**: Search inputs
- **Virtualization**: Large lists (react-virtual)
- **Memoization**: React.memo for heavy components

---

## Accessibility Features

- ✅ Keyboard navigation support
- ✅ ARIA labels on all interactive elements
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ Color contrast ratios (WCAG AA)
- ✅ Alt text on images
- ✅ Form validation with clear error messages
- ✅ Skip to content link

---

## Design System & Style Guide

### Spacing Scale
```css
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Border Radius
```css
sm: 4px    /* Inputs, badges */
md: 8px    /* Cards, buttons */
lg: 12px   /* Modals */
full: 9999px /* Pills, avatars */
```

### Shadows
```css
sm: 0 1px 2px rgba(0,0,0,0.05)
md: 0 4px 6px rgba(0,0,0,0.1)
lg: 0 10px 15px rgba(0,0,0,0.1)
xl: 0 20px 25px rgba(0,0,0,0.15)
```

---

## Conclusion

This UI design provides a comprehensive, user-friendly interface for both customers and administrators. The navigation is intuitive, the pages are well-organized, and the design system ensures consistency across the application.

**Next Steps:**
1. Create wireframes/mockups in Figma
2. Set up React project with routing
3. Implement design system with Tailwind + Shadcn/ui
4. Build reusable component library
5. Implement page layouts
6. Connect to backend APIs
7. Add animations and micro-interactions
8. Test responsiveness across devices
9. Conduct user testing
10. Iterate based on feedback

**Estimated Development Time:**
- Design System Setup: 1 week
- Public Pages: 1 week
- Customer Portal: 2-3 weeks
- Admin Dashboard: 3-4 weeks
- Testing & Refinement: 1-2 weeks
- **Total: 8-11 weeks**

---

**Document Version**: 1.0  
**Last Updated**: November 1, 2025  
**Created By**: Development Team
