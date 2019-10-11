//处理传过来的参数
function getParams(par) {
    //处理空的字符
    let parames = '';
    //对象 属性名是k   值是par
    for (let k in par) {
        parames += k + '=' + par[k] + '&'
    }
    return parames.substr(0, parames.length - 1)
}

function ajax(options) {
    //1.创建实例对象
    let xhr = new XMLHttpRequest()
        //2.处理请求参数
    let parames = (options.data && getParams(options.data)) || ''

    //3.判断两种请求方式的参数处理
    if (options.type == 'get') options.url = options.url + "?" + parames
    if (parames == "") options.url.replace('?', '')

    xhr.open(options.type || 'get', options.url)
        //判断请求
    if (options.type == "get") {
        xhr.send(null)
    } else {
        //处理post添加请求头
        let header = options.header || 'application/x-www-form-urlencoded'
        xhr.setRequestHeader('Content-Type', header)

        if (header == 'application/json') {
            xhr.send(JSON.stringify(options.data))
        } else {
            xhr.send(parames)
        }
    }
    //4.处理响应结果
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            //获取服务器响应头信息
            let resContent = xhr.getResponseHeader('Content-Type')
            let resreSult = xhr.responseText

            if (resContent.includes('application/json')) {
                //将响应过来的数据转换成对象
                resreSult = JSON.parse(resreSult)
            }
            options.success && options.success(resreSult, xhr)
        } else {
            options.error && options.error(resreSult, xhr)
        }
    }
}