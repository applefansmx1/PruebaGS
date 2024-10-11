const blacklistedTokens = [];

// Función para invalidar un token
const invalidateToken = (token) => {
    blacklistedTokens.push(token);
};

// Función para verificar si un token está en la lista negra
const verifyTokenWithBlacklist = async (token) => {
    if (blacklistedTokens.includes(token)) {
        return false;
    }
    return true
};

// Exportar las funciones
module.exports = {
    invalidateToken,
    verifyTokenWithBlacklist,
};
