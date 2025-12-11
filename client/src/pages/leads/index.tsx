// client/src/pages/leads/index.tsx
import { useEffect, useState } from "react";
import Head from "next/head";
import { getLeads } from "../../lib/api";
import { ApiError } from "../../lib/errors";
import type { Lead } from "../../models/lead";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getLeads();
        if (!mounted) return;
        setLeads(data);
      } catch (err) {
        if (!mounted) return;
        if (err instanceof ApiError) {
          setError(err.message || `API error (${err.status})`);
        } else {
          setError((err as Error).message || "Unknown error");
        }
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Leads • RealEstateFlow</title>
      </Head>

      <main style={{ padding: 20 }}>
        <h1>Leads</h1>

        {loading && <div>Loading leads…</div>}

        {!loading && error && <div style={{ color: "red" }}>Error: {error}</div>}

        {!loading && !error && (
          <>
            {leads && leads.length === 0 ? (
              <div>No leads yet.</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Budget</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads?.map((l) => (
                    <tr key={l.id}>
                      <td>{l.name ?? "-"}</td>
                      <td>{l.phone ?? "-"}</td>
                      <td>{l.location ?? "-"}</td>
                      <td>{l.budget ?? "-"}</td>
                      <td>{l.status ?? "new"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </main>
    </>
  );
}
