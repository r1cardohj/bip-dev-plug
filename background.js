// 监听扩展图标点击事件
chrome.action.onClicked.addListener(async (tab) => {
    console.log("Extension icon clicked");
    
    try {
        // 注入并执行检查脚本
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: checkAndFixIframes
        });
        
        console.log("检查脚本执行完成");
    } catch (error) {
        console.error("Failed to execute script:", error);
    }
});

// 要注入的检查和修复函数
function checkAndFixIframes() {
    console.log("🔍 开始检查 iframe...");
    
    let foundErrors = 0;
    let fixedIframes = 0;
    
    // 检查 iframe 中是否有错误
    function checkErrorInIframe(iframe) {
        try {
            if (!iframe || !iframe.src) {
                return false;
            }
            
            if (!iframe.contentWindow) {
                return false;
            }
            
            let iframeDoc;
            try {
                iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            } catch (e) {
                console.log("无法访问 iframe 文档（跨域限制）");
                return false;
            }
            
            if (iframeDoc && iframeDoc.readyState === 'complete') {
                // 查找错误提示
                console.log(iframeDoc)
                const errorDiv = iframeDoc.querySelector('div[align="center"]');
                if (errorDiv && errorDiv.textContent.includes('抱歉，您请求的页面出错啦！')) {
                    console.log("找到错误提示:", errorDiv.textContent);
                    return true;
                }
                
                // 额外检查包含"抱歉"的元素
                const allDivs = iframeDoc.querySelectorAll('div');
                for (let div of allDivs) {
                    if (div.textContent && div.textContent.includes('抱歉')) {
                        console.log("找到可能的错误提示:", div.textContent);
                        return true;
                    }
                }
            }
        } catch (error) {
            console.log("检查 iframe 失败:", error.message);
        }
        
        return false;
    }
    
    // 修复 iframe src
    function fixIframeSrc(iframe) {
        const currentSrc = iframe.src;
        
        if (currentSrc.includes('/nccloud/resources')) {
            console.log("iframe src 已经包含 /nccloud/resources，跳过修改");
            return false;
        }
        
        if (!currentSrc || currentSrc === 'about:blank') {
            console.log("iframe src 为空或无效，跳过修改");
            return false;
        }
        
        let newSrc;
        
        try {
            if (currentSrc.startsWith('http://') || currentSrc.startsWith('https://')) {
                const url = new URL(currentSrc);
                newSrc = url.origin + '/nccloud/resources' + url.pathname + url.search + url.hash;
            } else if (currentSrc.startsWith('/')) {
                newSrc = '/nccloud/resources' + currentSrc;
            } else {
                newSrc = '/nccloud/resources/' + currentSrc;
            }
            
            console.log("修改 iframe src:");
            console.log("从:", currentSrc);
            console.log("到:", newSrc);
            
            iframe.src = newSrc;
            return true;
        } catch (error) {
            console.error("修改 iframe src 失败:", error);
            return false;
        }
    }
    
    function findAllIframes(root = document, level = 0, result = []) {
        const iframes = root.querySelectorAll('iframe');
        
        iframes.forEach(iframe => {
            result.push(iframe);
            
            try {
                // 尝试访问嵌套的 iframe
                if (iframe.contentDocument) {
                    findAllIframes(iframe.contentDocument, level + 1, result);
                }
            } catch (e) {
                // 跨域限制，无法访问嵌套内容
                console.log(`无法访问第 ${level + 1} 层 iframe 内容（跨域限制）`);
            }
        });
        
        return result;
    }

    // 显示结果通知
    function showResult(foundErrors, fixedIframes) {
        const existingDiv = document.getElementById('bip-dev-tools-result');
        if (existingDiv) {
            existingDiv.remove();
        }
        
        const div = document.createElement('div');
        div.id = 'bip-dev-tools-result';
        div.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            color: white;
            padding: 15px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Arial;
            font-weight: bold;
            min-width: 200px;
        `;
        
        if (foundErrors > 0) {
            if (fixedIframes > 0) {
                div.style.background = '#4CAF50';
                div.innerHTML = `
                    ✅ 检查完成<br>
                    🚨 发现 ${foundErrors} 个错误<br>
                    🔧 已修复 ${fixedIframes} 个 iframe
                `;
            } else {
                div.style.background = '#ff9800';
                div.innerHTML = `
                    ⚠️ 检查完成<br>
                    🚨 发现 ${foundErrors} 个错误<br>
                    ❌ 无法自动修复
                `;
            }
        } else {
            div.style.background = '#2196F3';
            div.innerHTML = `
                ✅ 检查完成<br>
                😊 未发现错误
            `;
        }
        
        document.body.appendChild(div);
        
        setTimeout(() => {
            if (div.parentNode) {
                div.remove();
            }
        }, 5000);
    }
    
    // 检查主页面
    const mainErrorDiv = document.querySelector('div[align="center"]');
    if (mainErrorDiv && mainErrorDiv.textContent.includes('抱歉，您请求的页面出错啦！')) {
        console.log("在主页面找到错误提示");
        foundErrors++;
        mainErrorDiv.style.border = "3px solid orange";
        mainErrorDiv.style.backgroundColor = "#fff3cd";
    }
    
    // 检查所有 iframe
    const allIframes = findAllIframes()
    console.log(`find ${allIframes.length} iframe(nest)`)
    
    allIframes.forEach((iframe, index) => {
        console.log(`检查第 ${index + 1} 个 iframe:`, iframe.src || 'no src');
        
        if (iframe.contentWindow && iframe.contentDocument) {
            const hasError = checkErrorInIframe(iframe);
            if (hasError) {
                foundErrors++;
                const fixed = fixIframeSrc(iframe);
                if (fixed) {
                    fixedIframes++;
                }
            }
        } else {
            console.log(`iframe ${index + 1} 未完全加载，跳过检查`);
        }
    });
    
    // 显示检查结果
    showResult(foundErrors, fixedIframes);
    
    console.log(`检查完成 - 发现错误: ${foundErrors}, 修复成功: ${fixedIframes}`);
}
