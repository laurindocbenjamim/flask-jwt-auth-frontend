import React from 'react';
import { Briefcase, Code, User, ExternalLink, Calendar, Mail, Shield, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthStatus } from '../types';

const PortfolioLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h1>
      <p className="mt-4 text-xl text-gray-500">Laurindo C. Benjamim</p>
    </div>
    {children}
  </div>
);

export const About: React.FC = () => {
  const { user, status } = useAuth();

  return (
    <PortfolioLayout title="About Me">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-3xl mx-auto">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {status === AuthStatus.AUTHENTICATED && user ? user.username : "Software Engineer"}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {status === AuthStatus.AUTHENTICATED && user ? `Logged in as ${user.role || 'User'}` : "Passionate about building scalable web applications."}
              </p>
            </div>
          </div>
          {status === AuthStatus.AUTHENTICATED && user && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              <UserCheck className="h-3 w-3 mr-1" /> Active Session
            </span>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {/* Standard Portfolio Info */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {status === AuthStatus.AUTHENTICATED && user ? `${user.firstname || ''} ${user.lastname || ''}`.trim() || user.username : "Laurindo C. Benjamim"}
              </dd>
            </div>

            {/* User Specific Data (Visible when logged in) */}
            {status === AuthStatus.AUTHENTICATED && user && (
              <>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-indigo-50/30">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">
                    {user.email || <span className="text-red-400 italic">Email not provided</span>}
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-indigo-50/30">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Shield className="h-4 w-4 mr-2" /> Permissions
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user.is_administrator ? "Administrator Access" : "Standard User"}
                    {user.role && <span className="ml-2 text-gray-400">({user.role})</span>}
                  </dd>
                </div>
                {user.id && (
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-indigo-50/30">
                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.id}</dd>
                  </div>
                )}
              </>
            )}

            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Specialization</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Backend Development (Python/Flask), Frontend (React)</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {status === AuthStatus.AUTHENTICATED && user?.country ? user.country : "Portugal"}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                A dedicated developer with a strong foundation in computer science principles. Experienced in creating robust REST APIs and responsive user interfaces. Always learning new technologies and best practices.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </PortfolioLayout>
  );
};

export const Projects: React.FC = () => {
  // Mock data based on README context
  const projects = [
    {
      title: "Flask JWT Auth Starter",
      description: "A comprehensive backend starter kit with JWT authentication, role-based access control, and email integration.",
      tech: ["Python", "Flask", "PostgreSQL", "Docker"],
      link: "#"
    },
    {
      title: "E-commerce API",
      description: "Scalable RESTful API for an online store, handling inventory, orders, and payment processing.",
      tech: ["Node.js", "Express", "MongoDB"],
      link: "#"
    },
    {
      title: "React Dashboard",
      description: "Modern analytics dashboard with real-time data visualization using Recharts and Tailwind CSS.",
      tech: ["React", "TypeScript", "Tailwind"],
      link: "#"
    }
  ];

  return (
    <PortfolioLayout title="Projects">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="px-4 py-5 sm:p-6 flex-grow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Code className="h-6 w-6 text-indigo-600" />
                </div>
                <a href={project.link} className="text-gray-400 hover:text-gray-600">
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PortfolioLayout>
  );
};

export const Experiences: React.FC = () => {
  const jobs = [
    {
      role: "Senior Backend Developer",
      company: "Tech Solutions Inc.",
      period: "2021 - Present",
      description: "Leading the backend team in migrating legacy monoliths to microservices architecture. Improved API response times by 40%."
    },
    {
      role: "Full Stack Developer",
      company: "WebCrafters Studio",
      period: "2018 - 2021",
      description: "Developed and maintained multiple client websites using Django and React. Implemented CI/CD pipelines to streamline deployment."
    }
  ];

  return (
    <PortfolioLayout title="Experience">
      <div className="max-w-3xl mx-auto flow-root">
        <ul className="-mb-8">
          {jobs.map((job, idx) => (
            <li key={idx}>
              <div className="relative pb-8">
                {idx !== jobs.length - 1 ? (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                      <Briefcase className="h-4 w-4 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{job.role} <span className="text-indigo-600">@ {job.company}</span></h3>
                      <p className="text-sm text-gray-500 mt-1">{job.description}</p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {job.period}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PortfolioLayout>
  );
};
