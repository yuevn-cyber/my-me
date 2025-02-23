// Danh sách video
const videos = [
    { title: "Video 1", src: "../videos/podcast1.mp4" },
    { title: "Video 2", src: "../videos/podcast2.mp4" },
    { title: "Video 3", src: "../videos/podcast3.mp4" },
    { title: "Video 4", src: "../videos/podcast4.mp4" },
    { title: "Video 5", src: "../videos/podcast5.mp4" },
    { title: "Video 6", src: "../videos/podcast6.mp4" },
    { title: "Video 7", src: "../videos/podcast7.mp4" },
    { title: "Video 8", src: "../videos/podcast8.mp4" },
    { title: "Video 9", src: "../videos/podcast9.mp4" },
    { title: "Video 10", src: "../videos/podcast10.mp4" },
    { title: "Video 11", src: "../videos/podcast11.mp4" },
    { title: "Video 12", src: "../videos/podcast12.mp4" },
    { title: "Video 13", src: "../videos/podcast13.mp4" },
    { title: "Video 14", src: "../videos/podcast14.mp4" },
    { title: "Video 15", src: "../videos/podcast15.mp4" },
    { title: "Video 16", src: "../videos/podcast16.mp4" },
    { title: "Video 17", src: "../videos/podcast17.mp4" },
    { title: "Video 18", src: "../videos/podcast18.mp4" },
    { title: "Video 19", src: "../videos/podcast19.mp4" },
    { title: "Video 20", src: "../videos/podcast20.mp4" },
    { title: "Video 21", src: "../videos/podcast21.mp4" },
    { title: "Video 22", src: "../videos/podcast22.mp4" },
    { title: "Video 23", src: "../videos/podcast23.mp4" },
    { title: "Video 24", src: "../videos/podcast24.mp4" },
    { title: "Video 25", src: "../videos/podcast25.mp4" },
    { title: "Video 26", src: "../videos/podcast26.mp4" },
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