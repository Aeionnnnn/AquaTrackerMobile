import { View, Text, StyleSheet,TouchableOpacity, TextInput } from 'react-native';
import {useState} from 'react'
import { router } from 'expo-router';


export default function ExploreScreen() {
    function goToHome(){
        router.replace("/")
    }

    const [username, setUsername] = useState("")
    const [password, setPass] = useState("")

    return (
        <View style={styles.container}>

            <TextInput style={styles.input} onChangeText={(text)=>{setUsername(text)}} 
                placeholder="Username" placeholderTextColor={'#888'}
                value={username}/>
            <TextInput style={styles.input} onChangeText={(text)=>{setPass(text)}} 
                placeholder="Password" placeholderTextColor={'#888'}
                value={password}  secureTextEntry={true}/>
            <TouchableOpacity onPress={()=>{console.log(username + " " + password); setPass(""); setUsername("")}}><Text>Submit</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{goToHome()}}>
                <Text style={styles.subtitle}>Home</Text>
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
