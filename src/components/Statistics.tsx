import React from 'react';
import { Infraction } from '../types/Infraction';
import './Statistics.css';

interface StatisticsProps {
  infractions: Infraction[];
}

const Statistics: React.FC<StatisticsProps> = ({ infractions }) => {
  const totalInfractions = infractions.length;
  const openCount = infractions.filter(i => i.status === 'open').length;
  const inProgressCount = infractions.filter(i => i.status === 'in_progress').length;
  const closedCount = infractions.filter(i => i.status === 'closed').length;
  const resolvedCount = infractions.filter(i => i.status === 'resolved').length;

  return (
    <div className="statistics">
      <h2>Statistiques</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Infractions</span>
          <span className="stat-value">{totalInfractions}</span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Ouvertes</span>
          <span className="stat-value">{openCount}</span>
        </div>

        <div className="stat-card in_progress">
          <span className="stat-label">En cours d'examen</span>
          <span className="stat-value">{inProgressCount}</span>
        </div>

        <div className="stat-card resolved">
          <span className="stat-label">Résolues</span>
          <span className="stat-value">{resolvedCount}</span>
        </div>

        <div className="stat-card closed">
          <span className="stat-label">Fermées</span>
          <span className="stat-value">{closedCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;