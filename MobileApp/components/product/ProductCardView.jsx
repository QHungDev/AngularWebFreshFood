import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './ProductCardView.style'
import {Image} from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
const ProductCardView = ({item}) => {
  const navigation = useNavigation()
  // const originalPath =item.avatar;
  // const newPath = originalPath.replace("/FileUploads/Product/Avatar/", "https://localhost:7265/api/product/");
  print(item.title)
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetail",{item})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* <Image
            source={{
              uri: newPath
             
            }}
            style={styles.image}
            
           /> */}
            
        </View>
        
        <View style={styles.details}>
          <Text style={styles.title}numberOfLines={1}>{item.title}</Text>
          <Text style={styles.supplier}numberOfLines={1}>{item.description}</Text>        
          <Text style={styles.price}>{item.price}VND</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
      <Ionicons name="add-circle" size={35} color={COLORS.primary}/>
        </TouchableOpacity>
      </View>
    
    </TouchableOpacity>
  )
}

export default ProductCardView