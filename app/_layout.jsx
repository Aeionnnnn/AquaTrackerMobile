import { Stack } from 'expo-router';
export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="(auth)"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="(cust)"
                options={{
                    headerShown: false 
                }}
            />
            <Stack.Screen
                name="detail"
                options={{ title: 'Details'}}
            />
            <Stack.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />

        </Stack>
    );
}
