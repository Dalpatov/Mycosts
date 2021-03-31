// npm install expres => npm init =>  и жмем энтер до есаconst express = require('express');
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());

const url = "mongodb+srv://restart987:restart987@cluster0.20a2n.mongodb.net/BDTODO?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use("/", apiRoutes);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});