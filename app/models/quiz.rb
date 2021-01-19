class Quiz < ApplicationRecord
  acts_as_favoritable
  belongs_to :user, optional: true
  has_many :events, dependent: :destroy
  validates :venue, :postcode, :latitude, :longitude, presence: true
  validates_uniqueness_of :venue, case_sensitive: false, message: "name has already been taken. Consider adding an area to distinguish your venue from somewhere else with the same name, e.g. 'The Royal Oak, Redland'."
  validate :check_bristol_postcode
  validates :prize, length: { maximum: 200 }
  validates :display_email, acceptance: { message: "To create a new quiz, you must agree to display a contact email." }
  after_validation :set_slug
  before_save :nil_if_blank

  def nil_if_blank
    self[:status] = nil if self[:status].blank?
  end

  def set_slug
    self.update_attribute(:slug, to_slug(self.venue))
  end

  def to_slug(name)
    name.gsub(/['’]/, "").parameterize
  end

  def to_param
    slug
  end

  def check_bristol_postcode
    errors.add(:postcode, "must be a valid Bristol postcode") unless postcode.downcase.start_with?('bs')
  end
end
