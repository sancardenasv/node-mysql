"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySQL = /** @class */ (function () {
    function MySQL() {
        this.connected = false;
        console.log('MySQL class constructor');
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456*',
            database: 'node_db'
        });
        this.connectToDB();
    }
    MySQL.prototype.connectToDB = function () {
        var _this = this;
        this.conn.connect(function (err) {
            if (err) {
                console.log('MySQL DB Error', err.message);
            }
            else {
                console.log('Connected to DB');
                _this.connected = true;
            }
        });
    };
    MySQL.executeQuery = function (query, callback) {
        this.instance.conn.query(query, function (err, results, fields) {
            if (err) {
                console.log('Error executing query', err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('No results found');
            }
            else {
                callback(null, results);
            }
        });
    };
    Object.defineProperty(MySQL, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    return MySQL;
}());
exports.default = MySQL;
