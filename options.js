const keys = ["avail_start_hours", "avail_end_hours"];

const updateBtn = document.getElementById("update");
if (!updateBtn) {
  throw new Error("update button not found");
}
updateBtn.addEventListener(
  "click",
  function syncUpdate() {
    this.setAttribute("disabled", true);

    const items = {};
    for (const key of keys) {
      const el = document.getElementById(key);
      if (el) {
        items[key] = el.value;
      }
    }

    console.info("config", items);
    chrome.storage.sync.set(items, () => {
      alert("更新しました");
      this.removeAttribute("disabled");
    });
  },
  { passive: true }
);

chrome.storage.sync.get(keys, storage => {
  for (const key of Object.keys(storage)) {
    const el = document.getElementById(key);
    if (el) {
      el.value = storage[key];
    }
  }
});

chrome.storage.onChanged.addListener(changes => {
  for (const key of Object.keys(changes)) {
    const el = document.getElementById(key);
    if (el) {
      el.value = changes[key].newValue;
    }
  }
});
