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
import { AchievementsView } from '../components/Achievements/AchievementsView';
import { useAuth } from '../components/auth';
import { useNavigate } from 'react-router-dom';


export const Achievements = () => {
    const [achievements, setAchievements] = useState([])
    const [show, setShow] = useState(false);
    const [gto, setGTO] = useState(null)
    const [olympics, setOlympics] = useState(null)
    const [errors, setErrors] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true)
    const auth = useAuth()
    const navigation = useNavigate()
    useEffect(() => {
        if(!auth.user)
            navigation('/signin')
        ViewAchievements()
    }, [])
    
    const ViewAchievements = async() =>{
        await supabase
        .from('achievements')
        .select('*').then((data)=>{
            setAchievements(data.data)
            setLoading(false)
        })
    }

    const AddAchievements = async() =>{
        await supabase
        .from('achievements')
        .insert([
            { gto: gto,
                olympics: olympics},
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
        <h1 style={{marginTop:'2rem'}}>Достижения</h1>
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
                <th>ГТО</th>
                <th>Олимпиада</th>
            </tr>
            </thead>
            <tbody>
                <AchievementsView achievements={achievements}/>
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
                <Form.Label>ГТО</Form.Label>
                <Form.Control type="text" placeholder="Занятое место" onChange={(e) => {setGTO(e.target.value)}} value={gto}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Олимпиада</Form.Label>
                <Form.Control type="text" placeholder="Название олимпиады и занятое место" onChange={(e) => {setOlympics(e.target.value)}} value={olympics}/>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={AddAchievements}>
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
