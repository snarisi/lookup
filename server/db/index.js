var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/look-up');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var buildingSchema = new mongoose.Schema({
		name: { type: String, required: true },
		architect: { type: mongoose.Schema.Types.ObjectId, ref: 'Architect' },
		style: { type: mongoose.Schema.Types.ObjectId, ref: 'Style' },
		location: { type: [Number], index: '2dsphere'  }
});

var architectSchema = new mongoose.Schema({
		name: { type: String, required: true },
		buildings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Building'}]
});

var styleSchema = new mongoose.Schema({
		name: { type: String, required: true },
		buildings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Building'}]
});

var userSchema = new mongoose.Schema({
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true }
});

var findOrCreate = function(doc) {
		var self = this;
		return this.findOne({ name: doc.name})
		.exec()
		.then(function(foundDoc) {
				if (!foundDoc) return self.create(doc);
				else return foundDoc;
		});
};

architectSchema.statics.findOrCreate = findOrCreate;
styleSchema.statics.findOrCreate = findOrCreate;
userSchema.statics.findOrCreate = findOrCreate;

buildingSchema.statics.findByLocation = function (coords) {
	return Building.find({
		location: {
			$near: {
				$geometry: {
		  			type: 'Point',
		  			coordinates: coords
				},
				$maxDistance: 32000
	  		}
		},
	})
	.then(buildings => buildings);

}

var Building = mongoose.model('Building', buildingSchema);
var Architect = mongoose.model('Architect', architectSchema);
var Style = mongoose.model('Style', styleSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
		Building: Building,
		Architect: Architect,
		Style: Style,
		User: User
};