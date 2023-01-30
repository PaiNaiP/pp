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
import { SpecialityView } from '../components/Speciality/SpecialityView';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';

export const Speciality = () => {
    const [speciality, setSpeciality] = useState([])
    const [show, setShow] = useState(false);
    const [name_of_speciality, set_name_of_speciality] = useState(null)
    const [passing_score, set_passing_score] = useState(0)
    const [number_of_places_on_the_budget, set_number_of_places_on_the_budget] = useState(0)
    const [number_of_extrabudgetary_place, set_number_of_extrabudgetary_place] = useState(0)
    const [errors, setErrors] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true)
    const auth = useAuth()
    const navigation = useNavigate()
    useEffect(() => {
        if(!auth.user)
            navigation('/signin')
        ViewSpeciality()
    }, [])
    
    const ViewSpeciality = async() =>{
        await supabase
        .from('speciality')
        .select('*').then((data)=>{
            setSpeciality(data.data)
            setLoading(false)
        })
    }

    const AddSpeciality = async() =>{
        await supabase
        .from('speciality')
        .insert([
            { name_of_speciality: name_of_speciality,
            passing_score: passing_score,
            number_of_places_on_the_budget: number_of_places_on_the_budget,
            number_of_extrabudgetary_place: number_of_extrabudgetary_place},
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
        <h1 style={{marginTop:'2rem'}}>Специальность</h1>
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
                <th>Наименование специальности</th>
                <th>Проходной балл</th>
                <th>Количество бюджетных мест</th>
                <th>Количество внебюджетных мест</th>
            </tr>
            </thead>
            <tbody>
                <SpecialityView speciality={speciality}/>
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
                <Form.Label>Наименование специальности</Form.Label>
                <Form.Control type="text" placeholder="Наименование специальности" onChange={(e) => {set_name_of_speciality(e.target.value)}} value={name_of_speciality}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Проходной балл</Form.Label>
                <Form.Control type="number" placeholder="Проходной балл" onChange={(e) => {set_passing_score(e.target.value)}} value={passing_score}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Количество бюджетных мест</Form.Label>
                <Form.Control type="number" placeholder="Количество бюджетных мест" onChange={(e) => {set_number_of_places_on_the_budget(e.target.value)}} value={number_of_places_on_the_budget}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Количество внебюджетных мест</Form.Label>
                <Form.Control type="number" placeholder="Количество внебюджетных мест" onChange={(e) => {set_number_of_extrabudgetary_place(e.target.value)}} value={number_of_extrabudgetary_place}/>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={AddSpeciality}>
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
