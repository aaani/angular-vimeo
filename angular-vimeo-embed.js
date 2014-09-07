angular.module('vimeo', [])
    .directive('vimeoPlayer', ['$http',function ($http) {
        return {
            restrict:'AEC',
            scope:{
                videoID:'@videoid'
            },
            link:function (scope, element) {
                var id = scope.videoID;
                if(!id){
                    console.log("angular-vimeo: No videoid attribute set in HTML element");
                    return;
                }
                var w = element[0].offsetWidth;
                var h = element[0].offsetHeight;                
                var oEmbedUrl = 'http://vimeo.com/api/oembed.json';
                var vidUrl = oEmbedUrl + '?url=' + encodeURIComponent('http://vimeo.com/'+id);
                $http({method: 'GET', url: vidUrl}).
                    success(function(data, status, headers, config) {
                    var vidHTML = data.html;
                    element[0].innerHTML = unescape(vidHTML);
                    element[0].children[0].height = h;   
                    element[0].children[0].width = w; 
                }).
                error(function(data, status, headers, config) {
                    console.log("angular-vimeo: Unable to load video from "+vidUrl);
                });
            }
        };
    }]);
