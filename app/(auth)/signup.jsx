import { View, Text, StyleSheet,TouchableOpacity, TextInput } from 'react-native';
import {useState} from 'react'
import { router } from 'expo-router';
import { supabase } from '../../utils/supabase';

export default function SignUpScreen() {
    function goToHome(){
            router.replace("/")
        }

    async function signOut(){
        const {data, error} = await supabase.auth.signOut()

        if(data.user){
            switch(data.user.user_metadata.type){
                case "CUST":
                    router.replace("/makeOrder")    
                break;
            }
        }
    }
    
    async function signUp(){
        console.log("Username: " + username +
                    "\nPassword: " + password +
                    "\nFull Name: " + fullName + 
                    "\nAddress: " + address +
                    "\nContact: " + contact
        )

    
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                username: username,
                fullName: fullName,
                address: address,
                contact: contact,
                type: "CUST"
            }}
        })

        console.log(data)

        if(data.user){
            switch(data.user.user_metadata.type){
                case "CUST":
                    router.replace("/makeOrder");
                break;
                case "STAFF":
                    router.replace("/makeOrder")
                break;
            }
        }

        setPass("");
    }

        const [username, setUsername] = useState("")
        const [password, setPass] = useState("")
        const [email, setEmail] = useState("")
        const [fullName, setFullName] = useState("")
        const [address, setAddress] = useState("")
        const [contact, setContact] = useState("")
    
        return (
            <View style={styles.container}>
    
                <TextInput style={styles.input} onChangeText={(text)=>{setUsername(text)}} 
                    placeholder="Username" placeholderTextColor={'#888'}
                    value={username}/>
                <TextInput style={styles.input} onChangeText={(text)=>{setPass(text)}} 
                    placeholder="Password" placeholderTextColor={'#888'}
                    value={password}  secureTextEntry={true}/>
                <TextInput style={styles.input} onChangeText={(text)=>{setEmail(text)}} 
                    placeholder="Email" placeholderTextColor={'#888'}
                    value={email}/>
                <TextInput style={styles.input} onChangeText={(text)=>{setFullName(text)}} 
                    placeholder="Full Name" placeholderTextColor={'#888'}
                    value={fullName}/>
                <TextInput style={styles.input} onChangeText={(text)=>{setAddress(text)}} 
                    placeholder="Address" placeholderTextColor={'#888'}
                    value={address}/>
                <TextInput style={styles.input} onChangeText={(text)=>{setContact(text)}} 
                    placeholder="Contact" placeholderTextColor={'#888'}
                    value={contact}/>
                <TouchableOpacity onPress={()=>{signUp()}}><Text>Submit</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{goToHome()}}>
                    <Text style={styles.subtitle}>Home</Text>
                </TouchableOpacity>
                
            <TouchableOpacity onPress={()=>{signOut()}}>
                <Text style={styles.subtitle}>SIGN OUT</Text>
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