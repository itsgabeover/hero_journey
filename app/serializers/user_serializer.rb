class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :nickname, :email, :archetype
  has_many :journals
end
