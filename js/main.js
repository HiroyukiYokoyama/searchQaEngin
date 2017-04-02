function search() {
    var searchCriteria = encodeURI("body:" + $("#criteria").val());
    console.log(searchCriteria);
    var url = "https://qiita.com/api/v2/items?page=1&per_page=20&query=" + searchCriteria;
    $.ajax({
        type: "GET",
        url: url,
        success: function (result) {
            var html = "";
            var qiitabody = $("#qiitaBody");
            qiitabody.empty()
            for(var i = 0 ; i < result.length  ; i++){
                var curRes =  result[i];
                var no = i + 1;
                var targetUrl = "'" + curRes.url +"'";
                html = html + '<tr onclick="onTr(' + targetUrl + ')">'
                            +   "<td style='width:5%'>" + no + "</td>"
                            +   "<td style='width:45%'>" + curRes.title + "</td>"
                            +   "<td style='width:50%'>" + curRes.body.slice(0,20) + "</td>"
                            + "</tr>"
            }
            qiitabody.append(html);
            console.log(result);
        }
    });
}

function onTr(url){
    window.open(url, '_blank');
}