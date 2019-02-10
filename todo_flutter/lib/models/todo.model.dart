class Todo {
  final int id;
  String content;
  String status;

  Todo({this.id, this.content, this.status});

  factory Todo.fromJson(Map<String, dynamic> json) {
    return Todo(
      id: json['id'],
      content: json['content'],
      status: json['status']
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'content': content,
      'status': status
    };
  }
}