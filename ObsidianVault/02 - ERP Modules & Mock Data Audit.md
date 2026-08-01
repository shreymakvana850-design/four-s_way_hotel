# 📦 02 - ERP Modules & Mock Data Audit

## 🔍 Executive Summary
All ERP and guest management operations in the project are **currently 100% mocked in memory**. 

No database is connected. State modifications made during runtime (e.g. updating room status, adding guest reservations, creating food orders) are held in React `useState` hooks inside `App.tsx` or individual component local states. Any browser refresh completely resets all data back to the hardcoded initial arrays in `src/data/websiteData.ts` and `src/data/mockData.ts`.

---

## 📊 ERP Module & Component Breakdown

### 1. Active / Mounted Components (in `App.tsx` & `ManagementModal.tsx`)
- **`ManagementModal.tsx`**: Hotel Staff Management Portal.
  - Staff Login simulation (`admin`/`admin123`, `staff`/`staff123`, `manager`/`manager123`).
  - Rooms Tab: Update room status (Available, Occupied, Maintenance, Reserved, Housekeeping), Add new room.
  - Customers Tab: Search customers, filter payment status, add new customer record.
  - Orders Tab: Update food order status (Preparing, Out for Delivery, Delivered, Cancelled).
  - *Data Source:* React `useState` in `App.tsx` initialized with `INITIAL_ROOMS_DATA` and `INITIAL_CUSTOMERS_DATA`.

- **`BookingModal.tsx`**: Room booking flow for guests. Appends customer to React state `customers`.
- **`TableReservationModal.tsx`**: Table reservation for dining venues. Appends customer to React state `customers`.
- **`FoodOrderingModal.tsx`**: F&B ordering modal for multi-cuisine menus. Appends order to React state `foodOrders`.

### 2. Standalone / Unmounted ERP Components (in `src/components/`)
The codebase contains extensive standalone ERP view components, but they are **currently unmounted** (not imported or rendered in `App.tsx` or `Navbar.tsx`):

| Component File | ERP Domain | Initial Data File | Current State Handling |
| :--- | :--- | :--- | :--- |
| `FrontDeskView.tsx` | Front Office & Check-In/Out | `mockData.ts` (`INITIAL_ROOMS`, `INITIAL_GUESTS`) | Local component `useState` |
| `HousekeepingView.tsx` | Housekeeping & Butler Tasks | `mockData.ts` (`INITIAL_TASKS`, `INITIAL_ROOMS`) | Local component `useState` |
| `DiningPOSView.tsx` | F&B Point of Sale | `mockData.ts` (`MENU_ITEMS`, `INITIAL_ORDERS`) | Local component `useState` |
| `BanquetsView.tsx` | Banquet & Wedding Events | `mockData.ts` (`INITIAL_BANQUETS`) | Local component `useState` |
| `StaffRosterView.tsx` | Staff Roster & Butler Ratings | `mockData.ts` (`INITIAL_STAFF`) | Local component `useState` |
| `InventoryView.tsx` | Linen, Kitchen & Vintage Car Inventory | `mockData.ts` (`INITIAL_INVENTORY`) | Local component `useState` |
| `GSTBillingView.tsx` | GST Invoicing & Tax Breakdown | `mockData.ts` (`INITIAL_INVOICES`) | Local component `useState` |

---

## 🛑 Limitations of Current Implementation
1. **Data Volatility**: Refreshing the webpage wipes all user input and reverts to hardcoded mock data.
2. **Multi-user Isolation**: Multiple hotel staff members or users cannot share state (e.g. Front Desk check-in is invisible to Housekeeping).
3. **Disconnected Components**: Rich ERP modules (Banquets, Inventory, Housekeeping, POS) are isolated in separate files and disconnected from the main navigation.

---

## 🔗 Related Notes
- [[01 - Current Project State & Architecture]]
- [[03 - Server File & AI Routes Wiring Audit]]
- [[04 - MongoDB Connection & Vercel Deployment Plan]]
