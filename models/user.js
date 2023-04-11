const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true,'El nombre es requerido'],
  },
  email: {
    type: String,
    required: [true,'El correo es requerido'], 
    unique: true,
  },
  password: {
    type: String,
    required: [true,'La contraseña es requerida'],
  },
  img: {
    type: String,
  },
  rol: { 
    type: String,
    required: true,
    emun:['ADMMIN','USER']
  },
  status: {
    type: Boolean,
    default:true,
  },
  google: {
    type: Boolean,
    default:false,
  },
});

UsuarioSchema.methods.toJSON = function(){
  const {__v,password,...user} = this.toObject();
  return user;
}

module.exports = model('User',UsuarioSchema);
