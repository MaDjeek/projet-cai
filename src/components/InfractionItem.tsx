import React from 'react';
import { Infraction } from '../types/Infraction';
import './InfractionItem.css';

interface InfractionItemProps {
  infraction: Infraction;
  onDelete?: (id: number) => void;
  onEdit?: (infraction: Infraction) => void;
}

const InfractionItem: React.FC<InfractionItemProps> = ({ infraction, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'infraction "${infraction.description}" ?`)) {
      onDelete?.(infraction.id);
    }
  };

  const handleEdit = () => {
    onEdit?.(infraction);
  };

  const handleToggleComments = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="infraction-item">
      <div className="item-actions">
        {onEdit && (
          <button className="btn-edit" onClick={handleEdit} title="Modifier">
            ✏️
          </button>
        )}
        {onDelete && (
          <button className="btn-delete" onClick={handleDelete} title="Supprimer">
            ×
          </button>
        )}
      </div>

      <div className="infraction-content" onClick={handleToggleComments}>
        <div className="infraction-info">
          <h3>{infraction.type}</h3>
          <p className="description">{infraction.description}</p>
          <p className="date">Date : {infraction.date}</p>
          <p className="lieu">Lieu : {infraction.location}</p>
        </div>

        <div className="status-pill">
          {infraction.status === 'open' ? (
            <span className="badge open">Ouverte</span>
          ) : infraction.status === 'closed' ? (
            <span className="badge closed">Fermée</span>
          ) : infraction.status === 'in_progress' ? (
            <span className="badge in_progress">En cours d'examen</span>
          ) : infraction.status === 'resolved' ? (
            <span className="badge resolved">Résolue</span>
          ) : (
            <span className="badge unknown">Inconnu</span>
          )}
        </div>
      </div>

      {isExpanded && infraction.comments && infraction.comments.length > 0 && (
        <div className="comments-section">
          <h4>Commentaires :</h4>
          <ul>
            {infraction.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfractionItem;