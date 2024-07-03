'use client'

import { memo, useEffect } from 'react'

import { useCreateReducer } from '@/hooks/useCreateReducer'
import { initialState, homeInitialState } from '@/contexts/home.state'
import homeContext from '@/contexts/home.context'

export const LayoutRouter = memo(({ children }) => {
  const contextValue = useCreateReducer({ initialState })

  const { dispatch } = contextValue

  useEffect(() => {

    // For Get Product
    const getProduct = async () => {
      try {
        const response = await fetch('/api/products')
        const jsonData = await response.json()

        if (jsonData) {
          // console.log('LayoutRouter', jsonData)
          dispatch({
            field: 'products',
            value: jsonData
          })
        }

        dispatch({
          field: 'loading',
          value: true
        })
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    // For Get User
    const getUser = async () => {
      try {
        const response = await fetch('/api/users')
        const jsonData = await response.json()

        if (jsonData) {
          // console.log('LayoutRouter', jsonData)
          dispatch({
            field: 'users',
            value: jsonData
          })
        }

        // dispatch({
        //   field: 'loading',
        //   value: true
        // })
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    // For Get Location
    const getLocation = async () => {
      try {
        const response = await fetch('/api/locations')
        const jsonData = await response.json()

        if (jsonData) {
          // console.log('LayoutRouter', jsonData)
          dispatch({
            field: 'locations',
            value: jsonData
          })
        }

        // dispatch({
        //   field: 'loading',
        //   value: true
        // })
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    getProduct()
    getUser()
    getLocation()
  }, [])

  // useEffect(() => {
  //   const data = fetch('/products/card/{user_id}')

  //   dispatch({
  //     field: 'addcards',
  //     value: data
  //   })
  // }, [])

  return <homeContext.Provider value={{ ...contextValue }}>{children}</homeContext.Provider>
})
export default LayoutRouter;
