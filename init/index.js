const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

//connect to MongoDB
async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
.then(() => {
    console.log('Connected to MongoDB')
}).catch((err) =>{
    console.log(err)
});

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: '67df000615ca818296908226'}));
  await Listing.insertMany(initData.data);
  console.log('Database initialized');
}

initDB();
