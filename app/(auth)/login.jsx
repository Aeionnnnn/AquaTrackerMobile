import { View, Text, StyleSheet,TouchableOpacity, TextInput } from 'react-native';
import {useState} from 'react'
import { router } from 'expo-router';
import { supabase } from "../../utils/supabase"


export default function LoginScreen() {
    function goToHome(){
        router.replace("/")
    }

    async function logIn(){
        const {data: userData, error: loginError} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        console.log(userData)

        const {data: roleData, error: roleError} = await supabase.rpc("get_role");

        console.log(roleData);
        if(userData.user){
            switch(roleData){
                case "CUST":
                    router.replace("/makeOrder")
                break;
                case "STAFF":
                    router.replace("/makeOrderStaff")
                break;
            }
        }
    }

    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")

    return (
        <View style={styles.container}>

            <TextInput style={styles.input} onChangeText={(text)=>{setEmail(text)}} 
                placeholder="Email" placeholderTextColor={'#888'}
                value={email}/>
            <TextInput style={styles.input} onChangeText={(text)=>{setPass(text)}} 
                placeholder="Password" placeholderTextColor={'#888'}
                value={password}  secureTextEntry={true}/>
            <TouchableOpacity onPress={()=>{logIn()}}><Text>Submit</Text></TouchableOpacity>
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
