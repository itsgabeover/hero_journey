class User < ApplicationRecord
  has_secure_password
  has_many :journals, dependent: :destroy
  has_many :folders, dependent: :destroy
    has_many :quests, dependent: :destroy
    
  def total_journals
    journals.count
  end

  def longest_streak
    journal_days = journals
      .order(created_at: :asc)
      .pluck(:created_at)
      .map(&:to_date)
      .uniq

    return 0 if journal_days.empty?

    longest = 1
    current = 1

    journal_days.each_cons(2) do |a, b|
      if b == a + 1
        current += 1
        longest = [longest, current].max
      else
        current = 1
      end
    end

    longest
  end
end
