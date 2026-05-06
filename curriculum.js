const CATALOG_URL = "data/catalog.json";
const SCHEDULE_URL = "data/curriculum-schedule.json";

const els = {
  year: document.getElementById("curriculumYear"),
  hint: document.getElementById("curriculumHint"),
  courseSelect: document.getElementById("curriculumCourseSelect"),
  summary: document.getElementById("curriculumSummary"),
  list: document.getElementById("curriculumList"),
};

/** @type {{ courses: Array<{ id: string, name: string, fields: Array<{ id: string, name: string, units: Array<{ id: string, title: string, jsonPath: string }> }> }> } | null} */
let catalog = null;
/** @type {{ year: number, items: Array<{ courseId: string, unitId: string, sessionNo: number, date: string, dates: string[], section: string, lesson: string }> } | null} */
let schedule = null;

function isPlaceholderTitle(title) {
  return /^unit\d+$/i.test(String(title).trim());
}

function findUnit(course, unitId) {
  for (const field of course.fields) {
    const unit = field.units.find((item) => item.id === unitId);
    if (unit) return { field, unit };
  }
  return null;
}

function unitDisplayTitle(unit, item) {
  if (!unit) return item.lesson;
  if (isPlaceholderTitle(unit.title)) return item.lesson || unit.title;
  return unit.title;
}

function createCourseOptions() {
  els.courseSelect.innerHTML = "";
  for (const course of catalog.courses) {
    const opt = document.createElement("option");
    opt.value = course.id;
    opt.textContent = course.name;
    els.courseSelect.appendChild(opt);
  }
  els.courseSelect.disabled = false;
}

function renderCourse(courseId) {
  const course = catalog.courses.find((item) => item.id === courseId);
  const items = schedule.items
    .filter((item) => item.courseId === courseId)
    .sort((a, b) => a.sessionNo - b.sessionNo);

  if (!course || items.length === 0) {
    els.summary.textContent = "表示できるカリキュラムがありません。";
    els.list.innerHTML = "";
    return;
  }

  els.summary.textContent = `${course.name} / 全 ${items.length} 回`;
  els.list.innerHTML = "";

  let currentSection = "";
  for (const item of items) {
    const found = findUnit(course, item.unitId);
    const fieldName = found?.field.name || item.section || "未分類";
    const unit = found?.unit || null;

    if (fieldName !== currentSection) {
      currentSection = fieldName;
      const heading = document.createElement("h3");
      heading.className = "curriculum-section-title";
      heading.textContent = currentSection;
      els.list.appendChild(heading);
    }

    const row = document.createElement("article");
    row.className = "curriculum-item";

    const meta = document.createElement("div");
    meta.className = "curriculum-item-meta";

    const session = document.createElement("span");
    session.className = "curriculum-session";
    session.textContent = `第${item.sessionNo}回`;

    const date = document.createElement("span");
    date.className = "curriculum-date";
    date.textContent = item.date;

    meta.append(session, date);

    const body = document.createElement("div");
    body.className = "curriculum-item-body";

    const title = document.createElement("h4");
    title.className = "curriculum-item-title";
    title.textContent = unitDisplayTitle(unit, item);
    body.appendChild(title);

    row.append(meta, body);
    els.list.appendChild(row);
  }
}

async function loadJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} を読み込めませんでした。`);
  return res.json();
}

async function init() {
  try {
    const [catalogRaw, scheduleRaw] = await Promise.all([loadJson(CATALOG_URL), loadJson(SCHEDULE_URL)]);
    catalog = catalogRaw;
    schedule = scheduleRaw;

    els.year.textContent = `${schedule.year}年度`;
    els.hint.hidden = true;
    createCourseOptions();
    renderCourse(els.courseSelect.value || catalog.courses[0].id);
  } catch (err) {
    els.hint.hidden = false;
    els.hint.textContent = err instanceof Error ? err.message : "カリキュラムを読み込めませんでした。";
    els.courseSelect.innerHTML = '<option value="">— 読み込み失敗 —</option>';
    els.courseSelect.disabled = true;
    els.summary.textContent = "";
    els.list.innerHTML = "";
  }
}

els.courseSelect.addEventListener("change", () => {
  renderCourse(els.courseSelect.value);
});

init();
