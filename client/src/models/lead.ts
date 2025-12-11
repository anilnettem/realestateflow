export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "lost"
  | "closed";

export interface Lead {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  location?: string;
  budget?: number | null;
  status: LeadStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateLeadPayload {
  name: string;
  phone?: string;
  email?: string;
  location?: string;
  budget?: number | null;
  status?: LeadStatus;
  notes?: string | null;
}
