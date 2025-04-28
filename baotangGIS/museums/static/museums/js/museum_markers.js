// 🔹 Đẩy latlngs, markers, museumsData ra global
const latlngs = [];
const markers = [];
let museumsData = []; // 👍 Toàn bộ dữ liệu

// Tạo icon marker
const museumIcon = L.icon({
    iconUrl: '/static/museums/leaflet/images/baotangicon.png',
    iconSize: [50, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50]
});

// Hàm load dữ liệu bảo tàng và add tất cả marker + bài viết
function loadMuseums() {
    fetch('/api/museums/')
        .then(response => response.json())
        .then(data => {
            museumsData = data; // 👍 Gán luôn toàn bộ dữ liệu
            const articleContainer = document.getElementById('article-container');

            data.forEach((museum, index) => {
                // Render bài viết cho mỗi bảo tàng
                const articleHTML = `
                    <div class="article-item" data-marker-index="${index}" style="margin-bottom: 20px; cursor: pointer;">
                        <h2>${museum.name}</h2>
                        <p>${museum.description.substring(0, 150)}...</p>
                        <small><b>Giờ mở cửa:</b> ${museum.opening_hours || 'Không rõ'}<br>
                        <b>Giá vé:</b> ${museum.ticket_price || 'Không rõ'}</small>
                    </div>
                `;
                articleContainer.innerHTML += articleHTML;

                // Add marker cho bảo tàng
                const popupContent = `
                    <div class="popup-museum">
                        <b>${museum.name}</b><br>${museum.address}<br>
                        ${museum.youtube_link ? `<iframe width="250" height="140" src="${museum.youtube_link}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : ''}
                    </div>
                `;

                const marker = L.marker([museum.latitude, museum.longitude], { icon: museumIcon })
                    .addTo(map)
                    .bindPopup(popupContent, {
                        maxWidth: 300,
                        className: 'customPopup'
                    });

                latlngs.push([museum.latitude, museum.longitude]);
                markers.push(marker);
            });

            console.log(`✅ Đã load ${data.length} markers.`);

            if (latlngs.length > 0) {
                map.flyToBounds(latlngs, { padding: [50, 50], maxZoom: 17 });
            }

            const fitBoundsBtn = document.getElementById('fitBoundsBtn');
            if (fitBoundsBtn) {
                fitBoundsBtn.disabled = false;
            }
        })
        .catch(error => console.error('❌ Lỗi khi load dữ liệu bảo tàng:', error));
}

// Setup sau khi DOM load xong
document.addEventListener('DOMContentLoaded', function () {
    loadMuseums();

    // 🔹 Gắn click cho nút "Xem tất cả bảo tàng"
    const fitBoundsBtn = document.getElementById('fitBoundsBtn');
    if (fitBoundsBtn) {
        fitBoundsBtn.disabled = true;

        fitBoundsBtn.addEventListener('click', function () {
            if (latlngs.length > 0) {
                map.flyToBounds(latlngs, { padding: [50, 50], maxZoom: 16 });
            } else {
                alert('Chưa có bảo tàng để hiển thị.');
            }
        });
    }

    // 🔹 Gắn click cho bài viết
    document.addEventListener('click', function (e) {
        const target = e.target.closest('.article-item');
        if (target) {
            const index = target.getAttribute('data-marker-index');
            const marker = markers[index];
            if (marker) {
                map.flyTo(marker.getLatLng(), 17, { duration: 1 });
                marker.openPopup();
            }
        }
    });
});
