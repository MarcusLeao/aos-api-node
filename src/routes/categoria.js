import { Router } from "express";
import Categoria from "../models/categoria.js";

const router = Router();

router.get("/", async (req, res) => {
	const { id } = req.query;

	if (id) {
		try {
			const categoria = await Categoria.findByPk(id);

			if (!categoria) {
				return res.status(404).json({ error: "Categoria não encontrada" });
			}

			res.status(200).json(categoria);
		} catch (error) {
			res.status(500).json({ error: "Erro ao obter a categoria" });
		}
	} else {
		try {
			const categorias = await Categoria.findAll();

			res.status(200).json(categorias);
		} catch (error) {
			res.status(500).json({ error: "Erro ao obter os álbuns" });
		}
	}
});

router.post("/", async (req, res) => {
	try {
		const { name } = req.body;

		const categoria = await Categoria.create({ name });

		res.status(201).json(categoria);
	} catch (error) {
		res.status(500).json({ error: error.message ?? "Erro ao criar o álbum" });
	}
});

router.put("/", async (req, res) => {
	try {
		const { id } = req.query;
		const { name } = req.body;

		const categoria = await Categoria.findByPk(id);

		if (!categoria) {
			return res.status(404).json({ error: "Categoria não encontrada" });
		}

		categoria.name = name ?? categoria.name;

		await categoria.save();

		res.status(200).json(categoria);
	} catch (error) {
		res.status(500).json({ error: error.message ?? "Erro ao atualizar a categoria" });
	}
});

router.delete("/", async (req, res) => {
	try {
		const { id } = req.query;

		const categoria = await Categoria.findByPk(id);

		if (!categoria) {
			return res.status(404).json({ error: "Categoria não encontrada" });
		}

		await categoria.destroy();

		res.status(200).json({ message: "Categoria excluída com sucesso" });
	} catch (error) {
		res.status(500).json({ error: "Erro ao excluir a Categoria" });
	}
});

export default router;
