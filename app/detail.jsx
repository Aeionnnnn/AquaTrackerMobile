import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

export default function DetailScreen() {
    // const [studentList] = useState([
    //     { id: 1, name: "Patrick", course: "CpE", year: "4th Year", enrolled: true },
    //     { id: 2, name: "Chiz", course: "IT", year: "3rd Year", enrolled: false },
    //     { id: 3, name: "Gran", course: "CS", year: "2nd Year", enrolled: true },
    //     { id: 4, name: "Marr", course: "ICT", year: "3rd Year", enrolled: false }
    // ]);

    const [userData, setUserData] = useState([])

    const getData = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUserData(data)
            })
    }

    useEffect(() => { getData() }, [])

    const { id } = useLocalSearchParams();

    // for( let stud of studentList){

    // }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>📄 Detail Screen</Text>
            {userData.map((user) => {
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
            })}

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