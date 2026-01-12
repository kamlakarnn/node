const mongoose = require('mongoose')

// const connectDB = async () => {
// //   try {
//     await mongoose.connect(
//         "mongodb+srv://kamalakargpt_db_user:RgrKwWzEFy82HW7n@cluster0.duodtb2.mongodb.net/"
//     );
// }

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://kamalakargpt_db_user:RgrKwWzEFy82HW7n@cluster0.duodtb2.mongodb.net/", 
         {
             family: 4 // Forces the connection to use IPv4
         }
    );
}

module.exports = connectDB;