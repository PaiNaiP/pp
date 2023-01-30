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
import { PassportView } from '../components/Passport/PassportView';
import { useAuth } from '../components/auth';
import { useNavigate } from 'react-router-dom';

export const Passport = () => {
    const [passport, setPassport] = useState([])
    const [show, setShow] = useState(false);
    const [passport_series, set_passport_series] = useState(0)
    const [passport_number, set_passport_number] = useState(0)
    const [date_of_issue, set_date_of_issue] = useState(null)
    const [issued_by, set_issued_by] = useState(null)
    const [departament_code, set_departament_code] = useState(0)
    const [scan_of_the_first_spread, set_scan_of_the_first_spread] = useState(null)
    const [scan_of_the_second_spread, set_scan_of_the_second_spread] = useState(null)
    const [loading_scan_one, set_loading_scan_one] = useState(false)
    const [loading_scan_two, set_loading_scan_two] = useState(false)
    const [errors, setErrors] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(true)
    const auth = useAuth()
    const navigation = useNavigate()
    useEffect(() => {
        if(!auth.user)
            navigation('/signin')
        ViewPassport()
    }, [])
    
    const ViewPassport = async() =>{
        await supabase
        .from('passport')
        .select('*').then((data)=>{
            setPassport(data.data)
            setLoading(false)
        })
    }

    const AddPassport = async() =>{
        set_loading_scan_one(true)
        const avatarFile = scan_of_the_first_spread
        await supabase
        .storage
        .from('picture')
        .upload('scan_of_the_first_spread/'+scan_of_the_first_spread.name, avatarFile, {
            cacheControl: '3600',
            upsert: false
        }).then(async(one_scan)=>{
            set_loading_scan_one(false)
            if(one_scan.error)
                setErrors(one_scan.error.message)
            else
            {
                set_loading_scan_two(true)
                const avatarFile2 = scan_of_the_second_spread
                await supabase
                .storage
                .from('picture')
                .upload('scan_of_the_second_spread/'+scan_of_the_second_spread.name, avatarFile2, {
                    cacheControl: '3600',
                    upsert: false
                }).then(async(two_scan)=>{
                    set_loading_scan_two(false)
                    if(two_scan.error)
                        setErrors(two_scan.error.message)
                    else{
                        await supabase
                        .from('passport')
                        .insert([
                            { passport_series: passport_series,
                            passport_number: passport_number,
                            date_of_issue: date_of_issue,
                            issued_by: issued_by,
                            departament_code: departament_code,
                            scan_of_the_first_spread: 'https://ehdqdvcwzsqdwxffghow.supabase.co/storage/v1/object/public/picture/'+ one_scan.data.path,
                            scan_of_the_second_spread: 'https://ehdqdvcwzsqdwxffghow.supabase.co/storage/v1/object/public/picture/'+ two_scan.data.path },
                        ]).then((data)=>{
                            console.log(data.error)
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
        <h1 style={{marginTop:'2rem'}}>Паспорт</h1>
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
                <th>Серия паспорта</th>
                <th>Номер паспорта</th>
                <th>Дата выдачи</th>
                <th>Кем выдан</th>
                <th>Код подразделения</th>
                <th>Скан первой страницы</th>
                <th>Скан второй страницы</th>
            </tr>
            </thead>
            <tbody>
                <PassportView passport={passport}/>
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
                <Form.Label>Серия паспорта</Form.Label>
                <Form.Control max="4" type="number" placeholder="Серия паспорта" onChange={(e) => {set_passport_series(e.target.value)}} value={passport_series}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Номер паспорта</Form.Label>
                <Form.Control maxLength="4" type="number" placeholder="Номер паспорта" onChange={(e) => {set_passport_number(e.target.value)}} value={passport_number}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Дата выдачи</Form.Label>
                <Form.Control type="date" placeholder="Дата выдачи" onChange={(e) => {set_date_of_issue(e.target.value)}} value={date_of_issue}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Кем выдан</Form.Label>
                <Form.Control type="text" placeholder="Кем выдан" onChange={(e) => {set_issued_by(e.target.value)}} value={issued_by}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Код подразделения</Form.Label>
                <Form.Control type="number" placeholder="Код подразделения" onChange={(e) => {set_departament_code(e.target.value)}} value={departament_code}/>
            </Form.Group>
            {loading_scan_one&&(
                <div style={{display:'flex', marginBottom:'40px', marginTop:'20px'}}>
                    <Spinner animation="border" style={{margin:'0 auto'}}/>
                </div>
            )}
            {!loading_scan_one&&(
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Скан первой страницы</Form.Label>
                    <Form.Control placeholder="Скан первой страницы" type="file" onChange={e=>set_scan_of_the_first_spread(e.target.files[0])}/>
                </Form.Group>
            )}
            {loading_scan_two&&(
                <div style={{display:'flex', marginBottom:'20px'}}>
                    <Spinner animation="border" style={{margin:'0 auto'}}/>
                </div>
            )}
            {!loading_scan_two&&(
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Скан второй страницы</Form.Label>
                    <Form.Control type="file" placeholder="Скан второй страницы" onChange={(e) => {set_scan_of_the_second_spread(e.target.files[0])}}/>
                </Form.Group>
            )}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={AddPassport}>
                Сохранить
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Закрыть
            </Button>
            </Modal.Footer>
        </Modal>
    </>  )
}
