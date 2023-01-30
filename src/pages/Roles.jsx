import React, { useEffect } from 'react'
import { Layout } from '../components/Layout'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import supabase from '../server';
import { useState } from 'react';
import { RolesView } from '../components/Roles/RolesView';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';

export const Roles = () => {

    const [roles, setRoles] = useState([])
    const [show, setShow] = useState(false);
    const [rolesName, setRolesName] = useState(null)
    const [errors, setErrors] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true)
    const auth = useAuth()
    const navigation = useNavigate()
    useEffect(() => {
        if(!auth.user)
            navigation('/signin')
        ViewRoles()
    }, [])
    
    const ViewRoles = async() =>{
        await supabase
        .from('roles')
        .select('*').then((data)=>{
            setRoles(data.data)
            setLoading(false)
        })
    }

    const AddRoles = async() =>{
        await supabase
        .from('roles')
        .insert([
            { name_of_role: rolesName },
        ]).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

  return (
    <>
    <Layout />
    <Container>
        <Row>
        <h1 style={{marginTop:'2rem'}}>Роль</h1>
        </Row>
    </Container>
    <Container style={{marginTop:'1rem'}}>
        <Row>
        <Col sm={2}>
            <Button variant="dark" onClick={handleShow}>Добавить</Button>
        </Col>
        <Col sm={10} style={{marginLeft:'-3rem'}}>
        {loading&&(
            <div style={{display:'flex', marginLeft:'-13.6rem'}}>
                <Spinner animation="border" style={{margin:'0 auto'}}/>
            </div>
        )}
        {!loading&&(
            <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>#</th>
                <th>Название роли</th>
            </tr>
            </thead>
            <tbody>
                <RolesView roles={roles}/>
            </tbody>
            </Table>
        )}
        </Col>
        </Row>
    </Container>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Добавление</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {errors&&(
                <Alert variant="danger">
                    {errors}
                </Alert>
            )}
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Наименование роли</Form.Label>
                <Form.Control type="text" placeholder="Наименование роли" onChange={(e) => {setRolesName(e.target.value)}} value={rolesName}/>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={AddRoles}>
                Сохранить
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Закрыть
            </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}
