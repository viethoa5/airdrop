const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
const UserAccount = new Scheme({
    username: {type: 'string',required: true,minLength:4,maxLength:40},
    password: {type: 'string',required: true,minLength:8,maxLength:16}
})
module.exports = mongoose.models.Users || mongoose.model('Users', UserAccount);