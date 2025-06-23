---
layout: page
title: Simulated Soccer Juggling
description: A physically reasonable representation of soccer juggling with Lagrangian dynamics, with a custom feedback control system.
img: assets/img/thumb_juggling.png
# redirect: https://unsplash.com
importance: 3
category: work
---

This project was associated with Northwestern University ME 314: Theory of Machines - Dynamics (Fall 2024).

![animation_demo.gif](/assets/img/project_img/soc_sim/animation_demo.gif)

## Introduction
#### Objective and Project Description
I've always loved soccer, and have been playing since I was a child. When I was younger I used to play a juggling game, in which I would practice juggling the soccer ball against my garage door, trying to keep it from touching the ground. The goal of this project was to create a physically reasonable representation of soccer juggling with Lagrangian dynamics, while also tying in ideas from my interests in robotics and control systems.

<img src="/assets/img/project_img/soc_sim/system_diagram.png" alt="system diagram" style="max-width: 100%; height: auto;" />

My system consists of 2 walls (left and right), a floor, a leg (represented as an actuated double pendulum) and a ball (represented by a cube). There are 5 state variables: the 2 pendulum angles, and the coordinates of the cube as well as its rotation. Planar gravity is acting on all objects in the system, with the double pendulum and cube also having planar rotational inertia.

#### Process Outline
All code is in an IPython Notebook, and organized into sections. This is the general structure:

1. Define system parameters and inertia matrices.
2. Create helper functions for manipulating SE3 matrices (inverse, skew-symmetric, derivatives, conversion to 6-dimensional twist).
3. Calculate all necessary frame transformations.
4. Compute the system's kinetic energy, potential energy, and Lagrangian.
5. Define all 20 potential impacts, and create impact equations.
6. Create PD controller and custom conditional force equation.
7. Evaluate forced Euler-Lagrange equations.
8. Create numerical impact update, simulation, and integration functions.
9. Simulate and plot system trajectory.
10. Animate system with custom animation function.

## Results
My dynamics simulation is a physcially reasonable depiction of soccer juggling. Below is the final version of a plot I used during development to determine the success of my simulation. It displays the dynamics of all state variables, and their adherence to their respective impact constraints.

<img src="/assets/img/project_img/soc_sim/trajectory_plot.png" alt="trajectory plot" style="max-width: 100%; height: auto;" />