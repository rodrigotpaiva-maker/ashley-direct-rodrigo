# Ashley Direct - Vercel Deployment Instructions

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- GitHub account
- Vercel account (free tier works perfectly)
- Git installed on your computer

### Step 1: Get the Code
1. Download the `ashley-direct-vercel-deployment` folder
2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `ashley-direct-demo`
   - Make it Public or Private (your choice)
   - Click "Create repository"

### Step 2: Upload to GitHub
```bash
# Navigate to the project folder
cd ashley-direct-vercel-deployment

# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial Ashley Direct deployment"

# Connect to your GitHub repository
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ashley-direct-demo.git
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Import Project"
3. Import from your GitHub repository `ashley-direct-demo`
4. Vercel will auto-detect it's a React app
5. Click "Deploy" (no configuration needed!)

### Step 4: Get Your Professional URL
- Vercel will provide a URL like: `https://ashley-direct-demo.vercel.app`
- Your Ashley Direct platform is now live!

---

## 🎯 Advanced Configuration

### Custom Domain Setup
1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `ashleydirect.yourcompany.com`)
4. Follow Vercel's DNS configuration instructions

### Professional URL Examples
- `https://ashley-direct.vercel.app`
- `https://demo.yourcompany.com`
- `https://ashleydirect.yourcompany.com`

### Environment Variables (Optional)
If you want to customize branding or features:
1. In Vercel Dashboard → Settings → Environment Variables
2. Add variables like:
   - `REACT_APP_COMPANY_NAME=Your Company Name`
   - `REACT_APP_CONTACT_EMAIL=demo@yourcompany.com`

---

## 📋 What You Get

### Complete B2B Platform Features
✅ **Dashboard Homepage** - Business KPIs and navigation
✅ **Order Management** - Create, modify, track orders
✅ **Product Catalog** - 500+ furniture items with search/filtering
✅ **Financial Tools** - Invoices, payments, credits
✅ **Reports & Analytics** - Business intelligence dashboards
✅ **Marketing Center** - Newsletters, promotions
✅ **Administration** - User management, compliance

### Professional Design
✅ **Ashley Furniture Branding** - Professional B2B styling
✅ **Responsive Design** - Works on desktop and mobile
✅ **Business-Grade UX** - Optimized for daily operations
✅ **High Performance** - Fast loading and smooth interactions

---

## 🛠 Troubleshooting

### Build Issues
If deployment fails, check these common issues:
1. **Node Version**: Ensure you're using Node 18+ (set in `package.json`)
2. **Dependencies**: All required packages are included
3. **Build Command**: Uses `npm run build` (already configured)

### Domain Setup
- DNS changes can take 24-48 hours to propagate
- Use Vercel's DNS checker to verify configuration
- Contact Vercel support for domain issues

### Performance Optimization
- Vercel automatically optimizes images and assets
- Uses CDN for global fast loading
- Automatic HTTPS certificate

---

## 📞 Support

For deployment issues:
1. Check Vercel's excellent documentation
2. Vercel's support team is very responsive
3. GitHub repository issues for code-specific problems

**Your Ashley Direct platform will be live in under 5 minutes!**