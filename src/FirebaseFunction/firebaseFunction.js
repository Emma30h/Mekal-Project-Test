import { async } from "@firebase/util";
import { addDoc, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import  { Toaster, toast } from 'react-hot-toast';


//add product to Firebase
export const addProductToFirebase = async(Object)=>{
    await addDoc(collection(db, "products"), Object )
}

//delete a doc
export const deleteProduct = async(id)=>{
    if(window.confirm("are you sure you want to delete this product?")){
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        toast.success(`Product deleted`)
    }
}

//get product from Firebase
export const getProductsFromDB = async()=>{
    const data = await getDocs(collection(db, "products"))
    setProducts(
        data.docs.map( (doc)=> ({...doc.data(), id:doc.id}))
    )
}


const updateProduct = async(id, Object)=>{
    await updateDoc(doc(db, "product", id), Object)
}