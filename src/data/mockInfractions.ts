import { Infraction } from '../types/Infraction';

export const mockInfractions: Infraction[] = [
  {
    id: 1,
    type: "Vol",
    description: "Vol à l'étalage dans un magasin de vêtements.",
    date: "2024-01-15",
    time: "14:30",
    location: "123 Rue de la Mode, Paris",
    status: "resolved",
    reporterId: 101,
    comments: [
      "L'incident a été résolu rapidement.",
      "Le suspect a été appréhendé par la police."
    ],
  },
  {
    id: 2,
    type: "Vandalisme",
    description: "Graffiti sur le mur d'un bâtiment public.",
    date: "2024-02-20",
    location: "45 Avenue des Arts, Lyon",
    status: "in_progress",
    reporterId: 102,
  },
  {
    id: 3,
    type: "Agression",
    description: "Agression verbale dans un parc.",
    date: "2024-03-05",
    time: "18:00",
    location: "Parc Central, Marseille",
    status: "open",
    reporterId: null,
  },
  {
    id: 4,
    type: "Conduite en état d'ivresse",
    description: "Conduite dangereuse sous l'influence de l'alcool.",
    date: "2024-04-10",
    time: "22:15",
    location: "Boulevard de la République, Toulouse",
    status: "closed",
    reporterId: 3,
    comments: [
      "Le conducteur a été intercepté par la police.",
      "Le véhicule a été immobilisé."
    ],
  },
];