const {pet}=require('./models/user')
pet.create({
    username: 'zhangsan'
}).then(function (p) {
    console.log('created. ' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});