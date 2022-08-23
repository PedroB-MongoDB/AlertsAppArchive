import { REALM_APP_ID } from "../config";
import Realm from "realm";
import { SensorData } from "schemas/SensorData";
import { useState } from "react";

const app = new Realm.App({ id: REALM_APP_ID });


export const loginUser = async (email, password) => {
   // const [sensors, setSensors] = useState([]);
    // Access using email and password credentials
    const credentials = Realm.Credentials.emailPassword(email,password);
    
    
    /*try {
        const user = await app.logIn(credentials);
        const allSensors = await user.functions.getSensor();
        setSensor(() => allSensors);
      } catch (error) {
        console.error(error);
      }*/
    return await app.logIn(credentials);
    console.log(credentials);
    /*return (
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {sensors &&
          sensors.map((sensor) => {
            return <p key={sensor._id}>{sensor.name}</p>;
          })}
      </main>
    );*/

} 

    
export const getRealm = async (user) => {
    try {
      console.log("I AM HERE");
        const realmConfig = {
            sync: {
                user: user,
                partitionValue: "master",
                //error: (err) => console.log("hello world" + JSON.stringify(err))
            },
            schema: [SensorData]
        };
        return await Realm.open(realmConfig).then((realm) => realm);
    } catch (error) {
      console.log("I AM HERE")
        return error;
    }
}

