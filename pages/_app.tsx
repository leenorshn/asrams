import Head from 'next/head'
import { useRouter } from 'next/router'
import AppBar from '../components/AppBar'
import '../styles/globals.css'
import { AuthContext, AuthProvider } from '../utils/AuthContext'
import { BasketProvider } from '../utils/PanierContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return <div>
    <AuthProvider>
      <BasketProvider>
        {router.pathname != "/login" ? <AppBar /> : null}
        <Component {...pageProps} />
      </BasketProvider>
    </AuthProvider>
  </div>
}

export default MyApp
