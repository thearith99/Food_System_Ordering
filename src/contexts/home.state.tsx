interface ProductType {
  name: string
  price: number
  image: string
  description: string
  id: number
  categoryId: number
  category: any
}

export interface homeInitialState {
  appName: string
  addcards: []
  products: ProductType[]
  loading: boolean
}

export const initialState: homeInitialState = {
  appName: 'Food System Ordering',
  addcards: [],
  products: [],
  loading: false
}
