import * as React from "react";
// import {Text} from "react-native";
import BoyComponent from "../components/BoysListComponent";
import { useState, useEffect } from "react";

import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { Text, View, Button, StyleSheet, Dimensions, FlatList, Modal } from 'react-native';

const BoysScreen = () => {
    const [boys, setBoys] = useState([]);
    const [updatePlayer, setUpdatePlayers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setUpdatePlayers();
         getAllBoys();
    }, []);
   
    // this runs everytime players are changed with use effect hook
   
    const getAllBoys = async () => {
             setLoading(true);
            try {
                const request = await axios.get(`${BASE_URL}/players/getBoys`);
                // console.log("players get:", typeof(request.data.data));
                setBoys(request.data.data);
                console.log("boys:  ", boys);
            } catch(error) {
                console.log(error);
            }
            
            setLoading(false);
            
        }
    
    return (
        <View style={styles.container}>
                     
            {boys.length > 0 ? 
                <BoyComponent data={boys} />
            : <Text style={styles.noDataContainer}>Loading Data....</Text>}
            </View>

    );
}

export default BoysScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        marginTop: '1%',
    },
    titleGrid: {
        top: 0,
        fontWeight: 'bold',
        alignItems: 'center',
        // justifyContent: 'center',
        flex: 1,
        marginTop: 5,
        flexDirection: "row",
        marginBottom: 8,
        padding: 3,
    },
    titleLeft: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "row",
        backgroundColor: 'green',
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
