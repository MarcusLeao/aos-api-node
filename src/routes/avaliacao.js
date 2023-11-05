import { Router } from "express";

import Avaliacao from "../models/avaliacao.js";
import Filme from "../models/filme.js";

const router = Router();

router.get("/", async (req, res) => {
	const { id } = req.query;

	if (id) {
		try {
			const avaliacao = await Avaliacao.findByPk(id);

			if (!avaliacao) {
				return res.status(404).json({ error: "Avaliação não encontrada" });
			}

			res.status(200).json(avaliacao);
		} catch (error) {
			res.status(500).json({ error: "Erro ao obter a avaliação" });
		}
	} else {
		try {
			const avaliacoes = await Avaliacao.findAll();

			res.status(200).json(avaliacoes);
		} catch (error) {
			res.status(500).json({ error: "Erro ao obter as avaliações" });
		}
	}
});

router.post("/", async (req, res) => {
	try {
		const { score, commentary, date, filme_id } = req.body;

		if (!filme_id) {
			res.status(400).json({ error: "Avaliação deve referir-se a um filme" });
		} else {
			const filme = await Filme.findByPk(filme_id);

			if (!filme) {
				return res.status(404).json({ error: "Filme não encontrado" });
			}

			const avaliação = await Avaliacao.create({ score, commentary, date, filme_id });
			res.status(201).json(avaliação);
		}
	} catch (error) {
		res.status(500).json({ error: error.message ?? "Erro ao criar a avaliação" });
	}
});

router.put("/", async (req, res) => {
	try {
		const { id } = req.query;
		const { score, commentary, date } = req.body;

		const avaliacao = await Avaliacao.findByPk(id);

		if (!avaliacao) {
			return res.status(404).json({ error: "Avaliação não encontrada" });
		}

		avaliacao.score = score ?? avaliacao.score;
		avaliacao.commentary = commentary ?? avaliacao.commentary;
		avaliacao.date = date ?? avaliacao.date;

		await avaliacao.save();

		res.status(200).json(avaliacao);
	} catch (error) {
		res.status(500).json({ error: error.message ?? "Erro ao atualizar a avaliação" });
	}
});

router.delete("/", async (req, res) => {
	try {
		const { id } = req.query;

		const avaliacao = await Avaliacao.findByPk(id);

		if (!avaliacao) {
			return res.status(404).json({ error: "Avaliação não encontrada" });
		}

		await avaliacao.destroy();

		res.status(200).json({ message: "Avaliação excluída com sucesso" });
	} catch (error) {
		res.status(500).json({ error: "Erro ao excluir a avaliação" });
	}
});

export default router;
