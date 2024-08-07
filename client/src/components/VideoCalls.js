import React, { useEffect, useState } from "react";
import InitializeVideoCall from "./InitializeVideoCall";
import MyVideo from "./MyVideo";
import { connect } from "react-redux";
import { MY_CHARACTER_INIT_CONFIG } from "./characterConstants";

function VideoCalls({ myCharacterData, otherCharactersData, webrtcSocket }) {
    const [myStream, setMyStream] = useState();
    const [offersReceived, setOffersReceived] = useState({});

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setMyStream(stream);
        });
        webrtcSocket.on('receiveOffer', payload => {
            console.log('Received offer from:', payload.callFromUserSocketId, 'Offer signal:', payload.offerSignal);
            if (!Object.keys(payload.offerSignal).includes(payload.callFromUserSocketId)) {
                setOffersReceived({
                    ...offersReceived,
                    [payload.callFromUserSocketId]: payload.offerSignal,
                });
            }
        });
    }, [webrtcSocket,offersReceived]);

    const myUserId = myCharacterData?.id;
    const initiateCallToUsers = Object.keys(otherCharactersData)
        .filter((othersUserId) => othersUserId >= myUserId)
        .reduce((filterObj, key) => {
            filterObj[key] = otherCharactersData[key];
            return filterObj;
        }, {});

    return (
        <>
            {myCharacterData && myStream && (
                <div className="videos">
                    <MyVideo myStream={myStream} />
                    {Object.keys(initiateCallToUsers).map((othersUserId) => {
                        console.log("InitializeVideoCall", initiateCallToUsers[othersUserId]);
                        return (
                            <InitializeVideoCall
                                key={initiateCallToUsers[othersUserId].socketId}
                                mySocketId={myCharacterData.socketId}
                                myStream={myStream}
                                othersSocketId={initiateCallToUsers[othersUserId].socketId}
                                webrtcSocket={webrtcSocket}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    const myCharacterData = state.allCharacters.users[MY_CHARACTER_INIT_CONFIG.id];
    const otherCharactersData = Object.keys(state.allCharacters.users)
        .filter((id) => id !== MY_CHARACTER_INIT_CONFIG.id)
        .reduce((filterObj, key) => {
            filterObj[key] = state.allCharacters.users[key];
            return filterObj;
        }, {});
    return { myCharacterData: myCharacterData, otherCharactersData: otherCharactersData };
};

export default connect(mapStateToProps, {})(VideoCalls);
