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

