(function() {
    $.ajax({
        url: "data/data.json",
        success: function(res) {
            var data = res.data;
            render(data); //调用
        }
    })

    function render(data) {
        var str = '';
        var content = document.querySelector(".content");
        data.forEach(function(item) {
            str += ` <div class="content-box">
             <div>
                 <img src="${item.img}" alt="">
             </div>
             <div class="content-box-right">
                 <h6>${item.title}</h6>
                 <p>${item.content}</p>
                 <span>${item.price}</span>
                 <i>门市价:${item.menshi}</i>
             </div>
         </div>`
        })
        content.innerHTML = str;
    }
})()