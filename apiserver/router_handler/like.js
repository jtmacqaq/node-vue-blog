const {
    like
} = require('../MysqlConnection')
exports.like = async (req, res) => {
    var formatDateTime = function (date) {
        var date = new Date(Date.parse(date));
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    };
    const post_id = req.body.post_id
    const from_uid = req.body.from_uid
    const result = await like.findAll({
        where: {
            post_id,
            from_uid
        }
    })
    if (result.length !== 0) return res.cc('你已经点了赞', 1)

    const results1 = await like.create({
        post_id,
        from_uid,
        date: formatDateTime(Date())
    })
    res.cc(results1, 0)
}


//点赞数量处理函数
exports.likenumhandler = async (req,res) =>{
    const post_id = req.params.id
    const results = await like.findAndCountAll({
        where:{
            post_id
        }
    })
    res.cc(results.count,0)
}