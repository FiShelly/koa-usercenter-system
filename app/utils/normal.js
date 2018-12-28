const errorMap = {
    'login-invalidate': '登录失败：账号密码错误',
    'mysql-error': '数据库错误',
    'input-invalidate': '输入不合法',
    'input-invalidate-empty': '输入参数为空',
    'input-invalidate-number': '输入参数必须为数字',
    'input-invalidate-status': '非法的文章状态',
    'input-invalidate-oldPwd': '旧密码输入不正确',
    'data-not-find': '数据未找到或不存在',
    'data-is-exist': '数据已存在',
    'no-auth-app': '当前账号无访问此应用权限',
    'no-logined': '未登录',
    'too-frequent': '访问太频繁',
    'must-be-image': '必须是图片',
    'must-be-local-site': '必须是本站点访问',
    'access-token-empty': '',
    'access-token-expired': 'access-token已过期',
    'expired-time': '时间已过期',
    'can-not-delete-fishelly': '无法删除此账号',
    'user-exist': '当前用户已存在',

};

const deepClone = function (data) {
    return JSON.parse(JSON.stringify(data));
};

const _changeData = function (data) {
    if (data && data.hasOwnProperty('count') && data.hasOwnProperty('rows')) {
        data = {
            total: data.count,
            list: data.rows
        };
    }
    data = deepClone(data);
    if (!data) {
        return null;
    }
    if (data instanceof Array) {
        data = {list: data};
    }
    return data;
};

const redirectData = function (status = 302, url, msg) {
    return {
        status, url, msg: errorMap[msg]
    };
};

const packData = function (code, status, data) {
    if (status === 'success') {
        return {
            code: code,
            status: status,
            data: _changeData(data)
        };
    } else {
        return {
            code: code,
            status: status,
            msg: errorMap[data] || data
        };
    }
};

const validator = {
    isEmpty (obj) {
        return typeof obj === 'undefined' || obj === null || (typeof obj === 'string' && obj.length === 0);
    },
    isNumeric (obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    numberic (obj) {
        return this.isNumeric(obj);
    },
    numeric (obj) {
        return this.isNumeric(obj);
    },
    isObject (obj) {
        return typeof obj === 'object' && !(obj instanceof Array);
    },
    email (obj) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(obj);
    },
    chinese (obj) {
        return /^[\u4e00-\u9fa5]{0,}$/.test(obj);
    },
    english (obj) {
        return /^[a-zA-Z]+$/.test(obj);
    },
    url (obj) {
        return /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/.test(obj);
    },
    idcard (obj) {
        return /(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(obj);
    },
    mobile (obj) {
        return /^1(3|4|5|7|8)[0-9]\d{8}$/.test(obj);
    },
    document (obj) {
        return /\.doc(x?)$|\.xls(x?)$|\.ppt(x?)$|\.wps$|\.pef$|\.txt$/i.test(obj);
    },
    image (obj) {
        return /\.png|\.jpg$|\.jpeg$|\.bmp$|\.gif$/i.test(obj);
    },
    video (obj) {
        return /\.wmv$|\.avi$|\.mkv$|\.mp4$|\.rmvb$/i.test(obj);
    },
    audio (obj) {
        return /\.mp3/i.test(obj);
    },
    archive (obj) {
        return /\.rar$|\.zip$|\.7z$|\.gzip$|\.tar$|\.iso$/i.test(obj);
    }
};

export default {packData, deepClone, validator, redirectData};