// Cấu hình bản đồ
let config = {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }
};

// Độ phóng đại khi bản đồ được mở
const zoom = 18;
// Tọa độ Trường
const lat = 10.801388;
const lng = 106.658725;

// Khởi tạo bản đồ
const map = L.map("map", config).setView([lat, lng], zoom);
map.attributionControl.setPrefix(false);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);


// Ép bản đồ cập nhật kích thước (rất nhẹ)
setTimeout(() => {
    map.invalidateSize();
}, 100);

