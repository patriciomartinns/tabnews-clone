export default function IndexPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Filipe faz um vídeo retrô lembrando os velhos tempos.
      </h1>
      <p style={styles.description}>
        Camisa <strong>branca</strong> e fundo <strong>branco</strong> hahhahah
        ❤️
      </p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "sans-serif",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: "16px",
  },
};
