import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    foodData: [{
        foodItemName: '',
        calories: 0
    }
    ]
}

export const submitFoodSlice = createSlice({
    name: 'submitData',
    initialState,
    reducers: {
        submit: (state, action) => {
            //const { foodItemName, calories } = action.payload
            let newState = state
            console.log(action.payload)
            newState.foodData.push(action.payload)
            console.log("foodData:", newState.foodData)
            debugger
            /*Object.keys(state).forEach((key) => {
                if( key === itemName) {
                    state[itemName].quantity += quantity
                } else {
                    state[itemName]={quantity}
                }
            })*/
            /*if (state[itemName]) {
                state[itemName].quantity += quantity
            } else {
                state[itemName]={quantity}
            }*/
            /*
            if (newState[foodItemName]) {
                newState[foodItemName].calories += calories
            } else {
                newState[foodItemName]={calories}
            }*/
            return newState
        }/*,
        use: (state, action) => {
            const {itemName, quantity} = action.payload
            let newState = state
            if (newState[itemName] && newState[itemName].quantity >= quantity) {
                newState[itemName].quantity -= quantity
            } else {
                newState.error = `You only have ${newState[itemName].quantity} ${itemName}, you cannot remove more than that from inventory!`
            }
            return newState
        },
        acknowledgeError: (state) => {
            return{...state, error:''}
        }*/
    }
})

export const { submit } = submitFoodSlice.actions
export default submitFoodSlice.reducer