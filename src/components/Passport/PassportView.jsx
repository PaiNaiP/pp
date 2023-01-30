import React from 'react'
import { PassportCard } from './PassportCard'

export const PassportView = ({passport}) => {
  return (
    passport.map((passpor)=>(
      <PassportCard key={passpor.ID} passport={passpor}/>
    ))
  )
}
