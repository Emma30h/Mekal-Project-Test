import { addDoc, collection, doc, deleteDoc, getDoc } from "firebase/firestore";  
import { db } from "../firebase";

import { useState, useEffect } from "react";
import { async } from "@firebase/util";

export function ProductForm({addProductToFirebase, currentID, products}){
    
    const [ product, setProduct ] = useState({
        description: "",
        name: "",
        barCode: "",
        reference: "",
        amount:"",
        price: ""
    })

    const handleChange = ({target: {name, value}})=>{
        setProduct({...product, [name]: value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(product)
        if(window.confirm("You are loading up a product to database. ")){
            addProductToFirebase(product, currentID)
            setProduct({description: "",
            name: "",
            barCode: "",
            reference: "",
            amount:"",
            price: ""})
        }
    }

    const getProductByID = async(id)=>{
        const productByID = await getDoc(doc(db, "products", id))
        setProduct({...productByID.data()})
    }


    useEffect(()=>{
        if(currentID === ""){
            setProduct({description: "", name: "", barCode: "", reference: "", amount:"", price: ""})
        }else{
            getProductByID(currentID)
        }
    }, [currentID])
    
    return(
        <>
            <div className="dashboard-form-container">
                <form className="dashboard-form" id="dashboard-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input type="text" name="description" onChange={handleChange} value={product.description} placeholder="Type a description..."/>
                    </div>
                    <div>
                        <label htmlFor="product">Product:</label>
                        <input type="text" name="name" onChange={handleChange} value={product.name} placeholder="Type a product..."/>
                    </div>
                    <div>
                        <label htmlFor="bar-code">Bar Code:</label>
                        <input type="text" name="barCode" onChange={handleChange} value={product.barCode} placeholder="Enter barcode..."/>
                    </div>
                    <div>
                        <label htmlFor="reference">Reference:</label>
                        <input type="text" name="reference" onChange={handleChange} value={product.reference} placeholder="Enter reference..."/>
                    </div>
                    <div>
                        <label htmlFor="amount">Amount:</label>
                        <input type="text" name="amount" onChange={handleChange} value={product.amount} placeholder="Enter an amount of products..."/>
                    </div>
                    <div>
                        <label htmlFor="precio">Precio:</label>
                        <input type="text" name="price" onChange={handleChange} value={product.price} placeholder="Enter a price of a product..."/>
                    </div>
                    <button className="button-form">{currentID === "" ? "Send" : "Update"}</button>
                </form>
            </div>
        </>
    )
}