# Notifications System & Auth Flow Improvements

## Goal
Implement a robust global notification system (both transient toasts and persistent history), enforce phone number collection for Google OAuth users, and improve the authentication UX (redirects and form styling).

## 1. Transient Notifications (Toasts)
- **Library**: Install and configure `sonner` for Next.js.
- **Provider**: Add `<Toaster />` to the root `layout.tsx`.
- **Usage**: Replace existing `alert()` or raw text messages with `toast.success`, `toast.error`, etc.
- **Phone Prompt**: In a global client wrapper (e.g. `ClientLayout` or `Header`), check if `session.user` exists but `session.user.phone` is missing. If so, display a persistent/dismissible toast prompting the user to link their phone number to use bonuses, with a link to `/profile`.

## 2. Persistent Notifications (Data & API)
- **Data Model**:
  Add a `Notification` model in `prisma/schema.prisma`:
  ```prisma
  model Notification {
    id        String   @id @default(cuid())
    userId    String
    title     String
    message   String
    type      String   @default("INFO") // INFO, SUCCESS, WARNING, ERROR
    read      Boolean  @default(false)
    createdAt DateTime @default(now())

    user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  }
  ```
  *(Update `User` model to include `notifications Notification[]`)*
- **API Endpoints**:
  - `GET /api/user/notifications` - Fetch user's notifications.
  - `PATCH /api/user/notifications/:id/read` - Mark a specific notification as read.
  - `PATCH /api/user/notifications/read-all` - Mark all as read.

## 3. Notification Center (UI)
- **Bell Icon (Header)**:
  - Add a bell icon near the user profile dropdown.
  - Show a red dot/badge if there are unread notifications.
  - On click, open a dropdown showing the 5 most recent notifications.
  - Include a "Mark all as read" button and a "View all" link.
- **History Page (`/profile/notifications`)**:
  - A dedicated page showing the full history of notifications with pagination or infinite scroll.
  - Distinct styling for read vs unread notifications.

## 4. Auth UX Fixes
- **Callback Redirects**: Update `/login` and `/register` flows to use `callbackUrl` if present, or fallback to the previous page (or `/`). Pass `callbackUrl` from the UI when redirecting to login.
- **Phone Form CSS**: Fix the styling of `PhoneUpdateForm` in `/profile` to ensure the label, input, and button align perfectly, preventing the "crooked" look.

## 5. Deployment & DB Updates
- Apply `npx prisma db push` (or generate a migration) to update the SQLite database.
- Ensure file permissions on the VPS (`data/dev.db`) are correctly set to `1001:1001` to avoid readonly database errors.
