import "dotenv/config";
import express from "express";
import cors from "cors";

import sequelize from "./config/db.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/categorias", routes.categoria);
app.use("/filmes", routes.filme);
app.use("/avaliacoes", routes.avaliacao);

app.get("/", (req, res) => {
	return res.send("Received a GET HTTP method");
});

app.post("/", (req, res) => {
	return res.send("Received a POST HTTP method");
});

app.put("/", (req, res) => {
	return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
	return res.send("Received a DELETE HTTP method");
});

const PORT = process.env.PORT || 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
	app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
});
