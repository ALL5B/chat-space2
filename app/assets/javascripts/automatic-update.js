$(function(){


  function updateHtml(message){
    if(message.image.url){
    var html = `<p class="chat__message__user">
                  ${message.name}
                  <span class="chat__message__user__created-at">
                    ${message.created_at}
                  </span>
                </p>
                <img width="200" height="200" src="${message.image.url}">
                <p class="chat__message__text">
                  ${message.content}
                </p>`
    }else{
      var html = `<p class="chat__message__user">
                  ${message.name}
                  <span class="chat__message__user__created-at">
                    ${message.created_at}
                  </span>
                </p>
                <p class="chat__message__text">
                  ${message.content}
                </p>`
    }
    return html;
  }

  setInterval(function(){
    $.ajax({
      type: 'GET',
      url: location.href,
      dataType: 'json'
    })

    .done(function(data){
      var insertHtml = '';
      data.messages.forEach(function(message){
        insertHtml += updateHtml(message)
      });
      $('chat__message__text').html(insertHtml)
    })

  },5000);
});
