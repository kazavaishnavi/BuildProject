import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import CanvasContext from './CanvasContext';
import { MOVE_DIRECTIONS, MAP_DIMENSIONS, TILE_SIZE } from './mapConstants';
import { MY_CHARACTER_INIT_CONFIG } from './characterConstants';
import { checkMapCollision } from './utils';
import { update as updateAllCharactersData } from './slices/allCharactersSlice';
import FirebasePositionListener from './firebaseListener';
import { firebaseDatabase } from "./firebase/firebase";
import { set, ref,onDisconnect  } from "firebase/database";
import OtherCharacters from './otherCharacters';


const GameLoop = ({ children, allCharactersData }) => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // frameCount used for re-rendering child components
        console.log("initial setContext");
        setContext({ canvas: canvasRef.current.getContext('2d'), frameCount: 0 });
    }, [setContext]);
   useEffect(() => {
        // Set up onDisconnect callback to remove character from Firebase
        const dbRef = ref(firebaseDatabase, `users/${MY_CHARACTER_INIT_CONFIG.id}`);
        const disconnectRef = onDisconnect(dbRef);
        disconnectRef.remove()
            .then(() => {
                console.log("Character will be removed on disconnect");
            })
            .catch((error) => {
                console.error("Error setting up onDisconnect:", error);
            });

        return () => {
            disconnectRef.cancel();
        };
    }, []);

    // keeps the reference to the main rendering loop
    const loopRef = useRef();
    const mycharacterData = allCharactersData[MY_CHARACTER_INIT_CONFIG.id];
    

    const moveMyCharacter = useCallback((e) => {

        var currentPosition = mycharacterData.position;
        const key = e.key;
        if (MOVE_DIRECTIONS[key]) {
            // ***********************************************
            // TODO: Add your move logic here

            const [dx, dy] = MOVE_DIRECTIONS[key];
            const newPosition = {
                x: currentPosition.x + dx,
                y: currentPosition.y + dy,
            };

            if (!checkMapCollision(newPosition.x, newPosition.y)) {

                /*const updatedUsers = {
                      // allCharactersData,
                       //[MY_CHARACTER_INIT_CONFIG.id]: { mycharacterData, position: newPosition }
                   }; */

                const positionref = ref(firebaseDatabase, 'users/' + MY_CHARACTER_INIT_CONFIG.id + '/position');

                set(positionref, newPosition);

            }
        }
    }, [mycharacterData, dispatch, allCharactersData]);

    const tick = useCallback(() => {
        if (context != null) {
            setContext({ canvas: context.canvas, frameCount: (context.frameCount + 1) % 60 });
        }
        loopRef.current = requestAnimationFrame(tick);
    }, [context]);

    useEffect(() => {
        loopRef.current = requestAnimationFrame(tick);
        return () => {
            loopRef.current && cancelAnimationFrame(loopRef.current);
        }
    }, [loopRef, tick])

    useEffect(() => {
        document.addEventListener('keypress', moveMyCharacter);
        return () => {
            document.removeEventListener('keypress', moveMyCharacter);
        }
    }, [moveMyCharacter]);

    return (
        <CanvasContext.Provider value={context}>
            <FirebasePositionListener></FirebasePositionListener>
      
            <canvas
                ref={canvasRef}
                width={TILE_SIZE * MAP_DIMENSIONS.COLS}
                height={TILE_SIZE * MAP_DIMENSIONS.ROWS}
                class="main-canvas"
            />
            {children}
        </CanvasContext.Provider>
    );
};

const mapStateToProps = (state) => {
    return { allCharactersData: state.allCharacters.users };
};

export default connect(mapStateToProps, {})(GameLoop);


