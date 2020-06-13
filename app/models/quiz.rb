class Quiz < ApplicationRecord
  acts_as_favoritable
  belongs_to :user, optional: true
  validates :venue, :postcode, :latitude, :longitude, presence: true
  validates :prize, length: { maximum: 200 }
  validates :display_email, acceptance: { message: "To create a new quiz, you must agree to display a contact email." }
end
