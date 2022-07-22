// Fix the slow function to be asynchronous/non-blocking
function slow(callback){ 
    let random  = Math.random();
    console.log(random);
	if ( random > 0.5) { 	
		return callback("Error",null) 
	} 
	return callback(null, {id:12345}) 
} 

function exec(fn){
    function foo(arg1, arg2){
        return arg1? arg1 : arg2;
    }
    const result = fn(foo); 
	let obj = {
        done: function(callback){
            if(result !== 'Error'){
                callback(result);
            }       
            return this;
        },
        fail: function(callback){
            if(result === 'Error'){
                callback(result);
            }          
           return this;
        }
    };
    return obj;
}

exec(slow) 
    .done(function(data){ console.log(data); })
    .fail(function(err){ console.log("Error: " + err); });
   