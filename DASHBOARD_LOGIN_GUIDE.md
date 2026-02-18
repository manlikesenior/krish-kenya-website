# Dashboard Login Guide

## Quick Access

**Login URL:** `http://localhost:3000/login` (development) or `https://your-domain.com/login` (production)

**Dashboard URL:** `http://localhost:3000/dashboard` (will redirect to login if not authenticated)

## Step 1: Create Your Admin Account

You need to create a user account in Supabase first. You have two options:

### Option A: Create User via Supabase Dashboard (Recommended)

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Users** in the left sidebar
4. Click **"Add user"** or **"Invite user"**
5. Enter the email and password for your admin account
6. Click **"Create user"**

### Option B: Create User via SQL (Alternative)

Run this SQL in your Supabase SQL Editor:

```sql
-- Create a new user
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@krishkenya.com',  -- Change this to your email
    crypt('your-secure-password', gen_salt('bf')),  -- Change this to your password
    now(),
    now(),
    now(),
    '',
    '',
    '',
    ''
);

-- Create the user metadata entry
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    (SELECT id FROM auth.users WHERE email = 'admin@krishkenya.com'),
    'authenticated',
    'authenticated',
    'admin@krishkenya.com'
);
```

**Note:** The SQL method is more complex. Option A (Supabase Dashboard) is recommended.

## Step 2: Log In to the Dashboard

1. Navigate to `/login` in your browser
2. Enter your email address
3. Enter your password
4. Click **"Sign In"**

You will be automatically redirected to `/dashboard` upon successful login.

## Step 3: Access the Dashboard

Once logged in, you'll see:
- **Welcome message** with your email
- **Manage Events** section - Add, edit, and delete events
- **Manage Music** section - Add, edit, and delete tracks

## Troubleshooting

### "Invalid login credentials"
- Make sure you created the user in Supabase
- Verify your email and password are correct
- Check that the user exists in Supabase Authentication → Users

### "Unauthorized" or redirected to login
- Your session may have expired
- Try logging in again
- Clear browser cookies if issues persist

### Can't access dashboard after login
- Check browser console for errors
- Verify your Supabase environment variables are set correctly:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Forgot Password
- Click **"Forgot Password?"** on the login page
- Enter your email
- Check your email for password reset link

## Security Notes

- Only authenticated users can access `/dashboard`
- Only authenticated users can create, update, or delete events/tracks via the API
- Public users can only read (GET) events and tracks
- Make sure to use a strong password for your admin account

## Environment Variables Required

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Logout

To log out, use the logout button in the dashboard (if available) or clear your browser cookies.


