import * as React from "react";
import {useEffect, useState} from "react";
import { Text, View, Button } from 'react-native';


const FacultyComponent = () => {
    const [faculty, setFaculty] = useState([]);
    const [updatePlayer, setUpdatePlayers] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
     
        const getAllFaculty = () => {
            setLoading(true);
            GetRequest('/players/getAll').then(res => {
                console.log('request::::', res.data);
          
                setPlayers(res.data);
                setLoading(false);
            });
            
        }

        getAllPlayers();
  }, [players]);
  
  return (
    <Text>Hi</Text>
  );
}

export default FacultyComponent;