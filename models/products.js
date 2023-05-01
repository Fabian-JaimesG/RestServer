const { Schema, model } = require("mongoose");

const ProductsSchema = Schema({
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
  },
  cost:{
    type:Number,
    default:0 ,
  },
  description:{type:String,},
  available:{type:Boolean,default:true},   
  
});

ProductsSchema.methods.toJSON = function(){
  const {__v,_id:uid,...category} = this.toObject();

  category.uid = uid;
  return category;
}

module.exports = model("Products", ProductsSchema);
