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
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface homeInitialState {
  appName: string
  addcards: []
<<<<<<< HEAD
  addusers: {}
=======
  addusers:[]
>>>>>>> origin/master
  products: ProductType[]
  users: UserType[]
  loading: boolean
}

export const initialState: homeInitialState = {
  appName: 'Food System Ordering',
  addcards: [],
<<<<<<< HEAD
  addusers:{},
=======
  addusers:[],
>>>>>>> origin/master
  products: [],
  users:[],
  loading: false
}
