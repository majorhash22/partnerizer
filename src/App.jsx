import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ChartLineUp,
  Check,
  CheckCircle,
  CopySimple,
  IdentificationCard,
  List,
  MagnifyingGlass,
  PaperPlaneTilt,
  ShieldCheck,
  TrendUp,
  UsersThree,
  X,
} from "@phosphor-icons/react";

const navItems = [
  ["Solution", "#solution"],
  ["How it works", "#how-it-works"],
  ["For networks", "#for-networks"],
  ["Pilot", "#pilot"],
];

const workflowSteps = [
  {
    name: "Profile",
    copy: "Members define what they offer, what they need, and who they can help.",
    detail:
      "Structured profiles make every member easier to understand, search, and introduce with confidence.",
    icon: IdentificationCard,
  },
  {
    name: "Match",
    copy: "The network surfaces relevant partners around real business needs.",
    detail:
      "Practical criteria and operator context keep recommendations focused on fit, trust, and mutual value.",
    icon: MagnifyingGlass,
  },
  {
    name: "Introduce",
    copy: "Members approve warm, consent-first introductions before contact is shared.",
    detail:
      "Every introduction starts with context and a clear reason to meet, then moves into a shared next step.",
    icon: PaperPlaneTilt,
  },
  {
    name: "Track",
    copy: "Operators follow meetings, opportunities, referrals, and partner progress.",
    detail:
      "Activity becomes evidence the network can use to improve member value and guide the next cohort.",
    icon: ChartLineUp,
  },
];

const audiences = [
  {
    title: "Chambers",
    copy: "Give members a clearer path from attendance to commercial collaboration.",
  },
  {
    title: "Referral networks",
    copy: "Make relevant introductions easier to create, accept, and follow through.",
  },
  {
    title: "Associations",
    copy: "Turn shared expertise into practical partner opportunities across the member base.",
  },
  {
    title: "Member organizations",
    copy: "Prove the value of trusted relationships with visible, measurable activity.",
  },
];

const trustPrinciples = [
  {
    title: "Curated matches",
    copy: "Operators add context and quality control while the product learns what a strong fit looks like.",
    icon: UsersThree,
  },
  {
    title: "Consent-first introductions",
    copy: "Members control who they meet, why the introduction happens, and what information moves forward.",
    icon: ShieldCheck,
  },
  {
    title: "Measurable activity",
    copy: "Profiles, matches, introductions, meetings, and outcomes give the network a practical evidence trail.",
    icon: TrendUp,
  },
];

const founders = [
  {
    name: "Daniel Bohunicky",
    role: "Co-founder",
    experience: "15+",
    experienceLabel: "years in international business development",
    bio: "Daniel brings international business development and hands-on ecosystem orchestration experience to the networks that small and mid-market businesses already trust.",
  },
  {
    name: "Wendel Capangada",
    role: "Co-founder",
    experience: "10+",
    experienceLabel: "years in building software",
    bio: "Wendel brings more than a decade of experience building and supporting enterprise web and mobile products, with a focus on reliable, accessible digital services and practical technical solutions.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ScrollRevealSection({ children, className, id, amount = 0.12 }) {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: false, amount, margin: "-4% 0px -4% 0px" },
        variants: sectionReveal,
        transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <motion.section
      className={className}
      id={id}
      data-scroll-reveal="section"
      {...motionProps}
    >
      {children}
    </motion.section>
  );
}

function BrandLockup({ footer = false }) {
  return (
    <a className={`brand-lockup${footer ? " brand-lockup--footer" : ""}`} href="#top" aria-label="PartneRizer home">
      <span className="brand-lockup__crop" aria-hidden="true">
        <img src="./images/partnerizer-logo.png" alt="" />
      </span>
      <span className="sr-only">PartneRizer, Revenue Force Multiplier</span>
    </a>
  );
}

function ActionLink({ href, children, secondary = false, onClick }) {
  return (
    <a
      className={`button${secondary ? " button--secondary" : ""}`}
      href={href}
      onClick={onClick}
    >
      <span>{children}</span>
      <ArrowRight size={19} weight="bold" aria-hidden="true" />
    </a>
  );
}

function Header({ onPilotOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const openPilot = (event) => {
    event.preventDefault();
    setMenuOpen(false);
    onPilotOpen();
  };

  return (
    <motion.header
      className="site-header"
      initial={reduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <BrandLockup />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <a className="header-cta" href="#pilot" onClick={openPilot}>
        Build your pilot
        <ArrowRight size={18} weight="bold" aria-hidden="true" />
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X size={25} /> : <List size={27} />}
      </button>
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a className="mobile-nav__cta" href="#pilot" onClick={openPilot}>
              Build your pilot
              <ArrowRight size={18} weight="bold" />
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero({ onPilotOpen }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.18], ["0%", "6%"]);
  return (
    <ScrollRevealSection className="hero" id="top" amount={0.08}>
      <motion.img
        className="hero__image"
        src="./images/hero2.webp"
        alt="Business professionals greeting with a handshake during a meeting"
        fetchPriority="high"
        style={{ y: reduceMotion ? "0%" : imageY }}
        initial={reduceMotion ? false : { opacity: 0.72, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="hero__inner">
        <motion.div
          className="hero__content"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
        >
          <motion.h1 variants={reveal} transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}>
            <span>Turn member connections</span>
            <span>into <strong>measurable growth.</strong></span>
          </motion.h1>
          <motion.p variants={reveal} transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}>
            PartneRizer helps trusted business networks create better matches, warm introductions, and trackable partner outcomes.
          </motion.p>
          <motion.div className="hero__actions" variants={reveal} transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}>
            <ActionLink href="#pilot" onClick={(event) => { event.preventDefault(); onPilotOpen(); }}>
              Build your pilot
            </ActionLink>
            <ActionLink href="#how-it-works" secondary>See how it works</ActionLink>
          </motion.div>
        </motion.div>
        <motion.p
          className="hero__statement"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Networking creates contact.<br />Partnership operations create outcomes.
        </motion.p>
      </div>
    </ScrollRevealSection>
  );
}

function SectionIntro({ title, body, light = false }) {
  return (
    <div className={`section-intro${light ? " section-intro--light" : ""}`}>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

function ProblemSection() {
  return (
    <ScrollRevealSection className="problem section" id="solution">
      <div className="shell problem__grid">
        <motion.div
          className="problem__aside"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="problem__word">Visibility</span>
          <span className="problem__word">Trust</span>
          <span className="problem__word problem__word--active">Follow-through</span>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          transition={{ duration: 0.64, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionIntro
            title="From introductions to outcomes"
            body="Events and directories create visibility. PartneRizer adds the structure that moves a promising connection into a trusted, trackable partnership."
          />
          <div className="problem__result">
            <span>Connection</span>
            <ArrowRight size={22} weight="bold" aria-hidden="true" />
            <span>Context</span>
            <ArrowRight size={22} weight="bold" aria-hidden="true" />
            <strong>Commercial activity</strong>
          </div>
        </motion.div>
      </div>
    </ScrollRevealSection>
  );
}

function ProductLayers() {
  const [active, setActive] = useState("operator");
  const layerCopy = {
    operator: {
      heading: "The operating layer",
      body: "Configure a focused cohort, guide onboarding, review match quality, trigger introductions, and see what happens next.",
      items: ["Cohort onboarding", "Curated match review", "Outcome reporting"],
    },
    member: {
      heading: "The activation layer",
      body: "Create a partner-ready profile, define offers and needs, discover relevant collaborators, and move warm introductions forward.",
      items: ["Partner-ready profiles", "Relevant matches", "Shared next steps"],
    },
  };
  const selected = layerCopy[active];

  return (
    <ScrollRevealSection className="layers section" id="platform">
      <div className="shell">
        <SectionIntro
          title="One platform. Two clear experiences."
          body="The network operates the system. Members experience the value."
          light
        />
        <div className="layers__grid">
          <div className="layer-tabs" role="tablist" aria-label="Product experiences">
            <button
              className={active === "operator" ? "is-active" : ""}
              type="button"
              role="tab"
              aria-selected={active === "operator"}
              aria-controls="layer-panel"
              onClick={() => setActive("operator")}
            >
              <span>PartneRizer Platform</span>
              <small>For network operators</small>
            </button>
            <button
              className={active === "member" ? "is-active" : ""}
              type="button"
              role="tab"
              aria-selected={active === "member"}
              aria-controls="layer-panel"
              onClick={() => setActive("member")}
            >
              <span>MerchantMatcher</span>
              <small>For members</small>
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              className="layer-panel"
              id="layer-panel"
              role="tabpanel"
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h3>{selected.heading}</h3>
              <p>{selected.body}</p>
              <ul>
                {selected.items.map((item) => (
                  <li key={item}><CheckCircle size={20} weight="fill" />{item}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ScrollRevealSection>
  );
}

function Workflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = workflowSteps[activeIndex];
  const ActiveIcon = activeStep.icon;
  return (
    <ScrollRevealSection className="workflow section" id="how-it-works">
      <div className="shell">
        <SectionIntro
          title="A repeatable path to partner revenue"
          body="A simple workflow helps trusted relationships move forward with context and a shared next step."
          light
        />
        <div className="workflow__rail" role="tablist" aria-label="PartneRizer workflow">
          <motion.span
            className="workflow__progress"
            aria-hidden="true"
            animate={{ scaleX: activeIndex / (workflowSteps.length - 1) }}
            transition={{ type: "spring", stiffness: 120, damping: 24 }}
          />
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls="workflow-panel"
                className={index <= activeIndex ? "is-reached" : ""}
                key={step.name}
                onClick={() => setActiveIndex(index)}
              >
                <span className="workflow__icon"><Icon size={27} weight="regular" /></span>
                <strong>{step.name}</strong>
                <small>{step.copy}</small>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="workflow__detail"
            id="workflow-panel"
            role="tabpanel"
            key={activeStep.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <ActiveIcon size={32} weight="duotone" aria-hidden="true" />
            <div>
              <strong>{activeStep.name}</strong>
              <p>{activeStep.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ScrollRevealSection>
  );
}

function AudienceSection() {
  return (
    <ScrollRevealSection className="audience section" id="for-networks">
      <div className="shell audience__layout">
        <motion.figure
          className="audience__image"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="./images/network-workshop.webp"
            alt="A facilitator guiding business owners through a collaborative workshop"
            loading="lazy"
          />
        </motion.figure>
        <div>
          <SectionIntro
            title="Built for networks that already have trust"
            body="Start where relationships, credibility, and member concentration already exist."
          />
          <div className="audience__list">
            {audiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.55 }}
                variants={reveal}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <h3>{audience.title}</h3>
                <p>{audience.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}

function TrustSection() {
  return (
    <ScrollRevealSection className="trust section">
      <div className="shell trust__layout">
        <div className="trust__intro">
          <SectionIntro
            title="Human judgment stays in the loop."
            body="Smart technology supports the relationship. Context, consent, and operator judgment protect its quality."
            light
          />
        </div>
        <div className="trust__list">
          {trustPrinciples.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.article
                key={principle.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={reveal}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Icon size={31} weight="duotone" aria-hidden="true" />
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </ScrollRevealSection>
  );
}

function FounderSection() {
  return (
    <ScrollRevealSection className="founder section">
      <div className="shell">
        <motion.div
          className="founder__intro"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={reveal}
          transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Partnership expertise. Product depth.</h2>
          <p>
            PartneRizer is co-founded by Daniel Bohunicky and Wendel Capangada, combining ecosystem growth experience with more than a decade of software delivery.
          </p>
        </motion.div>
        <div className="founder__grid">
          {founders.map((founder, index) => (
            <motion.article
              className="founder__profile"
              key={founder.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={reveal}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <div
                className="founder__credential"
                aria-label={`${founder.experience} ${founder.experienceLabel}`}
              >
                <strong>{founder.experience}</strong>
                <span>{founder.experienceLabel}</span>
              </div>
              <h3>{founder.name}</h3>
              <span className="founder__role">{founder.role}</span>
              <p>{founder.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}

function PilotSection({ onPilotOpen }) {
  return (
    <ScrollRevealSection className="pilot" id="pilot">
      <img
        className="pilot__image"
        src="./images/pilot-landscape.webp"
        alt="A focused group overlooking a Saskatchewan river valley at blue hour"
        loading="lazy"
      />
      <motion.div
        className="shell pilot__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        variants={reveal}
        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>Start with one network and one focused cohort.</h2>
        <p>Prove the value. Build momentum. Then grow.</p>
        <button className="button" type="button" onClick={onPilotOpen}>
          <span>Build your pilot</span>
          <ArrowRight size={19} weight="bold" aria-hidden="true" />
        </button>
      </motion.div>
    </ScrollRevealSection>
  );
}

function PilotPlanner({ open, onClose }) {
  const dialogRef = useRef(null);
  const [organization, setOrganization] = useState("");
  const [networkType, setNetworkType] = useState("Chamber of commerce");
  const [memberCount, setMemberCount] = useState("50-100");
  const [goal, setGoal] = useState("Improve member introductions");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => dialogRef.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const summary = useMemo(
    () => `PartneRizer pilot brief\nOrganization: ${organization || "Your organization"}\nNetwork type: ${networkType}\nMember cohort: ${memberCount} members\nPrimary goal: ${goal}\nSuggested starting point: one 90-day network pilot with a focused cohort, partner-ready profiles, curated matches, consent-first introductions, and outcome tracking.`,
    [goal, memberCount, networkType, organization],
  );

  const submit = (event) => {
    event.preventDefault();
    if (!organization.trim()) {
      setError("Add your organization name to create the pilot brief.");
      return;
    }
    setError("");
    setComplete(true);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Copying was blocked. Select the summary text and copy it manually.");
    }
  };

  const reset = () => {
    setComplete(false);
    setCopied(false);
    setError("");
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="pilot-planner"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pilot-planner-title"
            tabIndex={-1}
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="pilot-planner__close" type="button" onClick={onClose} aria-label="Close pilot planner">
              <X size={24} />
            </button>
            {!complete ? (
              <form onSubmit={submit} noValidate>
                <span className="pilot-planner__step">Pilot planner</span>
                <h2 id="pilot-planner-title">Shape your first cohort</h2>
                <p>A focused starting brief takes less than a minute. Nothing leaves your browser.</p>
                <label>
                  Organization name
                  <input
                    type="text"
                    value={organization}
                    onChange={(event) => setOrganization(event.target.value)}
                    placeholder="Your organization"
                    autoComplete="organization"
                  />
                </label>
                <div className="pilot-planner__row">
                  <label>
                    Network type
                    <select value={networkType} onChange={(event) => setNetworkType(event.target.value)}>
                      <option>Chamber of commerce</option>
                      <option>Referral network</option>
                      <option>Association</option>
                      <option>Member organization</option>
                    </select>
                  </label>
                  <label>
                    Focused cohort
                    <select value={memberCount} onChange={(event) => setMemberCount(event.target.value)}>
                      <option value="25-50">25-50 members</option>
                      <option value="50-100">50-100 members</option>
                      <option value="100-200">100-200 members</option>
                      <option value="200+">More than 200 members</option>
                    </select>
                  </label>
                </div>
                <label>
                  Primary goal
                  <select value={goal} onChange={(event) => setGoal(event.target.value)}>
                    <option>Improve member introductions</option>
                    <option>Increase referral activity</option>
                    <option>Support co-sell opportunities</option>
                    <option>Measure member collaboration</option>
                  </select>
                </label>
                {error ? <p className="form-error" role="alert">{error}</p> : null}
                <button className="button pilot-planner__submit" type="submit">
                  <span>Create pilot brief</span>
                  <ArrowRight size={19} weight="bold" />
                </button>
              </form>
            ) : (
              <div className="pilot-summary">
                <span className="pilot-planner__step">Your starting brief</span>
                <h2 id="pilot-planner-title">A focused 90-day pilot</h2>
                <p>Use this summary to guide the first PartneRizer conversation.</p>
                <pre>{summary}</pre>
                {error ? <p className="form-error" role="alert">{error}</p> : null}
                <div className="pilot-summary__actions">
                  <button className="button" type="button" onClick={copySummary}>
                    {copied ? <Check size={19} weight="bold" /> : <CopySimple size={19} weight="bold" />}
                    <span>{copied ? "Copied" : "Copy summary"}</span>
                  </button>
                  <button className="text-button" type="button" onClick={reset}>Start again</button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <BrandLockup footer />
        <nav aria-label="Footer navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <p>PartneRizer Consulting Inc.<br />Revenue Force Multiplier</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [pilotOpen, setPilotOpen] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <Header onPilotOpen={() => setPilotOpen(true)} />
      <main>
        <Hero onPilotOpen={() => setPilotOpen(true)} />
        <ProblemSection />
        <ProductLayers />
        <Workflow />
        <AudienceSection />
        <TrustSection />
        <FounderSection />
        <PilotSection onPilotOpen={() => setPilotOpen(true)} />
      </main>
      <Footer />
      <PilotPlanner open={pilotOpen} onClose={() => setPilotOpen(false)} />
    </MotionConfig>
  );
}
