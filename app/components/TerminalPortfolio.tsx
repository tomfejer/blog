'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface Message {
  type: 'system' | 'user' | 'assistant' | 'error';
  content: string;
}

const TerminalPortfolio = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'system',
      content: 'Portfolio Terminal v1.0.0\nType /help for available commands or ask me anything!\n'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Portfolio data - Customized for Tom Fejér
  const portfolioData = {
    name: "Tom Fejér",
    role: "Designer",
    bio: "Powered by coffee, building products, and chasing two tiny superheroes in my free time.",
    work: [
      {
        title: "Designer",
        company: "Independent",
        period: "Current",
        description: "Creating beautiful, user-centric digital experiences"
      }
    ],
    projects: [
      {
        name: "Terminal Portfolio",
        description: "An interactive AI-powered terminal portfolio experience",
        tech: "Next.js, TypeScript, Claude API, Tailwind CSS"
      },
      {
        name: "Personal Blog",
        description: "Minimalist portfolio and blog platform",
        tech: "Next.js, MDX, Vercel"
      }
    ],
    contact: {
      email: "hello@tomfejer.com",
      github: "github.com/tomfejer",
      linkedin: "linkedin.com/in/tomfejer",
      website: "tomfejer.com"
    },
    skills: [
      "UI/UX Design",
      "Product Design",
      "Frontend Development",
      "TypeScript",
      "React/Next.js",
      "Tailwind CSS",
      "Figma",
      "Design Systems"
    ],
    interests: [
      "Coffee brewing",
      "Product development",
      "Parenting",
      "Minimalist design",
      "Developer tools"
    ]
  };

  const systemPrompt = `You are an AI assistant embedded in Tom Fejér's portfolio website. Your role is to help visitors learn about Tom in a friendly, conversational way.

Portfolio Owner Information:
Name: ${portfolioData.name}
Role: ${portfolioData.role}
Bio: ${portfolioData.bio}

Work Experience:
${portfolioData.work.map(w => `- ${w.title} at ${w.company} (${w.period}): ${w.description}`).join('\n')}

Projects:
${portfolioData.projects.map(p => `- ${p.name}: ${p.description} [Tech: ${p.tech}]`).join('\n')}

Skills: ${portfolioData.skills.join(', ')}

Interests: ${portfolioData.interests.join(', ')}

Contact:
Email: ${portfolioData.contact.email}
GitHub: ${portfolioData.contact.github}
LinkedIn: ${portfolioData.contact.linkedin}
Website: ${portfolioData.contact.website}

Guidelines:
- Be conversational, friendly, and slightly playful (Tom has a good sense of humor)
- Keep responses concise (2-3 sentences for simple questions, more detail when asked)
- When discussing projects or work, highlight the design and user experience aspects
- If asked about availability or hiring, mention they can reach out via email
- You have access to all the information above - don't claim you need to search for it
- Respond naturally as if you're Tom's personal assistant who knows him well
- Tom is a designer who codes, so he appreciates both aesthetics and functionality
- He's a parent of two, so he values work-life balance and efficient solutions

Remember: You're helping visitors get to know Tom and his work.`;

  const commands: Record<string, () => Message | 'clear'> = {
    '/help': () => ({
      type: 'system',
      content: `Available commands:
  /work       - View work experience
  /projects   - Browse side projects
  /contact    - Get contact information
  /skills     - List technical skills
  /about      - Learn more about Tom
  /clear      - Clear terminal
  /help       - Show this message

Or just ask me anything about Tom's work, experience, or interests!`
    }),
    '/work': () => ({
      type: 'system',
      content: `Work Experience:\n\n${portfolioData.work.map(w =>
        `${w.title} @ ${w.company}\n${w.period}\n${w.description}\n`
      ).join('\n')}`
    }),
    '/projects': () => ({
      type: 'system',
      content: `Projects:\n\n${portfolioData.projects.map(p =>
        `→ ${p.name}\n  ${p.description}\n  Tech: ${p.tech}\n`
      ).join('\n')}`
    }),
    '/contact': () => ({
      type: 'system',
      content: `Contact Information:\n\nEmail: ${portfolioData.contact.email}\nGitHub: ${portfolioData.contact.github}\nLinkedIn: ${portfolioData.contact.linkedin}\nWebsite: ${portfolioData.contact.website}\n\nFeel free to reach out!`
    }),
    '/skills': () => ({
      type: 'system',
      content: `Technical Skills:\n\n${portfolioData.skills.map(s => `• ${s}`).join('\n')}`
    }),
    '/about': () => ({
      type: 'system',
      content: `About Tom Fejér:\n\n${portfolioData.bio}\n\nRole: ${portfolioData.role}\n\nInterests:\n${portfolioData.interests.map(i => `• ${i}`).join('\n')}`
    }),
    '/clear': () => 'clear'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();

    if (!trimmedCmd) return;

    // Add to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: trimmedCmd }]);

    // Handle slash commands
    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]();
      if (result === 'clear') {
        setMessages([{
          type: 'system',
          content: 'Terminal cleared.\n'
        }]);
      } else {
        setMessages(prev => [...prev, result]);
      }
      return;
    }

    // Handle AI conversation
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmedCmd,
          systemPrompt
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, {
        type: 'assistant',
        content: data.response
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'Error: Unable to process request. Please try again or use /help to see available commands.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commandKeys = Object.keys(commands);
      const matches = commandKeys.filter(cmd => cmd.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm flex flex-col">
      {/* Header */}
      <div className="bg-[#2d2d2d] border-b border-[#3e3e3e] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <div className="ml-4 text-[#888888] text-xs md:text-sm truncate">
          portfolio-terminal ~ tom-fejer
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {msg.type === 'user' && (
              <div>
                <span className="text-[#4ec9b0]">→</span>{' '}
                <span className="text-[#d4d4d4]">{msg.content}</span>
              </div>
            )}
            {msg.type === 'assistant' && (
              <div className="text-[#ce9178] ml-4 my-2">
                {msg.content}
              </div>
            )}
            {msg.type === 'system' && (
              <div className="text-[#888888]">
                {msg.content}
              </div>
            )}
            {msg.type === 'error' && (
              <div className="text-[#f48771]">
                {msg.content}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-[#888888] ml-4">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>Processing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-[#3e3e3e] bg-[#2d2d2d] p-4">
        <div className="flex items-center gap-2">
          <span className="text-[#4ec9b0] flex-shrink-0">→</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[#d4d4d4] min-w-0"
            placeholder="Type a command or ask me anything..."
            disabled={isLoading}
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default TerminalPortfolio;
