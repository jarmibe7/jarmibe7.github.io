---
layout: page
title: Ergodic Control in Exploration
description: An active learning agent that uses ergodic  control and iLQR to find a hidden box.
img: assets/img/thumb_ergodic_search.png
importance: 1
category: work
related_publications: false
math: true
---

This project was associated with Northwestern University MECH_ENG 455: Active Learning (Spring 2025).

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    src="https://www.youtube.com/embed/3w-0hxr05PU?si=7uMtynZSq9mX5CC6" 
    frameborder="0" 
    allowfullscreen 
    style="position: absolute; top:0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>

#### Objective
The simulation environment was created by Max Muchen Sun, and is an OpenAI-style training gym for the final project of MECH_ENG 455: Active Learning. It contains a sensor agent (robot) with 2D single integrator dynamics (controlled by velocity), a randomly generated box hidden from the robot, and a built-in prediction function that utilizes generative modeling techniques to predict possible box locations and dimensions given sensor reading history. 

The goal of this project was to control a robot to move across a space to collect signal measurements, such that the uncertainty (variance) of the box predictions drops below a predefined threshold as quickly as possible.

#### Algorithm Overview
The main algorithm is ergodic search, which is performed with an Iterative Linear Quadratic Regulator (iLQR). Ergodic control allows an agent to achieve comprehensive coverage of a search space, and aligns an agent's time spent in a given region with the density of information contained within that region.  

The agent takes binary samples within the sensor bounds, with a positive reading signifying the presence of the hidden box and a negative reading showing the opposite. It also uses a simple state machine and switch condition to determine its planning strategy. Before receiving a certain threshold of positive readings, the agent plans an ergodic trajectory using iLQR. The agent completely finishes each planned trajectory before planning another. After receiving a certain threshold of positive readings, the agent then switches to an information maximization approach to eliminate uncertaity in the box's edges. This second strategy is accomplished by planning routes to the possible box corners with the most uncertainty.

Step 1: Check positive sensor reading threshold and determine search state.

Step 2: Turn predicted boxes into a target distribution.
      
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;First: Use negative/positive sensor readings (based on search state).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Second: Create pdf based on sample locations with Kernel Density Estimation (KDE).

Step 3: Recalculate Fourier coefficients of target distribution.

Step 4: Plan control signal for next time step based on search state.
      
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a: Positive sensor reading threshold not reached.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i. If an ergodic trajectory isn't already planned, use iLQR to plan one. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. If an ergodic trajectory is planned, follow it.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b: Positive sensor reading threshold reached.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i. If a trajectory isn't planned, plan a route to the corner with the greatest amount of variance in its possible location.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii. If a trajectory is planned, follow it.

Step 5: Save the planned control signal and send it to the gym simulation function.

#### iLQR Description
iLQR is a technique used for solving boundary value problems (BVPs), which are common in optimization and optimal control. It requires a differentiable objective function, dynamics, and boundary conditions. This particular ergodic search algorithm uses iLQR, followed by an Armijo line search to optimize the step size. The iLQR algorithm is as follows: 

```
ALGORITHM iLQR:
  Init J(u)                     # Objective function
  Init f(x, u) , x(0) = x_0     # Dynamics 
  Init (x_0, u_0)               # Initial conditions
  i = 0
  WHILE DJ(u) @ v > epsilon     # v represents the descent direction, @ is the dot product
      v_i(t) = argmin(DJ(u) @ v + 0.5 * v.T @ v)

      <armijo_line_search>

      u_i+1(t) = u_i(t) + gamma*v_i(t)
  ENDWHILE
END.
```

The following is a description of the Armijo line search.

```
ALGORITHM ARMIJO_LINE_SEARCH:
  Init J(u)                    # Objective function
  Init v                       # Descent direction
  Init gamma = 1.0             # Initial step size
  Init alpha = 1e-4            # Sufficient decrease constant
  Init beta = 0.5              # Step size shrinkage factor

  WHILE J(u + gamma * v) > J(u) + alpha * gamma * (DJ(u) @ v)
      gamma = beta * gamma     # Reduce step size
  ENDWHILE

  RETURN gamma                 # Final step size
END.
```

#### Ergodic Control Description
In this algorithm, iLQR is used to plan an ergodic trajectory by using an objective function based on the ergodic metric. The descent direction is found by solving the following optimization problem:

For ergodic metric $$\mathcal{E}$$:

$$
J_{\mathcal{E}}(x(t), u(t)) =  
q \mathcal{E}(x(t)) + 
\int_0^T u(t)^\top R u(t) \, dt
$$

$$
J_{\mathcal{E}}(x(t), u(t)) = 
q \sum_{k=0}^{K} \Lambda_k \left( \frac{1}{T} \underbrace{ \int_0^T F_k(x(t)) dt }_{c_k} - \Phi_k \right)^2 +
\int_0^T u(t)^\top R u(t) \, dt
$$

$$
v(t)^{[k]} = \arg \min_{v(t)} \left( J_{\mathcal{E}}(x(t), u(t)) +
\underbrace{\min\{0, x - \text{lower bound}\}^2 + \max\{0, x - \text{upper bound}\}^2}_{\text{Barrier Function}} \right)
$$

$$
z(t) = 
\underbrace{z_0}_{z_0 = 0} + \int_0^t 
\underbrace{D_1 f(x(\tau)^{[k]}, u(\tau)^{[k]})}_{A(\tau)} \cdot z(\tau) + 
\underbrace{D_2 f(x(\tau)^{[k]}, u(\tau)^{[k]})}_{B(\tau)} \cdot v(\tau)\, d\tau
$$

The ergodic metric can be calculated by computing the Fourier transform of a target trajectory or distribution. In this specific case, the probability density function of the target distribution is estimated using Kernel Density Estimation (KDE) on the negative sensor readings. This distribution is then inverted before being passed into the iLQR, as the areas with many negative sensor readings should be avoided.

While technically optional, the addition of a barrier function is necessary to keep the agent within the bounds of the desired search space. Fourier basis functions can still be evaluated outside of search space bounds, and due to their periodic nature these extraneous evaluations may appear similar to functions evaluated within search space bounds. This can result in the agent permanently leaving the search space. The added barrier function simply acts as a harsh penalty for leaving search space bounds.