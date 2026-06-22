export const profileDataVersion = '2026-06-22'

export const profile = {
  name: 'Tom Fejer',
  displayName: 'Tom Fejér',
  role: 'Staff Product Designer',
  positioning:
    'Builder-designer operating at the intersection of product strategy, agentic prototyping, and engineering.',
  location: {
    country: 'Netherlands',
    timezone: 'Europe/Amsterdam',
  },
  summary:
    'Tom Fejér designs and builds working software so teams can think clearly about what comes next, across AI systems, creator tools, consumer experiences, and prototyping infrastructure.',
  identity: [
    'Capability designer',
    'Builder-designer',
    'Product designer',
    'Design engineering-adjacent product designer',
    'Former design manager',
  ],
  website: 'https://tomfejer.com',
  linkedin: 'https://nl.linkedin.com/in/tomfejer',
}

export const capabilities = [
  {
    id: 'proof-through-prototyping',
    name: 'Proof Through Prototyping',
    description: 'Using functional, high-fidelity prototypes as strategic decision-making tools.',
    principle: 'Prototypes are arguments.',
    problemsSolved: [
      'Ambiguous product direction',
      'Slow decision cycles',
      'Teams debating abstractions without evidence',
    ],
    evidence: [
      'Production-fidelity prototypes',
      'Code contributions',
      'Roadmap influence',
      'Reusable workflows',
    ],
    relatedQuestions: ['prototypes-as-strategy'],
    tags: ['prototyping', 'strategy', 'design-engineering'],
    leverage: 'Turns possible futures into things teams can evaluate, debate, and improve.',
  },
  {
    id: 'visual-programming-systems',
    name: 'Visual Programming Systems',
    description: 'Designing tools that let domain experts create complex behaviors without writing code.',
    principle: 'The right abstraction matters more than the surface UI.',
    problemsSolved: [
      'Technical creation blocked by code-only workflows',
      'Complex behavior that is hard to inspect',
      'Domain experts depending on engineers for every change',
    ],
    evidence: [
      'Visual authoring experiences',
      'Node-based workflows',
      'Complex system authoring made more inspectable',
    ],
    relatedQuestions: ['making-complex-systems-accessible'],
    tags: ['no-code', 'creator-tools', 'complex-ux', 'systems'],
    leverage: 'Makes sophisticated creation accessible without hiding the underlying logic.',
  },
  {
    id: 'ai-behavior-design',
    name: 'AI Behavior Design',
    description: 'Designing how AI systems suggest, act, explain, wait, and collaborate.',
    principle: 'Design AI behavior, not just AI UI.',
    problemsSolved: [
      'Unclear AI initiative',
      'Low trust in AI systems',
      'Chatbot-like interactions where agent behavior is needed',
    ],
    evidence: [
      'Agent behavior principles',
      'AI interaction patterns',
      'Human-AI collaboration models',
    ],
    relatedQuestions: ['designing-ai-behavior'],
    tags: ['AI', 'agents', 'interaction-design', 'human-AI-collaboration'],
    leverage: 'Turns raw AI capability into product behavior people can understand and trust.',
  },
  {
    id: 'creator-economy-design',
    name: 'Creator Economy Design',
    description: 'Designing systems where creators can publish, sell, and earn from digital goods.',
    principle: 'Trust is part of the product.',
    problemsSolved: [
      'Digital goods that are hard to evaluate before purchase',
      'Creator value that is difficult to explain',
      'Marketplace flows that need confidence on both sides',
    ],
    evidence: [
      'Digital commerce experiences',
      'Product detail and purchase-confidence patterns',
      'Creator revenue workflows',
    ],
    relatedQuestions: ['building-trust-in-digital-commerce'],
    tags: ['creator-tools', 'commerce', 'marketplace-ux', 'trust'],
    leverage: 'Helps creators communicate value and helps customers buy with confidence.',
  },
  {
    id: 'designer-workbench',
    name: 'Designer Workbench',
    description:
      'Creating environments where designers can use production-like components, local workflows, and AI to build faster.',
    principle: 'Designers need working materials, not only static canvases.',
    problemsSolved: [
      'Design work disconnected from production components',
      'Slow prototype loops',
      'AI-assisted design work without reusable local workflows',
    ],
    evidence: [
      'Local prototyping workflows',
      'AI-assisted design sandboxes',
      'Production-grade component experiments',
    ],
    relatedQuestions: ['designers-ai-workbench'],
    tags: ['design-engineering', 'AI', 'prototyping', 'workflows'],
    leverage: 'Gives designers a faster path from idea to working product evidence.',
  },
  {
    id: 'organizational-enablement',
    name: 'Organizational Enablement',
    description:
      'Turning personal expertise into reusable systems, templates, workshops, documentation, and coaching.',
    principle: 'Enablement beats gatekeeping.',
    problemsSolved: [
      'Expertise trapped in one person',
      'Teams repeating the same setup work',
      'Designers needing practical ways to adopt new workflows',
    ],
    evidence: [
      'Reusable systems and tools',
      'Workshops and coaching',
      'AI-powered workflow adoption',
    ],
    relatedQuestions: ['prototypes-as-strategy', 'designers-ai-workbench'],
    tags: ['enablement', 'systems', 'design-systems', 'AI'],
    leverage: 'Makes other people faster and more capable.',
  },
]

export const questions = [
  {
    id: 'making-complex-systems-accessible',
    title: 'How do you make complex systems accessible?',
    externalTitle: 'Making Complex Systems Accessible',
    summary:
      'Designing visual programming systems that help domain experts create complex behavior without writing code.',
    capabilities: ['visual-programming-systems'],
    story: {
      whyItMattered:
        'Domain experts often need to create complex behaviors, but traditional tools force them to either write code or depend on engineers for every change.',
      whatIBuilt:
        'A visual programming experience for authoring, inspecting, and evolving complex behavior.',
      whatChanged:
        'The work reduced barriers to creation and made complex systems easier to understand and discuss.',
      whatILearned: 'The right abstraction matters more than the surface UI.',
    },
  },
  {
    id: 'building-trust-in-digital-commerce',
    title: 'How do you help creators earn money and customers buy with confidence?',
    externalTitle: 'Building Trust in Digital Commerce',
    summary:
      'Designing commerce experiences for digital goods where customers need confidence and creators need clear value communication.',
    capabilities: ['creator-economy-design'],
    story: {
      whyItMattered:
        'Digital goods are harder to evaluate than physical products, so both creator value and customer confidence have to be designed into the experience.',
      whatIBuilt:
        'External-facing product and purchase patterns that made digital goods easier to understand before purchase.',
      whatChanged:
        'The experience helped connect creator expression, product clarity, and buyer trust.',
      whatILearned: 'Trust is part of the product, especially when the thing being sold is intangible.',
    },
  },
  {
    id: 'prototypes-as-strategy',
    title: 'How can prototypes drive strategy?',
    externalTitle: 'Prototypes as Strategy',
    summary:
      'Using functional prototypes to make ambiguous futures tangible and turn product debate into evidence.',
    capabilities: ['proof-through-prototyping', 'organizational-enablement'],
    story: {
      whyItMattered:
        'In ambiguous product spaces, discussion alone is too slow. Teams need something concrete to react to.',
      whatIBuilt:
        'Functional prototypes and reusable workflows that helped product, design, and engineering evaluate direction together.',
      whatChanged:
        'The prototypes created shared evidence for strategy, roadmap thinking, and team alignment.',
      whatILearned: 'Slides create opinions. Prototypes create evidence.',
    },
  },
  {
    id: 'designers-ai-workbench',
    title: "What should a designer's AI workbench look like?",
    externalTitle: "Building the Designer's AI Workbench",
    summary:
      'Creating environments for designers to work with real components, real interaction logic, and AI-assisted local workflows.',
    capabilities: ['designer-workbench', 'organizational-enablement'],
    story: {
      whyItMattered:
        'As AI changes how software is made, designers need better environments than static mockups alone.',
      whatIBuilt:
        'Local prototyping and design sandbox workflows for experimenting with production-like components and AI assistance.',
      whatChanged:
        'The work helped designers move faster from concept to working product evidence.',
      whatILearned: 'Designers need working materials, not only static canvases.',
    },
  },
  {
    id: 'designing-ai-behavior',
    title: 'How should AI agents behave?',
    externalTitle: 'Designing AI Behavior',
    summary:
      'Designing when AI should speak, suggest, act, wait, explain, or stay silent.',
    capabilities: ['ai-behavior-design'],
    story: {
      whyItMattered:
        'As AI systems become more agentic, the design problem shifts from screens to behavior.',
      whatIBuilt:
        'Principles and interaction patterns for AI systems that need to collaborate with people.',
      whatChanged:
        'The work framed AI product design around trust, initiative, uncertainty, and timing.',
      whatILearned: 'For AI products, the interface is often adaptive. The deeper design work is behavior.',
    },
  },
]

export const bridges = {
  nodes: [
    { id: 'tom', label: 'Tom', type: 'person' },
    { id: 'strategy', label: 'Strategy', type: 'discipline' },
    { id: 'prototypes', label: 'Prototypes', type: 'medium' },
    { id: 'ai-systems', label: 'AI Systems', type: 'domain' },
    { id: 'product-experience', label: 'Product Experience', type: 'outcome' },
    { id: 'org-capability', label: 'Organizational Capability', type: 'outcome' },
    { id: 'design-systems', label: 'Design Systems', type: 'discipline' },
    { id: 'user-research', label: 'User Research', type: 'discipline' },
  ],
  edges: [
    {
      from: 'prototypes',
      to: 'strategy',
      label: 'turns working demos into strategic decisions',
    },
    {
      from: 'ai-systems',
      to: 'product-experience',
      label: 'turns AI capability into usable product behavior',
    },
    {
      from: 'design-systems',
      to: 'org-capability',
      label: 'turns patterns into team speed',
    },
    {
      from: 'user-research',
      to: 'strategy',
      label: 'turns insights into roadmap direction',
    },
    {
      from: 'prototypes',
      to: 'org-capability',
      label: 'turns personal craft into reusable workflows',
    },
  ],
}

export const hiringFit = {
  candidate: 'Tom Fejér',
  primaryIdentity: 'Capability designer / builder-designer',
  recommendedRoles: [
    'Staff Product Designer',
    'Principal Product Designer',
    'AI Product Designer',
    'Design Engineer-adjacent Product Designer',
    'Founding Designer',
    'Product Design Lead',
  ],
  strongFitWhen: [
    'The product involves AI or agentic workflows',
    'The team needs working prototypes to drive strategy',
    'The problem is ambiguous and cross-functional',
    'The work involves creator tools or complex authoring systems',
    'The team needs systems, not just screens',
  ],
  weakFitWhen: [
    'The role is only visual production',
    'The role has no product influence',
    'The organization does not value prototypes or experimentation',
    'The work is mostly maintenance with low ambiguity',
  ],
  growthArea: 'Scaling strategic influence earlier, before execution begins.',
}

export const background = [
  'Industrial designer by training',
  'BSc and MSc in Industrial Design from Eindhoven University of Technology',
  'Worked at Philips across health, personal care, mother and childcare, and connected-device experiences',
  'Worked at maform, a Budapest design consultancy spanning physical products, digital products, medical, IoT, and transportation',
  'Worked at Prezi as a Principal Product Designer and UX Architect across product strategy, design practice, and team rituals',
  'Currently a Staff Product Designer at Meta Reality Labs, shaping AI agent behavior and creation tools',
]

export const allProfileData = {
  profile,
  background,
  capabilities,
  questions,
  bridges,
  hiringFit,
}
