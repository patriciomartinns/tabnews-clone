import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);

  return response.json();
}

const styles = {
  container: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  title: {
    fontWeight: 700,
    fontSize: "2rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
};

export default function StatusPage() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <p style={styles.container}>Carregando...</p>;
  }

  const updatedAt = new Date(data.dependencies.updated_at).toLocaleString(
    "pt-BR",
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Status</h2>
        <p>Ultima atualização {updatedAt}</p>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Database</h2>
        <p>Versão: {data.dependencies.database.version}</p>
        <p>Conexões máximas: {data.dependencies.database.max_connections}</p>
        <p>Conexões em uso: {data.dependencies.database.opened_connections}</p>
      </div>
    </div>
  );
}
