(() => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.project-card');
  filters.forEach((filter) => filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;
    cards.forEach((card) => { card.hidden = category !== 'all' && card.dataset.category !== category; });
  }));

  const arm = document.querySelector('[data-arm]');
  if (!arm) return;
  const joints = [...arm.querySelectorAll('[data-joint]')];
  const linksSvg = [...arm.querySelectorAll('[data-link]')];
  const values = [...document.querySelectorAll('[data-angle]')];
  const base = { x: Number(joints[0].getAttribute('cx')), y: Number(joints[0].getAttribute('cy')) };
  const linkLengths = joints.slice(0, -1).map((joint, index) => {
    const next = joints[index + 1];
    return Math.hypot(Number(next.getAttribute('cx')) - Number(joint.getAttribute('cx')), Number(next.getAttribute('cy')) - Number(joint.getAttribute('cy')));
  });
  let activeJoint = null;
  const updateArm = () => {
    joints.forEach((joint, index) => {
      const next = joints[index + 1];
      if (!next) return;
      const x1 = Number(joint.getAttribute('cx')); const y1 = Number(joint.getAttribute('cy'));
      const x2 = Number(next.getAttribute('cx')); const y2 = Number(next.getAttribute('cy'));
      const line = linksSvg[index];
      line.setAttribute('x1', x1); line.setAttribute('y1', y1); line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    });
    joints.forEach((joint, index) => {
      if (values[index]) values[index].textContent = `${Math.round(Number(joint.getAttribute('cx')))} / ${Math.round(Number(joint.getAttribute('cy')))}`;
    });
  };
  const solveArm = (targetX, targetY) => {
    const points = joints.map((joint) => ({ x: Number(joint.getAttribute('cx')), y: Number(joint.getAttribute('cy')) }));
    const totalLength = linkLengths.reduce((sum, length) => sum + length, 0);
    const target = { x: Math.max(40, Math.min(500, targetX)), y: Math.max(45, Math.min(345, targetY)) };
    const targetDistance = Math.hypot(target.x - base.x, target.y - base.y);
    if (targetDistance >= totalLength) {
      points[0] = { ...base };
      for (let index = 1; index < points.length; index += 1) {
        const ratio = linkLengths[index - 1] / targetDistance;
        points[index] = { x: points[index - 1].x + (target.x - points[index - 1].x) * ratio, y: points[index - 1].y + (target.y - points[index - 1].y) * ratio };
      }
    } else {
      for (let iteration = 0; iteration < 12; iteration += 1) {
        points[points.length - 1] = { ...target };
        for (let index = points.length - 2; index >= 0; index -= 1) {
          const distance = Math.hypot(points[index + 1].x - points[index].x, points[index + 1].y - points[index].y) || 1;
          const ratio = linkLengths[index] / distance;
          points[index] = { x: points[index + 1].x + (points[index].x - points[index + 1].x) * ratio, y: points[index + 1].y + (points[index].y - points[index + 1].y) * ratio };
        }
        points[0] = { ...base };
        for (let index = 0; index < points.length - 1; index += 1) {
          const distance = Math.hypot(points[index + 1].x - points[index].x, points[index + 1].y - points[index].y) || 1;
          const ratio = linkLengths[index] / distance;
          points[index + 1] = { x: points[index].x + (points[index + 1].x - points[index].x) * ratio, y: points[index].y + (points[index + 1].y - points[index].y) * ratio };
        }
      }
    }
    points.forEach((point, index) => {
      joints[index].setAttribute('cx', point.x);
      joints[index].setAttribute('cy', point.y);
    });
    updateArm();
  };
  const moveJoint = (event) => {
    if (!activeJoint) return;
    const transform = arm.getScreenCTM();
    if (!transform) return;
    const point = arm.createSVGPoint(); point.x = event.clientX; point.y = event.clientY;
    const local = point.matrixTransform(transform.inverse());
    solveArm(local.x, local.y);
  };
  joints.slice(-1).forEach((joint) => joint.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    activeJoint = joint;
    joint.setPointerCapture(event.pointerId);
  }));
  window.addEventListener('pointermove', moveJoint);
  window.addEventListener('pointerup', () => { activeJoint = null; });
  window.addEventListener('pointercancel', () => { activeJoint = null; });
  updateArm();
})();
