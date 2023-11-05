import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { isAfter, isBefore, isDate } from "date-fns";

import Categoria from "./categoria.js";

const Filme = sequelize.define("Filme", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	duration: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	release_year: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			isValidYear(value) {
				const releaseYear = new Date(value, null);
				if (
					!isDate(releaseYear) ||
					isBefore(releaseYear, new Date(1955, null)) ||
					isAfter(releaseYear, Date.now())
				) {
					throw new Error(
						"O ano de lançamento deve ser válido e não pode ser posterior ao ano atual ou anterior a 1955"
					);
				}
			},
		},
	},
});

Filme.belongsTo(Categoria, { foreignKey: "categoria_id", onDelete: "CASCADE" });

export default Filme;
