// connection.js file
const mongoose = require('mongoose');
const conn = mongoose.createConnection(

  // 連接MongoDB 的服務端口為27017
  // dbtest自訂一個資料庫名稱，寫入資料的時候，MongoDB會自動建立一個名為dbtest的資料庫，不用事先手動建立。'mongodb://127.0.0.1:27017/dbtest
  //process.env.MONGODB_URI heroku用的mongodb =  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dbtest' ,
  'mongodb://127.0.0.1:27017/postdbtest' ,

  //一些必需加的設定
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   }
)
conn.on('open', () => {
	console.log('打開mongodb連接');
})
conn.on('err', (err) => {
	console.log('err:' + err);
})
module.exports = conn;