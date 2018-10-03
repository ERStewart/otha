const express = require('express');
const app = express();
const sessionRoute = express.Router();

// Require member model in our routes module
let Member_Account = require('../models/member_account');
let Member_Session = require('../models/member_session');

// Login member
sessionRoute.route('/login').post(function (req, res) {
    let critria = {
        member_user_name: req.body['member_pri_email'],
        member_password: req.body['member_password'],
        member_active: 1
    }

    Member_Account.findOne({where:critria}).then(member_account => {
        if(!member_account) {
            res.json({success:false, error:'LOGIN_FAILED'})
        } else {
            if(member_account['member_locked']) {
               res.json({success:false, error:'ACCOUNT_LOCKED'})
            } else {
                let expired = new Date();
                expired.setHours(expired.getHours() + 4);
                
                let session = {
                    member_id: member_account['member_id'],
                    session_token: member_account['member_id'],
                    expired_at: expired
                }
                Member_Session.create(session).then(member_session => {
                    res.json({success:true, access_token: member_session.dataValues.session_token})
                })
            }
        }
    });
});

// Validate member session
sessionRoute.route('/validate').get(function (req, res) {
    Member_Account.findAll().then(members =>{
        res.json(members);
    });
});

module.exports = sessionRoute;