# Smart links on Vercel + Supabase

## Go live (about 20 minutes)
1. **Supabase** (supabase.com): create a project. SQL Editor > paste all of `supabase.sql` > Run.
   Authentication > Providers > Email: turn **off** "Confirm email" (the free email sender is very limited).
   Project Settings > API: copy the **Project URL** and the **anon public** key.
2. **GitHub**: create a repo and upload everything in this folder, keeping `api/` and `public/`.
3. **Vercel** (vercel.com): Add New > Project > import the repo. Leave all build settings empty.
   Environment Variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and optionally `BRAND_NAME` (your product name). Deploy.
4. Open `yourproject.vercel.app/app`, create an account, make a link. Artists do the same.

Link format: `yourproject.vercel.app/artist-song`. Add a custom domain later in Vercel > Domains.

Not included yet: pre-saves, social unlocks, password reset page, spam filtering on click counts.
