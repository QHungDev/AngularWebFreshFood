import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import React from 'react'
import {SliderBox} from 'react-native-image-slider-box'
import { COLORS } from '../../constants'
const Carousel = () => {
    const slider=[
        "https://localhost:7265/api/picture/banner1.jpg",
        "https://localhost:7265/api/picture/banner2.jpg",
        "https://localhost:7265/api/picture/banner3.jpg"
    ]
  return (
    <View style={styles.carouselContainer}>
        <SliderBox
            images={slider}
           dotColor = {COLORS.primary}
           inactiveDotColor = {COLORS.secondary}
           ImageCocomponentStyle = {{borderRadius:20, width:'95%', marginTop:15}}
           autoplay
           circleLoop
        />
    </View>
  )
}
const styles = StyleSheet.create({
    carouselContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Carousel