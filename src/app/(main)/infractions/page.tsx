"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Infraction } from "@/types/Infraction";
import { mockInfractions } from "@/data/mockInfractions";
import SearchBar from "@/components/SearchBar";
import "./infractionsPage.css";
import { se } from "date-fns/locale";
import Statistics from "@/components/Statistics";
import InfractionItem from "@/components/InfractionItem";
import EditInfractionForm from "@/components/EditInfractionForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "infractions_data";

function InfractionsPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [infractions, setInfractions] = useState<Infraction[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingInfraction, setEditingInfraction] = useState<Infraction | null>(null);

  const INFRACTIONS_PER_PAGE = 10;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedInfractions = JSON.parse(stored);
        setInfractions(parsedInfractions);
      } catch (error) {
        console.error("Error loading infractions from localStorage:", error);
        setInfractions(mockInfractions);
      }
    } else {
      setInfractions(mockInfractions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockInfractions));
    }
  }, []);

  useEffect(() => {
    if (infractions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(infractions));
    }
  }, [infractions]);

  //Extraire les types uniques
  const types = useMemo(() => {
    const ts = infractions.map((i) => i.type);
    return Array.from(new Set(ts));
  }, [infractions]);

  // Filter infractions based on user role
  const visibleInfractions = useMemo(() => {
    if (!user) return [];
    
    // Admin and officer can see all infractions
    if (user.role === 'admin' || user.role === 'officer') {
      return infractions;
    }
    
    // Regular users can only see their own reports
    return infractions.filter(infraction => 
      infraction.reporterId === Number(user.id)
    );
  }, [infractions, user]);

  // Check if user can edit/delete (admin or officer only)
  const canModify = user?.role === 'admin' || user?.role === 'officer';

  //Extraire les statuts uniques
  const statuses = useMemo(() => {
    const ss = visibleInfractions.map((i) => i.status);
    return Array.from(new Set(ss));
  }, [visibleInfractions]);

  // Filtrer et trier les infractions
  const filteredAndSortedInfractions = useMemo(() => {
    let data = visibleInfractions.filter((infraction) => {
      const matchesSearch = infraction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "" || infraction.type === selectedType;
      const matchesStatus = selectedStatus === "" || infraction.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });

    // Appliquer le tri
    data.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });

    return data;
  }, [visibleInfractions, searchTerm, selectedType, selectedStatus, sortBy]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedInfractions.length / INFRACTIONS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * INFRACTIONS_PER_PAGE;
  const endIndex = startIndex + INFRACTIONS_PER_PAGE;
  const currentInfractions = filteredAndSortedInfractions.slice(
    startIndex,
    endIndex
  );

  // Réinitialiser à la page 1 quand les filtres changent
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedStatus, sortBy]);

  const handleAddInfraction = (newInfraction: Infraction) => {
    setInfractions([...infractions, newInfraction]);
  };

  const handleDeleteInfraction = (id: number) => {
    setInfractions(infractions.filter((i) => i.id !== id));
  };

  const handleUpdateInfraction = (updatedInfraction: Infraction) => {
    setInfractions(infractions.map((i) =>
      i.id === updatedInfraction.id ? updatedInfraction : i
    ));
    setEditingInfraction(null);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedStatus("");
    setSortBy("date-desc");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading or redirect message while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div className="Infractions">
        <p>Redirection en cours...</p>
      </div>
    );
  }

  return (
    <div className="Infractions">
      <header className="infractions-header">
        <h1>Gestion des Infractions</h1>
      </header>

      <Statistics infractions={visibleInfractions} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        types={types}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        statuses={statuses}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="filter-actions">
        <button
          className="btn-reset-filters"
          onClick={handleResetFilters}
        >
          Réinitialiser les filtres
        </button>
      </div>

      <div className="stats">
        <p>Infractions affichées : {currentInfractions.length}</p>
      </div>

      <div className="infractions-list">
        {filteredAndSortedInfractions.length > 0 ? (
          currentInfractions.map((infraction) => (
            <InfractionItem
              key={infraction.id}
              infraction={infraction}
              onDelete={canModify ? handleDeleteInfraction : undefined}
              onEdit={canModify ? setEditingInfraction : undefined}
            />
          ))
        ) : (
          <p className="no-results">Aucune infraction ne correspond à votre recherche</p>
        )}
      </div>

      {filteredAndSortedInfractions.length > INFRACTIONS_PER_PAGE && (
        <div className="pagination">
          <button
            className="btn-page-prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="btn-page-next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}

      {editingInfraction && (
        <EditInfractionForm
          infraction={editingInfraction}
          onUpdateInfraction={handleUpdateInfraction}
          onCancel={() => setEditingInfraction(null)}
        />
      )}
    </div>
  );
}

export default InfractionsPage;
