import React, { useState } from 'react'
import { useAuth } from '../components/auth'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import image1 from '../Frame.svg'
import { useNavigate } from 'react-router-dom';
export const SignIn = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const auth = useAuth()
    const navigate = useNavigate()
    const handleSignIn = async(e)=>{
        e.preventDefault()
        await auth.Login(email, password).then(async(SignIn)=>{
            if(SignIn === null){
                navigate('/')
            }
        })
    }
    
  return (
    <Stack gap={0} className="col-md-5 mx-auto" style={{display:'flex', marginTop:'8rem'}}>
        <div className='signInBorder' style={{width:'22rem', margin:'0 auto'}}>
        <div>
        <div style={{display:'flex', marginTop:'30px'}}>
        <img style={{width:'8rem', margin:'0 auto'}} src={image1} alt="img"/>
        </div>
        <Form style={{margin:'2rem'}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Почта</Form.Label>
                <Form.Control type="email" autocomplete="off" value={email} onChange={e=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" autocomplete="off" value={password} onChange={e=>setPassword(e.target.value)}/>
            </Form.Group>
            <div style={{display:'flex'}}>
            <Button onClick={handleSignIn} style={{margin:'0 auto', marginTop:'1rem', marginBottom:'1rem'}} variant="primary" type="submit">
                Авторизоваться
            </Button>
            </div>
        </Form>
        </div>
        </div>
    </Stack>
  )
}
