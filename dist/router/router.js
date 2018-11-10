"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var router = express_1.Router();
router.get('/home', function (req, res) {
    var query = "\n        SELECT * FROM heros\n    ";
    mysql_1.default.executeQuery(query, function (err, heroes) {
        if (err) {
            res.status(400).json({
                ok: false,
                msg: err
            });
        }
        else {
            res.json({
                ok: true,
                msg: 'Everything is OK',
                heroes: heroes
            });
        }
    });
});
router.get('/home/:id', function (req, res) {
    var id = req.params.id;
    var scapedId = mysql_1.default.instance.conn.escape(id);
    var query = "\n        SELECT * FROM heros H WHERE H.id = " + scapedId + "\n    ";
    mysql_1.default.executeQuery(query, function (err, heroes) {
        if (err) {
            res.status(400).json({
                ok: false,
                msg: err
            });
        }
        else {
            res.json({
                ok: true,
                msg: 'Everything is OK',
                heroes: heroes
            });
        }
    });
});
exports.default = router;
