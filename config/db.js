const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connesso a MongoDB");
  } catch (err) {
    console.error("Errore nella connessione: ", err.message);
    process.exit(1); // exit process with failure code
  }
};

module.exports = connectDB;
