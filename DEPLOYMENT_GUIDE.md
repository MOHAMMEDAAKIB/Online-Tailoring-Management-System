# 🚀 Deployment Guide: Render.com + Aiven.io

This guide walks you through deploying the **Online Tailoring Management System** to production using:
- **Render.com** - For hosting backend API and frontend
- **Aiven.io** - For managed PostgreSQL database

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Part 1: Database Setup (Aiven.io)](#part-1-database-setup-aivenio)
3. [Part 2: Backend Deployment (Render.com)](#part-2-backend-deployment-rendercom)
4. [Part 3: Frontend Deployment (Render.com)](#part-3-frontend-deployment-rendercom)
5. [Part 4: Post-Deployment Configuration](#part-4-post-deployment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

✅ **GitHub Account** - Your code should be pushed to a GitHub repository  
✅ **Render.com Account** - Sign up at [render.com](https://render.com) (free tier available)  
✅ **Aiven.io Account** - Sign up at [aiven.io](https://aiven.io) (free trial available)  
✅ **Git** - Code must be committed and pushed to GitHub  

---

## Part 1: Database Setup (Aiven.io)

### Step 1: Create PostgreSQL Service

1. **Log in to Aiven.io** → https://console.aiven.io
2. **Create a new service**:
   - Click **"Create Service"**
   - Select **"PostgreSQL"**
   - Choose a cloud provider: AWS, Google Cloud, or Azure
   - Select region closest to your users (e.g., `us-east-1` for US)
   - Choose plan: **"Hobbyist"** (free tier) or **"Startup"** ($10/month)
   - Name your service: `tailoring-db`
   - Click **"Create Service"**

3. **Wait for provisioning** (2-5 minutes)

### Step 2: Get Database Credentials

Once the service is running:

1. Click on your **tailoring-db** service
2. Navigate to **"Overview"** tab
3. **Copy these connection details**:
   ```
   Host: tailoring-db-yourproject.aivencloud.com
   Port: 12345
   User: avnadmin
   Password: [your-password]
   Database: defaultdb
   SSL Mode: require
   ```

4. **Save credentials securely** - You'll need them for Render.com

### Step 3: Configure Database (Optional)

You can connect to your database using:
- **psql** command line tool
- **pgAdmin** GUI tool
- **DBeaver** universal database tool

Connection string format:
```bash
postgresql://avnadmin:[PASSWORD]@[HOST]:[PORT]/defaultdb?sslmode=require
```

---

## Part 2: Backend Deployment (Render.com)

### Step 1: Prepare Your Repository

1. **Commit all changes**:
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **Verify these files exist** in your repo:
   - `Server/package.json` (with `start` script)
   - `Server/app.js`
   - `render.yaml` (optional, for Blueprint deployment)

### Step 2: Create Backend Web Service

1. **Log in to Render.com** → https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service**:

   | Field | Value |
   |-------|-------|
   | **Name** | `tailoring-api` |
   | **Region** | Oregon (US West) or closest to your users |
   | **Branch** | `main` |
   | **Root Directory** | `Server` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free (or Starter for better performance) |

5. Click **"Advanced"** to add environment variables

### Step 3: Add Environment Variables

In the **Environment Variables** section, add:

| Key | Value | Secret? |
|-----|-------|---------|
| `NODE_ENV` | `production` | No |
| `PORT` | `4000` | No |
| `DB_TYPE` | `postgres` | No |
| `DB_HOST` | `[from Aiven]` | Yes |
| `DB_PORT` | `[from Aiven]` | No |
| `DB_USER` | `avnadmin` | Yes |
| `DB_PASSWORD` | `[from Aiven]` | Yes |
| `DB_NAME` | `defaultdb` | No |
| `DB_SSL` | `true` | No |
| `JWT_SECRET` | `[generate random string]` | Yes |
| `JWT_REFRESH_SECRET` | `[generate random string]` | Yes |
| `JWT_EXPIRES_IN` | `1h` | No |
| `JWT_REFRESH_EXPIRES_IN` | `7d` | No |
| `FRONTEND_URL` | `http://localhost:5173` (update later) | No |

**Generate secure JWT secrets** using:
```bash
# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

### Step 4: Deploy Backend

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Run `npm install`
   - Start your server with `npm start`
3. **Wait for deployment** (3-5 minutes)
4. **Copy your backend URL**: `https://tailoring-api.onrender.com`

### Step 5: Run Database Migrations

After backend is deployed, you need to create database tables:

**Option A: Using Render Shell**
1. Go to your `tailoring-api` service in Render
2. Click **"Shell"** tab
3. Run migrations:
   ```bash
   cd Server
   node tests/run-all-migrations.js
   ```

**Option B: Using Local Connection**
1. Install PostgreSQL client locally
2. Connect to Aiven database:
   ```bash
   psql "postgresql://avnadmin:[PASSWORD]@[HOST]:[PORT]/defaultdb?sslmode=require"
   ```
3. Run each SQL file in `Server/db/migrations/` manually

**Option C: Using DBeaver/pgAdmin**
1. Connect to your Aiven database
2. Open and execute each migration file from `Server/db/migrations/`

---

## Part 3: Frontend Deployment (Render.com)

### Step 1: Update API URL

1. **Edit** `client/.env.production`:
   ```env
   VITE_API_BASE_URL=https://tailoring-api.onrender.com
   ```
   (Replace with your actual backend URL)

2. **Commit and push**:
   ```bash
   git add client/.env.production
   git commit -m "Update production API URL"
   git push origin main
   ```

### Step 2: Create Frontend Static Site

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. **Select your repository**
3. **Configure the static site**:

   | Field | Value |
   |-------|-------|
   | **Name** | `tailoring-frontend` |
   | **Branch** | `main` |
   | **Root Directory** | `client` |
   | **Build Command** | `npm install && npm run build` |
   | **Publish Directory** | `dist` |

4. Click **"Create Static Site"**

### Step 3: Deploy Frontend

1. Render will:
   - Install dependencies
   - Build your Vite app
   - Serve static files
2. **Wait for deployment** (2-4 minutes)
3. **Copy your frontend URL**: `https://tailoring-frontend.onrender.com`

---

## Part 4: Post-Deployment Configuration

### Step 1: Update CORS Settings

1. Go back to your **backend service** in Render
2. Update `FRONTEND_URL` environment variable:
   ```
   https://tailoring-frontend.onrender.com
   ```
   (Add multiple URLs separated by commas if needed)
3. Save changes (this will trigger a redeployment)

### Step 2: Test Your Application

1. **Visit your frontend URL**: `https://tailoring-frontend.onrender.com`
2. **Test key features**:
   - ✅ Register a new account
   - ✅ Log in
   - ✅ Navigate to dashboard
   - ✅ Create a measurement
   - ✅ View measurements

### Step 3: Monitor Logs

**Backend Logs**:
- Render Dashboard → `tailoring-api` → **"Logs"** tab
- Check for errors or connection issues

**Frontend Build Logs**:
- Render Dashboard → `tailoring-frontend` → **"Logs"** tab

---

## 🎉 Your App is Live!

**Frontend**: `https://tailoring-frontend.onrender.com`  
**Backend API**: `https://tailoring-api.onrender.com`  
**Database**: Managed on Aiven.io

---

## 🔧 Troubleshooting

### Issue: Backend won't start

**Check**:
1. Environment variables are set correctly
2. Database credentials are correct
3. Check backend logs in Render
4. Verify `npm start` works locally

**Common fixes**:
```bash
# Test database connection locally
DB_TYPE=postgres DB_HOST=[HOST] DB_PORT=[PORT] DB_USER=avnadmin DB_PASSWORD=[PASS] DB_NAME=defaultdb DB_SSL=true node Server/tests/test-db.js
```

### Issue: Frontend can't connect to backend

**Check**:
1. `VITE_API_BASE_URL` in `.env.production` is correct
2. CORS is configured with correct frontend URL
3. Backend is running (check Render logs)
4. Network tab in browser DevTools for failed requests

**Common fixes**:
- Update `FRONTEND_URL` in backend environment variables
- Redeploy backend after CORS changes
- Check browser console for CORS errors

### Issue: Database connection fails

**Check**:
1. Aiven service is running (green status)
2. Database credentials are correct
3. `DB_SSL=true` is set
4. Port and host are correct

**Common fixes**:
```bash
# Test connection with psql
psql "postgresql://avnadmin:[PASSWORD]@[HOST]:[PORT]/defaultdb?sslmode=require"
```

### Issue: 500 errors on API requests

**Check**:
1. Database migrations have been run
2. Tables exist in PostgreSQL
3. Backend logs for specific errors

**Run migrations**:
```bash
# In Render Shell
cd Server
node tests/run-all-migrations.js
```

### Issue: Free tier limitations

**Render.com Free Tier**:
- ⚠️ Backend spins down after 15 minutes of inactivity
- ⚠️ First request after inactivity takes 30-60 seconds
- ⚠️ 750 hours/month limit (enough for 1 service)

**Solutions**:
- Upgrade to Starter plan ($7/month) for always-on service
- Use a cron job to ping your API every 10 minutes
- Accept the cold start delay for free tier

**Aiven.io Free Tier**:
- ⚠️ Limited storage (1GB)
- ⚠️ Single node (no high availability)
- ⚠️ Limited connection pool

**Solutions**:
- Monitor database size
- Optimize queries
- Upgrade to Startup plan ($10/month) if needed

---

## 📝 Optional: Custom Domain

### Add Custom Domain to Render

1. **Frontend**:
   - Render Dashboard → `tailoring-frontend` → **"Settings"**
   - Add custom domain: `www.yourdomain.com`
   - Update DNS CNAME record to point to Render

2. **Backend**:
   - Render Dashboard → `tailoring-api` → **"Settings"**
   - Add custom domain: `api.yourdomain.com`
   - Update DNS CNAME record

3. **Update URLs**:
   - Update `VITE_API_BASE_URL` to `https://api.yourdomain.com`
   - Update `FRONTEND_URL` in backend to `https://www.yourdomain.com`

---

## 🔄 Continuous Deployment

Render automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Fix: Update dashboard styling"
git push origin main

# Render will automatically:
# 1. Detect the push
# 2. Rebuild the service
# 3. Deploy the new version
```

**Disable auto-deploy**:
- Render Dashboard → Service → **"Settings"** → Toggle "Auto-Deploy"

---

## 📊 Monitoring & Maintenance

### Database Backups (Aiven.io)

1. Aiven automatically backs up your database daily
2. View backups: Aiven Console → Service → **"Backups"**
3. Restore from backup if needed

### Application Metrics (Render.com)

1. View metrics: Render Dashboard → Service → **"Metrics"**
2. Monitor:
   - Request rate
   - Response time
   - Memory usage
   - CPU usage

### Cost Optimization

**Free Tier Limits**:
- Render: 750 hours/month (enough for 1 service)
- Aiven: 1GB storage, limited connections

**If you exceed free tier**:
- Render Starter: $7/month per service
- Aiven Startup: $10/month
- **Total estimated cost**: $24/month for production-ready setup

---

## 🎓 Next Steps

1. **Set up monitoring**: Integrate error tracking (Sentry, LogRocket)
2. **Add analytics**: Google Analytics, Mixpanel
3. **Configure CI/CD**: GitHub Actions for automated testing
4. **Set up staging environment**: Create separate staging services
5. **Implement backup strategy**: Regular database backups

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Aiven Documentation](https://docs.aiven.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Vite Production Build](https://vitejs.dev/guide/build.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 🆘 Need Help?

- **Render Support**: https://render.com/docs/support
- **Aiven Support**: https://help.aiven.io/
- **GitHub Issues**: Create an issue in your repository

---

**Congratulations! Your Online Tailoring Management System is now live! 🎉**
