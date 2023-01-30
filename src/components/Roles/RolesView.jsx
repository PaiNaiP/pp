import React from 'react'
import { RolesCards } from './RolesCards'

export const RolesView = ({roles}) => {
  return (
    roles.map((role)=>(
        <RolesCards key={role.ID} role={role}/>
    ))
  )
}
