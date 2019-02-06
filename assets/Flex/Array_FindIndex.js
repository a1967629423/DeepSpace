(function(){
    if(!Array.prototype.findIndex)
    {
        Object.defineProperty(Array.prototype,"findIndex",{
            writable:false,
            enumerable:false,
            configurable:true,
            value:function(val)
            {
                for(var key in this)
                {
                    if(val(this[key],key,this))
                    {
                        return key;
                    }
                }
            }
        })
    }
})();