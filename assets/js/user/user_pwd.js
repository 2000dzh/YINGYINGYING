$(function () {
    let form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        pass1: function (value) {
            if (value == $("[name=old_pwd]").val()) return '闹呢?'
        },
        pass2: function (value) {
            if (value !== $("[name=new_pwd]").val()) return '爬爬爬'
        }
    })


    //监听表单修改密码事件
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'PATCH',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                //重置表单 清空表单数据
                $('.layui-form')[0].reset()
            }
        })
    })
})



