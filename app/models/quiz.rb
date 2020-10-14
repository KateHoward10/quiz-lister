class Quiz < ApplicationRecord
  acts_as_favoritable
  belongs_to :user, optional: true
  has_many :events, dependent: :destroy
  validates :venue, :postcode, :latitude, :longitude, presence: true
  validates_uniqueness_of :venue, case_sensitive: false, message: "name has already been taken. Consider adding an area to distinguish your venue from somewhere else with the same name, e.g. 'The Royal Oak, Redland'."
  validate :check_bristol_postcode
  validates :prize, length: { maximum: 200 }
  validates :display_email, acceptance: { message: "To create a new quiz, you must agree to display a contact email." }

  def to_param
    return nil unless persisted?
    venue.parameterize
  end

  def check_bristol_postcode
    errors.add(:postcode, "must be a valid Bristol postcode") unless postcode.downcase.start_with?('bs')
  end
end
