import React from 'react'
import { CertificatesCards } from './CertificatesCards'

export const CertificatesView = ({certificates}) => {
  return (
    certificates.map((certificate)=>(
      <CertificatesCards key={certificate.ID} certificates={certificate}/>
    ))
  )
}
