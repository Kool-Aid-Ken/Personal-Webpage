var DATA = [{
    "name": "Candidate species",
    "description": "A plant or animal considered for possible addition to the List of Endangered and Threatened Species. These are taxa for which the Fish and Wildlife Service has on file sufficient information on biological vulnerability and threat(s) to support issuance of a proposal to list, but issuance of a proposed rule is currently precluded by higher priority listing actions.",
    "related": ["CCA", "CCAA", "Endangered Species Act"],
    "synonyms": []
  },
  {
    "acronym": "CCAA",
    "name": "Candidate conservation agreement with assurances",
    "description": "Voluntary agreements between the U.S. Fish and Wildlife Service and non-Federal property owners. The property owner agrees to manage their lands or waters in ways that remove threats to candidate or proposed species assurances that their conservation efforts will not result in future regulatory obligations in excess of those they agree to at the time they enter into the agreement.",
    "related": ["CCA"],
    "synonyms": []
  },
  {
    "name": Terms "description":
    Git - Git is a distributed version-control system for tracking changes in source code during software development.
    Version Control - The management of changes to documents, computer programs, large web sites, and other collections of information.
    Centralized Model - A Centralized Training Organization is one that organizes the training function into a single or central group within the enterprise.
    Distributed Model - Defines a way of contact in between the components of a system and it refers to how resources are spread out and works on more than one device to improve the effectiveness and performance of a task.
    Zip Files - ZIP is an archive file format that supports lossless data compression.
    Binary - relating to, composed of, or involving two things.
    Hexadecimal - Hex or base 16 or hexadecimal is a numeral system that uses 16 symbols.
    Bits - a small piece, part, or quantity of something.
    Nibble - In computing, a nibble is a four-bit aggregation, or half an octet. It is also known as half-byte or tetrade.
    Byte - The byte is a unit of digital information that most commonly consists of eight bits, representing a binary number.
    Kilo - The kilogram is the base unit of mass in the metric system, formally the International System of Units, having the unit symbol kg.
    Mega - very large; huge.
    Giga - Giga is a unit prefix in the metric system denoting a factor of a billion.
    Tera - denoting a factor of 1012.
    AND && (BASH)
    OR || (BASH)
    Function(BASH) - The command list between curly braces {} is the body of the function.
    Variable(BASH) - not consistent or having a fixed pattern; liable to change.
    String(BASH) - In computer programming, a string is traditionally a sequence of characters, either as a literal constant or as some kind of variable. 
    Desktop
    Menu Bar
    Dock
    Launchpad
    Window
    Applications
    Web Browser
    Terminal
    Bash
    Finder[Finding / Organizing]
    Files
    Folders
    File System / File Hierarchy
    Compressed Files[Zips]
    Bytes
    Relative Paths
    Absolute Paths
    Computer System
    Hardware
    Software
    Peripheral(Internal & External) Hardware
    Process Cycle
    Input & Output(I / O)
    Case
    Motherboard & The Bus
    Ports
    Processor(CPU)
    Main Memory(RAM)
    Secondary Memory(Hard Drive)
    BIOS(ROM)
    System Software
    Operating System
    Application Software
    Programs
    Computational Thinking
    Programming
    Decomposition
    Pattern Recognition
    Abstraction
    Algorithm
    PseudoCode
    Flow Charts
    Sequence,
    Selection & Repetition
    Evaluation
    Debugging
    Computer Scientist
    Freelance
    IT
    Data Analyst
    Computer Network Architect
    Computer Support Specialist
    Computer System Analyst
    Computer System Administrator
    Computer Science
    Technology
    Computers
    Digital Divide
    Problem Solving
    Logical Thinking
    Creative Thinking
    Critical Thinking



    "
    "synonyms": []
  }
];

$(function() {
  var loadedData = false,
    $goGlossary = $('.go-glossary'),
    $wrapper = $('.wrapper'),
    source = $('#glossary-template').html(),
    template = Handlebars.compile(source),
    $termsList = $('.glossary-terms'),
    $search = $('input[type=search]'),
    terms;

  // After each key stroke compare the search box query against the name and description of each term
  $search.on('keyup input propertychange paste', function() {
    var filtered = filterTerms(terms);
    // Recompile the template with the filtered,alphebetized terms list
    compileTemplate(filtered);
  });

  function loadData(filter) {
    $termsList.empty().append('<li>Loading terms...</li>');
    // jQuery.getJSON('js/data.js', function(data) {
    terms = DATA;
    if (filter) DATA = filterTerms(terms);
    compileTemplate(DATA);
    loadedData = true;
    // });
  }

  function filterTerms(data) {
    var query = $search.val().toLowerCase();
    return $.grep(data, function(obj) {
      return (obj.name.toLowerCase().indexOf(query) >= 0 || obj.related.toString().toLowerCase().indexOf(query) >= 0 || obj.description.toLowerCase().indexOf(query) >= 0);
    });
  }

  function compileTemplate(data) {
    data.sort(compare);
    $termsList.empty().append(template({
      'terms': data
    }));
    registerTagHandler();
  }

  // change search term when user clicks a tag
  function registerTagHandler() {
    var $tag = $('.tag');
    $tag.on('click', function() {
      $search.val($(this).text());

      var filtered = filterTerms(terms);
      compileTemplate(filtered);
    });
  }

  //filter function for ordering glossary terms
  function compare(a, b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  $(document).ready(function() {
    if (!loadedData) loadData();
    $wrapper.addClass('show-glossary');
  });

  // $('.toggle-glossary').click(function() {
  //   if (!loadedData) loadData();
  //   $wrapper.addClass('show-glossary');
  // });
  // $('.toggle-home').click(function() {
  //   $('.wrapper').removeClass('show-glossary');
  // });

  $goGlossary.on('click', function() {
    $search.val($(this).text());
    if (!loadedData) {
      loadData($(this).text());
    } else {
      var filtered = filterTerms(terms);
      compileTemplate(filtered);
    }
    $wrapper.toggleClass('show-glossary');
  });

  // Shake the button to grab attention for the demo
  setTimeout(function() {
    var $glossary = $('.toggle-glossary');

    $glossary.addClass('shake');
    $glossary.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
      $glossary.removeClass('shake');
    });
  }, 3000);
});
