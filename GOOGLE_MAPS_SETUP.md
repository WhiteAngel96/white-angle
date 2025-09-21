# Google Maps Setup Instructions

## Overview
The White Angel website uses Google Maps JavaScript API to display clinic locations and provide interactive map functionality. Follow these steps to configure the Google Maps integration.

## Prerequisites
- Google Cloud Console account
- Billing enabled on your Google Cloud project (required for Maps API)

## Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for the project (required for Maps API usage)

## Step 2: Enable Required APIs
Enable the following APIs in your Google Cloud Console:

1. **Maps JavaScript API** (Required)
   - Navigate to APIs & Services > Library
   - Search for "Maps JavaScript API"
   - Click "Enable"

2. **Places API** (Optional, for enhanced search)
   - Search for "Places API"
   - Click "Enable"

3. **Geocoding API** (Optional, for address search)
   - Search for "Geocoding API"
   - Click "Enable"

## Step 3: Create API Key
1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. **Important**: Restrict the API key for security:
   - Click on the API key to edit it
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain(s): `localhost:*`, `your-domain.com/*`
   - Under "API restrictions", select "Restrict key"
   - Choose the APIs you enabled above

## Step 4: Configure Environment Variables
1. Create a `.env` file in your project root directory:
   ```bash
   touch .env
   ```

2. Add your Google Maps API key to the `.env` file:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

3. **Security Note**: Never commit your `.env` file to version control. It should already be in `.gitignore`.

## Step 5: Restart Development Server
After adding the environment variable, restart your development server:
```bash
npm run dev
```

## Verification
1. Navigate to the "Find White Angel Near You" section on the homepage
2. The map should load and display clinic markers
3. Try searching for locations like "Tel Aviv" or "Jerusalem"
4. Click on markers to see clinic details

## Troubleshooting

### Map not loading
- Check browser console for error messages
- Verify API key is correctly set in `.env` file
- Ensure required APIs are enabled in Google Cloud Console
- Check API key restrictions match your domain

### "Map Configuration Required" message
- This appears when `VITE_GOOGLE_MAPS_API_KEY` is not set
- Double-check your `.env` file exists and contains the correct variable name
- Restart your development server after adding the API key

### Quota exceeded errors
- Check your Google Cloud Console for API usage
- Ensure billing is enabled on your project
- Consider setting up usage quotas and alerts

## API Usage and Costs
- Google Maps offers a generous free tier
- Monitor usage in Google Cloud Console
- Set up billing alerts to avoid unexpected charges
- Consider implementing usage quotas for production

## Production Deployment
1. Set the `VITE_GOOGLE_MAPS_API_KEY` environment variable in your hosting platform
2. Update API key restrictions to include your production domain
3. Monitor API usage and costs in Google Cloud Console

## Support
For Google Maps API issues, refer to:
- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Google Maps Platform Support](https://developers.google.com/maps/support)
