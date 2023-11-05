import { Router } from "express";

import Filme from "../models/filme.js";
import Categoria from "../models/categoria.js";

const router = Router();

router.get("/", async (req, res) => {
	const { id } = req.query;

	if (id) {
		try {
			const filme = await Filme.findByPk(id);

			if (!filme) {
				return res.status(404).json({ error: "Filme não encontrado" });
			}

			res.status(200).json(filme);
		} catch (error) {
			res.status(500).json({ error: "Erro ao obter o filme" });
		}
	} else {
		try {
			const filmes = await Filme.findAll();

			res.status(200).json(filmes);
		} catch (error) {
			res.status(500).json({ error: "Erro ao obter os filmes" });
		}
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, duration, release_year, categoria_id } = req.body;

		const categoria = await Categoria.findByPk(categoria_id);

		if (!categoria) {
			return res.status(404).json({ error: "Categoria não encontrada" });
		}

		const filme = await Filme.create({ name, duration, release_year, categoria_id });

		res.status(201).json(filme);
	} catch (error) {
		res.status(500).json({ error: error.message ?? "Erro ao criar o filme" });
	}
});

router.put("/", async (req, res) => {
	try {
		const { id } = req.query;
		const { name, duration, release_year } = req.body;

		const filme = await Filme.findByPk(id);

		if (!filme) {
			return res.status(404).json({ error: "Filme não encontrado" });
		}

		filme.name = name ?? filme.name;
		filme.duration = duration ?? filme.duration;
		filme.release_year = release_year ?? filme.release_year;

		await filme.save();

		res.status(200).json(filme);
	} catch (error) {
		res.status(500).json({ error: error.message ?? "Erro ao atualizar o filme" });
	}
});

router.delete("/", async (req, res) => {
	try {
		const { id } = req.query;

		const filme = await Filme.findByPk(id);

		if (!filme) {
			return res.status(404).json({ error: "Filme não encontrado" });
		}

		await filme.destroy();

		res.status(200).json({ message: "Filme excluído com sucesso" });
	} catch (error) {
		res.status(500).json({ error: "Erro ao excluir o filme" });
	}
});

export default router;
