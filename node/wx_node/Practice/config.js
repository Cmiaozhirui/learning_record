var util = require('./lib/util');
var path = require('path');
var wechatFile = path.join(__dirname, './config/wechat.txt');

module.exports = config = {

    wechat: {
        appID: 'wx0c1c18ae371dc28b',
        appsecret: 'e1f6a0d6bd3d35ef73573d7be59c0ae5',
        token: 'mzr',
        getAccessToken: function() {

            return util.readFileAsync(wechatFile);
        },
        saveAccessToken: function (data) {

            util.writeFileAsync(wechatFile ,data);
        }
    }
}