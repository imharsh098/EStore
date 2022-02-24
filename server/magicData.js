import mongoose from "mongoose";
import fakeProducts from "./fakeProducts.js";
import fakeUsers from "./fakeUsers.js";

import User from "./models/User.js";
import Product from "./models/Product.js";
import "./connect.js";

//loaddata
//purgeData

async function loadData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    const newUsers = await User.insertMany(fakeUsers);
    const adminUser = newUsers[0]._id;

    const sampleProducts = fakeProducts.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(sampleProducts);
    console.log("Data dumped successfully");
    process.exit(1);
  } catch (error) {
    console.log("Loading failed");
    console.error(error);
  }
}
async function purgeData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Purged successfully");
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
}
loadData();
// purgeData();
