---
title: New project - Script Portal.
subtitle: A way to run scripts from the web.
date: 09-02-2024
category: Developing in Public.
featured: true
---

  

# New Project - Script Portal.

I've had this idea in my head for some time. A web portal that any of our team can log into and run some scripts at will. There can be so many utilities that we can build this way and help unlock some power for those that don't know how to code.

So for the past week, I've started working out a lto of the functions involved in a project like this. There are many moving parts and things that would need to happen, I was almost thinking that I was biting off a bit more than I can chew. Running Python, building a database, importing files, exporting files, managing users, and seemingly countless other things I would need to get together. It was feeling overwhelming.

However, once I started getting the layout done, I started to think about executing Python scripts. I was able to get things rolling using node.js and `child_process`. I couldn't believe how easy it was to get going. Next was displaying the result and again, once I got that to work, I was stoked (how really uses that word).

I felt that was a large milestone for me, so I decided I wanted to explore creating a database. I did some research in various options, but I think the easiest for me right now is just working with a mySQL database. I have some experience working through mySQL, so it was a natural fit.

I've been wanting to explore Docker for a while now. I've heard that it can be a game changer to development process, but I never knew how I would apply it. Well, I've converted. I was able to get a mySQL server set up with Docker and volume to save data. I thought it was going to be a difficult thing to do.

Now that I have a good idea about running things through Docker, I also had the idea of running the Python scripts through Docker as well. Once I figure it out at some point, I can run a container with certain requirements, which then I can create dynamic running of scripts without having to make loads of different Dockerfiles.

I also wanted to stream in the output of the Python file in realtime, so that took some time to set up, but then I was able to get things all sorted and streaming as things happen.

I was also able to set up a script selector where you can choose a script from the database and run it.

This is just the start and there is a long way to go, but in about a week, I've been able to get much further down the road than I thought I would be able to.

Until net time.

Cheers,

Dave.