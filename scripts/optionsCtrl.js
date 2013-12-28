
function OptionsCtrl($scope){
    if($scope.urls==undefined) $scope.urls=new Array();
    chrome.storage.sync.get(null,function(settings){
        if(settings.urls != undefined){
            $scope.urls = settings.urls;
        } else {
            $scope.urls=[{href:'http://example.com'}];
        }
        $scope.$digest();

    });

    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function isImage(url) {
        if(url.href!=undefined){
            var lowerCase = url.href.toLowerCase();
            return (endsWith(lowerCase, '.jpg') || endsWith(lowerCase, '.png') || endsWith(lowerCase, '.gif'));
        }
        return false;
    }

    function handleImage(url) {
        url.isImage = true;
        url.backgroundColor = 'white';
        url.title = '';

    }

    $scope.addUrl = function(){
        if(isImage($scope.newUrl)){
            handleImage($scope.newUrl);
        }
        if($scope.urls==undefined) $scope.urls=new Array();
        $scope.urls.push({href:$scope.newUrl});
        $scope.newUrl = '';
        chrome.storage.sync.set({'urls': $scope.urls});
    }

    $scope.removeUrl = function(url){
        var index = $scope.urls.indexOf(url);
        $scope.urls.splice(index,1);
        chrome.storage.sync.set({'urls': $scope.urls});
        //$scope.$digest();
    }
}

