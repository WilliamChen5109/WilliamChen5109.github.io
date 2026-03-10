document.addEventListener('DOMContentLoaded', function() {
    
    // ================= 通用复制函数 =================
    function copyText(text, type) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(`${type} 复制成功！`);
            }).catch(err => {
                console.error('复制失败: ', err);
                fallbackCopy(text, type);
            });
        } else {
            fallbackCopy(text, type);
        }
    }

    // ================= 备用复制方法 =================
    function fallbackCopy(text, type) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast(`${type} 复制成功！`);
        } catch (err) {
            alert(`复制失败，请手动复制：${text}`);
        }
        document.body.removeChild(textarea);
    }

    // ================= Toast提示 =================
    function showToast(message) {
        const oldToast = document.querySelector('.copy-toast');
        if (oldToast) oldToast.remove();

        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 20px;
            border-radius: 30px;
            font-size: 14px;
            z-index: 9999;
            animation: fadeInOut 2s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, 20px); }
                15% { opacity: 1; transform: translate(-50%, 0); }
                85% { opacity: 1; transform: translate(-50%, 0); }
                100% { opacity: 0; transform: translate(-50%, -20px); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 2000);
    }

    // ================= 邮箱复制（通过类名） =================
    const emailLinks = document.querySelectorAll('a.copy-email');
    if (emailLinks.length > 0) {
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                copyText('1652060105@qq.com', '📧 邮箱');
            });
        });
    } else {
        // 备用：通过图标找邮箱
        const emailIcons = document.querySelectorAll('.fa-envelope');
        emailIcons.forEach(icon => {
            const link = icon.closest('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    copyText('1652060105@qq.com', '📧 邮箱');
                });
            }
        });
    }

    // ================= QQ复制（通过图标类名 fa-qq） =================
    const qqIcons = document.querySelectorAll('.fa-qq');
    if (qqIcons.length > 0) {
        qqIcons.forEach(icon => {
            const link = icon.closest('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    copyText('1652060105', '💬 QQ');
                });
            }
        });
        console.log('找到 QQ 图标，已绑定复制事件');
    } else {
        console.log('未找到 QQ 图标，请检查图标类名是否为 fa-qq');
    }

    // ================= 微信复制（通过图标类名 fa-weixin） =================
    const wechatIcons = document.querySelectorAll('.fa-weixin');
    if (wechatIcons.length > 0) {
        wechatIcons.forEach(icon => {
            const link = icon.closest('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    copyText('_0n1Ckn', '📱 微信');
                });
            }
        });
        console.log('找到微信图标，已绑定复制事件');
    } else {
        console.log('未找到微信图标，请检查图标类名是否为 fa-weixin');
    }

    // ================= 如果微信图标类名可能是 fa-wechat =================
    const wechatIconsAlt = document.querySelectorAll('.fa-wechat');
    if (wechatIconsAlt.length > 0) {
        wechatIconsAlt.forEach(icon => {
            const link = icon.closest('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    copyText('kun_wechat', '📱 微信');
                });
            }
        });
        console.log('找到微信图标（备选类名），已绑定复制事件');
    }
});