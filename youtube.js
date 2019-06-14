const notice = "【制限中】６時を過ぎたら、見ることが出来るようになります";

function stopWatching() {
  const hours = new Date().getHours();
  if (18 <= hours && hours < 24) return; // ok

  const video = document.querySelector("video");
  video.style.display = "none";
  video.muted = true;
  const title = document.querySelector(".title");
  title.textContent = notice;

  requestIdleCallback(stopWatching);
}

requestIdleCallback(stopWatching);
