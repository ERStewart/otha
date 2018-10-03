const { Op } = require('sequelize')

let Member_Session = require('../api/models/member_session');

const auth ={
    member: function(req, res, next) {
        if(req.headers['authorization']) {
            let token = req.headers['authorization'].split(' ')[1];
            Member_Session.findOne({where: {
                session_token: token,
                expired_at: {[Op.gt]: new Date()},
                active: 1
                }})
            .then((session) => {
                if(!session) {
                    res.status(401).json({success: false, error: 'UNAUTHORIZED'})
                } else {
                    req.member_id = session.dataValues.member_id;
                    next();
                }
            });
        } else {
            res.status(401).json({success: false, error: 'UNAUTHORIZED'})
        }
    }
}

module.exports = auth;