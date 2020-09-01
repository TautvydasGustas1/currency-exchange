const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//Connect to DB
connectDB();

//Init Middleware
app.use(cookieParser());

//Test route
app.get('/api/', (req, res) => res.send('API RUNNING'));

//Defined routes
app.use('/api/exchange', require('./routes/api/exchange'));

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
