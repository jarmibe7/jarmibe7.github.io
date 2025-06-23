---
layout: page
title: PID Motor Controller and Client
description: A robust PID motor controller in C on the PIC32MX270F256B microcontroller, with a Python client.
img: assets/img/thumb_motor_controller.png
importance: 4
category: work
---

This project was associated with Northwestern University ME 333: Mechatronics (Winter 2025).

![motor_demo.gif](/assets/img/project_img/mot_con/motor_demo.gif)

#### Objective
The goal of this project was to create a motor controller in C on the PIC32MX270F256B microcontroller, with a Python client.

#### Hardware and Project Description
The motor controller and command menu is a robust interface that allows the user to specify constant speeds, contstant postions,
step trajectories, and cubic trajectories. There are also commands for reading sensors and internal controller state. 

The motor is controlled using a variable 20 kHz PWM signal, the duty cycle of which is controlled by a PID controller inside a 5kHz ISR. The user can specify a constant PWM with duty cycle between -100 and 100 (bidirectional). An additional 200 Hz ISR with a PID position controller can be used to hold a constant angle or follow either a step or cubic trajectory. This is accomplished by calculating a desired motor torque, and then using the current controller to follow the current required for this torque. The Python client plots both reference and followed trajectories, and calculates a performance score.

<img src="/assets/img/project_img/mot_con/block_diagram.png" alt="block diagram" style="max-width: 100%; height: auto;" />

The motor controller code runs on the PIC32 microcontroller, which controls most of the logic and runs on a 3.3V power supply. A Raspberry Pi Pico Mini is also used for reading the motor encoder data, which is then sent to the PIC32 with a UART connection. The PIC32 communicates with an INA219 current sensor using an I2C protocol for accurate motor current measurements. Lastly, a bidirectional H-Bridge with an external 6V power supply is used to allow for robust control of the motor. The PIC32 microcontroller is part of a circuit named the NU32 Dev Board, which is a breadboard setup used throughout the course. The controller circuit diagram is pictured below, followed by the diagram for the NU32 Dev Board.

<img src="/assets/img/project_img/mot_con/controller_circuit.png" alt="controller circuit" style="max-width: 100%; height: auto;" />

<img src="/assets/img/project_img/mot_con/NU32dev_circuit.png" alt="NU32 dev circuit" style="max-width: 100%; height: auto;" />

Lastly, the Python client provides the user with a wide array of commands to access the controller's various capabilities. It also contains functions for trajectory generation and plotting.

<img src="/assets/img/project_img/mot_con/client_menu.png" alt="client menu" style="max-width: 100%; height: auto;" />

#### Results

As seen in the video demo, the motor follows each trajectory precisely, and then holds the final position until directed otherwise. Additionally, the cubic trajectory plot and corresponding current controller gain error plot are included for reference.

<img src="/assets/img/project_img/mot_con/cubic_plot.png" alt="cubic plot" style="max-width: 100%; height: auto;" />

<img src="/assets/img/project_img/mot_con/current_plot.png" alt="current plot" style="max-width: 100%; height: auto;" />

#### Software Format
The software is split up into modules, each controlling a different task, peripheral, or sensor. Each module contains a header file and a corresponding .c file.

- current_control<br>
This module contains functions for PID current control, based on user inputted gains. It also contains functions for setting up the current sensor, creating reference signal arrays, and communicating with the client.

- encoder<br>
This module contains functions for reading raw encoder data, converting to degrees, and setting up the UART connection to the Raspberry Pi Pico.

- i2c_master_noint<br>
This file contains I2C master utilities using 400 kHz polling rather than interrupts. The functions must be callled in the correct order as per the I2C protocol.

- ina219<br>
This file contains code for initializing and readng the INA219 current sensor.

- main<br>
This module interfaces with the Python client to allow user input. It contains the command directory, and also
initializes all sensors and peripherals. 

- nu32dip<br>
This module provides the setup code written by Nick Marchuk for the NU32 Dev Board.

- position_control<br>
This module contains functions for PID position control, based on user inputted gains. It also contains functions for sending and receiving calculated trajectories between the client.

- utilities<br>
This module contains constants and functions used to control the active state of the motor controller.

- client.py<br>
This file contains the UI code for the client. This entails reading user input, sending data to the PIC32 microcontroller with a serial port connection, and receiving information back.

- traj_plot.py<br>
This file contains a function for calculating interpolated user trajectories based on via point inputs. It also contains functions for plotting position and current gain performance.

