class Quiz < ApplicationRecord
  acts_as_favoritable
  belongs_to :user, optional: true
  validates :venue, presence: true
  validates :hue, presence: true, uniqueness: true
  validates :display_email, acceptance: { message: "To create a new quiz, you must agree to display a contact email." }
end
