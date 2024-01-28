document.addEventListener('DOMContentLoaded', function () {
  const textarea = document.getElementById('notebook');
  const listContainer = document.createElement('ul');
  let popupInterval;

  // Load previously saved entries
  chrome.storage.sync.get(['noteEntries'], function (result) {
    if (result.noteEntries) {
      result.noteEntries.forEach(entry => {
        addEntryToList(entry);
      });
    }
  });

  // Save entry on Enter key press
  textarea.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const entryText = textarea.value.trim();
      if (entryText !== '') {
        addEntryToList(entryText);
        saveEntries();
        textarea.value = '';
      }
    }
  });

  function addEntryToList(entryText) {
    const listItem = document.createElement('li');
    listItem.textContent = entryText;
    listContainer.appendChild(listItem);
  }

  function saveEntries() {
    const entries = Array.from(listContainer.children).map(item => item.textContent);
    chrome.storage.sync.set({ 'noteEntries': entries });
  }

  function showAlert() {
    const entries = Array.from(listContainer.children).map(item => item.textContent);
    if (entries.length > 0) {
      alert('To-Do List:\n' + entries.join('\n'));
    }
  }

  function setPopupTiming() {
    const timingInput = document.getElementById('timingInput').value;
    clearInterval(popupInterval);
    popupInterval = setInterval(showAlert, timingInput * 60 * 60 * 1000); // Convert hours to milliseconds
  }

  document.body.appendChild(listContainer);
});


