import React, { useEffect, useRef, useCallback, useState } from "react";
import Peer from 'simple-peer';

function InitiatedVideoCall({ mySocketId, myStream, othersSocketId, webrtcSocket }) {
    const peerRef = useRef();


    const createPeer = useCallback((othersSocketId, mySocketId, myStream, webrtcSocket) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: myStream,
        });
        peer.on('signal', signal => {
            //  console.log('sent sendOffer',signal);
            webrtcSocket.emit('sendOffer', { callToUserSocketId: othersSocketId, callFromUserSocketId: mySocketId, offerSignal: signal });
        });
        return peer;
    }, []);

    useEffect(() => {
        peerRef.current = createPeer(othersSocketId, mySocketId, myStream, webrtcSocket);

        //Week 5 Receive logic
        webrtcSocket.on("receiveAnswer", payload => {
            console.log("received answer from ", payload.callToUserSocketId, ", the answer received: ", Object.keys(payload.answerSignal));
        });


    }, [mySocketId, myStream, othersSocketId, webrtcSocket, createPeer]);

    return <> </>

}

export default InitiatedVideoCall;
