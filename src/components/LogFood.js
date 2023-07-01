import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { submit, deleteRecord, editRecord } from '../features/submitFoodSlice'
import { createClient } from '@supabase/supabase-js'
//import config from '../supabase/config.toml'


const supabaseUrl = 'https://mgksxejsytiekgoegymi.supabase.co'
//const supabaseKeyFromConfig = supabaseKey
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1na3N4ZWpzeXRpZWtnb2VneW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5MDY0ODIsImV4cCI6MjAwMzQ4MjQ4Mn0.8ZrhQ99WNx320VtwJpp59kGOUQc-ebwHaUeQIfl5_vQ"
const supabase = createClient(supabaseUrl, supabaseKey)



export default function LogFood() {
    const currentData = useSelector((state) => {
        return state.currentState.displayData
    })
    console.log("currentData", currentData)
    const dispatch = useDispatch()
    const [inputFoodItems, setInputFoodItems] = useState({ foodItemName: '', calories: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [databaseFoodItems, setDatabaseFoodItems] = useState([])
    const [rowBeingEdited, setRowBeingEdited] = useState('')
    const [editedRecord, setEditedRecord] = useState({ foodItemName: '', calories: 0 })
    //const [isEditSearchLoading, setIsEditSearchLoading] = useState(false)



    const onFoodSubmit = (e) => {
        //e.preventDefault()
        dispatch(submit(inputFoodItems))
        e.target.reset()
    }
    const onDeleteSubmit = async (e) => {
        //e.preventDefault()
        await dispatch(deleteRecord(e.target.id))
        window.location.reload()

    }
    const onEditSubmit = (e) => {
        console.log("payload", {editedRecord, rowBeingEdited})
        dispatch(editRecord({editedRecord, rowBeingEdited}))
    }
    const onEditPress = async (e) => {
        const response = await supabase.from('foodDataTest').select().eq("id",e.target.id)
        console.log(response)
        setEditedRecord({...editedRecord, foodItemName: response.data.foodItemName, calories: response.data.calories})
        //setIsEditSearchLoading(true)
        console.log("editedRecord",editedRecord)
        setRowBeingEdited(e.target.id)
    }
    const onEditCancel = (e) => {
        setRowBeingEdited('')
    }



    const onPageLoad = async (e) => {
        async function getData() {
            const response = await supabase.from('foodDataTest').select()
            console.log("response is:", response.data)
            setDatabaseFoodItems(response.data);
            setIsLoading(true);
        }
        await getData()


    }

    useEffect(() => {
        let ignore = false;

        if (!ignore) onPageLoad()
        return () => { ignore = true; }
    }, [rowBeingEdited])

    return <div>
        <p>Log food page</p>
        <p>Current state:</p>
        {
            !isLoading ? <p>Loading</p> :
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Food Name</td>
                            <td>Calories</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            databaseFoodItems.map((item) => {
                                return (
                                    <tr key={item.id}>

                                        <td>{item.id}</td>
                                        <td>
                                            {String(item.id) === String(rowBeingEdited)  ?
                                                <input type="text" name="foodItemName" defaultValue=/*{item.foodItemName}*/''
                                                    onChange={(e) => {
                                                        setEditedRecord({ ...editedRecord, foodItemName: String(e.target.value) })
                                                    }
                                                    } /> :
                                                item.foodItemName}
                                        </td>
                                        <td>
                                            {String(item.id) === String(rowBeingEdited)   ?
                                                <input type="number" name="calories" defaultValue=/*{item.calories}*/'0'
                                                    onChange={(e) => {
                                                        setEditedRecord({ ...editedRecord, calories: Number(e.target.value) })
                                                    }
                                                    } /> :
                                                item.calories}
                                        </td>
                                        <td>
                                            {String(item.id) === String(rowBeingEdited)   ?
                                                <button type="submit" form="editForm" id={item.id} onClick={onEditSubmit}>Submit Changes</button> :
                                                <button type="button" id={item.id} onClick={onDeleteSubmit}>Delete</button>}
                                        </td>
                                        <td>
                                            {String(item.id) === String(rowBeingEdited)   ?
                                                <button type="button" id={item.id} onClick={onEditCancel}>Cancel</button> :
                                                <button type="button" id={item.id} onClick={onEditPress}>Edit</button>}
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
        }
        <form onSubmit={onFoodSubmit}>
            <label htmlFor='foodItemName'>Food Item Name:</label>
            <input onChange={(e) => {
                setInputFoodItems({ ...inputFoodItems, foodItemName: e.target.value })
            }} type="text" name='foodItemName' required />
            <label htmlFor='calories'>Calories:</label>
            <input onChange={(e) => {
                setInputFoodItems({ ...inputFoodItems, calories: Number(e.target.value) })
            }
            } type="number" name='calories' required />
            <button type='submit'>Submit</button>
        </form>
    </div>
}