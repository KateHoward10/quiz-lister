class Quiz < ApplicationRecord
  acts_as_favoritable
  belongs_to :user, optional: true
end
