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
  const [isThinking, setIsThinking] = useState(false);
  const [isMockMode, setIsMockMode] = useState<boolean | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [typingMessage, setTypingMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
  }, [messages, typingMessage]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Typewriter effect
  const typeMessage = (text: string) => {
    setIsTyping(true);
    setTypingMessage('');

    let currentIndex = 0;
    const typingSpeed = 15; // milliseconds per character

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setTypingMessage(text.slice(0, currentIndex + 1));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(typeNextChar, typingSpeed);
      } else {
        // Typing complete
        setIsTyping(false);
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: text
        }]);
        setTypingMessage('');
      }
    };

    typeNextChar();
  };

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
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
    setIsThinking(true);
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

      // Check if we're in mock mode
      if (data.mockMode && isMockMode === null) {
        setIsMockMode(true);
      }

      setIsThinking(false);
      setIsLoading(false);

      // Use typewriter effect for response
      typeMessage(data.response);
    } catch (error) {
      console.error('Chat error:', error);
      setIsThinking(false);
      setIsLoading(false);
      setMessages(prev => [...prev, {
        type: 'error',
        content: 'Error: Unable to process request. Please try again or use /help to see available commands.'
      }]);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);

    // Show autocomplete for slash commands
    if (value.startsWith('/')) {
      const commandKeys = Object.keys(commands);
      const matches = commandKeys.filter(cmd => cmd.startsWith(value));
      if (matches.length > 0 && value !== matches[0]) {
        setAutocompleteOptions(matches);
        setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false);
      }
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleCommand(input);
      setInput('');
      setShowAutocomplete(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Escape key
    if (e.key === 'Escape') {
      setShowAutocomplete(false);
      return;
    }

    // Handle Tab for autocomplete
    if (e.key === 'Tab' && showAutocomplete && autocompleteOptions.length > 0) {
      e.preventDefault();
      setInput(autocompleteOptions[0]);
      setShowAutocomplete(false);
      return;
    }

    // Handle Arrow Up/Down for history (only when autocomplete is not shown)
    if (!showAutocomplete) {
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
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm flex flex-col">
      {/* Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 bg-[#2d2d2d] border-b border-[#3e3e3e] px-4 py-2 flex items-center justify-between z-10">
        <div className="text-[#888888] text-xs md:text-sm truncate">
          portfolio-terminal ~ tom-fejer
        </div>
        {isMockMode && (
          <div className="text-[#febc2e] text-xs bg-[#3e3e3e] px-2 py-1 rounded whitespace-nowrap ml-2">
            DEMO MODE
          </div>
        )}
      </div>

      {/* Messages - with padding for fixed header and footer */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-12 pb-24 px-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="whitespace-pre-wrap break-words max-w-full">
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

        {/* Thinking state */}
        {isThinking && (
          <div className="text-[#888888] ml-4 my-2 flex items-center gap-2">
            <span className="animate-pulse">Thinking</span>
            <span className="flex gap-1">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
            </span>
          </div>
        )}

        {/* Typing message */}
        {isTyping && typingMessage && (
          <div className="text-[#ce9178] ml-4 my-2">
            {typingMessage}
            <span className="animate-pulse">▊</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[#3e3e3e] bg-[#2d2d2d] z-10">
        {/* Autocomplete suggestions */}
        {showAutocomplete && autocompleteOptions.length > 0 && (
          <div className="border-b border-[#3e3e3e] px-4 py-2 space-y-1">
            {autocompleteOptions.map((cmd) => (
              <div
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  setShowAutocomplete(false);
                  inputRef.current?.focus();
                }}
                className="text-[#4ec9b0] text-xs cursor-pointer hover:bg-[#3e3e3e] px-2 py-1 rounded"
              >
                {cmd}
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4" autoComplete="off">
          <div className="flex items-center gap-2">
            <span className="text-[#4ec9b0] flex-shrink-0">→</span>
            <input
              ref={inputRef}
              type="text"
              name="terminal-input"
              id="terminal-input"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#d4d4d4] min-w-0"
              placeholder="Type a command or ask me anything..."
              disabled={isLoading || isTyping}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-form-type="other"
              data-1p-ignore="true"
              aria-autocomplete="none"
              autoFocus
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TerminalPortfolio;
