import mongoose, {ConnectOptions} from "mongoose";
import {APP_CONFIG} from "../app-config";

type ConnectionOptions = {
    useNewUrlParser: boolean,
}

const options : ConnectionOptions & ConnectOptions = {
    useNewUrlParser: true
}

mongoose.set("strictQuery", false);
console.log("url", APP_CONFIG.DB_URL)

mongoose.connect(APP_CONFIG.DB_URL, options, (error:any) => {
   if(error) {
        console.log(error.message)
   }
});
