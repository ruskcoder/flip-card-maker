// Coloris initialization
Coloris({
  el: '.coloris',
});

Coloris.setInstance('.coloris', {
  theme: 'polaroid',
  themeMode: 'light',
  alpha: false,
  margin: 15,
  swatches: ['#067bc2',
    '#84bcda',
    '#80e377',
    '#ecc30b',
    '#f37748',
    '#d56062',
  ],
  formatToggle: true,
});

$(document).ready(function () {
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      gen();
      return false;
    }
  });
});

function copied() {
  width = $('.prev').width() * 0.87 + 'px';
  height = $('.prev').height() * 0.87 + 'px';
  gen();
  var copyText = document.getElementById("prev").innerHTML;
  script = `<style>body{display: flex; align-items: center; justify-content: center;} .flip-card{margin: auto}</style><script>document.addEventListener('DOMContentLoaded', function () {var resizer = document.querySelector(".resizer"); var flipCard = document.querySelector(".flip-card"); var flipCardInner = document.querySelector(".flip-card-inner"); var flipCardFront = document.querySelector(".flip-card-front"); var flipCardBack = document.querySelector(".flip-card-back"); ${$('#click').is(':checked') ? ` flipCardFront.addEventListener("click", function() { flipCardInner.style.transform = "rotateY(180deg)"; }); flipCardBack.addEventListener("click", function() { flipCardInner.style.transform = "rotateY(0deg)"; });` : ''} function resizeFlipCard() { var flipCard = document.querySelector(".flip-card"); flipCard.style.overflow = "hidden"; flipCard.style.resize = "both"; } function unSize() { var flipCard = document.querySelector(".flip-card"); flipCard.style.overflow = "visible"; flipCard.style.resize = "none"; }})<\/script>`;
  copyText = script + copyText;
  iframe = `<iframe style="width: ${$('.prev').width() * 1.00 + 'px'}; height: ${($('.prev').height() + 20) + 'px'}; border: none; overflow: visible;"  src="data:text/html;base64,${btoa(copyText)}"></iframe>`;
  navigator.clipboard.writeText(iframe);

  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

var va = 'right';
var al = 'center';
var width = '87%';
var height = '87%';
document.addEventListener('DOMContentLoaded', function () {
  function resize() {
    width = '87%';
    height = '87%';
    gen();
  }
  resize()
  new ResizeObserver(resize).observe(document.querySelector('.prev'))
  gen();
  $('form').change(function () {
    gen();
  });
  $('.align button').click(function (e) {
    e.preventDefault();
    $('.align button').removeClass('selected');
    $(this).addClass('selected');
    al = $(this).attr('id');
    gen();
  })
  $('.vertical-align button').click(function (e) {
    e.preventDefault();
    $('.vertical-align button').removeClass('selected');
    $(this).addClass('selected');
    va = $(this).attr('id');
    gen();
  })
  $('#img-front').click(function (e) {
    e.preventDefault();
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        var dataUrl = e.target.result;
        $('#fronttext').val(`<img src="${dataUrl}" style="width: 90%">`);
        gen();
      }
      reader.readAsDataURL(file);
    }
    input.click();
    gen();
  });
  $('#img-back').click(function (e) {
    e.preventDefault();
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        var dataUrl = e.target.result;
        $('#backtext').val(`<img src="${dataUrl}" style="width: 90%">`);
        gen();
      }
      reader.readAsDataURL(file);
    }
    input.click();
    gen();
  });

});

function gen() {
  $('#prev').html(`
  <style>
.flip-card {
  max-height: 400px;
  background-color: transparent;
  width: ${width};
  height: ${height};
  perspective: 1000px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}
.flip-card h1, .flip-card p{
  margin: 0;
  padding: 0;
}

.flip-card-inner {
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  text-align: ${al};
  transition: transform ${$('.form-range').val()}s;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  // box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.flip-card:active .flip-card-inner {
  ${$('#hold').is(':checked') ? 'transform: rotateY(180deg);' : 'cursor: pointer;'}
}
 .flip-card:hover .flip-card-inner {
  ${$('#hover').is(':checked') ? 'transform: rotateY(180deg);' : 'cursor: pointer;'}
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column; 
  justify-content: ${va};
}

.flip-card-front {
  background-color: ${$('.bg-front').val()};
  color: ${$('.bg-front-text').val()};
}
.flip-card-back {
  background-color: ${$('.bg-back').val()};
  color: ${$('.bg-back-text').val()};
  transform: rotateY(180deg);
}

.flip-card-front h1{
  font-size: ${$('.ftitlefs').val()}px;
}
.flip-card-front p{
  font-size: ${$('.ftextfs').val()}px;
}
.flip-card-back h1{
  font-size: ${$('.btitlefs').val()}px;
}
.flip-card-back p{
  font-size: ${$('.btextfs').val()}px;
}

</style>
<script>
    var resizer = document.querySelector(".resizer");
    var flipCard = document.querySelector(".flip-card");
    var flipCardInner = document.querySelector(".flip-card-inner");
    var flipCardFront = document.querySelector(".flip-card-front");
    var flipCardBack = document.querySelector(".flip-card-back");
    ${$('#click').is(':checked') ? `
    flipCardFront.addEventListener("click", function() {
      flipCardInner.style.transform = "rotateY(180deg)";
    });
    flipCardBack.addEventListener("click", function() {
      flipCardInner.style.transform = "rotateY(0deg)";
    });`: ''}
    function resizeFlipCard() {
    var flipCard = document.querySelector(".flip-card");
    flipCard.style.overflow = "hidden";
    flipCard.style.resize = "both";
    }
    function unSize() {
    var flipCard = document.querySelector(".flip-card");
    flipCard.style.overflow = "visible";
    flipCard.style.resize = "none";
    }

  <\/script>

<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <h1>${$('#fronttitle').val()}</h1>
      <p>${$('#fronttext').val()}</p>
      </div>
    <div class="flip-card-back">
      <h1>${$('#backtitle').val()}</h1>
      <p>${$('#backtext').val()}</p>
    </div>
  </div>
</div>
      `)
}



