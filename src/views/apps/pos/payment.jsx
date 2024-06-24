'use client'

import { useContext, useEffect, useState } from 'react';

import { FaShoppingCart } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";
import Swal from 'sweetalert2';

import AddUser from './addUser'; // Make sure the component name is correct here
import homeContext from '@/contexts/home.context';
import { useStorage } from '@/hooks/useHook';

const Payment = () => {
  const {
    state: { addcards, addusers },
    dispatch
  } = useContext(homeContext)

  const [cards, setCart] = useStorage('CardList', [])
  const [prices, setPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');
  const shippingCost = 0

  useEffect(() => {
    const updatedCards = addcards.map(card => ({ ...card, quantity: 1 }))

    console.log(updatedCards);
    let newCards = cards
    let exists = false

    for (const key in newCards) {
      if (updatedCards.length == 0) {
        exists = false
        break
      }

      if (newCards[key].id == updatedCards[0].id && newCards[key].category.id == updatedCards[0].category.id) {
        newCards[key].quantity += 1
        exists = true
        break
      }
    }

    if (exists == false) {
      newCards = [...newCards, ...updatedCards]
    }

    setCart([...newCards])
  }, [addcards])

  useEffect(() => {
    const sum = cards.reduce((acc, item) => acc + parseFloat(item.price.toString().replace('$', '')) * item.quantity, 0)

    setPrice(sum)
    setTotal(sum + shippingCost)
  }, [cards])

  useEffect(() => {
    console.log('addusers:', addusers);

    if (addusers) {
      console.log('Selected user:', addusers.name);
      setSelectedUserName(addusers.name);
    } else {
      console.log('User not found');
      setSelectedUserName('');
    }
  }, [selectedUserName, addusers]);


  const removeFromCart = index => {
    const newCards = cards.filter((_, i) => i !== index)

    setCart(newCards)
  }

  const incrementQuantity = index => {
    const newCards = cards.map((item, i) => (i === index ? { ...item, quantity: item.quantity + 1 } : item))

    setCart(newCards)
  }

  const decrementQuantity = index => {
    const newCards = cards.map((item, i) =>
      i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    )

    setCart(newCards)
  }

  const handleCheckout = async () => {
    console.log('Checking out with cards:', cards);

    const orderDetails = cards.map(card => ({
      productId: card.id,
      totalAmount: parseFloat(card.price) * card.quantity,
      qty: card.quantity
    }));

    const requestData = orderDetails;

    console.log('Order details being sent to API:', requestData);

    try {
      const response = await fetch('http://localhost:3000/api/orderDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      console.log('Checkout successful:', data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Order Detail successfully!'
      })
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <>
      <section className='min-h-screen bg-gray-100 py-0 sm:py-0 lg:py-0'>
        <div className='fixed lg:fixed sm:fixed mx-auto max-w-screen px-4 sm:px-0 lg:py-0 lg:w-[363px] sm:w-[220px]'>
          <div className='items-center justify-start'>
            <div className='bg-blue-500 rounded flex justify-between gap-5 w-full p-2 lg:p-2 sm:p-1'>
              <div>
                <p className='text-white text-sm sm:text-lg lg:text-lg'>Cart</p>
              </div>
              <div className='flex justify-between gap-2'>
                <FaShoppingCart className='text-white text-sm sm:text-lg lg:text-xl items-center justify-center pt-1' />
                <p className='text-white text-sm sm:text-lg lg:text-lg font-bold items-center'>{cards.length}</p>
              </div>
            </div>
          </div>
          <div className='mx-auto max-w-md sm:py-0 sm:mt-7 lg:py-0 py-3'>
            <div className='rounded-lg bg-white shadow-lg'>
              <div className='w-full flex h-10 justify-center'>
                <div onClick={() => setAddUserOpen(!addUserOpen)} className='p-1 m-2 pl-2 text-xs border border-gray-400 rounded w-[95%] cursor-pointer hover:text-blue-700'>
                  <span className='font-bold items-center justify-start flex gap-1'>
                    <IoPersonSharp />
                    {selectedUserName ? selectedUserName : 'Select Customer'}
                  </span>
                </div>
              </div>
              <div className='px-4 py-6 sm:px-2 sm:py-2 lg:px-6 lg:py-2'>
                <div className='flow-root lg:h-[305px] lg:w-[330px] sm:h-[200px] overflow-y-auto lg:pt-2'>
                  <ul className='lg:-my-7 sm:-my-6 lg:w-full lg:h-96 sm:w-full sm:h-96'>
                    {/* list cart when add food */}
                    {cards.map((item, i) => (
                      <li
                        key={i}
                        className='flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0'
                      >
                        <div className='shrink-0 relative'>
                          <img
                            className='h-16 w-16 max-w-full rounded-lg object-cover'
                            src={`http://localhost:3000/images/${item.image}.jpg`}
                            alt=''
                          />
                        </div>
                        <div className='relative flex flex-1 flex-col justify-between lg:h-[65px] sm:h-[65px]'>
                          <div className='sm:col-gap-5 sm:grid sm:grid-cols-2 lg:w-full lg:h-[100%] sm:w-full sm:h-[100%] justify-between flex'>
                            <div className='pr-8 sm:pr-5'>
                              <div className='lg:w-full lg:h-[51%] sm:w-[63px] sm:h-[64%]'>
                                <p className='lg:text-xs sm:text-[9px] font-semibold text-gray-900'>{item.name}</p>
                              </div>
                              <div className='lg:w-full lg:h-[48%] sm:w-[63px] sm:h-[35%] grid grid-cols-3 lg:gap-1 sm:gap-1 lg:pt-1 sm:pt-[3px]'>
                                <button
                                  className='lg:text-xl bg-blue-500/70 hover:bg-blue-700 text-white font-bold px-2 rounded lg:h-7 lg:w-7 sm:h-5 sm:text-sm sm:px-2 sm:w-5'
                                  onClick={() => decrementQuantity(i)}
                                >
                                  -
                                </button>
                                <div className='lg:text-xl lg:px-2 lg:h-7 lg:w-7 bg-blue-500/70 rounded text-white font-bold sm:h-5 sm:text-sm sm:px-2 sm:w-5 sm:flex justify-center'>
                                  {item.quantity}
                                </div>
                                <button
                                  className='lg:text-xl bg-blue-500/70 hover:bg-blue-700 text-white font-bold px-2 rounded lg:h-7 lg:w-7 sm:h-5 sm:text-sm sm:px-1 sm:w-5'
                                  onClick={() => incrementQuantity(i)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className='mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end'>
                              <p className='shrink-0 w-20 lg:text-base sm:text-xs font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right'>
                                {item.price}$
                              </p>
                            </div>
                          </div>
                          <div className='absolute top-0 right-0 flex sm:bottom-0 sm:top-auto'>
                            <button
                              type='button'
                              className='flex rounded lg:p-2 sm:p-1 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900'
                              onClick={() => removeFromCart(i)}
                            >
                              <svg
                                className='block h-5 w-5'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M6 18L18 6M6 6l12 12'
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='mt-6 space-y-3 border-t border-b py-8'>
                  <div className='flex items-center justify-between'>
                    <p className='text-gray-400'>Subtotal</p>
                    <p className='text-lg font-semibold text-gray-900'>{prices}$</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='text-gray-400'>Shipping</p>
                    <p className='text-lg font-semibold text-gray-900'>{shippingCost}$</p>
                  </div>
                </div>
                <div className='mt-6 flex items-center justify-between'>
                  <p className='text-sm font-medium text-gray-900'>Total</p>
                  <p className='text-2xl font-semibold text-gray-900'>
                    <span className='text-xs font-normal text-gray-400'>USD</span> {total}$
                  </p>
                </div>
                <div className='mt-6  text-center'>
                  <button
                    type='button'
                    className='group inline-flex lg:w-full sm:w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 lg:text-lg sm:text-xs font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 cursor-pointer'
                    onClick={handleCheckout}
                  >
                    GO TO CHECKOUT
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='group-hover:ml-8 ml-4 h-6 w-6 transition-all'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M13 7l5 5m0 0l-5 5m5-5H6' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddUser open={addUserOpen} handleClose={() => setAddUserOpen(!addUserOpen)} />
    </>
  )
}

export default Payment
