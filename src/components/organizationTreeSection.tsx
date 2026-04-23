import React, { useState } from 'react';
import { Mail, Users2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type OrgPerson = {
  name: string;
  role: string;
  email?: string;
  accent?: string;
  details?: string;
  image?: string;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const PUBLIC_PROFILE_IMAGES = [
  'balkrishna.jpeg',
  'gita gautam.jpeg',
  'laxmi kant.jpeg',
  'mahendra kr napit.jpeg',
  'prakash gautam.jpeg',
  'sajitashrestha.jpeg',
  'sodashi regmi ojha.jpeg',
  'sujan.jpeg',
  'surendra bdr acharya.jpeg',
] as const;

const imageLookup = new Map(
  PUBLIC_PROFILE_IMAGES.map((fileName) => {
    const stem = fileName.replace(/\.[^.]+$/, '');
    return [normalizeName(stem), `/${fileName}`] as const;
  }),
);

const PERSON_IMAGE_ALIASES: Record<string, string> = {
  drlaxmikantasharma: 'laxmi kant',
  sodasiojharegmi: 'sodashi regmi ojha',
  drprakasahgautam: 'prakash gautam',
  balkrishnasubedi: 'balkrishna',
  sujantripathi: 'sujan',
  gitagautampaudel: 'gita gautam',
  mahendrakumarnapit: 'mahendra kr napit',
  surendrabahaduracharya: 'surendra bdr acharya',
};

function getPersonImage(name: string) {
  const normalized = normalizeName(name);
  const alias = PERSON_IMAGE_ALIASES[normalized];
  const matchedKey = alias ? normalizeName(alias) : normalized;
  return imageLookup.get(matchedKey);
}

function OrgCard({ name, role, email, accent = 'from-slate-600 to-blue-700' }: OrgPerson) {
  const initials = getInitials(name);
  const image = getPersonImage(name);

  return (
    <div className="org-card group relative w-full max-w-[290px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_10px_26px_-16px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_34px_-18px_rgba(15,23,42,0.45)]">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="flex min-h-[120px] items-start gap-3 p-4 pt-5">
        {image ? (
          <img
            src={image}
            alt={`${name} profile`}
            className="h-11 w-11 shrink-0 rounded-full object-cover shadow-sm"
            loading="lazy"
          />
        ) : (
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-sm font-bold text-white shadow-sm`}>
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-semibold text-slate-900 sm:text-[1.05rem]">{name}</h4>
          <p className="mt-0.5 line-clamp-3 text-sm leading-5 text-slate-500">{role}</p>
          {email && <p className="mt-2 truncate text-xs text-slate-400">📧 {email}</p>}
        </div>
      </div>
    </div>
  );
}

type OrgCardTriggerProps = {
  person: OrgPerson;
  onOpen: (person: OrgPerson) => void;
};

function OrgCardTrigger({ person, onOpen }: OrgCardTriggerProps) {
  return (
    <button
      type="button"
      className="org-trigger w-full rounded-2xl text-left outline-none transition-transform duration-300 focus-visible:scale-[1.01] focus-visible:ring-2 focus-visible:ring-blue-300"
      aria-haspopup="dialog"
      aria-label={`View details for ${person.name}`}
      onClick={() => onOpen(person)}
    >
      <OrgCard {...person} />
    </button>
  );
}

export default function OrganizationTreeSection() {
  const [selectedPerson, setSelectedPerson] = useState<OrgPerson | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [fullImageOpen, setFullImageOpen] = useState(false);

  const openPersonDetails = (person: OrgPerson) => {
    setSelectedPerson(person);
    setDetailOpen(true);
  };

  const director: OrgPerson = {
    name: 'Dr. Laxmi Kanta Sharma',
    role: 'Planning Director',
    email: 'director.planning@tu.edu.np',
    details: 'Leads directorate-level planning, coordination, and institutional development initiatives.',
    accent: 'from-slate-700 to-blue-800',
  };

  const leadership: OrgPerson[] = [
    { name: 'Sodasi Ojha Regmi', role: 'Deputy Administrator', email: 'Sodasiojha@tu.edu.np', details: 'Supports administration, coordination, and operational follow-through.', accent: 'from-blue-700 to-slate-700' },
    { name: 'Dr. Prakasah Gautam', role: 'NHEP Coordinator', email: 'prakash.gautam@tu.edu.np', details: 'Coordinates NHEP-related planning and execution activities.', accent: 'from-slate-700 to-blue-700' },
    { name: 'Bal Krishna Subedi', role: 'IT Expert /Asst. Professor', email: 'balkrishna.subedi@tu.edu.np', details: 'Assesses university IT needs, develops security-aligned strategies and policies, implements systems, supports partnerships, resolves issues, trains staff, oversees project timelines, budgets, and quality, advises on emerging technologies and data privacy, and leads ongoing monitoring and reporting.', accent: 'from-blue-700 to-cyan-700' },
    { name: 'Sujan Tripathi', role: 'Structural Engineering Expert /Asst. Professor', email: 'sujantripathi@ioe.edu.np', details: 'Provides structural engineering guidance and review support.', accent: 'from-sky-700 to-blue-700' },
  ];

  const sectionLead: OrgPerson = {
    name: 'Shova Ghimire',
    role: 'Section Officer',
    email: 'shova.ghimire@tu.edu.np',
    details: 'Manages section workflows, coordination, and administrative processing.',
    accent: 'from-slate-700 to-blue-700',
  };

  const assistants: OrgPerson[] = [
    { name: 'Gita Gautam Paudel', role: 'Head Office Assistant', email: 'gita.gautam@tu.edu.np', details: 'Assists in office coordination and administrative support.' },
    { name: 'Mahendra Kumar Napit', role: 'Assistant Computer Operator', email: 'mahendra.napit@tu.edu.np', details: 'Handles computer operations and digital support tasks.' },
    { name: 'Sajita Shrestha', role: 'Head Technical Assistant', email: 'sajita.shrestha@tu.edu.np', details: 'Supports technical work, records, and office coordination.' },
    { name: 'Surendra Bahadur Acharya', role: 'Head Office Assistant', email: 'surendra.acharya@tu.edu.np', details: 'Provides clerical support and day-to-day office assistance.' },
  ];

  const helpers: OrgPerson[] = [
    { name: 'Saraswoti Bista', role: 'Office Helper', email: 'saraswati.bista@tu.edu.np', details: 'Supports daily office operations and workspace upkeep.', accent: 'from-sky-700 to-blue-700' },
    { name: 'Nirmala K.C.', role: 'Office Helper', email: 'nirmala.kc@tu.edu.np', details: 'Assists with routine office support and coordination tasks.', accent: 'from-blue-700 to-slate-700' },
  ];

  const levelTagClass =
    'mb-4 inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600';

  return (
    <section className="org-section relative overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100/60" />

      <div className="relative mx-auto w-[92vw] max-w-[1400px]">
        <div className="mb-10 text-center">
          <div className="org-badge mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Users2 className="h-4 w-4" />
            Team Structure
          </div>
          <h2 className="org-title text-3xl font-bold text-slate-900 md:text-4xl">Planning Directorate Organizational Tree</h2>
          {/* <p className="mx-auto mt-3 max-w-3xl text-slate-600">
            A clear, modern view of leadership and support roles for faster collaboration and coordination.
          </p> */}
        </div>

        <div className="org-panel rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.35)] sm:p-6 lg:p-8">
          <div className="hidden xl:block">
            <div className="mx-auto min-w-[1240px]">
              <div className="flex flex-col items-center">
                <div className="org-node org-node-main">
                  <OrgCardTrigger person={director} onOpen={openPersonDetails} />
                </div>

                <div className="org-line h-10 w-[2px] bg-slate-300" />

                <div className="relative mb-10 w-[1180px]">
                  <div className="org-line absolute left-[70px] right-[70px] top-0 h-[2px] bg-slate-300" />
                  <div className="grid grid-cols-4 gap-10 pt-8">
                    {leadership.map((person, index) => (
                      <div key={person.name} className="org-node flex flex-col items-center" style={{ animationDelay: `${index * 90}ms` }}>
                        <div className="org-line mb-5 h-8 w-[2px] bg-slate-300" />
                        <OrgCardTrigger person={person} onOpen={openPersonDetails} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="org-line h-9 w-[2px] bg-slate-300" />
                <div className="org-node org-node-main">
                  <OrgCardTrigger person={sectionLead} onOpen={openPersonDetails} />
                </div>

                <div className="org-line h-10 w-[2px] bg-slate-300" />

                <div className="relative mb-10 w-[1180px]">
                  <div className="org-line absolute left-[70px] right-[70px] top-0 h-[2px] bg-slate-300" />
                  <div className="grid grid-cols-4 gap-10 pt-8">
                    {assistants.map((person, index) => (
                      <div key={person.name} className="org-node flex flex-col items-center" style={{ animationDelay: `${index * 90}ms` }}>
                        <div className="org-line mb-5 h-8 w-[2px] bg-slate-300" />
                        <OrgCardTrigger person={person} onOpen={openPersonDetails} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="org-line h-10 w-[2px] bg-slate-300" />

                <div className="relative w-[620px]">
                  <div className="org-line absolute left-[70px] right-[70px] top-0 h-[2px] bg-slate-300" />
                  <div className="grid grid-cols-2 gap-10 pt-8">
                    {helpers.map((person, index) => (
                      <div key={person.name} className="org-node flex flex-col items-center" style={{ animationDelay: `${index * 90}ms` }}>
                        <div className="org-line mb-5 h-8 w-[2px] bg-slate-300" />
                        <OrgCardTrigger person={person} onOpen={openPersonDetails} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:hidden">
            <div className="mx-auto max-w-5xl space-y-10">
              <div className="flex flex-col items-center gap-3">
                <span className={levelTagClass}>Leadership</span>
                <div className="org-node org-node-main">
                  <OrgCardTrigger person={director} onOpen={openPersonDetails} />
                </div>
              </div>

              <div>
                <span className={levelTagClass}>Core Team</span>
                <div className="grid grid-cols-1 place-items-center gap-5">
                  {leadership.map((person, index) => (
                    <div key={person.name} className="org-node" style={{ animationDelay: `${index * 90}ms` }}>
                      <OrgCardTrigger person={person} onOpen={openPersonDetails} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <span className={levelTagClass}>Section Office</span>
                <div className="org-node org-node-main">
                  <OrgCardTrigger person={sectionLead} onOpen={openPersonDetails} />
                </div>
              </div>

              <div>
                <span className={levelTagClass}>Assistants</span>
                <div className="grid grid-cols-1 place-items-center gap-5">
                  {assistants.map((person, index) => (
                    <div key={person.name} className="org-node" style={{ animationDelay: `${index * 90}ms` }}>
                      <OrgCardTrigger person={person} onOpen={openPersonDetails} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className={levelTagClass}>Office Helpers</span>
                <div className="grid grid-cols-1 place-items-center gap-5">
                  {helpers.map((person, index) => (
                    <div key={person.name} className="org-node" style={{ animationDelay: `${index * 90}ms` }}>
                      <OrgCardTrigger person={person} onOpen={openPersonDetails} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={detailOpen && !!selectedPerson}
        onOpenChange={(open) => {
          setDetailOpen(open);
          if (!open) {
            setFullImageOpen(false);
            setSelectedPerson(null);
          }
        }}
      >
        <DialogContent
          className="sm:max-w-4xl border-0 bg-transparent p-0 shadow-none [&>button]:text-white"
        >
          {selectedPerson && (
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.9)]">
              <div className={`h-2 bg-gradient-to-r ${selectedPerson.accent ?? 'from-slate-600 to-blue-700'}`} />
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative p-6 sm:p-8">
                  <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_42%)]" />
                  <div className="relative flex flex-col gap-6">
                    <DialogHeader className="space-y-3 text-left">
                      {getPersonImage(selectedPerson.name) ? (
                        <button
                          type="button"
                          onClick={() => setFullImageOpen(true)}
                          className="group relative inline-block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                          aria-label={`View full-size image of ${selectedPerson.name}`}
                        >
                          <img
                            src={getPersonImage(selectedPerson.name)}
                            alt={`${selectedPerson.name} profile`}
                            className="h-28 w-28 rounded-2xl object-cover shadow-lg transition-transform duration-200 group-hover:scale-[1.03] sm:h-36 sm:w-36"
                          />
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            View full screen
                          </span>
                        </button>
                      ) : (
                        <div className={`inline-flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedPerson.accent ?? 'from-slate-600 to-blue-700'} text-2xl font-bold text-white shadow-lg sm:h-36 sm:w-36 sm:text-3xl`}>
                          {getInitials(selectedPerson.name)}
                        </div>
                      )}
                      <div>
                        <DialogTitle className="text-2xl font-semibold text-white sm:text-3xl">{selectedPerson.name}</DialogTitle>
                        <DialogDescription className="mt-2 text-sm text-slate-300 sm:text-base">
                          {selectedPerson.role}
                        </DialogDescription>
                      </div>
                    </DialogHeader>

                    {selectedPerson.details && (
                      <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                        {selectedPerson.details}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/10 bg-white/5 p-6 sm:p-8 md:border-l md:border-t-0">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Contact</p>
                      <div className="mt-3 flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl bg-blue-500/20 p-2 text-blue-200">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">Email</p>
                          <a className="mt-1 block break-all text-sm text-slate-300 transition hover:text-white" href={`mailto:${selectedPerson.email ?? ''}`}>
                            {selectedPerson.email ?? 'Not available'}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Designation</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{selectedPerson.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={fullImageOpen && !!selectedPerson && !!getPersonImage(selectedPerson.name)}
        onOpenChange={setFullImageOpen}
      >
        <DialogContent className="h-[96vh] w-[96vw] max-w-[96vw] border-0 bg-black/95 p-3 sm:p-6 [&>button]:text-white">
          {selectedPerson && getPersonImage(selectedPerson.name) && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <img
                src={getPersonImage(selectedPerson.name)}
                alt={`${selectedPerson.name} full size`}
                className="max-h-[84vh] w-auto max-w-full rounded-xl object-contain"
              />
              <p className="text-center text-sm text-slate-200">{selectedPerson.name}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        .org-section .org-title,
        .org-section .org-badge,
        .org-section .org-panel {
          animation: org-fade-up 700ms ease-out both;
        }

        .org-section .org-panel {
          animation-delay: 80ms;
        }

        .org-section .org-title {
          animation-delay: 40ms;
        }

        .org-section .org-badge {
          animation-delay: 0ms;
        }

        .org-section .org-node {
          animation: org-fade-up 600ms ease-out both;
          transform-origin: center top;
        }

        .org-section .org-node-main {
          animation-duration: 700ms;
        }

        .org-section .org-line {
          animation: org-scale-y 700ms ease-out both;
          transform-origin: top center;
        }

        .org-section .org-card {
          transition-property: transform, box-shadow, border-color;
        }

        .org-section .org-card:hover {
          transform: translateY(-2px);
        }

        .org-section .org-trigger:focus-visible .org-card {
          border-color: rgb(147 197 253);
          box-shadow: 0 18px 34px -18px rgba(15, 23, 42, 0.45), 0 0 0 2px rgba(96, 165, 250, 0.3);
        }

        @keyframes org-fade-up {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes org-scale-y {
          from {
            opacity: 0;
            transform: scaleY(0.6);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
}
