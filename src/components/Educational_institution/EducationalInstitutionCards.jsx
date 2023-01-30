import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from '../../server';
import Alert from 'react-bootstrap/Alert';

export const EducationalInstitutionCards = ({educational_institution}) => {
  const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null);
    const [name_of_school, set_name_of_school] = useState(educational_institution.name_of_school)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async() => {
        await supabase
        .from('educational_institution')
        .update({ name_of_school: name_of_school })
        .eq('id_educational_institution', educational_institution.id_educational_institution).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

    const handleDelete = async() =>{
        await supabase
        .from('educational_institution')
        .delete()
        .eq('id_educational_institution', educational_institution.id_educational_institution).then(()=>{
            window.location.reload()
        })
    }
  return (
    <>
        <tr>
            <td>{educational_institution.id_educational_institution}</td>
            <td>{educational_institution.name_of_school}</td>
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
                <Form.Label>Наименование учебного учреждения</Form.Label>
                <Form.Control type="text" placeholder="Наименование учебного учреждения" onChange={(e) => {set_name_of_school(e.target.value)}} value={name_of_school}/>
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
