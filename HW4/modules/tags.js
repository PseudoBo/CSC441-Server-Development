const tagsRegex = /(\<\/?\w+\>)/gm;
const str = `<html><body>If you're feeling up to it, call me at 6012664949
never, and I mean NEVER call +1 601 266-4949 you will regret it.
Here, prank call this number (601)-266-4949, it is my therapist.
Isn't 001-601-266-4949 the number for the pizza place? No? Ok, I'll schedule a massage.
What date? Do you have any opening for January 05, 1960?
6/1/00 is the soonest opening you have for a massage? Wow.
You say you are actually mostly packed until 04-Jul, 2004??
That is crazy....in that case, go ahead and schedule me for 2021-20-01
Hopefully I'll have the money for this by then, I only have \$954.49 to my name at the moment.
Plus, I owe \$10,724.00 for that thing that happened.
\$1,000,000,023.45 is how much I hear this is going to cost, though. Is that right?
no way.... that will put me at -\$250,000,456 in the hole!
Bright side is, my stock in game stop is up at approximatly +\$234,922.99 apes together strong!!
I heard BFV's net worth at the peak of GME was more than USD45M, is that true?
wow...imagine turning \$25K into a number like...
like \$4B, it is almost unfathomable!
</body></html>`;
let m;

while ((m = tagsRegex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === tagsRegex.lastIndex) {
        tagsRegex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}
return tagsRegex;