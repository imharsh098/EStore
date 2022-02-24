import { body, validationResult } from "express-validator";

function registrationRules() {
  return [
    body("name", "Enter full name").isString().notEmpty(),
    body("email", "Enter a valid email").notEmpty().isEmail(),
    body("password", "Password must contain atleast 6 characters").custom(
      (password, { req }) => {
        let pass = password.split("");
        const invalid = pass.some((char) => {
          return !/^[a-zA-Z0-9!@#$%^&*)(+=._-]*$/.test(char);
        });
        if (invalid) {
          throw new Error("Invalid character in password string");
        }
        // let letters = pass.some((ele) => {
        //   return /^[a-zA-Z]*$/.test(ele);
        // });
        // let numbers = pass.split("").some((ele) => {
        //   return /^[0-9]*$/.test(ele);
        // });
        // let specials = pass.split("").some((ele) => {
        //   return /^[!@#$%^&*)(+=._-]*$/.test(ele);
        // });
        // if (letters && numbers && specials) {
        //   // setStyle(strong);
        // } else if (
        //   (letters && numbers) ||
        //   (numbers && specials) ||
        //   (letters && specials)
        // ) {
        //   // setStyle(average);
        // } else if (letters || numbers || specials) {
        //   // setStyle(weak);
        // }
        return true;
      }
    ),
  ];
}
function loginRules() {
  return [
    body("email", "Enter a valid email").notEmpty(),
    body("password", "Enter a password").notEmpty(),
  ];
}
function productRules() {
  return [
    body("name", "Enter a product name").notEmpty().isString(),
    body("brand", "Enter a product brand").notEmpty().isString(),
    body("price", "Enter a product price").notEmpty().isNumeric(),
    body("description", "Enter a product description").notEmpty().isString(),
    body("category", "Enter Product Category").isString(),
    body("image", "Enter product image path").isString(),
  ];
}
function reviewRules() {
  return [
    body("name", "Enter --- name").isString().notEmpty(),
    body("rating", "Enter product rating").isNumeric().notEmpty(),
    body("comment", "Enter your comments").isString().notEmpty(),
  ];
}
function errorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ erros: errors.array() });
}

export {
  errorMiddleware,
  registrationRules,
  loginRules,
  productRules,
  reviewRules,
};
