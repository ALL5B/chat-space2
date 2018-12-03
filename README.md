# データベース設計

## userテーブル

|Column|Type|Options|
|------|----|-------|
| name |string|null: false,unique: true|
|email |string|null: false,unique: true|


### Association
- has_many :groups, through: :user_groups
- has_many :user_groups
- has_many :messages


## user_groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|references|null: false ,foreign_key: true |
|message_id|references|null: false ,foreign_key: true |


### Association
- belongs_to :user
- belongs_to :group




## groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, index: true, unique: true|


### Association
- has_many :users, through: :user_groups
- has_many :user_groups
- has_many :messages





## messageテーブル

|Column|Type|Options|
|------|----|-------|
|content|text|null: false|
|group_id|references|null: false ,foreign_key: true |
|user_id |references|null: false ,foreign_key: true |


### Association
- belongs_to :user
- belongs_to :group


