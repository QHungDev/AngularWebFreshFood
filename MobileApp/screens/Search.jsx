import { TouchableOpacity, View, Text, TextInput, FlatList,Image } from 'react-native'
import React,{useState} from 'react'
import styles from './search.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons"
import { Feather } from '@expo/vector-icons'
import { SIZES,COLORS } from '../constants';
import axios from 'axios';

const Search = () => {
    const[searchKey,setSerachKey] = useState("");
    const[searchResult,setSearchResult] = useState([]);
  
    const handleSearch = async() =>{
        try{
            const response =await axios.get(`https://demo.dataverse.org/api/search?q=${searchKey}`)
           setSearchResult(response.data)
        }catch(error){
        }
    }
    return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
                <TouchableOpacity>
                <Ionicons name="camera-outline" size={SIZES.xLarge} />
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchKey}
                        onChangeText={setSerachKey}
                        placeholder="Hãy nhập từ khóa tìm kiếm"
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn} onPress={()=>handleSearch()}>
                    <Feather name="search" size={24} style={styles.searchIcon} color={COLORS.offwhite}/>
                    </TouchableOpacity>
                    
                </View>
                
            </View>
            {searchResult.length === 0 ? (
                        <View style={{flex:1}}>
                            <Image 
                            source={require('../assets/images/Pose23.png')}
                            style={styles.searchImage}
                            />
                        </View>
                    ):(
                        <FlatList
                        data={searchResult}
                        keyExtractor={(item) => item.productID}
                        />
                    )}
    </SafeAreaView>
  );
}

export default Search