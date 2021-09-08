import AsyncStorage from "@react-native-async-storage/async-storage";

 const getTokenMethod = async () => {
   try {
     return await AsyncStorage.getItem("loginToken");
   } catch (error) {
     console.log(error);
   }
 };

export default getTokenMethod;
