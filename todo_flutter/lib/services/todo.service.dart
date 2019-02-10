import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/todo.model.dart';

class TodoService {
  final String apiUrl = 'http://192.168.1.189:8080/';

  Future<List<Todo>> getAll() async {
    final response = await http.get('${this.apiUrl}/api/todos');

    if (response.statusCode == 200) {
      List<dynamic> aux = jsonDecode(response.body) as List<dynamic>;
      return aux.map((data) => Todo.fromJson(data)).toList();
    } else {
      throw Exception('Falha ao recuperar afazeres');
    }
  }

  Future<Todo> add(Todo todo) async {
    final response = await http.post('${this.apiUrl}/api/todos', body: jsonEncode(todo), headers: {'Content-Type': 'application/json'});

    if (response.statusCode == 200) {
      return Todo.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Falha ao adicionar afazer.');
    }
  }

  Future<Todo> update(int id, Todo todo) async {
    final response = await http.put('${this.apiUrl}/api/todos/${id}', body: todo);

    if (response.statusCode == 200) {
      return Todo.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Falha ao atualizar afazer.');
    }
  }

  Future<Todo> markAsDone(int id) async {
    final response = await http.put('${this.apiUrl}/api/todos/${id}/mark-as-done');

    if (response.statusCode == 200) {
      return Todo.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Falha ao concluir afazer');
    }
  }


  Future<Todo> getOne(id) async {
    final response = await http.get('${this.apiUrl}/api/todos/${id}');

    if (response.statusCode == 200) {
      return Todo.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Afazer não encontrado');
    }
  }


  Future<void> deleteOne(int id) async {
    final response = await http.delete('${this.apiUrl}/api/todos/${id}');

    if (response.statusCode != 200) {
      throw Exception('Falha ao excluir afazer.');
    }
  }
}