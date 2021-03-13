module QuizzesHelper
  def formatName(name)
    words = name.split(" ")
    words.each do |w|
      w[0] = w[0].upcase if w.length > 2
    end
    words.join(" ")
  end

  def getMultiplier(day)
    case day
    when 'Monday'
      1
    when 'Tuesday'
      3
    when 'Wednesday'
      0
    when 'Thursday'
      2
    when 'Sunday'
      4
    else
      5
    end
  end

  def getRandomHue(day)
    hue = ((getMultiplier(day) * 60) + rand(60)).floor 
    Quiz.find_by(hue: hue) ? getRandomHue(day) : hue
  end

  def hueMatches(day, hue)
    hue.present? && getMultiplier(day) == (hue / 60).floor
  end

  def getFrequency(freq)
    case freq
    when 'biweekly'
      'other'
    when 'monthly'
      'month on'
    when 'occasional'
      'now and then on'
    else
      ''
    end
  end

  def getColour(status)
    case status
    when 'active'
      'green'
    when 'not active'
      'red'
    else
      'grey'
    end
  end

  def getFilterPrefix(name)
    case name
    when 'venue_cont'
      ' for '
    when 'day_cont'
      ' on '
    when 'postcode_cont'
      ' in '
    else
      ''
    end
  end
end
