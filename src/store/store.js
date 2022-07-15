import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user'; 
import OfficesReducer from './offices'; 
import friendsReducer from './friends';
import favoritesReducer from './favorites';
import ReservationReducer from './reservations';
import darkModeReducer from './darkMode';
import selectedFloorReducer from './selectedFloor';
import UserReservationReducer from './userReservations';
import adminReducer from "./admin"
import AdminReservationReducer from './adminReservations';

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
          }),
    reducer: {
        user: userReducer,
        offices: OfficesReducer,
        reservations: ReservationReducer,
        friends: friendsReducer,
        favorites: favoritesReducer,
        darkMode: darkModeReducer,
        selectedFloor: selectedFloorReducer,
        userReservations: UserReservationReducer,
        admin: adminReducer,
        adminReservations: AdminReservationReducer
    }
});

export default store;