import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";


export const apiKey = ENV.STREAM_API_KEY;
export const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);   //will be used for chat features
export const streamClient =  new StreamClient(apiKey, apiSecret);  //will be used for videocalls


export const upsertStreamUser = async(userData) => {
    try {
        await chatClient.upsertUser(userData)
        console.log("Stream user upserted successfully:", userData);
    } catch (error) {
        console.log("Error upserting Stream user:", error);
    }
};


export const deleteStreamUser = async(userId) => {
    try {
        await chatClient.deleteUser(userId)
        console.log("Stream user deleted successfully:", userId);
    } catch (error) {
        console.log("Error deleting Stream user:", error);
    }
};


//to-do: add another method to generate token