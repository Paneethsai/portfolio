# 3D Interactive Student Portfolio

Welcome to the 3D Interactive Portfolio Builder! This project lets you create a stunning, 3D animated personal website in minutes using a simple 6-step wizard.

## How it works

1. The app starts with a **Profile Setup Wizard** (6 steps).
2. You enter your Personal Info, Skills, Projects, About Me, and Social Links.
3. In the final step, you choose your primary theme color and "Publish".
4. The app generates your custom 3D portfolio!

## How to Deploy (For Non-Coders)

To get your website live on the internet so anyone can see it, follow these steps:

### Option 1: One-Click Netlify (Recommended)
1. Make sure you have Node.js installed on your computer.
2. Open your terminal or command prompt in this folder.
3. Run the following command to install the Netlify CLI if you don't have it:
   `npm install -g netlify-cli`
4. Run the deploy script:
   - On Mac/Linux: `./deploy.sh`
   - On Windows: Run `npm run build`, then run `netlify deploy --prod --dir=dist`
5. Follow the prompts to log into Netlify (it's free) and create a new site.
6. The terminal will give you your Live URL!

### Option 2: Drag and Drop
1. Run `npm run build` in your terminal. This creates a `dist` folder.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder onto the page.
4. Done!

## Editing Your Profile
Once the portfolio is generated, you can always click the "Edit & Republish" button in the navigation bar to reopen the setup wizard.

## Tech Stack
- React + Vite
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber
