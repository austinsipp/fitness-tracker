import { createSlice } from "@reduxjs/toolkit"

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mgksxejsytiekgoegymi.supabase.co'
//const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1na3N4ZWpzeXRpZWtnb2VneW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5MDY0ODIsImV4cCI6MjAwMzQ4MjQ4Mn0.8ZrhQ99WNx320VtwJpp59kGOUQc-ebwHaUeQIfl5_vQ"
const supabase = createClient(supabaseUrl, supabaseKey)


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
            
            async function sendData (sentRecord) {
                const response = await supabase.from('foodDataTest').insert(sentRecord)
                console.log("response is:",response)
            }
            sendData(action.payload)
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