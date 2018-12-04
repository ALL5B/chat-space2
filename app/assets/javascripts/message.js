$(function(){

  function scrollBottom(){
    $(".chat__message").animate({
        scrollTop: $(".chat__message")[0].scrollHeight
      });
  }


  function buildHTML(message){
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
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat__message').append(html)
      $('.chat__footer__form__text').val('')
      $('#message_image').val('')
        scrollBottom()
    })
    .fail(function(){
      alert('error');
    })


    return false;
  });
});

