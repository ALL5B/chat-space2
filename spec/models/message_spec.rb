require 'rails_helper'

RSpec.describe Message , type: :model do
  describe "#create" do
    context '保存できる' do
      it 'メッセージがあれば保存できるか' do
        expect(build(:message, image: nil)).to be_valid
      end
      it '画像があれば保存できる' do
        expect(build(:message,content: nil)).to be_valid
      end
      it 'メッセージと画像があれば保存できる'do
      expect(build(:message)).to be_valid
      end
    end

    context '保存できない' do
      it 'メッセージと画像がなかったら保存できない'do
      message = build(:message,content: nil,image: nil)
      message.valid?
      expect(message.errors[:content]).to include("を入力してください")
      end

      it 'グループidがないと保存できない' do
        message = build(:message,group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'ユーザーidがないと保存できない' do
        message = build(:message,user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
