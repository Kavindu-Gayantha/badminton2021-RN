import * as React from "react";
import {useEffect} from "react";
import {Text,View, StyleSheet, Button, ScrollView, FlatList} from "react-native";
import { supabase } from "../lib/superbaseInit";
import { useState } from "react";
// import axios from "./../api/axios";
import { GetRequest } from "../api/Requests";
import PlayerComponent from "../components/PlayerListComponent";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://txxjtlrnmxsxpnwaemti.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzkxMjAzNCwiZXhwIjoxOTQzNDg4MDM0fQ.vxGyYCwLx5RaGF8UZbLxWv1ccZIiT4cwVTxss3nF0y4'
// const supabase = createClient(supabaseUrl, supabaseKey)

const PlayersScreen = () => {
    const [players, setPlayers] = useState([]);
    // const [updatePlayer, setUpdatePlayers] = useState([]);
    const [loading, setLoading] = useState(false);

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
        // axios.get("http://192.168.118.115:8080/badminton/players/getAll").then(data => {
        //     console.log('data *********', JSON.parse(data));
        // }).catch(error => {
        //     console.log('error', error);
        // })
        // const data = GetRequest();
        // setPlayers(data);
        // console.log('data: ', players);
    }
    useEffect(() => {
     
        const getAllPlayers = async () => {
            // setLoading(true);
            // await GetRequest('faculty/getAllActive').then(res => {
            //     console.log('request::::', res.data);
          
            //     // setPlayers(res.data);
            //     // setLoading(false);
            // });
            setLoading(true);
            const request = await axios.get(`${BASE_URL}/faculty/getAllActive`);
            console.log("players get:", typeof(request.data.data));
            setPlayers(request.data.data);
            console.log("players state:  ", players);
            setLoading(false);
            
        }

        getAllPlayers();
    }, ['faculty/getAllActive']);

    // console.log("players are: ", players.data);
    // this runs everytime players are changed with use effect hook

    
    return (
        <View style={styles.container}>
            <View style={styles.titleGrid}>
                <Text style={styles.titleLeft}>Back</Text>
                <Text style={styles.title}>All Players</Text>
                <Text style={styles.titleRight}>Go Home</Text>
            </View>    
                <ScrollView>
                {players ? players.map((data) => {
                    return (
                        
                        <View key={data.id} >
                            <Text>{data.faculty}</Text>
                        
                        {/* // <FlatList data={players} /> */}
                        </View>    
                    );
                    
                })
                    
                        : <Text>No faculty</Text>}
                    </ScrollView>
            </View>

    );
}
export default PlayersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: '12%',
    },
    titleGrid: {
        top: 0,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 5,
        flexDirection: "row"
    },
    titleLeft: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "row",
    },
    title: {
        flex: 1,
          textAlign: "center",
        flexDirection: "row",
    },
    titleRight: {
        flex: 1,
          textAlign: "center",
        flexDirection: "row",
    }
});
