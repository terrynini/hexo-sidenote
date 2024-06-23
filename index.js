hexo.extend.injector.register('head_end', `<style type="text/css">

.sidenote-mark { 
    border-style: hidden hidden dashed;
    background-color: transparent;
    border-color: #f75357;
}

.sidenote-mark:hover,
.sidenote-mark.hover {
    color: #eee;
    background-color: rgba(247, 83, 87,0.5);
}

/*p:has(.sidenote-mark:hover) ~ aside {
    border-bottom: 2px solid #f75357;
}*/

@media (min-width: 1400px) {
    .article-entry .side aside {
        display: block;
        position: relative;
        text-align: left;
        font-size: 80%;
        & pre {
        font-size: 80%;
        }
        & div *:only-child{
          text-align: center;
        }
    }
    .article-entry .side{
        display: block;
        background: transparent;
        padding: 1px;
        float: left;
        position: relative;
        width: 19vw;
        margin-left: -21vw;
        transform: translateY(-50%); 
        overflow: hidden;
    }

}

.side{
    -webkit-tap-highlight-color: transparent;
    transition: 1s;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

aside {
    border: 1px solid #f75357;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: 1s;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 0;
    padding: 8px;
    display: flex;
    background: #181818;
    font-size: 80%;
    p{
        word-break: break-all;
    }
}

aside::before, aside::after {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background: #181818;
  z-index: -1;
  transition: 1s;
  display: block;
  text-align: center; 
  content: '';
}

.noselect {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}

aside::before {
  height: 200%;
  width: 90%;
}

aside::after {
  width: 200%;
  height: 75%;
}

aside:hover,
aside.hover {
  background: #222222;
}

.side:hover > .aside,
.side.hover > .aside {
  background: #222222;
}

aside:hover::before,
aside.hover::before {
  width: 0px;
  background: #222222;
}

aside:hover::after,
aside.hover::after{
  height: 0px;
  background: #222222;
}

</style>
<script>
document.addEventListener("DOMContentLoaded", function(){

  var selection = document.querySelectorAll('.sidenote-mark');
  selection.forEach( ele => ele.addEventListener('mouseover', function(event) {
      id = event.target.id.match(/\\d+/)[0];
      const target = document.querySelector(\`#note-\${id}\`);
      target.classList.add('hover');
  }));

  selection.forEach( ele => ele.addEventListener('mouseout', function(event) {
      id = event.target.id.match(/\\d+/)[0];
      const target = document.querySelector(\`#note-\${id}\`);
      target.classList.remove('hover');
  }));

  selection = document.querySelectorAll('aside');
  selection.forEach( ele => ele.addEventListener('mouseover', function(event) {
    id = event.target.closest('aside').id.match(/\\d+/)[0];
    const target = document.querySelector(\`#mark-\${id}\`);
    target.classList.add('hover');
  }));

  selection.forEach( ele => ele.addEventListener('mouseout', function(event) {
      id = event.target.closest('aside').id.match(/\\d+/)[0];
      const target = document.querySelector(\`#mark-\${id}\`);
      target.classList.remove('hover');
  }));

});
</script>`, 'post')
    
    hexo.extend.tag.register('sideNote', function(args, content){
        return hexo.render.render({text: content, engine: 'markdown'}).then(function(result){
            return `<div class="side"><aside id="note-${args[0]}"><div>${result}</div></aside></div>`;
        });
    }, {ends: true, async: true})
    
    hexo.extend.tag.register('mark', function(args, content){
        var result = `<span class="sidenote-mark" id="mark-${args[0]}">${content}</span>`;
        return result;
    }, {ends: true})
