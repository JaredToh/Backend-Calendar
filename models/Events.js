const {Schema,model}=require('mongoose');


const eventsSchema=Schema( {
    title:{
        type:String,
        required:true
    },
    notes:{
        type:String
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
});

eventsSchema.method('toJSON',function(){
    const { __v,_id,...objects }=this.toObject();
    objects.id=_id;
    return objects;
})

module.exports=model('Events',eventsSchema);