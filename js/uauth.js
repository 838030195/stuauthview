function checkLogin() {
    var phone = localStorage.getItem("phone")
    var pwd = localStorage.getItem("pwd")

    if (phone == null || pwd == null) {
        // 跳转到登录页面
        window.location.href='login.html'
    } else {
        // 加载用户信息
        document.getElementById('my_phone').innerHTML=phone
        document.getElementById('my_name').innerHTML=localStorage.getItem('name')
        document.getElementById('my_id_code').innerHTML=localStorage.getItem('identity')
    }
}
function performLogin(phone, pwd) {
    $.ajax({
        url: ipmain+":8387/user/signIn",
        dataType: "json",
        type: "POST",
        data: {'phone': phone, 'pwd': pwd},
        success: function(data) {
            var temp = eval(data);
            if (temp.status == 'success') {
                localStorage.setItem('phone', phone)
                localStorage.setItem('pwd', pwd)
                localStorage.setItem('name', temp.obj.name)
                localStorage.setItem('identity', temp.obj.identity)
                window.location.href='index.html'
            } else {
                alert('用户名或密码错误')
            }
        },
        error: function() {
            alert('服务器无响应')
        }
        
    })
}

function logout() {
    localStorage.removeItem('phone')
    localStorage.removeItem('pwd')
    window.location.href='index.html'
    alert('注销成功')
}

function performRegister() {
    var phone = document.getElementById('phone').value
    var pwd = hex_md5(document.getElementById('pwd').value)
    var name = document.getElementById('name').value
    var idcode = document.getElementById('idcode').value

    $.ajax({
        url: ipmain + ":8387/user/register",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: {
            "phone": phone,
            "pwd": pwd,
            "name": name,
            "idcode": idcode
        },
        success(data) {
            if (data.code < 0) {
                alert(data.status)
            } else {
                performLogin(phone, pwd)
            }
        },
        error(data) {
            alert('服务器无响应')
        }
    })
}