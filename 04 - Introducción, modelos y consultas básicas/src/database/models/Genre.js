
module.exports = (sequelize, dataTypes) =>{
    let alias = "Genre";
    let cols = {
        id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        ranking : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        active : {
            type : dataTypes.BOOLEAN,
            allowNull : false
        }

    
    }

    let config = {
        tableName : "genres",
        timestamps : true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false

    }



    const Genre = sequelize.define(alias, cols, config);

    return Genre;
}