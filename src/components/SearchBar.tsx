import "./SearchBar.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onTypeChange: (type: string) => void;
  types: string[];
  selectedType: string;
  statuses: string[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onTypeChange,
  types,
  selectedType,
  statuses,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="search-bar">
      <div className="search-group">
        <label htmlFor="search">Rechercher :</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="type">Type :</label>
        <select
          id="type"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">Tous</option>
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status">Statut :</label>
        <select
          id="status"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Tous</option>
          {statuses.map(s => (
            <option key={s} value={s}>{s === "open" ? "Ouverte" :
                                       s === "in_progress" ? "En cours d'examen" :
                                       s === "closed" ? "Fermée" :
                                       s === "resolved" ? "Résolue" :
                                       s}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort">Trier par :</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="date-asc">Ancienneté</option>
          <option value="date-desc">Récence</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;