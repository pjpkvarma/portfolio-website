(function () {
	"use strict";

	var isProjectPage = window.location.pathname.indexOf("/projects/") !== -1;
	var homeHref = isProjectPage ? "../index.html" : "index.html";
	var currentYear = String(new Date().getFullYear());

	function setExternalLinkSafety() {
		document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
			var rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
			rel.add("noopener");
			rel.add("noreferrer");
			link.setAttribute("rel", Array.from(rel).join(" "));
		});
	}

	function improveImages() {
		document.querySelectorAll("img").forEach(function (image) {
			if (!image.getAttribute("alt") && /logo/i.test(image.getAttribute("src") || "")) {
				image.setAttribute("alt", "J P K Varma Pothuri logo");
			}

			image.setAttribute("decoding", "async");
			if (!image.closest(".hero-section") && !image.hasAttribute("loading")) {
				image.setAttribute("loading", "lazy");
			}
		});
	}

	function improveNavigation() {
		document.querySelectorAll(".footer-logo-box a").forEach(function (link) {
			if (link.getAttribute("href") === "#") {
				link.setAttribute("href", homeHref);
			}
		});

		document.querySelectorAll(".menu-bar button").forEach(function (button) {
			if (!button.getAttribute("aria-label")) {
				button.setAttribute("aria-label", "Open navigation menu");
			}
		});
	}

	function improveSocialLabels() {
		document.querySelectorAll(".social-icons a").forEach(function (link) {
			if (link.getAttribute("aria-label")) return;

			var href = link.getAttribute("href") || "";
			if (href.indexOf("linkedin") !== -1) link.setAttribute("aria-label", "LinkedIn profile");
			if (href.indexOf("github") !== -1) link.setAttribute("aria-label", "GitHub profile");
			if (href.indexOf("twitter") !== -1) link.setAttribute("aria-label", "Twitter profile");
		});
	}

	function updateCopyrightYear() {
		document.querySelectorAll(".copy-text p").forEach(function (node) {
			node.textContent = node.textContent.replace(/\b20\d{2}\b/, currentYear);
		});
	}

	function addSkipLink() {
		if (document.querySelector(".skip-link")) return;

		var main = document.querySelector("main");
		if (!main) return;

		if (!main.id) main.id = "content";

		var link = document.createElement("a");
		link.className = "skip-link";
		link.href = "#" + main.id;
		link.textContent = "Skip to content";
		link.style.cssText = [
			"position:absolute",
			"left:16px",
			"top:-48px",
			"z-index:9999",
			"padding:10px 14px",
			"border-radius:6px",
			"background:#ffffff",
			"color:#111111",
			"font-weight:700",
			"box-shadow:0 8px 24px rgba(0,0,0,.18)",
			"transition:top .2s ease"
		].join(";");

		link.addEventListener("focus", function () {
			link.style.top = "16px";
		});
		link.addEventListener("blur", function () {
			link.style.top = "-48px";
		});

		document.body.insertBefore(link, document.body.firstChild);
	}

	document.addEventListener("DOMContentLoaded", function () {
		addSkipLink();
		setExternalLinkSafety();
		improveImages();
		improveNavigation();
		improveSocialLabels();
		updateCopyrightYear();
	});
})();
