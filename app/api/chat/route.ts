import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

// Mock mode check
const MOCK_MODE = !process.env.ANTHROPIC_API_KEY;

// Initialize Anthropic client (only if not in mock mode)
const anthropic = MOCK_MODE ? null : new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Rate limiting (simple in-memory store - use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 10) { // 10 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

// Mock responses for testing without API key
function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('work') || lowerMessage.includes('experience') || lowerMessage.includes('job')) {
    return "I'm currently working as an independent designer, focusing on creating beautiful and user-centric digital experiences. My approach combines clean aesthetics with functional design principles.";
  }

  if (lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('created')) {
    return "I've built several interesting projects! The most recent is this terminal portfolio you're using right now - it's an interactive AI-powered experience. I also maintain a minimalist blog platform built with Next.js and MDX.";
  }

  if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('stack')) {
    return "I specialize in UI/UX design and frontend development. My tech stack includes TypeScript, React, Next.js, Tailwind CSS, and Figma. I'm particularly passionate about design systems and developer tools.";
  }

  if (lowerMessage.includes('coffee') || lowerMessage.includes('interest') || lowerMessage.includes('hobby')) {
    return "Ah, coffee! Yes, I'm definitely powered by it. When I'm not designing or coding, I'm usually experimenting with coffee brewing methods or chasing after my two kids - they're my favorite tiny superheroes!";
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('email')) {
    return "I'd love to hear from you! You can reach me at hello@tomfejer.com. I'm always open to discussing interesting projects and opportunities.";
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hey there! Thanks for checking out my portfolio. Feel free to ask me anything about my work, projects, or interests. Try using the slash commands (type /help to see them) or just ask naturally!";
  }

  if (lowerMessage.includes('who') || lowerMessage.includes('you')) {
    return "I'm Tom Fejér, a designer who loves building products and solving problems through thoughtful design. I'm powered by coffee, passionate about minimalist aesthetics, and a proud parent of two energetic kids!";
  }

  // Default response
  return "That's an interesting question! Try asking me about my work experience, projects, skills, or interests. You can also use slash commands like /work, /projects, or /contact for quick info. (Note: This is a demo mode - connect an API key for full AI responses!)";
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long. Please keep it under 1000 characters.' },
        { status: 400 }
      );
    }

    // MOCK MODE: Return simulated responses
    if (MOCK_MODE) {
      // Simulate a small delay for realism
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

      return NextResponse.json({
        response: getMockResponse(message),
        mockMode: true
      });
    }

    // PRODUCTION MODE: Call Claude API
    const { systemPrompt } = body;

    const response = await anthropic!.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt || 'You are a helpful assistant.',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    // Extract text from response
    const textContent = response.content.find(
      (block) => block.type === 'text'
    );

    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response');
    }

    return NextResponse.json({
      response: textContent.text,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);

    // Handle specific error types
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'API rate limit reached. Please try again later.' },
        { status: 429 }
      );
    }

    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key configuration.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 }
    );
  }
}

// Reject other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
