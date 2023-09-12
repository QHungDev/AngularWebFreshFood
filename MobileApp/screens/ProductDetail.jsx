import { View, Text, TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'
import { useRoute } from '@react-navigation/native'
import styles from './ProductDetail.style'
import { Ionicons,SimpleLineIcons,MaterialCommunityIcons,Fontisto } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants'
import { WebView } from 'react-native';
const ProductDetail =  ({ navigation }) => {
   
    const route = useRoute();
    const {item} = route.params;
    const [count,setcount] = useState(1);
    const increment = () =>{
        setcount(count+1);
    }
    const decrement = () =>{
        if(count>1)
        {
            setcount(count-1);
        }
    }

    const originalPath =item.avatar;
    const newPath = originalPath.replace("/FileUploads/Product/Avatar/", "https://localhost:7265/api/product/");
    return (
        <View style={styles.container}>
            <View style={styles.upperRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle" size={30} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='heart' size={30} onPress={() => { }} />
                </TouchableOpacity>
            </View>
            <Image
                source={{ uri: newPath }}
                style={styles.image}
            />
            <View style={styles.details}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.priceWrapper}>
                    <Text style={styles.price}>{item.price}VND</Text>
                    </View>
                </View>
                <View style={styles.rattingRow}>
                    <View style={styles.rating}>
                       {[1,2,3,4,5].map((index)=>(
                            <Ionicons
                            key={index}
                            name="star"
                            size={24}
                            color="gold"/>
                        ))}
                        <Text style={styles.ratingText}>(4,9)</Text>
                    </View>

                    <View style={styles.rating}>
                       <TouchableOpacity onPress={()=>increment()}>
                            <SimpleLineIcons
                            name='plus' size={20}
                            />
                       </TouchableOpacity >
                        <Text style={styles.ratingText}>{count}</Text>

                        <TouchableOpacity onPress={()=>decrement()}>
                            <SimpleLineIcons
                            name='minus' size={20}
                            />
                       </TouchableOpacity>
                    </View>

                    
                </View>
                <View style={styles.descriptionWraper}>
                    
                        <Text style={styles.description}>Description</Text>
                        <Text style={styles.descText}>{item.content}</Text>
                    </View>


                    <View style={{marginBottom:SIZES.small}}>
                        <View style={styles.location}>
                            <View style={{flexDirection:"row"}}>
                            <Ionicons name='location-outline'size={20} />
                            <Text>  Chi nhánh</Text>
                        </View>
                    <View style={{flexDirection:"row"}}>
                       <MaterialCommunityIcons name="truck-delivery-outline" size={20}/>
                            <Text>  Free Ship</Text>
                        </View>
                    </View>
            </View>
            <View style={styles.cartRow}>
                <TouchableOpacity onPress={()=>{}} style={styles.cartBtn}>
                    <Text style={styles.cartTitle}>BUY NOW</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{}} style={styles.addCart}>
                   <Fontisto name="shopping-bag"size={22} color={COLORS.lightWhite} />
                </TouchableOpacity>
            </View>
        </View >
        </View >
        
    );
};

export default ProductDetail