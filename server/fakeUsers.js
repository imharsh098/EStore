import bcrypt from "bcrypt";

const users = [
  {
    name: "MR Admin",
    email: "prash@copy.com",
    password: bcrypt.hashSync("1234560", 10),
    isAdmin: true,
  },
  {
    name: "Saikiran",
    email: "saikiran@copy.com",
    password: bcrypt.hashSync("1234560", 10),
  },
  {
    name: "Keith",
    email: "Keith@copy.com",
    password: bcrypt.hashSync("1234560", 10),
  },
  {
    name: "himanshu",
    email: "himanshu@copy.com",
    password: bcrypt.hashSync("1234560", 10),
  },
];
export default users;
