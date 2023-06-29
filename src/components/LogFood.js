import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {submit} from '../features/submitFoodSlice'


export default function LogFood () {
    const currentData = useSelector(state => {
        return state.foodData
    })
    const dispatch = useDispatch()
    const [inputFoodItems, setInputFoodItems] = useState({foodItemName:'', calories:0})

    const onFoodSubmit = (e) => {
        e.preventDefault()
        
        //console.log(inputFoodItems)
        dispatch(submit(inputFoodItems))
        e.target.reset()
    }

    return <div>
        <p>Log food page</p>
        <p>Current state:</p>
        <p>{currentData}</p>
        <form onSubmit={onFoodSubmit}>
            <label htmlFor='foodItemName'>Food Item Name:</label>
            <input onChange={(e) => {
                setInputFoodItems({...inputFoodItems, foodItemName:e.target.value})
                }} type="text" name='foodItemName' required/>
            <label htmlFor='calories'>Calories:</label>
            <input onChange={(e) => {
                setInputFoodItems({...inputFoodItems, calories:Number(e.target.value) })
            }
            } type="number" name='calories' required/>
            <button type='submit'>Submit</button>
        </form>
    </div>
}