const openGuideBook = function(document) {
  document.getElementById('guideBook').className = 'overlay visible';
  document.body.onkeydown = closeGuideBook.bind(null);
};

const closeGuideBook = function() {
  document.getElementById('guideBook').className = 'overlay hidden';
  document.body.onkeydown = null;
};

window.onload = () => {
  document.getElementById('openGuide').onclick = openGuideBook.bind(
    null,
    document
  );
};
