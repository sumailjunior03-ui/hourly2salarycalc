"use strict";

/* ── UTILITIES ── */
function $(id) { return document.getElementById(id); }

function parseNum(val) {
  var n = parseFloat(String(val).replace(/[$,\s]/g, ""));
  return isNaN(n) ? NaN : n;
}

function fmt(n) {
  return "$" + n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* ── CALC ENGINE ── */
function calcFromHourly(hourly, hours, weeks) {
  var weekly    = hourly * hours;
  var annual    = weekly * weeks;
  var monthly   = annual / 12;
  var biweekly  = annual / 26;
  var daily     = hourly * (hours / 5);
  return {
    hourly:   hourly,
    hours:    hours,
    weeks:    weeks,
    weekly:   weekly,
    annual:   annual,
    monthly:  monthly,
    biweekly: biweekly,
    daily:    daily
  };
}

/* ── RENDER ── */
function renderResults(r) {
  var result = $("result");
  if (!result) return;

  $("annual").textContent    = fmt(r.annual);
  $("monthly").textContent   = fmt(r.monthly);
  $("biweekly").textContent  = fmt(r.biweekly);
  $("weekly").textContent    = fmt(r.weekly);
  $("daily").textContent     = fmt(r.daily);

  var note = $("assumption-note");
  if (note) {
    note.textContent = "Based on " + r.hours + " hrs/week \u00d7 " + r.weeks + " weeks/year = " + (r.hours * r.weeks) + " total hours.";
  }

  result.style.display = "block";
}

/* ── CALCULATE ── */
function calculate() {
  var hourly = parseNum($("hourly") ? $("hourly").value : "");
  var hours  = parseNum($("hours")  ? $("hours").value  : "");
  var weeks  = parseNum($("weeks")  ? $("weeks").value  : "");

  var result = $("result");

  if (isNaN(hourly) || isNaN(hours) || isNaN(weeks) ||
      hourly <= 0   || hours <= 0   || weeks <= 0) {
    if (result) result.style.display = "none";
    return;
  }

  renderResults(calcFromHourly(hourly, hours, weeks));
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", function () {
  // Bind input listeners for instant recalc
  ["hourly", "hours", "weeks"].forEach(function (id) {
    var el = $(id);
    if (el) el.addEventListener("input", calculate);
  });

  // Bind button
  var btn = $("calc-btn");
  if (btn) btn.addEventListener("click", calculate);

  // Footer year
  var yr = $("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Network links
  }

  // Auto-calculate on load
  calculate();
});
