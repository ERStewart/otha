const express = require('express');
const app = express();
const memberRoutes = express.Router();
const auth = require('../auth')

// Require member model in our routes module
let Member = require('../models/member');
let Member_Acount = require('../models/member_account');

// Defined store route
memberRoutes.route('/add').post(function (req, res) {
    let member = Object.assign({}, req.body);
    delete member.member_password;

    Member.create(member).then(member =>{
        let member_account = {
            member_user_name: req.body['member_pri_email'],
            member_password: req.body['member_password'],
            member_id: member.member_id
        };

        Member_Acount.create(member_account).then(member_account => {
            res.json({success:true})
        });
    });
});

// Defined get data(index or listing) route
memberRoutes.route('/').get(auth.member, function (req, res) {
    console.log(req.member_id);
    Member.findAll().then(members =>{
        res.json(members);
    });
});

// Defined edit route
memberRoutes.route('/profile/:id').get(auth.member, function (req, res) {
    let id = req.params.id;
    Member.findById(id).then(member =>{
        res.json(member);
    });
});

// get individual user profile
memberRoutes.route('/profile').get(auth.member, function (req, res) {
    Member.findById(req.member_id).then(member =>{
        res.json(member);
    });
});

//  Defined update route
memberRoutes.route('/update').post(auth.member, function (req, res) {
    let id = req.body.member_id;
    let data = req.body;
    delete data.member_id;

    Member.findById(id).then(member => {
        return member.updateAttributes(data);
    }).then(updatedMember => {
        res.json(updatedMember);
    })
});

// Defined delete | remove | destroy route
memberRoutes.route('/delete/:id').get(auth.member, function (req, res) {
    let id = req.params.id;
    Member.destroy({where:{member_id:id}}).then(data =>{
        res.json({success:data});
    });
});

module.exports = memberRoutes;