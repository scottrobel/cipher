require 'sinatra'
require 'sinatra/reloader' if development?

get '/' do
  erb :index
end

post '/' do
  string = params['text']
  if params['decode'] == 'Decode'
    shift = 26-(params['shift'].to_i%26)
    cipher_type = 'Deciphered'
  else
    shift = params['shift']
    cipher_type = 'Ciphered'
  end
  output = cipher(string, shift)
  erb :index, locals: { original: string,output: output,cipher_type: cipher_type }
end



def cipher(string,shift)
  lower = ('a'..'z').to_a
  upper = ('A'..'Z').to_a
  string.split(" ").map do |word|
    word.chars.map do |char|
      if lower.include?(char)
        char_shift(lower, shift, char)
      elsif upper.include?(char)
        char_shift(upper, shift, char)
      else
        char
      end
    end.join
  end.join(" ")
end

def char_shift(array, shift, char)
  position = array.index(char) + 1
  shifted_position = (position + shift.to_i) % 26
  array_index = shifted_position -1
  array[array_index]
end
