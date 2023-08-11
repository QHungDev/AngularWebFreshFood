import 'package:mobile_app/models/product.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

class APIServices {
  static Future fetchProducts() async {
    String urlString = "https://10.0.2.2:7265/api/product/get";
    Uri uri = Uri.parse(urlString);
    await http.get(uri);
  }

  // static Future postProduct(ProductResponse Products) async {
  //   Map<String, String> header = {
  //     'Content-type': 'application/json',
  //     'Accept': 'application/json'
  //   };
  //   var myStudent = Products.toJson();
  //   var studentBody = json.encode(myStudent);
  //   var res = await http.post('http://192.168.0.7:5005/api/Student',
  //       headers: header, body: studentBody);
  //   print(res.statusCode);
  //   return res.statusCode;
  // }
}
