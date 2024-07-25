import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { update as updateAllCharactersData } from './slices/allCharactersSlice';
import { ref, onValue, set } from 'firebase/database';
import { firebaseDatabase } from './firebase/firebase'; // Ensure firebaseDatabase is correctly imported
import { MY_CHARACTER_INIT_CONFIG } from './characterConstants';

const FirebasePositionListener = () => {
    const dispatch = useDispatch();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const db = firebaseDatabase;

        // Reference for position updates
        const positionRef = ref(db, 'users/' + MY_CHARACTER_INIT_CONFIG.id + '/position');

        // Reference for user data updates
        const userRef = ref(db, 'users/', MY_CHARACTER_INIT_CONFIG.id);

        // Handle position change
        const handlePositionChange = (snapshot) => {
            const newPosition = snapshot.val();
            console.log('position', newPosition);

            if (newPosition) {
                dispatch(updateAllCharactersData({ [MY_CHARACTER_INIT_CONFIG.id]: { position: newPosition } }));
            }
        };

        // Handle user data change
        const handleDataChange = (snapshot) => {
            const newData = snapshot.val();


            if (newData && !initialized) {
                dispatch(updateAllCharactersData(newData));
                setInitialized(true);
            }
        };

        // Subscribe to position updates
        const positionUnsubscribe = onValue(positionRef, handlePositionChange);

        // Subscribe to user data updates
        const userUnsubscribe = onValue(userRef, handleDataChange);

        // Cleanup function
        return () => {
            positionUnsubscribe(); // Cleanup position listener
            userUnsubscribe(); // Cleanup user data listener
        };
    }, [dispatch, initialized]);

    return null;
};

export default FirebasePositionListener;
