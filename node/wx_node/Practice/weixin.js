
exports.reply = function *(next) {

    var message = this.weixin;

    if(message.MsgType === 'event') {

        if(message.Event === 'subscribe') {

            if(message.EventKey) {

                consoel.log('扫二维码进来:' + message.Eventkey + ' ' +message.ticket)
            }

            this.body = '哈哈， 你订阅了号\r\n' + '消息ID:' + message.MsgId;
        }


        if(message.Event === 'unsubscribe') {

            console.log('无情取关')
            this.body = ''
        }

        if(message.Event === 'LOCATION') {

            this.body = '您上报的位置是: ' + message.Latitude + '/' + message.Longitude + '-' + message.Precision
        }

        if(message.Event === 'CLICK') {

            this.body = '您点击了菜单: ' + message.EventKey;
        }

        if(message.Event === 'SCAN') {

            this.body = '看到你扫了一下哦'
        }

        if(message.Event === 'VIEW') {

            this.body = '您点击了菜单中的连接: ' + message.EventKey;
        }
    }

    if(message.MsgType === 'text') {

        var content = message.Content;

        var reply = '您说的 ' + message.Content + '太复杂了';

        if(content == 1) {

            reply = '第一'
        }

        if(content == 2) {

            reply = '第二'
        }

        if(content == 3) {

            reply = '第三'
        }

        if(content == 4) {

            reply = [{
                title: 'js',
                description: 'js技术文档',
                picUrl: '',
                url: 'https://github.com'
            },{
                title: 'php',
                description: 'php技术文档',
                picUrl: '',
                url: 'https://github.com'
            }]
        }

        this.body = reply;
    }

    yield next

}

