class Event < ApplicationRecord
  belongs_to :quiz
  validates :date, presence: true
  validates_uniqueness_of :date, scope: :quiz_id
  validates :description, length: { maximum: 200 }
  has_many :attendees, dependent: :destroy
  has_many :users, through: :attendees
end
