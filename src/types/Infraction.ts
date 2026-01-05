export type InfractionStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Infraction {
  id: number;
  type: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  status: InfractionStatus;
  reporterId: number | null;
  comments?: string[];
}