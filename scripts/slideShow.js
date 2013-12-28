

$(document).ready(function () {
    var sites = [
        "http://qadashboard/Radiator/",
        "http://www.artzstudio.com/2009/04/jquery-performance-rules/",
        "http://www.example.com"
    ];
    var frames = [];
    var currentFrame = 0;

    chrome.storage.sync.get(null,function(settings){

        for(var i = 0; i < settings.urls.length; i++){
            var iframe = $('<iframe />');
            iframe.attr('src', settings.urls[i].href);
            iframe.attr('style','opacity:0');
            iframe.appendTo('body');
            iframe.css('left', window.innerWidth * 0 * (i + 1));
            frames.push(iframe);
        }
        setInterval(function() {
            var previousFrame = currentFrame;
            currentFrame = (currentFrame+1) % settings.urls.length;

            frames[currentFrame].animate({
                left: '0',
                opacity: '1'
            }, 2000);
            frames[previousFrame].animate({
                    left: 0,//-window.innerWidth,
                    opacity:'0'
                }, 2000,
                function(){
                    frames[previousFrame].css('left', 0);// window.innerWidth);
                });
        }, 7000);
    });
});


/*


function SlideShowCtrl($scope){
    function setPageMessage(message) {
        var h1 = $('<h1></h1>');
        h1.text(message);
    }

    chrome.storage.sync.get(null,function(settings){
        if(settings.urls!=undefined){
            alert(settings.urls);
            $scope.urls = settings.urls;
            $scope.$digest();
            $scope.frames = angular.element('iframe');
            alert($scope.frames.length);

            setInterval(function() {
                var previousFrame = currentFrame;
                currentFrame = (currentFrame+1) % $scope.frames.length;

                $scope.frames[currentFrame].animate({
                    left: '0',
                    opacity: '1'
                }, 2000);
                $scope.frames[previousFrame].animate({
                        left: -width,
                        opacity:'0'
                    }, 2000,
                    function(){
                        $scope.frames[previousFrame].css('left', window.innerWidth);
                    });
            }, 7000);


        } else {
            setPageMessage('No urls have been defined for the slideshow!');
            alert('no urls!')
        }

    });

}

*/
