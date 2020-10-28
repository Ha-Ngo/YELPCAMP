const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i< 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground ({
            author: '5f97091a8a82d4289f8a993f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: 'Beautiful place to go, hope you enjoy it',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/dc3rs32ju/image/upload/v1603810105/YelpCamp/hz4uatrj2ojoaomya1vp.jpg',
                  filename: 'YelpCamp/hz4uatrj2ojoaomya1vp'
                },
                {
                  
                  url: 'https://res.cloudinary.com/dc3rs32ju/image/upload/v1603810106/YelpCamp/wkniuypa23kutirbpqqt.jpg',
                  filename: 'YelpCamp/wkniuypa23kutirbpqqt'
                },
                {
                  
                  url: 'https://res.cloudinary.com/dc3rs32ju/image/upload/v1603810106/YelpCamp/mdqjr6dbn3dxplnlirqa.jpg',
                  filename: 'YelpCamp/mdqjr6dbn3dxplnlirqa'
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})