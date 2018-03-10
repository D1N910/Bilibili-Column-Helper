const {ipcRenderer,remote} = require('electron'),
    request = require('request');

onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const navigate = (url) => {
        webview.getWebContents().session.cookies.get({
            url: 'http://www.bilibili.com'
        }, (err, cookies) => {
            let jar = '', csrf = '';

            for (let element in cookies){
                if (cookies[element].name == 'bili_jct'){
                    csrf = cookies[element].value;
                }

                jar += ('; ' + request.cookie(cookies[element].name + '=' + cookies[element].value));
            }

            remote.getGlobal('sharedObject').cookies = jar.substring(2);
            remote.getGlobal('sharedObject').csrf = csrf;
            window.close();
        });
    }

    webview.addEventListener('will-navigate', navigate);
}