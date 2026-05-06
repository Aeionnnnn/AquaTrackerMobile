import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function OrderItem(props){
    const [inputNum, setInputNum] = useState(0)
    return(
        <View style={styles.itemCard}>
            <Text>{props.cargo.item.ItemName}</Text>
            <Text>Php {props.cargo.item.Price}</Text>
            <Text>{props.cargo.item.Description}</Text>
            <Text> Number of Orders {/*Please make guards for non numeric input */}
                <TextInput style={styles.input} keyboardType='numeric' 
                    placeholder='Number of Orders' placeholderTextColor={'grey'} onChangeText={(text)=>{setInputNum(text)}} 
                    value={(inputNum != 0)?inputNum:""}/> 
            </Text>
            <TouchableOpacity style={styles.button} 
                onPress={()=>{props.cargo.addToCart({num: parseInt(inputNum), id: props.cargo.item.ItemID}); setInputNum(0)}}>
               <Text>Add to Cart</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
    },
})