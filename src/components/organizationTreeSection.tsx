import React from 'react';
import { Users2 } from 'lucide-react';

type OrgPerson = {
  name: string;
  role: string;
  accent?: string;
};

function OrgCard({ name, role, accent = 'from-slate-600 to-blue-700' }: OrgPerson) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="org-card group relative w-full max-w-[290px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_10px_26px_-16px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_34px_-18px_rgba(15,23,42,0.45)]">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="flex min-h-[102px] items-start gap-3 p-4 pt-5">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-sm font-bold text-white shadow-sm`}>
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-semibold text-slate-900 sm:text-[1.05rem]">{name}</h4>
          <p className="mt-0.5 line-clamp-3 text-sm leading-5 text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function OrganizationTreeSection() {
  const director: OrgPerson = {
    name: 'Dr. Laxmi Kanta Sharma',
    role: 'Director',
    accent: 'from-slate-700 to-blue-800',
  };

  const leadership: OrgPerson[] = [
    { name: 'Sodasi Ojha Regmi', role: 'Deputy Administrator', accent: 'from-blue-700 to-slate-700' },
    { name: 'Dr. Prakasah Gautam', role: 'NHEP Coordinator', accent: 'from-slate-700 to-blue-700' },
    { name: 'Balkrishna Subedi', role: 'IT Expert', accent: 'from-blue-700 to-cyan-700' },
    { name: 'Sujin Tripathi', role: 'Structural Engineering Expert', accent: 'from-sky-700 to-blue-700' },
  ];

  const sectionLead: OrgPerson = {
    name: 'Shobita Ghimire',
    role: 'Section Officer',
    accent: 'from-slate-700 to-blue-700',
  };

  const assistants: OrgPerson[] = [
    { name: 'Gita Gautam', role: 'Head Office Assistant' },
    { name: 'Mahendra Kr. Napit', role: 'Assistant Computer Operator' },
    { name: 'Sajita Shrestha', role: 'Technical Head Assistant' },
    { name: 'Surendra Bahadur Acharya', role: 'Head Office Assistant' },
  ];

  const helpers: OrgPerson[] = [
    { name: 'Saraswoti Bista', role: 'Office Helper', accent: 'from-sky-700 to-blue-700' },
    { name: 'Nirmala K.C.', role: 'Office Helper', accent: 'from-blue-700 to-slate-700' },
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
                  <OrgCard {...director} />
                </div>

                <div className="org-line h-10 w-[2px] bg-slate-300" />

                <div className="relative mb-10 w-[1180px]">
                  <div className="org-line absolute left-[70px] right-[70px] top-0 h-[2px] bg-slate-300" />
                  <div className="grid grid-cols-4 gap-10 pt-8">
                    {leadership.map((person, index) => (
                      <div key={person.name} className="org-node flex flex-col items-center" style={{ animationDelay: `${index * 90}ms` }}>
                        <div className="org-line mb-5 h-8 w-[2px] bg-slate-300" />
                        <OrgCard {...person} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="org-line h-9 w-[2px] bg-slate-300" />
                <div className="org-node org-node-main">
                  <OrgCard {...sectionLead} />
                </div>

                <div className="org-line h-10 w-[2px] bg-slate-300" />

                <div className="relative mb-10 w-[1180px]">
                  <div className="org-line absolute left-[70px] right-[70px] top-0 h-[2px] bg-slate-300" />
                  <div className="grid grid-cols-4 gap-10 pt-8">
                    {assistants.map((person, index) => (
                      <div key={person.name} className="org-node flex flex-col items-center" style={{ animationDelay: `${index * 90}ms` }}>
                        <div className="org-line mb-5 h-8 w-[2px] bg-slate-300" />
                        <OrgCard {...person} />
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
                        <OrgCard {...person} />
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
                  <OrgCard {...director} />
                </div>
              </div>

              <div>
                <span className={levelTagClass}>Core Team</span>
                <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {leadership.map((person, index) => (
                    <div key={person.name} className="org-node" style={{ animationDelay: `${index * 90}ms` }}>
                      <OrgCard {...person} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <span className={levelTagClass}>Section Office</span>
                <div className="org-node org-node-main">
                  <OrgCard {...sectionLead} />
                </div>
              </div>

              <div>
                <span className={levelTagClass}>Assistants</span>
                <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2">
                  {assistants.map((person, index) => (
                    <div key={person.name} className="org-node" style={{ animationDelay: `${index * 90}ms` }}>
                      <OrgCard {...person} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className={levelTagClass}>Office Helpers</span>
                <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2">
                  {helpers.map((person, index) => (
                    <div key={person.name} className="org-node" style={{ animationDelay: `${index * 90}ms` }}>
                      <OrgCard {...person} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
