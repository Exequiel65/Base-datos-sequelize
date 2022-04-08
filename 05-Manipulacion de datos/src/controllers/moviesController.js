const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd')   
    },
    create: function (req, res) {
        let { title, rating, awards, release_date, length} = req.body
        Movies.create({
            title,
            rating,
            awards,
            release_date,
            length
        })
        .then(() =>{
            res.redirect('/movies')
        })
        .catch((errors) => { res.send(errors)})
    },
    edit: function(req, res) {
        Movies.findByPk(req.params.id)
        .then((movie) =>{
            res.render('moviesEdit', {
                Movie : movie
            })
        })
    },
    update: function (req,res) {
        let { title, rating, awards, release_date, length} = req.body
        // res.send(req.body)
        Movies.update({
            title,
            rating,
            awards,
            release_date,
            length
        },
        {
            where: {id :req.params.id}
        })
        .then(() =>{
            res.redirect('/movies')
        })
        .catch((errors) => { res.send(errors)})
    },
    delete: function (req, res) {
        Movies.findByPk(req.params.id)
        .then(Movie => {
           res.render('moviesDelete', {
               Movie
           }) 
        })
        
    },
    destroy: function (req, res) {  






        // DESTROY
        Movies.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(errors => {
            console.log(errors)
            res.redirect('/movies')})
    },
    list2: (req, res) => {
        Movies.findAll({
            include : [{ association : "genre"}]
        })
        .then((movies) =>{
            res.send(movies)
        })
        .catch(errors => res.send(errors))
    },
    list3: (req, res) => {
        Genres.findAll({
            include : [{ association : "movies"}]
        })
        .then((movies) =>{
            res.send(movies)
        })
        .catch(errors => res.send(errors))
    },
    list4: (req, res) => {
        Actors.findAll({
            include : [{ association : "peliculas"}]
        })
        .then((actors) =>{
            res.send(actors)
        })
        .catch(errors => res.send(errors))
    },
    list5: (req, res) => {
        Movies.findAll({
            include : [{ association : "actores"}, {association : "genre"}]
        })
        .then((actors) =>{
            res.send(actors)
        })
        .catch(errors => res.send(errors))
    }

}

module.exports = moviesController;