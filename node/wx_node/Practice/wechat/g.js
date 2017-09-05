var sha1 = require('sha1');
var getRawBody = require('raw-body');
var Wechat = require('./wechat');
var util = require('./util');

module.exports = function(opt, handler) {

    var wechat = new Wechat(opt);

    return function *(next) {

        var signature = this.query.signature;
        var echostr = this.query.echostr;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;

        var str = [nonce, timestamp, opt.token].sort().join('');
        var sha = sha1(str);

        if(this.method === 'GET') {
            console.log(sha, signature);
            if(sha === signature) {

                this.body = echostr;

            } else {

                this.body = 'wrong';
            }


        } else if(this.method === 'POST') {

            if(sha !== signature) {

                this.body = 'wrong';

                return false;
            }


            //得到原始的请求体
            var body = yield getRawBody(this.req, {
                length: this.req.headers['content-length'],
                limit: '1mb',
                encoding: true
            });

            var content = yield util.xml2js(body);
            /**
             * { xml:
               { ToUserName: [ 'gh_b53757b93b81' ],
                 FromUserName: [ 'ovs19twLqvwtVodDA2hmB2nBxtOM' ],
                 CreateTime: [ '1503655349' ],
                 MsgType: [ 'text' ],
                 Content: [ '刚刚' ],
                 MsgId: [ '6458150548823276495' ] } }
             */
            var message = yield util.formatMessage(content.xml);

            // console.log(message);

            this.weixin = message;

            yield handler.call(this, next);

            wechat.reply.call(this);
        }



    }
}