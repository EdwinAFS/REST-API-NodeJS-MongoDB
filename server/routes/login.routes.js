const { Router } = require("express");
const { Usuario } = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/authentication");

const router = Router();

router.get("/", (_req, res) => {
    res.status(200).json({
        ok: true,
        saludo: "Hola con CI/CD",
    });
});

router.post("/", ({ body }, res) => {
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: { message: "Usuario o contraseña incorrectos" },
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: { message: "Usuario o contraseña incorrectos" },
            });
        }

        let token = jwt.sign(
            {
                usuario: usuarioDB,
            },
            process.env.SEED,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token,
        });
    });
});

module.exports = router;
