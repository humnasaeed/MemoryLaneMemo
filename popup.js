document.addEventListener('DOMContentLoaded', function () {
  const textarea = document.getElementById('notebook');
  const listContainer = document.createElement('ul');
  const dancingCharacter = document.getElementById('dancing-character');

  const totalImages = 7;

  function changeDancingCharacter() {
    const randomIndex = Math.floor(Math.random() * totalImages) + 1;
    dancingCharacter.src = `image${randomIndex}.gif`;
  }

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

  // Set up recurring alert every 20 seconds
  setInterval(showAlert, 20 * 1000);

  // Initial setup - change dancing character image on extension load
  changeDancingCharacter();

  document.body.appendChild(listContainer);
});


