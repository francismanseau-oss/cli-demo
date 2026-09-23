(function () {
    var grid = document.getElementById("demoGrid");
    if (!grid) return;

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function renderEmpty() {
        grid.innerHTML =
            '<div class="demo-empty" role="status">' +
            "<p>Aucune démo publiée pour le moment.</p>" +
            "<p>Les builds Cursor CLI apparaîtront ici.</p>" +
            "</div>";
    }

    function renderDemos(demos) {
        if (!Array.isArray(demos) || demos.length === 0) {
            renderEmpty();
            return;
        }

        grid.innerHTML = demos
            .map(function (demo) {
                var type = demo.type === "web" ? "web" : "apk";
                var badgeClass = type === "web" ? "demo-card__badge demo-card__badge--web" : "demo-card__badge";
                var badgeLabel = type === "web" ? "Web" : "APK";
                var title = escapeHtml(demo.title || demo.id || "Démo");
                var desc = escapeHtml(demo.description || "");
                var updated = demo.updated ? escapeHtml(demo.updated) : "";
                var rawHref = demo.file || demo.path || "";
                var href = escapeHtml(rawHref || "#");
                var cta = type === "web" ? "Ouvrir" : "Télécharger";
                var webAttrs =
                    type === "web" && rawHref
                        ? ' target="_blank" rel="noopener noreferrer"'
                        : "";

                return (
                    '<article class="demo-card">' +
                    '<div class="demo-card__meta">' +
                    '<span class="' +
                    badgeClass +
                    '">' +
                    badgeLabel +
                    "</span>" +
                    "<h2>" +
                    title +
                    "</h2>" +
                    (desc ? '<p class="demo-card__desc">' + desc + "</p>" : "") +
                    (updated ? '<p class="demo-card__updated">Mis à jour : ' + updated + "</p>" : "") +
                    "</div>" +
                    '<a class="btn-primary" href="' +
                    href +
                    '"' +
                    webAttrs +
                    (type === "apk" ? ' download' : "") +
                    ">" +
                    cta +
                    "</a>" +
                    "</article>"
                );
            })
            .join("");
    }

    fetch("demos.json", { cache: "no-store" })
        .then(function (res) {
            if (!res.ok) throw new Error("demos.json");
            return res.json();
        })
        .then(function (data) {
            grid.setAttribute("aria-busy", "false");
            renderDemos(data && data.demos ? data.demos : data);
        })
        .catch(function () {
            grid.setAttribute("aria-busy", "false");
            renderEmpty();
        });
})();
