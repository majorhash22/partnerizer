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
  ClipboardText,
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
import { EcosystemsContent, PageHero, SolutionsContent } from "./Pages.jsx";
import { currentPage, imageSrc, pageHref } from "./site.js";

const navItems = [
  ["Platform", "platform"],
  ["Solutions", "solutions"],
  ["Ecosystems", "ecosystems"],
  ["MerchantMatcher", "platform", "merchant-matcher"],
];

const platformCapabilities = [
  {
    title: "Design your program",
    copy: "Choose a focused group of members, set a goal, and plan onboarding with PartneRizer.",
    href: "#cohort",
    link: "Plan a cohort",
    icon: ClipboardText,
  },
  {
    title: "Connect your members",
    copy: "Give members a place to share what they need, find relevant businesses, and approve introductions.",
    href: "#merchant-matcher",
    link: "See MerchantMatcher",
    icon: UsersThree,
  },
  {
    title: "Review what follows",
    copy: "Review participation, introductions, and follow-up with your network team to improve the next cohort.",
    href: "#program-delivery",
    link: "See program delivery",
    icon: ChartLineUp,
  },
];

const workflowSteps = [
  {
    name: "Profile",
    copy: "A business defines what it offers, what it needs, and the relationships it wants to build.",
    detail:
      "MerchantMatcher turns that business context into a partner-ready profile that is easier to understand, search, and introduce with confidence.",
    icon: IdentificationCard,
  },
  {
    name: "Match",
    copy: "Relevant opportunities are surfaced around real business needs and mutual fit.",
    detail:
      "Matching combines practical criteria with network context so businesses see connections that have a clear reason to move forward.",
    icon: MagnifyingGlass,
  },
  {
    name: "Introduce",
    copy: "Businesses approve warm, consent-first introductions before contact moves forward.",
    detail:
      "Each introduction carries context, intent, and a shared reason to connect instead of leaving businesses with another cold directory entry.",
    icon: PaperPlaneTilt,
  },
  {
    name: "Grow",
    copy: "Introductions become meetings, referrals, opportunities, and stronger network participation.",
    detail:
      "The activity creates a visible path from a match to business outcomes while giving the partner network better insight into member engagement.",
    icon: ChartLineUp,
  },
];

const audiences = [
  {
    title: "Chambers of commerce",
    copy: "Help local businesses find collaborators, suppliers, and referral partners within your membership.",
  },
  {
    title: "Business associations",
    copy: "Introduce members around shared priorities such as finding suppliers or pursuing joint opportunities.",
  },
  {
    title: "Referral networks",
    copy: "Surface who is a fit for each referral and give both sides context before they meet.",
  },
];

const trustPrinciples = [
  {
    title: "Curated matches",
    copy: "Network operators can add context about what makes a match useful for their members.",
    icon: UsersThree,
  },
  {
    title: "Consent-first introductions",
    copy: "Members control who they meet, why the introduction happens, and what information moves forward.",
    icon: ShieldCheck,
  },
  {
    title: "Follow-through",
    copy: "Use profiles, matches, and introductions to see who is participating and where a connection needs follow-up.",
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
    <a className={`brand-lockup${footer ? " brand-lockup--footer" : ""}`} href={pageHref("home", "top")} aria-label="PartneRizer home">
      <span className="brand-lockup__crop" aria-hidden="true">
        <img src={imageSrc("partnerizer-logo.png")} alt="" />
      </span>
      <span className="sr-only">PartneRizer, Revenue Force Multiplier</span>
    </a>
  );
}

function NavigationLinks({ onNavigate }) {
  return navItems.map(([label, page, anchor]) => (
    <a
      key={label}
      href={pageHref(page, anchor)}
      aria-current={currentPage === page && !anchor ? "page" : undefined}
      onClick={onNavigate}
    >
      {label}
    </a>
  ));
}

function ActionLink({ href, children, secondary = false, accent = false, onClick }) {
  return (
    <a
      className={`button${secondary ? " button--secondary" : ""}${accent ? " button--accent" : ""}`}
      href={href}
      onClick={onClick}
    >
      <span>{children}</span>
      <ArrowRight size={19} weight="bold" aria-hidden="true" />
    </a>
  );
}

function Header() {
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


  return (
    <motion.header
      className="site-header"
      initial={reduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <BrandLockup />
      <nav className="desktop-nav" aria-label="Primary navigation">
        <NavigationLinks />
      </nav>
      <a className="header-cta" href="#cohort">
        Plan a pilot
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
            <NavigationLinks onNavigate={() => setMenuOpen(false)} />
            <a className="mobile-nav__cta" href="#cohort" onClick={() => setMenuOpen(false)}>
              Plan a pilot
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
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
        src={imageSrc("hero2.webp")}
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
            <span>Run stronger</span>
            <span><strong>partner programs.</strong></span>
          </motion.h1>
          <motion.p variants={reveal} transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}>
            PartneRizer helps business networks match members, make trusted introductions, and see what happens next.
          </motion.p>
          <motion.div className="hero__actions" variants={reveal} transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}>
            <ActionLink href={pageHref("platform")} accent>
              Explore the platform
            </ActionLink>
            <ActionLink href="#cohort" secondary onClick={(event) => { event.preventDefault(); onPilotOpen(); }}>
              Plan a pilot
            </ActionLink>
          </motion.div>
        </motion.div>
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

function PlatformOverview() {
  return (
    <ScrollRevealSection className="platform section" id="solution">
      <div className="shell">
        <SectionIntro
          title="One platform for your partner program"
          body="Start with a cohort, help members connect through MerchantMatcher, and use what you learn to improve the program."
        />
        <ol className="platform__capabilities">
          {platformCapabilities.map(({ title, copy, href, link, icon: Icon }) => (
            <li key={title} className="platform__capability">
              <Icon size={30} weight="duotone" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
              <a href={href}>
                {link}
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </ScrollRevealSection>
  );
}

function Workflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = workflowSteps[activeIndex];
  const ActiveIcon = activeStep.icon;

  const handleTabKeyDown = (event) => {
    const lastIndex = workflowSteps.length - 1;
    const nextIndexByKey = {
      ArrowLeft: activeIndex === 0 ? lastIndex : activeIndex - 1,
      ArrowRight: activeIndex === lastIndex ? 0 : activeIndex + 1,
      Home: 0,
      End: lastIndex,
    };
    const nextIndex = nextIndexByKey[event.key];
    if (!Number.isInteger(nextIndex)) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    event.currentTarget.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };

  return (
    <ScrollRevealSection className="workflow section" id="merchant-matcher">
      <div className="shell">
        <SectionIntro
          title="MerchantMatcher"
          body="The experience your members use to find relevant businesses and agree to introductions. Here’s what that looks like from a member’s first profile to their next opportunity."
          light
        />
        <div
          className="workflow__rail"
          id="how-it-works"
          role="tablist"
          aria-label="MerchantMatcher workflow"
          onKeyDown={handleTabKeyDown}
        >
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
                id={`workflow-tab-${index}`}
                aria-selected={index === activeIndex}
                aria-controls="workflow-panel"
                tabIndex={index === activeIndex ? 0 : -1}
                className={index <= activeIndex ? "is-reached" : ""}
                key={step.name}
                onClick={() => setActiveIndex(index)}
              >
                <span className="workflow__icon"><Icon size={27} weight="regular" aria-hidden="true" /></span>
                <strong>{step.name}</strong>
                <small>{step.copy}</small>
              </button>
            );
          })}
        </div>
        <div id="workflow-panel" role="tabpanel" aria-labelledby={`workflow-tab-${activeIndex}`} tabIndex={0}>
          <AnimatePresence mode="wait">
            <motion.div
              className="workflow__detail"
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
      </div>
    </ScrollRevealSection>
  );
}

function AudienceSection() {
  return (
    <ScrollRevealSection className="audience section" id="network-pathway">
      <div className="shell audience__layout">
        <motion.figure
          className="audience__image"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={imageSrc("network-workshop.webp")}
            alt="A facilitator guiding business owners through a collaborative workshop"
            loading="lazy"
          />
        </motion.figure>
        <div>
          <SectionIntro
            title="Built for member-led networks"
            body="Give members a practical reason to engage with your network and a clear path from an introduction to a conversation."
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
          <div className="audience__actions">
            <ActionLink href={pageHref("solutions")} secondary>Explore solutions</ActionLink>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}

function TrustSection() {
  return (
    <ScrollRevealSection className="trust section" id="program-delivery">
      <div className="shell trust__layout">
        <div className="trust__intro">
          <SectionIntro
            title="Keep your team involved"
            body="Your network team helps shape the cohort, guide the quality of matches, and review how members participate."
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

function PilotSection({ onPilotOpen, compact = false }) {
  return (
    <ScrollRevealSection className={compact ? "pilot pilot--compact" : "pilot"} id="cohort">
      {compact ? null : (
        <img
          className="pilot__image"
          src={imageSrc("pilot-landscape.webp")}
          alt="A focused group overlooking a Saskatchewan river valley at blue hour"
          loading="lazy"
        />
      )}
      <motion.div
        className="shell pilot__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        variants={reveal}
        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>Start with one member cohort</h2>
        <p>Choose your network type, cohort size, and goal. The planner creates a brief you can copy and share.</p>
        <button className="button" type="button" onClick={onPilotOpen}>
          <span>Plan a pilot</span>
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
    () => `PartneRizer cohort brief\nOrganization: ${organization || "Your organization"}\nNetwork type: ${networkType}\nFocused cohort: ${memberCount} members\nPrimary goal: ${goal}\nSuggested starting point: one focused network cohort using MerchantMatcher for partner-ready profiles, relevant matches, consent-first introductions, and practical outcome tracking.`,
    [goal, memberCount, networkType, organization],
  );

  const submit = (event) => {
    event.preventDefault();
    if (!organization.trim()) {
      setError("Add your organization name to create the cohort brief.");
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
            <button className="pilot-planner__close" type="button" onClick={onClose} aria-label="Close cohort planner">
              <X size={24} />
            </button>
            {!complete ? (
              <form onSubmit={submit} noValidate>
                <span className="pilot-planner__step">Cohort planner</span>
                <h2 id="pilot-planner-title">Shape a focused cohort</h2>
                <p>Create a pilot brief to share with your network team. The planner runs in your browser.</p>
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
                  <span>Create cohort brief</span>
                  <ArrowRight size={19} weight="bold" />
                </button>
              </form>
            ) : (
              <div className="pilot-summary">
                <span className="pilot-planner__step">Your starting brief</span>
                <h2 id="pilot-planner-title">A focused starting cohort</h2>
                <p>Use this summary to guide a PartneRizer conversation with a prospective network partner.</p>
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
          <NavigationLinks />
        </nav>
        <p>PartneRizer Consulting Inc.<br />Revenue Force Multiplier</p>
      </div>
    </footer>
  );
}

function PageContent({ onPilotOpen }) {
  switch (currentPage) {
    case "platform":
      return (
        <>
          <PageHero
            label="Platform"
            title="Run a connected partner program"
            description="Design your cohort, help members find the right businesses through MerchantMatcher, and review what happens after the introduction."
            image="network-workshop.webp"
            imageAlt="Business owners collaborating at a network workshop"
          >
            <ActionLink href="#solution" accent>See the program workflow</ActionLink>
          </PageHero>
          <PlatformOverview />
          <Workflow />
          <TrustSection />
        </>
      );
    case "solutions":
      return (
        <>
          <PageHero
            label="Solutions"
            title="Make membership more useful"
            description="Find a practical first program for your chamber, business association, or referral network."
            image="pilot-landscape.webp"
            imageAlt="A group overlooking a Saskatchewan river valley"
          >
            <ActionLink href="#use-cases" accent>Find your use case</ActionLink>
          </PageHero>
          <SolutionsContent />
        </>
      );
    case "ecosystems":
      return (
        <>
          <PageHero
            label="Ecosystems"
            title="See a partner ecosystem in action"
            description="Explore a fictional network of hosts, member businesses, and service providers, and see how they could work together."
            image="hero2.webp"
            imageAlt="Business professionals greeting with a handshake"
          >
            <ActionLink href="#example-organizations" accent>Browse organizations</ActionLink>
          </PageHero>
          <EcosystemsContent />
        </>
      );
    default:
      return (
        <>
          <Hero onPilotOpen={onPilotOpen} />
          <PlatformOverview />
          <AudienceSection />
          <Workflow />
          <TrustSection />
          <FounderSection />
        </>
      );
  }
}

export default function App() {
  const [pilotOpen, setPilotOpen] = useState(false);

  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <PageContent onPilotOpen={() => setPilotOpen(true)} />
        <PilotSection onPilotOpen={() => setPilotOpen(true)} compact={currentPage !== "home"} />
      </main>
      <Footer />
      <PilotPlanner open={pilotOpen} onClose={() => setPilotOpen(false)} />
    </MotionConfig>
  );
}
