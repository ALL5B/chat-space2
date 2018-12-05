$(function(){
  var userList = $('#user-search-result');
  var userAdd = $('#chat-group-users')
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;

    userList.append(html);
  }

  function appendAddUser(id,name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    userAdd.append(html);
  }


  $('#user-search-field').on("keyup",function(){
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      userList.empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました。')
    })
  });

  $(document).on("click", ".user-search-add", function () {
    var userId = $(this).attr('data-user-id');
    var userName = $(this).attr('data-user-name')
    appendAddUser(userId,userName);
    $(this).parent().remove()
  });

  $(document).on("click", ".js-remove-btn", function () {
    $(this).parent().remove()
  });


});
