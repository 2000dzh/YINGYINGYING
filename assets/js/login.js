$(function () {
    $(".layui-form .link").on('click', 'a', function () {
        $(this).parents(".submit-box").hide().siblings(".submit-box").show()
    })


    //表单验证规则
    let form = layui.form
    let later = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value != pwd) return '密码不一致 崽种'
        }

    })
    //监听注册页面表单
    $("#form_reg").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reg',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) return later.msg(res.message)
                later.msg(res.message)
                $("#link_login").click()
            }
        })
    })


    //监听登录页面表单
    $("#form_login").on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) return later.msg(res.message)
                later.msg(res.message)

                localStorage.setItem('token', res.token);

                location.href = './index.html'
            }
        })
    })
})