# Admin Dashboard - Quick Start Guide

## 🚀 What You Have Now

### ✅ Completed Pages

```
📦 Admin Dashboard
 ┣ 📂 components/
 ┃ ┗ 📄 AdminSidebar.jsx ← Reusable navigation
 ┃
 ┣ 📂 Customer Management/
 ┃ ┣ 📄 AdminAllCustomersPage.jsx ← View all customers
 ┃ ┗ 📄 AdminMeasurementManagementPage.jsx ← Manage measurements
 ┃
 ┗ 📂 Order Management/
   ┗ 📄 AdminAllOrdersPage.jsx ← View all orders
```

### 🌐 Active Routes

| Route | Page | Status |
|-------|------|--------|
| `/admin/dashboard` | Dashboard Overview | ⚠️ Needs work |
| `/admin/customers` | All Customers | ✅ Ready |
| `/admin/measurements` | Measurement Management | ✅ Ready + API |
| `/admin/orders` | All Orders | ✅ Ready |

---

## 🎯 How to Use

### 1. Start the Application
```bash
cd client
npm run dev
```

### 2. Login as Admin
```
http://localhost:5173/login
```

### 3. Access Admin Pages
```
http://localhost:5173/admin/customers
http://localhost:5173/admin/measurements
http://localhost:5173/admin/orders
```

---

## 📸 Page Previews

### Admin Sidebar (All Pages)
```
┌─────────────────┐
│  👤 Admin Name  │
│   Administrator │
├─────────────────┤
│  📊 Dashboard   │
│  🛒 Orders     ←│ Active
│  👥 Customers   │
│  📏 Measurements│
│  📦 Inventory   │
│  💰 Finance     │
│  🔔 Notifs      │
├─────────────────┤
│  ⚙️  Settings   │
│  🚪 Logout      │
└─────────────────┘
```

### All Customers Page
```
┌─────────────────────────────────────────────────┐
│  All Customers                    [Export] [+Add]│
│  Manage, filter, and export your customer list   │
├─────────────────────────────────────────────────┤
│  🔍 Search...          [Filters] [Active Chips]  │
├─────────────────────────────────────────────────┤
│  ☑ Customer    Contact         Orders   Actions  │
│  ☐ John Smith  +1 555-xxx      12       [View]  │
│  ☐ Emma J.     emma@...        8        [View]  │
└─────────────────────────────────────────────────┘
```

### Measurement Management Page
```
┌─────────────────────────────────────────────────┐
│  Measurement Management                          │
│  View, add, and edit customer measurements       │
├─────────────────────────────────────────────────┤
│  🔍 Search by Customer Name... [🔽] [+ Add New] │
├─────────────────────────────────────────────────┤
│  Customer   ID      Updated    Type    Actions   │
│  Cust #123  00123   2024-11-10 Shirt   [✏️][📊][🗑️]│
│  Cust #124  00124   2024-11-08 Dress   [✏️][📊][🗑️]│
├─────────────────────────────────────────────────┤
│  Showing 1-10 of 97  [◀] 1 2 3 ... 8 [▶]       │
└─────────────────────────────────────────────────┘
```

### All Orders Page
```
┌─────────────────────────────────────────────────┐
│  All Orders                    [Export] [+ New]  │
├─────────────────────────────────────────────────┤
│  🔍 Search...                                    │
│  [Status: All] [Date: 30 days] [More Filters]   │
├─────────────────────────────────────────────────┤
│  ☑ Order ID  Customer    Amount  Status  Date    │
│  ☐ ORD-001   John Smith  $450   🔵In Prog  11/10│
│  ☐ ORD-002   Emma J.     $850   ✅Completed 11/08│
└─────────────────────────────────────────────────┘
```

---

## 🎨 Design System

### Colors in Use
```css
Primary Blue:    #204cdf ■
Background:      #f6f6f8 ▢
White:           #ffffff ▢
Text Dark:       #111317 ■
Text Gray:       #646c87 ■
Border:          #e0e0e0 ─

Status Colors:
Success Green:   #065f46 ■ (Completed)
Warning Yellow:  #92400e ■ (Pending)
Info Blue:       #1e40af ■ (In Progress)
Danger Red:      #991b1b ■ (Cancelled)
```

### Typography Scale
```
Headings:
H1: 40px/900 weight - Page titles
H2: 30px/800 weight - Section titles
H3: 20px/700 weight - Card titles

Body:
Large:  16px/400 weight - Subtitles
Normal: 14px/500 weight - Body text
Small:  12px/600 weight - Labels
```

### Spacing Scale
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 40px
```

---

## 🔧 Common Tasks

### Task 1: Add a New Admin Page

```bash
# 1. Create files
client/src/pages/Admin Dashboard/YourSection/YourPage.jsx
client/src/pages/Admin Dashboard/YourSection/YourPage.css

# 2. Use template from ADMIN_PAGES_IMPLEMENTATION_GUIDE.md

# 3. Add route in App.jsx
import YourPage from './pages/Admin Dashboard/YourSection/YourPage.jsx';

<Route path="/admin/your-route" element={
    <ProtectedRoute><YourPage /></ProtectedRoute>
} />

# 4. Add to sidebar navigation (optional)
Edit: client/src/pages/Admin Dashboard/components/AdminSidebar.jsx
```

### Task 2: Connect to API

```javascript
// 1. Create API function in src/api/yourAPI.js
export const getYourData = () => api.get('/api/your-endpoint');

// 2. Import and use in your page
import { getYourData } from '../../../api/yourAPI';

const fetchData = async () => {
    try {
        const response = await getYourData();
        setData(response.data.data);
    } catch (error) {
        console.error('Error:', error);
    }
};
```

### Task 3: Update Sidebar Menu

```javascript
// In AdminSidebar.jsx, update menuItems array:
const menuItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/orders', icon: 'shopping_cart', label: 'Orders' },
    { path: '/admin/your-new-page', icon: 'your_icon', label: 'Your Label' },
    // ... more items
];
```

---

## 📋 Component Library

### Reusable Patterns

#### Search Bar
```jsx
<div className="search-wrapper">
    <span className="material-symbols-outlined">search</span>
    <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
    />
</div>
```

#### Action Buttons
```jsx
{/* Primary Button */}
<button className="btn-primary">
    <span className="material-symbols-outlined">add</span>
    <span>Add New</span>
</button>

{/* Secondary Button */}
<button className="btn-secondary">
    <span className="material-symbols-outlined">download</span>
    <span>Export</span>
</button>
```

#### Status Badge
```jsx
<span className={`status-badge status-${status.toLowerCase()}`}>
    {status}
</span>
```

#### Data Table
```jsx
<table className="data-table">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
        </tr>
    </thead>
    <tbody>
        {data.map(item => (
            <tr key={item.id}>
                <td>{item.field1}</td>
                <td>{item.field2}</td>
            </tr>
        ))}
    </tbody>
</table>
```

---

## 🐛 Troubleshooting

### Issue: Page not loading
```bash
# Check if route is added in App.jsx
# Check component import path
# Check for console errors
```

### Issue: Sidebar not showing
```bash
# Verify AdminSidebar import
# Check CSS is imported
# Ensure parent container uses flex layout
```

### Issue: API not working
```bash
# Check backend server is running (port 4000)
# Verify token is stored in localStorage
# Check API endpoint URL
# Check network tab in browser DevTools
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `ADMIN_PAGES_IMPLEMENTATION_GUIDE.md` | Detailed guide with templates |
| `ADMIN_PAGES_CREATION_SUMMARY.md` | What was created |
| `MEASUREMENT_INTEGRATION_SUMMARY.md` | Measurement API details |
| `API_QUICK_REFERENCE.md` | API endpoints reference |

---

## ✨ Tips & Best Practices

### 1. Consistent Naming
```
✅ Good:  AdminAllCustomersPage.jsx
❌ Bad:   customersPage.jsx
```

### 2. Class Name Prefixes
```
✅ Good:  .admin-customers-title
❌ Bad:   .title
```

### 3. Import Order
```jsx
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party imports
import { useNavigate } from 'react-router-dom';

// 3. Local imports
import AdminSidebar from '../../components/AdminSidebar';
import './YourPage.css';
```

### 4. State Management
```jsx
// Group related state
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
```

### 5. Error Handling
```jsx
try {
    // API call
} catch (error) {
    console.error('Error:', error);
    setError(error.message);
} finally {
    setLoading(false);
}
```

---

## 🎓 Learning Resources

### Material Symbols
- **Website:** https://fonts.google.com/icons
- **Usage:** `<span className="material-symbols-outlined">icon_name</span>`

### React Router
- **Docs:** https://reactrouter.com/
- **Navigation:** `const navigate = useNavigate(); navigate('/path');`

### Fetch API
- **MDN Docs:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## 📞 Need Help?

1. **Check the guides** in the documentation files
2. **Look at existing pages** for examples
3. **Use the templates** provided
4. **Follow the patterns** established

---

**Happy Coding! 🚀**

---

*Last updated: November 13, 2025*
