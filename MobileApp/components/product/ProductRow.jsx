import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import style from './ProductRow.style';
import useFetch from '../../hook/useFetch';

const ProductRow = () => {
  const { data, isLoading, error } = useFetch();
  const product  =[1,2,3,4]
  return (
    <View style={style.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? ( 
        <Text>Something went wrong</Text>
        
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.productID} 
          renderItem={({ item }) => <ProductCardView item={item} />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};

export default ProductRow;
