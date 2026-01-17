const validator = require("validator");

const validateSignUpData = (req) => {
  const { name, age, email, gender, password } = req.body;

  if (!name) {
    throw new Error("Name is required");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong : " + password);
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email format : " + email);
  }
};

const validateEditProfileData = (req) => {
  const { name, email } = req.body;

  if (name && name.length === 0) {
    throw new Error("Name cannot be empty");
  }
  if (email && !validator.isEmail(email)) {
    throw new Error("Invalid email format : " + email);
  }

  const allowedEditFields = [
    "name",
 
    "email"
    
  ];
  const providedFields = Object.keys(req.body || {});

  if (providedFields.length === 0) {
    throw new Error("No fields provided to update");
  }

  const invalidFields = providedFields.filter(
    (field) => !allowedEditFields.includes(field)
  );

  if (invalidFields.length > 0) {
    throw new Error(
      "Invalid fields in edit profile data: " + invalidFields.join(", ")
    );
  }
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
// const connectDB = async () => {
// //   try {
//     await mongoose.connect(
//         "mongodb+srv://kamalakargpt_db_user:
