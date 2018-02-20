$(document).ready(function() {
    
    var audio;
        var flag=true;
    
    var bar = (document).getElementById('player');
    
    ////////////////initialization///////////////
    initAudio($('#table tbody tr:nth-child(1)'));
    
        function initAudio(element){
            
            console.log("cdcds");
            var song = element.attr('song');
            $('#table tbody tr:nth-child(1)').addClass('active');
            
            audio = new Audio(song);
          /*   audio.play(); 
            showDuration();
            $('#play').removeClass('ion-ios-play');
            $('#play').addClass('ion-ios-pause'); 
            flag=false;*/
        }

        /////////////////play button /////////////////
    
    
    
        $('#play').click(function(){
            
            console.log("cdcds");
            if(flag == true){
            $('#play').removeClass('ion-ios-play');
            $('#play').addClass('ion-ios-pause');
            audio.play(); 
            flag=false;
            }else if(flag == false){
                console.log("cdcds2");
                audio.pause();
                $('#play').addClass('ion-ios-play');
                $('#play').removeClass('ion-ios-pause');
                showDuration();
                flag=true;    
                
            }
            showDuration();
            
            
        });
        
        
        //song selection///////////////////////////////
    
        $('#table tbody tr').click(function(){

                        audio.pause();

                        initAudio($(this));

                        $('#table tr').removeClass('active');
                         $(this).addClass('active');

                        audio.play();
                        $('#play').addClass('ion-ios-pause');
                        $('#play').removeClass('ion-ios-play');
                        showDuration();

                    });

    
    
///////////////////////seek bar /////////////////////
 
    var isDragging = false;

   
    $('.seekbar').on('mousedown touchstart',function(){
        
        console.log("down");
                       
    }).bind('mouseup',function(e) {
        
                    var cal = e.clientX - bar.offsetLeft ;
        
                        console.log(cal + " " +(document).body.clientWidth + " " + bar.clientRight + " " +  e.clientX);
        
        
                        var x = (e.clientX - bar.offsetLeft);
                        console.log((Math.floor((x - 180))));
                        if ((document).body.clientWidth >= 1000){
                
                        $('.inner-seek').css('width', (e.clientX - 140 ) +'px');
                            
                            var newTime = (((e.clientX - 140) * audio.duration)/380);
                            audio.currentTime = newTime;
                            
                        }else if((document).body.clientWidth < 1000 ){
                            
                            $('.inner-seek').css('width', (e.clientX - 10) +'px');  
                            
                            var newTime = (((e.clientX - 10) * audio.duration)/380);
                            audio.currentTime = newTime;
                        }
                        console.log(x);
                        });    
    
    
    //////////// loop button ///////////////////
    
    $('#loop').on('click', function(){
        
        
        $(this).toggleClass('active');
        
    });  
    
    
    //Volume control////////////////////////////////
    
                function getCurrentRotation() {
                              var el = document.getElementById('volume');
                              var st = window.getComputedStyle(el);
                              var tr = st.getPropertyValue("-webkit-transform") ||
                                   st.getPropertyValue("-moz-transform") ||
                                   st.getPropertyValue("-ms-transform") ||
                                   st.getPropertyValue("-o-transform") ||
                                   st.getPropertyValue("transform") ||
                                   "fail...";

                              if( tr !== "none") {
                                console.log('Matrix: ' + tr);

                                var values = tr.split('(')[1];
                                  values = values.split(')')[0];
                                  values = values.split(',');
                                var a = values[0];
                                var b = values[1];
                                var c = values[2];
                                var d = values[3];

                                var scale = Math.sqrt(a*a + b*b);

                                // arc sin, convert from radians to degrees, round
                                /** /
                                var sin = b/scale;
                                var angle = Math.round(Math.asin(sin) * (180/Math.PI));
                                /*/
                                var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
                                /**/

                              } else {
                                var angle = 0;
                              }
                    return angle;

    
                }
    
    
    
    
                var hold,time ;
                var plus=2,minus=2;
                var target2 = $('.knob-inner');
    
    
                var degree = getCurrentRotation();
                    console.log(degree);
    
    
                var target = $('.minus-vol');
                target.on('mousedown touchstart',function() {
                    
                     time = setInterval(function(){
                         
                         
                         if(degree <= 330 && degree > 0){
                             degree--;   
                             plus--;
                            
                         }
                     else if(degree <= 0){   
                            degree;
                       
                    } 
                      
                      if(plus > 2){   
                            audio.volume = parseFloat( plus / 330); 
                      }
                     target2.css('-moz-transform', 'rotate(' + degree + 'deg)');
                      
                         
                   target2.css('-webkit-transform', 'rotate(' + degree + 'deg)');
                    
                   target2.css('-o-transform', 'rotate(' + degree + 'deg)');
                   
                   target2.css('-ms-transform', 'rotate(' + degree + 'deg)');
                         
                 
                     
                     
                    },10);    
                }).bind('mouseup touchend',function() {
                    clearInterval(time);
                          console.log("hello2");
                });
                

    
    
    
                var target = $('.plus-vol');
                target.on('mousedown touchstart',function() {
                    
                     time = setInterval(function(){
                     
                         if(degree >= 0 && degree < 330){
                             degree++;   
                            
                            
                         }
                     else if(degree >= 330){   
                            degree;
                       
                    }
                         if (plus < 330){
                              plus=plus+1;
                           audio.volume = parseFloat( plus / 330); 
                         }
                     target2.css('-moz-transform', 'rotate(' + degree + 'deg)');
                      
                         
                   target2.css('-webkit-transform', 'rotate(' + degree + 'deg)');
                    
                   target2.css('-o-transform', 'rotate(' + degree + 'deg)');
                   
                   target2.css('-ms-transform', 'rotate(' + degree + 'deg)');
                         
                 
                     
                     
                    },10);    
                }).bind('mouseup touchend',function() {
                    clearInterval(time);
                          console.log("hello2");
                });
    
    
    
    
    ///////////////////next and prev button //////////////////////////
    
    
    
    
    //Next button

                    $('#next').click(function(){

                    audio.pause();
                    
                    var next = $('#table tbody tr.active').next();
                      
                    console.log(next);
                        
                        
                    if(next.length == 0){

                    next = $('#table tbody tr:first-child');

                }

                    initAudio(next);
                        $('#table tr').removeClass('active');   
                    next.addClass('active');    

                    audio.play();

                    showDuration();

                });

                    

                    //Prev button

                    $('#prev').click(function(){

                    audio.pause();

                    var prev = $('#table tbody tr.active').prev();
                     
                    
                      console.log(prev);    
                    
                        
                    if(prev.length == 0){

                    prev = $('#table tbody tr:last-child');

                }

                    initAudio(prev);
                    $('#table tr').removeClass('active');   
                    prev.addClass('active');    
                        
                    audio.play();

                    showDuration();

                });

                
                        
////////////////////////////////shuffle/////////////                       
    
    
    $('#shuffle').on('click', function(){
        
        
        
        
        
        var list = $('#table tbody tr').length;
        //console.log(list);
            
        audio.pause();
        
        var rand = Math.floor((Math.random() * list))+1;
        
        console.log(rand);
        
        
         initAudio($('#table tbody tr:nth-child('+ rand +')'));
                 $('#table tr').removeClass('active');
                  
                $('#table tbody tr:nth-child('+ rand +')').addClass('active');

                        audio.play();
                        $('#play').addClass('ion-ios-pause');
                        $('#play').removeClass('ion-ios-play');
                        showDuration();
        
        
        
    });
    
    
                    
                
                
    
    
    

    ///////////////////////show duration ///////////////////////////    
    function showDuration(){

  $(audio).bind('timeupdate',function(){

    //Get hours and minutes

    var s = parseInt(audio.currentTime % 60);

    var m = parseInt(audio.currentTime / 60) % 60;

    if(s < 10){
      s = '0'+s;
    }

   $('#duration').html(m + ':'+ s);
    var value = 0;
    if(audio.currentTime > 0){
      value = Math.floor((95 / audio.duration) * audio.currentTime);
    }
    $('.inner-seek').css('width',value+'%');
     $('.inner-knob').css('left',value+'%');
      
      
      if(audio.ended)
          {
              
              if($('#loop').hasClass('active')){
                  
                  audio.currentTime = 0;
                  audio.play();
                  
              }else{
                  
                  audio.currentTime = 0;
                  audio.pause();
                  $('#play').addClass('ion-ios-play');
                $('#play').removeClass('ion-ios-pause');
                  
              }
              
          }
      
      
 });

}
  
    
});