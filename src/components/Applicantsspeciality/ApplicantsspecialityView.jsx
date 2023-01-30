import React from 'react'
import { ApplicantsspecialityCards } from './ApplicantsspecialityCards'

export const ApplicantsspecialityView = ({applicant_s_speciality}) => {
  return (
    applicant_s_speciality.map((applicant_s_specialit)=>(
        <ApplicantsspecialityCards key={applicant_s_specialit.ID} applicant_s_speciality={applicant_s_specialit}/>
    ))
  )
}
