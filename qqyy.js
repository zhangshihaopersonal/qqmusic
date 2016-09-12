$(function(){
   /*建立一个新数组 存储歌词*/
   var musics=[
     {src:'1.mp3',name:'好久不见',zuoze:'陈奕迅',shichang:'04:10'},
     {src:'2.mp3',name:'东风破',zuoze:'周杰伦',shichang:'05:15'},
     {src:'3.mp3',name:'伶仃谣',zuoze:'河图',shichang:'04:15'},
     {src:'4.mp3',name:'三寸天堂',zuoze:'严艺丹',shichang:'04:48'},
     {src:'5.mp3',name:'何以爱情',zuoze:'钟汉良',shichang:'04:51'},
     {src:'6.mp3',name:'小芳',zuoze:'李荣浩',shichang:'04:10'},
     {src:'7.mp3',name:'到不了',zuoze:'陈翔',shichang:'03:49'},
     {src:'8.mp3',name:'塘桥夜话',zuoze:'不才',shichang:'04:11'},
     {src:'9.mp3',name:'醉城伤',zuoze:'严艺丹',shichang:'04:04'},
     {src:'10.mp3',name:'寒衣调',zuoze:'神无月',shichang:'04:40'},
   ]
   /*遍历数组 创建一个ul插入页面*/
   $(musics).each(function(i,v){
      $('<ul class="sk-le" data-id='+i+'><li class="gqm">'+v.name+'</li><li class="zz">'+v.zuoze+'</li><li calss="sj">'+v.shichang+'</li><li class="qcfd"></li><div class="yc-k"><li class="dz"></li><li class="fx"></li><li class="sc"></li><li class="delete"></li></div></ul>').appendTo('.sk-lle');
   })
   /*声明一个变量存放下标*/
   var currenIndex
   /*当点击歌曲时*/
   $('.sk-le').on('click',function(){
      /*点击那个就把那个的下标传给新的变量*/
      currenIndex=parseInt($(this).attr('data-id'));
      /*把src换成新的变量下标的src*/
      audio.src=musics[currenIndex].src;
      /*开始播放歌曲*/
      audio.play();
   })

/*获取dom对象的audio*/
	var audio=$('#audio').get(0);
   /*获取jQurey对象*/
	var $audio=$('audio');
   /*点击上一首时*/
   $('.xk-sys').on('click',function(){
      /*当前的下标-1*/
      currenIndex-=1;
      /*如果下标小于0时*/
     if(currenIndex<0){
      /*就把下标等于数组最后一个*/
      currenIndex=musics.length-1;
     }
     /*改变src*/
     audio.src=musics[currenIndex].src;
     audio.play();
   })
   /*点击下一首时触发事件*/
   $('.xk-xys').on('click',function(){
      /*下标+1*/
     currenIndex+=1;
     if(currenIndex>musics.length){
      currenIndex=0
     }
     audio.src=musics[currenIndex].src;
     audio.play();
   })
   /*点击清空时*/
   $('.sk-qk').on('click',function(){
      /*把整个数组移除*/
      $('.sk-le').remove();
   })
   /*当点击delete时移除当前的ul*/
   $('.delete').on('click',function(){
      $(this).closest('ul').remove();

   })

   /*点击播放/暂停键触发事件*/
	$('.xk-bf').on('click',function(){
      /*判断是否处于暂停状态 返回布尔值*/
		if(audio.paused){
         /*让歌词开始播放*/
			audio.play()
		}else{
         /*让歌曲暂停播放*/
			audio.pause()
		}
	})
   /*歌曲播放开始时给播放键添加一个类*/
	$audio.on('play',function(){
		$('.xk-bf').addClass('zt')
      /*先给ul移除所添加过的类 在选中下标为当前歌曲的添加一个类*/
      $('.sk-le').removeClass('bs').eq(currenIndex).addClass('bs');
      /*新声明一个变量存储数的下标*/
      var chege=musics[currenIndex]
      /*替换下面的歌词名 歌手 及歌曲时长*/
      $('.xx-gqm').text(chege.name);
      $('.xx-zz').text(chege.zuoze);
      $('.xx-sj').text(chege.shichang)

	})
   /*歌曲暂停时给播放键移除一个类*/
	$audio.on('pause',function(){
		$('.xk-bf').removeClass('zt')
	})

    
    /*音量*/

    /**/
   $('.xk-yltj').on('click',function(e){
      audio.volume=e.offsetX/$(this).width();
   })
    /*当音量变化时执行事件*/
   $audio.on('volumechange',function(){
      /*如果音量等于0时*/
   	if(audio.volume===0){
         /*给音量添加一个类静音键*/
   		$('.xk-jy').addClass('qxjy');

   	}else{
         /*否则给他移除-个类静音键*/
   		$('.xk-jy').removeClass('qxjy');
   	}
        /*获取位置w =当前的音量*事件源的宽度*/
   	   var w=audio.volume*$('.xk-yltj').width();
         /*把位置符给当前音量的长度*/
   	   $('.xk-ck').width(w);
         /*圆点离事件源的left-圆点的宽度的一半*/
   	   $('.xk-yd').css({left:w-3});
   })
   /*清除圆点的冒泡事件*/
   $('.xk-yd').on('click',function(e){
     	e.stopPropagation();
   })
   /*当点击音量键时*/
   $('.xk-jy').on('click',function(){
      /*如果没有静音键就添加  有则删除*/
   	   $(this).toggleClass('qxjy');
         /*如果他包含这个类时*/
   	   if($('.xk-jy').hasClass('qxjy')){
            /*记录当前音量位置*/
   	   	 $('.xk-yltj').attr('zhi',audio.volume);
             /*点击静音键的音量调为0*/
   	   	 audio.volume=0;
   	   }else{
            /*否则取消静音把保存的音量复原*/
   	   	audio.volume=$('.xk-yltj').attr('zhi');
            /*然后移除保存的音量*/
            $('.xk-yltj').removeAttr('zhi');

   	   }
       
   })
   /*当鼠标在圆点上按下时*/
   $('.xk-yd').on('mousedown',function(e){
      /*阻止冒泡事件*/
      e.stopPropagation();
      /*当在浏览器上拖动时*/
      $(document).on('mousemove',function(e){
         /*给圆点和线条添加一个类*/
         $('.xk-yd').addClass('ydl');
         $('.xk-ck').addClass('ck');
         /*获取当前音量位置l=圆点到当前可视窗口的位置-音量线条到可视窗口的位置*/
         var l=e.pageX-$('.xk-yltj').offset().left;
         /*v=当前音量的位置*音量线条的宽度*/
         var v=l/$('.xk-yltj').width();
         /*三元表达式 当v>1时 为1
            当v<0时 为0*/
         v=(v>1)?1:v;
         v=(v<0)?0:v;
         /*把获取的v付给音量*/
         audio.volume=v;
      })
   })
   /*当鼠标抬起时*/
  $(document).on('mouseup',function(){
   /*清除所有的mouse事件*/
    $(this).off('mousemove');
    /*清除添加的类*/
    $('.xk-yd').removeClass('ydl');
    $('.xk-ck').removeClass('ck');
  })


   /*歌曲播放进度*/
   /*歌曲进行中一直调用*/
   $audio.on('timeupdate',function(){
      /*v=当前歌曲播放的时长/歌曲的总长度*歌曲进度的总长度*/
      var v=(audio.currentTime/audio.duration)*$('.gqhc').width();
      /*歌曲的小圆点的left值 v-小圆点宽度的一半*/
      $('.gqhc-yd').css({left:v-$('.gqhc-yd').width()/2});
      /*歌曲进度的宽=v*/
      $('.gqhc-ck').width(v);

})
   /*当点击歌曲进度条时*/
   $('.gqhc').on('click',function(e){
      /*歌曲当前的播放时长=点击到事件源的left/总长度的宽*歌曲的总长度*/
      audio.currentTime=e.offsetX/$('.gqhc').width()*audio.duration;
   })
   /*当点击小圆点时阻止冒泡事件*/
   $('.gqhc-yd').on('click',function(e){
       e.stopPropagation();
   })
   /*当鼠标在小圆点上按下时*/
   $('.gqhc-yd').on('mousedown',function(e){
      /*歌曲进度条到可视窗口的位置*/
      var left=$('.gqhc').offset().left;
      /*歌曲进度条的宽度*/
      var width=$('.gqhc').width();
      /*当在document时拖动时*/
      $(document).on('mousemove',function(e){
         /*获取当前的播放时长v=拖动后的位置-歌曲进度条到可视窗口的位置/歌曲进度条的宽度*歌曲的总长度*/
        var v=(e.pageX-left)/width*audio.duration;
        audio.currentTime=v;
      })
   })
   /*当鼠标抬起时移除拖动的效果*/
   $(document).on('mouseup',function(){
      $(document).off('mousemove');
   })

    /*当在歌曲进度条上mousemove时*/
   $('.gqhc').on('mousemove',function(e){
/*显示时间提示 他的位置跟着鼠标的位置移动  left=鼠标到事件源的位置-自己宽度得到一半*/
      $('.gqhc-ts').css({display:'block',left:e.offsetX-$('.gqhc-ts').width()/2});
      /*获取播放当前的时长*/
      var w=e.offsetX/$('.gqhc').width()*audio.duration;
      /*转化为整数*/
       var s=parseInt(w);
      var min=parseInt(s%60);
      var fen=parseInt(s/60);
       fen=fen<10?'0'+fen:fen;
       min=min<10?'0'+min:min;
       /*把最后的值传给提示框的里的值*/
      $('.gqhc').find('span').html(fen+':'+min);

      

   })
   /*鼠标离开时提示框隐藏*/
    $('.gqhc').on('mouseout',function(){
      $('.gqhc-ts').css({display:'none'});
   })
    /*阻止冒泡事件*/
    $('.gqhc-yd').on('mousemove',function(e){
       e.stopPropagation();
    })





})
