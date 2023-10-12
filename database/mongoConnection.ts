import mongoose from "mongoose";
import config from "config";

export default async () => {
    try {
        const dbUrl: string = config.get("DB.URL");
        await mongoose.connect(dbUrl);
    } catch (e) {
        console.log('error in db connection', e)
    }
}