i=1
cats=[]
(1..100).each do |i|
    cats<<false
end


# set all cats to false
# go through every cat, change to true if false, change to false if true
# for every round, stop when the cat number%round is 0

while(i<=100) #100 rounds
    #go through all the cats here
    (0..(cats.length-1)).each do |j| 
        if(j%i==0) #only stop if cat number% round is 0
            if(cats[j]==true)
                cats[j]=false
            else
              cats[j] = true
            end
        end
    end
    i+=1
end

puts cats