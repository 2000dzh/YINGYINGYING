$(function () {
    let layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)



    //为上传按钮绑定点击事件
    $("#btnChooseImage").on('click', function () {
        $("[type=file]").click()
    })

    //监听图片提交上传事件
    $("#file").on('change', function (e) {
        // 1.拿到用户选择的文件
        let file = e.target.files[0]
        // console.log(file);

        if(file.length <= 0) return layui.layer.msg('爬爬爬')

        // 根据选择的文件，创建一个对应的 URL 地址
        let newImgURL = URL.createObjectURL(file)

        // 先销毁旧的裁剪区域，再`重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    //点击上传用户的头像
    $("#btnUpload").on('click', function () {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            method: "PATCH",
            url: "/my/update/avatar",
            data: { avatar: dataURL },
            success: function (res) {
                if (res.code !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                //调用父级里面的方法
                window.parent.getUserInfo()
            }
        })
    })
})

