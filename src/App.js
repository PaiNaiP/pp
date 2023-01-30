import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Roles } from './pages/Roles';
import { Achievements } from './pages/Achievements';
import { Speciality } from './pages/Speciality';
import { Passport } from './pages/Passport';
import { EducationalInstitution } from './pages/EducationalInstitution';
import { Certificates } from './pages/Certificates';
import { Employee } from './pages/Employee';
import { Applicants } from './pages/Applicants';
import { Applicantsspeciality } from './pages/Applicantsspeciality';
import { SignIn } from './pages/SignIn';
import { AuthProvider } from './components/auth';
import { Home } from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/achievements" element={<Achievements/>}/>
        <Route exact path="/speciality" element={<Speciality/>}/>
        <Route exact path="/passport" element={<Passport/>}/>
        <Route exact path='/educational_institution' element={<EducationalInstitution/>}/>
        <Route exact path='/certificates' element={<Certificates/>}/>
        <Route exact path='/employee' element={<Employee/>}/>
        <Route exact path='/applicants' element={<Applicants/>}/>
        <Route exact path='/applicant_s_speciality' element={<Applicantsspeciality/>}/>
        <Route exact path='/signin' element={<SignIn/>}/>
        <Route exact path="/roles" element={<Roles/>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
