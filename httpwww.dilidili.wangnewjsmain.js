/**
 * Created by wffw on 2017-05-12  00012.
 */


$(function() {

    var date=new Date();
    var thisWeek=0;
    0,function todayWeek()
    {
        thisWeek=date.getDay()-1;
        if(date.getDay()===0)
        {
            thisWeek=6;
        }
    }();

    //懒加载
    $('img').lazyload({
        effect: "fadeIn",
        threshold:100,
        skip_invisible:false
    })

    //最新更新换一批
    $('.update .new-request').click(function () {
        var $updateList=$('.update .dili ul');
        var $loadingImg=$('.update .dili .loading-img');
        $updateList.hide();
        $loadingImg.addClass('show-loading');
        var i=0;
        var timer=setInterval(function () {
            $loadingImg.css('backgroundPositionY','-'+180*i+'px');
            i++;
            if(i>4)i=0;
        },100);
        $updateList.append($('.update .dili ul li:lt(6)'));
        setTimeout(function () {
            $loadingImg.removeClass('show-loading');
            $updateList.show();
            clearInterval(timer);
        },1000)
    });

    //一周更新时间表
    var $weekLi= $('.update .update-weekList ul li');
    var $weekTable= $('.update .two-auto ul');
    $weekLi.eq(thisWeek).addClass('active');
    $weekTable.eq(thisWeek).show();
    $weekLi.click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $weekTable.eq($(this).index()).show().siblings().hide();
        btnShow($(this).index());
    });

    //翻页
    //var $thisPage=thisWeek;
    var $slideContainer=$('#container-left').find('.two-auto'),xh=0;
    function btnShow(a)
    {
        xh=a;
        if($slideContainer.find('ul').eq(a).height()>250)
        {
            $slideContainer.next().find('b').eq(1).show();
            if($slideContainer.find('ul').eq(a).css('marginTop')=='-250px')
            {
                $slideContainer.nextAll('.page-count').find('b').eq(1).addClass('active').siblings().removeClass('active');
            }
            else
            {
                $slideContainer.nextAll('.page-count').find('b').eq(0).addClass('active').siblings().removeClass('active');
            }
        }
        else
        {
            $slideContainer.next().find('b').eq(1).hide();
            $slideContainer.nextAll('.page-count').find('b').eq(0).addClass('active').siblings().removeClass('active');
        }
    }
    btnShow(thisWeek);

    $slideContainer.nextAll('.page-count').find('b').click(function ()
    {
            $slideContainer.find('ul').eq(xh).css('marginTop','-'+$(this).index()*250+'px');
            $(this).addClass('active').siblings().removeClass('active');
    });
    
    //推荐内容
    var $tuijian=$('.more-title');
    var $perv=$tuijian.find('.arrow i').eq(0);
    var $next=$tuijian.find('.arrow i').eq(1);
    $perv.click(function ()
    {
        var $longContainer=$tuijian.find('.long-container');
        if($longContainer.css('marginLeft')=='0px'||undefined)
        {
            $longContainer.css('marginLeft','-'+($longContainer.find('ul').length-1)*1020+'px');
        }
        else
        {
            $longContainer.css('marginLeft','0');
        }

    });
    $next.click(function ()
    {
        var $longContainer=$tuijian.find('.long-container');
        if($longContainer.css('marginLeft')=='-1020px')
        {
            $longContainer.css('marginLeft','0px');
        }
        else
        {
            $longContainer.css('marginLeft','-'+($longContainer.find('ul').length-1)*1020+'px');
        }

    });


    //新番时间表
    var $containerRight=$('#container-right');
    var $week=$containerRight.find('.week ul li');
    var $weekList=$containerRight.find('.week-list ul');
    $week.eq(thisWeek).addClass('today-week');
    $weekList.eq(thisWeek).show().siblings().hide();
    $week.click(function () {
        $(this).addClass('today-week').siblings().removeClass('today-week');
        $weekList.eq($(this).index()).show().siblings().hide();
    });

    //热门排行
    var $mouth=$containerRight.find('.number-mouth ul li');
    var $mouthList=$containerRight.find('.mouth-list ul');
    $mouthList.eq(0).show().siblings().hide();
    $mouth.click(function () {
        $(this).addClass('number-mouth-color').siblings().removeClass('number-mouth-color');
        $mouthList.eq($(this).index()).show().siblings().hide();
    });


    //eggs
    !function () {
        var clickEle=$('.section-head-i,.dilidili-girl');//触发元素
        var maxClick=10;//最大点击数
        var animationTime=5000;//动画执行时间
        var howLong=150;//出现间隔时间
        var picCount=80;//出现次数
        var picUrl='/newimages/run6.gif';
        var imgWidth=210;

        var clickCount=0;
        var thisEle;
        clickEle.bind('click',function () {
            clickFn($(this));
        });
        function clickFn(ele) {
            thisEle=ele;
            clickCount++;
            //clickCount===1?thisEle.attr("do-not-click-me---waring-"+clickCount,""):console.log('next Please!');
            thisEle.removeAttr('do-not-click-me---waring-'+parseInt(clickCount-1));
            thisEle.attr("do-not-click-me---waring-"+clickCount,"");
            clickCount===maxClick?egg(thisEle):console.log('click again Please!'+clickCount);
        }
        var timer;
        function egg(ele) {
            console.log('Congratulations!');
            clickEle.unbind('click');
            var random;
            ele.removeAttr("do-not-click-me---waring-"+clickCount);
            clickCount=0;
            var i=0;
            timer=setInterval(interval,howLong);
            function interval() {
                if(i===picCount){
                    clearInterval(timer);
                    i=0;
                    clickEle.bind('click',function () {
                        clickFn($(this));
                    });
                    /*if(confirm('try again?')){
                     egg(thisEle);
                     clickEle.unbind('click');
                     }*/
                }else{
                    random=Math.floor(Math.random()*100);
                    if(random<=80){
                        $('body').before($('<div style="' +
                            'position: fixed;' +
                            'right: 110%;' +
                            'width: 210px;' +
                            'height: '+imgWidth+'px;' +
                            'background: #000;' +
                            'z-index:132123;' +
                            'background: url('+picUrl+') no-repeat;' +
                            'top: '+random+'%;' +
                            '" class="egg'+i+'"></div>'));
                        beginAnimate(i);
                        i++;
                        //console.log(i)
                    }else{
                        interval();
                    }
                }

            }
        }
        var timeList=[1000,1500,2000,3000,3500,4000,5000,6000,7000];
        function beginAnimate(index) {
            var ele=$('.egg'+index);
            ele.animate({
                right:"-"+imgWidth+"px"
            },timeList[Math.floor(Math.random()*parseInt(timeList.length-1))],'linear');
            setTimeout(function (){ele.remove()},animationTime);
        }
    }();


    //backTop
    var $backTop=$('.back-top');
    $backTop.hide();
    $(window).scroll(function () {
        if($('body').scrollTop()>=400||$('html').scrollTop()>=400){
            $backTop.fadeIn();
        }else{
            $backTop.fadeOut();
        }
    });
    $backTop.click(function () {
        $('body,html').animate({
            scrollTop:0
        },500)
    });

    //all 'a' to _blank
    $('a').attr('target','_blank');
    
    
    //adblock-detector
    $.ajax({
        url: "http://static.jfrft.com/js/main_list.js",
        dataType: "script"
    }).done(function(){
        $.ajax({
            url: "http://static.jfrft.com/js/main_video.js",
            dataType: "script"
        }).fail(function(){
            //document.body.innerHTML='<h2 id="adb-contant">我们检测到你可能使用了广告过滤插件或软件，它的部分策略可能会影响到正常功能的使用。<br>你可以设定特殊规则或将嘀哩嘀哩加入白名单，以便更好的在二次元世界驰骋。</h2>';
        });
    }).fail(function(){
        //document.body.innerHTML='<h2 id="adb-contant">我们检测到你可能使用了广告过滤插件或软件，它的部分策略可能会影响到正常功能的使用。<br>你可以设定特殊规则或将嘀哩嘀哩加入白名单，以便更好的在二次元世界驰骋。</h2>';
    });

    //search-toggle
    searchToggle = function()
    {
        if($('.box3').parent().attr('title') == '切换至360搜索')
        {
            $('.box3').css('background','rgb(252, 171, 103) url("http://www.dilidili.wang/newimages/search_baidu.png") no-repeat scroll 50% 50% / auto padding-box border-box');
            $('.search-box').hide();
            $('#so360').show();
            $('.box3').parent().attr('title','切换至百度搜索');
        }
        else
        {
            $('.box3').css('background','rgb(252, 171, 103) url("http://www.dilidili.wang/newimages/search_360.png") no-repeat scroll 50% 50% / auto padding-box border-box');
            $('#so360').hide();
            $('.search-box').show();
            $('.box3').parent().attr('title','切换至360搜索');
        }
    }



});


