---
layout: page
title: Autonomous Quadrotor Control
description: Manual and autonomous control of a quadrotor, using PID control and computer vision.
img: assets/img/project_img/drone/Jared_Berry_Candid.jpg
id: drone
category: work
---

This project was associated with Northwestern University ME 410: Quadrotor Design and Control (Spring 2025).

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    src="https://youtube.com/embed/pwBwrjdDeMI" 
    frameborder="0" 
    allowfullscreen 
    style="position: absolute; top:0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>

## Introduction
#### Objective and Project Description
The goal of this project was to achieve both manual and autonomous control of a pre-designed quadrotor, and also to learn the 
industry standard principles behind quadrotor design and control. The project was completed in teams of 2 students.

#### Process Outline
We broke the process up into 1 week milestones, over the span of an entire quarter. Our controller design had the following features:

1. High-pass and complementary IMU filtering for stable readings.
2. Drone orientation safety limits to prevent damage.
3. Low-level PID control of thrust, roll, pitch, and yaw.
4. Control of thrust, roll, pitch, and yaw with a manual dual-joystick controller.
5. Camera integration and ArUco Marker recognition.
6. Semi-autonomous stable flight with high-level PID control and computer vision techniques.

Below you can see a plot of the roll signal from our IMU during a testing sequence. The plot compares the signal before and after
our filtering setup.

<img src="/assets/img/project_img/drone/roll_plot.png" alt="filtering plot" style="max-width: 100%; height: auto;" />

## Results
Despite being terribly unskilled pilots, we were able to achieve stable manual flight with the dual-joystick controller in both ground-effect and above
ground domains. Additionally, we were able to achieve somewhat stable autonomous flight by holding the ArUco Marker in
steady view of the on-board camera.

Potential improvements would include further PID tuning, a better camera attachment design for more even weight distribution, and
improved filtering techniques for more robust state estimation with the camera setup. Unfortunately, we only had around 2 weeks to practice flying, 
and the on-board battery had a very short life. I would've liked to be able to get better at piloting before testing our design.