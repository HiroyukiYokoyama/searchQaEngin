function search() {
    var searchCriteria = encodeURI("body:" + $("#criteria").val());
    // Qiitaの検索API実行
    searchQiita(searchCriteria);
    // Googleの検索API実行
    searchGoogle(searchCriteria);
}

function searchQiita(searchCriteria){
    var url = "https://qiita.com/api/v2/items?page=1&per_page=20&query=" + searchCriteria;
    var qiitabody = $("#qiitaBody");
    $.ajax({
        type: "GET",
        url: url,
        success: function (result) {
            var html = "";
            qiitabody.empty();
            for(var i = 0 ; i < result.length  ; i++){
                var curRes =  result[i];
                var no = i + 1;
                var targetUrl = "'" + curRes.url +"'";
                html = html + '<tr onclick="onTr(' + targetUrl + ')">'
                            +   "<td style='width:5%'>" + no + "</td>"
                            +   "<td style='width:45%'>" + curRes.title + "</td>"
                            +   "<td style='width:50%'>" + curRes.body.slice(0,50) + "</td>"
                            + "</tr>"
            }
            qiitabody.append(html);
        },
        error:function(){
            qiitabody.empty();
            qiitabody.append("<tr><td colspan="3">検索結果を取得できませんでした</td></tr>");
        }
    });
}

function searchGoogle(searchCriteria){
    var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBZxYif6D2xcgEe2jj6zN8uSWcc-KIkc28&cx=016177116786243345986:81wsw_m2ui4&q=" + encodeURI($("#criteria").val());
    $.ajax({
        type: "GET",
        url: url,
        success: function (result) {
            var questions = result.items;
            var html = "";
            var gooBody = $("#gooBody");
            gooBody.empty()
            for(var i = 0 ; i < questions.length  ; i++){
                var curRes =  questions[i];
                var no = i + 1;
                var targetUrl = "'" + curRes.formattedUrl +"'";
                html = html + '<tr onclick="onTr(' + targetUrl + ')">'
                            +   "<td style='width:5%'>" + no + "</td>"
                            +   "<td style='width:45%'>" + curRes.htmlTitle + "</td>"
                            +   "<td style='width:50%'>" + curRes.htmlSnippet + "</td>"
                            + "</tr>"
            }
            gooBody.append(html);
        },
        error:function(){
            qiitabody.empty();
            qiitabody.append("<tr><td colspan="3">検索結果を取得できませんでした</td></tr>");
        }
    });
}

function onTr(url){
    window.open(url, '_blank');
}