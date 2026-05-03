import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {useEffect, useState} from 'react';
import { router } from 'expo-router';

export default function HomeScreen() {

    // const [studentList] = useState([
    //     { id: 1, name: "Patrick", course: "CpE", year: "4th Year", enrolled: true },
    //     { id: 2, name: "Chiz", course: "IT", year: "3rd Year", enrolled: false },
    //     { id: 3, name: "Gran", course: "CS", year: "2nd Year", enrolled: true },
    //     { id: 4, name: "Marr", course: "ICT", year: "3rd Year", enrolled: false }
    // ])

    const [userData,setUserData] = useState([])

    function goToDetail(props) {
        router.push('/detail?id=' + String(props.id));
    }

    const getData=()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            setUserData(data)
        })
    }

    useEffect(()=>{getData()},[])

    return (
        <View style={styles.container}>
             <Text style={styles.title}>🏠 Home</Text>
            <Text style={styles.subtitle}>Welcome to the app!</Text>
{/*
            {studentList.map((student) => {
                return (
                    <TouchableOpacity style={styles.button} onPress={()=>goToDetail(student)}>
                        <Text>{student.name}</Text>
                    </TouchableOpacity>
                )
            })} */}
            {userData.map((user)=>
                
                <TouchableOpacity style={styles.button} onPress={()=>goToDetail(user)} key={user.id}>
                        <Text style={styles.name}>{user.name}</Text>
                </TouchableOpacity>
                
            )}
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
