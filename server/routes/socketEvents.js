module.exports = (io) => {
    io.on('connection', (client) => {
        console.log('Client connected...');

        client.on('join', (data) => {
            console.log(data);
        });

        client.on('message', (message) => {
            console.log(message);
            io.emit('message', message);
        })
    });
}