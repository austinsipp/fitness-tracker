import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'


export default function LogFood () {
    const currentEntry = useSelector(state => {
        return state.inventory
    })
    const dispatch = useDispatch()
    const [inputFoodItems, setInputFoodItems] = useState({foodItemName:'', calories:0})

    const onFoodSubmit = (e) => {
        e.preventDefault()
        
        console.log(inputFoodItems)
        dispatch(receive(inputFoodItems))
        e.target.reset()
    }

    return <div>
        <p>Receive Shipment page</p>
        <form onSubmit={onFoodSubmit}>
            <label htmlFor='foodItemName'>Food Item Name:</label>
            <input onChange={(e) => {
                setInputFoodItems({...inputFoodItems, foodItemName:e.target.value})
                }} type="text" name='itemName' required/>
            <label htmlFor='calories'>Calories:</label>
            <input onChange={(e) => {
                setInputInventoryItems({...inputFoodItems, calories:Number(e.target.value) })
            }
            } type="number" name='calories' required/>
            <button type='submit'>Submit</button>
        </form>
    </div>
}