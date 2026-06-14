import { useState, useEffect, useMemo } from 'react'
import './App.css'
import {
  Rocket, Brain, Shield, Coins, Bot, Lock, Zap,
  Scale, Lightbulb, Orbit, TrendingUp, Layers, Target,
  CheckCircle, Play, Calculator,
  MessageSquare, Menu, X, Star, ArrowRight,
  Briefcase, Plus, Trash2, Download,
  FileText, BookOpen, ScrollText, GraduationCap, Clock,
  ChevronDown, ChevronRight, Award, AlertCircle, ExternalLink,
  HelpCircle, FlaskConical, RotateCcw, Sparkles,
  CreditCard, Bitcoin, Copy, Check, Wallet
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

// ────────────────────────────────────────────────────────────────────
//  MODULE DATA — Udemy course: "DeepTechX Launchpad"
// ────────────────────────────────────────────────────────────────────
const modules = [
  { id: 'M01', title: 'System-Thinking Vetting & De-Hype', level: 'All', icon: Brain,
    color: 'from-purple-500 to-pink-500', hasCalculator: true,
    description: 'Apply human-centered design and commercial velocity frameworks to identify genuinely viable deep tech opportunities. Cut through hype with first-principles analysis.',
    lectures: ['Human-Centered Design for Deep Tech Innovation: The Commercial Velocity Playbook'] },
  { id: 'M02', title: 'Fast-Track Development Framework', level: 'Technical', icon: Zap,
    color: 'from-blue-500 to-cyan-500', hasCalculator: true,
    description: 'Launch your deep tech venture from scientist to scalable startup. Escape the expert trap using the 5-Steps Deep Tech Framework.',
    lectures: ['Deep Tech Venture Launchpad — From Scientist to Scalable Startup', 'The Expert Trap & The 5-Steps Deep Tech Framework'] },
  { id: 'M03', title: 'Regulatory-First Design', level: 'Specialist', icon: Shield,
    color: 'from-emerald-500 to-teal-500', hasCalculator: false,
    description: 'Navigate regulatory environments proactively. Build compliance as a competitive advantage, not a constraint, across space, health, and fintech sectors.',
    lectures: [] },
  { id: 'M04', title: 'Go-To-Market & Tokenomics', level: 'Business', icon: Coins,
    color: 'from-green-500 to-emerald-500', hasCalculator: true,
    description: 'Design tokenization strategies for real-world assets (RWAs) and craft go-to-market playbooks including strategic bitcoin reserve frameworks for emerging markets.',
    lectures: ['Tokenomics and RWAs Tokenization Presentation', 'Stratégie Financière Africaine: Réserves de Bitcoin'] },
  { id: 'M05', title: 'Building AI Agents for Deep Tech', level: 'Advanced', icon: Bot,
    color: 'from-violet-500 to-purple-500', hasCalculator: false,
    description: 'Build and deploy AI automation agencies tailored for deep tech workflows. Become the "Digital Operator" for your sector using local AI agent stacks.',
    lectures: ['Local AI Automation Agency (The "Digital Operator")'] },
  { id: 'M06', title: 'PQC & Quantum-Safe Systems', level: 'Specialist', icon: Lock,
    color: 'from-orange-500 to-red-500', hasCalculator: true,
    description: 'Master post-quantum cryptography and the Crypto Agility framework. Design quantum-safe systems before the Q-Day threat window closes.',
    lectures: ['Post-Quantum Cryptography & Quantum-Safe Systems', 'The Crypto Agility Manifesto Presentation'] },
  { id: 'M07', title: 'Nuclear + Fusion Energy', level: 'Specialist', icon: Zap,
    color: 'from-yellow-500 to-orange-500', hasCalculator: false,
    description: 'Analyze the commercialization pathway for nuclear and fusion energy ventures. Understand reactor economics, licensing hurdles, and the new energy investment landscape.',
    lectures: [] },
  { id: 'M08', title: 'Space Tech: From Project to Hero', level: 'Intrapreneur', icon: Rocket,
    color: 'from-cyan-500 to-blue-500', hasCalculator: true,
    description: 'Commercialize EO and space data across healthcare, mobility, gaming, and logistics. Master EGNSS and Earth Observation startup playbooks for real-world market applications.',
    lectures: [
      'The Earth Observation Startup Playbook - Part 1',
      'The Earth Observation Startup Playbook - Part 2',
      'Space Technology in Healthcare — EGNSS In Healthcare',
      'Space & Gaming: Why Space Tech-Enabled Gaming is More than a Game',
      'Space and Gaming As a Category of Consumer Solutions',
      'Bridging Space Technology with User Needs — EGNSS+EO Data for Mobility, Health, Logistics & Climate',
    ] },
  { id: 'M09', title: 'AI Ethics & Governance', level: 'All', icon: Scale,
    color: 'from-indigo-500 to-violet-500', hasCalculator: false,
    description: 'Navigate AI governance frameworks and boardroom statecraft in a multipolar world. Understand geopolitical drift and how it shapes deep tech strategy in 2026.',
    lectures: ['Boardroom Statecraft 2026: Navigating the Global Drift'] },
  { id: 'M10', title: 'Frugal Innovation', level: 'Entrepreneur', icon: Lightbulb,
    color: 'from-amber-500 to-yellow-500', hasCalculator: false,
    description: 'Apply resource-constrained innovation methodologies to build resilient deep tech ventures with outsized global impact and sovereign scalability.',
    lectures: [] },
  { id: 'M11', title: 'AI Agents in Space Tech', level: 'Advanced', icon: Orbit,
    color: 'from-fuchsia-500 to-pink-500', hasCalculator: false,
    description: 'Deploy autonomous AI agents across space technology workflows — from satellite operations and ground segment automation to mission planning and anomaly detection.',
    lectures: [] },
  { id: 'M12', title: 'Unit Economics & Sovereign Scaling', level: 'Business', icon: TrendingUp,
    color: 'from-lime-500 to-green-500', hasCalculator: true,
    description: 'Model unit economics for deep tech ventures from seed to sovereign-level deployment. Build financial models that hold under real-world capital constraints.',
    lectures: [] },
  { id: 'M13', title: 'First-Principles + Systems Thinking', level: 'All', icon: Layers,
    color: 'from-rose-500 to-red-500', hasCalculator: false,
    description: 'Rebuild complex problems from scratch using first-principles reasoning and systems thinking maps. The mental foundation for every other module.',
    lectures: [] },
  { id: 'M14', title: 'Agentic Monetization & Unicorn Playbook', level: 'Founder', icon: Target,
    color: 'from-sky-500 to-blue-500', hasCalculator: false,
    description: 'Productize your expertise into scalable AI-powered consulting services. Learn the AI-powered consulting revolution and chart the path to unicorn exit.',
    lectures: ['The AI-Powered Consulting Revolution', 'Consulting Productization Training — Productize Yourself!'] },
]

// ────────────────────────────────────────────────────────────────────
//  CURRICULUM — Udemy-style Sections → Lessons
// ────────────────────────────────────────────────────────────────────
type LessonType = 'video' | 'reading' | 'lab' | 'quiz'
type Lesson = { id: string; title: string; duration: string; type: LessonType; preview?: boolean }
type Section = { id: string; title: string; lessons: Lesson[] }

const curriculumByModule: Record<string, Section[]> = {
  M01: [
    { id: 's1', title: 'Introduction', lessons: [
      { id: 'l1', title: 'Welcome & The De-Hype Mindset', duration: '6:42', type: 'video', preview: true },
      { id: 'l2', title: 'Why 90% of Deep Tech Fails Commercialization', duration: '11:08', type: 'video' },
    ]},
    { id: 's2', title: 'Human-Centered Design for Deep Tech', lessons: [
      { id: 'l3', title: 'The Commercial Velocity Playbook', duration: '18:24', type: 'video' },
      { id: 'l4', title: 'TRL vs CRL: The Missing Half', duration: '12:55', type: 'video' },
      { id: 'l5', title: 'Reading: First-Principles Decomposition', duration: '7 min read', type: 'reading' },
    ]},
    { id: 's3', title: 'Apply: De-Hype Scoreboard', lessons: [
      { id: 'l6', title: 'Hands-on: Score Your Tech', duration: '15:00', type: 'lab' },
      { id: 'l7', title: 'Module 1 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
  M02: [
    { id: 's1', title: 'The Expert Trap', lessons: [
      { id: 'l1', title: 'Why Scientists Get Stuck', duration: '9:30', type: 'video', preview: true },
      { id: 'l2', title: 'The 5-Steps Deep Tech Framework', duration: '22:15', type: 'video' },
    ]},
    { id: 's2', title: 'From Scientist to Scalable Startup', lessons: [
      { id: 'l3', title: 'Deep Tech Venture Launchpad', duration: '28:40', type: 'video' },
      { id: 'l4', title: '90-Day MVP Sprint Methodology', duration: '14:20', type: 'video' },
      { id: 'l5', title: 'Lab: Build Your Sprint', duration: '20:00', type: 'lab' },
    ]},
    { id: 's3', title: 'Assessment', lessons: [
      { id: 'l6', title: 'Module 2 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
  M04: [
    { id: 's1', title: 'Tokenomics Fundamentals', lessons: [
      { id: 'l1', title: 'RWAs Tokenization Overview', duration: '16:10', type: 'video', preview: true },
      { id: 'l2', title: 'Designing Sustainable Token Supply', duration: '19:45', type: 'video' },
    ]},
    { id: 's2', title: 'Strategic Bitcoin Reserves', lessons: [
      { id: 'l3', title: 'Stratégie Financière Africaine: Réserves de Bitcoin', duration: '24:30', type: 'video' },
      { id: 'l4', title: 'Sovereign Treasury Design Patterns', duration: '13:15', type: 'video' },
    ]},
    { id: 's3', title: 'Apply: Token Designer', lessons: [
      { id: 'l5', title: 'Lab: Live Tokenomics Modeling', duration: '25:00', type: 'lab' },
      { id: 'l6', title: 'Module 4 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
  M06: [
    { id: 's1', title: 'The Q-Day Threat', lessons: [
      { id: 'l1', title: 'Why PQC Matters Now', duration: '11:25', type: 'video', preview: true },
      { id: 'l2', title: 'NIST PQC Standards Deep Dive', duration: '26:40', type: 'video' },
    ]},
    { id: 's2', title: 'The Crypto Agility Manifesto', lessons: [
      { id: 'l3', title: 'Designing for Algorithm Rotation', duration: '17:30', type: 'video' },
      { id: 'l4', title: 'Migration Patterns: Hybrid → Quantum-Safe', duration: '21:00', type: 'video' },
    ]},
    { id: 's3', title: 'Apply & Assess', lessons: [
      { id: 'l5', title: 'Lab: Risk Calculator', duration: '15:00', type: 'lab' },
      { id: 'l6', title: 'Module 6 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
  M08: [
    { id: 's1', title: 'Earth Observation Startup Playbook', lessons: [
      { id: 'l1', title: 'EO Playbook — Part 1', duration: '28:15', type: 'video', preview: true },
      { id: 'l2', title: 'EO Playbook — Part 2', duration: '24:50', type: 'video' },
    ]},
    { id: 's2', title: 'EGNSS Vertical Applications', lessons: [
      { id: 'l3', title: 'Space Technology in Healthcare', duration: '19:40', type: 'video' },
      { id: 'l4', title: 'EGNSS+EO Data for Mobility, Health, Logistics & Climate', duration: '32:10', type: 'video' },
    ]},
    { id: 's3', title: 'Space + Gaming', lessons: [
      { id: 'l5', title: 'Why Space Tech-Enabled Gaming is More than a Game', duration: '17:20', type: 'video' },
      { id: 'l6', title: 'Consumer Solutions Category', duration: '14:55', type: 'video' },
    ]},
    { id: 's4', title: 'Apply & Assess', lessons: [
      { id: 'l7', title: 'Lab: Launch Cost Calculator', duration: '12:00', type: 'lab' },
      { id: 'l8', title: 'Module 8 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
  M14: [
    { id: 's1', title: 'The AI-Powered Consulting Revolution', lessons: [
      { id: 'l1', title: 'Productize Yourself', duration: '22:45', type: 'video', preview: true },
      { id: 'l2', title: 'Agentic Monetization Patterns', duration: '18:30', type: 'video' },
    ]},
    { id: 's2', title: 'Consulting Productization Training', lessons: [
      { id: 'l3', title: 'From Hourly to Productized', duration: '25:10', type: 'video' },
      { id: 'l4', title: 'The Unicorn Playbook', duration: '27:00', type: 'video' },
    ]},
    { id: 's3', title: 'Assessment', lessons: [
      { id: 'l5', title: 'Module 14 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
}

// ────────────────────────────────────────────────────────────────────
//  QUIZZES — Multi-choice format (modeled on GBL EAP + DC Academy Cx)
// ────────────────────────────────────────────────────────────────────
type Question = { q: string; options: string[]; correct: number; explanation: string }
type Quiz = { moduleId: string; title: string; passingScore: number; questions: Question[] }

const quizzes: Quiz[] = [
  { moduleId: 'M01', title: 'De-Hype & Vetting Quiz', passingScore: 80, questions: [
    { q: 'A founder pitches a quantum-AI cancer-fusion blockchain. Your first move is to:',
      options: ['Invest immediately — buzzword density is high', 'Apply first-principles decomposition to isolate one real value vector', 'Wait for a tier-1 VC to lead', 'Ask the founder for a token whitepaper'],
      correct: 1, explanation: 'First-principles decomposition — separate the actual physics or commercial reality from the hype stack.' },
    { q: 'Which pair of readiness levels best diagnoses deep tech viability?',
      options: ['MVP + LTV', 'TRL + CRL', 'CAC + ARR', 'IRR + NPV'],
      correct: 1, explanation: 'TRL (Technology Readiness) and CRL (Commercial Readiness) together expose the gap most failed deep tech startups fall into.' },
    { q: 'In the De-Hype Scoreboard, "Sovereign Risk" weights against the score because:',
      options: ['VCs hate regulation', 'Permit/licence drag can extend timelines 3-7 years', 'It is required by SEC filing', 'It signals founder weakness'],
      correct: 1, explanation: 'Sovereign and regulatory drag is the silent killer of deep tech — most founders underestimate licensing timelines.' },
    { q: 'A "KILL IT" verdict means:',
      options: ['Pivot the product immediately', 'Kill the venture and salvage the team', 'Continue but reduce budget', 'Get a second opinion only'],
      correct: 1, explanation: 'When TRL+CRL are too low relative to risk and energy feasibility, the rational call is to redeploy team and capital.' },
    { q: 'Commercial Velocity is best described as:',
      options: ['How fast you can ship code', 'The compounding rate of customer-validated learning per dollar', 'Revenue / month', 'Team velocity in story points'],
      correct: 1, explanation: 'Commercial Velocity captures the speed of validated learning — not output, but evidence of pull from the market.' },
  ]},
  { moduleId: 'M02', title: 'Fast-Track Framework Quiz', passingScore: 80, questions: [
    { q: 'The "Expert Trap" is when a deep tech founder:',
      options: ['Hires only PhDs', 'Optimizes for technical elegance over commercial pull', 'Refuses to pivot', 'Takes too long to fundraise'],
      correct: 1, explanation: 'The trap is mistaking technical sophistication for commercial value — the market does not buy elegance.' },
    { q: 'Step 1 of the 5-Step Deep Tech Framework is:',
      options: ['Build the MVP', 'Define the deployable real-world bottleneck', 'Raise a seed round', 'Hire a CTO'],
      correct: 1, explanation: 'Every successful deep tech venture starts by precisely defining the bottleneck their tech removes from a real workflow.' },
    { q: 'In a 90-day MVP sprint, what is the single most important output?',
      options: ['A working prototype', 'A signed LOI or pilot agreement', 'A pitch deck', 'A patent filing'],
      correct: 1, explanation: 'A signed LOI/pilot proves CRL movement — far more valuable than a prototype no customer has touched.' },
    { q: 'Sprint Week 12 should produce:',
      options: ['Final product launch', 'Investor demo + customer evidence pack', 'Hire 10 engineers', 'New whitepaper'],
      correct: 1, explanation: 'Week 12 is decision week — package the evidence for the next funding gate.' },
    { q: 'Fast-track does NOT mean:',
      options: ['Cutting corners on safety or compliance', 'Compressing the validation loop', 'Concurrent regulatory and product work', 'Sprinting toward customer evidence'],
      correct: 0, explanation: 'Fast-track compresses learning loops, not safety or compliance — those remain non-negotiable.' },
  ]},
  { moduleId: 'M04', title: 'Tokenomics & GTM Quiz', passingScore: 80, questions: [
    { q: 'RWA tokenization adds value primarily by:',
      options: ['Making assets more volatile', 'Reducing settlement time and fractionalizing access', 'Avoiding regulation', 'Replacing equity'],
      correct: 1, explanation: 'RWA tokenization unlocks liquidity and fractional ownership — speed + accessibility, not regulatory arbitrage.' },
    { q: 'A sovereign Bitcoin reserve hedges against:',
      options: ['Inflation in local fiat', 'Tech disruption', 'Climate risk', 'Demographic decline'],
      correct: 0, explanation: 'The core thesis: BTC reserves protect sovereign treasuries from fiat debasement and FX shock.' },
    { q: 'Healthy vesting design for founders and team typically spans:',
      options: ['0-6 months', '12-48 months with cliff', 'Lifetime', 'Vesting is optional'],
      correct: 1, explanation: '12-48 month vesting with a 12-month cliff aligns long-term commitment and reduces dump risk.' },
    { q: 'Revenue-share token models work when:',
      options: ['Token is purely speculative', 'There is real protocol cashflow to distribute', 'Team retains 80% of supply', 'There is no audit'],
      correct: 1, explanation: 'Revenue-share tokens need actual cashflow — otherwise they are securities with no backing.' },
    { q: 'The first GTM move for a tokenized RWA platform should be:',
      options: ['Mass marketing', 'Anchor a single institutional issuer + regulator dialogue', 'Airdrop to retail', 'List on a DEX'],
      correct: 1, explanation: 'Anchor issuer + regulator alignment de-risks every subsequent move — it is the only durable GTM.' },
  ]},
  { moduleId: 'M06', title: 'PQC & Quantum-Safe Quiz', passingScore: 80, questions: [
    { q: 'Q-Day refers to:',
      options: ['Quarter-end day for VCs', 'The day a cryptographically-relevant quantum computer exists', 'Token launch day', 'Q1 review day'],
      correct: 1, explanation: 'Q-Day is when CRQC capability lands — and prior "harvest now, decrypt later" attacks become realized.' },
    { q: 'Crypto Agility means:',
      options: ['Rotating coins fast', 'System ability to swap cryptographic primitives without re-architecting', 'Using only ECC', 'Storing keys in HSM'],
      correct: 1, explanation: 'Crypto agility is the architectural property — algorithms become plug-in, not load-bearing.' },
    { q: 'Which is a NIST-standardized PQC signature scheme?',
      options: ['RSA-4096', 'SLH-DSA', 'Curve25519', 'ChaCha20'],
      correct: 1, explanation: 'SLH-DSA (formerly SPHINCS+) is a NIST-standardized hash-based signature.' },
    { q: 'The recommended first migration step for a large estate is:',
      options: ['Replace all certificates overnight', 'Build a cryptographic asset inventory', 'Ignore until Q-Day', 'Wait for vendor mandates'],
      correct: 1, explanation: 'You cannot migrate what you cannot see — inventory first, then prioritize by exposure.' },
    { q: 'Hybrid mode (classical + PQC) is preferred during transition because:',
      options: ['It is cheaper', 'It provides defense-in-depth and graceful fallback', 'PQC is broken', 'Classical is faster'],
      correct: 1, explanation: 'Hybrid gives you both worlds — classical certainty and PQC future-proofing, with fallback if a PQC algo is broken.' },
  ]},
  { moduleId: 'M08', title: 'Space Tech Commercialization Quiz', passingScore: 80, questions: [
    { q: 'The first commercial trap in Earth Observation is:',
      options: ['Selling pixels instead of decisions', 'Pricing too high', 'Launching too many satellites', 'Hiring too few engineers'],
      correct: 0, explanation: 'EO startups die selling imagery; they survive selling decisions and outcomes.' },
    { q: 'EGNSS in healthcare primarily enables:',
      options: ['Faster MRIs', 'Time-stamped, geo-authenticated medical events and logistics', 'Cheaper drugs', 'New surgeries'],
      correct: 1, explanation: 'Precise, authenticated time/location stamps unlock cold-chain, telemedicine, and clinical trial integrity.' },
    { q: 'Space-enabled gaming is a real category because:',
      options: ['Players love rockets', 'Real-world EO + position data create persistent, sovereign-state-aware game economies', 'NASA funds games', 'It is cheaper than AAA'],
      correct: 1, explanation: 'Live planetary data turns games into living simulations — a moat AAA studios cannot replicate.' },
    { q: 'The fastest path from project to product in space tech is:',
      options: ['Build your own constellation first', 'Use existing constellations + monetize an application layer', 'Wait for a big contract', 'Buy a satellite'],
      correct: 1, explanation: 'App-layer plays compound faster than hardware — focus capex on differentiation, not the bus.' },
    { q: 'When pricing EO insights, anchor to:',
      options: ['Cost-plus margin', 'Value of the decision unlocked for the customer', 'Competitor pricing', 'Sensor cost'],
      correct: 1, explanation: 'Value-based pricing aligns with how the customer measures ROI — never sell on cost.' },
  ]},
  { moduleId: 'M14', title: 'Agentic Monetization Quiz', passingScore: 80, questions: [
    { q: 'Productizing consulting means:',
      options: ['Charging more per hour', 'Packaging repeatable expertise into agent-augmented assets', 'Hiring more juniors', 'Going IPO'],
      correct: 1, explanation: 'You decouple revenue from time by turning expertise into agent-backed, reusable products.' },
    { q: 'The unicorn playbook for solo deep tech experts hinges on:',
      options: ['Joining a Big-4 firm', 'Agent leverage + niche dominance + sovereign distribution', 'Posting on LinkedIn daily', 'Buying ads'],
      correct: 1, explanation: 'Agent leverage compounds expertise; niche + sovereign reach gives a defensible position.' },
    { q: 'The first revenue gate for a productized consulting offer is:',
      options: ['10 paying customers at the productized price point', '1 LinkedIn post', '1M website visits', 'A book deal'],
      correct: 0, explanation: '10 paying customers prove the product fits the niche — only then scale agent infrastructure.' },
    { q: 'Agentic monetization is NOT:',
      options: ['Replacing humans entirely on every job', 'Multiplying a single expert across many deliverables', 'Compressing service delivery time', 'Lowering marginal cost per delivery'],
      correct: 0, explanation: 'Agentic monetization augments expert leverage — it does not aim to fully replace the expert.' },
    { q: 'When pricing productized consulting:',
      options: ['Match Upwork rates', 'Price to the value of the outcome, not the input hours', 'Discount for early customers always', 'Match competitor SaaS'],
      correct: 1, explanation: 'Value pricing aligns the offer to the buyer\'s ROI — hourly thinking caps your ceiling.' },
  ]},
]

// ────────────────────────────────────────────────────────────────────
//  RESOURCES — Whitepapers, eBooks, Memos
// ────────────────────────────────────────────────────────────────────
type ResourceType = 'whitepaper' | 'ebook' | 'memo' | 'template' | 'dataset'
type Resource = { id: string; title: string; type: ResourceType; description: string; size: string; pages?: number; tag: string }

const resources: Resource[] = [
  { id: 'r1', title: 'The Crypto Agility Manifesto', type: 'whitepaper',
    description: 'A 2026 framework for designing quantum-safe systems before Q-Day. Covers NIST PQC selection, hybrid migration patterns, and crypto asset inventory.',
    size: '2.4 MB', pages: 38, tag: 'PQC' },
  { id: 'r2', title: 'Earth Observation Startup Playbook', type: 'ebook',
    description: 'Two-part guide: from pixel-to-decision pricing, anchor customer playbooks, and vertical commercialization patterns across health, mobility, climate.',
    size: '5.1 MB', pages: 84, tag: 'Space' },
  { id: 'r3', title: 'Stratégie Financière Africaine: Réserves de Bitcoin', type: 'whitepaper',
    description: 'Strategic Bitcoin reserve framework for African sovereign treasuries. Hedge, custody, and policy design.',
    size: '3.2 MB', pages: 46, tag: 'Tokenomics' },
  { id: 'r4', title: 'Boardroom Statecraft 2026', type: 'memo',
    description: 'Executive briefing on geopolitical drift, AI governance, and how multipolarity reshapes deep tech strategy.',
    size: '1.1 MB', pages: 18, tag: 'Governance' },
  { id: 'r5', title: 'Tokenomics & RWAs Tokenization', type: 'whitepaper',
    description: 'Design patterns for sustainable token economies and real-world asset tokenization architectures.',
    size: '2.8 MB', pages: 52, tag: 'Tokenomics' },
  { id: 'r6', title: 'The 5-Steps Deep Tech Framework', type: 'ebook',
    description: 'The complete playbook for escaping the expert trap and shipping from scientist to scalable startup in 90 days.',
    size: '4.3 MB', pages: 72, tag: 'Framework' },
  { id: 'r7', title: '90-Day MVP Sprint Template', type: 'template',
    description: 'Editable sprint planning template with weekly goals, evidence checklists, and investor-ready milestones.',
    size: '480 KB', tag: 'Template' },
  { id: 'r8', title: 'De-Hype Scoreboard Dataset', type: 'dataset',
    description: 'Anonymized scoring data across 200+ deep tech startups (2022-2026). Use for benchmarking and pattern analysis.',
    size: '12 MB', tag: 'Data' },
  { id: 'r9', title: 'Local AI Automation Agency Stack', type: 'ebook',
    description: 'Step-by-step build of the "Digital Operator" — local AI agent stack for deep tech workflows.',
    size: '3.7 MB', pages: 64, tag: 'AI Agents' },
  { id: 'r10', title: 'EGNSS Vertical Application Catalog', type: 'whitepaper',
    description: 'Catalog of EGNSS+EO use cases across healthcare, mobility, logistics, gaming, and climate.',
    size: '2.1 MB', pages: 36, tag: 'Space' },
]

const resourceMeta: Record<ResourceType, { label: string; icon: typeof FileText; color: string }> = {
  whitepaper: { label: 'Whitepaper', icon: FileText, color: 'from-purple-500 to-pink-500' },
  ebook: { label: 'eBook', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
  memo: { label: 'Memo', icon: ScrollText, color: 'from-emerald-500 to-teal-500' },
  template: { label: 'Template', icon: Layers, color: 'from-amber-500 to-orange-500' },
  dataset: { label: 'Dataset', icon: TrendingUp, color: 'from-rose-500 to-red-500' },
}

const lessonIcon: Record<LessonType, typeof Play> = {
  video: Play, reading: FileText, lab: FlaskConical, quiz: HelpCircle,
}

// ────────────────────────────────────────────────────────────────────
//  CALCULATORS (dark-themed)
// ────────────────────────────────────────────────────────────────────
function DeHypeCalculator() {
  const [tech, setTech] = useState('Quantum Computing')
  const [trl, setTrl] = useState(4)
  const [crl, setCrl] = useState(3)
  const [risk, setRisk] = useState(8)
  const [energy, setEnergy] = useState(6)

  const denominator = risk + (10 - energy) || 1
  const score = Math.round((trl + crl) * 10 / denominator)
  const verdict = score >= 80 ? 'UNICORN' : score >= 60 ? 'STRONG' : score >= 40 ? 'RISKY' : 'KILL IT'
  const verdictColor = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-blue-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">De-Hype Scoreboard 2026</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="Tech Name" className="text-lg bg-white/5 border-white/10 text-white placeholder:text-white/40" />
          <div>
            <label className="text-sm font-medium text-white/70">TRL: {trl}</label>
            <Slider value={[trl]} onValueChange={(v) => setTrl(v[0])} min={1} max={9} />
          </div>
          <div>
            <label className="text-sm font-medium text-white/70">CRL: {crl}</label>
            <Slider value={[crl]} onValueChange={(v) => setCrl(v[0])} min={1} max={9} />
          </div>
          <div>
            <label className="text-sm font-medium text-white/70">Sovereign Risk: {risk}</label>
            <Slider value={[risk]} onValueChange={(v) => setRisk(v[0])} min={1} max={10} />
          </div>
          <div>
            <label className="text-sm font-medium text-white/70">Energy Feasibility: {energy}</label>
            <Slider value={[energy]} onValueChange={(v) => setEnergy(v[0])} min={1} max={10} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-xl flex flex-col items-center justify-center">
          <div className="text-6xl font-black">{score}</div>
          <div className={`text-2xl font-bold mt-2 ${verdictColor}`}>{verdict}</div>
          <Button className="mt-4 bg-white text-purple-700 hover:bg-gray-100">Export Scorecard</Button>
        </div>
      </div>
    </div>
  )
}

function SprintCalculator() {
  const [project, setProject] = useState('Sovereign AI Agent Platform')
  const [weeks, setWeeks] = useState(Array.from({length: 12}, (_, i) => ({ id: i + 1, goal: '', owner: '' })))

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">90-Day MVP Sprint Builder</h3>
      <Input value={project} onChange={(e) => setProject(e.target.value)} placeholder="Project Name" className="text-lg mb-4 bg-white/5 border-white/10 text-white placeholder:text-white/40" />
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
        {weeks.map((week) => (
          <div key={week.id} className="bg-white/5 border border-white/10 p-3 rounded-lg">
            <div className="font-bold text-cyan-400">W{week.id}</div>
            <input
              placeholder="Goal"
              className="w-full text-xs bg-white/5 border border-white/10 rounded px-2 py-1 mt-1 text-white placeholder:text-white/40"
              value={week.goal}
              onChange={(e) => {
                const newWeeks = [...weeks]
                newWeeks[week.id - 1] = { ...newWeeks[week.id - 1], goal: e.target.value }
                setWeeks(newWeeks)
              }}
            />
          </div>
        ))}
      </div>
      <Button className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600">Generate Roadmap</Button>
    </div>
  )
}

function TokenomicsCalculator() {
  const [name, setName] = useState('DEEPTECH')
  const [supply, setSupply] = useState(100000000)
  const [price, setPrice] = useState(0.1)
  const [vesting, setVesting] = useState(24)
  const [revenue, setRevenue] = useState(70)

  const marketCap = Math.round(supply * price * (1 + revenue / 100))

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Live Tokenomics Designer</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Token Name" className="bg-white/5 border-white/10 text-white" />
          <Input type="number" value={supply} onChange={(e) => setSupply(Number(e.target.value))} placeholder="Total Supply" className="bg-white/5 border-white/10 text-white" />
          <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Initial Price ($)" step="0.01" className="bg-white/5 border-white/10 text-white" />
          <div>
            <label className="text-sm font-medium text-white/70">Vesting: {vesting} months</label>
            <Slider value={[vesting]} onValueChange={(v) => setVesting(v[0])} min={0} max={48} />
          </div>
          <div>
            <label className="text-sm font-medium text-white/70">Revenue Share: {revenue}%</label>
            <Slider value={[revenue]} onValueChange={(v) => setRevenue(v[0])} min={0} max={90} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-6 rounded-xl flex flex-col items-center justify-center">
          <div className="text-sm opacity-80">Projected Market Cap</div>
          <div className="text-4xl font-black">${marketCap.toLocaleString()}</div>
          <Button className="mt-4 bg-white text-green-700 hover:bg-gray-100">Mint Token</Button>
        </div>
      </div>
    </div>
  )
}

function PQCCalculator() {
  const [ecdsa, setEcdsa] = useState(50000)
  const [data, setData] = useState(1200)

  const risk = Math.min(99, Math.round((ecdsa / 10000) + (data / 100)))
  const days = 1825 - (risk * 15)
  const algo = risk > 70 ? 'SLH-DSA' : 'Kyber-768'

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">PQC Migration Risk Calculator</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <div className="text-4xl font-black text-orange-400">{risk}</div>
          <div className="text-sm text-white/60">Risk Score</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <div className="text-4xl font-black text-red-400">{days}</div>
          <div className="text-sm text-white/60">Days to Q-Day</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <div className="text-2xl font-black text-purple-400">{algo}</div>
          <div className="text-sm text-white/60">Recommended</div>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-white/70">ECDSA Keys: {ecdsa.toLocaleString()}</label>
          <Slider value={[ecdsa]} onValueChange={(v) => setEcdsa(v[0])} min={0} max={1000000} step={1000} />
        </div>
        <div>
          <label className="text-sm font-medium text-white/70">Data (TB): {data}</label>
          <Slider value={[data]} onValueChange={(v) => setData(v[0])} min={0} max={10000} step={100} />
        </div>
      </div>
      <Button className="mt-4 bg-gradient-to-r from-red-600 to-orange-600">Generate Migration Plan</Button>
    </div>
  )
}

function SpaceCalculator() {
  const [rocket, setRocket] = useState('Vikram-3')
  const [payload, setPayload] = useState(500)

  const cost = payload * 18000
  const breakeven = Math.round(100000000 / cost)
  const marketFit = payload > 1000 ? 'UNICORN' : 'NICHE'

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Space Tech Launch Calculator</h3>
      <Input value={rocket} onChange={(e) => setRocket(e.target.value)} placeholder="Rocket Name" className="mb-4 bg-white/5 border-white/10 text-white" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <input
            type="number"
            value={payload}
            onChange={(e) => setPayload(Number(e.target.value))}
            className="text-2xl font-black w-full text-center bg-transparent text-white border-b border-white/20"
          />
          <div className="text-sm text-white/60">Payload (kg)</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <div className="text-2xl font-black text-cyan-400">${cost.toLocaleString()}</div>
          <div className="text-sm text-white/60">Cost to LEO</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <div className="text-2xl font-black text-green-400">{breakeven}x</div>
          <div className="text-sm text-white/60">Breakeven</div>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
          <div className="text-2xl font-black text-purple-400">{marketFit}</div>
          <div className="text-sm text-white/60">Market Fit</div>
        </div>
      </div>
      <Button className="bg-gradient-to-r from-cyan-600 to-blue-600">Simulate Launch</Button>
    </div>
  )
}

function SovereignCalculator() {
  const [location, setLocation] = useState('UAE')
  const locations = [
    { id: 'UAE', name: 'UAE', benefit: '0% Tax + $10B AI Fund' },
    { id: 'India', name: 'India', benefit: '1B+ Users' },
    { id: 'Switzerland', name: 'Swiss', benefit: 'Neutral + DLT Laws' },
  ]

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">Sovereign Scaling Decision Engine</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setLocation(loc.id)}
            className={`p-4 rounded-xl text-center transition border ${
              location === loc.id
                ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white border-transparent'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            }`}
          >
            <div className="text-xl font-black">{loc.name}</div>
            <div className="text-sm opacity-80">{loc.benefit}</div>
          </button>
        ))}
      </div>
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-4 rounded-xl text-center">
        <div className="text-xl font-bold">Your 2026 HQ: {location}</div>
        <Button className="mt-3 bg-white text-yellow-700 hover:bg-gray-100">Generate Scaling Plan</Button>
      </div>
    </div>
  )
}

function ReadinessCalculator() {
  const [scores, setScores] = useState({ tech: 4, market: 6, team: 7, regulatory: 3, financial: 5, ai: 2 })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const maxScore = 60
  const percentage = Math.round((totalScore / maxScore) * 100)
  const status = percentage >= 70 ? 'SCALING PHASE' : percentage >= 50 ? 'GROWTH PHASE' : 'DEVELOPMENT PHASE'
  const recommendedModules = percentage >= 70 ? ['M12', 'M14'] : percentage >= 50 ? ['M04', 'M08', 'M12'] : ['M01', 'M02', 'M03', 'M10']

  const handleSubmit = () => { if (email) setSubmitted(true) }

  if (submitted) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Report Sent!</h3>
        <p className="text-white/60">Check your email for your personalized DeepTechX roadmap.</p>
      </div>
    )
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Launchpad Readiness Calculator</h3>
      <div className="space-y-3 mb-6">
        {Object.entries({ tech: 'Technology Maturity', market: 'Market Validation', team: 'Team Strength', regulatory: 'Regulatory Readiness', financial: 'Financial Runway', ai: 'AI Integration' }).map(([key, label]) => (
          <div key={key}>
            <div className="flex justify-between text-sm text-white/70">
              <span>{label}</span>
              <span>{scores[key as keyof typeof scores]}/10</span>
            </div>
            <Slider value={[scores[key as keyof typeof scores]]} onValueChange={(v) => setScores({ ...scores, [key]: v[0] })} min={1} max={10} />
          </div>
        ))}
      </div>
      <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-white">Your Score: {percentage}/100</span>
          <Badge className={percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-blue-500' : 'bg-yellow-500'}>{status}</Badge>
        </div>
        <Progress value={percentage} className="h-3" />
        <div className="mt-3 text-sm text-white/60">Recommended Modules: {recommendedModules.join(', ')}</div>
      </div>
      <div className="flex gap-2">
        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
        <Button onClick={handleSubmit} className="bg-gradient-to-r from-indigo-600 to-purple-600">Get Report</Button>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
//  STARTUP TOOLBOX (dark themed)
// ────────────────────────────────────────────────────────────────────
function BMCGenerator() {
  const [company, setCompany] = useState('My DeepTech Venture')
  const [blocks, setBlocks] = useState({
    keyPartners: '', keyActivities: '', keyResources: '', valuePropositions: '',
    customerRelationships: '', channels: '', customerSegments: '', costStructure: '', revenueStreams: '',
  })

  const labels: Record<keyof typeof blocks, string> = {
    keyPartners: 'Key Partners', keyActivities: 'Key Activities', keyResources: 'Key Resources',
    valuePropositions: 'Value Propositions', customerRelationships: 'Customer Relationships',
    channels: 'Channels', customerSegments: 'Customer Segments',
    costStructure: 'Cost Structure', revenueStreams: 'Revenue Streams',
  }
  const accents: Record<keyof typeof blocks, string> = {
    keyPartners: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
    keyActivities: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
    keyResources: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30',
    valuePropositions: 'from-pink-500/20 to-pink-500/5 border-pink-500/30',
    customerRelationships: 'from-red-500/20 to-red-500/5 border-red-500/30',
    channels: 'from-orange-500/20 to-orange-500/5 border-orange-500/30',
    customerSegments: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30',
    costStructure: 'from-slate-500/20 to-slate-500/5 border-slate-500/30',
    revenueStreams: 'from-green-500/20 to-green-500/5 border-green-500/30',
  }

  const filled = Object.values(blocks).filter(v => v.trim()).length
  const completeness = Math.round((filled / 9) * 100)

  const handleExport = () => {
    const lines = [
      `# Business Model Canvas — ${company}`, '',
      ...Object.entries(labels).map(([k, label]) => `## ${label}\n${blocks[k as keyof typeof blocks] || '(empty)'}`),
    ]
    const blob = new Blob([lines.join('\n\n')], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `BMC_${company.replace(/\s+/g, '_')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const cell = (k: keyof typeof blocks, placeholder: string, span: string, min: string) => (
    <div className={`bg-gradient-to-br ${accents[k]} border rounded-lg p-3 ${span}`}>
      <div className="font-bold mb-1 text-white">{labels[k]}</div>
      <Textarea value={blocks[k]} onChange={(e) => setBlocks({ ...blocks, [k]: e.target.value })} placeholder={placeholder} className={`${min} bg-transparent border-0 text-xs resize-none p-0 focus-visible:ring-0 text-white placeholder:text-white/40`} />
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input value={company} onChange={(e) => setCompany(e.target.value)} className="text-lg font-bold max-w-sm bg-white/5 border-white/10 text-white" />
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/60">Completeness</span>
            <span className="font-bold text-white">{completeness}%</span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>
        <Button onClick={handleExport} variant="outline" size="sm" className="gap-2 border-white/20 text-white hover:bg-white/10">
          <Download className="w-4 h-4" /> Export
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-sm">
        {cell('keyPartners', 'Who are your key partners & suppliers?', 'row-span-2', 'min-h-[120px]')}
        {cell('keyActivities', 'What must you do to deliver value?', '', 'min-h-[80px]')}
        {cell('valuePropositions', 'What unique value do you create for each segment?', 'row-span-2', 'min-h-[120px]')}
        {cell('customerRelationships', 'How do you acquire and retain customers?', '', 'min-h-[80px]')}
        {cell('customerSegments', 'Who are you creating value for?', 'row-span-2', 'min-h-[120px]')}
        {cell('keyResources', 'What assets are critical to deliver value?', '', 'min-h-[80px]')}
        {cell('channels', 'How do you reach your segments?', '', 'min-h-[80px]')}
        {cell('costStructure', 'What are the most significant costs?', 'md:col-span-2', 'min-h-[70px]')}
        {cell('revenueStreams', 'For what value are customers willing to pay? How?', 'md:col-span-3', 'min-h-[70px]')}
      </div>
    </div>
  )
}

function VPCGenerator() {
  const [product, setProduct] = useState('My DeepTech Product')
  const [segment, setSegment] = useState('My Target Customer')
  const [vpc, setVpc] = useState({ customerJobs: '', customerPains: '', customerGains: '', productsServices: '', painRelievers: '', gainCreators: '' })

  const filledProfile = [vpc.customerJobs, vpc.customerPains, vpc.customerGains].filter(v => v.trim()).length
  const filledMap = [vpc.productsServices, vpc.painRelievers, vpc.gainCreators].filter(v => v.trim()).length
  const fitScore = Math.round(((filledProfile + filledMap) / 6) * 100)
  const fitLabel = fitScore >= 80 ? 'Strong Fit' : fitScore >= 50 ? 'Partial Fit' : fitScore > 0 ? 'Weak Fit' : 'No Data'
  const fitColor = fitScore >= 80 ? 'text-green-400' : fitScore >= 50 ? 'text-yellow-400' : 'text-red-400'

  const handleExport = () => {
    const content = [
      `# Value Proposition Canvas`,
      `## Product: ${product}  |  Segment: ${segment}`, '',
      '### Customer Profile',
      `**Jobs:** ${vpc.customerJobs || '(empty)'}`,
      `**Pains:** ${vpc.customerPains || '(empty)'}`,
      `**Gains:** ${vpc.customerGains || '(empty)'}`, '',
      '### Value Map',
      `**Products & Services:** ${vpc.productsServices || '(empty)'}`,
      `**Pain Relievers:** ${vpc.painRelievers || '(empty)'}`,
      `**Gain Creators:** ${vpc.gainCreators || '(empty)'}`, '',
      `**Fit Score: ${fitScore}% — ${fitLabel}**`,
    ].join('\n')
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `VPC_${product.replace(/\s+/g, '_')}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2 flex-1">
          <Input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product name" className="max-w-[200px] bg-white/5 border-white/10 text-white" />
          <Input value={segment} onChange={(e) => setSegment(e.target.value)} placeholder="Customer segment" className="max-w-[200px] bg-white/5 border-white/10 text-white" />
        </div>
        <div className="flex items-center gap-3">
          <div className={`text-lg font-black ${fitColor}`}>{fitScore}% {fitLabel}</div>
          <Button onClick={handleExport} variant="outline" size="sm" className="gap-2 border-white/20 text-white hover:bg-white/10">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-blue-500/30 rounded-xl p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <div className="font-black text-blue-300 mb-3 text-center">Customer Profile — {segment}</div>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-bold text-blue-400 mb-1">CUSTOMER JOBS</div>
              <Textarea value={vpc.customerJobs} onChange={(e) => setVpc({ ...vpc, customerJobs: e.target.value })} placeholder="What tasks are they trying to accomplish? (functional, social, emotional)" className="min-h-[80px] text-xs bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
            <div>
              <div className="text-xs font-bold text-red-400 mb-1">PAINS</div>
              <Textarea value={vpc.customerPains} onChange={(e) => setVpc({ ...vpc, customerPains: e.target.value })} placeholder="What frustrates them before, during, after the job?" className="min-h-[80px] text-xs bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
            <div>
              <div className="text-xs font-bold text-green-400 mb-1">GAINS</div>
              <Textarea value={vpc.customerGains} onChange={(e) => setVpc({ ...vpc, customerGains: e.target.value })} placeholder="What outcomes and benefits do they want?" className="min-h-[80px] text-xs bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
          </div>
        </div>

        <div className="border border-purple-500/30 rounded-xl p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
          <div className="font-black text-purple-300 mb-3 text-center">Value Map — {product}</div>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-bold text-purple-400 mb-1">PRODUCTS & SERVICES</div>
              <Textarea value={vpc.productsServices} onChange={(e) => setVpc({ ...vpc, productsServices: e.target.value })} placeholder="What do you offer? List all products and services." className="min-h-[80px] text-xs bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
            <div>
              <div className="text-xs font-bold text-red-400 mb-1">PAIN RELIEVERS</div>
              <Textarea value={vpc.painRelievers} onChange={(e) => setVpc({ ...vpc, painRelievers: e.target.value })} placeholder="How do you eliminate or reduce customer pains?" className="min-h-[80px] text-xs bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
            <div>
              <div className="text-xs font-bold text-green-400 mb-1">GAIN CREATORS</div>
              <Textarea value={vpc.gainCreators} onChange={(e) => setVpc({ ...vpc, gainCreators: e.target.value })} placeholder="How do you create outcomes customers expect or desire?" className="min-h-[80px] text-xs bg-white/5 border-white/10 text-white placeholder:text-white/40" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
        <Progress value={fitScore} className="h-2 mb-2" />
        <div className="text-sm text-white/60">Profile: {filledProfile}/3 filled · Map: {filledMap}/3 filled · Fit: <span className={`font-bold ${fitColor}`}>{fitLabel}</span></div>
      </div>
    </div>
  )
}

type Story = { id: number; role: string; goal: string; reason: string; priority: 'Must' | 'Should' | 'Could'; criteria: string[] }

function UserStoryGenerator() {
  const [stories, setStories] = useState<Story[]>([
    { id: 1, role: 'deep tech founder', goal: 'assess my venture readiness', reason: 'I can prioritize which gaps to close before fundraising', priority: 'Must', criteria: ['Score shown across 6 dimensions', 'Recommended modules displayed'] },
  ])
  const [role, setRole] = useState('')
  const [goal, setGoal] = useState('')
  const [reason, setReason] = useState('')
  const [priority, setPriority] = useState<Story['priority']>('Must')
  const [newCriterion, setNewCriterion] = useState('')

  const addStory = () => {
    if (!role.trim() || !goal.trim()) return
    setStories([...stories, { id: Date.now(), role, goal, reason, priority, criteria: [] }])
    setRole(''); setGoal(''); setReason(''); setPriority('Must')
  }
  const removeStory = (id: number) => setStories(stories.filter(s => s.id !== id))
  const addCriterion = (storyId: number) => {
    if (!newCriterion.trim()) return
    setStories(stories.map(s => s.id === storyId ? { ...s, criteria: [...s.criteria, newCriterion] } : s))
    setNewCriterion('')
  }
  const removeCriterion = (storyId: number, idx: number) =>
    setStories(stories.map(s => s.id === storyId ? { ...s, criteria: s.criteria.filter((_, i) => i !== idx) } : s))

  const handleExport = () => {
    const lines = stories.map(s => [
      `## [${s.priority}] Story`,
      `**As a** ${s.role}, **I want to** ${s.goal}${s.reason ? `, **so that** ${s.reason}` : ''}.`, '',
      '**Acceptance Criteria:**', ...s.criteria.map(c => `- [ ] ${c}`),
    ].join('\n'))
    const blob = new Blob([`# User Stories\n\n${lines.join('\n\n---\n\n')}`], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'user_stories.md'; a.click()
    URL.revokeObjectURL(url)
  }

  const priorityColor: Record<Story['priority'], string> = {
    Must: 'bg-red-500/20 text-red-300 border-red-500/30',
    Should: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Could: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  }

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
        <div className="font-bold text-white">New User Story</div>
        <div className="grid md:grid-cols-3 gap-2">
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role (e.g. space startup founder)" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
          <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal (e.g. model launch costs)" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
          <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason (optional)" className="bg-white/5 border-white/10 text-white placeholder:text-white/40" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {(['Must', 'Should', 'Could'] as const).map(p => (
              <button key={p} onClick={() => setPriority(p)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition ${priority === p ? priorityColor[p] : 'bg-white/5 border-white/10 text-white/60'}`}>
                {p}
              </button>
            ))}
          </div>
          <Button onClick={addStory} size="sm" className="ml-auto gap-1 bg-purple-600 hover:bg-purple-700">
            <Plus className="w-3 h-3" /> Add Story
          </Button>
        </div>
        {(role || goal) && (
          <div className="text-sm text-white/70 bg-white/5 p-2 rounded border border-white/10 italic">
            "As a <strong className="text-white">{role || '…'}</strong>, I want to <strong className="text-white">{goal || '…'}</strong>{reason ? `, so that ${reason}` : ''}."
          </div>
        )}
      </div>

      <div className="space-y-3">
        {stories.map(story => (
          <div key={story.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <Badge className={`text-xs mb-1 ${priorityColor[story.priority]}`}>{story.priority} Have</Badge>
                <p className="text-sm text-white/80">
                  As a <strong className="text-white">{story.role}</strong>, I want to <strong className="text-white">{story.goal}</strong>
                  {story.reason && <>, so that {story.reason}</>}.
                </p>
              </div>
              <button onClick={() => removeStory(story.id)} className="text-white/40 hover:text-red-400 transition shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {story.criteria.length > 0 && (
              <ul className="mt-2 space-y-1">
                {story.criteria.map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle className="w-3 h-3 text-green-400 shrink-0" />
                    <span>{c}</span>
                    <button onClick={() => removeCriterion(story.id, i)} className="ml-auto text-white/30 hover:text-red-400"><X className="w-3 h-3" /></button>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-2 mt-2">
              <Input placeholder="Add acceptance criterion…" className="text-xs h-7 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                value={newCriterion} onChange={(e) => setNewCriterion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCriterion(story.id)} />
              <Button size="sm" variant="outline" className="h-7 text-xs border-white/20 text-white hover:bg-white/10" onClick={() => addCriterion(story.id)}>+ Add</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-white/60">{stories.length} {stories.length === 1 ? 'story' : 'stories'}</span>
        <Button onClick={handleExport} variant="outline" size="sm" className="gap-2 border-white/20 text-white hover:bg-white/10">
          <Download className="w-4 h-4" /> Export All
        </Button>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
//  CURRICULUM VIEW — Udemy-style accordion
// ────────────────────────────────────────────────────────────────────
function CurriculumView() {
  const [openModule, setOpenModule] = useState<string>('M01')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ 'M01-s1': true })

  const toggleSection = (key: string) => setOpenSections(p => ({ ...p, [key]: !p[key] }))

  const sectionsForModule = (id: string): Section[] => curriculumByModule[id] || []
  const totalLessons = (id: string) => sectionsForModule(id).reduce((sum, s) => sum + s.lessons.length, 0)

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6">
      <aside className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 max-h-[700px] overflow-y-auto">
        <div className="text-xs uppercase tracking-wider text-white/40 px-2 py-2">Curriculum</div>
        {modules.map(m => {
          const lessons = totalLessons(m.id)
          const active = openModule === m.id
          return (
            <button key={m.id} onClick={() => setOpenModule(m.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition mb-1 ${
                active ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' : 'hover:bg-white/5 border border-transparent'
              }`}>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                <m.icon className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-white/40">{m.id}</div>
                <div className={`text-sm font-semibold truncate ${active ? 'text-white' : 'text-white/80'}`}>{m.title}</div>
              </div>
              {lessons > 0 && <span className="text-[10px] text-white/40 shrink-0">{lessons}</span>}
            </button>
          )
        })}
      </aside>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        {(() => {
          const m = modules.find(x => x.id === openModule)!
          const sections = sectionsForModule(m.id)
          const lessonsCount = totalLessons(m.id)
          return (
            <>
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                  <m.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="border-white/20 text-white/70 text-[10px]">{m.id}</Badge>
                    <Badge className="bg-white/10 text-white/80 text-[10px]">{m.level}</Badge>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">{m.title}</h3>
                  <p className="text-sm text-white/60">{m.description}</p>
                  {lessonsCount > 0 && (
                    <div className="flex items-center gap-4 mt-3 text-xs text-white/50">
                      <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {sections.length} sections</span>
                      <span className="flex items-center gap-1"><Play className="w-3 h-3" /> {lessonsCount} lessons</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~{Math.round(lessonsCount * 14)} min</span>
                    </div>
                  )}
                </div>
              </div>

              {sections.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                  <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold mb-1">Coming Soon</div>
                  <div className="text-sm text-white/60">Detailed lessons for {m.id} are being curated. Lectures and labs will appear here.</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {sections.map((s, si) => {
                    const key = `${m.id}-${s.id}`
                    const open = openSections[key] ?? false
                    return (
                      <div key={s.id} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button onClick={() => toggleSection(key)} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition text-left">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">{si + 1}</span>
                            <div>
                              <div className="font-semibold text-white">{s.title}</div>
                              <div className="text-xs text-white/50">{s.lessons.length} lessons</div>
                            </div>
                          </div>
                          {open ? <ChevronDown className="w-4 h-4 text-white/60" /> : <ChevronRight className="w-4 h-4 text-white/60" />}
                        </button>
                        {open && (
                          <div className="border-t border-white/10">
                            {s.lessons.map((l) => {
                              const Icon = lessonIcon[l.type]
                              return (
                                <div key={l.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition border-b border-white/5 last:border-0">
                                  <Icon className="w-4 h-4 text-purple-400 shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm text-white truncate">{l.title}</div>
                                    <div className="text-xs text-white/40 capitalize">{l.type}</div>
                                  </div>
                                  {l.preview && <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-[10px]">Preview</Badge>}
                                  <span className="text-xs text-white/40 shrink-0">{l.duration}</span>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )
        })()}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
//  QUIZ ENGINE
// ────────────────────────────────────────────────────────────────────
function QuizEngine({ quiz }: { quiz: Quiz }) {
  const [idx, setIdx] = useState(0)
  const [selections, setSelections] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({})
  const [done, setDone] = useState(false)

  const q = quiz.questions[idx]
  const isSubmitted = submitted[idx]
  const selected = selections[idx]

  const score = useMemo(() => {
    return quiz.questions.reduce((acc, qq, i) => acc + (selections[i] === qq.correct ? 1 : 0), 0)
  }, [selections, quiz.questions])

  const percent = Math.round((score / quiz.questions.length) * 100)
  const passed = percent >= quiz.passingScore

  const handleSubmit = () => {
    if (selected === undefined) return
    setSubmitted({ ...submitted, [idx]: true })
  }

  const handleNext = () => {
    if (idx < quiz.questions.length - 1) setIdx(idx + 1)
    else setDone(true)
  }

  const handleReset = () => {
    setIdx(0); setSelections({}); setSubmitted({}); setDone(false)
  }

  if (done) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
        <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-orange-500 to-red-500'}`}>
          {passed ? <Award className="w-10 h-10 text-white" /> : <AlertCircle className="w-10 h-10 text-white" />}
        </div>
        <h3 className="text-3xl font-black text-white mb-2">{passed ? 'Passed!' : 'Try Again'}</h3>
        <p className="text-white/60 mb-4">{quiz.title}</p>
        <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{percent}%</div>
        <div className="text-white/70 mb-6">{score} / {quiz.questions.length} correct · Pass mark: {quiz.passingScore}%</div>
        <div className="flex gap-3 justify-center">
          <Button onClick={handleReset} variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-2">
            <RotateCcw className="w-4 h-4" /> Retake
          </Button>
          {passed && (
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 gap-2">
              <Award className="w-4 h-4" /> Claim Badge
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/40">{quiz.title}</div>
          <div className="text-sm text-white/70">Question {idx + 1} of {quiz.questions.length}</div>
        </div>
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Pass: {quiz.passingScore}%</Badge>
      </div>
      <Progress value={((idx + 1) / quiz.questions.length) * 100} className="h-1.5 mb-6" />

      <h4 className="text-xl font-bold text-white mb-4">{q.q}</h4>
      <div className="space-y-2 mb-6">
        {q.options.map((opt, i) => {
          const chosen = selected === i
          const correct = q.correct === i
          let style = 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
          if (isSubmitted) {
            if (correct) style = 'bg-green-500/20 border-green-500/40 text-white'
            else if (chosen && !correct) style = 'bg-red-500/20 border-red-500/40 text-white'
            else style = 'bg-white/5 border-white/10 text-white/60'
          } else if (chosen) {
            style = 'bg-purple-500/20 border-purple-500/40 text-white'
          }
          return (
            <button
              key={i}
              disabled={isSubmitted}
              onClick={() => setSelections({ ...selections, [idx]: i })}
              className={`w-full text-left p-3 rounded-lg border transition flex items-center gap-3 ${style} disabled:cursor-default`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${chosen || (isSubmitted && correct) ? 'bg-white/20' : 'bg-white/5'}`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm flex-1">{opt}</span>
              {isSubmitted && correct && <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />}
              {isSubmitted && chosen && !correct && <X className="w-4 h-4 text-red-400 shrink-0" />}
            </button>
          )
        })}
      </div>

      {isSubmitted && (
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
          <div className="text-xs uppercase tracking-wider text-purple-300 mb-1">Explanation</div>
          <p className="text-sm text-white/80">{q.explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-xs text-white/40">Score so far: <span className="text-white font-bold">{score}/{Object.keys(submitted).length || 0}</span></div>
        {!isSubmitted ? (
          <Button onClick={handleSubmit} disabled={selected === undefined} className="bg-gradient-to-r from-purple-600 to-pink-600 disabled:opacity-40">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="bg-gradient-to-r from-purple-600 to-pink-600 gap-2">
            {idx < quiz.questions.length - 1 ? <>Next <ArrowRight className="w-4 h-4" /></> : <>Finish <Award className="w-4 h-4" /></>}
          </Button>
        )}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
//  RESOURCES GRID
// ────────────────────────────────────────────────────────────────────
function ResourcesGrid() {
  const [filter, setFilter] = useState<ResourceType | 'all'>('all')
  const filtered = filter === 'all' ? resources : resources.filter(r => r.type === filter)
  const filters: { id: ResourceType | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'whitepaper', label: 'Whitepapers' },
    { id: 'ebook', label: 'eBooks' },
    { id: 'memo', label: 'Memos' },
    { id: 'template', label: 'Templates' },
    { id: 'dataset', label: 'Datasets' },
  ]

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border ${
              filter === f.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => {
          const meta = resourceMeta[r.type]
          const Icon = meta.icon
          return (
            <div key={r.id} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:border-white/30 transition flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <Badge className="bg-white/10 text-white/70 border-white/10 text-[10px]">{meta.label}</Badge>
              </div>
              <h4 className="font-bold text-white mb-1 leading-tight group-hover:text-purple-300 transition">{r.title}</h4>
              <Badge variant="outline" className="self-start mb-3 text-[10px] border-purple-500/30 text-purple-300">{r.tag}</Badge>
              <p className="text-sm text-white/60 mb-4 flex-1">{r.description}</p>
              <div className="flex items-center justify-between text-xs text-white/40 mb-3">
                <span>{r.size}</span>
                {r.pages && <span>{r.pages} pages</span>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 gap-1">
                  <Download className="w-3 h-3" /> Download
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 gap-1">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
//  QUIZ PICKER + ENGINE WRAPPER
// ────────────────────────────────────────────────────────────────────
function QuizSection() {
  const [active, setActive] = useState<string>(quizzes[0].moduleId)
  const quiz = quizzes.find(q => q.moduleId === active)!
  const moduleMeta = modules.find(m => m.id === active)!

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6">
      <aside className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 max-h-[700px] overflow-y-auto">
        <div className="text-xs uppercase tracking-wider text-white/40 px-2 py-2">Available Quizzes</div>
        {quizzes.map(q => {
          const m = modules.find(mm => mm.id === q.moduleId)!
          const isActive = active === q.moduleId
          return (
            <button key={q.moduleId} onClick={() => setActive(q.moduleId)}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition mb-1 ${
                isActive ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' : 'hover:bg-white/5 border border-transparent'
              }`}>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-white/40">{q.moduleId}</div>
                <div className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-white/80'}`}>{q.title}</div>
                <div className="text-[10px] text-white/40">{q.questions.length} questions · {q.passingScore}% to pass</div>
              </div>
            </button>
          )
        })}
      </aside>

      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${moduleMeta.color} flex items-center justify-center`}>
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs text-white/40">{moduleMeta.id} · {moduleMeta.title}</div>
            <h3 className="text-xl font-black text-white">{quiz.title}</h3>
          </div>
        </div>
        <QuizEngine quiz={quiz} key={quiz.moduleId} />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────
//  PAYMENT CHANNELS — Stripe Payment Links + Crypto addresses
//  Replace placeholder values with real Stripe Payment Link URLs and
//  real wallet addresses before going live.
// ────────────────────────────────────────────────────────────────────
type Tier = {
  name: string
  price: string
  priceSub?: string
  sub: string
  accent: string
  features: string[]
  cta: string
  popular?: boolean
  amountUSD: number
  cardLink: string
}

const BMaC_URL = 'https://buymeacoffee.com/yavro'

const tiers: Tier[] = [
  {
    name: 'Lifetime Access', price: '$597', sub: 'One-time payment',
    accent: 'from-purple-500 to-purple-700',
    features: ['All 14 modules', 'All 6 quizzes', 'Interactive calculators', 'Community access'],
    cta: 'Get Started',
    amountUSD: 597,
    cardLink: BMaC_URL,
  },
  {
    name: 'NFT Edition', price: '$1,197', sub: 'One-time + NFT',
    accent: 'from-purple-600 via-pink-600 to-cyan-500',
    features: ['Everything in Lifetime', 'Exclusive NFT certificate', '1-on-1 consultation', 'All whitepapers + datasets', 'Alumni network'],
    cta: 'Get NFT Edition',
    popular: true,
    amountUSD: 1197,
    cardLink: BMaC_URL,
  },
  {
    name: 'Monthly Digest', price: '$67', priceSub: '/mo', sub: 'Cancel anytime',
    accent: 'from-blue-500 to-cyan-600',
    features: ['Weekly insights', 'Market updates', 'Deal flow access', 'Expert interviews'],
    cta: 'Subscribe',
    amountUSD: 67,
    cardLink: BMaC_URL,
  },
]

type CryptoOption = {
  id: string
  symbol: string
  name: string
  network: string
  address: string
  icon: typeof Bitcoin
  color: string
}

const EVM_ADDR = '0xB2c4D12e01Bb3edAb015FaA441FD04B566b186Ba'

const cryptoOptions: CryptoOption[] = [
  { id: 'ton', symbol: 'TON', name: 'Toncoin', network: 'TON Mainnet',
    address: 'UQBvgWPdj9J7SUMQCJxHvVXTc6uNE10SbB2g1waTxrh_4liP', icon: Wallet, color: 'from-sky-500 to-blue-500' },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', network: 'ERC-20',
    address: EVM_ADDR, icon: Wallet, color: 'from-indigo-500 to-blue-500' },
  { id: 'bnb', symbol: 'BNB', name: 'BNB Chain', network: 'BEP-20',
    address: EVM_ADDR, icon: Wallet, color: 'from-yellow-500 to-amber-500' },
  { id: 'usdc-eth', symbol: 'USDC', name: 'USD Coin', network: 'ERC-20',
    address: EVM_ADDR, icon: Coins, color: 'from-blue-500 to-cyan-500' },
  { id: 'usdt-bsc', symbol: 'USDT', name: 'Tether', network: 'BEP-20',
    address: EVM_ADDR, icon: Coins, color: 'from-emerald-500 to-teal-500' },
]

function shortAddress(addr: string) {
  if (addr.length <= 14) return addr
  return `${addr.slice(0, 8)}…${addr.slice(-6)}`
}

function CopyAddressRow({ option }: { option: CryptoOption }) {
  const [copied, setCopied] = useState(false)
  const [reveal, setReveal] = useState(false)
  const Icon = option.icon

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(option.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // graceful no-op; clipboard may be blocked
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{option.symbol} <span className="text-white/40 font-normal">— {option.name}</span></div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider">{option.network}</div>
          </div>
        </div>
        <button onClick={() => setReveal(!reveal)} className="text-[10px] text-white/40 hover:text-white/70 uppercase tracking-wider">
          {reveal ? 'Hide' : 'Reveal'}
        </button>
      </div>
      <div className="flex items-center gap-2 bg-black/30 border border-white/5 rounded-lg px-3 py-2.5 font-mono text-xs">
        <span className="text-white/80 truncate flex-1 select-all">
          {reveal ? option.address : shortAddress(option.address)}
        </span>
        <button
          onClick={handleCopy}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition ${
            copied ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          aria-label={`Copy ${option.symbol} address`}
        >
          {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
    </div>
  )
}

function PaymentModal({ tier, open, onOpenChange }: { tier: Tier; open: boolean; onOpenChange: (v: boolean) => void }) {
  const [confirming, setConfirming] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [sent, setSent] = useState(false)

  const handleCardCheckout = () => {
    window.open(tier.cardLink, '_blank', 'noopener,noreferrer')
  }

  const handleSubmitTx = () => {
    if (!txHash.trim()) return
    setSent(true)
    // In production: POST { tier: tier.name, txHash, email } to backend for verification.
  }

  const reset = () => { setConfirming(false); setTxHash(''); setSent(false) }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset() }}>
      <DialogContent className="max-w-md bg-[#0a0a1a] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tier.accent} flex items-center justify-center`}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs text-white/40 font-normal">Checkout</div>
              <div>{tier.name}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-baseline gap-1 mb-2">
          <div className={`text-3xl font-black bg-gradient-to-r ${tier.accent} bg-clip-text text-transparent`}>{tier.price}</div>
          {tier.priceSub && <span className="text-white/50">{tier.priceSub}</span>}
          <span className="text-xs text-white/40 ml-auto">{tier.sub}</span>
        </div>

        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
            <TabsTrigger value="card" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white gap-2">
              <CreditCard className="w-4 h-4" /> Card
            </TabsTrigger>
            <TabsTrigger value="crypto" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white gap-2">
              <Bitcoin className="w-4 h-4" /> Crypto
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="mt-4 space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm font-semibold text-white">Pay with Buy Me a Coffee</div>
                  <div className="text-xs text-white/50">Card, Apple Pay, Google Pay · Stripe-secured</div>
                </div>
              </div>
              <p className="text-xs text-white/60 mb-4">
                You'll be redirected to <span className="font-mono text-white/80">buymeacoffee.com/yavro</span>. Set the amount to <strong className="text-white">{tier.price}</strong> and include your email in the note so we can deliver access.
              </p>
              <Button onClick={handleCardCheckout} className={`w-full bg-gradient-to-r ${tier.accent} gap-2`}>
                Continue to Buy Me a Coffee <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-3 text-[10px] text-white/40 uppercase tracking-wider">
              <span>Stripe-Powered</span><span>·</span><span>3-D Secure</span><span>·</span><span>Encrypted</span>
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="mt-4 space-y-3">
            {!confirming ? (
              <>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-100/80">
                    Send <strong className="text-white">exactly {tier.price}</strong> worth of your chosen asset. Use the matching network — wrong network = lost funds. Submit your tx hash after sending.
                  </div>
                </div>
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {cryptoOptions.map(opt => <CopyAddressRow key={opt.id} option={opt} />)}
                </div>
                <Button onClick={() => setConfirming(true)} variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 gap-2">
                  I've Sent the Payment <ArrowRight className="w-4 h-4" />
                </Button>
              </>
            ) : sent ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div className="font-bold text-white mb-1">Submitted!</div>
                <p className="text-sm text-white/60 mb-4">We'll verify on-chain and email your access link within ~30 minutes.</p>
                <Button onClick={() => onOpenChange(false)} className="bg-white/10 hover:bg-white/20">Close</Button>
              </div>
            ) : (
              <>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1 block">Transaction Hash</label>
                    <Input
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder="0x… or tx id"
                      className="bg-black/30 border-white/10 text-white placeholder:text-white/30 font-mono text-xs"
                    />
                  </div>
                  <p className="text-xs text-white/50">
                    We'll confirm on-chain and email your access details. Make sure the tx is broadcast before submitting.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setConfirming(false)} className="border-white/20 text-white hover:bg-white/10">Back</Button>
                  <Button onClick={handleSubmitTx} disabled={!txHash.trim()} className={`flex-1 bg-gradient-to-r ${tier.accent} disabled:opacity-40`}>
                    Submit
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// ────────────────────────────────────────────────────────────────────
//  APP
// ────────────────────────────────────────────────────────────────────
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeTier, setActiveTier] = useState<Tier | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalScroll) * 100
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const getCalculator = (moduleId: string) => {
    switch (moduleId) {
      case 'M01': return <DeHypeCalculator />
      case 'M02': return <SprintCalculator />
      case 'M04': return <TokenomicsCalculator />
      case 'M06': return <PQCCalculator />
      case 'M08': return <SpaceCalculator />
      case 'M12': return <SovereignCalculator />
      default: return null
    }
  }

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'modules', label: 'Modules' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'resources', label: 'Resources' },
    { id: 'toolbox', label: 'Toolbox' },
    { id: 'pricing', label: 'Pricing' },
  ]

  return (
    <div className="min-h-screen bg-[#070710] text-white relative overflow-x-hidden">
      {/* Ambient backdrop */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-pink-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Nav */}
      <nav className="fixed top-1 left-0 right-0 bg-[#070710]/70 backdrop-blur-xl border-b border-white/5 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              DeepTechX
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5">
            {navItems.map(n => (
              <button key={n.id} onClick={() => scrollToSection(n.id)} className="text-sm font-medium text-white/70 hover:text-white transition">{n.label}</button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => setActiveTier(tiers[0])} className="hidden md:flex bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20">
              Enroll Now $597
            </Button>
            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#070710]/95 backdrop-blur-xl border-t border-white/5 p-4 space-y-2">
            {navItems.map(n => (
              <button key={n.id} onClick={() => scrollToSection(n.id)} className="block w-full text-left py-2 text-white/80 hover:text-white">{n.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20">
                <Sparkles className="w-3 h-3 mr-1" /> 2026 Edition
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Launch
                </span>
                <br />
                <span className="text-white">Deep Tech</span>
                <br />
                <span className="text-white/60 text-4xl md:text-5xl font-bold">in 90 days.</span>
              </h1>
              <p className="text-xl text-white/60 mb-8 max-w-lg">
                The MOOC for the post-quantum, agentic, sovereign era. From PoC to AI-agent-powered product. 14 modules. 6 calculators. 6 quizzes. 10 deep-dives.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl shadow-purple-500/30">
                  Start Learning <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Play className="mr-2 w-5 h-5" /> Watch Trailer
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-sm text-white/50">
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> 14 Modules</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Quizzes & Labs</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> NFT Certificate</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Lifetime Access</div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-cyan-500/30 rounded-3xl blur-2xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {modules.slice(0, 9).map((m) => (
                    <div key={m.id} className={`p-3 rounded-xl bg-gradient-to-br ${m.color} text-white text-center shadow-lg`}>
                      <m.icon className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-[10px] font-bold opacity-90">{m.id}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center pt-4 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">14</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Modules</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">42+</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Lessons</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">10</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Resources</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum (Udemy-style) */}
      <section id="curriculum" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Curriculum</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Full Course Curriculum</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Browse every section and lesson. Preview the openers free. Modeled on Udemy's structure — sections, lessons, durations, lab activities.</p>
          </div>
          <CurriculumView />
        </div>
      </section>

      {/* Modules grid (existing, dark restyled) */}
      <section id="modules" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-purple-500/20 text-purple-300 border border-purple-500/30">14 Modules</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">All Modules at a Glance</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Click any module to open lectures, the interactive calculator, and the quiz gate.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((module) => (
              <Dialog key={module.id}>
                <DialogTrigger asChild>
                  <div className="group cursor-pointer relative">
                    <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-100 transition blur-sm`} />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group-hover:border-white/30 transition">
                      <div className={`p-5 bg-gradient-to-br ${module.color}`}>
                        <div className="flex items-center justify-between">
                          <module.icon className="w-8 h-8 text-white" />
                          <Badge className="bg-white/20 text-white border-0">{module.level}</Badge>
                        </div>
                        <div className="text-xs text-white/80 mt-3 font-mono">{module.id}</div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-white group-hover:text-white transition mb-2 leading-tight">{module.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-white/50">
                          {module.hasCalculator && <span className="flex items-center gap-1"><Calculator className="w-3 h-3" /> Lab</span>}
                          {quizzes.some(q => q.moduleId === module.id) && <span className="flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Quiz</span>}
                          {curriculumByModule[module.id] && <span className="flex items-center gap-1"><Play className="w-3 h-3" /> Lessons</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a1a] border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-white/40">{module.id}</div>
                        <div className="text-white">{module.title}</div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="text-white/70 mb-4">{module.description}</p>
                    {module.lectures && module.lectures.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-bold text-xs text-white/40 uppercase tracking-wide mb-2">Udemy Lectures</h4>
                        <ul className="space-y-1">
                          {module.lectures.map((lecture, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                              <Play className="w-3 h-3 text-purple-400 mt-1 flex-shrink-0" />
                              <span>{lecture}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {module.hasCalculator && (
                      <div className="mt-6">
                        <h4 className="font-bold mb-3 flex items-center gap-2 text-white">
                          <Calculator className="w-5 h-5 text-purple-400" />
                          Interactive Lab
                        </h4>
                        {getCalculator(module.id)}
                      </div>
                    )}
                    <div className="mt-6 flex gap-3">
                      <Button className={`bg-gradient-to-r ${module.color}`}>Start Module</Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Play className="mr-2 w-4 h-4" /> Preview
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Quizzes section */}
      <section id="quizzes" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-pink-500/20 text-pink-300 border border-pink-500/30">Knowledge Check</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">Quizzes</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Test your understanding after each module. Multi-choice, instant feedback, explanations. Pass to unlock your badge.</p>
          </div>
          <QuizSection />
        </div>
      </section>

      {/* Readiness Calculator */}
      <section id="calculator" className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-green-500/20 text-green-300 border border-green-500/30">Free Tool</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">Launchpad Readiness</h2>
            <p className="text-white/60">Assess your venture across 6 critical dimensions and get a personalized roadmap.</p>
          </div>
          <ReadinessCalculator />
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-amber-500/20 text-amber-300 border border-amber-500/30">Add-Ons</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">Whitepapers, eBooks & Memos</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Strategic deep-dives, frameworks, templates and datasets. Free for enrolled students; sample previews for everyone else.</p>
          </div>
          <ResourcesGrid />
        </div>
      </section>

      {/* Toolbox */}
      <section id="toolbox" className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-purple-500/20 text-purple-300 border border-purple-500/30">Free Startup Toolbox</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-3 flex items-center justify-center gap-3 text-white">
              <Briefcase className="w-8 h-8 text-purple-400" />
              DeepTechX Toolbox
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">Three foundational strategy tools — Business Model Canvas, Value Proposition Canvas, and User Story Generator — built for deep tech founders.</p>
          </div>

          <Tabs defaultValue="bmc" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 border border-white/10">
              <TabsTrigger value="bmc" className="text-sm font-semibold data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">Business Model Canvas</TabsTrigger>
              <TabsTrigger value="vpc" className="text-sm font-semibold data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">Value Proposition Canvas</TabsTrigger>
              <TabsTrigger value="stories" className="text-sm font-semibold data-[state=active]:bg-purple-500/20 data-[state=active]:text-white">User Stories</TabsTrigger>
            </TabsList>

            <TabsContent value="bmc">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <BMCGenerator />
              </div>
            </TabsContent>
            <TabsContent value="vpc">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <VPCGenerator />
              </div>
            </TabsContent>
            <TabsContent value="stories">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <UserStoryGenerator />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-pink-500/20 text-pink-300 border border-pink-500/30">Choose Your Path</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">Pricing</h2>
            <p className="text-white/60">Invest in your deep tech future. Revenue decoupled from time.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((p) => (
              <div key={p.name} className={`relative bg-white/5 backdrop-blur-xl border ${p.popular ? 'border-pink-500/50' : 'border-white/10'} rounded-2xl overflow-hidden`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 border-0">Most Popular</Badge>
                  </div>
                )}
                <div className={`h-1 bg-gradient-to-r ${p.accent}`} />
                <div className="p-6">
                  <CardTitle className="text-xl text-white mb-2">{p.name}</CardTitle>
                  <div className="flex items-baseline gap-1 mb-1">
                    <div className={`text-4xl font-black bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}>{p.price}</div>
                    {p.priceSub && <span className="text-lg text-white/50">{p.priceSub}</span>}
                  </div>
                  <p className="text-sm text-white/50 mb-5">{p.sub}</p>
                  <ul className="space-y-2 mb-6">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => setActiveTier(p)} className={`w-full bg-gradient-to-r ${p.accent}`}>{p.cta}</Button>
                  <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-white/40">
                    <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> Card</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Bitcoin className="w-3 h-3" /> Crypto</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-3 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">Social Proof</Badge>
          <h2 className="text-3xl md:text-4xl font-black mb-10 text-white">What Founders Say</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { stars: 5, quote: '"The De-Hype calculator alone saved us from a $2M mistake. Worth 10x the price."', name: 'Sarah Chen', role: 'CEO, QuantumBridge' },
              { stars: 5, quote: '"Went from project to product in 6 months using the M08 framework. Now valued at $50M."', name: 'Marcus Webb', role: 'Founder, OrbitAI' },
              { stars: 5, quote: '"The sovereign scaling module helped us set up in UAE. Zero tax, full support."', name: 'Aisha Patel', role: 'CTO, FusionGrid' },
            ].map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-left">
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 text-sm">{t.quote}</p>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-xs text-white/50">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-cyan-500/30 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Ready to Launch?</h2>
          <p className="text-xl text-white/80 mb-8">Join 500+ deep tech founders who transformed their ventures with DeepTechX.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => setActiveTier(tiers[0])} size="lg" className="bg-white text-purple-700 hover:bg-white/90 shadow-xl">
              Enroll Now — $597
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <MessageSquare className="mr-2 w-5 h-5" /> Talk to an Advisor
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-black text-white">DeepTechX</span>
              </div>
              <p className="text-sm text-white/50">From PoC to AI-Agent-Powered Product. Master deep tech commercialization.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button onClick={() => scrollToSection('curriculum')} className="hover:text-white transition">Curriculum</button></li>
                <li><button onClick={() => scrollToSection('modules')} className="hover:text-white transition">Modules</button></li>
                <li><button onClick={() => scrollToSection('quizzes')} className="hover:text-white transition">Quizzes</button></li>
                <li><button onClick={() => scrollToSection('toolbox')} className="hover:text-white transition">Toolbox</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><button onClick={() => scrollToSection('resources')} className="hover:text-white transition">Whitepapers</button></li>
                <li><button onClick={() => scrollToSection('resources')} className="hover:text-white transition">eBooks</button></li>
                <li><button onClick={() => scrollToSection('resources')} className="hover:text-white transition">Templates</button></li>
                <li><button onClick={() => scrollToSection('resources')} className="hover:text-white transition">Datasets</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="mailto:desire.yavro@gmail.com" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center text-sm text-white/40">
            © 2026 DeepTechX. Built for the post-quantum, agentic, sovereign era.
          </div>
        </div>
      </footer>

      {activeTier && (
        <PaymentModal tier={activeTier} open={!!activeTier} onOpenChange={(v) => !v && setActiveTier(null)} />
      )}
    </div>
  )
}

export default App
