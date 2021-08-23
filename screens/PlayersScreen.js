import * as React from "react";
import {useEffect} from "react";
import {Text,View, StyleSheet, Button} from "react-native";
import { supabase } from "../lib/superbaseInit";
import { useState } from "react";
import axios from "axios";
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://txxjtlrnmxsxpnwaemti.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzkxMjAzNCwiZXhwIjoxOTQzNDg4MDM0fQ.vxGyYCwLx5RaGF8UZbLxWv1ccZIiT4cwVTxss3nF0y4'
// const supabase = createClient(supabaseUrl, supabaseKey)

const PlayersScreen = () => {
const [players, setPlayers] = useState([]);

//     const getAllPlayers = async () => {
//          try {
        
//              let {data: players, error} = await supabase
//                  .from('faculty')
//                  .select('*')
//                  if(error) {
// console.log(error)
//         } else {
//                      return players;
//                  } 
//             //  console.log("all players", JSON.parse(players));
//             //  return data;
//          } catch (error) {
//              console.log('error ***********', error);
//          }
//     }
    const onPress = () => {
        axios.get("http://192.168.118.115:8080/badminton/players/getAll").then(data => {
            console.log('data *********', JSON.parse(data));
        }).catch(error => {
            console.log('error', error);
        })
    }
    useEffect(()=> {
        // getAllPlayers().then( data => {
        //     console.log('data', data);
        // });
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hi</Text>
            <Button title="ppppp" onPress={onPress}> PRESS</Button>
        </View>
    );
}
export default PlayersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '12%',
    },
    title: {
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: 5
    }
});
