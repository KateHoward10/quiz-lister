json.extract! quiz, :id, :venue, :day, :frequency, :time, :price, :prize, :status, :link, :postcode, :created_at, :updated_at
json.url quiz_url(quiz, format: :json)
