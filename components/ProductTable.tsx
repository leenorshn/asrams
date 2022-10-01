import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useBasket } from "../utils/PanierContext";
import Productdialog from "./ProductDialog";



export default function ProductTable({ data }) {
    const [open, setOpen] = useState(false)
    const { setSelectedProduct } = useBasket()


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-2 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-4xl font-normal tracking-tight text-gray-900">Nos  medicals</h2>

                <div className="mt-3 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {data && data.map((product, i) => (
                        <div key={product.id}>
                            <div className="group relative">
                                <div className="min-h-40 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                                    <img
                                        src={product.url}
                                        alt={product.id}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.id}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>

                                    </div>
                                    <p className="text-xl font-medium text-gray-900 ">{product.price}$</p>
                                </div>

                            </div>

                            <a
                                onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedProduct(product)
                                    setOpen(true);
                                }}
                                className="bg-white flex space-x-2 rounded-md cursor-pointer hover:bg-black z-30 hover:text-white text-black border border-slate-400 py-2 px-4"
                            >
                                <span>Ajouer au panier </span>
                                <ShoppingCartIcon className="h-5 w-5" />
                            </a>

                            <Productdialog key={i} open={open} setOpen={setOpen} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
