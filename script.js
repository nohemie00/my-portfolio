document.addEventListener('DOMContentLoaded', function() {
    const projectLinks = document.querySelectorAll('.project-nav a');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 기존 활성화된 설명 숨김
            document.querySelectorAll('.description.active').forEach(desc => {
                desc.classList.remove('active');
            });

            // 새로운 설명 표시
            const descId = this.getAttribute('href').substring(1);
            const description = document.getElementById(`desc-${descId}`);
            if (description) {
                description.classList.add('active');
            }
        });
    });
});

function adjustImageSize(previewElement) {
    const img = previewElement.querySelector('img');
    
    // 이미지 로드 완료 후 크기 조정
    img.onload = function() {
        const ratio = img.naturalWidth / img.naturalHeight;
        
        if (ratio > 1.8) { // 파노라마 이미지
            previewElement.style.width = '900px';
            previewElement.style.height = '300px';
        } else if (ratio > 1.3) { // 가로가 긴 이미지
            previewElement.style.width = '800px';
            previewElement.style.height = '400px';
        } else if (ratio < 0.8) { // 세로가 긴 이미지
            previewElement.style.width = '400px';
            previewElement.style.height = '600px';
        } else { // 정사각형에 가까운 이미지
            previewElement.style.width = '600px';
            previewElement.style.height = '600px';
        }
    }
}

class ImageSlider {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.slider-track');
        this.images = Array.from(this.track.querySelectorAll('img'));
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        
        this.setupSlider();
        this.setupControls();
        this.startAutoPlay();
    }

    setupSlider() {
        // 첫 번째 이미지 활성화
        this.images[0].classList.add('active');
        
        // 도트 생성
        const dotsContainer = this.container.querySelector('.slider-dots');
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // 버튼 이벤트
        this.container.querySelector('.prev-btn').addEventListener('click', () => this.prevSlide());
        this.container.querySelector('.next-btn').addEventListener('click', () => this.nextSlide());
    }

    setupControls() {
        // 마우스 진입/이탈 시 자동 재생 제어
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goToSlide(index) {
        // 현재 활성 이미지 비활성화
        this.images[this.currentIndex].classList.remove('active');
        this.container.querySelectorAll('.dot')[this.currentIndex].classList.remove('active');
        
        // 새 이미지 활성화
        this.currentIndex = index;
        this.images[this.currentIndex].classList.add('active');
        this.container.querySelectorAll('.dot')[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// 슬라이더 초기화
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainers = document.querySelectorAll('.slider-container');
    sliderContainers.forEach(container => new ImageSlider(container));
});

function showPreview(e) {
    if (e.target.hasAttribute('data-preview')) {
        const previewId = e.target.getAttribute('data-preview');
        const previewElement = document.getElementById(`preview-${previewId}`);
        const descriptionElement = document.getElementById(`desc-${previewId}`);
        
        if (previewElement) {
            hideAllPreviews();
            hideAllDescriptions();
            previewElement.classList.add('active');
            if (descriptionElement) {
                descriptionElement.classList.add('active');
            }
        }
    }
}

function hidePreview(e) {
    if (e.target.hasAttribute('data-preview')) {
        const previewId = e.target.getAttribute('data-preview');
        const previewElement = document.getElementById(`preview-${previewId}`);
        const descriptionElement = document.getElementById(`desc-${previewId}`);
        
        if (previewElement && !previewElement.classList.contains('fixed')) {
            previewElement.classList.remove('active');
            if (descriptionElement) {
                descriptionElement.classList.remove('active');
            }
        }
    }
}

function hideAllPreviews() {
    document.querySelectorAll('.preview-image').forEach(preview => {
        if (!preview.classList.contains('fixed')) {
            preview.classList.remove('active');
        }
    });
}

function hideAllDescriptions() {
    const descriptions = document.querySelectorAll('.description');
    descriptions.forEach(desc => {
        desc.style.display = 'none';
        desc.classList.remove('active');
    });
}

function showDescription(id) {
    hideAllDescriptions();
    const targetDesc = document.getElementById(`desc-${id}`);
    if (targetDesc) {
        targetDesc.style.display = 'block';
        setTimeout(() => {
            targetDesc.classList.add('active');
        }, 50);
    }
}

function navigateToSection(e) {
    const previewId = e.currentTarget.id;
    const sectionId = previewId.replace('preview-', '');
    const section = document.getElementById(sectionId);
    
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 스크롤 중에는 프리뷰 숨기기
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    hideAllPreviews();
    
    scrollTimeout = setTimeout(() => {
        const hoveredLink = document.querySelector('.project-nav a:hover');
        if (hoveredLink) {
            showPreview({ target: hoveredLink });
        }
    }, 150);
});

// 모든 섹션 숨기기
function hideAllSections() {
    document.querySelectorAll('.fade-section').forEach(section => {
        section.classList.remove('visible');
    });
}

// 특정 섹션 표시
function showSection(sectionId) {
    hideAllSections();
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('visible');
    }
}

// 프로젝트 섹션 표시
function showProjectsSection() {
    hideAllSections();
    const projectsContainer = document.querySelector('.projects-container');
    if (projectsContainer) {
        projectsContainer.classList.add('visible');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 프로젝트 네비게이션 클릭 이벤트
    const projectLinks = document.querySelectorAll('.project-nav a');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showProjectsSection();
            showDescription(targetId);
        });
    });

    // 상단 메뉴 클릭 이벤트
    const menuLinks = document.querySelectorAll('.section-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // 초기 상태: About me 섹션 표시
    showSection('about');
});
