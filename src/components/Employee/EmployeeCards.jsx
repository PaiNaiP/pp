import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import supabase from '../../server';
import Alert from 'react-bootstrap/Alert';
import bcrypt from 'bcryptjs';

export const EmployeeCards = ({employee}) => {
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState(null);
    const [surname, set_surname] = useState(employee.surname)
    const [name, set_name] = useState(employee.name)
    const [lastname, set_lastname] = useState(employee.lastname)
    const [login, set_login] = useState(employee.login);
    const [password, setPassword] = useState(employee.password)
    const [roles_id, set_roles_id] = useState([])
    const [roles, set_roles] = useState([])    
    const [rol, set_rol] = useState(null)    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      useEffect(() => {
        handleViewRoles()
        handleViewRolById()
    }, [])

    const handleViewRolById = async()=>{
      await supabase
      .from('roles')
      .select('*')
      .eq('id_roles', employee.roles_id).then((data)=>set_rol(data.data[0].name_of_role))
  }
    const handleViewRoles=async()=>{
        let { data: rol } = await supabase
        .from('roles')
        .select('*')
        set_roles_id(rol)
    }

    const handleEdit = async() => {
        await supabase
        .from('employee')
        .update({ surname: surname,
          name: name,
          lastname: lastname,
          login:login,
          password: bcrypt.hashSync(password, 10),
          roles_id: roles })
        .eq('id_employee', employee.id_employee).then((data)=>{
            if(data.error)
                setErrors(data.error.message)
            else
                window.location.reload()
        })
    }

    const handleDelete = async() =>{
        await supabase
        .from('employee')
        .delete()
        .eq('id_employee', employee.id_employee).then(()=>{
            window.location.reload()
        })
    }
  return (
    <>
        <tr>
            <td>{employee.id_employee}</td>
            <td>{employee.name}</td>
            <td>{employee.surname}</td>
            <td>{employee.lastname}</td>
            <td>{employee.login}</td>
            <td>{rol}</td>
            <td><Button variant="dark" onClick={handleShow}>????????????????</Button></td>
            <td><Button variant="dark" onClick={handleDelete}>??????????????</Button></td>
        </tr>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>??????????????????</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {errors&&(
                <Alert variant="danger">
                    {errors}
                </Alert>
            )}
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>??????</Form.Label>
                <Form.Control type="text" placeholder="??????" onChange={(e) => {set_name(e.target.value)}} value={name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>??????????????</Form.Label>
                <Form.Control type="text" placeholder="??????????????" onChange={(e) => {set_surname(e.target.value)}} value={surname}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>????????????????</Form.Label>
                <Form.Control type="text" placeholder="????????????????" onChange={(e) => {set_lastname(e.target.value)}} value={lastname}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>??????????</Form.Label>
                <Form.Control type="email" placeholder="??????????" onChange={(e) => {set_login(e.target.value)}} value={login}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>????????????</Form.Label>
                <Form.Control type="password" placeholder="????????????" onChange={(e) => {setPassword(e.target.value)}} value={password}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>????????</Form.Label>
                <Form.Select onChange={(e)=>set_roles(e.target.value)}>
                    {roles_id.map(rol=>
                        <option key={rol.id_roles} value={rol.id_roles}>{rol.name_of_role}</option>
                    )}
                </Form.Select>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={handleEdit}>
                ??????????????????
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                ??????????????
            </Button>
            </Modal.Footer>
        </Modal>
        </>  
      )
}
