const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const dealRoutes = require("./routes/dealRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const matchRoutes = require("./routes/matchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/matches", matchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});