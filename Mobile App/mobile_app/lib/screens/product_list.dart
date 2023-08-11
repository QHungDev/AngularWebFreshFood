import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/api.services.dart';
import 'package:mobile_app/models/product.dart';
// import 'package:studentapp/ui/addstudent.dart';

class ProductList extends StatefulWidget {
  ProductList({Key? key}) : super(key: key);

  @override
  _ProductListState createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  var products = <ProductResponse>[];

  _getProducts() {
    APIServices.fetchProducts().then((response) {
      setState(() {
        Iterable list = json.decode(response.body);
        products =
            list.map((model) => ProductResponse.fromJson(model)).toList();
      });
    });
  }

  @override
  void initState() {
    super.initState();
    _getProducts();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: _buidFloatingButton(),
      appBar: AppBar(),
      body: products == null
          ? Center(child: Text('Empty'))
          : ListView.builder(
              itemCount: products.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(products[index].title),
                );
              },
            ),
    );
  }

  Widget _buildAppBar(BuildContext context) {
    return AppBar(
      title: Text("Student APP"),
    );
  }

  Widget _buidFloatingButton() {
    return FloatingActionButton(
      child: Icon(Icons.person_add),
      onPressed: () {
        //Call new ui to add student.
        // Navigator.push(context, MaterialPageRoute(builder: (context)=>AddStudent()));
      },
    );
  }
}
