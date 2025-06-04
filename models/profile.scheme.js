const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const ProfileScheme = new Scheme({
    name: { type: String, trim: true, uppercase: true },
    description: { type: String, trim: true, uppercase: true },
    permissions	: [{
		module: { type: String, trim : true, uppercase : true },
		moduleId: { type: Number, default: 0 },
		isSelected: { type: Boolean, default: false },
		privileges: [{
			name: { type : String, trim: true },
			method: { type : String, trim: true },
			active: { type : Boolean, default: false }
		}]
	}]
}, { timestamps: true });

module.exports = mongoose.model("Profiles", ProfileScheme);