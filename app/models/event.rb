class Event < ApplicationRecord
  belongs_to :quiz
  validates_uniqueness_of :date
end
