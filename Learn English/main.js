
document.getElementById('excelFile').addEventListener('change', function (e) {
    // Đọc file Excel
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Lấy dữ liệu từ Sheet1
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Tạo bảng HTML
        let html = '<table>';

        // Tạo header
        html += '<tr>';
        jsonData[0].forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += '</tr>';

        // Tạo các dòng dữ liệu
        for (let i = 1; i < jsonData.length; i++) {
            html += '<tr>';
            jsonData[i].forEach(cell => {
                html += `<td>${cell || ''}</td>`;
            });
            html += '</tr>';
        }

        html += '</table>';
        document.getElementById('output').innerHTML = html;
    };

    reader.readAsArrayBuffer(file);
});
