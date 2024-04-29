'use client'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function LoginPage() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true
  }
  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:3000/api/apps/categories/')
      const categories = await response.json()
      const res = await fetch('http://localhost:3000/api/apps/products/')
      const products = await res.json()
      setCategories(categories)

      setProducts(products)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    setIsLoading(false)
  }

  const handleCategoryClick = category => {
    setSelectedCategory(category)
  }

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category.name === selectedCategory.name)
    : products
  const addProductToCart = async product => {
    let findProductInCart = await cart.find(i => {
      return i.id === product.id
    })

    if (findProductInCart) {
      let newCart = []
      let newItem

      cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem)
        } else {
          newCart.push(cartItem)
        }
      })

      setCart(newCart)
      toast(`Added ${newItem.name} to cart`, toastOptions)
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price
      }
      setCart([...cart, addingProduct])
      toast(`Added ${product.name} to cart`, toastOptions)
    }
  }
  const decreaseProduct = async product => {
    let findProductInCart = await cart.find(i => {
      return i.id === product.id
    })

    if (findProductInCart && product.quantity > 1) {
      let newCart = []
      let newItem

      cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity - 1,
            totalAmount: cartItem.price * (cartItem.quantity - 1)
          }
          newCart.push(newItem)
        } else {
          newCart.push(cartItem)
        }
      })

      setCart(newCart)
      toast(`Remove ${newItem.name} from cart`, toastOptions)
    } else {
      // Remove product from cart if quality reaches 0
      const newCart = cart.filter(cartItem => cartItem.id !== product.id)
      setCart(newCart)
    }
  }
  const removeProduct = async product => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id)
    setCart(newCart)
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    let newTotalAmount = 0
    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount)
    })
    setTotalAmount(newTotalAmount)
  }, [cart])

  return (
    <div className='min-h-screen flex layout-bg'>
      <div className='flex flex-col w-1 flex-1 gap-2'>
        <div className='flex flex-row h-full gap-2'>
<<<<<<< HEAD
          <div className='flex-grow flex flex-col' style={{ width: '55%' }}>
=======
          <div className='flex-grow flex flex-col'>
>>>>>>> 597eeec4a3b4ed74c3b619798304c99e44d754d6
            <div className='flex flex-col w-full gap-2'>
              <div className='flex-none flex-grow rounded-lg p-3' color='primary'>
                <div className='flex overflow-x-auto'>
                  {isLoading ? (
                    <p color='primary'>Loading</p>
                  ) : (
                    <>
                      <div className='w-1/4 h-50 gap-1 flex-none p-1'>
                        <Button
                          onClick={() => handleCategoryClick(null)}
                          style={{ fontWeight: selectedCategory === null ? 'bold' : 'normal' }}
                          className='text-cyan-900 cursor-pointer text-center border rounded-md w-full h-full flex flex-col justify-center'
                          variant='contained'
                          color='primary'
                        >
                          <p color='primary'>All Products</p>
                        </Button>
                      </div>
                      {categories.map((category, key) => (
                        <div
                          className='w-1/4 h-full cursor-pointer border rounded-md gap-1 flex-none p-1 '
                          key={key}
                          onClick={() => handleCategoryClick(category)}
                          style={{ fontWeight: selectedCategory === category ? 'bold' : 'normal' }}
                        >
                          <div className='text-cyan-900 cursor-pointer hover:bg-gray-100 text-center border border-cyan-900 rounded-md bg-white h-full flex flex-col justify-center'>
                            <div className='aspect-w-1 aspect-h-1'>
                              <img
                                src={category.image}
                                className='w-full h-full object-cover flex-shrink-0 inline-block flex justify-center'
                                alt={category.name}
                                style={{ aspectRatio: '1/1' }}
                              />
                            </div>
                            <div className='font-normal text-xs block truncate items-center font-semibold text-red-400'>
                              <Typography variant='h6' color='primary.main' className='mbe-1'>
<<<<<<< HEAD
                                {category.name}
=======
                                {category.title}
>>>>>>> 597eeec4a3b4ed74c3b619798304c99e44d754d6
                              </Typography>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className='flex-grow h-full rounded-lg p-3 overflow-y-auto md:h-16' color='primary'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {isLoading
                  ? 'Loading'
                  : filteredProducts
                      .filter(product => product.status === true)
                      .map((product, key) => (
                        <div className='col-span-1' key={key}>
                          <div
                            className='cursor-pointer border border-cyan-900 rounded-md bg-white'
                            onClick={() => addProductToCart(product)}
                          >
                            <img
                              src={product.image}
                              className='w-full h-full cursor-pointer border rounded-md object-cover'
                              alt={product.name}
                              style={{ aspectRatio: '1/1' }}
                            />
                            <Typography variant='h5' color='primary.main' className='mbe-1 px-2'>
                              {product.name}
                            </Typography>

                            <Typography variant='h6' color='primary.main' className='mbe-1 px-2'>
                              ${product.price}
                            </Typography>
                          </div>
                        </div>
                      ))}
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div className='flex-grow flex flex-col' style={{ width: '45%' }}>
=======
          <div className='flex-grow flex flex-col'>
>>>>>>> 597eeec4a3b4ed74c3b619798304c99e44d754d6
            <div className='flex-grow h-full rounded-lg p-3 md:h-16' color='primary'>
              <div className='bg-gray-900' style={{ maxHeight: '100%', overflowY: 'auto' }}>
                <table className='table-auto w-full text-white'>
                  <thead className='sticky top-0 bg-white text-black'>
                    <tr>
                      <th className='px-6 py-4'>Img</th>
                      <th className='px-4 py-4'>Name</th>
                      <th className='px-4 py-4'>Price</th>
                      <th className='px-4 py-4'>Qty</th>
                      <th className='px-4 py-4'>Action</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {cart ? (
                      cart.map((cartProduct, key) => (
                        <tr key={key}>
                          <td className='px-2 py-2'>
                            <img
                              src={cartProduct.image}
                              className='w-full h-full object-cover'
                              style={{ aspectRatio: '1/1' }}
                            />
                          </td>
                          <td className='px-4 py-4'>{cartProduct.name}</td>
                          <td className='px-4 py-4'>{cartProduct.price}</td>
                          <td className='px-4 py-4'>
                            <div className='flex items-center'>
                              <button
                                className='w-6 h-6 font-semibold text-center'
                                onClick={() => decreaseProduct(cartProduct)}
                              >
                                -
                              </button>
                              <p className='w-10 border-none px-1 text-center'>{cartProduct.quantity}</p>
                              <button
                                className='w-6 h-6 font-semibold text-center'
                                onClick={() => addProductToCart(cartProduct)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className='px-4 py-4'>
                            <button
                              className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full'
                              onClick={() => removeProduct(cartProduct)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan='10'>No Item in Cart</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='mt-auto'>
              <div className='flex flex-col gap-2'>
                <div className='bg-red-100 hover:bg-red-120 text-black font-bold rounded-lg py-3 px-4 w-full flex justify-between items-center'>
                  <span>Total Amount:</span>
                  <span>${totalAmount}</span>{' '}
                </div>
                <div>
                  {' '}
                  {totalAmount !== 0 ? (
                    <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg py-3 w-full'>
                      Pay Now
                    </button>
                  ) : (
                    'Please add a product to the cart'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
