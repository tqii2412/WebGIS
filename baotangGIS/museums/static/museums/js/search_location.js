searchInput.addEventListener('input', function () {
    const keyword = this.value.trim().toLowerCase();
    suggestions.innerHTML = '';

    if (keyword.length < 1) return;  // Cho phép tìm ngay từ 1 ký tự

    const words = keyword.split(' ');

    const matches = museumsData.filter(museum => {
        const name = museum.name.toLowerCase();
        const address = museum.address.toLowerCase();
        return words.every(word => name.includes(word) || address.includes(word));
    });

    if (matches.length > 0) {
        matches.forEach(museum => {
            const li = document.createElement('li');
            li.textContent = museum.name;
            li.style.padding = '5px 10px';
            li.style.cursor = 'pointer';
            li.addEventListener('click', function() {
                const lat = museum.latitude;
                const lng = museum.longitude;
                map.flyTo([lat, lng], 17, { duration: 1 });

                const index = museumsData.indexOf(museum);
                if (markers[index]) {
                    markers[index].openPopup();
                }

                suggestions.innerHTML = '';
                searchInput.value = '';
            });
            suggestions.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = '❌ Không tìm thấy bảo tàng.';
        li.style.padding = '5px 10px';
        li.style.color = 'red';
        suggestions.appendChild(li);
    }
});
