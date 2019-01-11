
var createTemplateTable = function() {

  var cols = [];
  for (var i = 0; i < 50; i += 1) {
    cols.push({
      label: 'Label#' + i + '\n#',
      dataField: 'field' + i,
      backgroundColor: '#ccccff',
      height : 30
    });
  }

  var dataTypes = [
    '',       // 0
    'string', // 1
    'number', // 2
    'number', // 3
    'boolean',
    'select-one'
    ];

  var tmpl = {
    thead : [[]],
    tbody : [[]],
  };
  cols.forEach(function(col, i) {
    var cell = { dataField : col.dataField };
    if (i < dataTypes.length) {
      cell.dataType = dataTypes[i];
    }
    tmpl.thead[0].push(col);
    tmpl.tbody[0].push(cell);
  });

  var table = comfortable.fromTemplate(tmpl);
  var rand = SpecUtil.rand();

  var items = [];
  for (var r = 0; r < 100; r += 1) {
    var record = {};
    for (var c = 0; c < tmpl.thead[0].length; c += 1) {
      var dataField = tmpl.thead[0][c].dataField;
      record[dataField] = '' + ~~(rand() * 10000);
      if (c == 3) {
        record[dataField] = +record[dataField];
      } else if (c == 4) {
        record[dataField] = r % 2 == 0;
      }
    }
    items.push(record);
  }

  $('BODY').append($(table.$el).addClass('my-table').
      css({ width : '800px', height : '600px'}) );
  table.model.items = items;
  table.invalidate();

  return table;
};

describe('template-table2', function() {

  it('sort asc, desc', function(done) {

    var table = createTemplateTable();

    // test

    expect(table.getLockLeft() ).toBe(0);
    expect(table.getLockTop() ).toBe(1);


    SpecUtil.nextTick(200, function() {

      var $flts = $('.ctj-filter-button');
      expect($flts.length).toBe(8);
      SpecUtil.triggerMouseEvent($flts[2], 'mousedown');

    })(200, function() {

      var $sortChks = $('.ctj-dialog > .ctj-clickable-op');
      expect($sortChks.length).toBe(2);

      SpecUtil.triggerMouseEvent($sortChks[1], 'click');

    })(1000, function() {
 
      var $flts = $('.ctj-filter-button'); 
      expect($flts.length).toBe(8);
      SpecUtil.triggerMouseEvent($flts[3], 'mousedown'); 

    })(200, function() {
   
      var $sortChks = $('.ctj-dialog > .ctj-clickable-op');
      expect($sortChks.length).toBe(2);

      SpecUtil.triggerMouseEvent($sortChks[0], 'click');
  
    })(1000, function() {

      $('BODY').children().remove();
      done(); 

    });

  });

  it('ctx', function(done) {

    var table = createTemplateTable();

    // test

    expect(table.getLockLeft() ).toBe(0);
    expect(table.getLockTop() ).toBe(1);

    SpecUtil.nextTick(200, function() {

      var $flts = $('.ctj-filter-button');
      expect($flts.length).toBe(8);
      SpecUtil.triggerMouseEvent($flts[2], 'mousedown');

    })(200, function() {

      var $sortChks = $('.ctj-dialog > .ctj-clickable-op');
      expect($sortChks.length).toBe(2);

      SpecUtil.triggerMouseEvent($sortChks[1], 'click');

    })(1000, function() {
 
      var $flts = $('.ctj-filter-button'); 
      expect($flts.length).toBe(8);
      SpecUtil.triggerMouseEvent($flts[3], 'mousedown'); 

    })(200, function() {
   
      var $sortChks = $('.ctj-dialog > .ctj-clickable-op');
      expect($sortChks.length).toBe(2);

      SpecUtil.triggerMouseEvent($sortChks[0], 'click');
  
    })(1000, function() {

      $('BODY').children().remove();
      done(); 

    });

  });

});
