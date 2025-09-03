const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const adminRouter= require("./Routes/AdminRoute");
const eventRouter= require("./Routes/AddEventRoute");
const fetchRouter= require("./Routes/FetchEventRoute");
const deleteRouter= require("./Routes/DeleteEventRoute");
const errorHandler = require("./middlewares/errHandler");
const app=express();
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));

const corsOptions = {
  origin:"*",
};

app.use(cors(corsOptions));
  app.use(express.json());

  app.use("/",adminRouter);
  app.use("/",eventRouter);
  app.use("/",fetchRouter);
  app.use("/",deleteRouter);
  
  app.use(errorHandler);

  app.listen(PORT, () =>
    console.log(`Server is running on this port... ${PORT} `)
)