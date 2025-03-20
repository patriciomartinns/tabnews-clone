export default async function status(_, response) {
  response.status(200).json({ status: "ok" });
}
