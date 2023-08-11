import 'package:json_annotation/json_annotation.dart';
import 'package:http/http.dart' as http;
part 'product.g.dart';

@JsonSerializable()
class ProductResponse {
  late final int productID;
  late final String avatar;
  late final String thumb;
  late final String title;
  late final String description;
  late final String specification;
  late final String content;
  late final String warranty;
  late final String accessories;
  late final double price;
  late final double oldPrice;
  late final int quantity;
  late final String imageList;
  late final int position;
  late final bool status;
  late final String createTime;
  late final int productCategoryID;
  late final String createBy;
  late final String createByNavigation;
  late final String productCategory;
  ProductResponse(
    this.productID,
    this.avatar,
    this.thumb,
    this.title,
    this.description,
    this.specification,
    this.content,
    this.warranty,
    this.accessories,
    this.price,
    this.oldPrice,
    this.quantity,
    this.imageList,
    this.position,
    this.status,
    this.createTime,
    this.productCategoryID,
    this.createBy,
    this.createByNavigation,
    this.productCategory,
  );
  factory ProductResponse.fromJson(Map<String, dynamic> json) =>
      _$ProductResponseFromJson(json);
  Map<String, dynamic> toJson() => _$ProductResponseToJson(this);
}
