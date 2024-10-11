const User = require('../models/user')

/**
 * @param {Object} body Object that includes information to perform a login
 * @returns Status of login attempt
 */
module.exports.createUser = async (body) => {
    const validUser = await validateUserInput(body);
    if (validUser.valid) {
        const newUser = new User({
            name: body.name,
            last_name_P: body.last_name_P,
            last_name_M: body.last_name_M,
            phone: body.phone,
            email: body.email,
            username: body.username,
            password: null
        });
        newUser.password = newUser.generateHash(body.password)
        const userName = await User.findOne({username:body.username})
        const phoneUser = await User.findOne({phone:body.phone})
        if (userName === null && phoneUser === null){
            await newUser.save();
            return {
                "status": "Usuario creado con éxito"
            };
        }else{
            return{
                "status":"Usuario o telefono ya existente"
            }
        }
    } else {
        return { errors: validUser.errors }; // Retorna los errores de validación correctamente
    }
};

const validateUserInput = async (data) => {
    const errors = [];

    const validateField = (field, value, maxLength, regex, errorMessage) => {
        if (!regex.test(value) || value.length > maxLength) {
            errors.push(`${field} ${errorMessage}`);
        }
    };

    validateField('Nombre', data.name, 40, /^[a-zA-Z\s]+$/, 'debe tener máximo 40 caracteres y solo puede contener letras y espacios.');
    validateField('Apellido paterno', data.last_name_P, 40, /^[a-zA-Z]+$/, 'debe tener máximo 40 caracteres y solo puede contener letras y sin espacios.');

    if (data.last_name_M) {
        validateField('Apellido materno', data.last_name_M, 40, /^[a-zA-Z]+$/, 'debe tener máximo 40 caracteres y solo puede contener letras y sin espacios.');
    }

    if (!/^\d{10}$/.test(data.phone)) {
        errors.push("Número de teléfono debe tener exactamente 10 dígitos.");
    }

    if (data.email && (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email) || data.email.length > 40)) {
        errors.push("Correo debe tener un máximo de 40 caracteres y debe tener un formato válido.");
    }

    validateField('Nombre de usuario', data.username, 30, /^[a-zA-Z0-9_]+$/, 'debe tener máximo 30 caracteres y solo puede contener letras, números y guiones bajos.');

    if (data.password.length > 20) {
        errors.push("Contraseña debe tener un máximo de 20 caracteres.");
    }

    return errors.length > 0 ? { valid: false, errors } : { valid: true };
};
