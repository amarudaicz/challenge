import mongoose from "mongoose";

export default function checkMongo (uri:string ){
    mongoose
  .connect(uri)
  .then((conn) => console.log(conn.connection.db.databaseName));

}