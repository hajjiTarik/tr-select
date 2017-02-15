(function ($) {
  function CustomSelect () {
    this.__document = $(document);
  }
  CustomSelect.prototype.renderCustomSelect = function (context) {
    var $this = $(context);
    var numberOfOptions = $(context).children('option').length;
    var $that = $this;
    var selectedVal = $(this).find('option:selected').text();
    var $document = this.__document;
    var $styledSelect = $this.next('div.tr-select-styled');

    $this.addClass('tr-select-hidden');
    $this.wrap('<div class="tr-select"></div>');
    $this.after('<span class="icons-pagination-prev"></span>');
    $this.after('<div class="tr-select-styled"></div>');

    $styledSelect.text(selectedVal || $this.children('option').eq(0).text());

    var $list = $('<ul />', {
      class: 'tr-select-options'
    }).insertAfter($styledSelect);
    for (let i = 0; i < numberOfOptions; i++) {
      $('<li/>', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val(),
      }).appendTo($list);
    }
    var $listItems = $list.children('li');


    $styledSelect.on('click touch',function (e) {
      e.stopPropagation();
      $('div.select-styled.active').each(function () {
        $(this).removeClass('active').next('ul.tr-select-options').hide();
      });
      $(this).toggleClass('active').next('ul.tr-select-options').toggle();
      $(this).find('~span').toggleClass('icons-prev-active');
    });

    $listItems.on('click touch',function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $that.find('~span').removeClass('icons-prev-active');
      $this.val($(this).attr('rel'));
      $list.hide();
    });

    $document.on('click touch',function (e) {
      e.preventDefault();
      $styledSelect.removeClass('active');
      $that.find('~span').removeClass('icons-prev-active');
      $list.hide();
    });
  }
 
  function init(){
    if (typeof $ === 'undefined') throw new Error('this module require jquery');
    if ($('[data-tr-select]').length) return;

    var instance = new CustomSelect();
    $('[data-tr-select]').each(instance.renderCustomSelect(this));
  }

  // CALL INIT METHOD
  init();
})();
