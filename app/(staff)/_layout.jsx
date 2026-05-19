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

            <Tabs.Screen
            name= "orderHistoryStaff"
              options={{
                title: "Order History",
                headerShown: false //not shown for now because styling is not yet implemented
            }} />

             <Tabs.Screen
            name= "manageOrders"
              options={{
                title: "Manage Orders",
                headerShown: false //not shown for now because styling is not yet implemented
            }} />
        </Tabs>
    );
}
