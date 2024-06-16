import { Schema } from "mongoose";

const userSchema =  new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
    },
    token:{
        type: String,
    },    
    },{timestamps: true});

    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
          next();
        }
        this.password = await bcrypt.hash(this.password, 12);
        next();
      });
    userSchema.methods.generateToken = function () {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.USER_JWT_EXPIRY,
        });
      }
      userSchema.methods.checkPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
      }

  export   const User  = mongoose.model("User", userSchema);