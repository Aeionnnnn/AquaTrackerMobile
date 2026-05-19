import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';


export default function ManageOrders(){

    const [allOrders, setAllOrders] = useState([]);
    const [loadAllOrders, setLoadAllOrders] = useState(false);

    const OrdersManage = () => {
        if(!allOrders.length) return(<Text>Currently No Orders</Text>);

        if(loadAllOrders) {
            return buildOrderManage();
        }
        else return(<Text>Loading History...</Text>);
    }

    async function getOrders(){
        const {data: ordersData, error: ordersError} = await supabase.rpc("get_orders_for_staff_ops");

        console.log(ordersData);

        if(ordersData && ordersData != undefined){
            setAllOrders(ordersData);
            setLoadAllOrders(true);
        }
    }

    async function setOrderPending(orderID){
        console.log(orderID + " Pending")

        const {data: pendingData, error: pendingError} = await supabase.rpc("set_order_pending", {
            ordertarget: orderID
        });
    }

    async function setOrderReady(orderID){
        console.log(orderID + " Ready")

        const {data: readyData, error: readyError} = await supabase.rpc("set_order_ready", {
            ordertarget: orderID
        });
    }

    function mergeIntoCard(orderDets, itemStack){
        return (
            <View style={styles.orderCard}>
                <Text>ID: {orderDets.OrderID} -- Status: {orderDets.Status}</Text>
                <Text>Date: {orderDets.OrderDate}</Text>
                {itemStack}
                <Text>Total Price: {orderDets.TotalPrice}</Text>
                <TouchableOpacity onPress={() => {setOrderPending(orderDets.OrderID)}}><Text>Set to Pending</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {setOrderReady(orderDets.OrderID)}}><Text>Set to Ready</Text></TouchableOpacity>
            </View>
        )
    }

    function buildOrderManage(){
        let currentId = -1;
        let orderDets;
        let itemStack = [];
        let orderCard = [];

        allOrders.forEach((order) => {
            if(currentId != order.OrderID){
                if (currentId != -1){
                    orderCard.push(mergeIntoCard(orderDets, itemStack))
                    itemStack = [];
                }
                currentId = order.OrderID;
                orderDets = order;
            }
            itemStack.push((
                    <Text>{order.ItemName}: Php {order.Price} x {order.ItemQuantity}</Text>
                ))
        })
        orderCard.push(mergeIntoCard(orderDets, itemStack));
        return orderCard;
   }

    useEffect(()=>{
        getOrders();
        const channelManage = supabase
        .channel("orderUpdated")
        .on(
            "postgres_changes",
            {
                event: '*',
                schema: 'public',
                table: 'orders'
            },
            (payload) => {
                getOrders();
            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(channelManage);
        }
    },[]);


    return (
        <View style={styles.container}>
            <OrdersManage/>
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