
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import singularUserReducer from './reducers/singularUserReducer'
import userNameReducer from './reducers/userNameReducer'

const store = configureStore({

  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: singularUserReducer,
    userName: userNameReducer

  }
})


//console.log('storeState', store.getState())

export default store