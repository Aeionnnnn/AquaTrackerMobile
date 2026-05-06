import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

export default function MakeAnOrder(){
    const [logOutText, setLogOutText] = useState("Log Out");
    const [cart, setCart] = useState([])
    const [itemsProd, setItemsProd] = useState([]);
    const [isItemsLoaded, setIsItemsLoaded] = useState(0);

    const Items = () => {
        if(isItemsLoaded){
            return itemsProd.map((item, key)=>{
                return(
                    <View style={styles.itemCard} key={key}>
                        <Text>{item.ItemName}</Text>
                        <Text>Php {item.Price}</Text>
                        <Text>{item.Description}</Text>
                        <Text> Number of Orders {/*Please make guards for non numeric input */}
                            <TextInput style={styles.input} keyboardType='numeric'/> 
                            <TouchableOpacity style={styles.button} onPress={()=>{addToCart({
                                
                            })}}><Text>Add to Cart</Text></TouchableOpacity>
                        </Text>
                    </View>
                )
            })
        }else return(<Text>Items Loading...</Text>)        
    }

    async function initItems(){
        const {data: dataItems, error: errorItems} = await supabase.from("items").select();

        if(errorItems){console.log(errorItems)}

        if(dataItems) {
            console.log(dataItems)
            setItemsProd(dataItems);
            setIsItemsLoaded(1);
        }
    }

    async function logOut(){
        setLogOutText("Logging Out...");
        await supabase.auth.signOut();

        router.replace("/")

        setLogOutText("Log Out");
    }

    function addToCart(){

    }

    function goHome(){router.replace("/")}

    useEffect(()=>{initItems()},[])

    //--------------------------VIEWS-----------------------------------//
    
    return(
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
            <TouchableOpacity style={styles.button} onPress={()=>{}}>
                <Text>See Cart</Text>
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