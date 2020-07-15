# Load the Rails application.
require_relative 'application'

ActionMailer::Base.smtp_settings = {
  from: ENV['GMAIL_USERNAME'],
  address: 'smtp.sendgrid.net',
  port: 587,
  authentication: 'plain',
  user_name: ENV['SENDGRID_USERNAME'],
  password: ENV['SENDGRID_PASSWORD'],
  domain: 'brizquizlist.herokuapp.com',
  enable_starttls_auto: true
}

# Initialize the Rails application.
Rails.application.initialize!
