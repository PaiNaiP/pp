import React from 'react'
import { EmployeeCards } from './EmployeeCards'

export const EmployeeView = ({employee}) => {
  return (
    employee.map((emp)=>(
      <EmployeeCards key={emp.ID} employee={emp}/>
    ))
  )
}
