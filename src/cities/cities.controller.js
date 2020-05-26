var ObjectId = require('mongodb').ObjectID;

//Helpers
const h_validators = require('../../helpers/validators');
const h_jwt = require("../../helpers/jwt");
const h_bcrypt  =  require("../../helpers/crypt");

const cityModel = require('./cities.model');

exports.test = (req,res)=>{
    res.send("sasd");
}

exports.addCity = async (req, res) => {
    
    var body = req.body;
    var params = req.query;

    if(!body.city) return res.status(401).send({ error_code: "NOT_VALID", message: "city not found." }).end();
   
    let taskJson = {
        city: body.city
    }
    
    let cityModelObject = new cityModel(taskJson);

    await cityModelObject.save().then(doc => {                 
        return res.status(200).send({ data: doc }).end();
    }).catch(err => { 
        return res.status(401).send({ error_code: "INTERNAL_ERROR"}).end();
    })

};

exports.getCities = async (req, res) => {
    cityModel.find({}).exec((err, dt)=> {
        if(err) return res.status(401).send({ error_code: "INTERNAL_ERROR"}).end();
        else return res.status(200).send({ data: dt }).end();
    })

}