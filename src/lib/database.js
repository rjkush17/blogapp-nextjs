import mongoose from 'mongoose';

const url = process.env.DB_URL

if(!url){
    throw new Error("URL not found, Please define url in .env.local")
}

let cached = global.mongoose;
if(!cached){
    cached = global.mongoose = {conn :null, promise : null}
}

const connectionDB = async() =>{
    if(cached.conn){
        return cached.conn
    }
     
    let opts;
  if (!cached.promise) {
     opts = {
      bufferCommands: false,
    }}

    cached.promise = mongoose.connect(url,opts).then((res)=>mongoose)

    cached.conn = await cached.promise
    console.log("databse connected")
    return cached.conn;
}

export default connectionDB
