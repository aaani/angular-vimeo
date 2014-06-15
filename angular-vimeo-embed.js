angular.module('vimeo', [])
    .directive('vimeoPlayer', ['$http',function ($http) {
        return {
            restrict:'AEC',
            link:function (scope, element) {
                var id = element.attr('videoid');
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
                    var vidHTML = '<iframe src="https://player.vimeo.com/video/'+id+'" width="'+w+'" height="'+h+'" frameborder="0" title="'+data.title+'" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                    element[0].innerHTML = unescape(vidHTML);
                }).
                error(function(data, status, headers, config) {
                    console.log("angular-vimeo: Unable to load video from "+vidUrl);
                });
            }
        };
    }]);
