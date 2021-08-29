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
import { globalStyles } from "../styles/globalStyles";
// import { createClient } from '@supabase/supabase-js'
import { CirclesLoader } from 'react-native-indicator';

// const supabaseUrl = 'https://txxjtlrnmxsxpnwaemti.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNzkxMjAzNCwiZXhwIjoxOTQzNDg4MDM0fQ.vxGyYCwLx5RaGF8UZbLxWv1ccZIiT4cwVTxss3nF0y4'
// const supabase = createClient(supabaseUrl, supabaseKey)

const PlayersScreen = ({ navigation }) => {
    // setUpdatePlayers([]);
    const [players, setPlayers] = useState([]);
    const [updatePlayer, setUpdatePlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setUpdatePlayers();
        
        
        getAllPlayers();
    }, []);

    
const getAllPlayers = async () => {
         
            setLoading(true);
            try {
                const request = await axios.get(`${BASE_URL}/players/getAll`);
                // console.log("players get:", typeof(request.data.data));
                setPlayers(request.data.data);
                console.log("players state:  ", players);
            } catch(error) {
                console.log(error);
            }
            
            setLoading(false);
            
}
    // set new player to existing playerlist 
    const addPlayer = (input) => {
        setPlayers([...players, input]);
    }
    
    return (
        <View style={globalStyles.container}>
            <View style={styles.titleGrid}>
                <Button onPress={() => navigation.navigate('HomeTabs')} color="#66bb6a" backgroundColor="#000000" title = "Back" style={globalStyles.primaryBtn}>Back</Button>
                <Text style={styles.title}>All Players</Text>
                <Text style={styles.titleRight}>Go Home</Text>
            </View>    
              
            {players && players.length > 0 ? 
                <PlayerComponent data={players} setPlayers={addPlayer} />
                :
                <View style={globalStyles.loader}>
                    <CirclesLoader color="green" />
                </View>
            }
            </View>

    );
}
export default PlayersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        marginTop: '12%',

    },
    titleGrid: {
        top: 0,
        fontWeight: 'bold',
        alignItems: 'center',
        // justifyContent: 'center',
        // flex: 3,
        marginTop: 15,
        flexDirection: "row",
        marginBottom: 8,
        padding: 3,
    },
    titleLeft: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "row",
        backgroundColor: '#32A335',
        alignContent: 'center'
    },
    title: {
        flex: 3,
          textAlign: "center",
        flexDirection: "row",
    },
    titleRight: {
        flex: 1,
          textAlign: "center",
        flexDirection: "row",
    },
    noDataContainer: {
        flex: 11,
        // justifyContent: 'center',
        // alignContent: 'center',
        // alignItems: 'center',
        color: 'blue',
        fontWeight: 'bold',
        margin: 5,
    }
    
});
