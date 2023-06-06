document.addEventListener('DOMContentLoaded', function() {
  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
   // setTheme();
    var bookmarkTreeElement = document.getElementById('bookmarkTree');
    bookmarkTreeElement.appendChild(displayBookmarkTree(bookmarkTreeNodes[0].children[0]));
  });
});

function displayBookmarkTree(node) {
  var nodeElement = document.createElement('div');
  nodeElement.classList.add('node');

  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var childNode = node.children[i];
      var childElement;

      if (childNode.url) {
        childElement = createBookmarkElement(childNode);
      } else {
        childElement = createFolderElement(childNode);
      }

      nodeElement.appendChild(childElement);
    }
  }

  return nodeElement;
}

function createFolderElement(folderNode) {
  var folderElement = document.createElement('div');
  folderElement.classList.add('folder');
  folderElement.classList.add('collapsed');

  var folderTitle = document.createElement('p');
  folderTitle.classList.add('folder-title');
  folderTitle.textContent = folderNode.title;
  folderTitle.addEventListener('click', function() {
    var folderContent = folderElement.querySelector('.node');
    var plusMinusIcon = folderElement.querySelector('.icon');
    if (folderContent.style.display === 'block') {
      folderContent.style.display = 'none';
      plusMinusIcon.textContent = '+';
    } else {
      folderContent.style.display = 'block';
      plusMinusIcon.textContent = '-';
    }
  });

  var plusMinusIcon = document.createElement('span');
  plusMinusIcon.classList.add('icon');
  plusMinusIcon.textContent = '+';
  folderTitle.prepend(plusMinusIcon);

  folderElement.appendChild(folderTitle);

  var folderContent = displayBookmarkTree(folderNode);
  folderContent.style.display = 'none'; // Collapse the folder by default
  folderElement.appendChild(folderContent);

  return folderElement;
}

function createBookmarkElement(bookmarkNode) {
  var bookmarkElement = document.createElement('a');
  bookmarkElement.classList.add('bookmark');
  bookmarkElement.textContent = bookmarkNode.title;
  bookmarkElement.href = bookmarkNode.url;
  bookmarkElement.target = '_blank';

  return bookmarkElement;
}


function setTheme() {
  var theme = "";
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = "dark";
      document.body.style.backgroundColor = "#161c26";
      document.body.style.color = "#ffffff";
      
  } else {


      theme = "light";

  }
  return theme;
}