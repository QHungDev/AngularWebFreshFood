// import 'dart:convert';
// import 'dart:developer';
// import 'package:flutter/material.dart';
// import 'package:mobile_app/models/product.dart';
// import 'package:convert/convert.dart';
// import 'package:http/http.dart' as http;

// abstract class IProductRepository {
//   Future<ProductResponse> fetchProductList();
// }

// class ProductRepository implements IProductRepository {
//   final _host = "https://10.0.2.2:7265/api/product/";
//   final Map<String, String> _header = {
//     "Accept": "application/json",
//     "Content-type": "application/json",
//   };
//   @override
//   Future<ProductResponse> fetchProductList() async {
//     var getProductListUrl = _host + "get";
//     var results =
//         await http.get(Uri.parse(getProductListUrl), headers: _header);
//     final jsonObject = json.decode(results.body);
//     var response = ProductResponse.fromJson(jsonObject);
//     return response;
//   }
// }
