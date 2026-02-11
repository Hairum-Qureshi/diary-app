Here’s the revised README with a clear, concrete **Running Locally** section added. I kept the focus on _what the app is_, but made the setup instructions explicit and copy-pasteable without drifting into internal implementation details.

---

# Diary App

## Overview

Diary is a personal, full-stack journaling application designed for long-term reflection and organization. It gives users a private space to write, revisit, and manage diary entries over time, with an emphasis on chronological structure rather than feeds, likes, or social features.

At its core, the app treats writing as an ongoing habit. Entries are organized by year and month, allowing users to easily see when they were most active, jump back to specific periods of their life, and navigate their writing history without friction.

The project is built as a monorepo using modern web tooling and reflects a preference for maintainable architecture, clear separation of concerns, and a simple but intentional user experience.

---

## What This App Does

Diary allows users to:

- Create new diary entries
- Edit existing entries
- Share public entries
- Delete entries they no longer want to keep
- Browse entries grouped by **year**
- See which **months** within a year contain entries
- Navigate their writing history chronologically rather than as a flat list

The interface is intentionally minimal. There are no social feeds, no algorithms, and no engagement-driven mechanics. The app is focused on writing, reviewing, and maintaining a personal archive over time.

---

## Design Philosophy

- **Chronology over feeds** Entries are organized by time, not engagement. The year → month structure mirrors how people naturally remember periods of their lives.

- **Private by default** This is a diary, not a social platform. The app is designed around individual use rather than constant sharing.

- **Simple interactions, solid foundations** Core CRUD functionality is implemented carefully, with an emphasis on correctness, clarity, and future extensibility.

---

## Tech Stack (High-Level)

This project is a monorepo managed with Turbo and includes:

- **Backend**: Nest.js
- **Frontend**: React.js with TailwindCSS
- **Database**: MongoDB
- **Authentication**: Google Firebase (Google Auth)

The stack was chosen to support a clean API layer, a responsive UI, and a scalable data model without unnecessary complexity.

---

## Running Locally

### Prerequisites

- Node.js (LTS recommended)
- MongoDB instance (local or hosted)
- A Google Firebase project with Google Authentication enabled

---

### 1. Firebase Setup (Google Auth)

1. Go to the Firebase Console and create a new project.
2. In **Authentication → Sign-in method**, enable **Google** as a provider.
3. In **Project Settings**, register a **Web App** to obtain frontend configuration values.
4. Download a **Service Account key**:
   - Go to **Project Settings → Service Accounts**
   - Generate a new private key
   - Save the JSON file securely (this will be used by the backend)

---

### 2. Frontend Environment Variables

Create a `.env` file in the frontend app directory and add:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_BACKEND_URL=
```

These values come from the Firebase Web App configuration, except for `VITE_BACKEND_URL`, which should point to your local backend (for example, `http://localhost:3000`).

---

### 3. Backend Environment Variables

Create a `.env` file in the backend app directory and add:

```
JWT_SECRET=
JWT_EXPIRES=
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGO_URI=
FIREBASE_SERVICE_ACCOUNT=
```

Notes:

- `JWT_EXPIRES` should be an integer value.
- `MONGO_URI` should point to your MongoDB instance.
- `FIREBASE_SERVICE_ACCOUNT` should contain the Firebase service account credentials (either as a JSON string or a path, depending on implementation).

---

### 4. Install Dependencies

From the root of the monorepo:

```
npm install
```

---

### 5. Run the App

From the `apps` directory:

```
npm run dev
```

This will start both the frontend and backend in development mode using Turbo.

---

## Planned Features

The following features are planned or under consideration:

- **Gallery / Media Attachments** Attach images to diary entries and browse them in a dedicated gallery view.

- **Search and Filtering** Search entries by keywords, dates, or time ranges.

- **Tagging System** Add optional tags to entries for thematic organization beyond chronology.

- **Drafts and Autosave** Support unsaved drafts and automatic saving while writing.

- **Improved Analytics** Visual insights into writing habits, such as streaks or activity over time.

- **AI Integration** AI-assisted querying and reflection over your entire diary archive.

These features are intentionally deferred to keep the core experience focused and stable before expanding functionality.

---

## Status

This project is actively developed and serves both as a personal tool and a learning exercise in building a structured, full-stack application with modern tooling. The emphasis is on long-term maintainability rather than rapid feature churn.
