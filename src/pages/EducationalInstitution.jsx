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
import { EducationalInstitutionView } from '../components/Educational_institution/EducationalInstitutionView';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';

export const EducationalInstitution = () => {
    const [educational_institution, set_educational_institution] = useState([])
    const [show, setShow] = useState(false);
    const [name_of_school, set_name_of_school] = useState(null)
    const [errors, setErrors] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true)
    const auth = useAuth()
    const navigation = useNavigate()
    useEffect(() => {
        if(!auth.user)
            navigation('/signin')
        View_educational_institution()
    }, [])
    
    const View_educational_institution = async() =>{
        await supabase
        .from('educational_institution')
        .select('*').then((data)=>{
            set_educational_institution(data.data)
            setLoading(false)
        })
    }

    const Add_educational_institution = async() =>{
        await supabase
        .from('educational_institution')
        .insert([
            { name_of_school: name_of_school },
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
        <h1 style={{marginTop:'2rem'}}>Учебное учреждение</h1>
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
                <th>Наименование учебного учреждения</th>
            </tr>
            </thead>
            <tbody>
                <EducationalInstitutionView educational_institution={educational_institution}/>
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
                <Form.Label>Наименование учебного учреждения</Form.Label>
                <Form.Control type="text" placeholder="Наименование учебного учреждения" onChange={(e) => {set_name_of_school(e.target.value)}} value={name_of_school}/>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={Add_educational_institution}>
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
