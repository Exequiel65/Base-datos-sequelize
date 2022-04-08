let db = require('../database/models')

let controller = {
    list : (req, res)=>{
        db.Genre.findAll()
        .then((genres)=>{
            res.render('genresList', {
                genres
            })
        })
        .catch((errors) => { res.send(errors)})
    },
    detail : (req, res) =>{
        db.Genre.findByPk(req.params.id)
        .then(genre =>{
            res.render('genresDetail', {
                genre
            })
        })
    }
}

module.exports = controller