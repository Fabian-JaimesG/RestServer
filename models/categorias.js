const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique:true
  },
  status: {
    type: Boolean,
    default:true,
    required:true
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});

CategoriaSchema.methods.toJSON = function(){
  const {__v,_id:uid,...category} = this.toObject();

  category.uid = uid;
  return category;
}

module.exports = model("categoria", CategoriaSchema);
