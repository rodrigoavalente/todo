import 'package:flutter/material.dart';

import '../models/todo.model.dart';
import '../services/todo.service.dart';

class TodoFormWidget extends StatefulWidget {
  final Todo todo;

  TodoFormWidget({Key key, this.todo}): super(key: key);

  @override
  State<StatefulWidget> createState() {
    return TodoFormState(todo: todo);
  }
}

class TodoFormState extends State<TodoFormWidget> {
  Todo todo;
  final _todoService = TodoService();
  final _contentController = TextEditingController();

  TodoFormState({Key key, this.todo}): super() {
    _contentController.text = this.todo.content;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: todo.id != null ? Text('Editar Afazer') : Text('Adicionar Afazer')
      ),
      body: _buildForm()
    );
  }

  Widget _buildForm() {
    return Center(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _contentController,
              decoration: InputDecoration(
                  labelText: 'Conteúdo a ser feito'
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: ButtonBar(
              children: [
                RaisedButton(
                  onPressed: () {
                    todo.content = _contentController.text;
                    _todoService.add(todo).then((newTodo) {
                      Navigator.pop(context, newTodo);
                    });
                  },
                  child: Text('Salvar', style: TextStyle(color: Colors.white),),
                  color: Colors.lightGreen,
                ),
                RaisedButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: Text('Cancelar', style: TextStyle(color: Colors.white),),
                  color: Colors.red
                )

              ],
            ),
          )
        ]
      )

    );
  }
}