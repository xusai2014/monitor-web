import mongoose from 'mongoose';

const AccountsSchema = mongoose.Schema({
    account: {
        type:String,
        required: [true, 'Name is required'],
    },
    tele:{
        type:Number,
        required: [true, 'User phone number required'],
    },
});

export const  AccountsModel = mongoose.model('accounts', AccountsSchema);

//  const Accounts = new AccountsModel();
// Accounts.save(function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('User inserted sucessfully');
//     }
// });