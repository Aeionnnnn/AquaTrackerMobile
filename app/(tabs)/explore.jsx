import { View, Text, StyleSheet } from 'react-native';
export default function ExploreScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔍 Explore</Text>
            <Text style={styles.subtitle}>Find something new!</Text>
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
