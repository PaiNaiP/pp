import React from 'react'
import { SpecialityCard } from './SpecialityCard'

export const SpecialityView = ({speciality}) => {
  return (
    speciality.map((specialit)=>(
        <SpecialityCard key={specialit.id} speciality={specialit} />
    ))
  )
}
