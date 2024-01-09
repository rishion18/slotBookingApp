import {configureStore} from '@reduxjs/toolkit'
import eventReducers from './eventReducers.js'

export default configureStore({
    reducer:{
        Events: eventReducers
    }
})