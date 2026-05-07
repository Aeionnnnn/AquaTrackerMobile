import {Tabs} from "expo-router"
export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
              name= "makeOrder"
              options={{
                title: "Order",
                headerShown: false //not shown for now because styling is not yet implemented
              }} 
            />
            <Tabs.Screen
              name = "currentOrder"
              options = {{
                title: "Current Order",
                headerShown: false
              }}
            />
            <Tabs.Screen
              name = "orderHistory"
              options = {{
                title: "Order History",
                headerShown: false
              }}
            />
        </Tabs>
    );
}