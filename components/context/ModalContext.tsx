import { createContext } from 'react'

export const modalValues = {
  formType: 'create',
}

export const ModalContext = createContext(modalValues);