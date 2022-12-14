import { collection, onSnapshot, query } from 'firebase/firestore'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ProductTable from '../components/ProductTable'
import styles from '../styles/Home.module.css'
import { db } from '../utils/firebase'

export default function Home() {


  const [products, setProducts] = useState([])

  useEffect(() => {
    const q = query(collection(db, "products"),);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ops = [];
      querySnapshot.forEach((doc) => {
        ops.push({ ...doc.data(), id: doc.id });
      });
      // console.log(ops);

      setProducts(ops);
    });
    return () => unsubscribe()

  }, []);
  return (
    <div >
      <Head>
        <title>Asrams-shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <ProductTable data={products} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tout droit reservé{' Ams'}

        </a>
      </footer>
    </div>
  )
}
