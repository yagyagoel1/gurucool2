import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const astrologerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isTopAstrologer: {
        type: Boolean,
        default: false,
    },
    toggleAstrologer: {
        type: Boolean,
        default: false
    },
    token:{
        type: String,
    },
    }
    , { timestamps: true });

astrologerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
astrologerSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
astrologerSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.ASTRO_JWT_SECRET, {
        expiresIn: process.env.ASTRO_JWT_EXPIRY,
    });
}
export const Astrologer = mongoose.model("Astrologer", astrologerSchema);
