import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Card, CardBody, CardTitle } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class TodosList extends Component {
    constructor(props) {
        super(props);
        this.showingStatus = 'OPEN';
        this.state = { todos: [], isLoading: true };
        this.remove = this.remove.bind(this);
        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('api/todos')
            .then(response => response.json())
            .then(data => this.setState({ todos: data, isLoading: false }));
    }

    filter() {
        this.showingStatus = this.showingStatus === 'OPEN' ? 'DONE' : 'OPEN';
        this.setState({ todos: this.state.todos });
    }

    async remove(id) {
        await fetch(`api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTodos = [...this.state.todos].filter(todo => todo.id !== id);
            this.setState({ todos: updatedTodos });
        })
    }

    async conclude(id) {
        const todo = [...this.state.todos].find(todo => todo.id === id);

        await fetch(`api/todos/${id}/mark-as-done`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        }).then(response => response.json())
            .then(data => {
                const todos = [...this.state.todos];
                let index = todos.map(todo => todo.id).indexOf(id);
                todos[index] = data;
                this.setState({ todos: todos });
            });
    }

    render() {
        const { todos, isLoading } = this.state;

        if (isLoading) {
            return <p>Carregando Lista de Afazeres...</p>;
        }

        const todosList = todos.filter(todo => todo.status === this.showingStatus).map(todo => {
            return <tr key={todo.id}>
                <td style={{ whiteSpace: 'nowrap' }}>{todo.content}</td>
                <td>{todo.status === 'OPEN' ? "Não Concluído" : "Concluído"}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" className="btn-round btn-icon" color="info" tag={Link} to={"/todos/" + todo.id} title="Editar">
                            <i className="tim-icons icon-pencil"></i>
                        </Button>
                        <Button size="sm" className="btn-round btn-icon" color="success" disabled={todo.status === 'DONE'} onClick={() => this.conclude(todo.id)} title="Concluir e Arquivar">
                            <i className="tim-icons icon-check-2"></i>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <React.Fragment>
                <AppNavbar></AppNavbar>
                <Container fluid>
                    <div className="float-right">
                        <Button color="info" size="sm" className="btn-icon" title={this.showingStatus === 'OPEN' ? 'Mostrar Arquivados' : 'Mostrar Não Concluídos'} onClick={() => this.filter()}>
                            <i className={this.showingStatus === 'OPEN' ? 'tim-icons icon-bag-16' : 'tim-icons icon-notes'}></i>
                        </Button>
                        <Button color="success" size="sm" className="btn-icon" tag={Link} to="/todos/new" title="Adicionar Novo Afazer">
                            <i className="tim-icons icon-simple-add"></i>
                        </Button>
                    </div>
                    <Card>
                        <CardBody>
                            <CardTitle>Lista de Afazeres</CardTitle>
                            <Table responsive>
                                <thead className="text-primary">
                                    <tr>
                                        <th>Conteúdo</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todosList}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Container>
            </React.Fragment>
        );
    }
}

export default TodosList;