

import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useBasket } from '../utils/PanierContext'




import CreditCardInput from 'react-credit-card-input';
import { useAuth } from '../utils/AuthContext'
import { addDoc, collection, doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'
export default function Example() {
    const [loading, setLoading] = useState(false)
    const { panier, deleteProduct, totalPanier, setPanier } = useBasket()
    const [card, setCard] = useState({ num: "", exp: "", csv: "", address: "" })

    const { currentUser } = useAuth()

    const commandPanier = async () => {
        setLoading(true);


        try {

            const docRef = await addDoc(collection(db, "commandes"), {
                address: card.address || "Non defini",
                montant: totalPanier() || 0,
                panier: panier,
                name: currentUser.displayName || "Inconnue",
                uid: currentUser.uid || "uid_inconnue",
                email: currentUser.email,
                avatar: currentUser.photoURL,
                isPayed: true,

                date: Timestamp.now(),
            });

            console.log(docRef);


            console.log(currentUser.uid);

            const docRefo = doc(db, "clients", `${currentUser.uid}`);
            const docSnap = await getDoc(docRefo);
            console.log("*******M******");

            console.log(docSnap.exists());


            if (docSnap.exists() == false) {
                await setDoc(doc(db, "clients", currentUser.uid), {
                    name: currentUser.displayName || "Inconnue",
                    uid: currentUser.uid || "uid_inconnue",
                    email: currentUser.email || "",
                    avatar: currentUser.photoURL || "",
                    date: Timestamp.now(),
                });
                console.log("*******D******");
            }




            for (var i = 0; i < panier.length; i++) {

                const productRef = doc(db, "products", panier[i].product.id);

                // update product quantity
                await updateDoc(productRef, {
                    stock: panier[i].product.quantity - panier[i].count
                });
            }

            setLoading(false);
            setCard({ csv: "", exp: "", num: "", address: "" })
            setPanier([])
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <>

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


                        <form className="mt-6" >

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
                                            value={card.address}
                                            onChange={(e) => setCard({ ...card, address: e.target.value })}
                                            placeholder="Entrer l'adresse de livraison"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>


                            </div>

                            {/* {loading ? <>encours ...</> : ( */}

                            <button
                                type="submit"
                                onClick={
                                    async (e) => {
                                        console.log(">>>>>");

                                        e.preventDefault();
                                        await commandPanier();
                                    }
                                }
                                className="mt-6  w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none"
                            >
                                Payer {totalPanier()}$
                            </button>
                            {/* )} */}


                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}
