import 'package:flutter/material.dart';

import './todo.form.dart';

import '../models/todo.model.dart';
import '../services/todo.service.dart';

class TodoListViewWidget extends StatefulWidget {
  final Future<List<Todo>> todos;

  TodoListViewWidget({Key key, this.todos}): super(key: key);

  @override
  State<StatefulWidget> createState() {
    return TodoListViewState(todos: todos);
  }
}

class TodoListViewState extends State<TodoListViewWidget> {
  Future<List<Todo>> todos;
  final _biggerFont = const TextStyle(fontSize: 18.0);
  final _todoService = TodoService();
  String _showingStatus = 'OPEN';

  TodoListViewState({Key key, this.todos}): super();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Lista de Afazeres'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: () {
                setState(() {
                  todos = _todoService.getAll();
                });
            },
          ),
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () => _addOrEditTodo(context),
          ),
          IconButton(
            icon: _showingStatus == 'OPEN' ? Icon(Icons.archive) : Icon(Icons.check_circle),
            onPressed: () {
              setState(() {
                _showingStatus == 'OPEN' ? _showingStatus = 'DONE' : _showingStatus = 'OPEN';
              });
            }
          ),

        ]
      ),
      body: _buildTodos(),
    );
  }

  Widget _buildTodos() {
    return new Center(
      child: FutureBuilder(
          future: todos,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              final items = snapshot.data.where((todo) => todo.status == _showingStatus).toList();
              return new ListView.separated(
                  itemCount: items.length,
                  padding: const EdgeInsets.all(10.0),
                  separatorBuilder: (context, index) => Divider(),
                  itemBuilder: (context, i) {
                      return _buildRow(items[i], i);

                  }
              );

            } else if (snapshot.hasError) {
              return Text('Oops, algo aconteceu e não consegui carregar os afazeres. Erro: ${snapshot.error}');
            }
            return CircularProgressIndicator();
          }
      ),
    );
  }

  Widget _buildRow(Todo todo, int index) {
    return new ListTile(
      leading: todo.status == 'OPEN' ? Icon(Icons.error_outline, color: Colors.red) : Icon(Icons.done_outline, color: Colors.green,),
      title: new Text(todo.content, style: _biggerFont),
      onTap: () {
        this._todoService.markAsDone(todo.id).then((_) {
          setState(() {
            todos = _todoService.getAll();
            Scaffold.of(context).showSnackBar(SnackBar(content: Text('Marcado como concluído e arquivado.', textAlign: TextAlign.center,)));
          });
        });
      },
      onLongPress: () => _addOrEditTodo(context, updateTodo: todo)
    );
  }

  _addOrEditTodo(BuildContext context, {Todo updateTodo}) async {
    final result = await Navigator.push(context, MaterialPageRoute(builder: (context) => TodoFormWidget(todo: updateTodo != null ? updateTodo : Todo(status: 'OPEN'))));

    if (result != null) {
      setState(() {
        todos.then((todos) {
          int index = todos.indexWhere((item) => item.id == result.id);
          if (index > -1) {
            todos[index] = result;
          } else {
            todos.add(result);
          }
        });
      });
    }
  }
}
