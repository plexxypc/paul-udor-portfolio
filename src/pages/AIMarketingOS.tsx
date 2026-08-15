import heroImage from '../assets/AIMOSAbout.png'
import playbookImage from '../assets/insideAIMOS.png'
import finalImage from '../assets/main.png'

const problemFlow = ['RESEARCH', 'PROMPTS', 'CONTENT', 'DISTRIBUTION', '???']
const stages = [
  { number: '01', title: 'RESEARCH', description: 'Understand your market.' },
  { number: '02', title: 'PRODUCTION', description: 'Create meaningful content.' },
  { number: '03', title: 'DISTRIBUTION', description: 'Reach the right audience.' },
  { number: '04', title: 'MEASUREMENT', description: 'Measure what matters.' },
  { number: '05', title: 'OPTIMIZATION', description: 'Improve and compound.' },
]

const workflowSteps = [
  {
    number: '01',
    title: 'RESEARCH',
    text: 'Understand your audience and identify opportunities.',
  },
  {
    number: '02',
    title: 'PRODUCE',
    text: 'Turn research into useful content.',
  },
  {
    number: '03',
    title: 'DISTRIBUTE',
    text: 'Publish and distribute through the right channels.',
  },
  {
    number: '04',
    title: 'MEASURE',
    text: 'Track meaningful performance signals.',
  },
  {
    number: '05',
    title: 'OPTIMIZE',
    text: 'Refresh, repurpose, and improve.',
  },
]

const audienceCards = [
  {
    title: 'MARKETING AGENCIES',
    description: 'Standardize marketing processes across clients and teams.',
  },
  {
    title: 'FREELANCERS',
    description: 'Replace scattered workflows with a repeatable system.',
  },
  {
    title: 'CONTENT STRATEGISTS',
    description: 'Turn research into a structured content pipeline.',
  },
  {
    title: 'SEO CONSULTANTS',
    description: 'Build a repeatable research and production process.',
  },
  {
    title: 'SOCIAL MEDIA MANAGERS',
    description: 'Connect content creation, distribution, and measurement.',
  },
  {
    title: 'CONSULTANTS & COACHES',
    description: 'Build a more consistent content engine around your expertise.',
  },
]

const checklist = [
  '3 Playbooks',
  '17 Modules',
  'AI Accelerators',
  'AI Worksheet Assistants',
  'Strategic Worksheets',
  'Decision Gates',
  'Completed Examples',
  'Content Distribution Workflows',
  'Performance Tracking',
  'Content Optimization',
  'Refresh Planning',
  'Repurposing Workflows',
]

const faqs = [
  {
    question: 'What is AI Marketing OS?',
    answer:
      'AI Marketing OS is a structured content marketing operating system that connects research, content production, distribution, measurement, and optimization into one repeatable workflow.',
  },
  {
    question: 'Who is it for?',
    answer:
      'It is designed for marketing agencies, freelancers, content strategists, SEO consultants, social media managers, consultants, coaches, and small marketing teams.',
  },
  {
    question: 'Do I need a Notion account?',
    answer: 'Yes. AI Marketing OS is delivered through Notion.',
  },
  {
    question: 'Do I need to be an SEO expert?',
    answer:
      'No. The system provides structured workflows and guidance. Some modules cover SEO concepts, but advanced technical SEO knowledge is not required.',
  },
  {
    question: 'Do I need ChatGPT Plus, Claude Pro, or Gemini Premium?',
    answer:
      'Not necessarily. The workflows can be used with available AI assistants, although access to more capable models may improve certain outputs.',
  },
  {
    question: 'Is this a SaaS product?',
    answer:
      'No. AI Marketing OS: Content Engine is a structured marketing system delivered through Notion.',
  },
]

const primaryCta = 'https://whop.com/checkout/plan_0XArxw8ndn1ID'

export function AIMarketingOS() {
  return (
    <div className="bg-background text-text">
      <header className="sticky top-0 z-30 border-b border-gold/20 bg-background/85 backdrop-blur-xl">
        <div className="product-container flex items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="/" className="text-sm uppercase tracking-[0.28em] text-ivory/90 transition-opacity hover:opacity-80">
            AI MARKETING OS
          </a>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.22em] text-text-muted md:flex">
            <a href="/ai-marketing-os" className="transition-colors hover:text-ivory">Product</a>
            <a href="#faq-accordion" className="transition-colors hover:text-ivory">FAQ</a>
            <a href={primaryCta} className="text-gold transition-colors hover:text-[#dcc08a]">
              Purchase
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="section-padding pt-12 md:pt-18">
          <div className="product-container">
            <div className="grid items-center gap-10 xl:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-gold">AI MARKETING OS</p>
                <h1 className="serif-display max-w-[680px] text-5xl leading-[0.95] tracking-[-0.06em] text-ivory sm:text-6xl lg:text-[5rem]">
                  Stop Using AI as a Collection of Prompts.
                  <span className="mt-3 block text-ivory/85">Start Using It as a Marketing System.</span>
                </h1>
                <p className="mt-6 max-w-[620px] text-base leading-8 text-text-muted md:text-lg">
                  AI Marketing OS gives you a structured system for researching your audience,
                  producing content, distributing it, measuring performance, and continuously improving
                  what you publish.
                </p>

                <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <a
                    href={primaryCta}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center border border-gold bg-gold px-7 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#0b0b0f] transition-all duration-200 hover:bg-[#dcc08a]"
                  >
                    GET AI MARKETING OS
                  </a>
                </div>

                <p className="mt-5 text-sm text-text-muted">
                  First 50 users: <span className="font-semibold text-ivory">$19.99</span>
                  <span className="mx-2 text-text-subtle line-through">$49.99</span>
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.24em] text-text-subtle">
                  <span className="rounded-full border border-gold/20 bg-gold-soft px-3 py-2">17 MODULES</span>
                  <span className="rounded-full border border-gold/20 bg-gold-soft px-3 py-2">3 PLAYBOOKS</span>
                  <span className="rounded-full border border-gold/20 bg-gold-soft px-3 py-2">AI ACCELERATORS</span>
                </div>
              </div>

              <div className="relative">
                <div className="premium-panel relative overflow-hidden rounded-[2rem] border border-gold/20 bg-[#0b0c10] p-3 shadow-[0_0_0_1px_rgba(200,164,106,0.12)]">
                  <div className="grid-pattern absolute inset-0 opacity-40" />
                  <img
                    src={heroImage}
                    alt="AI Marketing OS product mockup"
                    className="relative z-10 w-full rounded-[1.5rem] border border-gold/25 bg-[#0d0d0f] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="mb-10 flex items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-gold">THE PROBLEM</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <h2 className="serif-display text-4xl leading-tight tracking-[-0.05em] text-ivory sm:text-5xl">
                  AI Isn't the Problem.
                  <span className="block text-ivory/80">Your Workflow Is.</span>
                </h2>
                <p className="mt-6 max-w-[580px] text-base leading-8 text-text-muted md:text-lg">
                  AI can help with almost every part of marketing. But without a structured workflow,
                  marketers end up with scattered prompts, disconnected tools, inconsistent processes,
                  and content that isn't connected to performance.
                </p>
              </div>

              <div className="rounded-[2rem] border border-gold/15 bg-[#121317] p-6 md:p-8">
                <div className="space-y-4 text-center">
                  <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.24em] text-text-subtle">
                    {problemFlow.map((item, index) => (
                      <div key={item} className="flex flex-col items-center gap-2">
                        <span className={index === problemFlow.length - 1 ? 'text-gold' : 'text-ivory'}>{item}</span>
                        {index < problemFlow.length - 1 && <span className="text-gold/70">↓</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="my-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                <div className="rounded-[1.5rem] border border-gold/20 bg-[#16171b] p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">AI MARKETING OS</p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ivory/90">
                    <span>RESEARCH</span>
                    <span className="text-gold">→</span>
                    <span>PRODUCTION</span>
                    <span className="text-gold">→</span>
                    <span>DISTRIBUTION</span>
                    <span className="text-gold">→</span>
                    <span>MEASUREMENT</span>
                    <span className="text-gold">→</span>
                    <span>OPTIMIZATION</span>
                  </div>
                </div>

                <p className="mt-8 text-center text-2xl font-medium text-ivory md:text-3xl">
                  One system. Everything connected.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="mb-12 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">THE SYSTEM</p>
              <h2 className="serif-display mt-5 text-4xl leading-tight tracking-[-0.05em] text-ivory sm:text-5xl">
                A Complete Content Marketing Operating System
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-text-muted md:text-lg">
                AI Marketing OS gives you a repeatable workflow for turning marketing research into
                content, distributing that content strategically, measuring what happens, and improving
                the system over time.
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <div className="grid gap-5 lg:grid-cols-5">
                {stages.map((stage) => (
                  <div key={stage.number} className="relative rounded-[1.5rem] border border-gold/15 bg-[#121317] p-6 text-left">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.24em] text-gold">{stage.number}</span>
                    </div>
                    <h3 className="text-lg uppercase tracking-[0.18em] text-ivory">{stage.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-text-muted">{stage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="mb-10">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">INSIDE THE OS</p>
              <h2 className="serif-display mt-4 max-w-4xl text-4xl leading-tight tracking-[-0.05em] text-ivory sm:text-5xl">
                Everything You Need to Run a Repeatable Content Engine
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="premium-panel overflow-hidden rounded-[2rem] border border-gold/20 bg-[#0d0e11] p-4 md:p-5">
                <img
                  src={playbookImage}
                  alt="AI Marketing OS product visual"
                  className="w-full rounded-[1.3rem] border border-gold/20 bg-[#0d0d0f]"
                />
              </div>

              <div className="space-y-6">
                <div className="rounded-[1.5rem] border border-gold/15 bg-[#121317] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">3 PLAYBOOKS</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-text-muted">
                    <li>AI Content Research System</li>
                    <li>AI SEO Content Production System</li>
                    <li>AI Content Distribution System</li>
                  </ul>
                </div>

                <div className="rounded-[1.5rem] border border-gold/15 bg-[#121317] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">17 MODULES</p>
                  <p className="mt-4 text-5xl font-semibold leading-none text-ivory">17</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-text-subtle">Modules</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                'AI ACCELERATORS',
                'AI WORKSHEET ASSISTANTS',
                'WORKSHEETS',
                'DECISION GATES',
                'COMPLETED EXAMPLES',
                'CONTENT WORKFLOWS',
              ].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-gold/15 bg-[#121317] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="mb-12 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">THE WORKFLOW</p>
              <h2 className="serif-display mt-4 text-4xl leading-tight tracking-[-0.05em] text-ivory sm:text-5xl">
                From Idea to Improvement.
              </h2>
            </div>

            <div className="space-y-5">
              {workflowSteps.map((step) => (
                <div key={step.number} className="rounded-[1.5rem] border border-gold/15 bg-[#121317] p-5 md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-5">
                      <span className="text-3xl font-semibold text-gold">{step.number}</span>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{step.title}</p>
                        <p className="mt-2 text-base text-ivory md:text-lg">{step.text}</p>
                      </div>
                    </div>
                    {step.number !== '05' && <span className="text-2xl text-gold">↓</span>}
                  </div>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-8 text-text-muted md:text-lg">
              Your content doesn't stop working when you publish it. The system helps you learn from
              what happens next.
            </p>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">WHY AI MARKETING OS</p>
              <h2 className="serif-display mt-4 text-4xl leading-tight tracking-[-0.05em] text-ivory sm:text-5xl">
                Not Another Prompt Library.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-gold/15 bg-[#121317] p-6 md:p-8">
                <p className="mb-6 text-xs uppercase tracking-[0.24em] text-text-subtle">THE OLD WAY</p>
                <ul className="space-y-4 text-base leading-7 text-text-muted">
                  <li>• Search for another prompt</li>
                  <li>• Start from scratch</li>
                  <li>• Work across disconnected documents</li>
                  <li>• Guess what to create next</li>
                  <li>• Publish and move on</li>
                  <li>• Repeat the process</li>
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-gold/30 bg-[linear-gradient(135deg,rgba(200,164,106,0.08),rgba(200,164,106,0.02))] p-6 md:p-8">
                <p className="mb-6 text-xs uppercase tracking-[0.24em] text-gold">AI MARKETING OS</p>
                <ul className="space-y-4 text-base leading-7 text-ivory">
                  <li>• Follow a structured workflow</li>
                  <li>• Build from documented research</li>
                  <li>• Use connected worksheets</li>
                  <li>• Make decisions through decision gates</li>
                  <li>• Measure performance</li>
                  <li>• Improve and recycle existing work</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="mb-12 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">BUILT FOR MARKETERS</p>
              <h2 className="serif-display mt-4 text-4xl leading-tight tracking-[-0.05em] text-ivory sm:text-5xl">
                If You Use AI for Marketing, This Was Built for You.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {audienceCards.map((card) => (
                <div key={card.title} className="rounded-[1.5rem] border border-gold/15 bg-[#121317] p-6">
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">{card.title}</p>
                  <p className="mt-4 text-base leading-7 text-text-muted">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">YOUR CONTENT MARKETING SYSTEM</p>
              <h2 className="serif-display mt-4 text-4xl leading-tight tracking-[-0.05em] text-ivory sm:text-5xl">
                More Than a Template.
              </h2>
            </div>

            <div className="rounded-[2rem] border border-gold/15 bg-[#121317] p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {checklist.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.15rem] border border-gold/10 bg-[#17181d] p-4">
                    <span className="mt-0.5 text-base text-gold">✓</span>
                    <span className="text-sm text-ivory/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="space-y-8 text-center">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.24em] text-gold">FROM:</p>
                <p className="serif-display text-4xl leading-[1.1] tracking-[-0.05em] text-ivory md:text-6xl">
                  "Which prompt should I use?"
                </p>
              </div>

              <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.24em] text-gold">TO:</p>
                <p className="serif-display text-4xl leading-[1.1] tracking-[-0.05em] text-ivory md:text-6xl">
                  "What does the system tell me to do next?"
                </p>
              </div>

              <div className="grid gap-5 pt-8 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-gold/15 bg-[#121317] p-6 text-left">
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">FROM:</p>
                  <p className="mt-4 text-2xl font-medium text-ivory">Scattered AI tasks</p>
                </div>
                <div className="rounded-[1.5rem] border border-gold/15 bg-[#121317] p-6 text-left">
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">TO:</p>
                  <p className="mt-4 text-2xl font-medium text-ivory">A repeatable marketing workflow</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-gold/15 bg-[#121317] p-6 text-left">
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">FROM:</p>
                  <p className="mt-4 text-2xl font-medium text-ivory">Create → Publish → Forget</p>
                </div>
                <div className="rounded-[1.5rem] border border-gold/15 bg-[#121317] p-6 text-left">
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">TO:</p>
                  <p className="mt-4 text-2xl font-medium text-ivory">Create → Distribute → Measure → Optimize → Reuse</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="premium-panel overflow-hidden rounded-[2rem] border border-gold/20 bg-[#0d0e11] p-4 md:p-5">
              <img
                src={finalImage}
                alt="AI Marketing OS content engine product showcase"
                className="w-full rounded-[1.5rem] border border-gold/20 bg-[#0a0b0d]"
              />
              <div className="mt-5 flex flex-col gap-3 px-2 pb-2 text-center md:flex-row md:items-center md:justify-between md:text-left">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-gold">AI MARKETING OS</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.26em] text-text-subtle">CONTENT ENGINE</p>
                </div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-text-subtle">
                  17 MODULES • 3 PLAYBOOKS • AI ACCELERATORS
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-gold/15 bg-[#121317] p-8 md:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-gold">LAUNCH V1</p>
              <h2 className="serif-display mt-5 text-4xl leading-tight tracking-[-0.05em] text-ivory sm:text-5xl">
                Build Your Content Marketing System.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-text-muted md:text-lg">
                AI Marketing OS is launching with the first 50 users at an introductory price.
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-end">
                <span className="serif-display text-5xl tracking-[-0.05em] text-ivory">$19.99</span>
                <span className="text-lg text-text-subtle line-through">$49.99</span>
              </div>

              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-text-subtle">First 50 users only.</p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href={primaryCta}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center border border-gold bg-gold px-7 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#0b0b0f] transition-all duration-200 hover:bg-[#dcc08a]"
                >
                  GET AI MARKETING OS
                </a>
              </div>

              <p className="mt-5 text-sm text-text-muted">Delivered through Notion.</p>
            </div>
          </div>
        </section>

        <section id="faq-accordion" className="section-padding border-t border-gold/10 py-20 md:py-24">
          <div className="product-container">
            <div className="mb-12 text-center">
              <h2 className="serif-display text-4xl leading-tight tracking-[-0.05em] text-ivory sm:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-[1.25rem] border border-gold/15 bg-[#121317] p-5 md:p-6">
                  <p className="text-lg font-medium text-ivory">{faq.question}</p>
                  <p className="mt-3 text-base leading-8 text-text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gold/10 bg-[#050507] py-20 md:py-24">
          <div className="product-container px-5 sm:px-8 lg:px-10">
            <div className="rounded-[2rem] border border-gold/15 bg-[#0b0d0f] p-8 text-center md:p-12">
              <p className="text-xs uppercase tracking-[0.26em] text-gold">AI MARKETING OS</p>
              <h2 className="serif-display mt-5 text-4xl leading-tight tracking-[-0.06em] text-ivory sm:text-6xl">
                Stop Prompting.
                <span className="block">Start Operating.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-text-muted md:text-lg">
                Build a repeatable content marketing system that helps you research, produce,
                distribute, measure, and improve your marketing.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={primaryCta}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center border border-gold bg-gold px-7 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#0b0b0f] transition-all duration-200 hover:bg-[#dcc08a]"
                >
                  GET AI MARKETING OS
                </a>
              </div>

              <p className="mt-6 text-sm uppercase tracking-[0.24em] text-gold">$19.99 FOR THE FIRST 50 USERS</p>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-text-subtle">AI MARKETING OS</p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-text-subtle">Content Engine</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gold/10 bg-[#050507] py-10">
        <div className="product-container px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-lg uppercase tracking-[0.24em] text-ivory">AI MARKETING OS</p>
              <p className="mt-2 max-w-md text-sm text-text-muted">
                The operating system for content marketing that scales.
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.22em] text-text-muted">
              <a href="/ai-marketing-os" className="transition-colors hover:text-gold">Product</a>
              <a href="#faq-accordion" className="transition-colors hover:text-gold">FAQ</a>
              <a href={primaryCta} className="transition-colors hover:text-gold">Purchase</a>
            </div>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-text-subtle">© 2026 AI Marketing OS</p>
        </div>
      </footer>
    </div>
  )
}
