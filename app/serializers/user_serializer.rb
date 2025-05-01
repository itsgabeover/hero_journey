class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :username,
             :first_name,
             :last_name,
             :nickname,
             :email,
             :archetype,
             :total_journals,
             :longest_streak,
             :quests_completed

  has_many :journals

  def total_journals
    object.total_journals
  end

  def longest_streak
    object.longest_streak
  end

  def quests_completed
    object.quests&.where(completed: true)&.count || 0
  end
end