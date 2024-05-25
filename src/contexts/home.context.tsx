import { Dispatch, createContext, useContext } from 'react'

import { homeInitialState } from './home.state'
import { ActionType, useCreateReducer } from '@/hooks/useCreateReducer'

export interface homeContextProps {
  state: homeInitialState
  dispatch: Dispatch<ActionType<homeInitialState>>
}

const homeContext = createContext<homeContextProps>(undefined!)

export default homeContext
