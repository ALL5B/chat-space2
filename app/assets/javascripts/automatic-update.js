$(function(){


  function updateHtml(message){
    var html = ""
    var user = `<p class="chat__message__user" message-id="${message.id}">
                    ${message.name}
                    <span class="chat__message__user__created-at">
                      ${message.date}
                    </span>
                  </p>`;
    var img = `<img width="200" height="200" src="${message.image.url}">`;
    var content = `<p class="chat__message__text">
                    ${message.content}
                    </p>`;

    html += user
    if (message.image.url){
      html += img
    }
    html += content

      return html;
  }

  setInterval(function(){
    // documentのロード完了後に
    $(function() {
      var messageUsers = $('.chat__message__user') ;
      var currentMessageId = messageUsers.last().attr('message-id');

      $.ajax({
        type: 'GET',
        url: location.href,
        data: {messageid: currentMessageId},
        dataType: 'json'
      })

      .done(function(data){
        var insertHtml = '';
        if(data.messages){
          data.messages.forEach(function(message){
            insertHtml += updateHtml(message)
          });
          $('.chat__message__text').last().append(insertHtml)
        }
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      })
    });
  },5000);
});
