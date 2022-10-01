/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../utils/AuthContext'

export default function Example() {
    const router = useRouter()
    const { login, currentUser } = useAuth()
    useEffect(() => {

        if (currentUser) {
            router.replace("/panier")
        }
    }, []);

    return (
        <>

            <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h1 className='text-4xl text-center font-bold'>Asrams-shop</h1>
                        <h2 className="mt-6 text-center text-xl font-medium tracking-tight text-gray-900">
                            Identifiez-vous pour acheter
                        </h2>

                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div>
                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault()
                                    login()
                                }}
                                className="group relative flex w-full justify-center rounded-md border border-slate-700 bg-white py-2 px-4 text-sm font-medium text-black  focus:outline-none focus:ring-2 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Continuer avec google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
