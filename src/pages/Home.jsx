import React from 'react'
import { LayoutStart } from '../components/LayoutStart'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigation = useNavigate()
    const handleStart = ()=>{
        navigation('/roles')
    }
  return (
    <LayoutStart>
        <div style={{display:'flex', marginTop:'13rem'}}>
            <div style={{margin:'0 auto', textAlign:'center'}}>
                <h1>Добро пожаловать</h1>
                <p>Это сервис для переписи аббитуриентов и хранении информации о них, 
                <br/>а также об аббитуриентах</p>
                <div>
                    <Button variant="dark" onClick={handleStart}>Начать</Button>
                </div>
            </div>
        </div>
    </LayoutStart>
  )
}
