var ObjectId = require('mongodb').ObjectID;

//Helpers
const h_validators = require('../../helpers/validators');
const h_jwt = require("../../helpers/jwt");
const h_bcrypt  =  require("../../helpers/crypt");

const taskModel = require('./tasks.model');

exports.test = (req,res)=>{
    res.send("sasd");
}

exports.addTask = async (req, res) => {
    
    var body = req.body;
    var params = req.query;

    if(!params.userId) return res.status(401).send({ error_code: "NOT_VALID", message: "userId not found." }).end();
    if(!h_validators.isObjectId(params.userId)) return res.status(401).send({ error_code: "NOT_VALID", message: "Provide valide userId." }).end();

    let taskJson = {
        userId: params.userId || "",
        description: body.description || "",
    }

    if(h_validators.isStrLenLessTo(taskJson.description, 2))
        return res.status(401).send({ error_code: "NOT_VALID", message: "Please Type Description." }).end();
    
    let taskModelObject = new taskModel(taskJson);

    await taskModelObject.save().then(doc => {                 
        return res.status(200).send({ data: { id:  doc.id } }).end();
    }).catch(err => { 
        return res.status(401).send({ error_code: "INTERNAL_ERROR"}).end();
    })

};

exports.getTaskByUserId = async (req, res) => {
    var params = req.query;

    if(!params.userId) return res.status(401).send({ error_code: "NOT_VALID", message: "userId not found." }).end();
    if(!h_validators.isObjectId(params.userId)) return res.status(401).send({ error_code: "NOT_VALID", message: "Provide valide userId." }).end();

    taskModel.find({ userId: ObjectId(params.userId) }).exec((err, dt)=> {
        if(err) return res.status(401).send({ error_code: "INTERNAL_ERROR"}).end();
        else return res.status(200).send({ data: dt }).end();
    })

}