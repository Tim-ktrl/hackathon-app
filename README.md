# Hackathon App

Next.js App Router, TypeScript, Tailwind CSS, and Supabase email/password login.

## Run

Requires Node.js 20.9+ and npm.

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add the Supabase project URL and publishable key from your project's Connect dialog.
4. Run `npm run dev` and open http://localhost:3000.

Without Supabase settings, the login page renders with sign-in disabled.

## Connect a new Supabase project

1. Create a project at https://supabase.com/dashboard.
2. Copy the project URL and publishable key into `.env.local`. Never use a service-role or secret key here.
3. Under Authentication → Users, add an email/password test user (confirm their email).
4. Restart the app, sign in, and test sign out.

Only login and a protected signed-in page are included. Public sign-up and password reset are outside the current scope. No custom database tables are needed. Cookies hold the session; the server validates JWT claims before rendering the protected page.

## Optional local Supabase

The Supabase CLI is a dev dependency: `npx supabase --version`.
For a fully local backend, install Docker Desktop, start Docker, then run `npx supabase start`. Put its API URL and anon key into `.env.local` (the anon key can use the publishable-key variable). Use the local Studio URL printed by the CLI to create a test user. Docker is unnecessary for a hosted Supabase project.

## Checks

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

## Routes

- `/` redirects to `/login`.
- `/login` accepts email/password and redirects authenticated users to `/account`.
- `/account` validates the session on the server and provides sign-out.

Environment files are ignored by Git; only the blank example is committed.
