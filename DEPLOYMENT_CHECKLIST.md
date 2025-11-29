# 🚀 Quick Deployment Checklist

Use this checklist to deploy your app to Render.com + Aiven.io

---

## ✅ Pre-Deployment

- [ ] Code committed and pushed to GitHub
- [ ] Aiven.io account created
- [ ] Render.com account created
- [ ] All local tests passing

---

## 🗄️ Database Setup (Aiven.io)

- [ ] Create PostgreSQL service on Aiven.io
- [ ] Service is running (green status)
- [ ] Copy connection credentials:
  - [ ] Host
  - [ ] Port
  - [ ] User
  - [ ] Password
  - [ ] Database name

---

## 🔧 Backend Deployment (Render.com)

- [ ] Create new Web Service in Render
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - [ ] Root Directory: `Server`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] Add environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `DB_TYPE=postgres`
  - [ ] `DB_HOST` (from Aiven)
  - [ ] `DB_PORT` (from Aiven)
  - [ ] `DB_USER` (from Aiven)
  - [ ] `DB_PASSWORD` (from Aiven)
  - [ ] `DB_NAME` (from Aiven)
  - [ ] `DB_SSL=true`
  - [ ] `JWT_SECRET` (generate random)
  - [ ] `JWT_REFRESH_SECRET` (generate random)
- [ ] Deploy backend
- [ ] Copy backend URL: `https://________.onrender.com`
- [ ] Run database migrations
- [ ] Test API health check: `https://________.onrender.com/`

---

## 🌐 Frontend Deployment (Render.com)

- [ ] Update `client/.env.production` with backend URL
- [ ] Commit and push changes
- [ ] Create new Static Site in Render
- [ ] Configure build settings:
  - [ ] Root Directory: `client`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Publish Directory: `dist`
- [ ] Deploy frontend
- [ ] Copy frontend URL: `https://________.onrender.com`

---

## 🔄 Post-Deployment

- [ ] Update `FRONTEND_URL` in backend environment variables
- [ ] Redeploy backend (after CORS update)
- [ ] Test application:
  - [ ] Can access frontend
  - [ ] Can register new account
  - [ ] Can log in
  - [ ] Can create measurement
  - [ ] Can view dashboard
- [ ] Check backend logs for errors
- [ ] Check frontend network tab for failed requests

---

## 🎯 Production URLs

**Frontend**: `https://________.onrender.com`  
**Backend API**: `https://________.onrender.com`  
**Database**: Aiven.io PostgreSQL

---

## 📝 Notes

- Free tier backend spins down after 15 min inactivity
- First request after inactivity takes 30-60 seconds
- Upgrade to paid plan for always-on service

---

**All done! Your app is live! 🎉**
