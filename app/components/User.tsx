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
import UserButton from './UserButton';

export default function getUser({id, name, email, noButton = false}) {

    const [users, setUsers] = useState([
        { id: 1, name: "James", coverAmount: 2000 },
        { id: 2, name: "User 2", coverAmount: 2000 },
        { id: 3, name: "User 3", coverAmount: 3000 },
      ]);
      const [newUser, setNewUser] = useState({ name: '', email: '' });
      const [total, setTotal] = useState(0);
      
    
    
       // Read items from database
       useEffect(() => {
        const q = query(collection(db, 'users'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let usersArr = [];
    
          querySnapshot.forEach((doc) => {
            usersArr.push({ ...doc.data(), id: doc.id });
          });
          setUsers(usersArr);
          console.log({ users})
        });
      }, []);
    
    return (
             
        
<div className="bg-gray-200 p-4 rounded-lg">
  
  <ul>
    {users.map((User, id) => (
     <li key={id} className="my-4 w-full flex justify-between items-center bg-gray-300">
      <div className="p-4 w-full flex justify-between">
        <span className="capitalize">{User.name}</span>
        <span>{User.email}</span>

       {
        !noButton &&
        <UserButton id={User.id} />
       } 
      </div>
      
     </li>
    ))}
  </ul>
</div>
      
    )
}