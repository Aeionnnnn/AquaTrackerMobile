import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';


export default function ManageDeliveries(){

    const [allDeliv, setAllDeliv] = useState([]);
    const [loadAllDeliv, setLoadAllDeliv] = useState(false);

    const DeliverManage = () => {
        if(loadAllDeliv) {
            return (allDeliv.length)?buildOrderManage():(<Text>Currently No Deliveries</Text>);
        }
        else return(<Text>Loading History...</Text>);
    }

    async function getDeliveries(){
        const {data: delivData, error: delivError} = await supabase.rpc("get_deliv_for_ops");

        console.log(delivData);

        if(delivData && delivData != undefined){
            setAllDeliv(delivData);
            setLoadAllDeliv(true);
        }
    }

    function goToDetails(orderID){
        console.log(orderID);
        router.push({
            pathname: "./deliv_detail",
            params: {orderId: orderID}
        });
    }

    function buildOrderManage(){    
        let orderCard = [];

        return allDeliv.map((order) => {
            return (
                <TouchableOpacity onPress={()=>{goToDetails(order.OrderID)}}>
                    <View style={styles.orderCard}>
                        <Text>ID: {order.OrderID} -- Status: {order.DeliveryStatus}</Text>
                        <Text>Date: {order.OrderDate}</Text>
                        <Text>Total Price: {order.TotalPrice}</Text>
                        <Text>Vehicle: {(order.PortNumber)? order.PortNumber:"Not Set"}</Text>
                    </View>
                </TouchableOpacity>
            )
            
        })
        
   }

    useEffect(()=>{
        getDeliveries();
        const channelDeliv = supabase
        .channel("delivUpdated")
        .on(
            "postgres_changes",
            {
                event: '*',
                schema: 'public',
                table: 'orders'
            },
            (payload) => {
                getDeliveries();
            }
        )
        .on(
            "postgres_changes",
            {
                event: '*',
                schema: 'public',
                table: 'deliveries'
            },
            (payload) => {
                getDeliveries();
            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(channelDeliv);
        }
    },[]);

    useEffect(()=>{getDeliveries()},[])

    return (
        <View style={styles.container}>
            <DeliverManage/>
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