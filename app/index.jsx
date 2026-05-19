import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {useEffect, useState} from 'react';
import { router } from 'expo-router';
import { supabase } from '../utils/supabase';


export default function HomeScreen() {

    // const [studentList] = useState([
    //     { id: 1, name: "Patrick", course: "CpE", year: "4th Year", enrolled: true },
    //     { id: 2, name: "Chiz", course: "IT", year: "3rd Year", enrolled: false },
    //     { id: 3, name: "Gran", course: "CS", year: "2nd Year", enrolled: true },
    //     { id: 4, name: "Marr", course: "ICT", year: "3rd Year", enrolled: false }
    // ])


    function goToLogin() {
        router.push('/login');
    }


  //const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(0);
  const [loginVerified, setLoginVerified] = useState(0);

// const getUsers = async () => {
//    const { data, error} = await supabase.from('user').select();

//     setUsers(data)
// }

const paths = {}

const initLoad = async () =>{
    const {data, error} = await supabase.from('items').select();
    const {data: userData} = await supabase.auth.getUser()
    if(error) console.log(error);
    console.log(userData.user)

    const {data: roleData, error: roleError} = await supabase.rpc("get_role");

    if(userData.user != null) switch(roleData){
        case "CUST":
            router.replace("/makeOrder")
        break;
        case "STAFF":
            router.replace("/makeOrderStaff")
        break;
    }

    setItems(data)
    setItemsLoaded(1);
}

const Items = () => {
    if(itemsLoaded){
        return items.map((item) => {
                return(<TouchableOpacity style={styles.button} key={item.ItemID}>
                        <Text style={styles.name}>{item.ItemName}</Text>
                        <Text style={styles.name}>{item.Description}</Text>                    
                </TouchableOpacity>)
                
            })
    }else return(<Text>Loading Items</Text>)
}

const LoginAccount = () => {
    if(loginVerified) {
        
    }
}

useEffect(() => {initLoad()}, [])

console.log(items);


    return (
        <View style={styles.container}>
             <Text style={styles.title}>🏠 Home</Text>
            <Text style={styles.subtitle}>Welcome to the app!</Text>
            {   /*
            {studentList.map((student) => {
                return (
                    <TouchableOpacity style={styles.button} onPress={()=>goToDetail(student)}>
                        <Text>{student.name}</Text>
                    </TouchableOpacity>
                )
            })} */}
            {/* {userData.map((user)=>
                
                <TouchableOpacity style={styles.button} onPress={()=>goToDetail(user)} key={user.id}>
                        <Text style={styles.name}>{user.name}</Text>
                </TouchableOpacity>
                
            )} */}
            <Items/>

            <TouchableOpacity style={styles.button} onPress={()=>{goToLogin()}}>
                <Text style={styles.name}>Login</Text>
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
    button: {
        backgroundColor: 'gray',
        margin: 5,
        padding: 10,
        width: 200,
        alignItems: 'center',
        borderRadius: 10,
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
    },
});
