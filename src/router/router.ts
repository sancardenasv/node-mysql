import { Router, Request, Response } from "express";
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/home', (req: Request, res: Response) => {
    const query = `
        SELECT * FROM heros
    `;

    MySQL.executeQuery(query, (err: any, heroes: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                msg: err
            })
        } else {
            res.json({
                ok: true,
                msg: 'Everything is OK',
                heroes
            })
        }
    })

});

router.get('/home/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const scapedId = MySQL.instance.conn.escape(id);
    const query = `
        SELECT * FROM heros H WHERE H.id = ${scapedId}
    `;

    MySQL.executeQuery(query, (err: any, heroes: Object[]) => {
        if (err) {
            res.status(400).json({
                ok: false,
                msg: err
            })
        } else {
            res.json({
                ok: true,
                msg: 'Everything is OK',
                heroes
            })
        }
    })
});

export default router;