import 'package:flutter/material.dart';

import './models/todo.model.dart';
import './services/todo.service.dart';
import './widgets/todo.list.dart';

void main() => runApp(MyApp(todos: TodoService().getAll()));

class MyApp extends StatelessWidget {
  final Future<List<Todo>> todos;

  MyApp({Key key, this.todos}) : super(key: key);

  @override
  Widget build(BuildContext build) {
    return MaterialApp(
      title: 'Lista de Afazeres',
      theme: ThemeData(
        primarySwatch: Colors.blue
      ),
      home: Scaffold(
        body: TodoListViewWidget(todos: todos)
      )
    );
  }
}