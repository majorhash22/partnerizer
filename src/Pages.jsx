import { useState } from "react";
import { Buildings, Handshake, UsersThree } from "@phosphor-icons/react";
import { imageSrc } from "./site.js";

const solutions = [
  {
    id: "chambers",
    title: "Chambers of commerce",
    copy: "Help local businesses find suppliers, collaborators, and customers within the membership.",
    start: "Invite a group of local businesses with a shared need, such as finding local suppliers.",
    review: "See which introductions were accepted and where members still need help finding a fit.",
  },
  {
    id: "associations",
    title: "Business associations",
    copy: "Connect members across specialties when they need complementary expertise or capacity.",
    start: "Pilot with a chapter or industry group that already shares opportunities informally.",
    review: "Look at the introductions that led to meetings and which specialties were harder to match.",
  },
  {
    id: "referral-networks",
    title: "Referral networks",
    copy: "Give both businesses the context they need to decide whether a referral is worth pursuing.",
    start: "Use one referral group to clarify who each business serves and what it can offer.",
    review: "Review which referrals moved forward and where a clearer profile could improve the next match.",
  },
];

const ecosystemRoles = [
  { label: "Network hosts", icon: UsersThree },
  { label: "Member businesses", icon: Buildings },
  { label: "Service providers", icon: Handshake },
];

const exampleOrganizations = [
  {
    name: "Juniper Quay Chamber",
    role: "Network hosts",
    copy: "Runs a local supplier pilot and invites members to share what they need and what they can offer.",
  },
  {
    name: "Kestrel Foundry",
    role: "Member businesses",
    copy: "Offers small-batch fabrication and is looking for a regional shipping partner.",
  },
  {
    name: "Parcelmere Logistics",
    role: "Service providers",
    copy: "Helps small manufacturers consolidate shipments and reach customers in nearby markets.",
  },
  {
    name: "Cedarline Trade Association",
    role: "Network hosts",
    copy: "Brings specialty trades together and coordinates introductions for joint project opportunities.",
  },
  {
    name: "Alder & Gauge Studio",
    role: "Member businesses",
    copy: "Designs retail displays and looks for fabrication partners when projects require a larger production run.",
  },
  {
    name: "Fieldmere Advisory",
    role: "Service providers",
    copy: "Helps growing businesses prepare for supplier conversations and plan their next steps after a referral.",
  },
];

export function PageHero({ label, title, description, image, imageAlt, children }) {
  return (
    <section className="page-hero" id="top">
      <div className="shell page-hero__layout">
        <div className="page-hero__content">
          <p className="page-hero__label">{label}</p>
          <h1>{title}</h1>
          <p className="page-hero__description">{description}</p>
          {children}
        </div>
        <img className="page-hero__image" src={imageSrc(image)} alt={imageAlt} fetchPriority="high" />
      </div>
    </section>
  );
}

export function SolutionsContent() {
  return (
    <section className="solution-detail section" id="use-cases" aria-labelledby="solutions-heading">
      <div className="shell">
        <div className="section-intro">
          <h2 id="solutions-heading">Choose a starting point for your network</h2>
        </div>
        <div className="solution-detail__list">
          {solutions.map(({ id, title, copy, start, review }) => (
            <article className="solution-detail__row" id={id} key={id}>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <dl>
                <div>
                  <dt>Pilot starting point</dt>
                  <dd>{start}</dd>
                </div>
                <div>
                  <dt>What to review</dt>
                  <dd>{review}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EcosystemsContent() {
  const [roleFilter, setRoleFilter] = useState("");
  const visibleOrganizations = roleFilter
    ? exampleOrganizations.filter(({ role }) => role === roleFilter)
    : exampleOrganizations;

  return (
    <section className="ecosystem section" id="example-organizations" aria-labelledby="ecosystem-heading">
      <div className="shell">
        <div className="section-intro">
          <h2 id="ecosystem-heading">Example organizations</h2>
          <p>All organizations below are fictional and illustrate the roles in a partner network.</p>
        </div>
        <div className="ecosystem__filters" role="group" aria-label="Filter organizations by role">
          <button type="button" aria-pressed={!roleFilter} onClick={() => setRoleFilter("")}>
            All organizations
          </button>
          {ecosystemRoles.map(({ label }) => (
            <button
              key={label}
              type="button"
              aria-pressed={label === roleFilter}
              onClick={() => setRoleFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">{visibleOrganizations.length} example organizations shown.</p>
        <ul className="ecosystem__directory" aria-label="Fictional organizations">
          {visibleOrganizations.map(({ name, role, copy }) => {
            const { icon: Icon } = ecosystemRoles.find(({ label }) => label === role);
            return (
              <li className="ecosystem__organization" key={name}>
                <Icon size={28} weight="duotone" aria-hidden="true" />
                <p className="ecosystem__role">{role}</p>
                <h3>{name}</h3>
                <p>{copy}</p>
              </li>
            );
          })}
        </ul>
        <div className="ecosystem__scenario">
          <h3>How an introduction could happen</h3>
          <p>
            Juniper Quay Chamber invites Kestrel Foundry into a pilot. Kestrel says it needs a regional
            shipping partner, and MerchantMatcher surfaces Parcelmere Logistics. Both businesses
            approve the introduction before they connect.
          </p>
        </div>
      </div>
    </section>
  );
}
