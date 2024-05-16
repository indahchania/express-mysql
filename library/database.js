let mysql = require('mysql')

//konfigurasi untuk koneksi database mysql

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_mysql'
})

//kondisi untuk mengecek database berjalan atau tidak
connection.connect(function(error) {
    if(!!error){
        console.log(error)
    }else{
        console.log('koneksi ke database mysql berhasil!')
    }
})

module.exports = connection;