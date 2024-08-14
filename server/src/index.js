const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
const PORT = process.env.PORT || 8080;
app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', (socket) => {
    socket.emit("me", socket.id);
    socket.on('sendOffer', ({ callToUserSocketId, callFromUserSocketId, offerSignal }) => {
        console.log(`sendOffer event received from ${callFromUserSocketId} to ${callToUserSocketId}`);
        io.to(callToUserSocketId).emit('receiveOffer', {
            offerSignal,
            callFromUserSocketId
        });

    });
    //Week 5 task listen to sendAnswer event and emit receiveAnswer event

    socket.on('sendAnswer', ({ callFromUserSocketId, callToUserSocketId, answerSignal }) => {
        console.log(`Received answer from ${callToUserSocketId} to ${callFromUserSocketId}`);
        io.to(callFromUserSocketId).emit('receiveAnswer', {
            callToUserSocketId,
            answerSignal
        });
    });

});
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
