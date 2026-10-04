# HaFilm

A free web application for watching and discovering movies and TV series. Built with Next.js App Router, pulling data from TMDB, streaming video via VidSrc.me embeds, and powered by a custom authentication backend.

---

## Features

- Browse and discover movies and TV series from the TMDB database
- Free video playback via VidSrc.me embeds (movies and episodes)
- Daily and weekly trending content
- Filter content by streaming platform (Netflix, Netflix Kids)
- Movie detail pages: cast, trailer, recommendations, similar titles
- TV series detail pages: seasons, episodes, trailers
- Global search across movies and TV series simultaneously
- Login, register, and JWT session management with automatic token refresh
- Personal watchlist per user
- Comments and threaded replies on movie and episode pages
- User profile dashboard with activity statistics
- Account settings (change password)
- Disney+ Series _(Coming Soon)_
- HBO Series _(Coming Soon)_
- Prime Video _(Coming Soon)_

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16.2.3 (App Router, React Server Components) |
| Language | TypeScript 5 (strict mode) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| Authentication | NextAuth v4 — Credentials provider, JWT strategy |
| Forms & Validation | React Hook Form v7 + Zod v4 |
| Data Fetching | SWR v2 (client-side), native fetch + Server Actions (server-side) |
| URL State | nuqs v2 (URL search params as React state) |
| Video Player | VidSrc.me (iframe embed) + @vidstack/react |
| Movie Data Source | TMDB API |
| Animation | Motion (Framer Motion v12) + Embla Carousel |
| Notifications | Sonner v2 |
| Package Manager | pnpm |

---

## Prerequisites

Before running the project, make sure you have the following available:

- **Node.js** >= 18
- **pnpm** — install with `npm install -g pnpm`
- **A custom auth backend** — handles login, register, watchlist, comments, and settings. See [Environment Configuration](#environment-configuration) for the required endpoints.
- **TMDB API access** — direct or via your own proxy/wrapper, along with an API key.

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/username/ui-movie.git
cd ui-movie

# 2. Install dependencies
pnpm install

# 3. Copy the environment template
cp .env.template .env

# 4. Fill in all variables in .env
#    See the Environment Configuration section below

# 5. Start the development server
pnpm dev
```

The app runs at **http://localhost:2005**

---

## Environment Configuration

This project requires two separate backend services:

```
Browser
  └─> HaFilm (Next.js :2005)
        ├─> Movie API  (API_ENDPOINT)  ──> TMDB / movie & TV series data
        └─> Auth API   (AUTH_ENDPOINT) ──> Login, register, watchlist, comments
```

Copy `.env.template` to `.env` and fill in all the variables below.

### Movie API (TMDB / TMDB Proxy)

| Variable | Description | Example |
|---|---|---|
| `API_KEY` | Bearer token for authenticating to the movie API | `your_api_key_here`
| `API_IP` | IP address of the movie API server | `https://api.themoviedb.org`
| `API_PORT` | Port of the movie API server | `Skip if empty`
| `API_HOST` | Host of the movie API server | `$API_IP`
| `API_ENDPOINT` | Full base URL of the movie API  | `$API_HOST/3` |

### Auth API (Custom Backend)

> Contact: [gabrielsitompul83@gmail.com](mailto:gabrielsitompul83@gmail.com)

### NextAuth

| Variable | Description | Example |
|---|---|---|
| `NEXTAUTH_URL` | The canonical URL of this Next.js app | `http://localhost:2005` |
| `NEXTAUTH_SECRET` | A random secret string for signing JWT sessions | see below |

To generate `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### Auth API Endpoints Required

Your auth backend must expose the following endpoints for the app to work:

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/users/sign_in` | User login — returns `access_token` and `refresh_token` |
| `POST` | `/api/users/tokens` | Token refresh — called automatically 2 minutes before expiry |

Plus additional endpoints for register, watchlist, comments, and settings consumed by each module.

---

## Pages & Routes

| Route | Description | Auth Required |
|---|---|---|
| `/` | Home — trending, popular, platform content | No |
| `/login` | Login page | No |
| `/sign-up` | Registration page | No |
| `/dashboard` | User profile dashboard (watchlist, comments, stats) | Yes |
| `/settings` | Account settings (change password) | No |
| `/movie` | Paginated movie discovery | No |
| `/movie/[id]` | Movie detail — cast, trailer, comments, recommendations | No |
| `/movie/netflix-kids` | Netflix Kids movie listing | No |
| `/tv` | Paginated TV series discovery | No |
| `/tv/[id]` | TV series detail — seasons, comments, recommendations | No |
| `/tv/[id]/season/[seasonId]/episode/[episodeId]` | Episode detail with video player | No |
| `/tv/netflix` | Netflix series listing | No |
| `/tv/disney-plus` | Disney+ series | _Coming Soon_ |
| `/tv/hbo` | HBO series | _Coming Soon_ |
| `/tv/prime` | Prime Video series | _Coming Soon_ |

---

## Folder Structure

```
src/
├── app/                        # Next.js App Router — routing entry points only
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── api/auth/[...nextauth]/ # NextAuth handler
│   ├── login/
│   ├── sign-up/
│   ├── dashboard/
│   ├── settings/
│   ├── movie/
│   │   ├── page.tsx
│   │   ├── [id]/page.tsx
│   │   └── netflix-kids/page.tsx
│   └── tv/
│       ├── page.tsx
│       ├── [id]/page.tsx
│       │   └── season/[seasonId]/episode/[episodeId]/page.tsx
│       ├── netflix/page.tsx
│       ├── disney-plus/page.tsx
│       ├── hbo/page.tsx
│       └── prime/prime.tsx
│
├── modules/                    # All feature logic lives here
│   ├── AllTrending/
│   ├── Collection/
│   ├── Comments/
│   ├── Dashboard/
│   ├── Login/
│   ├── MovieActorList/
│   ├── MovieDetail/
│   ├── MovieDiscover/
│   ├── MoviePopular/
│   ├── MovieRecomendation/
│   ├── MovieSimilarList/
│   ├── NetflixKids/
│   ├── ProviderSeriesList/
│   ├── Search/
│   ├── Settings/
│   ├── TvDiscover/
│   ├── TvEpisodeDetail/
│   ├── TvPopular/
│   ├── TvRecomendation/
│   ├── TvSeasonDetail/
│   ├── TvSeasonSimilar/
│   └── WatchList/
│
├── shared/                     # Code shared across modules
│   ├── components/             # Shared components (Navbar, Footer, Player, etc.)
│   ├── hooks/                  # Shared custom hooks
│   ├── lib/                    # Shared utilities (DAO, actions, pagination)
│   └── types/                  # Shared types (entity, response, consts)
│
├── components/ui/              # shadcn/ui primitives
└── lib/                        # Core configuration (auth, fetchers, session, utils)
```

> **Important:** `src/app/` must only contain Next.js routing files (`page.tsx`, `layout.tsx`, `route.ts`). All business logic, feature components, and data access must live inside `src/modules/`.

---

## Module Architecture

This project uses a **Module-Based (Feature Sliced)** pattern. Each feature is isolated into its own folder under `src/modules/`, making every feature self-contained, easy to locate, and safe to modify without affecting other features.

Every module follows a consistent internal structure:

```
src/modules/ModuleName/
├── components/       # UI React components specific to this feature
├── lib/
│   ├── dao.ts        # Data Access Object — all API calls for this feature
│   └── action.ts     # Server Actions — mutation operations (create, update, delete)
└── types/
    ├── entity.ts     # Main data type shapes from the API
    └── responses.ts  # API response type shapes (including pagination)
```

### Architecture Rules

| Rule | Description |
|---|---|
| `src/app/page.tsx` must be thin | Only contains `export default` of the Page component from `modules/` |
| API access only in `lib/dao.ts` | UI components must never call `fetch` directly |
| Data mutations via `lib/action.ts` | Server Actions are used for create, update, delete operations |
| Cross-component state via Context | Use React Context (Provider pattern), not deep prop drilling |
| Cross-module code goes in `shared/` | Components, hooks, or utilities used by more than one module |

---

## API Layer

There are two main fetcher functions used throughout the project:

### `safeApiRequest` — Public Data (TMDB)

Used to fetch movie and TV series data from the movie API. Authenticated using `API_KEY` as a Bearer token (server-side env var, never exposed to the browser).

```typescript
// src/lib/safeApiRequest.ts
// Used in: MovieDetail, TvDiscover, AllTrending, Search, etc.
const result = await safeApiRequest<Movie>(`${process.env.API_ENDPOINT}/api/movies/${id}`)
```

### `safeApiInternalRequest` — User Data (Auth API)

Used to fetch or modify data that requires user authentication. Authenticated using the JWT `accessToken` from the current user's NextAuth session.

```typescript
// src/lib/safeApiInternalRequest.ts
// Used in: WatchList, Comments, Collection, Settings
const result = await safeApiInternalRequest<Watchlist>(
  `${process.env.AUTH_ENDPOINT}/api/watchlist`,
  session.user.accessToken
)
```

### Response Pattern

Both fetchers return a discriminated union that makes error handling straightforward:

```typescript
type SafeApiResponse<T> =
  | { success: true;  data: T }
  | { success: false; data: { message: string }; redirect: boolean }

// Usage
const result = await safeApiRequest<Movie>(url)
if (!result.success) {
  // handle error
}
const movie = result.data
```

### JWT Auto-Refresh

User sessions use the JWT strategy with a maximum duration of **2 days**. The token is automatically refreshed by NextAuth **2 minutes before expiry** without any user interaction. If the refresh fails (e.g. the refresh token is no longer valid), the session is flagged with `RefreshAccessTokenError` and the user is forced to log in again.

---

## Adding a New Module

1. Create a module folder at `src/modules/NewModuleName/`
2. Create sub-folders: `components/`, `lib/`, `types/`
3. Define data types in `types/entity.ts` and `types/responses.ts`
4. Create `lib/dao.ts` — write all API fetch functions here
5. Create `lib/action.ts` — write Server Actions for mutations (`"use server"`)
6. Build UI components in `components/`
7. Create the page file in `src/app/(route)/page.tsx` — it should only import and re-export from the module

```typescript
// src/app/new-feature/page.tsx  <-- must be this thin
import NewFeaturePage from '@/modules/NewModuleName/components/NewFeaturePage'
export default NewFeaturePage
```

---

## License

MIT
