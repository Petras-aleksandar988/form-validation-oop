import { Validator } from "./validator.mjs";

const config = {
  "first_last": {
    required: true,
    minLength: 5,
    maxLength: 40,
  },
  "user_name": {
    required: true,
    minLength: 5,
    maxLength: 40,
  },
  "email": {
    required: true,
    minLength: 5,
    maxLength: 40,
    email: true,
  },
  "phone_number": {
    minLength: 5,
    maxLength: 40,
  },
  "password": {
    required: true,
    minLength: 7,
    maxLength: 40,
    matching: "repet_password",
  },
  "repet_password": {
    required: true,
    minLength: 7,
    maxLength: 40,
    matching: "password",
  },
};

let validator = new Validator(config);

