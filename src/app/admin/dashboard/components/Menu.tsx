import React from 'react';
import { Home, BarChart2, BookOpen, Users, Database, FileText, Layers, MessageCircle, Library, Settings, LifeBuoy, Search } from "lucide-react";

const menuSections = [
  {
    title: "Home",
    items: [
      { key: "Dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
      { key: "Lifecycle", label: "Lifecycle", icon: <BarChart2 className="w-5 h-5" /> },
      { key: "Analytics", label: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
      { key: "Projects", label: "Projects", icon: <BookOpen className="w-5 h-5" /> },
      { key: "Team", label: "Team", icon: <Users className="w-5 h-5" /> },
    ]
  },
  {
    title: "Documents",
    items: [
      { key: "DataLibrary", label: "Data Library", icon: <Database className="w-5 h-5" /> },
      { key: "Reports", label: "Reports", icon: <FileText className="w-5 h-5" /> },
      { key: "WordAssistant", label: "Word Assistant", icon: <MessageCircle className="w-5 h-5" /> },
      { key: "More", label: "More", icon: <Library className="w-5 h-5" /> },
    ]
  }
];

export default function Menu({ selected, onSelect }: { selected: string, onSelect: (key: string) => void }) {
  return (
    <nav className="w-64 h-full flex flex-col p-4 text-sidebar-foreground bg-[#18181b] border-r border-[#23232b] divide-y divide-[#23232b]">
      {menuSections.map((section, idx) => (
        <div key={section.title} className={idx !== 0 ? "pt-6" : ""}>
          <div className="font-bold mb-2 text-xs uppercase tracking-widest text-[#a1a1aa]">{section.title}</div>
          <ul className="space-y-1">
            {section.items.map(opt => (
              <li key={opt.key}>
                <button
                  className={`w-full flex items-center gap-3 text-left px-2 py-2 rounded-lg hover:bg-[#23232b] transition-colors ${selected === opt.key ? 'bg-[#23232b] font-semibold text-white' : 'text-[#e4e4e7]'}`}
                  onClick={() => onSelect(opt.key)}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
} 