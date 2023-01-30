// const fetch= require('node-fetch');
import fetch from "node-fetch";
import mongoose from "mongoose";

//    Connect Database
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/fetchapi")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

// if (db) {
//   console.log("Database Connected ");
// } else {
//   console.log("Not connected");
// }
// mongoose.connect('mongodb://localhost:27017/fetchApi')
// .then(()=>console.log("DB Connected"))
// .catch((err)=>console.log(err))

//   create Schema
const dataSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

const dataModel = mongoose.model("Apidata", dataSchema);

const PostData = async () => {

  const mydata = await fetch("https://jsonplaceholder.typicode.com/posts");
  const realData = await mydata.json();
  //console.log(realData);
  for (let i = 0; i < realData.length; i++) {
    const pdata = new dataModel({
      userId: realData[i]['userId'],
      id: realData[i]['id'],
      title: realData[i]['title'],
      body: realData[i]['body'],
    });

    await pdata.save();
    // console.log(realData[i]["id"]);
  }
};

PostData();
