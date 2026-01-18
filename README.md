# 🖥️ Terminal Portfolio - Interactive AI-Powered Portfolio

An interactive terminal-style portfolio powered by Claude AI. Ask questions, explore projects, and get to know Tom Fejér through an immersive command-line interface.

![Terminal Portfolio](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Claude AI](https://img.shields.io/badge/Claude-3.5%20Sonnet-orange?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

## ✨ Features

- **🤖 AI-Powered Chat**: Conversational AI assistant powered by Claude 3.5 Sonnet
- **⌨️ Terminal Interface**: VSCode-inspired terminal aesthetics
- **📱 Mobile-First**: Fully responsive design, optimized for all devices
- **⚡ Real-time Interaction**: Instant responses with loading states
- **🎯 Slash Commands**: Quick access to portfolio sections
- **📝 Command History**: Navigate previous commands with arrow keys
- **✅ Tab Completion**: Auto-complete commands with Tab key
- **🚀 Auto-Deploy**: GitHub Actions integration for seamless deployments

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- An Anthropic API key ([Get one here](https://console.anthropic.com/settings/keys))
- (Optional) Vercel account for deployment

### Local Development

1. **Clone and Install**

```bash
git clone <your-repo-url>
cd blog
npm install
```

2. **Set Up Environment Variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```bash
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

3. **Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

4. **Customize Your Portfolio**

Edit `app/components/TerminalPortfolio.tsx` and update the `portfolioData` object with your information:

```typescript
const portfolioData = {
  name: "Your Name",
  role: "Your Role",
  bio: "Your bio...",
  work: [...],
  projects: [...],
  contact: {...},
  skills: [...],
  interests: [...]
};
```

## 📦 Production Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "feat: terminal portfolio setup"
git push origin main
```

2. **Deploy on Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variable: `ANTHROPIC_API_KEY`
   - Deploy!

3. **Set Up Auto-Deployment (Optional)**

To enable GitHub Actions auto-deployment:

```bash
# Get these values from your Vercel project settings
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

Add these secrets to your GitHub repository:
- `VERCEL_TOKEN`: Get from [vercel.com/account/tokens](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID`: From Vercel project settings
- `VERCEL_PROJECT_ID`: From Vercel project settings
- `ANTHROPIC_API_KEY`: Your Anthropic API key

Now every push to `main` will automatically deploy to production!

## 🎮 Available Commands

Once running, try these terminal commands:

- `/help` - Show all available commands
- `/work` - View work experience
- `/projects` - Browse side projects
- `/contact` - Get contact information
- `/skills` - List technical skills
- `/about` - Learn more about the portfolio owner
- `/clear` - Clear the terminal

Or just ask questions naturally like:
- "What projects have you worked on?"
- "Tell me about your experience with design"
- "What's your favorite tech stack?"

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Claude 3.5 Sonnet](https://www.anthropic.com/claude) via [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

## 📁 Project Structure

```
.
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Claude API endpoint
│   ├── components/
│   │   └── TerminalPortfolio.tsx # Main terminal component
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page
│   └── global.css                # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions workflow
├── .env.example                  # Environment variables template
├── vercel.json                   # Vercel configuration
└── package.json                  # Dependencies
```

## 🔐 Security & Rate Limiting

The API route includes:
- **Rate Limiting**: 10 requests per minute per IP
- **Input Validation**: Message length limits (1000 chars)
- **Error Handling**: Graceful degradation on API failures
- **API Key Validation**: Server-side only, never exposed to client

## 🎨 Customization

### Change Terminal Colors

Edit `app/components/TerminalPortfolio.tsx`:

```typescript
// Current VSCode theme colors
bg-[#1e1e1e]  // Background
bg-[#2d2d2d]  // Header/Footer
text-[#4ec9b0] // Prompt/Accent
text-[#ce9178] // AI responses
text-[#888888] // System messages
```

### Modify AI Personality

Edit the `systemPrompt` in `app/components/TerminalPortfolio.tsx` to change how the AI responds.

### Add New Slash Commands

Add to the `commands` object in `app/components/TerminalPortfolio.tsx`:

```typescript
const commands = {
  // ... existing commands
  '/custom': () => ({
    type: 'system',
    content: 'Your custom command output here'
  })
};
```

## 🐛 Troubleshooting

### API Key Not Working

- Ensure `ANTHROPIC_API_KEY` is set in `.env.local` for local dev
- For Vercel, add it in Project Settings → Environment Variables
- Restart your dev server after adding environment variables

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Rate Limit Issues

Edit `app/api/chat/route.ts` to adjust the rate limit:

```typescript
if (limit.count >= 10) { // Change this number
  return false;
}
```

## 📱 Testing on Mobile

1. Start dev server: `npm run dev`
2. Find your local IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
3. On your phone, visit: `http://YOUR_IP:3000`
4. Make sure your phone and computer are on the same network

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📮 Contact

Tom Fejér
- Website: [tomfejer.com](https://tomfejer.com)
- GitHub: [@tomfejer](https://github.com/tomfejer)
- Email: hello@tomfejer.com

---

Built with ❤️ and ☕ by Tom Fejér
