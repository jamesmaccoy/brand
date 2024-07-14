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



export default function Details({id, name, coverAmount, noButton = false, premium, category, image}) {

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


    {/* Only show the first product */}
    {products.length > 0 && (
      <div key={id} className="bg-white p-2 my-4 w-full flex justify-between items-center flex-col bg-gray-300 shadow-md rounded-md"> 
          <span>{image}</span>
          <main className="bg-gray-900 p-4 rounded-lg flex items-left w-full">
           
           <h1 className=" text-white p-2 rounded-md text-2xl font-bold">{coverAmount}</h1></main>
           <div className="p-4 w-1/4 flex flex-col items-left justify-between flex-wrap ">
             <span className="capitalize font-sans w-ful ">{name}</span>
      
            
             <span className="font-sans">{premium}</span>
             <span>{category}</span>
     
            {
             !noButton &&
             <ProductButton id={id} />
            } 
           </div>
           <button onClick={() => deleteProduct(id)} className="font-sans ml-8 p-4 border-1-2 border-slate-900 hover:bg-slate-900 hover:text-white  w-16">Remove</button>
          </div>
    )}
  
</div>
      
    )
}
