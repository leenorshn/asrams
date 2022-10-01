
import { Disclosure } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useBasket } from '../utils/PanierContext'




import CreditCardInput from 'react-credit-card-input';
import { useAuth } from '../utils/AuthContext'
import { async } from '@firebase/util'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../utils/firebase'
export default function Example() {
    const [loading, setLoading] = useState(false)
    const { panier, deleteProduct, totalPanier } = useBasket()
    const [card, setCard] = useState({ num: "", exp: "", csv: "" })
    const { currentUser } = useAuth()

    const commandPanier = async () => {
        try {
            setLoading(true);
            const docRef = await addDoc(collection(db, "products"), {
                card: card,
                panier: panier,
                montant: totalPanier(),
                isPayed: true,
                client: currentUser,
                date: Timestamp.now(),
            });

            setLoading(false);
            setCard({ csv: "", exp: "", num: "" })
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
                <h1 className="sr-only">Checkout</h1>



                {/* Order summary */}
                <section aria-labelledby="summary-heading" className="hidden  w-1/2 flex-col bg-gray-50 lg:flex">


                    <ul role="list" className="flex-auto w-3/4 divide-y divide-gray-200 overflow-y-auto px-6">
                        {panier.map((basket) => (
                            <li key={basket.product.id} className="flex justify-between space-x-6 py-6">
                                <div className='flex space-x-4'>
                                    <img
                                        src={basket.product.url}
                                        alt={basket.product.id}
                                        className="h-20 w-20 flex-none rounded-md bg-gray-200 object-cover object-center"
                                    />
                                    <div className="flex  justify-between ">
                                        <div className=" text-sm font-medium">
                                            <h3 className="text-gray-900">{basket.product.name}</h3>
                                            <p className="text-gray-900 text-2xl">{basket.product.price} $</p>
                                            <h1 className="text-orange-600 text-lg">quantite: {basket.count} cartons</h1>
                                        </div>


                                    </div>
                                </div>
                                <div className="flex pl-4">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            deleteProduct(basket.product.id)
                                        }}
                                        type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        <TrashIcon className='w-6 h-6 text-slate-600' />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>



                    <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                        <dt>Total</dt>
                        <dd className="text-3xl">{totalPanier()}$</dd>
                    </div>


                </section>

                {/* Checkout form */}
                <section
                    aria-labelledby="payment-heading"
                    className="flex-auto min-h-screen overflow-y-auto bg-slate-300 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
                >
                    <h2 id="payment-heading" className="sr-only">
                        Payment and shipping details
                    </h2>

                    <div className="mx-auto max-w-lg lg:pt-6">
                        <span>Client:</span>
                        <div className='flex space-x-4'>
                            <img src={currentUser.photoURL} alt={currentUser.email} className="h-16 w-16 rounded-full object-center object-cover" />
                            <div className='flex flex-col '>
                                <h2 className='text-xl'>{currentUser.displayName}</h2>
                                <h3>{currentUser.email}</h3>
                            </div>
                        </div>


                        <form className="mt-6">

                            <CreditCardInput
                                style={{ "all": "initial" }}
                                cardNumberInputProps={{
                                    value: card.num, onChange: (e) => {
                                        setCard({ ...card, num: e.target.value })
                                    }
                                }}
                                cardExpiryInputProps={{
                                    value: card.exp, onChange: (e) => {
                                        setCard({ ...card, exp: e.target.value })
                                    }
                                }}
                                cardCVCInputProps={{
                                    value: card.csv, onChange: (e) => {
                                        setCard({ ...card, csv: e.target.value })
                                    }
                                }}
                                fieldClassName="input"
                            />

                            <div className="grid grid-cols-12 gap-y-6 gap-x-4">






                                <div className="col-span-full">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Entrer l'adresse de livraison"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>


                            </div>

                            <div className="mt-6 flex space-x-2">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="same-as-shipping"
                                        name="same-as-shipping"
                                        type="checkbox"
                                        defaultChecked
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                                    Adresse de livraison
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="mt-6 w-full rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                Payer {totalPanier()}$
                            </button>


                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}
