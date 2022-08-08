import { REALM_APP_ID } from "../config";
import Realm from "realm";
import { SensorData } from "schemas/SensorData";
import { useState } from "react";

const app = new Realm.App({ id: REALM_APP_ID });


export const loginUser = async (email, password) => {
    // Access using email and password credentials
    const credentials = Realm.Credentials.emailPassword(email,password);
    return await app.logIn(credentials);

} 

    
export const getRealm = async (user) => {
    try {
        const realmConfig = {
            sync: {
                user: user,
                error: (err) => console.log(JSON.stringify(err))
            },
            schema: [SensorData]
        };
        return await Realm.open(realmConfig).then((realm) => realm);
    } catch (error) {
        return error;
    }
}

