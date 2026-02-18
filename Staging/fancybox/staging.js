$(document).ready(function() {
    $('.fr').show();
    $('.en').show();
    $("#language").on('change', function() {
       if($(this).val() == 'all'){
        $('.ban').show();
        $('.edm').show();
       }
       if($(this).val() == 'ban'){
        $('.ban').show();
        $('.edm').hide();
       }
       if($(this).val() == 'edm'){
        $('.ban').hide();
        $('.edm').show();
       }
    });
    $(".fancybox").fancybox({
        openEffect: 'none',
        closeEffect: 'elastic',
        fitToView: false, // 
        maxWidth: "100%", // 
        autoSize: false,
        'iframe': {'scrolling': 'auto'},
        beforeLoad: function(){
         var url= $(this.element).data("href");
         this.href = url
        },
        afterLoad: function () {
            this.width = $(this.element).data("width");
            this.height = $(this.element).data("height");
				phpdetails(this.href)

            // try{
            //     var size = $('.fancybox-inner iframe').contents().find('meta[name="ad.size"]').attr("content"),obj={};
            //     size = size.trim().split('=').join(',').split(',');	
            //     for(i=0; i<size.length-1; i=i+2){obj[size[i]] = size[i+1];}
            //     if(obj.width != this.width || obj.height!=this.height ){
            //         alert('Incorrect adsize. your adsize is set to '+ obj.width+'x'+obj.height+'. please set it to '+ this.width+'x'+this.height)
            //     }
            // }catch(e){}
        }
    });
});

function phpdetails(url){
	var str = window.location.href;
    url = url.substr(0,url.lastIndexOf('/')+1) 
    filename = url.split("/");
    filename = filename[filename.length-2];
	if($("#container").attr('show-file-name')){
		$('.fancybox-overlay .fancybox-skin').append(
				   '<div class="data">'+
						'<p>File Name : ' + filename +'</p>'+
				   '</div>'
		);
	}
	if($("#container").attr('show-file-size') && str.match(/http/g)){
		$.post("php/zip.php",{
			url:url
		},function(data,status){
			   $('.fancybox-overlay .data').append(
					'<p>File Size : <span>' + data +'</span></p>'
			   );
			if(parseInt(data)>=200){
				$('.data span').css('color','#ff5757');
				$('.data span').append('<span> Warning!!!</span>')
			}
		})
	}
}