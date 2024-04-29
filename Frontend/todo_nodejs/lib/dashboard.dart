import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'login_page.dart'; // Assuming LoginPage is the name of your login page

class DashBoard extends StatefulWidget {
  final String token;

  const DashBoard({required this.token, Key? key}) : super(key: key);

  @override
  State<DashBoard> createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  late String email;

  @override
  void initState() {
    super.initState();
    Map<String, dynamic> jwDecodedToken = JwtDecoder.decode(widget.token);
    email = jwDecodedToken['email'];
  }

  void _logout() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('token'); // Clear token from SharedPreferences
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text('Dashboard'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: _logout,
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(email),
          ],
        ),
      ),
    );
  }
}

// import 'package:flutter/material.dart';
// import 'package:jwt_decoder/jwt_decoder.dart';
//
// import 'login_page.dart'; // Assuming LoginPage is the name of your login page
//
// class DashBoard extends StatefulWidget {
//   final token;
//   const DashBoard({@required this.token, Key? key}) : super(key: key);
//
//   @override
//   State<DashBoard> createState() => _DashBoardState();
// }
//
// class _DashBoardState extends State<DashBoard> {
//   late String email;
//
//   @override
//   void initState() {
//     super.initState();
//     Map<String, dynamic> jwDecodedToken = JwtDecoder.decode(widget.token);
//     email = jwDecodedToken['email'];
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         centerTitle: true,
//         title: Text('Dashboard'),
//         actions: [
//           IconButton(
//             icon: Icon(Icons.logout),
//             onPressed: () {
//               Navigator.pushAndRemoveUntil(
//                 context,
//                 MaterialPageRoute(builder: (context) => LoginPage()),
//                 (route) => false,
//               );
//             },
//           ),
//         ],
//       ),
//       body: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             Text(email),
//           ],
//         ),
//       ),
//     );
//   }
// }
