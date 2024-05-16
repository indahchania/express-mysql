var express = require('express')
var router = express.Router()

//import database
var connection = require('../library/database')

/**
 * Index Kelas
 */
router.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM kelas', function(err,rows){
        if (err) {
            res.send('error', err)
            res.json({
                data: ''
            })
        }else{
            //menampilkan hasil data kelas
            res.json({
                data: rows //tampilkan data kelas
            })
        }
    })
})

/**
 * Index Kelas berdasarkan id
 */
router.get('/:id', function (req, res) {
    let id = req.params.id
    //query
    connection.query('SELECT * FROM kelas WHERE id ='+ id, function(err,rows){
        if (err) {
            res.send('error', err)
            res.json({
                data: ''
            })
        }else{
            //menampilkan hasil data kelas
            res.json({
                data: rows //tampilkan data kelas
            })
        }
    })
})

/**
 * STORE POST kelas
 */
router.post('/', function (req, res) {
    let nama_jurusan = req.body.nama_jurusan
    let deskripsi = req.body.deskripsi
    let errors = false

    if(!nama_jurusan) {
        errors = true
        res.json({pesan : 'Field nama_jurusan belum diisi, Field harus diisi dengan lengkap'})
    }

    if(!deskripsi) {
        errors = true
        res.json({pesan : 'Field deskripsi belum diisi, Field harus diisi dengan lengkap'})
    }

    //if no error
    if(!errors) {
        let formData = {
            nama_jurusan: nama_jurusan,
            deskripsi: deskripsi
        }

        //insert query
        connection.query('INSERT INTO kelas SET ?', formData, function(err, result) {
            //if(err) throw err
            if(err) {
                res.json({pesan: 'data gagal disimpan'})
            }else{
                res.send('data berhasil disimpan')
            }
        })
    }
})

/**
* UPDATE kelas
*/
router.put('/:id', function(req, res){

    let id = req.params.id
    let nama_jurusan = req.body.nama_jurusan
    let deskripsi = req.body.deskripsi
    let errors = false

    if(!nama_jurusan) {
        errors = true
        res.json({pesan : 'Field nama_jurusan tidak boleh kosong'})
    }

    if(!deskripsi) {
        errors = true
        res.json({pesan : 'Field deskripsi tidak boleh kosong'})
    }

    //if no error
    if(!errors) {

        let formData = {
            nama_jurusan: nama_jurusan,
            deskripsi: deskripsi
        }

        //update query
        connection.query('UPDATE kelas SET ? WHERE id = ' + id, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                res.send('error', err)
                res.json({
                    id: req.params.id,
                    nama_jurusan: formData.nama_jurusan,
                    deskripsi: formData.deskripsi
                })
            } else {
                res.send('Data berhasil diupdate')
            }
        })
    }
})

/**
 * DELETE kelas
 */
router.delete('/:id', function(req, res) {
    let id = req.params.id

    connection.query('DELETE FROM kelas WHERE id = ' + id, function(err, result) {
        if (err) {
            res.send('error', err)
        } else {
            res.send('Data Berhasil Dihapus')
        }
    })
})
module.exports = router