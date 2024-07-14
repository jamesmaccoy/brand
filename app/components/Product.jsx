'use client'
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  documentId,
} from 'firebase/firestore';
import { db } from '../firebase'
import ProductButton from './ProductButton';


export default function Product({id, name, coverAmount, noButton = false}) {

    const [products, setProducts] = useState([]);
      const [newProduct, setNewProduct] = useState({ name: '', coverAmount: '' });
      const [total, setTotal] = useState(0);
    
    
       // Read items from database
       useEffect(() => {
        const q = query(collection(db, 'products'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let productsArr = [];
    
          querySnapshot.forEach((doc) => {
            productsArr.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productsArr);
    
          // Read total from itemsArr
          const calculateTotal = () => {
            const totalPrice = productsArr.reduce(
              (sum, product) => sum + parseFloat(product.price),
              0
            );
            setTotal(totalPrice);
          };
          calculateTotal();
          return () => unsubscribe();
        });
      }, []);
    
      // Delete items from database
      const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'products', id));
      };
    
      useEffect(() => {
        setTotal(products.reduce((acc, product) => acc + product.coverAmount, 0));
      }, [products]);

    return (
             
        
<div className="bg-gray-200 p-4 rounded-lg">

  <ul>
    {products.map((product, id) => (
     <li key={id} className="bg-white my-4 w-full flex justify-between items-center bg-gray-300 shadow-md rounded-md"> 
           <div className="p-1 w-full flex justify-between">
             <span className="capitalize font-sans">{product.name}</span>
             <span>{product.coverAmount}</span>
     
            {
             !noButton &&
             <ProductButton id={product.id} />
            } 
           </div>
           <button onClick={() => deleteProduct(product.id)} className="font-sans ml-8 p-4 border-1-2 border-slate-900 hover:bg-slate-900 hover:text-white  w-16">Remove</button>
          </li>
     
    ))}
  </ul>
</div>
      
    )
}