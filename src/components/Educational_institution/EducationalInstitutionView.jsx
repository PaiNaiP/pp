import React from 'react'
import { EducationalInstitutionCards } from './EducationalInstitutionCards'

export const EducationalInstitutionView = ({educational_institution}) => {
  return (
    educational_institution.map((educational)=>(
        <EducationalInstitutionCards key={educational.ID} educational_institution={educational}/>
    ))
  )
}
