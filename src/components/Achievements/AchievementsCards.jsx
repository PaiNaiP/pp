import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from '../../server';
import Alert from 'react-bootstrap/Alert';

export const AchievementsCards = ({achievements}) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null);
    const [gto, setGTO] = useState(achievements.gto)
    const [olympics, setOlympics] = useState(achievements.olympics)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async() => {
        await supabase
        .from('achievements')
        .update({ gto: gto,
            olympics: olympics
         })
        .eq('id_achievements', achievements.id_achievements).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

    const handleDelete = async() =>{
        await supabase
        .from('achievements')
        .delete()
        .eq('id_achievements', achievements.id_achievements).then(()=>{
            window.location.reload()
        })
    }
  return (
    <>
        <tr>
            <td>{achievements.id_achievements}</td>
            <td>{achievements.gto}</td>
            <td>{achievements.olympics}</td>
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
                <Form.Label>ГТО</Form.Label>
                <Form.Control type="text" placeholder="Занятое место" onChange={(e) => {setGTO(e.target.value)}} value={gto}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Олимпиада</Form.Label>
                <Form.Control type="text" placeholder="Название олимпиады и занятое место" onChange={(e) => {setOlympics(e.target.value)}} value={olympics}/>
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
