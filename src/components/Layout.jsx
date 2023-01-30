import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image1 from '../Frame.svg'

export const Layout = () => {
  return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/"><img style={{width:'5rem'}} src={image1} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/roles">Роль</Nav.Link>
                <Nav.Link href="/achievements">Достижения</Nav.Link>
                <Nav.Link href="/speciality">Специальность</Nav.Link>
                <Nav.Link href="/passport">Паспорт</Nav.Link>
                <Nav.Link href="/educational_institution">Образовательное учреждение</Nav.Link>
                <Nav.Link href="/certificates">Аттестаты</Nav.Link>
                <Nav.Link href="/employee">Сотрудники</Nav.Link>
                <Nav.Link href="/applicants">Аббитуриенты</Nav.Link>
                <Nav.Link href="/applicant_s_speciality">Специальности аббитуриента</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
  )
}
