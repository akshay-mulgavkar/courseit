const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const validations = require('../validations/users')
const { Admin } = require('../models/users')
const defaultMessages = require('../utility/defaultMessages')
const config = require('../utility/config');

exports.loginAdmin = async (req, res) => {

    const validation = validations.admin.validate(req.body);

    if (validation.error) {
        res.status(400).send({ message: validation.error.details[0].message, req: req.body });
    } else {

        try {

            const admin = await Admin.findOne({ email: req.body.email });
            if (!admin) return res.status(404).send({ message: defaultMessages.USER_NOT_REGISTERED });

            let result = await bcrypt.compare(req.body.password, admin.passwordHash)

            if (result) {
                const token = jwt.sign(
                    {
                        admin: {
                            _id: admin._id,
                            userId: admin.userId
                        }
                    },
                    config.JWT_AUTH,
                );

                res.status(202).json({
                    message: defaultMessages.AUTH_SUCCESSFUL,
                    data: {
                        email: admin.email,
                        token: token
                    },
                });
            }
            else
                res.status(403).json({ message: defaultMessages.AUTH_FAILED });

        }
        catch (e) {
            res.status(400).send({ message: e.toString(), req: req.body });
        }
    }
}
