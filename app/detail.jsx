import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export default function DetailScreen() {
    // const [studentList] = useState([
    //     { id: 1, name: "Patrick", course: "CpE", year: "4th Year", enrolled: true },
    //     { id: 2, name: "Chiz", course: "IT", year: "3rd Year", enrolled: false },
    //     { id: 3, name: "Gran", course: "CS", year: "2nd Year", enrolled: true },
    //     { id: 4, name: "Marr", course: "ICT", year: "3rd Year", enrolled: false }
    // ]);

    async function signOut(){
            const {data, error} = await supabase.auth.signOut()
            router.replace("/")
        }

    const [userData, setUserData] = useState({})
    let userMeta = {};
    let isUserDataFetched = 0;

    const getUserData = async () => {
       const {data: user, error: userError} = await supabase.auth.getUser()

       console.log(user.user.user_metadata.fullName)
       setUserData(user.user.user_metadata)
    }

    useEffect(() => { getUserData() }, [])

    const { id } = useLocalSearchParams();

    // for( let stud of studentList){

    // }
    const UserName = () => {
        if(userData.fullName){
            return(<Text>Name: {userData.fullName} </Text>)
        }else return(<Text>Loading</Text>)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📄 Detail Screen</Text>
            {/* {userData.map((user) => {
                if (user.id === parseInt(id)) {
                    return (
                        <View style={styles.body}>
                            <Text style={styles.detail}>Name: {user.name}</Text>
                            <Text style={styles.detail}>Email: {user.email}</Text>
                            <Text style={styles.detail}>Phone Number: {user.phone}</Text>
                            <Text style={styles.detail}>Address: {user.address.street}, {user.address.city}</Text>
                        </View>

                    )
                }
            })} */}
            <UserName/>

            <TouchableOpacity onPress={()=>{router.replace("/")}}>
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{signOut()}}>
                <Text>Log Out</Text>
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
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    body: {
        fontWeight: 'bold',
        fontSize: 24,
        backgroundColor: '#555',
        alignItems: 'center',
        padding: 20,
        borderRadius: 15,
    },
    detail: {
        marginBottom: 15,
        color: 'white',
        fontWeight: 'bold',
    }
});