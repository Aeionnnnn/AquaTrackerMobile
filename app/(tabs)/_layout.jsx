import { Tabs } from 'expo-router';
export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                }}
            />
            <Tabs.Screen
                name="App"
                options={{
                    title: 'Test',
                    tabBarLabel: 'Test',
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarLabel: 'Explore',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarLabel: 'Profile',
                }}
            />
        </Tabs>
    );
}
