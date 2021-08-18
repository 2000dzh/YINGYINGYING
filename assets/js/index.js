$(function () {
    //调用 getUserInfo 获取用户的基本信息
    getUserInfo()

    $("#btnLogout").on('click', function () {
        layer.confirm('确定要退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');

            location.href = './login.html'

            layer.close(index);
        });
    })

  
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.code !== 0) return layui.layer.msg('获取用户信息失败')

            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log(res);
        // }
    })
}

function renderAvatar(user) {
    let temp = user.nickname || user.id;
    $("#welcome").text('欢迎' + temp)
    if (user.user_pic) {
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()

        let n_temp = temp[0].toUpperCase()
        $(".text-avatar").text(n_temp).show()
    }
}