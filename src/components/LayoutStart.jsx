import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image1 from '../Frame.svg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from './auth';

export const LayoutStart = ({children}) => {
    const auth = useAuth()
  return (
    <div>
        <Navbar bg="light" expand="lg">
        <Container>
        <Row style={{width:'100%'}}>
        <Col><img src={image1} style={{width:'7rem'}} alt="" /></Col>
        <Col md="auto"></Col>
        <Col xs lg="2">
        {auth.user ?
            <Nav.Link onClick={auth.Logout} style={{marginTop:'7px'}}>Выйти из аккаунта</Nav.Link>
        :
            <Nav.Link href="/signin" style={{marginTop:'7px'}}>Авторизация</Nav.Link>
        }
        </Col>
        </Row>
        </Container>
        </Navbar>
        <main>
            {children}
        </main>
    </div>
  )
}
