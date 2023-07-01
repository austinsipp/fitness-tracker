import { createSlice } from "@reduxjs/toolkit"

import { createClient } from '@supabase/supabase-js'
//require('dotenv').config()

const supabaseUrl = 'https://mgksxejsytiekgoegymi.supabase.co'
//const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1na3N4ZWpzeXRpZWtnb2VneW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5MDY0ODIsImV4cCI6MjAwMzQ4MjQ4Mn0.8ZrhQ99WNx320VtwJpp59kGOUQc-ebwHaUeQIfl5_vQ"
const supabase = createClient(supabaseUrl, supabaseKey)
/*
async function getData () {
    const dataFromSupabase = await supabase.from('foodDataTest').select()
    return dataFromSupabase
}

const data = await getData().data
*/
/*
const initialState = {
    foodData: [{
        foodItemName: '',
        calories: 0
    }
    ]
}*/

const initialState = {
    foodData: [],
    displayData: [{test:"test"}]
}



export const submitFoodSlice = createSlice({
    name: 'submitData',
    initialState,
    reducers: {
        submit: (state, action) => {
            //const { foodItemName, calories } = action.payload
            let newState = state
            console.log(action.payload)
            //newState.foodData.push(action.payload)
            console.log("foodData:", newState.foodData)
            
            async function sendData (sentRecord) {
                const response = await supabase.from('foodDataTest').insert(sentRecord)
                console.log("response is:",response)
            }
            sendData(action.payload)
            return newState
        },
        deleteRecord: (state, action) => {
            //const { foodItemName, calories } = action.payload
            let newState = state
            console.log(action.payload)
            //newState.foodData.push(action.payload)
            //console.log("foodData:", newState.foodData)
            
            async function deleteData (sentRecord) {
                const response = await supabase.from('foodDataTest').delete(sentRecord).eq("id",action.payload)
                console.log("response is:",response)
                debugger
            }
            deleteData(action.payload)
            
            return newState
        },
        editRecord: (state, action) => {
            let newState = state
            async function editData ({editedRecord, rowBeingEdited}) {
                const response = await supabase.from('foodDataTest').update(editedRecord).eq("id",rowBeingEdited)
                console.log("response is:",response)
            }
            editData(action.payload)

            return newState
        }
        
        
        
        
        /*,
        getFromDatabase: async (state) => {
            let newState = state
            async function getData () {
                const response = await supabase.from('foodDataTest').select()
                console.log("response is:",response)
                return response
            }
            
            console.log("look here",await getData())
            let data = await getData()
            
            newState.displayData.push(data)
            
            return newState
        }*/
    }
})

export const { submit, deleteRecord, editRecord  } = submitFoodSlice.actions
export default submitFoodSlice.reducer