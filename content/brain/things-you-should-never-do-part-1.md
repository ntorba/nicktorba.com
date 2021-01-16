---
title: "Things You Should Never Do, Part 1"
aliases: ["Things You Should Never Do, Part 1"]
---
In [this evergreen article](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/), [[Joel Spolsky]] lays out "the **single worst strategic mistake** that any software company can make":

<blockquote> They decided to rewrite the code from scratch </blockquote>

This, Joel explains, is the result of a fundamental law of programming:

<blockquote> <b>It’s harder to read code than to write it </b> </blockquote>

This law is the reason code re-use is so hard. It also relates to [[A Big Little Idea Called Legibility]]. When programmers come to new code with preconceived ideas about how easy some problem is, they end up bewildered by the complexity of the current solutions. "But this should be __so easy__," they say. Of course, until they try to implement it themselves. 

This idea has had a huge effect on how I write code

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">code that works: the computer can understand it<br/><br/>code that&#39;s done: another human can understand it</p>&mdash; Nick Torba (@nicktorba) <a href="https://twitter.com/nicktorba/status/1350178908088508419?ref_src=twsrc%5Etfw">January 15, 2021</a></blockquote> 

This won't completely change Joel's fundamental law of programming, but hopefully helps mitigate the effects. I write code for the same audience that I write these notes - my future self. I leave links to stack overflow solutions I found and default to more descriptive descriptions in my doc strings. I also like to leave examples of different variables in quick comments. This can get a bit messy at times, but it's often much better than not having them when you, or someone else, return to code you wrote months or years ago.  

This article is filled with great quotes. Here are some more: 
* "The idea that new code is better than old is patently absurd. Old code has been __used__. It has been __tested__. __Lots__ of bugs have been found, and they’ve been __fixed__. There’s nothing wrong with it. It doesn’t acquire bugs just by sitting around on your hard drive."
    * The last point is a bit arguable. I've read some ideas about code rust/degradation that point at that the same exact code run at different times or different environments can have different effects. The environment you run this code in can change, which does lead ot that same code acquiring bugs... but I still get his point 

* "When you throw away code and start from scratch, you are throwing away all that knowledge. All those collected bug fixes. Years of programming work."
    * This is weeks/months/years of use that are impossible to replicate until they happen. You can never prepare for everything, even when you think you know everything about a problem. 

### Takeaways
1. Never rewrite code from scratch unless you have a long timeline or want embark on a painful adventure 
2. Make your code as easy as possible for other humans to approach to mitigate the effects of The Fundamental Law of Programming
