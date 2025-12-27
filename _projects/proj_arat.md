---
layout: page
title: ICORR 2025 Paper
description: I created a model that estimates upper limb function in stroke patients, using features extracted from IMU data. I published a paper to a top rehab robotics conference, which was nominated for best paper.
img: assets/img/project_img/arat/group_photo.jpg
project_id: arat
related_publications: false
category: work
---

<img src="/assets/img/project_img/arat/group_photo.jpg" alt="group photo" style="max-width: 100%; height: auto;" />

## [Paper Link Here](https://ieeexplore.ieee.org/abstract/document/11063104)

The following is a description of my contributions to a paper I co-authored with Dr. Shusuke Okita and others during my time at
Shirley Ryan AbilityLab in Chicago, IL. It originally started as my summer internship project, but my results were very promising so it was extended
into a conference paper. Our paper was published to the 19th International Conference on Rehabilitation Robotics (ICORR) in May 2025, and was a finalist
for overall Best Paper. I received a grant from Northwestern to attend the conference with my co-authors.

For a complete copy of the paper, feel free to send me an email. Due to Shirley Ryan AbilityLab policy, data and code will not be publicly available.

#### Abstract
Neurological injuries such as stroke are a leading cause of disability, significantly impairing upper extremity (UE) function. Standardized clinical assessments are essential to evaluate patient function, monitor progress, and tailor interventions; however, these assessments are time-consuming to administer and require specialized training, limiting their accessibility. We developed a machine learning model to estimate Action Research Arm Test (ARAT) scores with wearable inertial sensors, aiming to reduce patients' and clinicians' workloads in rehabilitation. Twenty-three patients with chronic stroke performed the ARAT with ActiGraph sensors on their wrists and waist. Models used these data to predict the total ARAT score from a minimal set of UE tasks, selecting one item from each ARAT sub-test (grasp, grip, pinch, and gross movement). A nested cross-validation was used to optimize item selection, feature selection, and hyperparameters. The optimized model achieved a median absolute error of 3.81 points, and a coefficient of determination of 0.93 to estimate the total ARAT score. SHapley Additive explanations (SHAP) values identified key contributors to the predictions in each ARAT sub-test. The proposed approach demonstrates the potential of combining wearable sensor data with machine learning to facilitate more frequent and efficient monitoring of rehabilitation progress throughout the care continuum.

#### Contributions
My main contributions were:

1. Segmentation and processing of all training data and labels.
2. The entire development of the initial model, and primary development of all subsequent iterations.
3. Selection of the initial set of features, and brainstorming of additional features added later in development.
4. Model optimization with cross-validation, feature selection algorithms, and hyperparameter tuning.
5. Feature importance and contribution analysis, with a focus on clinical interpretability.
6. Creation of figures and tables used in a research symposium and internal discussions.
7. Initial draft of some paper sections, and creation of several final figures and tables.

#### Model Overview
Below is a diagram of our model structure and training/validation process.

<iframe 
  src="/assets/img/project_img/arat/figure1.pdf" 
  width="100%" 
  height="400px" 
  style="border: none;">
</iframe>

The ARAT consists of 19 distinct manipulation tasks, broken into 4 subcategories. Each subcategory evaluates a different phase of manipulation: grasping, gripping, pinching, and gross movement. Our main approach focused on developing separate models, each excelling at predicting one of the 4 subcategories. To predict the full clinical test score we then combined the score of each subcategory, allowing for both granular and big picture upper limb function analysis. Our data was collected with a minimal IMU sensor setup (one sensor on each wrist, and one around the waist). A clinician performed the ARAT protocol for each subject, and their evaluation scores were used as ground truths during model training. Raw data was segmented according to ARAT item timestamps, and then processed for cleaner signals.

A great deal of effort was put into selection of features for the final model. We based our initial selection on features chosen by selected reference materials, but a great deal of consideration was put into the final set. Features were extracted both from raw IMU signals and patient clinical information, and later filtered with feature selection algorithms. For prediction, the final model used the Random Forest algorithm because of ts ability to capture non-linear relationships, and also on account of our high dimensional feature space. Because of an emphasis on clinical interpretability (as well as a desire for simplicity), we decided to avoid a deep learning approach.

#### Results
Our results were overall very promising. We were able to achieve fairly accurate predictions for each subcategory, and our full score prediction mean absolute error was below the minimal clinically important difference. We also found that including features from the subject's unimpaired side led to more accurate results, suggesting the presence of compensatory movements during certain manipulation tasks.

Below is a figure demonstrating the accuracy of each ARAT subcategory motor function estimation model.

<img src="/assets/img/project_img/arat/scatter_subtotal.png" alt="group photo" style="max-width: 100%; height: auto;" />

A great deal of consideration was given to clinical interpretability throughout the duration of the project. Shirley Ryan AbilityLab values clinician input and rigorous analysis and understanding of results. Therefore, SHAP analysis was performed to determine the most prominently used features for motor function prediction in each ARAT subcategory. While an in depth discussion of this analysis can be found in the full paper, below is a figure demonstrating the important features and their respective subcategories.

<iframe 
  src="/assets/img/project_img/arat/figure3.pdf" 
  width="100%" 
  height="400px" 
  style="border: none;">
</iframe>

Below is my final poster from the research symposium.

<iframe 
  src="/assets/img/project_img/arat/poster.pdf" 
  width="100%" 
  height="600px" 
  style="border: none;">
</iframe>