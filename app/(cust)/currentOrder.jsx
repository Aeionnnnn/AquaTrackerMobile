import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

export default function CurrentOrder(){

    const [currentOrder, setCurrentOrder] = useState([]);
    const [currentOrderLoad, setCurrentOrderLoad] = useState(false);
    const CurrentOrder = () => {
        if(currentOrderLoad){
            return (currentOrder.length > 0)?buildCurrentOrder():(<Text>No Current Order</Text>);
        }else return (<Text>Loading Current Order...</Text>)
    }

    async function getCurrentOrder(){
        const {data: currentOrderData, error: currentOrderErr} = await supabase.rpc("get_current_order");

        console.log(currentOrderData);
        
        if(currentOrderData){
            setCurrentOrder(currentOrderData);
            setCurrentOrderLoad(true);
        }
    }

    async function cancelOrder(){
        const {data: cancelData, error: cancelError} = await supabase.rpc("cancel_current_order")

        console.log(cancelData)
    }

    function buildCurrentOrder(){
        let item_stack = [];
        
        currentOrder.forEach((order, ndx) => {
            item_stack.push((
                <Text key={ndx}>{order.ItemName}: Php {order.Price} x {order.ItemQuantity}</Text>
            ))
        })

        return (
            <View style={styles.orderCard}>
                <Text>ID: {currentOrder[0].OrderID} -- Status: {currentOrder[0].Status}</Text>
                    <Text>Date: {currentOrder[0].OrderDate}</Text>
                    {item_stack}
                    <Text>Total Price: {currentOrder[0].TotalPrice}</Text>
                <TouchableOpacity onPress={()=>{cancelOrder()}}><Text>Cancel</Text></TouchableOpacity>    
            </View>
        )
    }

    useEffect(()=>{
        getCurrentOrder();
        const currentOrderChannel = supabase
        .channel("currentOrderChannel")
        .on(
            "postgres_changes",
            {
                event: '*',
                schema: "public",
                table: "orders"
            },
            (payload) => {
                console.log(payload)
                getCurrentOrder();
            }
        ).subscribe();

        return () => {
            supabase.removeChannel(currentOrderChannel);
        }
    }, []);

    return(
        <View style={styles.container}>
            <CurrentOrder/>
        </View>
    )
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
    button: {
        backgroundColor: 'gray',
        margin: 5,
        padding: 10,
        width: 200,
        alignItems: 'center',
        borderRadius: 10,
    },
    orderCard: {
        backgroundColor: 'lightblue',
        margin: 5,
        padding: 10,
        width: 300,
        alignItems: 'center',
        borderRadius: 10,
    },
    detail: {
        marginBottom: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});