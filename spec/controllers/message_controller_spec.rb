require 'rails_helper'

describe MessagesController, type: :controller do
  let(:user){create(:user)}
  let(:group){create(:group)}

  describe '#index' do
    context 'ログイン' do
      before do
        login user
        get :index,params: {group_id: group.id}
      end

      it '＠meesageの中身の確認'do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it '@groupの中身の確認' do
        expect(assigns(:group)).to eq group
      end

      it 'indexのページが表示されているか' do
        expect(response).to render_template :index
      end
    end

    context 'ログアウト' do
      before do
        get :index, params: {group_id: group.id}
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    context 'ログイン時'do
      before do
        login user
      end

      context '保存できる' do
        subject {
          post :create,
          params: params
        }
        it "メッセージの数が増える"do
          expect{subject}.to change(Message, :count).by(1)
        end
        it "ページがメッセージ一覧画面に偏移するか" do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context '保存できない' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'メッセージの数が増えない' do
          expect{ subject }.not_to change(Message, :count)
        end

         it '失敗した後もちゃんとページ偏移をするか' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
