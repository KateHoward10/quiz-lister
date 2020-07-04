class Event < ApplicationRecord
  belongs_to :quiz
  validates_uniqueness_of :date, scope: :quiz_id
  has_many :attendees, dependent: :destroy
  has_many :users, through: :attendees
end
