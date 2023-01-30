import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from '../../server';
import Alert from 'react-bootstrap/Alert';

export const ApplicantsCards = ({applicants}) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null);
    const [surname, set_surname] = useState(applicants.surname)
    const [name, set_name] = useState(applicants.name)
    const [lastname, set_lastname] = useState(applicants.lastname)
    const [date_of_birth, set_date_of_birth] = useState(applicants.date_of_birth)
    const [gender, set_gender] = useState(applicants.gender)
    const [email, set_email] = useState(applicants.email)
    const [phone_number, set_phone_number] = useState(applicants.phone_number)
    const [photo_of_application, set_photo_of_application] = useState(applicants.photo_of_application)
    const [roles_id, set_roles_id] = useState([])
    const [roles, set_roles] = useState([])
    const [achievements_id, set_achievements_id] = useState([])
    const [achievements, set_achievements] = useState([])
    const [passport_id, set_passport_id] = useState([])
    const [passport, set_passport] = useState([])
    const [certificates_id, set_certificates_id] = useState([])
    const [certificates, set_certificates] = useState([])
    const [rol, setRol] = useState(null)
    const [ach, setAch] = useState(null)
    const [pas, setPas] = useState(null)
    const [cer, setCer] = useState(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleViewAchById()
        handleViewAchievements()
        handleViewCerById()
        handleViewCertificates()
        handleViewPasById()
        handleViewPassport()
        handleViewRoles()
        handleViewRolById()
    }, [])
    

    const handleViewRolById = async()=>{
        await supabase
        .from('roles')
        .select('*')
        .eq('id_roles', applicants.roles_id).then((data)=>setRol(data.data[0].name_of_role))
    }
    
    const handleViewRoles=async()=>{
        let { data: rol } = await supabase
        .from('roles')
        .select('*')
        set_roles_id(rol)
    }

    const handleViewAchById = async()=>{
        await supabase
        .from('achievements')
        .select('*')
        .eq('id_achievements', applicants.achievements_id).then((data)=>setAch(data.data[0].gto, data.data[0].olympics))
    }
    
    const handleViewAchievements=async()=>{
        let { data: achievements } = await supabase
        .from('achievements')
        .select('*')
        set_achievements_id(achievements)
    }

    const handleViewPasById = async()=>{
        await supabase
        .from('passport')
        .select('*')
        .eq('id_passport', applicants.passport_id).then((data)=>setPas(data.data[0].passport_number+" "+ data.data[0].passport_series))
    }
    
    const handleViewPassport=async()=>{
        let { data: passport } = await supabase
        .from('passport')
        .select('*')
        set_passport_id(passport)
    }

    const handleViewCerById = async()=>{
        await supabase
        .from('certificates')
        .select('*')
        .eq('id_certificates', applicants.certificates_id).then((data)=>setCer(data.data[0].number_of_certificates))
    }
    
    const handleViewCertificates=async()=>{
        let { data: certificates } = await supabase
        .from('certificates')
        .select('*')
        set_certificates_id(certificates)
    }

    const handleEdit = async() => {
        await supabase
        .from('applicants')
        .update({ surname: surname,
            name: name,
            lastname: lastname,
            date_of_birth: date_of_birth,
            gender: gender,
            email: email,
            phone_number: phone_number,
            photo_of_application: photo_of_application,
            roles_id: roles,
            achievements_id: achievements,
            passport_id: passport,
            certificates_id: certificates })
        .eq('id_applicants', applicants.id_applicants).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

    const handleDelete = async() =>{
        await supabase
        .from('applicants')
        .delete()
        .eq('id_applicants', applicants.id_applicants).then(()=>{
            window.location.reload()
        })
    }

  return (
<>
        <tr>
            <td>{applicants.id_applicants}</td>
            <td>{applicants.surname}</td>
            <td>{applicants.name}</td>
            <td>{applicants.lastname}</td>
            <td>{applicants.date_of_birth}</td>
            <td>{applicants.gender}</td>
            <td>{applicants.email}</td>
            <td>{applicants.phone_number}</td>
            <td><img src={applicants.photo_of_application} style={{width:"15rem"}} alt="Фото аббитуриента" /></td>
            <td>{ach}</td>
            <td>{pas}</td>
            <td>{cer}</td>
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
            <Button variant="dark" onClick={handleEdit}>
                Сохранить
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Закрыть
            </Button>
            </Modal.Footer>
        </Modal>
        </>  )
}
