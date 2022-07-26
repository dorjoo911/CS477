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
    let obj = {};
    fn(function(err, data){
        obj.done = function(cb){
            if(err === null){
                cb(data);
            }
            return obj;
        }

        obj.fail = function(cb){
            if(data === null){
                cb(err);
            }
            return obj;
        }
    });

    return obj;
}

exec(slow) 
    .done(function(data){ console.log(data); })
    .fail(function(err){ console.log("Error: " + err); });
   