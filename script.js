// 初始化美术馆
document.addEventListener('DOMContentLoaded', () => {
    // 导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 上传功能
    const uploadBtn = document.querySelector('.upload-btn');
    const uploadModal = document.getElementById('uploadModal');
    const artUpload = document.getElementById('artUpload');
    const artGrid = document.getElementById('artGrid');

    uploadBtn.addEventListener('click', () => {
        uploadModal.style.display = 'block';
    });

    // 拖拽上传功能
    const uploadLabel = document.querySelector('.upload-label');
    
    uploadLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadLabel.style.background = 'rgba(197, 164, 126, 0.1)';
    });

    uploadLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        artUpload.files = e.dataTransfer.files;
    });

    // 作品上传处理
    artUpload.addEventListener('change', handleUpload);
    
    function handleUpload() {
        const files = Array.from(this.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                createArtCard(e.target.result, file.name);
            }
            
            reader.readAsDataURL(file);
        });
    }

    // 创建作品卡片
    function createArtCard(imgSrc, title) {
        const artItem = document.createElement('div');
        artItem.className = 'art-item painting';
        artItem.innerHTML = `
            <img src="${imgSrc}" alt="${title}">
            <div class="art-info">
                <h3>${title}</h3>
            </div>
        `;
        
        artGrid.appendChild(artItem);
        addLightboxListener(artItem);
    }

    // 灯箱功能
    function addLightboxListener(element) {
        element.querySelector('img').addEventListener('click', () => {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            
            lightbox.style.display = 'block';
            lightboxImg.src = element.querySelector('img').src;
        });
    }

    // 关闭功能
    document.querySelectorAll('.close-btn, .close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lightbox, .upload-modal').forEach(
                modal => modal.style.display = 'none'
            );
        });
    });
});