const express = require("express");

const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({
            msg: 'Authorization error'
        });
    }
    try {
        const decoded =  jwt.verify(token, "mySecret");

        let user = decoded.user;
        req.user = user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({
            msg: 'Authorization failed'
        });
    }
}