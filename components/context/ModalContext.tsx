import { createContext } from 'react'

export const modalValues = {
  show: false,
  formType: 'create',
  errors: ''
}

export const ModalContext = createContext(modalValues);