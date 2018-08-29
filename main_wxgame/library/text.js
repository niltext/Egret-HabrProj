const fileutil = require('./file-util');
const path = fileutil.path;
const fs = wx.getFileSystemManager();


const tempDir = `temp_text/`//下载总目录


// 开发者应在微信的 updateManager 判断有包更新时手动删除此文件夹，清除缓存
// fileutil.fs.remove(tempDir)


/**
 * 重写的文本加载器，代替引擎默认的文本加载器
 * 该代码中包含了大量日志用于辅助开发者调试
 * 正式上线时请开发者手动删除这些注释
 */
class TextProcessor {

    onLoadStart(host, resource) {

        const { root, url } = resource;


        return new Promise((resolve, reject) => {

            if (path.isRemotePath(root)) {
              const xhrURL = url.indexOf('://') >= 0 ? url : root + url;
                if (needCache(root,url)) {
                    const targetFilename = tempDir + xhrURL.replace(resource.root, "");

                    if (fileutil.fs.existsSync(targetFilename)) {
                        fileutil.fs.readSync(targetFilename,'utf-8').then((data)=>{
                            resolve(data)
                        })
                    }
                    else {
                        loadText(xhrURL).then((content) => {
                            const dirname = path.dirname(targetFilename);
                            fileutil.fs.mkdirsSync(dirname)
                            fileutil.fs.writeSync(targetFilename, content)
                            resolve(content);
                        }).catch((e) => {
                            reject(e);
                        })
                    }

                }
                else {
                    loadText(xhrURL).then((content) => {
                        resolve(content);
                    }).catch((e) => {
                        reject(e);
                    })
                }
            }
            else {
                const content = fs.readFileSync(root + url, 'utf-8');
                resolve(content);
            }
        }
        );
    }

    onRemoveStart(host, resource) {
        return Promise.resolve();
    }
}



function loadText(xhrURL) {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          if (xhr.status >= 400){
            const message = `加载失败:${xhrURL}`;
            console.error(message)
            reject(message)
          }
          else{
            resolve(xhr.responseText);
          }
         
        }
        xhr.onerror = (e) => {
          var error = new RES.ResourceManagerError(1001, xhrURL);
            console.error(e)
            reject(error)
        }
        xhr.open("get", xhrURL);
        xhr.send();
    })

}

/**
 * 由于微信小游戏限制只有50M的资源可以本地存储，
 * 所以开发者应根据URL进行判断，将特定资源进行本地缓存
 */
function needCache(root, url) {
  if (root.indexOf("miniGame/resource/") >= 0) {
    return true;
  }
  else {
    return false;
  }
}


const processor = new TextProcessor();
RES.processor.map("text", processor)

