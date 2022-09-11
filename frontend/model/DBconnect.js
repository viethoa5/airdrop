const mongoose = require('mongoose');

async function connect() {
     try {
         await mongoose.connect('mongodb://localhost:27017/airdrop_account', {
             useNEWUrlParser: true,
             useUnifiedTopology: true
         });
         console.log('Connected');
     } catch (err) {
         console.log(err);
     }
}

export default connect;