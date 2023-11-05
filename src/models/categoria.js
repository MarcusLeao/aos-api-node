import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Categoria = sequelize.define("Categoria", {
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
});

export default Categoria;
