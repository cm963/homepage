// 交互：滚动进度、数字计数、滚动显现、终端打字、技能条填充、导航高亮
(function(){
  var prog=document.getElementById('prog');
  function onScroll(){
    var h=document.documentElement;
    var p=(h.scrollTop)/(h.scrollHeight-h.clientHeight||1);
    if(prog)prog.style.width=(p*100)+'%';
    var links=[].slice.call(document.querySelectorAll('nav a'));
    var cur=location.pathname.split('/').pop()||'index.html';
    links.forEach(function(a){
      var href=a.getAttribute('href');
      if(href===cur||(cur==='index.html'&&href==='index.html'))a.classList.add('on');
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // 数字计数
  var nums=[].slice.call(document.querySelectorAll('[data-count]'));
  function countUp(el){
    var target=parseFloat(el.getAttribute('data-count'));
    var suffix=el.getAttribute('data-suffix')||'';
    var t0=null,dur=1100;
    function step(t){
      if(!t0)t0=t;
      var p=Math.min((t-t0)/dur,1);
      var e=1-Math.pow(1-p,3);
      el.textContent=Math.round(target*e).toLocaleString()+suffix;
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){countUp(en.target);io.unobserve(en.target);}
      });
    },{threshold:.4});
    nums.forEach(function(n){io.observe(n);});
  }else{nums.forEach(countUp);}

  // 滚动显现
  var rev=[].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window){
    var io2=new IntersectionObserver(function(es){
      es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io2.unobserve(en.target);}});
    },{threshold:.08});
    rev.forEach(function(r){io2.observe(r);});
  }else{rev.forEach(function(r){r.classList.add('in');});}

  // 技能条
  var bars=[].slice.call(document.querySelectorAll('.bar .fill'));
  function fill(el){el.style.width=el.getAttribute('data-v')+'%';}
  if('IntersectionObserver' in window){
    var io3=new IntersectionObserver(function(es){
      es.forEach(function(en){if(en.isIntersecting){fill(en.target);io3.unobserve(en.target);}});
    },{threshold:.3});
    bars.forEach(function(b){io3.observe(b);});
  }else{bars.forEach(fill);}

  // 终端打字
  var lines=[].slice.call(document.querySelectorAll('[data-type]'));
  lines.forEach(function(el){
    var full=el.getAttribute('data-type');
    var i=0;
    el.textContent='';
    (function tick(){
      if(i>full.length){el.classList.add('done');return;}
      el.textContent=full.slice(0,i++);
      setTimeout(tick,18);
    })();
  });
})();

