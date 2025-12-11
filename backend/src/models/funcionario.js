const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const Funcionario = sequelize.define("Funcionario", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "admin"
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    //  Antes de criar, hash da senha
    Funcionario.beforeCreate(async (funcionario) => {
        const salt = await bcrypt.genSalt(10);
        funcionario.senha = await bcrypt.hash(funcionario.senha, salt);
    });

    //  Antes de atualizar, hash da senha SE for alterada
    Funcionario.beforeUpdate(async (funcionario) => {
        if (funcionario.changed("senha")) {
            const salt = await bcrypt.genSalt(10);
            funcionario.senha = await bcrypt.hash(funcionario.senha, salt);
        }
    });

    //  Método para validar senha no login
    Funcionario.prototype.validarSenha = async function (senhaDigitada) {
        return await bcrypt.compare(senhaDigitada, this.senha);
    };

    return Funcionario;
};
