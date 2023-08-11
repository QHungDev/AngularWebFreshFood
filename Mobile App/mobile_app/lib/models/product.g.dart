// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'product.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ProductResponse _$ProductResponseFromJson(Map<String, dynamic> json) =>
    ProductResponse(
      json['productID'] as int,
      json['avatar'] as String,
      json['thumb'] as String,
      json['title'] as String,
      json['description'] as String,
      json['specification'] as String,
      json['content'] as String,
      json['warranty'] as String,
      json['accessories'] as String,
      (json['price'] as num).toDouble(),
      (json['oldPrice'] as num).toDouble(),
      json['quantity'] as int,
      json['imageList'] as String,
      json['position'] as int,
      json['status'] as bool,
      json['createTime'] as String,
      json['productCategoryID'] as int,
      json['createBy'] as String,
      json['createByNavigation'] as String,
      json['productCategory'] as String,
    );

Map<String, dynamic> _$ProductResponseToJson(ProductResponse instance) =>
    <String, dynamic>{
      'productID': instance.productID,
      'avatar': instance.avatar,
      'thumb': instance.thumb,
      'title': instance.title,
      'description': instance.description,
      'specification': instance.specification,
      'content': instance.content,
      'warranty': instance.warranty,
      'accessories': instance.accessories,
      'price': instance.price,
      'oldPrice': instance.oldPrice,
      'quantity': instance.quantity,
      'imageList': instance.imageList,
      'position': instance.position,
      'status': instance.status,
      'createTime': instance.createTime,
      'productCategoryID': instance.productCategoryID,
      'createBy': instance.createBy,
      'createByNavigation': instance.createByNavigation,
      'productCategory': instance.productCategory,
    };
