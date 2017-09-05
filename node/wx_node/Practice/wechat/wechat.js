var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./util');

var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {

    accessToken: prefix + 'token?grant_type=client_credential',

}

var Wechat = function(opt) {

    this.appID = opt.appID;
    this.appsecret = opt.appsecret;
    this.getAccessToken = opt.getAccessToken;
    this.saveAccessToken = opt.saveAccessToken;
    var self= this;

    this.getAccessToken()
        .then(function(data) {

            try{

                var data = JSON.parse(data);
            }catch (e) {

                return self.updateAccessToken();
            }

            if(self.validAccessToken(data)) {

                return data;
            } else {

                return self.updateAccessToken();
            }
        })
        .then(function(data) {

            self.access_token = data.access_token;
            self.expires_in = data.expires_in;

            var data = JSON.stringify(data);
            self.saveAccessToken(data);
        })

}

Wechat.prototype.validAccessToken = function(data) {

    var now = new Date().getTime();

    if(now > data.expires_in) {

        return false;
    }

    return true;
}

Wechat.prototype.updateAccessToken = function(data) {

    var self = this;

    return new Promise(function(resolve, reject) {

        var url = api.accessToken + `&appid=${self.appID}&secret=${self.appsecret}`;

        request(url, {json:true}).then(function (response) {

            var data = response.body;
            data.expires_in = (new Date().getTime()) + (data.expires_in - 20)*1000;


            resolve(data);
        })
    })

}

Wechat.prototype.reply = function() {

    var content = this.body;
    var message = this.weixin;
    var xml = util.tpl(content, message);

    console.log(xml)
    this.status = 200;
    this.type = 'application/xml';
    this.body = xml;
}

module.exports = Wechat;
