"use client";

import React, { useState, useEffect } from "react";
import { Infraction } from "@/types/Infraction";
import { mockInfractions } from "@/data/mockInfractions";
import "./reportPage.css";
import { se } from "date-fns/locale";
import AddInfractionForm from "@/components/AddInfractionForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "infractions_data";

function ReportPage() {
  const [infractions, setInfractions] = useState<Infraction[]>([]);
  const [nextId, setNextId] = useState<number>(1);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedInfractions = JSON.parse(stored);
        setInfractions(parsedInfractions);
        const maxId = parsedInfractions.length > 0 
          ? Math.max(...parsedInfractions.map((i: Infraction) => i.id))
          : 0;
        setNextId(maxId + 1);
      } catch (error) {
        console.error("Error loading infractions from localStorage:", error);
        setInfractions(mockInfractions);
        setNextId(mockInfractions.length + 1);
      }
    } else {
      setInfractions(mockInfractions);
      setNextId(mockInfractions.length + 1);
    }
  }, []);

  const handleAddInfraction = (newInfraction: Omit<Infraction, "id" | "status">) => {
    const infractionWithId: Infraction = {
      ...newInfraction,
      id: nextId,
      status: "open", // Statut par défaut pour une nouvelle infraction
    };

    const updatedInfractions = [...infractions, infractionWithId];
    setInfractions(updatedInfractions);
    setNextId(nextId + 1);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInfractions));

    setTimeout(() => {
      alert("Infraction signalée avec succès !");
    }, 1000);

    // Après l'ajout, rediriger vers la page des infractions
    if (isAuthenticated) {
      router.push("/infractions");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="Report">
      <AddInfractionForm onAddInfraction={handleAddInfraction} onCancel={() => router.push("/")} />
    </div>
  );
}

export default ReportPage;