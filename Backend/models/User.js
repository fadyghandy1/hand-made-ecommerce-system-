const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            //this only work on Create and SAVE!!
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    phone: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
        default: "",
    },
    apartment: {
        type: String,
        default: "",
    },
    zip: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
});
userSchema.pre("save", async function (next) {
    //if password was modified
    if (!this.isModified("password")) return next();

    //hash password with cost 12
    this.password = await bcrypt.hash(this.password, 12);

    //we don't need it in DB just for validation purpose
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const restToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(restToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return restToken;
};
 
userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

userSchema.set("toJSON", {
    virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
