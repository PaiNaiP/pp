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
import { ApplicantsspecialityView } from '../components/Applicantsspeciality/ApplicantsspecialityView';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';

export const Applicantsspeciality = () => {
    const [applicant_s_speciality, setApplicant_s_speciality] = useState([])
    const [show, setShow] = useState(false);
    const [applicants_id, set_applicants_id] = useState([])
    const [speciality_id, set_speciality_id] = useState([])
    const [applicants, set_applicants] = useState([])
    const [speciality, set_speciality] = useState([])
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
        handleViewApplicants()
        handleViewSpeciality()
    }, [])
    
    const handleViewApplicants=async()=>{
        let { data: ap } = await supabase
        .from('applicants')
        .select('*')
        set_applicants_id(ap)
    }

    const handleViewSpeciality=async()=>{
        let { data: sp } = await supabase
        .from('speciality')
        .select('*')
        set_speciality_id(sp)
    }

    const ViewRoles = async() =>{
        await supabase
        .from('applicant_s_speciality')
        .select('*').then((data)=>{
            setApplicant_s_speciality(data.data)
            setLoading(false)
        })
    }

    const AddRoles = async() =>{
        await supabase
        .from('applicant_s_speciality')
        .insert([
            { applicants_id: applicants, 
            speciality_id: speciality},
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
        <h1 style={{marginTop:'2rem'}}>Специальность аббитуриента</h1>
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
                <th>Аббитуриент</th>
                <th>Специальность</th>
            </tr>
            </thead>
            <tbody>
                <ApplicantsspecialityView applicant_s_speciality={applicant_s_speciality}/>
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
            <Form.Group className="mb-3">
                <Form.Label>Аббитуриенты</Form.Label>
                <Form.Select onChange={(e)=>set_applicants(e.target.value)}>
                    {applicants_id.map(ap=>
                        <option key={ap.id_applicants} value={ap.id_applicants}>{ap.surname} {ap.name} {ap.lastname}</option>
                    )}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Специальность</Form.Label>
                <Form.Select onChange={(e)=>set_speciality(e.target.value)}>
                    {speciality_id.map(sp=>
                        <option key={sp.id_speciality} value={sp.id_speciality}>{sp.name_of_speciality}</option>
                    )}
                </Form.Select>
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
