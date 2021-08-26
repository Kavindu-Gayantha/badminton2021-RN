import * as React from "react";
import axios from "axios";
import { BASE_URL } from "../api/BASE_URL";
import { useState, useEffect } from "react";
import {Text, StyleSheet, View} from "react-native";
import GirlsComponent from "../components/GirlsListComponent";

const GirlsScreen = () => {
    const [girls, setgirls] = useState([]);

    useEffect(() => {
        getAllGirls();
        
    }, [])
    
    const getAllGirls = async () => {
        
        try {
            const request = await axios.get(`${BASE_URL}/players/getGirls`);
                // console.log("players get:", typeof(request.data.data));
                setgirls(request.data.data);
            console.log("girls:  ", request.data.data);
            // return request.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <View style={styles.container}>
            {girls.length > 0 ?
            <GirlsComponent data={girls}/>
            : <Text style={styles.noDataContainer}>Loading Data....</Text>}
        </View>
    );
}
export default GirlsScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        marginTop: '1%',
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
})