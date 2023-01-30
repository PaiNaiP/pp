import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from '../../server';
import Alert from 'react-bootstrap/Alert';

export const PassportCard = ({passport}) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null);
    const [passport_series, set_passport_series] = useState(passport.passport_series)
    const [passport_number, set_passport_number] = useState(passport.passport_number)
    const [date_of_issue, set_date_of_issue] = useState(passport.date_of_issue)
    const [issued_by, set_issued_by] = useState(passport.issued_by)
    const [departament_code, set_departament_code] = useState(passport.departament_code)
    const [scan_of_the_first_spread, set_scan_of_the_first_spread] = useState(passport.scan_of_the_first_spread)
    const [scan_of_the_second_spread, set_scan_of_the_second_spread] = useState(passport.scan_of_the_second_spread)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async() => {
        await supabase
        .from('passport')
        .update({ passport_series: passport_series,
          passport_number: passport_number,
          date_of_issue: date_of_issue,
          issued_by: issued_by,
          departament_code: departament_code,
          scan_of_the_first_spread: scan_of_the_first_spread,
          scan_of_the_second_spread: scan_of_the_second_spread})
        .eq('id_passport', passport.id_passport).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

    const handleDelete = async() =>{
        await supabase
        .from('passport')
        .delete()
        .eq('id_passport', passport.id_passport).then(()=>{
            window.location.reload()
        })
    }
  return (
    <>
    <tr>
      <td>{passport.id_passport}</td>
      <td>{passport.passport_series}</td>
      <td>{passport.passport_number}</td>
      <td>{passport.date_of_issue}</td>
      <td>{passport.issued_by}</td>
      <td>{passport.departament_code}</td>
      <td><img src={passport.scan_of_the_first_spread} alt="" style={{width:'15rem'}}/></td>
      <td><img src={passport.scan_of_the_second_spread} alt="" style={{width:'15rem'}} /></td>
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
