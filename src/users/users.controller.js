
//Helpers
const h_validators = require('../../helpers/validators');
const h_jwt = require("../../helpers/jwt");
const h_bcrypt  =  require("../../helpers/crypt");

const userModel = require('./users.model');

exports.addUsers = async (req, res) => {
    
    var body = req.body;

    let userJson = {
        firstname: body.firstname || "",
        lastname: body.lastname || "",
        email: body.email || "",
        password: body.password || ""
    }

    if(h_validators.isStrLenLessTo(userJson.firstname, 2) && h_validators.isStrLenGreterTo(userJson.firstname, 20))
        return res.status(401).send({ error_code: "NOT_VALID", message: "firstname value must be string and length 3 to 20" }).end();
    if(h_validators.isStrLenLessTo(userJson.lastname, 2) && h_validators.isStrLenGreterTo(userJson.lastname, 20))
        return res.status(401).send({ error_code: "NOT_VALID", message: "lastname value must be string and length 3 to 20" }).end();
    if(!h_validators.checkObjectType(userJson.email, "string") || !h_validators.validateEmail(userJson.email))
        return res.status(401).send({ error_code: "NOT_VALID", message: "email is not valid." }).end();
    if(!h_validators.checkObjectType(userJson.password, "string") || h_validators.isStrLenGreterTo(userJson.password, 15) || h_validators.isStrLenLessTo(userJson.password, 4))
        return res.status(401).send({ error_code: "NOT_VALID", message: "password value  length 6 to 15" }).end();
    
     await userModel.findOne({ email: userJson.email }).exec(async (err, userDt) => { 
        if(err) return res.status(401).send({ error_code: "INTERNAL_ERROR"}).end();
        else if(userDt && userDt._id) return res.status(401).send({ error_code: "DUPLICATE"}).end();
        else {
            userJson.password = h_bcrypt.plainTextToHash(userJson.password);
            let userModelObject = new userModel(userJson);
        
            await userModelObject.save().then(doc => {                 
                return res.status(200).send({ success: "Success Registration Finish", data: { id:  doc.id, email: doc.email } }).end();
            }).catch(err => { 
                return res.status(401).send({ error: err, error_code: "INTERNAL_ERROR"}).end();
            })
        }
    });
    
};

exports.login = async (req, res) => {
    
    let userJson = {
        email: req.body.email || undefined,
        password: req.body.password || undefined,
    }

    if(!h_validators.checkObjectType(userJson.email, "string") && !h_validators.validateEmail(userJson.email))
        return res.status(401).send({ error_code: "NOT_VALID", message: "email is not valid." }).end();
    if(h_validators.isStrLenLessTo(userJson.password, 4) && h_validators.isStrLenGreterTo(userJson.password, 16))
        return res.status(401).send({ error_code: "NOT_VALID", message: "password value  length 6 to 15" }).end();
    
     
    await userModel.findOne({ email: userJson.email }).exec((err, userDt) => { 
        if(err) return res.status(401).send({ error_code: "INTERNAL_ERROR"}).end();
        else if(!userDt._id) return res.send({ error_code: "AUTH", message: "Please enter valid email or password." }).end();
        else {
            let isValidPassword = h_bcrypt.compareText(userJson.password, userDt.password);

            if(!isValidPassword) return res.status(401).send({ error_code: "AUTH", message: "Please enter valid email or password." }).end();
    
            let payload = {
                id: userDt._id.toString(),
                email: userDt.email
            }
    
            let authToken = h_jwt.generateJwtToken(payload);
    
            return res.status(200).send({ token: authToken }).end();
        }
    });
    
};