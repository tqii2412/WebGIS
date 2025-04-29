// Tạo sự kiện cho nút lấy vị trí
document.addEventListener('DOMContentLoaded', function () {
    const locateBtn = document.getElementById('locateBtn');
    if (!locateBtn) return;

    locateBtn.addEventListener('click', function () {
        if (!map) {
            console.error('Map chưa khởi tạo.');
            return;
        }

        map.locate({
            setView: true,
            enableHighAccuracy: true
        });
    });

    // Sự kiện khi lấy được vị trí
    map.on('locationfound', function (e) {
        const marker = L.marker([e.latitude, e.longitude])
            .bindPopup("Bạn đang ở đây 🧭")
            .addTo(map);

        const circle = L.circle([e.latitude, e.longitude], {
            radius: e.accuracy / 2,
            weight: 10,
            color: "blue",
            fillColor: "blue",
            fillOpacity: 0.1
        }).addTo(map);
    });

    // Sự kiện khi lỗi vị trí
    map.on('locationerror', function (e) {
        alert('Không thể lấy vị trí: ' + e.message);
    });
});
