import React from 'react'
import { ApplicantsCards } from './ApplicantsCards'

export const ApplicantsView = ({applicants}) => {
  return (
    applicants.map((ap)=>(
        <ApplicantsCards key={ap.ID} applicants={ap}/>
    ))
  )
}
