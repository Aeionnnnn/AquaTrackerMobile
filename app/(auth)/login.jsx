import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { router } from 'expo-router';


export default function ExploreScreen() {
    function goToHome(){
        router.replace("/")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{goToHome()}}>
                <Text style={styles.title}>🔍 Explore</Text>
                <Text style={styles.subtitle}>Find something new!</Text>
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
});
