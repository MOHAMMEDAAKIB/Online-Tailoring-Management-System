# Deployment Guide

This guide covers deploying the Online Tailoring Management System to production.

## Pre-Deployment Checklist

- [ ] Update all dependencies to latest secure versions
- [ ] Change all default credentials
- [ ] Generate strong JWT secret
- [ ] Setup production database
- [ ] Configure production Stripe keys
- [ ] Setup production email service
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Setup environment variables on server
- [ ] Create database backups
- [ ] Test all features in staging environment

## Environment Configuration

### Backend (.env)

```env
# Server
NODE_ENV=production
PORT=5000

# Database (Use production credentials)
DB_HOST=your-production-db-host
DB_USER=your-production-db-user
DB_PASSWORD=strong-production-password
DB_NAME=tailoring_system

# JWT (Generate new secret)
JWT_SECRET=generate-new-secret-with-crypto-randomBytes
JWT_EXPIRES_IN=24h

# Stripe (Use live keys)
STRIPE_SECRET_KEY=sk_live_your_live_key

# Email (Production service)
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

### Frontend (.env)

```env
REACT_APP_API_URL=https://api.yourdomain.com/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_live_your_live_key
```

## Database Deployment

### Option 1: AWS RDS

1. Create RDS MySQL instance
2. Configure security groups
3. Enable automated backups
4. Run schema:
```bash
mysql -h your-rds-endpoint -u admin -p tailoring_system < backend/config/schema.sql
```

### Option 2: Google Cloud SQL

1. Create Cloud SQL instance
2. Configure authorized networks
3. Enable backups and high availability
4. Import schema

### Option 3: DigitalOcean Managed Database

1. Create managed MySQL database
2. Add trusted sources
3. Enable automatic backups
4. Import schema

## Backend Deployment

### Option 1: DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build settings:
   - Build Command: `cd backend && npm install`
   - Run Command: `cd backend && npm start`
3. Add environment variables
4. Deploy

### Option 2: AWS EC2

1. Launch EC2 instance (Ubuntu 20.04 LTS)
2. Install Node.js and MySQL client:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clone repository:
```bash
git clone https://github.com/MOHAMMEDAAKIB/Online-Tailoring-Management-System.git
cd Online-Tailoring-Management-System/backend
```

4. Install dependencies:
```bash
npm install
```

5. Create .env file with production values

6. Install PM2:
```bash
sudo npm install -g pm2
```

7. Start application:
```bash
pm2 start server.js --name tailoring-api
pm2 save
pm2 startup
```

8. Configure Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. Enable SSL with Let's Encrypt:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### Option 3: Heroku

1. Install Heroku CLI
2. Login and create app:
```bash
heroku login
heroku create tailoring-api
```

3. Add MySQL addon:
```bash
heroku addons:create jawsdb:kitefin
```

4. Configure environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set STRIPE_SECRET_KEY=your-key
```

5. Deploy:
```bash
git subtree push --prefix backend heroku main
```

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Configure environment variables in Vercel dashboard

4. Add custom domain

### Option 2: Netlify

1. Build production version:
```bash
cd frontend
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy:
```bash
netlify deploy --prod --dir=build
```

4. Configure environment variables in Netlify dashboard

### Option 3: AWS S3 + CloudFront

1. Build production:
```bash
cd frontend
npm run build
```

2. Create S3 bucket
3. Enable static website hosting
4. Upload build folder
5. Create CloudFront distribution
6. Configure custom domain with Route 53

### Option 4: Self-hosted with Nginx

1. Build production:
```bash
cd frontend
npm run build
```

2. Copy build files to server:
```bash
scp -r build/* user@server:/var/www/tailoring
```

3. Configure Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/tailoring;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. Enable SSL:
```bash
sudo certbot --nginx -d yourdomain.com
```

## Security Best Practices

### 1. Environment Variables
- Never commit .env files
- Use different secrets for each environment
- Rotate secrets regularly

### 2. Database Security
- Use strong passwords
- Enable SSL for database connections
- Restrict access by IP
- Regular backups
- Enable query logging

### 3. API Security
- Enable rate limiting
- Implement request validation
- Use HTTPS only
- Set appropriate CORS headers
- Implement API versioning

### 4. Authentication
- Strong JWT secret (32+ characters)
- Short token expiration
- Implement refresh tokens
- Enable 2FA for admin accounts

### 5. Data Protection
- Encrypt sensitive data
- Regular security audits
- Keep dependencies updated
- Monitor for vulnerabilities
- Implement logging and monitoring

## Monitoring

### Application Monitoring

Setup monitoring with:
- New Relic
- DataDog
- AWS CloudWatch
- Google Cloud Monitoring

Monitor:
- API response times
- Error rates
- Database performance
- Server resources

### Logging

Setup centralized logging:
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Papertrail
- Loggly

Log:
- API requests
- Errors and exceptions
- Authentication attempts
- Payment transactions

## Backup Strategy

### Database Backups
- Automated daily backups
- Keep 30 days of backups
- Test restore procedures monthly
- Store backups in different region

### Application Backups
- Version control (Git)
- Configuration backups
- Regular snapshots

## Scaling Strategy

### Horizontal Scaling
1. Use load balancer
2. Deploy multiple instances
3. Implement session management
4. Use Redis for caching

### Vertical Scaling
1. Upgrade server resources
2. Optimize database queries
3. Implement caching
4. CDN for static assets

## Cost Optimization

### Starter Setup ($10-30/month)
- DigitalOcean Droplet: $6/month
- Managed Database: $15/month
- Domain: $10/year
- Total: ~$25/month

### Small Business Setup ($50-100/month)
- AWS EC2 t3.small: $15/month
- RDS MySQL: $30/month
- CloudFront CDN: $10/month
- Route 53: $1/month
- Total: ~$60/month

### Growth Setup ($200+/month)
- Multiple EC2 instances
- Load balancer
- RDS with read replicas
- ElastiCache Redis
- CloudWatch monitoring
- Regular backups

## Post-Deployment

### 1. Testing
- Test all user flows
- Verify payment processing
- Check email notifications
- Test admin functions
- Load testing

### 2. Documentation
- Update API documentation
- Document deployment process
- Create runbook for common issues
- Update README with production URLs

### 3. Communication
- Notify users of new system
- Provide support documentation
- Setup feedback channels
- Monitor user issues

## Maintenance

### Regular Tasks
- Weekly: Check logs for errors
- Weekly: Monitor performance metrics
- Monthly: Update dependencies
- Monthly: Review security logs
- Quarterly: Full security audit
- Yearly: Disaster recovery drill

## Rollback Plan

In case of issues:

1. Keep previous version deployed
2. Use database migrations
3. Have rollback scripts ready
4. Document rollback procedure
5. Test rollback in staging

Example rollback:
```bash
# Stop current version
pm2 stop tailoring-api

# Checkout previous version
git checkout <previous-commit>

# Install dependencies
npm install

# Restart
pm2 restart tailoring-api
```

## Support and Troubleshooting

Common issues:
- Database connection: Check credentials and firewall
- CORS errors: Verify API URL in frontend config
- 502 errors: Check if backend is running
- Payment failures: Verify Stripe keys
- Email not sending: Check email service credentials

For additional support, check logs and error messages.
