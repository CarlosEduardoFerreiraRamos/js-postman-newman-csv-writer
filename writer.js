const fs = require('fs');

const newman = require('newman');

const collection = "wayfair product.postman_collection.json";

var RESP_FILE_PATH = './foo.json';

var write = function(response) {
	if (fs.existsSync(RESP_FILE_PATH)) {
		fs.appendFile(RESP_FILE_PATH, response, function (err) {
		  if (err) throw err;
		  console.log('Saved!');
		});
	} else {
		fs.writeFile(RESP_FILE_PATH, response, function (error) {
		   if (error) { 
		    console.error(error); 
		   }
		});
	}
}

newman.run({
	collection: require(`./${collection}`),
	iterationData: [{"id":"141752"},{"id":"141752"}],
	reporters: 'cli'
}, function (err) {
	if (err) { throw err; }
	console.log('Collection run complete!');
}).on('request', function (error, args) {
    if (error) {
        console.error(error);
    } else {
        console.log('response :', args.response.stream.toString('utf8'))
        write('test text\n')
    }
})