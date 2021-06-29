
$(document).ready(function () {
    $('textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });


    $("#submit1").on("click", function () {
        var blogContent = $("#blogContent1").val();
        $('<input>').attr({
            type: 'hidden',
            id: 'blogContent',
            name: 'blogContent',
            value: blogContent,
        }).appendTo('form');
        $("form").submit();
        return true;
    });
});

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}