import React, { useState } from "react";
import { Infraction } from "../types/Infraction";
import { useAuth } from "../hooks/useAuth";
import "./AddInfractionForm.css";

interface AddInfractionFormProps {
  onAddInfraction: (infraction: Omit<Infraction, "id" | "status">) => void;
  onCancel: () => void;
}

const AddInfractionForm: React.FC<AddInfractionFormProps> = ({ onAddInfraction, onCancel }) => {
  const { isAuthenticated, user } = useAuth();
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(!isAuthenticated);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!type.trim() || !description.trim() || !date.trim() || !location.trim()) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const reporterId = isAuthenticated && !isAnonymous && user ? Number(user.id) : null;

    const newInfraction: Omit<Infraction, "id" | "status"> = {
      type: type.trim(),
      description: description.trim(),
      date: date.trim(),
      time: time.trim(),
      location: location.trim(),
      reporterId
    };

    onAddInfraction(newInfraction);
    setType("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setIsAnonymous(!isAuthenticated);
  };

  return (
    <form className="add-infraction-form" onSubmit={handleSubmit}>
        <h2>Signaler une nouvelle infraction</h2>

        <div className="form-group">
        <label htmlFor="add-type">Type d'infraction* :</label>
        <input
            type="text"
            id="add-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Ex: Vol, Vandalisme"
            required
        />
        </div>

        <div className="form-group">
        <label htmlFor="add-description">Description* :</label>
        <textarea
            id="add-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez l'infraction en détail"
            required
        />
        </div>

        <div className="form-group">
        <label htmlFor="add-date">Date* :</label>
        <input
            type="date"
            id="add-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
        />
        </div>

        <div className="form-group">
        <label htmlFor="add-time">Heure :</label>
        <input
            type="time"
            id="add-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
        />
        </div>

        <div className="form-group">
        <label htmlFor="add-location">Lieu* :</label>
        <input
            type="text"
            id="add-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Paris, Lyon"
            required
        />
        </div>

        {isAuthenticated && (
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              Signaler anonymement
            </label>
          </div>
        )}

        <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
            Annuler
        </button>
        <button type="submit" className="btn-save">
            Enregistrer
        </button>
        </div>
    </form>
  );
};

export default AddInfractionForm;