const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const rootPath = path.normalize(__dirname + '/../');

function GetQueryPager (pager) {
    let pagerTmp = {
        limit: 10,
        skip: 1
    };

    if (pager.page) pagerTmp.skip = pager.page;
    if (pager.limit) pagerTmp.limit = pager.limit;

    return pagerTmp;
}

function CreateObjectId (id) {
    return mongoose.Types.ObjectId(id);
}

function MkdirFolders () {
    return new Promise ( async (resolve, reject) => {
        try {
            let publicDir = rootPath + 'public';

            if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
            if (!fs.existsSync(publicDir + '/client')) fs.mkdirSync(publicDir + '/client');
            if (!fs.existsSync(publicDir + '/static')) fs.mkdirSync(publicDir + '/static');
            if (!fs.existsSync(publicDir + '/static' + '/pdfs')) fs.mkdirSync(publicDir + '/static' + '/pdfs');

            resolve(true);
        } catch (e) {
            console.log('MkdirFolder err: ', e);
            reject(e);
        }
    });
}

module.exports.GetQueryPager = GetQueryPager;
module.exports.CreateObjectId = CreateObjectId;
module.exports.MkdirFolders = MkdirFolders;