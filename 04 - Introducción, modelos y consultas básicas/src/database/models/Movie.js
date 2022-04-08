
module.exports = (sequelize, dataTypes) =>{
    let alias = "Movie";
    let cols = {
        id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },

        title : {
            type: dataTypes.STRING(500),
            allowNull : false
        },
        rating : {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull : false
        },
        awards: {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        release_date : {
            type : dataTypes.DATEONLY,
            allowNull : false
        },
        length : {
            type : dataTypes.INTEGER(10)
        },
        genre_id : {
            type : dataTypes.INTEGER(10)
        } 

    }

    let config = {
        tableName : "movies",
        timestamps : true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false

    }



    const Movie = sequelize.define(alias, cols, config);

    return Movie;
}
