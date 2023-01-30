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
import { ApplicantsView } from '../components/Applicants/ApplicantsView';
import { useAuth } from '../components/auth';
import { useNavigate } from 'react-router-dom';

export const Applicants = () => {
    const [applicants, setApplicants] = useState([])
    const [show, setShow] = useState(false);
    const [surname, set_surname] = useState(null)
    const [name, set_name] = useState(null)
    const [lastname, set_lastname] = useState(null)
    const [date_of_birth, set_date_of_birth] = useState(null)
    const [gender, set_gender] = useState(null)
    const [email, set_email] = useState(null)
    const [phone_number, set_phone_number] = useState(null)
    const [photo_of_application, set_photo_of_application] = useState(null)
    const [roles_id, set_roles_id] = useState([])
    const [roles, set_roles] = useState([])
    const [achievements_id, set_achievements_id] = useState([])
    const [achievements, set_achievements] = useState([])
    const [passport_id, set_passport_id] = useState([])
    const [passport, set_passport] = useState([])
    const [certificates_id, set_certificates_id] = useState([])
    const [certificates, set_certificates] = useState([])
    const [errors, setErrors] = useState(null)
    const [loading_scan_two, set_loading_scan_two] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true)
    const auth = useAuth()
    const navigation = useNavigate()
    useEffect(() => {
        if(!auth.user)
            navigation('/signin')
        ViewApplicants()
        handleViewRoles()
        handleViewAchievements()
        handleViewPassport()
        handleViewCertificates()
    }, [])
    
    const handleViewRoles=async()=>{
        let { data: rol } = await supabase
        .from('roles')
        .select('*')
        set_roles_id(rol)
    }

    const handleViewAchievements=async()=>{
        let { data: ach } = await supabase
        .from('achievements')
        .select('*')
        set_achievements_id(ach)
    }

    const handleViewPassport=async()=>{
        let { data: pas } = await supabase
        .from('passport')
        .select('*')
        set_passport_id(pas)
    }

    const handleViewCertificates=async()=>{
        let { data: cer } = await supabase
        .from('certificates')
        .select('*')
        set_certificates_id(cer)
    }

    const ViewApplicants = async() =>{
        await supabase
        .from('applicants')
        .select('*').then((data)=>{
            setApplicants(data.data)
            setLoading(false)
        })
    }

    const AddApplicants = async() =>{
        set_loading_scan_two(true)
        const avatarFile = photo_of_application
        await supabase
        .storage
        .from('picture')
        .upload('photo_of_application/'+photo_of_application.name, avatarFile, {
            cacheControl: '3600',
            upsert: false
        }).then(async(ph)=>{
            set_loading_scan_two(false)
            if(ph.error)
                setErrors(ph.error.message)
            else {
                await supabase
                .from('applicants')
                .insert([
                    { surname: surname,
                    name: name,
                    lastname: lastname,
                    date_of_birth: date_of_birth,
                    gender: gender,
                    email: email,
                    phone_number: phone_number,
                    photo_of_application: 'https://ehdqdvcwzsqdwxffghow.supabase.co/storage/v1/object/public/picture/' + ph.data.path,
                    roles_id: roles,
                    achievements_id: achievements,
                    passport_id: passport,
                    certificates_id: certificates
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
        <h1 style={{marginTop:'2rem'}}>Аббитуриенты</h1>
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
                <th>Дата рождения</th>
                <th>Пол</th>
                <th>Почта</th>
                <th>Номер телефона</th>
                <th>Фотография</th>
                <th>Достижения</th>
                <th>Паспортные данные</th>
                <th>Аттестат</th>
            </tr>
            </thead>
            <tbody>
                <ApplicantsView applicants={applicants}/>
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
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control type="date" placeholder="Дата рождения" onChange={(e) => {set_date_of_birth(e.target.value)}} value={date_of_birth}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Пол</Form.Label>
                <Form.Select onChange={(e)=>set_gender(e.target.value)}>
                    <option value="Мужской">Мужской</option>
                    <option value="Женский">Женский</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Почта</Form.Label>
                <Form.Control type="email" placeholder="Почта" onChange={(e) => {set_email(e.target.value)}} value={email}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control type="text" placeholder="Номер телефона" onChange={(e) => {set_phone_number(e.target.value)}} value={phone_number}/>
            </Form.Group>
            {loading_scan_two&&(
                <div style={{display:'flex', marginBottom:'20px'}}>
                    <Spinner animation="border" style={{margin:'0 auto'}}/>
                </div>
            )}
            {!loading_scan_two&&(
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Фото</Form.Label>
                    <Form.Control type="file" placeholder="Фото аббитуриента" onChange={(e) => {set_photo_of_application(e.target.files[0])}}/>
                </Form.Group>
            )}
            <Form.Group className="mb-3">
                <Form.Label>Роль</Form.Label>
                <Form.Select onChange={(e)=>set_roles(e.target.value)}>
                    {roles_id.map(rol=>
                        <option key={rol.id_roles} value={rol.id_roles}>{rol.name_of_role}</option>
                    )}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Достижения</Form.Label>
                <Form.Select onChange={(e)=>set_achievements(e.target.value)}>
                    {achievements_id.map(ach=>
                        <option key={ach.id_achievements} value={ach.id_achievements}>{ach.gto}, {ach.olympics}</option>
                    )}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Паспортные данные</Form.Label>
                <Form.Select onChange={(e)=>set_passport(e.target.value)}>
                    {passport_id.map(pas=>
                        <option key={pas.id_passport} value={pas.id_passport}>{pas.passport_number} {pas.passport_series}</option>
                    )}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Аттестат</Form.Label>
                <Form.Select onChange={(e)=>set_certificates(e.target.value)}>
                    {certificates_id.map(cer=>
                        <option key={cer.id_certificates} value={cer.id_certificates}>{cer.number_of_certificates}</option>
                    )}
                </Form.Select>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={AddApplicants}>
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
