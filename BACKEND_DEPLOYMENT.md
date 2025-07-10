# 🚀 Backend Deployment Guide (Render.com)

## Why Not Netlify for Backend?

Netlify is designed for **static sites only**. Your backend needs:
- ✅ Continuous server process
- ✅ Database connections
- ✅ File uploads
- ✅ AI API integrations

## 🎯 **Deploy to Render.com (Recommended)**

### **Step 1: Prepare Your Backend**

1. **Add a start script** to `server/package.json`:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

2. **Update server port** to use environment variable:
```javascript
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### **Step 2: Deploy to Render**

1. **Sign up** at [render.com](https://render.com)
2. **Connect your GitHub** repository
3. **Create a new Web Service**
4. **Configure settings**:
   - **Name**: `genai-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### **Step 3: Environment Variables**

Add these in Render dashboard:
```
MONGO_URL=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production
```

### **Step 4: Get Your Backend URL**

After deployment, you'll get a URL like:
`https://your-app-name.onrender.com`

## 🔧 **Alternative: Railway**

### **Railway Deployment**
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Select `server` directory
4. Add environment variables
5. Deploy

## 🔧 **Alternative: Heroku**

### **Heroku Deployment**
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URL=your_mongodb_url
heroku config:set OPENAI_API_KEY=your_openai_key

# Deploy
git push heroku main
```

## 📝 **Required Changes to Your Backend**

### **1. Update `server/index.js`**
```javascript
const PORT = process.env.PORT || 8080;

// Update CORS for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-netlify-app.netlify.app'] 
    : ['http://localhost:3000']
}));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### **2. Update `server/package.json`**
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## 🎯 **After Backend Deployment**

1. **Get your backend URL** (e.g., `https://your-app.onrender.com`)
2. **Update Netlify environment variable**:
   - `REACT_APP_API_URL=https://your-app.onrender.com/api/`
3. **Redeploy your frontend** on Netlify

## 🚨 **Important Notes**

- **MongoDB**: Use MongoDB Atlas (free tier available)
- **CORS**: Update backend CORS to allow your Netlify domain
- **Environment Variables**: Never commit API keys to Git
- **File Uploads**: Consider using Cloudinary for image storage

## 🎉 **Complete Flow**

1. ✅ Deploy backend to Render/Railway/Heroku
2. ✅ Get backend URL
3. ✅ Deploy frontend to Netlify
4. ✅ Set `REACT_APP_API_URL` in Netlify
5. ✅ Test complete application

Your backend will be live and ready to serve your React app! 🚀 