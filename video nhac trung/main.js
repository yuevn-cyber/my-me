const videos = [
    { title: "music 1", src: "./Nhạc trung/a1.mp4" },
    { title: "music 2", src: "./Nhạc trung/a2.mp4" },
    { title: "music 3", src: "./Nhạc trung/a3.mp4" },
    { title: "music 4", src: "./Nhạc trung/a4.mp4" },
    { title: "music 5", src: "./Nhạc trung/a5.mp4" },
    { title: "music 6", src: "./Nhạc trung/a6.mp4" },
    { title: "music 7", src: "./Nhạc trung/a7.mp4" },
    { title: "music 8", src: "./Nhạc trung/a8.mp4" },
    { title: "music 9", src: "./Nhạc trung/a9.mp4" },
    { title: "music 10", src: "./Nhạc trung/a10.mp4" },
    { title: "music 11", src: "./Nhạc trung/a11.mp4" },
    { title: "music 12", src: "./Nhạc trung/a12.mp4" },
    { title: "music 13", src: "./Nhạc trung/a13.mp4" },
    { title: "music 14", src: "./Nhạc trung/a14.mp4" },
    { title: "music 15", src: "./Nhạc trung/a15.mp4" },
    { title: "music 16", src: "./Nhạc trung/a16.mp4" },
    { title: "music 17", src: "./Nhạc trung/a17.mp4" },
    { title: "music 18", src: "./Nhạc trung/a18.mp4" },
    { title: "music 19", src: "./Nhạc trung/a19.mp4" },
    { title: "music 20", src: "./Nhạc trung/a20.mp4" },
    { title: "music 21", src: "./Nhạc trung/a21.mp4" },

    { title: "music 23", src: "./Nhạc trung/a23.mp4" },
    { title: "music 24", src: "./Nhạc trung/a24.mp4" },
    { title: "music 25", src: "./Nhạc trung/a25.mp4" },
    { title: "music 26", src: "./Nhạc trung/a26.mp4" },
    { title: "music 27", src: "./Nhạc trung/a27.mp4" },
    { title: "music 28", src: "./Nhạc trung/a28.mp4" },
    { title: "music 29", src: "./Nhạc trung/a29.mp4" },

    { title: "music 31", src: "./Nhạc trung/a31.mp4" },
    { title: "music 32", src: "./Nhạc trung/a32.mp4" },
    { title: "music 33", src: "./Nhạc trung/a33.mp4" },
    { title: "music 34", src: "./Nhạc trung/a34.mp4" },
    { title: "music 35", src: "./Nhạc trung/a35.mp4" },
    { title: "music 36", src: "./Nhạc trung/a36.mp4" },
];

// DOM Elements
const videoPlayer = document.getElementById('videoPlayer');
const videoSource = document.getElementById('videoSource');
const playlistElement = document.getElementById('playlist');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const searchInput = document.getElementById('searchInput');

let currentVideoIndex = 0;
let isPipEnabled = false;

// Khởi tạo trình phát
function initPlayer() {
    // Tạo playlist
    videos.forEach((video, index) => {
        const div = document.createElement('div');
        div.className = 'playlist-item';
        div.textContent = video.title;
        div.addEventListener('click', () => loadVideo(index, true));
        playlistElement.appendChild(div);
    });

    loadVideo(0, false);
}

// Tải video
function loadVideo(index, autoplay = false) {
    currentVideoIndex = index;
    const video = videos[index];

    videoSource.src = video.src;
    videoPlayer.load();
    
    if (autoplay) {
        videoPlayer.play().catch(error => {
            console.log('Lỗi autoplay:', error);
        });
    }

    updatePlaylistHighlight(index);
}

// Cập nhật highlight playlist
function updatePlaylistHighlight(index) {
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Sự kiện tìm kiếm
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        const videoTitle = videos[index].title.toLowerCase();
        item.style.display = videoTitle.includes(keyword) ? 'block' : 'none';
    });
});

// Điều khiển phát/dừng
playPauseBtn.addEventListener('click', () => {
    videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
});

// Cập nhật trạng thái nút
videoPlayer.addEventListener('play', () => {
    playPauseBtn.textContent = '⏸';
});

videoPlayer.addEventListener('pause', () => {
    playPauseBtn.textContent = '▶';
});

// Xử lý thanh tiến trình
videoPlayer.addEventListener('timeupdate', () => {
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.value = progress || 0;
});

progressBar.addEventListener('input', (e) => {
    const seekTime = (e.target.value / 100) * videoPlayer.duration;
    videoPlayer.currentTime = seekTime;
});

// Tự động chuyển video tiếp theo
videoPlayer.addEventListener('ended', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    loadVideo(currentVideoIndex, true);
});

// Xử lý Picture-in-Picture
document.addEventListener('visibilitychange', async () => {
    if (document.hidden && !videoPlayer.paused) {
        try {
            await videoPlayer.requestPictureInPicture();
            isPipEnabled = true;
        } catch (error) {
            console.log('Lỗi PiP:', error);
        }
    }
});

// Xử lý lỗi
videoPlayer.addEventListener('error', () => {
    console.error('Lỗi video:', videoPlayer.error);
    alert(`Không thể phát video: ${videos[currentVideoIndex].title}`);
});

// Khởi động trình phát
initPlayer();

// Kích hoạt phát bằng click chuột
document.addEventListener('click', () => {
    if (videoPlayer.paused) {
        videoPlayer.play().catch(() => {});
    }
}, { once: true });