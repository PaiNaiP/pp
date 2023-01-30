import React, { useEffect } from 'react'
import { Layout } from '../components/Layout'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import supabase from '../server';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import bcrypt from 'bcryptjs';
import { EmployeeView } from '../components/Employee/EmployeeView';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';

export const Employee = () => {
    const [employee, set_employee] = useState([])
    const [show, setShow] = useState(false);
    const [surname, set_surname] = useState(null)
    const [name, set_name] = useState(null)
    const [lastname, set_lastname] = useState(null)
    const [login, set_login] = useState(null);
    const [password, setPassword] = useState(null)
    const [roles_id, set_roles_id] = useState([])
    const [roles, set_roles] = useState([])
    const [errors, setErrors] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true)
    const auth = useAuth()
    const navigation = useNavigate()
    useEffect(() => {
        if(!auth.user)
            navigation('/signin')
        ViewEmployee()
        handleViewRoles()
    }, [])

    const handleViewRoles=async()=>{
        let { data: rol } = await supabase
        .from('roles')
        .select('*')
        set_roles_id(rol)
    }
    
    const ViewEmployee = async() =>{
        await supabase
        .from('employee')
        .select('*').then((data)=>{
            set_employee(data.data)
            setLoading(false)
        })
    }

    const AddEmployee = async() =>{
        await supabase.auth.signUp({
            email: login,
            password: password,
        }).then(async(err)=>{
            if(err.error){
                setErrors(err.error.message)
            }
            else{
                const hashedPassword = bcrypt.hashSync(password, 10);
                await supabase
                .from('employee')
                .insert([
                    { surname: surname,
                        name: name,
                        lastname: lastname,
                        login:login,
                        password: hashedPassword,
                        roles_id: roles
                    },
                ]).then((data)=>{
                    if(data.error)
                        setErrors(data.error.message)
                    else
                        window.location.reload()
                })
            }
        })
    }
  return (
    <>
    <Layout />
    <Container>
        <Row>
        <h1 style={{marginTop:'2rem'}}>Сотрудник</h1>
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
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Отчество</th>
                <th>Логин</th>
                <th>Роль</th>
            </tr>
            </thead>
            <tbody>
                <EmployeeView employee={employee}/>
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
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" placeholder="Имя" onChange={(e) => {set_name(e.target.value)}} value={name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control type="text" placeholder="Фамилия" onChange={(e) => {set_surname(e.target.value)}} value={surname}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Отчество</Form.Label>
                <Form.Control type="text" placeholder="Отчество" onChange={(e) => {set_lastname(e.target.value)}} value={lastname}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Логин</Form.Label>
                <Form.Control type="email" placeholder="Почта" onChange={(e) => {set_login(e.target.value)}} value={login}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Пароль" onChange={(e) => {setPassword(e.target.value)}} value={password}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Роль</Form.Label>
                <Form.Select onChange={(e)=>set_roles(e.target.value)}>
                    {roles_id.map(rol=>
                        <option key={rol.id_roles} value={rol.id_roles}>{rol.name_of_role}</option>
                    )}
                </Form.Select>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={AddEmployee}>
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
