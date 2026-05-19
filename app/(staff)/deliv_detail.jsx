import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';


export default function DelivDetails(){
    const [detailDeliv, setDetailDeliv] = useState([]);
    const [loadDetailDeliv, setLoadDetailDeliv] = useState(false);

    const Details = () => {
        if(loadDetailDeliv){
            return (detailDeliv.length)? buildDetail():(<Text>Error Loading Details</Text>);
        }else return (<Text>Loading Details...</Text>);
    }
    
    const { orderId } = useLocalSearchParams();

    async function getDetails(){
        const {data: detData, error: detError} = await supabase.rpc("get_deliv_detail_for_ops", {
            ordertarget: orderId
        });

        console.log("DATA")
        console.log(detData)

        if(detData && detData != undefined){
            setDetailDeliv(detData);
            setLoadDetailDeliv(true);
        }
    }

    function buildDetail(){
        let itemStack = [];
        detailDeliv.forEach((item) => {
            itemStack.push((<Text>{item.ItemName}: Php {item.Price} x {item.ItemQuantity}</Text>))
        })

        return(
            <View>
                <View style={styles.orderCard}>
                    <Text>OrderID: {detailDeliv[0].OrderID} -- Status: {detailDeliv[0].DeliveryStatus}</Text>
                    <Text>Username: {detailDeliv[0].Username}</Text>
                    <Text>Date Ordered: {detailDeliv[0].OrderDate}</Text>
                    <Text>Total Price: {detailDeliv[0].TotalPrice}</Text>
                    <Text>Address: {detailDeliv[0].Address}</Text>
                    <Text>Vehicle: {(detailDeliv[0].PortNumber)? "detailDeliv[0].PortNumber":"Not Set"}</Text>
                </View>
                <View style={styles.orderCard}>
                    <Text>ITEMS ORDERED</Text>
                    {itemStack}
                </View>
            </View>
        )
    }

    useEffect(() => {
        getDetails()
        const detChannel = supabase
        .channel("delivDetailChanell")
        .on(
            "postgres_changes",
            {
                type: "*",
                schema: "public",
                table: "deliveries"
            },
            (payload) => {
                getDetails()
            }
        )
        .subscribe()

        return () => {
            supabase.removeChannel(detChannel);
        }
    },[])
    
    return (
        <View style={styles.container}>
            <Details/>
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