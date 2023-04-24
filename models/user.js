const { Schema, model } = require("mongoose");
const Joi = require("joi");
var validator = require("validator");

const { handleMongooseError } = require("../utils");

const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name mast be exist"],
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      unique: true,
      required: [true, "email mast be exist"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "password mast be exist, min-length 6"],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .custom((v, helpers) => {
      if (!validator.isEmail(v)) {
        return helpers.error("any.invalid");
      }
      return v;
    })
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .custom((v, helpers) => {
      if (!validator.isEmail(v)) {
        return helpers.error("email invalid");
      }
      return v;
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const userSchemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  userSchemas,
};
