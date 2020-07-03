
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("automate");
    var myquery = { status: { $in: [ "A", "D" ] } };
    dbo.collection("passengers").find(myquery).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});