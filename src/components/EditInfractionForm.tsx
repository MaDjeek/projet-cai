import React, { useState } from "react";
import { Infraction } from "../types/Infraction";
import "./EditInfractionForm.css";

interface EditInfractionFormProps {
  infraction: Infraction;
  onUpdateInfraction: (infraction: Infraction) => void;
  onCancel: () => void;
}

const EditInfractionForm: React.FC<EditInfractionFormProps> = ({ infraction, onUpdateInfraction, onCancel }) => {
  const [type, setType] = useState<string>(infraction.type);
  const [description, setDescription] = useState<string>(infraction.description);
  const [date, setDate] = useState<string>(infraction.date);
  const [time, setTime] = useState<string>(infraction.time || "");
  const [location, setLocation] = useState<string>(infraction.location);
  const [status, setStatus] = useState<"open" | "in_progress" | "resolved" | "closed">(infraction.status as "open" | "in_progress" | "resolved" | "closed");
  const [comments, setComments] = useState<string[]>(infraction.comments || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!type.trim() || !description.trim() || !date.trim() || !location.trim() || !status.trim()) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const updatedInfraction: Infraction = {
      ...infraction,
      type: type.trim(),
      description: description.trim(),
      date: date.trim(),
      time: time.trim(),
      location: location.trim(),
      status: status as "open" | "in_progress" | "resolved" | "closed",
      comments
    };

    onUpdateInfraction(updatedInfraction);
  };

  return (
    <div className="edit-infraction-overlay" onClick={onCancel}>
      <div className="edit-infraction-modal" onClick={(e) => e.stopPropagation()}>
        <form className="edit-infraction-form" onSubmit={handleSubmit}>
          <h2>Modifier l'infraction</h2>

          <div className="form-group">
            <label htmlFor="edit-type">Type d'infraction* :</label>
            <input
              type="text"
              id="edit-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Ex: Vol, Vandalisme"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description* :</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez l'infraction en détail"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-date">Date* :</label>
            <input
              type="date"
              id="edit-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-time">Heure :</label>
            <input
              type="time"
              id="edit-time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-location">Lieu* :</label>
            <input
              type="text"
              id="edit-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Paris, Lyon"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-status">Statut* :</label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as "open" | "in_progress" | "resolved" | "closed")}
              required
            >
              <option value="">Sélectionnez un statut</option>
              <option value="in_progress">En cours d'examen</option>
              <option value="resolved">Résolue</option>
              <option value="open">Ouverte</option>
              <option value="closed">Fermée</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Annuler
            </button>
            <button type="submit" className="btn-save">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfractionForm;