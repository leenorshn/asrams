import React from 'react'
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import { useAuth } from '../utils/AuthContext';
import { useBasket } from '../utils/PanierContext';

const AppBar = () => {
    const { currentUser, logout } = useAuth()
    const { panier } = useBasket();

    console.log(currentUser);


    return (
        <div className='flex items-center justify-between px-16 py-2 bg-black text-orange-400'>
            <Link href={"/"}>
                <h1 className='font-bold cursor-pointer text-xl'>Asrames-Shop</h1>
            </Link>
            <div>
                <input className='w-96 rounded-full' type="text" placeholder='Rechercher produit' />
            </div>
            <div className='flex space-x-5 items-center'>
                <div className='relative cursor-pointer'>
                    {
                        currentUser ? (<Link href={"/panier"}>
                            <ShoppingCartIcon className='w-6 h-6 cursor-pointer text-white' />
                        </Link>) : (
                            <Link href={"/login"}>
                                <ShoppingCartIcon className='w-6 h-6 text-white' />
                            </Link>
                        )
                    }
                    <h1 className='absolute -top-3 -right-2 bg-white w-5 h-5 flex justify-center items-center rounded-full'>{panier.length || 0}</h1>
                </div>
                {currentUser ? <div>
                    <div className='flex space-x-3'>
                        <img src={currentUser.photoURL} className="h-8 w-8 rounded-full" alt="" />
                        <h1>{currentUser.displayName}</h1>
                        <button
                            onClick={
                                (e) => {
                                    e.preventDefault()
                                    logout()
                                }
                            }
                            className='text-orange-600 font-medium  bg-white rounded-full py-1 px-5'>logout</button>
                    </div>
                </div> : (<Link href={"/login"}>
                    <button className='text-orange-600 font-medium  bg-white rounded-full py-1 px-5'>{`s'inscrir`}</button>

                </Link>)}
            </div>
        </div>
    )
}

export default AppBar
