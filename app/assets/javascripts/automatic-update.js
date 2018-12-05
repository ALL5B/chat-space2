$(function(){


  function updateHtml(message){
    var html = `<p class="chat__message__user">
                  ${message.name}
                  <span class="chat__message__user__created-at">
                    ${message.created_at}
                  </span>
                </p>
                `
                if(message.image.url){
                  `
                  <img width="200" height="200" src="${message.image.url}">
                  `
                }
                `
                <p class="chat__message__text">
                  ${message.content}
                </p>`;
    return html;
  }

  setInterval(function(){
    var messageCount = $('.chat__message__user').length;
    $.ajax({
      type: 'GET',
      url: location.href,
      dataType: 'json'
    })

    .done(function(data){
      var updateCount = data.messages.length;
      var insertHtml = '';
      if(updateCount > messageCount){
        data.messages.forEach(function(message){
          insertHtml += updateHtml(message)
        });
        $('chat__message__text').html(insertHtml)
      }
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    })
  },5000);
});
