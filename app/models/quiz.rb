class Quiz < ApplicationRecord
  acts_as_favoritable
  belongs_to :user, optional: true
  has_many :events
  validates :venue, :postcode, :latitude, :longitude, presence: true
  validates_uniqueness_of :venue
  validate :check_bristol_postcode
  validates :prize, length: { maximum: 200 }
  validates :display_email, acceptance: { message: "To create a new quiz, you must agree to display a contact email." }

  def check_bristol_postcode
    errors.add(:postcode, "must be a valid Bristol postcode") unless postcode.downcase.start_with?('BS')
  end
end
