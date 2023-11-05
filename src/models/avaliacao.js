import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { isAfter, isBefore, isDate } from "date-fns";

import Categoria from "./categoria.js";
import Filme from "./filme.js";

const Avaliacao = sequelize.define("Avaliacao", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	score: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 0,
			max: 10,
		},
	},
	commentary: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	date: {
		type: DataTypes.DATEONLY,
		allowNull: false,
		validate: {
			isDate: true,
			isValidDate(value) {
				const date = new Date(value);
				if (!isDate(date) || isBefore(date, new Date("1955-11-12")) || isAfter(date, Date.now())) {
					throw new Error(
						"Data de avaliação deve ser válida e não pode ser posterior à data de hoje ou anterior ao dia 12 de Novembro de 1955"
					);
				}
			},
		},
	},
});

Avaliacao.belongsTo(Filme, { foreignKey: "filme_id", onDelete: "CASCADE" });

export default Avaliacao;
