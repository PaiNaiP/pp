import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from '../../server';
import Alert from 'react-bootstrap/Alert';

export const SpecialityCard = ({speciality}) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null);
    const [name_of_speciality, set_name_of_speciality] = useState(speciality.name_of_speciality)
    const [passing_score, set_passing_score] = useState(speciality.passing_score)
    const [number_of_places_on_the_budget, set_number_of_places_on_the_budget] = useState(speciality.number_of_places_on_the_budget)
    const [number_of_extrabudgetary_place, set_number_of_extrabudgetary_place] = useState(speciality.number_of_extrabudgetary_place)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async() => {
        await supabase
        .from('speciality')
        .update({ name_of_speciality: name_of_speciality,
        passing_score: passing_score,
        number_of_places_on_the_budget: number_of_places_on_the_budget,
        number_of_extrabudgetary_place: number_of_extrabudgetary_place })
        .eq('id_speciality', speciality.id_speciality).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

    const handleDelete = async() =>{
        await supabase
        .from('speciality')
        .delete()
        .eq('id_speciality', speciality.id_speciality).then(()=>{
            window.location.reload()
        })
    }
  return (
    <>
        <tr>
            <td>{speciality.id_speciality}</td>
            <td>{speciality.name_of_speciality}</td>
            <td>{speciality.passing_score}</td>
            <td>{speciality.number_of_places_on_the_budget}</td>
            <td>{speciality.number_of_extrabudgetary_place}</td>
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
