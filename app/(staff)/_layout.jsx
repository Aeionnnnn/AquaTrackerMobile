import { Tabs } from 'expo-router';
export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen
            name= "makeOrderStaff"
              options={{
                title: "Order",
                headerShown: false //not shown for now because styling is not yet implemented
            }} />


        </Tabs>
    );
}
