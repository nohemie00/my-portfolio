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
            
            // 네트워크 연결 섹션이 활성화되면 네트워크 초기화
            if (id === 'network-connections') {
                setTimeout(() => {
                    initializeNetworkGraph();
                }, 100);
            }
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
    // 프로젝트 컨테이너도 숨김
    const projectsContainer = document.querySelector('.projects-container');
    if (projectsContainer) {
        projectsContainer.classList.remove('visible');
    }
}

// 특정 섹션 표시
function showSection(sectionId) {
    hideAllSections();
    if (sectionId === 'projects') {
        const projectsContainer = document.querySelector('.projects-container');
        if (projectsContainer) {
            projectsContainer.classList.add('visible');
        }
    } else {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('visible');
            // 스크롤 위치 보정
            setTimeout(() => {
                if (typeof section.scrollIntoView === 'function') {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // scrollIntoView가 없으면 window.scrollTo로 보정
                    const rect = section.getBoundingClientRect();
                    window.scrollTo({
                        top: window.scrollY + rect.top - 20,
                        behavior: 'smooth'
                    });
                }
            }, 10);
        }
    }
}

// 프로젝트 섹션 표시
function showProjectsSection() {
    showSection('projects');
}

document.addEventListener('DOMContentLoaded', function() {
    // 프로젝트 네비게이션 클릭 이벤트
    const projectLinks = document.querySelectorAll('.project-nav a');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection('projects');
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
    
    // 네트워크 그래프는 해당 섹션이 활성화될 때 초기화
    // initializeNetworkGraph();
});

// vis.js 기반 네트워크 다이어그램 초기화
function initializeNetworkGraph() {
    const container = document.getElementById('mynetwork');
    if (!container) {
        console.error('Network container not found');
        return;
    }

    // vis.js 라이브러리 확인
    if (typeof vis === 'undefined') {
        console.error('vis.js library not loaded');
        return;
    }

    console.log('Initializing network graph...');

    // 1. 데이터 정의
    const mainCategories = {
        publisher: '출판사',
        media: '미디어',
        hotel: '호텔앤리조트',
        partner: '협력사',
        artist: '아티스트'
    };

    // 각 카테고리에 속한 하위 리스트
    const dataLists = {
        publisher: ['한국그림책출판협회', '어린이출판협회', '이퍼블릭코리아', '중앙출판사', '킨더랜드', '반달', '보림출판사', '그레이트북스', '천개의바람', '책읽는곰', '휴먼큐브', '김영사', '능률', '북극곰', '북크루', '딴생각', '활판인쇄박물관'],
        media: ['KBS N', 'Kids EDU TV', 'LG HelloVision', 'KCMI', '미디어앤아트', '마이아트이다', '본다빈치', '컬쳐앤아이리더스', '뜻밖의녹음실', '1m클래식', '에그박사', '헤이지니'],
        hotel: ['현대(리한)호텔', '휘닉스중앙', '하이원', '롯데호텔'],
        partner: ['에버랜드', 'LG 유플러스', '샘표', '하림', '파라다이스', '야나두', '긱블', '미래엔', '인터파크', '서울상상나라', '상하농원', '세이펜', '유콘', '함소아한의원', '용인곤충테마파크', '심플소프트', '샌드아트코', '키두', '키즈스콜레'],
        artist: ['신유미', '이욱재', '이범재', '신원미', '난주', '조경희', '신현수', '구신애', '이순옥', '이시원', '홍미령', '김지연', '허아성', '허정윤', '김가희']
    };

    // 2. vis-network.js가 이해할 수 있는 데이터 형태로 가공
    const nodes = [];
    const edges = [];

    // 중심 노드 추가
    for (const key in mainCategories) {
        nodes.push({
            id: mainCategories[key],
            label: mainCategories[key],
            group: 'main'
        });
    }

    // 하위 노드 및 연결선 추가
    for (const categoryKey in dataLists) {
        const mainNodeId = mainCategories[categoryKey];
        dataLists[categoryKey].forEach(item => {
            const nodeId = `${mainNodeId}_${item}`;
            nodes.push({
                id: nodeId,
                label: item,
                group: categoryKey
            });
            edges.push({
                from: mainNodeId,
                to: nodeId
            });
        });
    }

    console.log('Nodes:', nodes.length, 'Edges:', edges.length);

    // 3. 그래프 생성
    const data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges),
    };

    // 그래프의 디자인과 물리 엔진 등 옵션을 설정
    const options = {
        nodes: {
            shape: 'dot',
            size: 12,
            font: {
                size: 14,
                color: '#ffffff'
            },
            borderWidth: 2,
            color: {
                border: '#ffffff',
                background: '#555555'
            }
        },
        edges: {
            width: 1,
            color: {
                color: '#888888',
                highlight: '#ffffff'
            },
            smooth: {
                type: 'continuous'
            }
        },
        physics: {
            forceAtlas2Based: {
                gravitationalConstant: -26,
                centralGravity: 0.005,
                springLength: 230,
                springConstant: 0.18,
            },
            maxVelocity: 146,
            solver: 'forceAtlas2Based',
            timestep: 0.35,
            stabilization: { iterations: 150 },
        },
        interaction: {
            hover: true,
            dragNodes: true,
            zoomView: true,
            dragView: true
        },
        groups: {
            // 중심 노드 스타일
            main: {
                shape: 'ellipse',
                size: 50,
                font: { size: 24, color: '#ffffff', bold: true },
                color: { background: '#f0a30a', border: '#f0a30a' }
            },
            // 카테고리별 하위 노드 색상
            publisher: { color: { background: '#e07a5f', border: '#e07a5f' } },
            media: { color: { background: '#81b29a', border: '#81b29a' } },
            hotel: { color: { background: '#f2cc8f', border: '#f2cc8f' } },
            partner: { color: { background: '#6d597a', border: '#6d597a' } },
            artist: { color: { background: '#3d405b', border: '#3d405b' } },
        }
    };

    try {
        // 네트워크 객체를 생성
        const network = new vis.Network(container, data, options);
        console.log('Network created successfully');
        
        // 네트워크 이벤트 리스너 추가
        network.on('stabilizationProgress', function(params) {
            console.log('Stabilization progress:', params.iterations, '/', params.total);
        });
        
        network.on('stabilizationIterationsDone', function() {
            console.log('Network stabilized');
        });
        
    } catch (error) {
        console.error('Error creating network:', error);
    }
}


