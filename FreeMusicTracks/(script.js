document.querySelectorAll('.track').forEach((track, index) => {
  const audio = track.querySelector('audio');
  const seekSlider = track.querySelector('.seek-slider');
  const currentTimeEl = track.querySelector(`#current-time${index + 1}`);
  const totalDurationEl = track.querySelector(`#total-duration${index + 1}`);

  // Update seek slider and time display
  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    // Update slider value
    seekSlider.value = (currentTime / duration) * 100;

    // Format and display time
    currentTimeEl.textContent = formatTime(currentTime);
    totalDurationEl.textContent = formatTime(duration);
  });

  // Seek functionality
  seekSlider.addEventListener('input', () => {
    const seekTime = (seekSlider.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });
});

// Format time in MM:SS
function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}
