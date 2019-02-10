import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Card, CardBody, CardTitle } from 'reactstrap';
import AppNavbar from './AppNavbar';

class TodoEdit extends Component {
    emptyTodo = {
        content: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyTodo
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const todo = await (await fetch(`/api/todos/${this.props.match.params.id}`)).json();
            this.setState({ item: todo });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;

        if (item.id) {
            await fetch(`/api/todos/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
        } else {
            await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });
        }

        this.props.history.push('/todos');
    }

    render() {
        const { item } = this.state;
        const title = <h2>{item.id ? 'Editar Afazer' : 'Adicionar Novo Afazer'}</h2>;

        return (
            <div>
                <AppNavbar></AppNavbar>
                <Container>
                    <Card>
                        <CardBody>
                            <CardBody>
                                <CardTitle>{title}</CardTitle>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="content">Conteúdo</Label>
                                        <Input type="text" name="content" id="content" value={item.content || ''}
                                            onChange={this.handleChange} autoComplete="content"></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button color="info" type="submit">Salvar</Button>
                                        <Button color="secondary" tag={Link} to="/todos">Cancelar</Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default withRouter(TodoEdit);