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
import { CertificatesView } from '../components/Certificates/CertificatesView';
import { useAuth } from '../components/auth';
import { useNavigate } from 'react-router-dom';

export const Certificates = () => {
    const [certificates, set_certificates] = useState([])
    const [show, setShow] = useState(false);
    const [number_of_certificates, set_number_of_certificates] = useState(null)
    const [date_of_issue, set_date_of_issue] = useState(null)
    const [scan_of_certificates, set_scan_of_certificates] = useState(null)
    const [scan_of_certificate_application, set_scan_of_certificate_application] = useState(null)
    const [average_score, set_average_score] = useState(0)
    const [original_of_certificates, set_original_of_certificates] = useState(null)
    const [educational_institution_id, set_educational_institution_id] = useState([])
    const [educational_institution, set_educational_institution] = useState([])
    const [errors, setErrors] = useState(null)
    const [loading_scan_one, set_loading_scan_one] = useState(false)
    const [loading_scan_two, set_loading_scan_two] = useState(false)
    const auth = useAuth()
    const navigation = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(!auth.user)
            navigation('/signin')
        ViewCertificates()
        handleViewEd()
    }, [])
    
    const handleViewEd=async()=>{
        let { data: ed } = await supabase
        .from('educational_institution')
        .select('*')
        set_educational_institution(ed)
        set_educational_institution_id(ed)
    }

    const ViewCertificates = async() =>{
        await supabase
        .from('certificates')
        .select('*').then((data)=>{
            set_certificates(data.data)
            setLoading(false)
        })
    }

    const AddCertificates = async() =>{
        set_loading_scan_one(true)
        const avatarFile = scan_of_certificates
        await supabase
        .storage
        .from('picture')
        .upload('set_scan_of_certificates/'+scan_of_certificates.name, avatarFile, {
            cacheControl: '3600',
            upsert: false
        }).then(async(scan)=>{
            set_loading_scan_one(false)
            if(scan.error)
                setErrors(scan.error.message)
            else{
                set_loading_scan_two(true)
                const avatarFile2 = scan_of_certificate_application
                await supabase
                .storage
                .from('picture')
                .upload('set_scan_of_certificate_application/'+scan_of_certificate_application.name, avatarFile2, {
                    cacheControl: '3600',
                    upsert: false
                }).then(async(app)=>{
                    set_loading_scan_two(false)
                    if(app.error)
                        setErrors(app.error.message)
                    else{
                        await supabase
                        .from('certificates')
                        .insert([
                            { number_of_certificates: number_of_certificates,
                            date_of_issue: date_of_issue,
                            scan_of_certificates: 'https://ehdqdvcwzsqdwxffghow.supabase.co/storage/v1/object/public/picture/'+ scan.data.path,
                            scan_of_certificate_application: 'https://ehdqdvcwzsqdwxffghow.supabase.co/storage/v1/object/public/picture/'+ app.data.path,
                            average_score: average_score,
                            original_of_certificates: original_of_certificates,
                            educational_institution_id: educational_institution },
                        ]).then((data)=>{
                            if(data.error)
                                setErrors(data.error.message)
                            else
                                window.location.reload()
                        })
                    }
                })
            }
        })
        
    }
  return (
    <>
    <Layout />
    <Container>
        <Row>
        <h1 style={{marginTop:'2rem'}}>Аттестат</h1>
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
                <th>Номер аттестата</th>
                <th>Дата выдачи</th>
                <th>Скан аттестата</th>
                <th>Скан вложений аттестата</th>
                <th>Средний балл</th>
                <th>Оригинал аттестата</th>
                <th>Учебное учреждение</th>
            </tr>
            </thead>
            <tbody>
                <CertificatesView certificates={certificates}/>
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
                <Form.Label>Номер аттестата</Form.Label>
                <Form.Control type="text" placeholder="Номер аттестата" onChange={(e) => {set_number_of_certificates(e.target.value)}} value={number_of_certificates}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Дата выдачи</Form.Label>
                <Form.Control type="date" placeholder="Дата выдачи" onChange={(e) => {set_date_of_issue(e.target.value)}} value={date_of_issue}/>
            </Form.Group>
            {loading_scan_one&&(
                <div style={{display:'flex', marginBottom:'40px', marginTop:'20px'}}>
                    <Spinner animation="border" style={{margin:'0 auto'}}/>
                </div>
            )}
            {!loading_scan_one&&(
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Скан аттестата</Form.Label>
                    <Form.Control placeholder="Скан аттестата" type="file" onChange={e=>set_scan_of_certificates(e.target.files[0])}/>
                </Form.Group>
            )}
            {loading_scan_two&&(
                <div style={{display:'flex', marginBottom:'20px'}}>
                    <Spinner animation="border" style={{margin:'0 auto'}}/>
                </div>
            )}
            {!loading_scan_two&&(
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Скан вложений аттестата</Form.Label>
                    <Form.Control type="file" placeholder="Скан вложений аттестата" onChange={(e) => {set_scan_of_certificate_application(e.target.files[0])}}/>
                </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Средний балл</Form.Label>
                <Form.Control type="number" placeholder="Средний балл аттестата" onChange={(e) => {set_average_score(e.target.value)}} value={average_score}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Оригинал аттестата</Form.Label>
                <Form.Select onChange={(e)=>set_original_of_certificates(e.target.value)}>
                    <option value="true">Да</option>
                    <option value="false">Нет</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Учебное учреждение</Form.Label>
                <Form.Select onChange={(e)=>set_educational_institution(e.target.value)}>
                    {educational_institution_id.map(ed=>
                        <option key={ed.id_educational_institution} value={ed.id_educational_institution}>{ed.name_of_school}</option>
                    )}
                </Form.Select>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={AddCertificates}>
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
