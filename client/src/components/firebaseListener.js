import React, { useEffect, useState } from 'react';
import { useDispatch,connect } from 'react-redux';
import { update as updateAllCharactersData } from './slices/allCharactersSlice';
import { ref, onValue, set } from 'firebase/database';
import { firebaseDatabase } from './firebase/firebase'; // Ensure firebaseDatabase is correctly imported
import { MY_CHARACTER_INIT_CONFIG } from './characterConstants';

const FirebasePositionListener = ({updateAllCharactersData}) => {
    useEffect(() => {
        const db = firebaseDatabase;
        const positionRef = ref(db, 'users/');
        const handlePositionChange = (snapshot) => {
            const data = snapshot.val();
            console.log('position', data);

            if (data) {
            updateAllCharactersData(data);
            }
        };
        // Subscribe to position updates
        const dataUnsubscribe = onValue(positionRef, handlePositionChange);

        // Subscribe to user data updates
       // Cleanup function
        return () => {
            dataUnsubscribe(); // Cleanup position listener
        };
    }, []);

    return <></>;
};

export default connect(null,{updateAllCharactersData}) (FirebasePositionListener);