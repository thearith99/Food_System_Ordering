interface ProductType {
  name: string
  price: number
  image: string
  description: string
  id: number
  categoryId: number
  category: any
}

interface UserType {
  id: number
  name: string
  email: string
  phone: string
  password: string
}

interface LocationType {
  id: number
  markName: string
  lat: number
  long: number
}

export interface homeInitialState {
  appName: string
  addcards: []
  addusers: {}
  products: ProductType[]
  users: UserType[]
  locations: LocationType[]
  selectedLocation: null | LocationType
  loading: boolean
}

export const initialState: homeInitialState = {
  appName: 'Food System Ordering',
  addcards: [],
  addusers: {},
  products: [],
  users: [],
  locations: [],
  selectedLocation: null,
  loading: false
}
