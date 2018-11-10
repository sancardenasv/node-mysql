import mysql = require('mysql');

export default class MySQL{
    private static _instance: MySQL;

    conn: mysql.Connection;
    connected: boolean = false;

    constructor() {
        console.log('MySQL class constructor');
        this.conn = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '123456*',
            database : 'node_db'
          });

          this.connectToDB();

    }

    private connectToDB() {
        this.conn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log('MySQL DB Error', err.message);
            } else {
                console.log('Connected to DB');
                this.connected = true;
            }
        });
    }

    static executeQuery(query: string, callback: Function) {
        this.instance.conn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error executing query', err);
                return callback (err);
            }
            if (results.length === 0) {
                callback('No results found')
            } else {
                callback(null, results)
            }
        });
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}