module.exports = (sequelize, DataTypes) => {
  const Funcionario = sequelize.define('Funcionario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING, 
      unique: true, // RF01: E-mail único
      allowNull: false 
    },
    senha_hash: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    perfil: { 
      type: DataTypes.ENUM('admin', 'bibliotecario'), // RF01: perfies definidos
      allowNull: false,
      defaultValue: 'bibliotecario' 
    },
    status: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false,
      defaultValue: true // RN01: status é booleano e default é ativo
    }
  }, {
    tableName: 'funcionarios', // nome da tabela no banco
    timestamps: true, // habilita campos de data/hora no db
    underscored: true, // Usa snake_case para colunas automáticas
  });
  
  return Funcionario;
};