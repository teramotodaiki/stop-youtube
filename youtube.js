const notice = start =>
  `【制限中】${start}時を過ぎたら、見ることが出来るようになります`;

const config = configClosure();

async function stopWatching() {
  const hours = new Date().getHours();
  const { avail_start_hours, avail_end_hours } = config;

  if (avail_start_hours <= hours && hours < avail_end_hours);
  else {
    const video = document.querySelector("video");
    if (video) {
      video.style.display = "none";
      video.muted = true;
    }
    const title = document.querySelector(".title");
    if (title) {
      title.textContent = notice(avail_start_hours);
    }
  }

  requestIdleCallback(stopWatching);
}

requestIdleCallback(stopWatching);

// ---- config ----

function configClosure() {
  const defaultConfig = {
    avail_start_hours: 0,
    avail_end_hours: 24
  };

  const config = { ...defaultConfig };
  const configKeys = Object.keys(defaultConfig);

  chrome.storage.sync.get(configKeys, storage => {
    console.info("config fetched", storage);
    for (const key of Object.keys(storage)) {
      if (key in defaultConfig) {
        config[key] = opt(storage[key], defaultConfig[key]);
      }
    }
  });

  chrome.storage.onChanged.addListener(changes => {
    console.info("config updated", changes);
    for (const key of Object.keys(changes)) {
      if (key in defaultConfig) {
        config[key] = opt(changes[key].newValue, defaultConfig[key]);
      }
    }
  });

  function opt(value, alt) {
    return value === undefined
      ? alt
      : typeof alt === "number"
      ? parseInt(value)
      : value + "";
  }

  return config;
}
