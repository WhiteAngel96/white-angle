# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f24efb2b-7d5c-4fc1-aafa-977f7a8d31fb

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f24efb2b-7d5c-4fc1-aafa-977f7a8d31fb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Configure Google Maps (required for map functionality)
# See GOOGLE_MAPS_SETUP.md for detailed instructions
cp .env.example .env
# Edit .env and add your Google Maps API key

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Google Maps JavaScript API

## Google Maps Configuration

This website includes interactive Google Maps functionality for finding White Angel clinic locations. To enable the maps:

1. **Get a Google Maps API Key**: Follow the detailed setup instructions in `GOOGLE_MAPS_SETUP.md`
2. **Set Environment Variable**: Add `VITE_GOOGLE_MAPS_API_KEY=your_key_here` to your `.env` file
3. **Required APIs**: Enable Maps JavaScript API, Places API (optional), and Geocoding API (optional) in Google Cloud Console

**Note**: The map will show a configuration message if the API key is not set up properly.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f24efb2b-7d5c-4fc1-aafa-977f7a8d31fb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
