import React from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import { useState, useEffect, useRef } from 'react';
export default function Card(props) {  //basically props allows to customize, so for every food item
                                    // shouldnt be manually fed, and is read automatically.
        let dispatch = useDispatchCart();
        let data = useCart();
        const priceRef= useRef();
        let options =props.options;
        let priceOptions = Object.keys(options)
        const [qty, setQty]=useState (1)
        const [size, setSize]=useState ("")
        const handleAddToCart = async()=>{ //Only add wont work, same qty can be added again and again
            let food =[]
            // console.log("eeeee==>"+JSON.stringify(props))
            for(const item of data){
                // console.log("data ka item ka bkl====>"+JSON.stringify(item))
                if(item.id=== props.foodItem._id){  //adding those items to food array which exist in data (cart)
                    food = item;
                    console.log(food)
                    break;
                }
            }
            if(food!==[]){
                if(food.size === size){ //this function is for making changes in the size(half/full/reg/med,etc)
                                     //where if the size is same, then UPDATE qty, else if both size and qty change, its a new order.
                    await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty})
                    return
                }
                else if(food.size !== size){
                    await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price: finalPrice, qty:qty, size:size})
                    return
                }
                return
            }
            await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price: finalPrice, qty:qty, size:size})

            //console.log(data);
        }    //half and full have different prices, so map access
    let finalPrice = qty* parseInt(options[size])
    useEffect(()=>{
        
        setSize(priceRef.current.value)   //empty array dependecy, on 1st load
        
    }, [])
    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                {/*so basically the mt-4 meaning is that margin is on top and the space we are leaving
    for the remaining body is of about 4 lines*/}
                <img className="card-img-top" src={props.imgSrc} alt="Card image cap" style={{height: "150px",objectFit:"fill"}} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div classname='container w-100'>
                        <select className='m-2 h-100  bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(3), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref = {priceRef} onChange={(e)=>{
                            console.log("e====>"+JSON.stringify(e.target.value))
                            setSize(e.target.value);}}>
                            {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5 '>{/*the d-inline means that the display 
                of the text shall be in line with the existing text*/}
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
