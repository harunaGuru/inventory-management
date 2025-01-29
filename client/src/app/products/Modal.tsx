import React, { FormEvent, useState } from 'react'
import {v4} from 'uuid'
import Header from '../dashboard/Header';



type ProductFormData = {
    name: string;
    price: number;
    stockQuantity: number;
    rating: number
}

type ModalProps ={
    open: boolean;
    onClose: (value: boolean)=> void;
    onCreate: (formDat: ProductFormData)=> void
}
const Modal = ({open, onClose, onCreate}: ModalProps) => {
    const [formData, setformData] = useState({
        productId: v4(),
        name: '',
        price: 0,
        stockQuantity: 0,
        rating: 0
    })
    console.log('formdata', formData)
    if(!open) return null
    const handleClose = ()=>{
        onClose(!open)
        setformData({
            productId: v4(),
            name: '',
            price: 0,
            stockQuantity: 0,
            rating: 0
        })
    }
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {value, name} = e.target;
       
        
        if(name === 'name'){
            setformData({...formData, [name]: value })
        }else{
            setformData({...formData, [name]: parseFloat(value) })
        }
    }
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        onCreate(formData)
        handleClose()
    }
  return (
    <div className='fixed inset-0 h-full w-full z-40 bg-gray-600 opacity-90 overflow-y-auto'>
     
            <div className=' relative top-20 mx-auto w-96 border shadow-lg bg-white rounded-lg p-5'>
                <Header headerName='Create New Product' />
                <form onSubmit={handleSubmit} className='mt-5'>
                    <label className='font-medium block text-sm text-gray-700' htmlFor="productName" >Product Name</label>
                    <input required className='block w-full mb-2 p-1 border-gray-500 border-2 rounded-md' value={formData.name} onChange={handleChange} type="text" name="name" id="name" />
                    <label className='font-medium block text-sm text-gray-700' htmlFor="productprice">Product Price</label>
                    <input required value={formData.price} onChange={handleChange}  className='block w-full mb-2 p-1 border-gray-500 border-2 rounded-md' placeholder='Price'  type="number" name="price" id="price" />
                    <label className='font-medium block text-sm text-gray-700' htmlFor="stockQuantity">Stock Quantity</label>
                    <input required value={formData.stockQuantity} onChange={handleChange}  className='block w-full mb-2 p-1 border-gray-500 border-2 rounded-md' placeholder='Stock Quantity' type="number" name="stockQuantity"  id="stockQuantity" />
                    <label className='font-medium block text-sm text-gray-700' htmlFor="rating">Rating</label>
                    <input required value={formData.rating} onChange={handleChange}  className='block w-full mb-2 p-1 border-gray-500 border-2 rounded-md' placeholder='Rating' type="number" name="rating" id="rating" />
                    <button type="submit" className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>submit</button>
                    <button type='button'className='ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' onClick={handleClose}>Cancel</button>
                </form>
                
            </div>

    </div>
  )
}

export default Modal