const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
.then(() => console.log('Database connected'))
.catch(err => console.log(err))