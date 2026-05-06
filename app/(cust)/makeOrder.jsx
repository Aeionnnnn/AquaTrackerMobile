import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import OrderItem  from '../../components/OrderItem'

export default function MakeAnOrder(){
    const [logOutText, setLogOutText] = useState("Log Out");
    const [cart, setCart] = useState([]);
    const [isCartUpdating, setIsCartUpdating] = useState(false);
    const [itemsProd, setItemsProd] = useState([]);
    const [isItemsLoaded, setIsItemsLoaded] = useState(false);
    const [isCartView, setIsCartView] = useState(false)
    const Items = () => {
        if(isItemsLoaded){
            return itemsProd.map((item)=>{return <OrderItem key={item.ItemID} 
                cargo={{item: item,addToCart: addToCart}
                }/>})
        }else return(<Text>Items Loading...</Text>)        
    }

    const CartItems = () => {
        if(itemsProd && cart){
            let returnArr = [];
            let totalPrice = 0;
            cart.forEach((cartItem) => {
                totalPrice += cartItem.price;
                returnArr.push(
                    <View style={styles.itemCard} key = {cartItem.ItemID}>
                        <Text>{cartItem.ItemName}</Text>
                        <Text>Amount: {cartItem.amount}</Text>
                        <Text>Price: {cartItem.price}</Text>
                    </View>
                )
            })
            returnArr.push(
                <View style={styles.itemCard}>
                    {(totalPrice > 0)?<Text>Total Price: {totalPrice}</Text>:<Text>Nothing in Cart</Text>}
                </View>
            )
            return returnArr
        }
    }

    async function initItems(){
        const {data: dataItems, error: errorItems} = await supabase.from("items").select();

        if(errorItems){console.log(errorItems)}

        if(dataItems) {
            console.log(dataItems)
            setItemsProd(dataItems);
            setIsItemsLoaded(true);
        }
    }

    async function logOut(){
        setLogOutText("Logging Out...");
        await supabase.auth.signOut();

        router.replace("/")

        setLogOutText("Log Out");
    }

    function addToCart(item){
        setIsCartUpdating(true);
        let currentItem = itemsProd.find(prod => prod.ItemID === item.id)
        if(currentItem == undefined) return
        setCart(newCart => {
            let found = false;
            let buffer = cart.map((order)=>{
                if(order.ItemID == item.id) {
                    found = 1
                    console.log(order)
                    return { ...order, amount: order.amount + item.num, price: order.price + item.num * currentItem.Price}
                }
                else return order
            })
            if(!found) 
                return [...cart, {ItemID: item.id, ItemName: currentItem.ItemName, amount: item.num, price: item.num * currentItem.Price}]
            else return buffer;
        })
        setIsCartUpdating(false);

    }

    function goHome(){router.replace("/")}

    useEffect(()=>{initItems()},[])

    //--------------------------VIEWS-----------------------------------//
    
    if(!isCartView) return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>{logOut()}}>
                <Text>{logOutText}</Text>
            </TouchableOpacity>

            <View>
                <Items/>
            </View>

            <Text>Make An Order</Text>
            <TouchableOpacity style={styles.button} onPress={()=>{goHome()}}>
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{setIsCartView(true)}}>
                <Text>{(!isCartUpdating)?"See Cart":"Updating Cart"}</Text>
            </TouchableOpacity>
        </View>
    )
    else return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>{logOut()}}>
                <Text>{logOutText}</Text>
            </TouchableOpacity>

            <View>
                <CartItems/>
            </View>

            <Text>Cart</Text>
            <TouchableOpacity style={styles.button} onPress={()=>{goHome()}}>
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{setIsCartView(false)}}>
                <Text>Return to Orders {/*Might need to rename this */}</Text> 
            </TouchableOpacity>
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
        width: 200,
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