module QuizzesHelper
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
end
