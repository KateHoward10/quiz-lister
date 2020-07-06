class User < ApplicationRecord
  acts_as_favoritor
  has_many :quizzes
  has_many :attendees, dependent: :destroy
  has_many :events, through: :attendees, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  validates :email, presence: true
  validates_uniqueness_of :username
end
