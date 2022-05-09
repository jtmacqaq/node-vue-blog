const {comments,articles,user,reply} = require('../MysqlConnection')
exports.postcomments =async (req,res) =>{
    var formatDateTime = function (date) {  
        var date= new Date(Date.parse(date));
                    var y = date.getFullYear();  
                    var m = date.getMonth() + 1;  
                    m = m < 10 ? ('0' + m) : m;  
                    var d = date.getDate();  
                    d = d < 10 ? ('0' + d) : d;  
                    var h = date.getHours();  
                    h=h < 10 ? ('0' + h) : h;  
                    var minute = date.getMinutes();  
                    minute = minute < 10 ? ('0' + minute) : minute;  
                    var second=date.getSeconds();  
                    second=second < 10 ? ('0' + second) : second;  
                    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
                };  
    const results =await comments.create({
        post_id:req.body.post_id,
        content:req.body.content,
        from_uid:req.body.from_uid,
        date:formatDateTime(Date())
    })
    res.cc(results,0)
}

//根据文章ID获取该文章的评论的处理函数

exports.getcommentslist = async (req,res) =>{
    
    const results = await comments.findAll({
        where:{
            post_id:req.query.post_id

        },
        include:[{
            model:articles,
            attributes:['id','title']
        },{
            model:user,
            attributes:['id','username','user_pic']
        }]
    })
    res.cc(results,0)
}

//回复评论的路由处理函数

exports.replycomments = async (req,res) =>{
    var formatDateTime = function (date) {  
        var date= new Date(Date.parse(date));
                    var y = date.getFullYear();  
                    var m = date.getMonth() + 1;  
                    m = m < 10 ? ('0' + m) : m;  
                    var d = date.getDate();  
                    d = d < 10 ? ('0' + d) : d;  
                    var h = date.getHours();  
                    h=h < 10 ? ('0' + h) : h;  
                    var minute = date.getMinutes();  
                    minute = minute < 10 ? ('0' + minute) : minute;  
                    var second=date.getSeconds();  
                    second=second < 10 ? ('0' + second) : second;  
                    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
                }; 
    const results = await comments.create({
        post_id:req.body.post_id,
        content:req.body.content,
        from_uid:req.body.from_uid,
        date:formatDateTime(Date()),
        parent_id:req.body.parent_id

    })
    res.cc(results,0)
}

//跟进评论的ID获取回复api的处理函数

exports.getreplycomments = async(req,res) =>{
    console.log(req.query.parent_id)
    const  results = await reply.findAll({
        where:{
            parent_id:req.query.parent_id
        },
        include:{
            model:comments,
        }
    })
    res.cc(results,0)
}