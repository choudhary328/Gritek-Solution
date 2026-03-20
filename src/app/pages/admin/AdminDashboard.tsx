import { FolderKanban, Briefcase, Mail, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
  });

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const [projectsRes, servicesRes, contactsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/services`),
          fetch(`${API_BASE_URL}/contacts`),
        ]);

        const [projects, services, contacts] = await Promise.all([
          projectsRes.json(),
          servicesRes.json(),
          contactsRes.json(),
        ]);

        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          services: Array.isArray(services) ? services.length : 0,
          messages: Array.isArray(contacts) ? contacts.length : 0,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      }
    };
    fetchCounters();
  }, []);

  const cards = [
    { title: 'Total Projects', value: stats.projects, icon: FolderKanban, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Total Services', value: stats.services, icon: Briefcase, color: 'text-[#b8ea27]', bg: 'bg-[#b8ea27]/10' },
    { title: 'New Messages', value: stats.messages, icon: Mail, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Engagement', value: '+12%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#21362e]">Dashboard Overview</h1>
        <p className="text-[#21362e]/60 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.bg}`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-[#21362e]">{card.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
