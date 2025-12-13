const resumeToText = (resume) => {
  if (!resume) return '';

  let text = '';

  const p = resume.personal_info || {};

  /* ================= HEADER ================= */
  if (p.full_name) text += `${p.full_name}\n`;

  const contact = [
    p.email,
    p.phone,
    p.location,
    p.linkedin,
    p.website
  ].filter(Boolean);

  if (contact.length) {
    text += contact.join(' | ') + '\n';
  }

  text += '\n';

  /* ================= SUMMARY ================= */
  if (resume.professional_summary?.trim()) {
    text += `SUMMARY:\n`;
    text += `${resume.professional_summary.trim()}\n\n`;
  }

  /* ================= SKILLS ================= */
  if (Array.isArray(resume.skills) && resume.skills.length) {
    text += `SKILLS:\n`;
    text += resume.skills.join(', ') + '\n\n';
  }

  /* ================= EXPERIENCE ================= */
  if (Array.isArray(resume.experience) && resume.experience.length) {
    text += `EXPERIENCE:\n`;

    resume.experience.forEach(exp => {
      const titleLine = [
        exp.position,
        exp.company && `at ${exp.company}`
      ].filter(Boolean).join(' ');

      if (titleLine) text += `${titleLine}\n`;

      const dates = [
        exp.start_date,
        exp.is_current ? 'Present' : exp.end_date
      ].filter(Boolean).join(' - ');

      if (dates) text += `${dates}\n`;

      if (exp.description?.trim()) {
        text += `${exp.description.trim()}\n`;
      }

      text += '\n';
    });
  }

  /* ================= PROJECTS ================= */
  if (Array.isArray(resume.projects) && resume.projects.length) {
    text += `PROJECTS:\n`;

    resume.projects.forEach(project => {
      if (project.name) text += `${project.name}\n`;
      if (project.type) text += `${project.type}\n`;
      if (project.description?.trim()) {
        text += `${project.description.trim()}\n`;
      }
      text += '\n';
    });
  }

  /* ================= EDUCATION ================= */
  if (Array.isArray(resume.education) && resume.education.length) {
    text += `EDUCATION:\n`;

    resume.education.forEach(edu => {
      const eduLine = [
        edu.degree,
        edu.field && `in ${edu.field}`,
        edu.institution && `- ${edu.institution}`
      ].filter(Boolean).join(' ');

      if (eduLine) text += `${eduLine}\n`;

      const details = [
        edu.graduation_date,
        edu.gpa && `GPA: ${edu.gpa}`
      ].filter(Boolean).join(' | ');

      if (details) text += `${details}\n`;

      text += '\n';
    });
  }

  return text
    .replace(/\n{3,}/g, '\n\n') // collapse extra newlines
    .trim();
};

export default resumeToText;