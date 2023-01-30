import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from '../../server';
import Alert from 'react-bootstrap/Alert';

export const CertificatesCards = ({certificates}) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null);
    const [number_of_certificates, set_number_of_certificates] = useState(certificates.number_of_certificates)
    const [date_of_issue, set_date_of_issue] = useState(certificates.date_of_issue)
    const [scan_of_certificates, set_scan_of_certificates] = useState(certificates.scan_of_certificates)
    const [scan_of_certificate_application, set_scan_of_certificate_application] = useState(certificates.scan_of_certificate_application)
    const [average_score, set_average_score] = useState(certificates.average_score)
    const [original_of_certificates, set_original_of_certificates] = useState(certificates.original_of_certificates)
    const [educational_institution_id, set_educational_institution_id] = useState([])
    const [educational_institution, set_educational_institution] = useState([])
    const [ed, setEd] = useState(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleViewEd()
        handleViewEdById()
    }, [])

    const handleViewEd=async()=>{
        let { data: ed } = await supabase
        .from('educational_institution')
        .select('*')
        set_educational_institution(ed)
        set_educational_institution_id(ed)
    }

    const handleViewEdById = async()=>{
        await supabase
        .from('educational_institution')
        .select('*')
        .eq('id_educational_institution', certificates.educational_institution_id).then((data)=>setEd(data.data[0].name_of_school))
    }

    const handleEdit = async() => {
        await supabase
        .from('certificates')
        .update({ 
        number_of_certificates: number_of_certificates,
        date_of_issue: date_of_issue,
        scan_of_certificates: scan_of_certificates,
        scan_of_certificate_application: scan_of_certificate_application,
        average_score: average_score,
        original_of_certificates: original_of_certificates,
        educational_institution_id: educational_institution
        })
        .eq('id_certificates', certificates.id_certificates).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

    const handleDelete = async() =>{
        await supabase
        .from('certificates')
        .delete()
        .eq('id_certificates', certificates.id_certificates).then(()=>{
            window.location.reload()
        })
    }
  return (
    <>
        <tr>
            <td>{certificates.id_certificates}</td>
            <td>{certificates.number_of_certificates}</td>
            <td>{certificates.date_of_issue}</td>
            <td><img style={{width:'15rem'}} src={certificates.scan_of_certificates} alt="" /></td>
            <td><img style={{width:'15rem'}} src={certificates.scan_of_certificate_application} alt="" /></td>
            <td>{certificates.average_score}</td>
            {original_of_certificates==='true'&&(
              <td>Есть</td>
            )}
            {original_of_certificates==='false'&&(
              <td>Нет</td>
            )}
            <td>{ed}</td>
            <td><Button variant="dark" onClick={handleShow}>Изменить</Button></td>
            <td><Button variant="dark" onClick={handleDelete}>Удалить</Button></td>
        </tr>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Изменение</Modal.Title>
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
            <Button variant="dark" onClick={handleEdit}>
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
