const mongoose=require('mongoose');



const citiesDataSchema =new mongoose.Schema({},{collection:'accidents'});



citiesDataSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const citiesData  = mongoose.model('citiesData', citiesDataSchema);
module.exports=citiesData;




