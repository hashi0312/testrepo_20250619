// 城のデータ
const castleData = {
    goryokaku: {
        name: '五稜郭',
        images: [
            'https://example.com/goryokaku1.jpg',
            'https://example.com/goryokaku2.jpg',
            'https://example.com/goryokaku3.jpg'
        ],
        address: '北海道函館市五稜郭町',
        access: {
            station: '函館市電「五稜郭公園前」駅から徒歩10分',
            car: '函館駅から車で約15分',
            walk: '五稜郭タワーから徒歩3分'
        },
        highlights: '日本で唯一の西洋式城郭で、星形の平面プランが特徴的。桜の名所としても知られ、約1,600本の桜が咲き誇る。城郭内の堀や石垣が美しく保存され、歴史的な価値も高い。'
    },
    hirosaki: {
        name: '弘前城',
        images: [
            'https://example.com/hirosaki1.jpg',
            'https://example.com/hirosaki2.jpg',
            'https://example.com/hirosaki3.jpg'
        ],
        address: '青森県弘前市下白銀町',
        access: {
            station: 'JR弘前駅からバスで15分',
            car: '東北自動車道大鰐弘前ICから車で約30分',
            walk: '弘前公園入口から徒歩10分'
        },
        highlights: '日本最古の現存する天守の一つで、春には約2,600本の桜が咲き誇る日本有数の桜の名所。石垣の修復工事で話題となった曳屋工事も見どころの一つ。'
    },
    // 他の城のデータも同様に追加
};

// アコーディオンメニューの制御
document.querySelectorAll('.region-header').forEach(header => {
    header.addEventListener('click', () => {
        const list = header.nextElementSibling;
        const icon = header.querySelector('.toggle-icon');
        
        // 他のリストを閉じる
        document.querySelectorAll('.castle-list').forEach(item => {
            if (item !== list) {
                item.classList.remove('active');
                item.previousElementSibling.querySelector('.toggle-icon').textContent = '▼';
            }
        });

        // クリックされたリストの開閉
        list.classList.toggle('active');
        icon.textContent = list.classList.contains('active') ? '▲' : '▼';
    });
});

// 城をクリックしたときの処理
document.querySelectorAll('.castle-list li').forEach(castle => {
    castle.addEventListener('click', () => {
        const castleId = castle.dataset.castle;
        const data = castleData[castleId];
        if (!data) return;

        // テンプレートをクローン
        const template = document.getElementById('castle-template');
        const content = template.content.cloneNode(true);
        
        // データを挿入
        content.querySelector('.castle-name').textContent = data.name;
        content.querySelector('.address').textContent = data.address;
        content.querySelector('.station').textContent = `【電車】${data.access.station}`;
        content.querySelector('.car').textContent = `【車】${data.access.car}`;
        content.querySelector('.walk').textContent = `【徒歩】${data.access.walk}`;
        content.querySelector('.highlights').textContent = data.highlights;

        // 画像を追加
        const sliderContainer = content.querySelector('.slider-container');
        data.images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = data.name;
            sliderContainer.appendChild(img);
        });

        // 既存のコンテンツを置き換え
        const mainContent = document.querySelector('.castle-content');
        mainContent.innerHTML = '';
        mainContent.appendChild(content);

        // スライダーの制御を設定
        setupImageSlider();
    });
});

// 画像スライダーの制御
function setupImageSlider() {
    const container = document.querySelector('.slider-container');
    const images = container.querySelectorAll('img');
    let currentIndex = 0;

    // 最初の画像以外を非表示
    images.forEach((img, index) => {
        if (index !== 0) img.style.display = 'none';
    });

    // ナビゲーションボタンの制御
    document.querySelector('.prev').addEventListener('click', () => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].style.display = 'block';
    });

    document.querySelector('.next').addEventListener('click', () => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = 'block';
    });
}
