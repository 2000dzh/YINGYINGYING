$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: [
            /^[\S]{1,6}$/
            , '昵称必须1到6位，且不能出现空格'
        ]
    })

    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                if (res.code !== 0) return layer.msg(res.message)

                form.val('formUserInfo', res.data)
            }
        })
    }

    $("#btnReset").on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //监听表单事件
    $(".layui-form").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'PUT',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) return layer.msg(res.message)
                
                layer.msg(res.message)

                window.parent.getUserInfo()
            }
        })
    })
})