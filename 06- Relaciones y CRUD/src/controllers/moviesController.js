const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
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
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        Genres.findAll()
        .then((genres) =>{
            res.render('moviesAdd',{
                genres
            })
        })
        .catch(errors => res.send(errors))
    },
    create: function (req,res) {
        let { title, rating, awards, release_date, length, genre_id } = req.body
        Movies.create({
            ...req.body
        })
        .then(() =>{
            res.redirect('/movies')
        })
    },
    edit: function(req,res) {
        Movies.findByPk(req.params.id,{
            include : [{association : "genre"}]
        })
        .then(Movie =>{
            Genres.findAll()
            .then(genres =>{
                console.log(date)
                res.render('moviesEdit',{
                    Movie,
                    genres
                })
            })
        })
    },
    update: function (req,res) {
        Movies.update({
            ...req.body
        },{
            where : {id : req.params.id}
        })
        .then(() =>{
            res.redirect('/movies')
        })
    },
    delete: function (req,res) {
        Movies.findByPk(req.params.id)
        .then((Movie) =>{
            res.render('moviesDelete',{
                Movie
            })
        })

    },
    destroy: function (req,res) {
        Movies.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(() =>{
            res.redirect('/movies')
        })
        .catch(errors => res.send(errors))

    },
    model : (req, res) =>{
        Movies.findByPk(1,{
            include : [{association : "genre"}]
        })
        .then((movies) =>{
            res.send(movies)
            
        })
    },
    model2 : (req, res) =>{
        Genres.findAll({
            include : [{association : "movies"}]
        })
        .then((movies) =>{
            res.send(movies)
        })
    },
    model4 : (req, res) =>{
        Actors.findAll({
            include : [{association : "movies"}]
        })
        .then((movies) =>{
            res.send(movies)
        })
        .catch(errors => res.send(errors))
    },
    model3 : (req, res) =>{
        Movies.findAll({
            include : [{association : "actors"}]
        })
        .then((movies) =>{
            res.send(movies)
        })
        .catch(errors => res.send(errors))
    }
}

module.exports = moviesController;