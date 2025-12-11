import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../lib/api';

export type Lead = {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  status?: string;
  createdAt?: string;
};

type State = { items: Lead[]; loading: boolean; error?: string | null };

const initialState: State = { items: [], loading: false, error: null };

export const fetchLeads = createAsyncThunk('leads/fetch', async () => {
  const res = await api.get<Lead[]>('/leads');
  return res.data;
});

export const createLead = createAsyncThunk('leads/create', async (payload: Partial<Lead>) => {
  const res = await api.post<Lead>('/leads', payload);
  return res.data;
});

const slice = createSlice({
  name: 'leads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchLeads.fulfilled, (s, a) => { s.items = a.payload; s.loading = false; })
      .addCase(fetchLeads.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(createLead.fulfilled, (s, a) => {
        s.items.unshift(a.payload);
      });
  },
});

export default slice.reducer;
