import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from '../../server';
import Alert from 'react-bootstrap/Alert';

export const RolesCards = ({role}) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null);
    const [rolesName, setRolesName] = useState(role.name_of_role)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async() => {
        await supabase
        .from('roles')
        .update({ name_of_role: rolesName })
        .eq('id_roles', role.id_roles).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

    const handleDelete = async() =>{
        await supabase
        .from('roles')
        .delete()
        .eq('id_roles', role.id_roles).then(()=>{
            window.location.reload()
        })
    }
    return (
        <>
        <tr>
            <td>{role.id_roles}</td>
            <td>{role.name_of_role}</td>
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
                <Form.Label>Наименование роли</Form.Label>
                <Form.Control type="text" placeholder="Наименование роли" onChange={(e) => {setRolesName(e.target.value)}} value={rolesName}/>
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
