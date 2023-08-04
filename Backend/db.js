const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("suc", err);
      else {
        console.log("cool");
        const fetched_data =
          /*AWAIT REMOVED*/ mongoose.connection.db.collection("food_items"); //we are able to read the contents of
        fetched_data.find({}).toArray(function (err, data) {
          //collection so stored in the database.(not CUD, just R)
          const food_items_Categories =
            /*AWAIT REMOVED*/ mongoose.connection.db.collection(
              "food_items_Categories"
            );
          food_items_Categories.find({}).toArray(function (err, catData) {
            if (err) console.log("error");
            else {
              global.food_items = data;
              global.food_items_Categories = catData; //using global will make it easy for us to edit/updatae it from anywhere in the src code
              console.log(global.food_items);
            }
          });
          // if(err) console.log('error');
          // else{
          //     global.food_items = data;  //using global will make it easy for us to edit/updatae it from anywhere in the src code
          //     console.log(global.food_items)
          // }
        });
      }
    }
  );
};

module.exports = mongoDB;
