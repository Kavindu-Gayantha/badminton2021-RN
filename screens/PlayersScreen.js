import * as React from "react";
import {useEffect} from "react";
import {Text} from "react-native";
import {supabase} from "../superbaseInit";

const PlayersScreen = () => {
    const getAllPlayers = async () => {
        try {

            let {data} = await supabase
                .from('players')
                .select('*')

            console.log("all players", JSON.parse(data));
        } catch (error) {
            console.log('error ***********', error);
        }
    }
    useEffect(()=> {
        getAllPlayers();
    })
    return (
        <Text>PlayersScreen</Text>
    );
}
export default PlayersScreen;
