import { useState, useEffect, useMemo } from 'react'
import './App.css'
import {
  Rocket, Brain, Shield, Orbit, TrendingUp, Layers, Target,
  CheckCircle, Play, Calculator,
  MessageSquare, Menu, X, Star, ArrowRight,
  Briefcase, Plus, Trash2, Download,
  FileText, BookOpen, ScrollText, GraduationCap, Clock,
  ChevronDown, ChevronRight, Award, AlertCircle, ExternalLink,
  HelpCircle, FlaskConical, RotateCcw, Sparkles,
  CreditCard, Copy, Check, Wallet
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
//  MODULE DATA — Space & DeepTech Commercialization Masterclass 2026
//  Ready-to-deliver sections, sourced from the official syllabus.
// ────────────────────────────────────────────────────────────────────
const modules = [
  { id: 'M01', title: 'Space x DeepTech x HCD — Part 1', level: 'Foundational', icon: Brain,
    color: 'from-purple-500 to-pink-500', hasCalculator: true,
    description: 'Bridge the Commercial Gap with Human-Centered Design. Treat HCD as a proxy for market acceptance and a velocity engine — from empathy to translation. Diagnose why 94% of deep tech ventures fail and apply the DFV trinity to your own.',
    lectures: ['Space x Deep Tech HCD: The Velocity Engine — From Empathy to Translation'] },
  { id: 'M02', title: 'Space x DeepTech x HCD — Part 2', level: 'Foundational', icon: Target,
    color: 'from-fuchsia-500 to-purple-500', hasCalculator: true,
    description: 'Master the HCD Velocity Flywheel, the HMW framework, and design-led strategies to accelerate regulatory approval. Reframe compliance as a usability requirement using the Regulatory Love Letter blueprint.',
    lectures: ['Space x Deep Tech HCD: The Velocity Engine — From Iteration to Action Plan'] },
  { id: 'M03', title: 'Space 4 Gaming', level: 'Vertical', icon: Orbit,
    color: 'from-cyan-500 to-blue-500', hasCalculator: true,
    description: 'Capitalize on the $300B gaming convergence. Use Copernicus/Galileo data to power open-world games (downstream) and gaming engines to revolutionize space training (upstream). Monetize via Digital Twin as a Service and B2B training contracts.',
    lectures: ['Space 4 Gaming: The $300B Opportunity'] },
  { id: 'M04', title: 'Space 4 Healthcare', level: 'Vertical', icon: Shield,
    color: 'from-emerald-500 to-teal-500', hasCalculator: false,
    description: 'Build next-generation healthcare with EU space programs. Integrate the Android GNSS Raw Measurements API, achieve 30cm accuracy with dual-frequency (L1/E1 + L5/E5), and address the €400B GNSS market via the Cassini Initiative.',
    lectures: ['EGNSS in Healthcare: From Satellites to Patients'] },
  { id: 'M05', title: 'EO 4 Startup Business', level: 'Commercialization', icon: TrendingUp,
    color: 'from-lime-500 to-green-500', hasCalculator: true,
    description: 'Go from Copernicus data to $10M ARR. Move from selling raw pixels to outcome-based insights. Master the team triad, beachhead market strategy, balanced capital stack, and AI-automated pipelines that scale.',
    lectures: ['EO 4 Startup Business: From Copernicus Data to $10M ARR'] },
]

// ────────────────────────────────────────────────────────────────────
//  CURRICULUM — Udemy-style Sections → Lessons
// ────────────────────────────────────────────────────────────────────
type LessonType = 'video' | 'reading' | 'lab' | 'quiz'
type Lesson = { id: string; title: string; duration: string; type: LessonType; preview?: boolean }
type Section = { id: string; title: string; lessons: Lesson[] }

const curriculumByModule: Record<string, Section[]> = {
  M01: [
    { id: 's1', title: 'The Velocity Engine', lessons: [
      { id: 'l1', title: 'Space x Deep Tech HCD: The Velocity Engine — From Empathy to Translation', duration: '38:00', type: 'video', preview: true },
      { id: 'l2', title: 'space_deeptech_x_hcd_part1.pdf — Presentation', duration: '32 slides', type: 'reading' },
    ]},
    { id: 's2', title: 'Templates & Tools', lessons: [
      { id: 'l3', title: 'HCD_VELOCITY_CANVAS.pdf', duration: 'template', type: 'lab' },
      { id: 'l4', title: 'DFV_SCORECARD.pdf', duration: 'template', type: 'lab' },
      { id: 'l5', title: 'HMW_STATEMENT_CALCULATOR.pdf', duration: 'template', type: 'lab' },
      { id: 'l6', title: 'DeepTech_HCD_Aidevlab_Case_Light.pdf', duration: 'case study', type: 'reading' },
      { id: 'l7', title: '4-PHASE_EXPERIENTIAL_INTERVIEW_SCRIPT.pdf', duration: 'template', type: 'lab' },
    ]},
    { id: 's3', title: 'Assessment', lessons: [
      { id: 'l8', title: 'Module 1 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
  M02: [
    { id: 's1', title: 'From Iteration to Action Plan', lessons: [
      { id: 'l1', title: 'Space x Deep Tech HCD: The Velocity Engine — From Iteration to Action Plan', duration: '42:00', type: 'video', preview: true },
      { id: 'l2', title: 'space_deeptech_x_hcd_part2.pdf — Presentation', duration: '38 slides', type: 'reading' },
    ]},
    { id: 's2', title: 'The Regulatory Love Letter Blueprint', lessons: [
      { id: 'l3', title: 'HCD_REGULATORY_LOVE_LETTER_BLUEPRINT.pdf', duration: 'blueprint', type: 'reading' },
      { id: 'l4', title: 'HCD_EMPATHY_MAP & PERSONA_PROFILE.pdf', duration: 'template', type: 'lab' },
    ]},
    { id: 's3', title: 'Assessment', lessons: [
      { id: 'l5', title: 'Module 2 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
  M03: [
    { id: 's1', title: 'The $300B Opportunity', lessons: [
      { id: 'l1', title: 'Space 4 Gaming: The $300B Opportunity', duration: '45:00', type: 'video', preview: true },
      { id: 'l2', title: 'Space_and_Gaming.pdf — Presentation', duration: '52 slides', type: 'reading' },
    ]},
    { id: 's2', title: 'Audio & Supplementary', lessons: [
      { id: 'l3', title: 'Satellites and Reality Unleashed (audiobook)', duration: '1h 12m', type: 'reading' },
      { id: 'l4', title: 'space4water.pdf — Shared resource', duration: '24 pages', type: 'reading' },
    ]},
    { id: 's3', title: 'Assessment', lessons: [
      { id: 'l5', title: 'Module 3 Graded Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
  M04: [
    { id: 's1', title: 'EGNSS for Healthcare', lessons: [
      { id: 'l1', title: 'EGNSS in Healthcare: From Satellites to Patients', duration: '45:00', type: 'video', preview: true },
      { id: 'l2', title: 'Space4Healthcare.pdf — Presentation', duration: '48 slides', type: 'reading' },
    ]},
    { id: 's2', title: 'Implementation Reading', lessons: [
      { id: 'l3', title: 'Android GNSS Raw Measurements API — Reading', duration: '12 min read', type: 'reading' },
      { id: 'l4', title: 'Dual-Frequency L1/E1 + L5/E5 for 30cm Accuracy', duration: '8 min read', type: 'reading' },
    ]},
    { id: 's3', title: 'Assessment', lessons: [
      { id: 'l5', title: 'Module 4 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
  M05: [
    { id: 's1', title: 'From Copernicus Data to $10M ARR', lessons: [
      { id: 'l1', title: 'EO 4 Startup Business: From Copernicus Data to $10M ARR', duration: '50:00', type: 'video', preview: true },
      { id: 'l2', title: 'EO4StartupBusiness.pdf — Presentation', duration: '64 slides', type: 'reading' },
    ]},
    { id: 's2', title: 'Business Lifecycle', lessons: [
      { id: 'l3', title: 'The Team Triad: Technical, Commercial, Operational', duration: '10 min read', type: 'reading' },
      { id: 'l4', title: 'Problem Discovery: From Data to Pains', duration: '8 min read', type: 'reading' },
      { id: 'l5', title: 'MVP & Capital Stack Strategy', duration: '12 min read', type: 'reading' },
      { id: 'l6', title: 'Beachhead → Scale to ARR', duration: '10 min read', type: 'reading' },
    ]},
    { id: 's3', title: 'Assessment', lessons: [
      { id: 'l7', title: 'Module 5 Quiz', duration: '5 questions', type: 'quiz' },
    ]},
  ],
}

// ────────────────────────────────────────────────────────────────────
//  QUIZZES — Multi-choice format (modeled on GBL EAP + DC Academy Cx)
// ────────────────────────────────────────────────────────────────────
type Question = { q: string; options: string[]; correct: number; explanation: string }
type Quiz = { moduleId: string; title: string; passingScore: number; questions: Question[] }

const quizzes: Quiz[] = [
  { moduleId: 'M01', title: 'HCD Part 1: Velocity Engine Quiz', passingScore: 80, questions: [
    { q: 'According to the syllabus, what percentage of deep tech companies fail, and what is the leading cause?',
      options: ['50% — undercapitalization', '94% — design flaws, not technical infeasibility', '30% — regulatory issues', '70% — team conflict'],
      correct: 1, explanation: 'The course opens with the stat that 94% of deep tech ventures fail, and these failures stem from design flaws (HCD gaps) more than technical infeasibility.' },
    { q: 'What is the "Commercial Gap" that HCD bridges?',
      options: ['Between funding rounds', 'Between technical feasibility and market viability', 'Between R&D and manufacturing', 'Between B2B and B2C'],
      correct: 1, explanation: 'HCD is treated as a proxy for market acceptance — it closes the gap between "the tech works" and "someone will pay for it".' },
    { q: 'The DFV Trinity stands for:',
      options: ['Data, Funding, Validation', 'Desirability, Feasibility, Viability', 'Delivery, Finance, Volume', 'Design, Function, Value'],
      correct: 1, explanation: 'DFV — Desirability (do users want it?), Feasibility (can we build it?), Viability (does it sustain a business?). All three are required for commercial velocity.' },
    { q: 'In the HCD Velocity Engine, "Empathy" precedes "Translation" because:',
      options: ['It is faster', 'You can\'t translate what you have not first understood from the user', 'Marketing demands it', 'Investors prefer it'],
      correct: 1, explanation: 'Empathy gives you the raw user truth; translation converts it into a buildable, sellable product. Translation without empathy = HiPPO-driven product death.' },
    { q: 'A "How Might We" (HMW) statement is most powerful when it:',
      options: ['Names a specific feature', 'Frames a user problem broadly enough to spark options yet narrowly enough to act', 'Includes pricing', 'Targets investors'],
      correct: 1, explanation: 'HMW statements are intentionally framed broad-but-actionable — broad enough to keep solution space open, narrow enough to drive ideation.' },
  ]},
  { moduleId: 'M02', title: 'HCD Part 2: Iteration & Action Plan Quiz', passingScore: 80, questions: [
    { q: 'The "Regulatory Love Letter" blueprint reframes compliance as:',
      options: ['A cost center', 'A usability requirement', 'A marketing channel', 'A legal obligation only'],
      correct: 1, explanation: 'The blueprint treats regulation as a user with needs — meet those needs early and approval accelerates instead of dragging.' },
    { q: 'In the HCD Velocity Flywheel, what makes the loop accelerate over time?',
      options: ['Bigger budgets', 'Each iteration generates evidence that compounds buyer trust and team conviction', 'More headcount', 'PR campaigns'],
      correct: 1, explanation: 'The flywheel compounds because every validated iteration de-risks the next — evidence accumulates and momentum grows non-linearly.' },
    { q: 'Empathy maps + persona profiles are most useful for:',
      options: ['Marketing copy only', 'Aligning the team on a shared, specific picture of the user before designing', 'Investor decks', 'Legal compliance'],
      correct: 1, explanation: 'Their primary job is alignment — without a shared user picture, the team builds for imaginary buyers.' },
    { q: 'A common failure pattern HCD Part 2 warns against is:',
      options: ['Talking to too many users', 'Iterating without measuring against DFV criteria', 'Building in public', 'Open-sourcing too early'],
      correct: 1, explanation: 'Iteration without DFV measurement is motion without progress — you ship versions, not value.' },
    { q: 'An effective deep tech action plan ends each cycle with:',
      options: ['A demo video', 'A user-validated learning + a next-iteration hypothesis', 'A press release', 'A patent filing'],
      correct: 1, explanation: 'The output of every HCD cycle is learning + the next hypothesis to test — that is what feeds the flywheel.' },
  ]},
  { moduleId: 'M03', title: 'Space 4 Gaming Quiz', passingScore: 80, questions: [
    { q: 'How large is the gaming industry according to the syllabus, and how does it compare to film + music?',
      options: ['$50B — smaller than film', '$188.8B — larger than film and music combined', '$10B — niche segment', '$500B — equal to film'],
      correct: 1, explanation: 'The $188.8B gaming industry already surpasses film and music combined — that is why it is a serious convergence target for space tech.' },
    { q: 'The "Downstream Revolution" in Space 4 Gaming refers to:',
      options: ['Esports broadcasting', 'Using satellite imagery (Sentinel-2) and precise positioning (Galileo) to power open-world games and AR', 'Game-stream subscriptions', 'Cloud gaming infrastructure'],
      correct: 1, explanation: 'Downstream = using space data to enrich games. Copernicus/Galileo data lets developers build realistic open worlds at a fraction of hand-crafted asset cost.' },
    { q: 'The "Upstream Advantage" works in the opposite direction:',
      options: ['Gaming engines (Unity/Unreal) revolutionize astronaut training, cutting training time by ~40%', 'Games fund satellite launches', 'Players design satellites', 'AR replaces simulators'],
      correct: 0, explanation: 'Upstream = gaming tech helps space. Game engines compress training time by ~40% and reduce error rates by ~60% per the syllabus.' },
    { q: 'A "Digital Twin as a Service" monetization pathway is attractive because:',
      options: ['It avoids regulation', 'It produces recurring B2B revenue from defence/aerospace training contracts', 'It targets consumers only', 'It needs no satellite data'],
      correct: 1, explanation: 'DTaaS sells planetary-scale simulation as a subscription — predictable recurring revenue from B2B buyers who can pay.' },
    { q: 'The "Phygital" economy described in HCD applied to gaming refers to:',
      options: ['Physical-only products', 'Business models where physical+digital experiences fund real-world conservation or climate impact', 'Cryptocurrency mining', 'NFT-only platforms'],
      correct: 1, explanation: 'Phygital = physical + digital. Gamification techniques fund real-world climate/conservation outcomes — moving beyond pure entertainment.' },
  ]},
  { moduleId: 'M04', title: 'Space 4 Healthcare Quiz', passingScore: 80, questions: [
    { q: 'The EU Space Ecosystem covered in this module includes:',
      options: ['Only Galileo', 'Five interconnected programs including Galileo, EGNOS, and Copernicus', 'NASA programs', 'Russian Glonass'],
      correct: 1, explanation: 'The module covers five interconnected EU programs — navigation (Galileo), safety-critical augmentation (EGNOS), Earth observation (Copernicus), and others.' },
    { q: 'A key Galileo differentiator vs other GNSS is:',
      options: ['It is free for governments only', '20cm accuracy and signal authentication', 'It only works in Europe', 'It uses unlicensed spectrum'],
      correct: 1, explanation: 'Galileo delivers 20cm accuracy and — critically — signal authentication, which other constellations lack. Authentication matters for safety-critical healthcare use cases.' },
    { q: 'Using the Android GNSS Raw Measurements API with dual-frequency (L1/E1 + L5/E5) enables:',
      options: ['Voice calling', '30cm accuracy in mobile apps', 'Cellular fallback', 'Wifi triangulation'],
      correct: 1, explanation: 'Dual-frequency access via the raw measurements API gives developer apps ~30cm position accuracy — enough for medical drone routing and telemedicine geo-attestation.' },
    { q: 'The global GNSS market size highlighted in this module is approximately:',
      options: ['€10 billion', '€400 billion', '€50 billion', '€1 trillion'],
      correct: 1, explanation: 'The €400B global GNSS market is the addressable opportunity — healthcare is one of seven vertical applications examined.' },
    { q: 'For entrepreneurs in this space, the named funding pathway is:',
      options: ['SBIR only', 'The Cassini Initiative', 'NSF grants', 'Crowdfunding'],
      correct: 1, explanation: 'The Cassini Initiative is the EU funding vehicle highlighted for space-tech entrepreneurs building on Galileo/EGNOS/Copernicus.' },
  ]},
  { moduleId: 'M05', title: 'EO 4 Startup Business Quiz', passingScore: 80, questions: [
    { q: 'The most important early hire structure in an EO startup is:',
      options: ['Lone genius founder', 'A diverse triad: technical + commercial + operational', 'All technical PhDs', 'All sales people'],
      correct: 1, explanation: 'The course explicitly debunks the lone-genius myth — the triad (technical + commercial + operational) prevents burnout and covers the actual scope of building a business.' },
    { q: 'In problem discovery, founders are instructed to focus on:',
      options: ['Selling the data they already have', 'User pains, not just available data', 'Investor demands', 'Competitor features'],
      correct: 1, explanation: 'Start from user pain, not from your data inventory. Design thinking is the recommended methodology for problem-solution fit.' },
    { q: 'The recommended MVP approach is:',
      options: ['Polished, production-ready build', '"Quick and dirty" + no-code to gather user feedback fast', 'Wait for series A then build', 'Hire a contractor'],
      correct: 1, explanation: 'Speed and validation > technical perfection. No-code + scrappy MVPs gather immediate feedback at low cost.' },
    { q: 'A balanced "capital stack" for EO startups should combine:',
      options: ['Only VC', 'VC + grants + customer revenue, preserving equity and using non-dilutive funding early', 'Only customer revenue', 'Only government grants'],
      correct: 1, explanation: 'The capital stack combines VC, grants, and customer revenue — non-dilutive sources protect equity in early stages.' },
    { q: 'The go-to-market strategy advocated is:',
      options: ['Diversify across many markets', 'Conquer a narrow "beachhead" niche completely before expanding', 'Mass-market launch', 'B2C only'],
      correct: 1, explanation: 'Beachhead strategy wins — pick one narrow segment, dominate it, then expand. Premature diversification dilutes resources.' },
  ]},
]

// ────────────────────────────────────────────────────────────────────
//  RESOURCES — Whitepapers, eBooks, Memos
// ────────────────────────────────────────────────────────────────────
type ResourceType = 'whitepaper' | 'ebook' | 'memo' | 'template' | 'dataset'
type Resource = { id: string; title: string; type: ResourceType; description: string; size: string; pages?: number; tag: string }

const resources: Resource[] = [
  // ── HCD Part 1 — Templates & deck
  { id: 'r1', title: 'space_deeptech_x_hcd_part1.pdf', type: 'whitepaper',
    description: 'Full presentation deck for Module 1: HCD Velocity Engine — from empathy to translation. Includes DFV trinity, Commercial Gap analysis, and case applications.',
    size: '3.8 MB', pages: 32, tag: 'HCD · M01' },
  { id: 'r2', title: 'HCD_VELOCITY_CANVAS.pdf', type: 'template',
    description: 'Printable canvas to map your venture across desirability, feasibility and viability. Used directly in the Module 1 lab.',
    size: '420 KB', tag: 'Template · M01' },
  { id: 'r3', title: 'DFV_SCORECARD.pdf', type: 'template',
    description: 'Desirability-Feasibility-Viability scorecard for quick gating decisions on early-stage deep tech ideas.',
    size: '380 KB', tag: 'Template · M01' },
  { id: 'r4', title: 'HMW_STATEMENT_CALCULATOR.pdf', type: 'template',
    description: 'How-Might-We framing tool — convert raw user pains into actionable problem statements.',
    size: '290 KB', tag: 'Template · M01' },
  { id: 'r5', title: 'DeepTech_HCD_Aidevlab_Case_Light.pdf', type: 'memo',
    description: 'Lightweight case study showing HCD applied end-to-end in a real deep tech / AI deve lab context.',
    size: '1.6 MB', pages: 18, tag: 'Case Study · M01' },
  { id: 'r6', title: '4-PHASE_EXPERIENTIAL_INTERVIEW_SCRIPT.pdf', type: 'template',
    description: 'Field-tested user interview script covering empathy, jobs-to-be-done, pain mapping, and willingness-to-pay signals.',
    size: '510 KB', tag: 'Template · M01' },

  // ── HCD Part 2 — Regulatory & empathy
  { id: 'r7', title: 'space_deeptech_x_hcd_part2.pdf', type: 'whitepaper',
    description: 'Module 2 deck: the HCD Velocity Flywheel, iteration loops, and converting validated learning into an action plan.',
    size: '4.2 MB', pages: 38, tag: 'HCD · M02' },
  { id: 'r8', title: 'HCD_REGULATORY_LOVE_LETTER_BLUEPRINT.pdf', type: 'whitepaper',
    description: 'The Regulatory Love Letter blueprint — reframe compliance as a usability requirement and accelerate approval timelines.',
    size: '2.3 MB', pages: 24, tag: 'Compliance · M02' },
  { id: 'r9', title: 'HCD_EMPATHY_MAP & PERSONA_PROFILE.pdf', type: 'template',
    description: 'Combined empathy map and persona profile template to align cross-functional teams on a shared user picture.',
    size: '470 KB', tag: 'Template · M02' },

  // ── Space 4 Gaming
  { id: 'r10', title: 'Space_and_Gaming.pdf', type: 'whitepaper',
    description: 'Module 3 deck: the $300B convergence opportunity. Covers downstream (satellite-powered worlds) and upstream (gaming engines for training) plays.',
    size: '6.4 MB', pages: 52, tag: 'Space · M03' },
  { id: 'r11', title: 'Satellites and Reality Unleashed — Audiobook', type: 'ebook',
    description: 'Companion audiobook to Module 3. Listen to the case for space-tech-enabled gaming as a new consumer category.',
    size: '52 MB', tag: 'Audio · M03' },
  { id: 'r12', title: 'space4water.pdf', type: 'whitepaper',
    description: 'Shared reference: applying space data to water security. Cross-referenced from Module 3 as a parallel vertical model.',
    size: '2.1 MB', pages: 24, tag: 'Reference · M03' },

  // ── Space 4 Healthcare
  { id: 'r13', title: 'Space4Healthcare.pdf', type: 'whitepaper',
    description: 'Module 4 deck: integrating Galileo, EGNOS, and Copernicus into healthcare. Covers the Android GNSS API, dual-frequency accuracy, and 7 real-world use cases.',
    size: '5.7 MB', pages: 48, tag: 'Space · M04' },

  // ── EO 4 Startup Business
  { id: 'r14', title: 'EO4StartupBusiness.pdf', type: 'whitepaper',
    description: 'Module 5 deck: from Copernicus data to $10M ARR. Team triad, problem discovery, MVP, capital stack, beachhead GTM, and scaling.',
    size: '7.2 MB', pages: 64, tag: 'EO · M05' },
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
  const recommendedModules = percentage >= 70 ? ['M05'] : percentage >= 50 ? ['M03', 'M04', 'M05'] : ['M01', 'M02']

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
  const availableModules = modules.filter(m => curriculumByModule[m.id])
  const [openModule, setOpenModule] = useState<string>(availableModules[0]?.id ?? 'M01')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ [`${availableModules[0]?.id ?? 'M01'}-s1`]: true })

  const toggleSection = (key: string) => setOpenSections(p => ({ ...p, [key]: !p[key] }))

  const sectionsForModule = (id: string): Section[] => curriculumByModule[id] || []
  const totalLessons = (id: string) => sectionsForModule(id).reduce((sum, s) => sum + s.lessons.length, 0)
  const hiddenCount = modules.length - availableModules.length

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6">
      <aside className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 max-h-[700px] overflow-y-auto">
        <div className="text-xs uppercase tracking-wider text-white/40 px-2 py-2 flex items-center justify-between">
          <span>Curriculum</span>
          <span className="text-white/30 normal-case tracking-normal">{availableModules.length} / {modules.length}</span>
        </div>
        {availableModules.map(m => {
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
        {hiddenCount > 0 && (
          <div className="mt-3 mx-2 px-3 py-2.5 rounded-lg bg-white/5 border border-dashed border-white/10 text-[11px] text-white/40 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
            <span>{hiddenCount} more modules in development.</span>
          </div>
        )}
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

              {sections.length === 0 ? null : (
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

// Stripe Payment Links — create at dashboard.stripe.com/payment-links and paste here.
const STRIPE_LINKS = {
  lifetime: 'https://buy.stripe.com/REPLACE_ME_LIFETIME',
  nft: 'https://buy.stripe.com/REPLACE_ME_NFT',
  monthly: 'https://buy.stripe.com/REPLACE_ME_MONTHLY',
}

const tiers: Tier[] = [
  {
    name: 'Lifetime Access', price: '$597', sub: 'One-time payment',
    accent: 'from-purple-500 to-purple-700',
    features: ['All 5 ready-to-deliver modules', 'All 5 graded quizzes', '14 downloadable templates + decks', 'Community access'],
    cta: 'Get Started',
    amountUSD: 597,
    cardLink: STRIPE_LINKS.lifetime,
  },
  {
    name: 'NFT Edition', price: '$1,197', sub: 'One-time + NFT',
    accent: 'from-purple-600 via-pink-600 to-cyan-500',
    features: ['Everything in Lifetime', 'Exclusive NFT certificate', '1-on-1 consultation', 'All whitepapers + datasets', 'Alumni network'],
    cta: 'Get NFT Edition',
    popular: true,
    amountUSD: 1197,
    cardLink: STRIPE_LINKS.nft,
  },
  {
    name: 'Monthly Digest', price: '$67', priceSub: '/mo', sub: 'Cancel anytime',
    accent: 'from-blue-500 to-cyan-600',
    features: ['Weekly insights', 'Market updates', 'Deal flow access', 'Expert interviews'],
    cta: 'Subscribe',
    amountUSD: 67,
    cardLink: STRIPE_LINKS.monthly,
  },
]

// Single Web3 wallet handle — no per-chain branding. Buyer's wallet client
// resolves desireyavro.x via Unstoppable Domains to the right underlying address.
const WALLET_HANDLE = 'desireyavro.x'

function WalletReveal() {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_HANDLE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // graceful no-op; clipboard may be blocked
    }
  }

  if (!revealed) {
    return (
      <button
        onClick={() => setRevealed(true)}
        className="group w-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/30 hover:bg-white/[0.07] transition flex flex-col items-center justify-center gap-3"
        aria-label="Reveal payment wallet"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/40 to-pink-600/40 border border-white/10 flex items-center justify-center group-hover:scale-105 transition">
          <Wallet className="w-7 h-7 text-white" />
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition">Tap to reveal wallet</div>
      </button>
    )
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/40 to-pink-600/40 border border-white/10 flex items-center justify-center">
          <Wallet className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2 bg-black/30 border border-white/5 rounded-lg px-4 py-3">
        <span className="text-white text-sm font-mono flex-1 text-center select-all">{WALLET_HANDLE}</span>
        <button
          onClick={handleCopy}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition ${
            copied ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          aria-label="Copy wallet handle"
        >
          {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <p className="text-[11px] text-white/40 text-center mt-3">Your wallet will resolve the handle to the right chain.</p>
    </div>
  )
}

const VERIFY_TX_URL = (import.meta.env.VITE_VERIFY_TX_URL as string | undefined) || ''

function PaymentModal({ tier, open, onOpenChange }: { tier: Tier; open: boolean; onOpenChange: (v: boolean) => void }) {
  const [confirming, setConfirming] = useState(false)
  const [email, setEmail] = useState('')
  const [txHash, setTxHash] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const handleCardCheckout = () => {
    if (!tier.cardLink || tier.cardLink.includes('REPLACE_ME')) {
      alert('Stripe Payment Link not yet configured. Paste your real link into STRIPE_LINKS in src/App.tsx.')
      return
    }
    window.open(tier.cardLink, '_blank', 'noopener,noreferrer')
  }

  const handleSubmitTx = async () => {
    if (!txHash.trim() || !email.trim()) return
    setSubmitting(true)
    setSubmitError('')
    if (VERIFY_TX_URL) {
      try {
        const res = await fetch(VERIFY_TX_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: tier.name, amountUSD: tier.amountUSD, wallet: WALLET_HANDLE, txHash: txHash.trim(), email: email.trim() }),
        })
        if (!res.ok) {
          const text = await res.text().catch(() => '')
          throw new Error(text || `Verification failed (${res.status})`)
        }
        setSent(true)
      } catch (e: unknown) {
        setSubmitError(e instanceof Error ? e.message : 'Network error — try again')
      }
    } else {
      // No backend wired yet — accept the submission optimistically and let the operator reconcile.
      setSent(true)
    }
    setSubmitting(false)
  }

  const reset = () => {
    setConfirming(false); setEmail(''); setTxHash('')
    setSent(false); setSubmitting(false); setSubmitError('')
  }

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
            <TabsTrigger value="wallet" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white gap-2">
              <Wallet className="w-4 h-4" /> Wallet
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="mt-4 space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm font-semibold text-white">Pay with Stripe</div>
                  <div className="text-xs text-white/50">Card, Apple Pay, Google Pay, Link</div>
                </div>
              </div>
              <p className="text-xs text-white/60 mb-4">
                You'll be redirected to a secure Stripe-hosted checkout for <strong className="text-white">{tier.price}</strong>. Your card details never touch our servers.
              </p>
              <Button onClick={handleCardCheckout} className={`w-full bg-gradient-to-r ${tier.accent} gap-2`}>
                Continue to Stripe <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-3 text-[10px] text-white/40 uppercase tracking-wider">
              <span>PCI DSS</span><span>·</span><span>3-D Secure</span><span>·</span><span>Encrypted</span>
            </div>
          </TabsContent>

          <TabsContent value="wallet" className="mt-4 space-y-3">
            {!confirming ? (
              <>
                <WalletReveal />
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
                <p className="text-sm text-white/60 mb-4">We'll verify and email your access link within ~30 minutes.</p>
                <Button onClick={() => onOpenChange(false)} className="bg-white/10 hover:bg-white/20">Close</Button>
              </div>
            ) : (
              <>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1 block">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="bg-black/30 border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1 block">Transaction Reference</label>
                    <Input
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder="Tx hash or reference"
                      className="bg-black/30 border-white/10 text-white placeholder:text-white/30 font-mono text-xs"
                    />
                  </div>
                  <p className="text-xs text-white/50">
                    We'll confirm and email your access details. Make sure the transaction has been broadcast before submitting.
                  </p>
                </div>
                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-xs text-red-200">{submitError}</div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setConfirming(false)} className="border-white/20 text-white hover:bg-white/10" disabled={submitting}>Back</Button>
                  <Button onClick={handleSubmitTx} disabled={!txHash.trim() || !email.trim() || submitting} className={`flex-1 bg-gradient-to-r ${tier.accent} disabled:opacity-40`}>
                    {submitting ? 'Verifying…' : 'Submit'}
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
      case 'M01': return <DeHypeCalculator />       // DFV / De-Hype scoring for HCD Part 1
      case 'M02': return <SprintCalculator />       // 90-day HCD action sprint for Part 2
      case 'M03': return <SpaceCalculator />        // Space + Gaming launch economics
      case 'M05': return <SovereignCalculator />    // EO startup scaling jurisdiction
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
                The MOOC for Space & DeepTech commercialization. From Copernicus data and HCD to $10M ARR. 5 ready-to-deliver modules, 5 graded quizzes, 14 templates + decks.
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
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> 5 Modules Live</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Quizzes & Labs</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> NFT Certificate</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Lifetime Access</div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-cyan-500/30 rounded-3xl blur-2xl" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {modules.map((m) => (
                    <div key={m.id} className={`p-3 rounded-xl bg-gradient-to-br ${m.color} text-white text-center shadow-lg`}>
                      <m.icon className="w-6 h-6 mx-auto mb-1" />
                      <div className="text-[10px] font-bold opacity-90">{m.id}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 text-center pt-4 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">5</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Modules</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">25+</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Lessons</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">14</div>
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
            <Badge className="mb-3 bg-purple-500/20 text-purple-300 border border-purple-500/30">5 Modules · Ready to Deliver</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-3 text-white">All Modules at a Glance</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Click any module to open lectures, the interactive calculator, and the quiz gate. From HCD foundations to Space verticals to $10M ARR EO commercialization.</p>
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
                    <span className="flex items-center gap-1"><Wallet className="w-3 h-3" /> Wallet</span>
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
