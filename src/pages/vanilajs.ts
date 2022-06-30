var i = 0;
var img_id_previous = '';
var img_id_current = '';

export const showcase = () => {
    i++;
    
    img_id_previous = 'img-0' + (i - 1); 
    var element_previous = document.getElementById(img_id_previous);
    element_previous?.classList.remove("img-in-use")

    img_id_current = 'img-0' + i;
    var element_current = document.getElementById(img_id_current);
    element_current?.classList.add("img-in-use");

    if (i >= 4) {
        i = 0;
    }

    setTimeout(showcase, 4000);
}