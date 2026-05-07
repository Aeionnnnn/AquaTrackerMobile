import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

export default function OrderHistory(){

    const [orderHistory, setOrderHistory] = useState([]);
    const [isOrderHistoryLoad, setIsOrderHistoryLoad] = useState(false);
    //const [orderCards, setOrderCards] = useState([]);
    const OrderHistory = () => {
        if(!orderHistory.length) return(<Text>Currently No Orders</Text>);

        if(isOrderHistoryLoad) {
            return buildOrderHistory();
        }
        else return(<Text>Loading History...</Text>);
    }


    async function getOrderHistory(){
        const {data: orderHistData, error: orderHistErr} = await supabase.rpc("get_cust_order_hist");

        if(orderHistErr) console.log(orderHistErr);
        else console.log(orderHistData);

        if(orderHistData.length){
            setOrderHistory(orderHistData);
            setIsOrderHistoryLoad(true);
        }else{}
        
    }

    function mergeIntoCard(order, orderItems){
        return(
            <View style={styles.itemCard}>
                    <Text>ID: {order.OrderID} -- Status: {order.Status}</Text>
                    <Text>Date: {order.OrderDate}</Text>
                    {orderItems}
                    <Text>Total Price: {order.TotalPrice}</Text>
            </View>
        )
    }

    function buildOrderHistory(){
        let currentId = -1;
        let orderDets;
        let orderItems = []
        let orderCard = []

        orderHistory.forEach((order)=>{
            if(currentId !== order.OrderID){
                if(currentId !== -1){
                    orderCard.push(mergeIntoCard(orderDets, orderItems));
                    orderItems = [];
                }
                currentId = order.OrderID
                orderDets = order;
            }
            orderItems.push((<Text>{order.ItemName}: Php {order.Price} x {order.ItemQuantity}</Text>))
        })

        console.log(orderHistory)
        orderCard.push(mergeIntoCard(orderDets, orderItems))

        return (<View>{orderCard}</View>);
    }

    useEffect(()=>{
        getOrderHistory();
        const channel = supabase
        .channel("orderUpdated")
        .on(
            "postgres_changes",
            {
                event: '*',
                schema: 'public',
                table: 'orders'
            },
            (payload) => {
                getOrderHistory();
            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(channel);
        }
    },[]);

    return(
        <View style={styles.container}>
            <OrderHistory/>
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
    itemCard: {
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