import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar></AppNavbar>
                <Container fluid>
                    <Button color="link"><Link to="/todos">Gerenciar Afazeres</Link></Button>
                </Container>
            </div>
        )
    }
}

export default Home;