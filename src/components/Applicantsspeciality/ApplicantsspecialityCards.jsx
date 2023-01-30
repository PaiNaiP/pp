import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from '../../server';
import Alert from 'react-bootstrap/Alert';

export const ApplicantsspecialityCards = ({applicant_s_speciality}) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null);
    const [applicants_id, set_applicants_id] = useState([])
    const [applicants, set_applicants] = useState([])
    const [speciality_id, set_speciality_id] = useState([])
    const [speciality, set_speciality] = useState([])
    const [app, setApp] = useState(null)
    const [sps, setSps] = useState(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleViewAppById()
        handleViewApplicants()
        handleViewSpeById()
        handleViewSpeciality()
    }, [])
    
    const handleViewAppById = async()=>{
        await supabase
        .from('applicants')
        .select('*')
        .eq('id_applicants', applicant_s_speciality.applicants_id).then((data)=>setApp(data.data[0].surname + " " + data.data[0].name + " "+ data.data[0].lastname))
    }
    
    const handleViewApplicants=async()=>{
        let { data: ap } = await supabase
        .from('applicants')
        .select('*')
        set_applicants_id(ap)
    }

    const handleViewSpeById = async()=>{
        await supabase
        .from('speciality')
        .select('*')
        .eq('id_speciality', applicant_s_speciality.speciality_id).then((data)=>setSps(data.data[0].name_of_speciality))
    }
    
    const handleViewSpeciality=async()=>{
        let { data: sp } = await supabase
        .from('speciality')
        .select('*')
        set_speciality_id(sp)
    }

    const handleEdit = async() => {
        await supabase
        .from('applicant_s_speciality')
        .update({ applicants_id: applicants,
        speciality_id: speciality })
        .eq('id_applicant_s_speciality', applicant_s_speciality.id_applicant_s_speciality).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

    const handleDelete = async() =>{
        await supabase
        .from('applicant_s_speciality')
            .delete()
        .eq('id_applicant_s_speciality', applicant_s_speciality.id_applicant_s_speciality).then((data)=>{
            window.location.reload()
        })
    }
  return (
    <>
        <tr>
            <td>{applicant_s_speciality.id_applicant_s_speciality}</td>
            <td>{app}</td>
            <td>{sps}</td>
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
            <Form.Group className="mb-3">
                <Form.Label>Аббитуриенты</Form.Label>
                <Form.Select onChange={(e)=>set_applicants(e.target.value)}>
                    {applicants_id.map(ap=>
                        <option key={ap.id_applicants} value={ap.id_applicants}>{ap.surname} {ap.name} {ap.lastname}</option>
                    )}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Специальность</Form.Label>
                <Form.Select onChange={(e)=>set_speciality(e.target.value)}>
                    {speciality_id.map(sp=>
                        <option key={sp.id_speciality} value={sp.id_speciality}>{sp.name_of_speciality}</option>
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
