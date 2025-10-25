import React from 'react';
import { Wifi, BookOpen, Server, BarChart3, Brain, Shield } from 'lucide-react';

export default function SummaryDashboard() {
  const topCards = [
    { 
      title: 'Connectivity', 
      icon: Wifi, 
      stat: '65%',
      desc: 'Broadband Coverage'
    },
    { 
      title: 'Learning Management', 
      icon: BookOpen, 
      stat: 'LMS',
      desc: 'Centralized LMS'
    },
    { 
      title: 'EMIS & Automation', 
      icon: Server, 
      stat: '6',
      desc: 'Core Systems'
    }
  ];

  const contentCards = [
    { 
      title: 'Digital Resources', 
      icon: BarChart3, 
      stat: '70%',
      desc: 'Interactive Materials'
    },
    { 
      title: 'Capacity Building', 
      icon: Brain, 
      stat: '60%',
      desc: 'Teaching Staff'
    },
    { 
      title: 'Policy & Guidelines', 
      icon: Shield, 
      stat: '2027',
      desc: 'Target Year'
    }
  ];

  const CardComponent = ({ card }) => {
    const Icon = card.icon;
    return (
      <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
        <Icon className="mb-4 text-gray-700" size={32} />
        <h3 className="font-bold text-lg text-gray-900 mb-3">{card.title}</h3>
        <div className="text-3xl font-bold text-gray-800 mb-1">{card.stat}</div>
        <p className="text-gray-600 text-sm">{card.desc}</p>
      </div>
    );
  };

  return (
    <div className=" bg-white p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tribhuvan University</h1>
        <p className="text-gray-600 text-lg">Digital Transformation 2023-2027</p>
      </div>

      {/* Top Cards Row */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCards.map((card, idx) => (
            <CardComponent key={idx} card={card} />
          ))}
        </div>
      </div>

      {/* Content Cards Row */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contentCards.map((card, idx) => (
            <CardComponent key={idx} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}