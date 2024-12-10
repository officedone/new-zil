$(".relocatorx").click(function(e){
    let dest = $(this).attr("destinationx");
    console.log(dest);
    window.location.href = dest;
})